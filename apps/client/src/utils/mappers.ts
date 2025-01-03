import {
  UserDto,
  DetailedEventDto,
  BaseEventDto,
  AttendanceStatusDto,
  CalendarStatusDto,
  UpdateAttendanceStatusRequestDto,
  UpdateCalendarStatusRequestDto,
} from '@/dto';
import {
  UserEntity,
  BaseEventEntity,
  DetailedEventEntity,
  Optional,
  Attendance,
  Calendar,
} from '@/domain/types';
import { Role, AttendanceStatus, CalendarStatus } from '@/domain/constants';

export const mapDtoToBaseEvent = (
  dto: Optional<BaseEventDto, 'id' | 'createdAt' | 'updatedAt'>
): BaseEventEntity => ({
  ...(dto.id && { id: dto.id }),
  title: dto.title,
  startAt: new Date(dto.startAt),
  endAt: new Date(dto.endAt),
  location: dto.location,
  ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
  ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
});

export const mapDtoToDetailedEvent = (
  dto: Optional<DetailedEventDto, 'id' | 'createdAt' | 'updatedAt'>
): DetailedEventEntity => ({
  ...mapDtoToBaseEvent(dto),
  description: dto.description,
});

export const mapBaseEventToDto = (
  entity: BaseEventEntity
): Optional<BaseEventDto, 'id' | 'createdAt' | 'updatedAt'> => ({
  ...(entity.id && { id: entity.id }),
  title: entity.title,
  startAt: entity.startAt.toISOString(),
  endAt: entity.endAt.toISOString(),
  location: entity.location,
  ...(entity.createdAt && { createdAt: entity.createdAt.toISOString() }),
  ...(entity.updatedAt && { updatedAt: entity.updatedAt.toISOString() }),
});

export const mapDetailedEventToDto = (
  entity: DetailedEventEntity
): Optional<DetailedEventDto, 'id' | 'createdAt' | 'updatedAt'> => ({
  ...mapBaseEventToDto(entity),
  description: entity.description,
});

export const mapDtoToUser = (
  dto: Optional<UserDto, 'id' | 'createdAt' | 'updatedAt'>
): UserEntity => ({
  ...(dto.id && { id: dto.id }),
  name: dto.name,
  email: dto.email,
  role: dto.role as Role,
  ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
  ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
});

export const mapUserToDto = (
  entity: UserEntity
): Optional<UserDto, 'id' | 'createdAt' | 'updatedAt'> => ({
  ...(entity.id && { id: entity.id }),
  name: entity.name,
  email: entity.email,
  role: entity.role,
  ...(entity.createdAt && { createdAt: entity.createdAt.toISOString() }),
  ...(entity.updatedAt && { updatedAt: entity.updatedAt.toISOString() }),
});

export const mapDtoToAttendance = (
  dto: Optional<AttendanceStatusDto, 'createdAt' | 'updatedAt'>
): Optional<Attendance, 'userId' | 'eventId' | 'createdAt' | 'updatedAt'> => ({
  status: dto.status as AttendanceStatus,
  ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
  ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
});

export const mapAttendanceToDto = (
  attendanceStatus: AttendanceStatus
): UpdateAttendanceStatusRequestDto => ({
  attendanceStatus: attendanceStatus,
});

export const mapDtoToCalendar = (
  dto: Optional<CalendarStatusDto, 'createdAt' | 'updatedAt'>
): Optional<Calendar, 'userId' | 'eventId' | 'createdAt' | 'updatedAt'> => ({
  status: dto.status as CalendarStatus,
  ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
  ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
});

export const mapCalendarToDto = (
  calendarStatus: CalendarStatus
): UpdateCalendarStatusRequestDto => ({
  calendarStatus: calendarStatus,
});
