// Domain-specific enums
export enum UserRole {
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

export enum AttendanceStatus {
  ATTENDING = 'attending',
  DECLINED = 'declined',
}

export enum CalendarStatus {
  ADDED = 'added',
  REMOVED = 'removed',
}

// Business rule constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 1000,
  LOCATION_MAX_LENGTH: 100,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 50,
} as const;

// Domain-specific messages
export const DOMAIN_MESSAGES = {
  EVENT_NOT_FOUND: 'Event not found',
  USER_NOT_AUTHORIZED: 'User not authorized',
  INVALID_DATE_RANGE: 'End date must be after start date',
  FETCH_EVENTS_ERROR: 'Failed to fetch events',
} as const;
