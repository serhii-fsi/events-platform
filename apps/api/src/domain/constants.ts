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
export const ERRORS = {
  // Error messages
  NOT_AUTHORIZED: 'User not authorized',
  // Event validation errors
  EVENT_NOT_FOUND: 'Event not found',
  FETCH_EVENTS: 'Failed to fetch events',
  CREATE_EVENT: 'Failed to create event',
  INVALID_DATE_RANGE: 'End date must be after start date',
} as const;
