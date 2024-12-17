import { AttendanceStatus, CalendarStatus, UserRole } from './constants';

// Branded types for IDs
export type UserId = number;
export type EventId = number;

export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseEventEntity extends BaseEntity {
  id: EventId;
  title: string;
  startAt: Date;
  endAt: Date;
  location: string | null;
}

export interface DetailedEventEntity extends BaseEventEntity {
  description: string;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role: UserRole;
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
