import { AttendanceStatus, CalendarStatus, UserRole } from './constants';

// Branded types for IDs
export type UserId = number;
export type EventId = number;

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

export interface User {
  userId?: UserId;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Attendance {
  userId: UserId;
  eventId: EventId;
  status: AttendanceStatus | null;
}

export interface Calendar {
  userId: UserId;
  eventId: EventId;
  status: CalendarStatus | null;
}
