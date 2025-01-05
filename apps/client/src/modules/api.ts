'use server';

import { headers } from 'next/headers';
import { createHash } from 'crypto';

import { ENV } from '@/utils/env';
import {
  EventsListResponseDto,
  DetailedEventResponseDto,
  AuthStatusResponseDto,
  SuccessOkResponseDto,
  AttendanceStatusResponseDto,
  AttendanceStatusDto,
  CalendarStatusResponseDto,
  CalendarStatusDto,
  SearchUsersResponseDto,
  UserProfileResponseDto,
} from '@/dto';
import {
  Optional,
  BaseEventEntity,
  PaginationResult,
  AuthUser,
  DetailedEventEntity,
  Attendance,
  Calendar,
  UserEntity,
} from '@/domain/types';
import { AttendanceStatus, CalendarStatus, Role } from '@/domain/constants';
import {
  mapDtoToBaseEvent,
  mapDtoToUser,
  mapDtoToDetailedEvent,
  mapDetailedEventToDto,
  mapDtoToAttendance,
  mapAttendanceToDto,
  mapDtoToCalendar,
  mapCalendarToDto,
} from '@/utils/mappers';

export interface ApiResult {
  data: any | null;
  text: string | null;
  status: number | null;
  error: { message: string | null; obj: Error | null };
}

interface CacheEntry {
  timestamp: number;
  result: ApiResult;
}

class Api {
  // Cache functionality begin
  private static cache: Map<string, CacheEntry> = new Map();
  private static globalCacheTTL: number = 3 * 1000; // milliseconds
  private localCacheTTL: number | null = null; // milliseconds
  private cacheKey: string | null = null;

  public static clearCache(): void {
    Api.cache.clear();
  }

  public static setGlobalCacheTTL(ttl: number): void {
    Api.globalCacheTTL = ttl;
  }

  public setLocalCacheTTL(ttl: number): void {
    this.localCacheTTL = ttl;
  }

  private setCacheKey(): void {
    const cacheKeyData = JSON.stringify({
      path: this.path,
      options: this.options,
    });
    this.cacheKey = createHash('sha256').update(cacheKeyData).digest('hex');
  }

  private getCachedResult(): boolean {
    this.setCacheKey();
    if (!this.cacheKey) return false;
    const cached = Api.cache.get(this.cacheKey);
    if (!cached) return false;
    // Check if cache entry has expired
    if (
      Date.now() - cached.timestamp >
      (this.localCacheTTL ? this.localCacheTTL : Api.globalCacheTTL)
    ) {
      Api.cache.delete(this.cacheKey);
      return false;
    }
    this.result = structuredClone(cached.result);
    return true;
  }

  private setCacheResult(): boolean {
    if (!this.cacheKey) return false;
    Api.cache.set(this.cacheKey, {
      timestamp: Date.now(),
      result: structuredClone(this.result),
    });
    return true;
  }

  private isCacheable(): boolean {
    return !this.options?.method?.toUpperCase().match(/POST|PATCH|DELETE/);
  }
  // Cache functionality end

  private result: ApiResult;
  private path: string;
  private options: RequestInit;

  constructor() {
    this.result = {
      data: null,
      text: null,
      status: null,
      error: { message: null, obj: null },
    };
    this.path = '';
    this.options = {};
  }

  public initialize(path: string, options = {} as RequestInit): Api {
    this.path = path;
    this.options = options;
    return this;
  }

