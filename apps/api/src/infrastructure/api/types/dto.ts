import { components } from '../openapi/schema';
import * as schema from '../openapi/schema';

// Basic component types
export type UserDto = components['schemas']['User'];
export type BaseEventDto = components['schemas']['BaseEvent'];
export type DetailedEventDto = components['schemas']['DetailedEvent'];
export type AttendanceStatusDto = components['schemas']['AttendanceStatus'];
export type CalendarStatusDto = components['schemas']['CalendarStatus'];
export type PaginationDto = components['schemas']['Pagination'];

// Request DTOs
export type CreateEventRequestDto = components['schemas']['CreateEventRequest'];
export type UpdateEventRequestDto = components['schemas']['UpdateEventRequest'];
export type UpdateAttendanceStatusRequestDto =
  components['schemas']['UpdateAttendanceStatusRequest'];
export type UpdateCalendarStatusRequestDto =
  components['schemas']['UpdateCalendarStatusRequest'];
export type UpdateUserProfileRequestDto =
  components['schemas']['UpdateUserProfileRequest'];
export type UpdateUserRoleRequestDto =
  components['schemas']['UpdateUserRoleRequest'];

// Response DTOs
export type AuthStatusResponseDto = components['schemas']['AuthStatusResponse'];
export type EventsListResponseDto = components['schemas']['EventsListResponse'];
export type DetailedEventResponseDto =
  components['schemas']['DetailedEventResponse'];
export type AttendanceStatusResponseDto =
  components['schemas']['AttendanceStatusResponse'];
export type CalendarStatusResponseDto =
  components['schemas']['CalendarStatusResponse'];
export type UserProfileResponseDto =
  components['schemas']['UserProfileResponse'];
export type SearchUsersResponseDto =
  components['schemas']['SearchUsersResponse'];

// Standard Response types
export type SuccessOkResponseDto =
  components['responses']['SuccessOk']['content']['application/json'];
export type SuccessCreatedResponseDto =
  components['responses']['SuccessCreated']['content']['application/json'];
export type SuccessNoContentResponseDto =
  components['responses']['SuccessNoContent']['content']['application/json'];

// Error Response types
export type ErrorBadRequestResponseDto =
  components['responses']['ErrorBadRequest']['content']['application/json'];
export type ErrorUnauthorizedResponseDto =
  components['responses']['ErrorUnauthorized']['content']['application/json'];
export type ErrorForbiddenResponseDto =
  components['responses']['ErrorForbidden']['content']['application/json'];
export type ErrorNotFoundResponseDto =
  components['responses']['ErrorNotFound']['content']['application/json'];
export type ErrorNotAcceptableResponseDto =
  components['responses']['ErrorNotAcceptable']['content']['application/json'];
export type ErrorInternalResponseDto =
  components['responses']['ErrorInternal']['content']['application/json'];
export type ErrorResponseDto =
  | ErrorBadRequestResponseDto
  | ErrorUnauthorizedResponseDto
  | ErrorForbiddenResponseDto
  | ErrorNotFoundResponseDto
  | ErrorInternalResponseDto
  | ErrorNotAcceptableResponseDto;
export type ErrorResponseCodes = 400 | 401 | 403 | 404 | 406 | 500;

// Parameter types
export type PageQuery = components['parameters']['PageQuery'];
export type LimitQuery = components['parameters']['LimitQuery'];
export type AfterQuery = components['parameters']['AfterQuery'];
export type EventIdPath = components['parameters']['EventIdPath'];
export type UserIdPath = components['parameters']['UserIdPath'];
export type SearchQuery = components['parameters']['SearchQuery'];

// Parameter DTOs
export type EventIdPathDto =
  schema.paths['/api/events/{eventId}']['get']['parameters']['path'];
export type UserIdPathDto =
  schema.paths['/api/users/{userId}/profile']['get']['parameters']['path'];
export type PageQueryDto =
  schema.paths['/api/events']['get']['parameters']['query'];
export type SearchQueryDto =
  schema.paths['/api/users']['get']['parameters']['query'];
export type AttendanceStatusPathDto =
  schema.paths['/api/users/{userId}/events/{eventId}/attendance-status']['get']['parameters']['path'];
export type CalendarStatusPathDto =
  schema.paths['/api/users/{userId}/events/{eventId}/calendar-status']['get']['parameters']['path'];
