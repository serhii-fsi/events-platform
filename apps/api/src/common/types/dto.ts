import { components } from '../../openapi/types/schema';

export type AuthStatusResponseDto = components['schemas']['AuthStatusResponse'];
export type EventsListResponseDto = components['schemas']['EventsListResponse'];
export type CreateEventRequestDto = components['schemas']['CreateEventRequest'];
export type CreateEventResponseDto =
  components['schemas']['CreateEventResponse'];
export type EventDetailsResponseDto =
  components['schemas']['EventDetailsResponse'];
export type UpdateEventRequestDto = components['schemas']['UpdateEventRequest'];
export type AttendanceStatusResponseDto =
  components['schemas']['AttendanceStatusResponse'];
export type UpdateAttendanceStatusRequestDto =
  components['schemas']['UpdateAttendanceStatusRequest'];
export type CalendarStatusResponseDto =
  components['schemas']['CalendarStatusResponse'];
export type UpdateCalendarStatusRequestDto =
  components['schemas']['UpdateCalendarStatusRequest'];
export type UserProfileResponseDto =
  components['schemas']['UserProfileResponse'];
export type UpdateUserProfileRequestDto =
  components['schemas']['UpdateUserProfileRequest'];
export type SearchUsersResponseDto =
  components['schemas']['SearchUsersResponse'];
export type UpdateUserRoleRequestDto =
  components['schemas']['UpdateUserRoleRequest'];

// Response types
export type SuccessResponse =
  components['responses']['Success']['content']['application/json'];
export type ErrorResponseDto =
  components['responses']['Error']['content']['application/json'];

// Parameter types
export type AuthorizationHeader =
  components['parameters']['AuthorizationHeader'];
export type PageQuery = components['parameters']['PageQuery'];
export type LimitQuery = components['parameters']['LimitQuery'];
export type EventIdPath = components['parameters']['EventIdPath'];
export type UserIdPath = components['parameters']['UserIdPath'];
export type SearchQuery = components['parameters']['SearchQuery'];