  public async fetch(): Promise<Api> {
    if (!this.options.next) this.options.next = { revalidate: 3 };
    if (!this.options.headers) this.options.headers = {};

    this.options.headers = {
      ...this.options.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    } as HeadersInit;

    // https://stackoverflow.com/questions/76285120/error-dynamic-server-usage-headers-on-next-13-4
    const requestHeaders = headers();
    const cookie = requestHeaders.get('cookie');
    if (cookie) {
      this.options.headers = {
        ...this.options.headers,
        cookie,
      } as HeadersInit;
    }

    // Cache check
    if (this.isCacheable()) {
      if (this.getCachedResult()) {
        return this;
      }
    }

    let res: Response;
    try {
      console.log(
        'fetching',
        `${ENV.API_PROTOCOL}://${ENV.API_HOST}:${ENV.API_PORT}${this.path}`
      );

      res = await fetch(
        `${ENV.API_PROTOCOL}://${ENV.API_HOST}:${ENV.API_PORT}${this.path}`,
        this.options
      );
    } catch (error: any) {
      this.result.error.obj = error;
      return this;
    }

    this.result.status = res.status;
    this.result.text = await res.text();

    if (!res.headers.get('content-type')?.includes('application/json')) {
      return this;
    }

    let json;
    try {
      json = JSON.parse(this.result.text);
    } catch (error: any) {
      this.result.error.obj = error;
      return this;
    }

    if (res.ok) {
      this.result.data = json;
    } else {
      this.result.error.message = json.error;
    }

    // Cache set
    if (this.isCacheable()) {
      this.setCacheResult();
    }

    return this;
  }

  public getData(): any | null {
    return this.result.data;
  }

  public isError(): boolean {
    return this.result?.data === null;
  }

  public isUnexpectedError(): boolean {
    return this.isError() && this.result.error.obj !== null;
  }

  public isApiRegularError(): boolean {
    return (
      this.isError() &&
      this.result.status !== null &&
      this.result.error.message !== null
    );
  }

  public isApiValidatorError(): boolean {
    return (
      this.isError() &&
      !this.isApiRegularError() &&
      (this.result.text?.length ?? 0) > 5
    );
  }

  public getUiErrorMessage(): string {
    if (this.isApiRegularError()) {
      return `Error ${this.result.status}: ${this.result.error.message}`;
    } else if (this.isApiValidatorError()) {
      return 'Validation error: ' + this.result.text;
    } else {
      return 'Unexpected error occurred';
    }
  }

  public getDebugErrorMessage(): string {
    if (this.isUnexpectedError()) {
      return `Debug error: message - ${this.result.error.obj?.message}, stack - ${this.result.error.obj?.stack}`;
    } else {
      return 'No debug error';
    }
  }

  public isNotFound(): boolean {
    return this.result.status === 404;
  }

  public getDebugObj(): ApiResult {
    return this.result;
  }

  public fetchEvents(page = 1): Promise<Api> {
    this.initialize(`/api/events?page=${page}&limit=12`);
    return this.fetch();
  }

  public getEvents(): {
    events: BaseEventEntity[];
    pagination: PaginationResult;
  } | null {
    const responseDto: EventsListResponseDto | null = this.getData();
    if (
      !responseDto?.data?.events ||
      !(responseDto?.data?.events.length >= 0) ||
      !responseDto?.meta?.pagination?.totalPages ||
      !responseDto?.meta?.pagination?.currentPage
    ) {
      return null;
    }
    const pagination: PaginationResult = responseDto?.meta?.pagination;
    const events = responseDto.data.events.map(mapDtoToBaseEvent);
    return { events, pagination };
  }

  public fetchAuthUser(): Promise<Api> {
    this.initialize('/api/auth/status');
    return this.fetch();
  }

  public getAuthUser(): AuthUser | null {
    const responseDto: AuthStatusResponseDto | null = this.getData();
    if (!responseDto?.data?.user) {
      return null;
    }
    return mapDtoToUser(responseDto?.data?.user);
  }

  public fetchEvent(id: number): Promise<Api> {
    this.initialize(`/api/events/${id}`);
    return this.fetch();
  }

  public getEvent(): DetailedEventEntity | null {
    const responseDto: DetailedEventResponseDto | null = this.getData();
    const eventDto = responseDto?.data?.event;
    if (!eventDto) {
      return null;
    }
    return mapDtoToDetailedEvent(eventDto);
  }

  public createEvent(event: DetailedEventEntity): Promise<Api> {
    const eventDto = mapDetailedEventToDto(event);
    this.initialize('/api/events', {
      method: 'POST',
      body: JSON.stringify(eventDto),
    });
    return this.fetch();
  }

