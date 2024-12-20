import { Role, AttendanceStatus, CalendarStatus } from './constants';

// Repository params types
export interface PaginationParams {
  skip: number;
  take: number;
}

// Repository result types
export interface ItemsWithTotalResult<T> {
  items: T[];
  totalItems: number;
}

// Service result types
export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
}

// Domain-specific types
export type UserId = number;
export type EventId = number;

// Domain-specific complex types
export type AuthenticatedUser = {
  name?: string;
  picture?: string;
  email: string;
};

export interface EventFilters {
  startDate?: Date;
  endDate?: Date;
  location?: string;
}

export interface UserFilters {
  role?: Role;
  searchTerm?: string;
}

// Domain update types
export type UpdateEventEntity = Partial<
  Omit<DetailedEventEntity, 'id' | 'createdAt' | 'updatedAt'>
>;

// Entities
export interface BaseEventEntity {
  id?: EventId;
  title: string;
  startAt: Date;
  endAt: Date;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DetailedEventEntity extends BaseEventEntity {
  description: string;
}

export interface UserEntity {
  id?: UserId;
  name: string;
  email: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

// Relationship entities
export interface Attendance {
  userId: UserId;
  eventId: EventId;
  status: AttendanceStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Calendar {
  userId: UserId;
  eventId: EventId;
  status: CalendarStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