  public updateEvent(event: DetailedEventEntity, id: number): Promise<Api> {
    const eventDto = mapDetailedEventToDto(event);
    this.initialize(`/api/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(eventDto),
    });
    return this.fetch();
  }

  public deleteEvent(id: number): Promise<Api> {
    this.initialize(`/api/events/${id}`, {
      method: 'DELETE',
    });
    return this.fetch();
  }

  public isEventDeleted(): boolean {
    const responseDto: SuccessOkResponseDto | null = this.getData();
    return responseDto?.success === true;
  }

  public fetchAttendance(userId: number, eventId: number): Promise<Api> {
    this.initialize(`/api/users/${userId}/events/${eventId}/attendance-status`);
    this.setLocalCacheTTL(10);
    return this.fetch();
  }

  public setAttendance(
    userId: number,
    eventId: number,
    status: AttendanceStatus
  ): Promise<Api> {
    this.initialize(
      `/api/users/${userId}/events/${eventId}/attendance-status`,
      {
        method: 'PATCH',
        body: JSON.stringify(mapAttendanceToDto(status)),
      }
    );
    return this.fetch();
  }

  public getAttendance(): Optional<
    Attendance,
    'userId' | 'eventId' | 'createdAt' | 'updatedAt'
  > | null {
    const responseDto: AttendanceStatusResponseDto | null = this.getData();
    const attendanceDto: AttendanceStatusDto | undefined =
      responseDto?.data?.attendanceStatus;
    if (!attendanceDto) {
      return null;
    }
    return mapDtoToAttendance(attendanceDto);
  }

  public fetchCalendar(userId: number, eventId: number): Promise<Api> {
    this.initialize(`/api/users/${userId}/events/${eventId}/calendar-status`);
    this.setLocalCacheTTL(10);
    return this.fetch();
  }

  public setCalendar(
    userId: number,
    eventId: number,
    status: CalendarStatus
  ): Promise<Api> {
    this.initialize(`/api/users/${userId}/events/${eventId}/calendar-status`, {
      method: 'PATCH',
      body: JSON.stringify(mapCalendarToDto(status)),
    });
    return this.fetch();
  }

  public getCalendar(): Optional<
    Calendar,
    'userId' | 'eventId' | 'createdAt' | 'updatedAt'
  > | null {
    const responseDto: CalendarStatusResponseDto | null = this.getData();
    const calendarDto: CalendarStatusDto | undefined =
      responseDto?.data?.calendarStatus;
    if (!calendarDto) {
      return null;
    }
    return mapDtoToCalendar(calendarDto);
  }

  public fetchUsers(searchTerm: string): Promise<Api> {
    this.initialize(`/api/users?search=${encodeURIComponent(searchTerm)}`);
    return this.fetch();
  }

  public getUsers(): UserEntity[] | null {
    const responseDto: SearchUsersResponseDto | null = this.getData();
    if (!responseDto?.data?.users || !(responseDto?.data?.users.length >= 0)) {
      return null;
    }
    const users = responseDto.data.users.map(mapDtoToUser);
    return users;
  }

  public updateUserRole(userId: number, userRole: Role): Promise<Api> {
    this.initialize(`/api/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role: userRole }),
    });
    return this.fetch();
  }

  public updateUserProfile(userId: number, userName: string): Promise<Api> {
    this.initialize(`/api/users/${userId}/profile`, {
      method: 'PATCH',
      body: JSON.stringify({ name: userName }),
    });
    return this.fetch();
  }

  public getUser(): UserEntity | null {
    const responseDto: UserProfileResponseDto | null = this.getData();
    if (!responseDto?.data?.user) {
      return null;
    }
    return mapDtoToUser(responseDto?.data?.user);
  }
}

export { Api };

export const getAuthUser = async (): Promise<AuthUser> => {
  const api = new Api();
  await api.fetchAuthUser();
  return api.getAuthUser();
};
