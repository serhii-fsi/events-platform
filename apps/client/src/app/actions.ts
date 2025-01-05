'use server';

import { revalidatePath } from 'next/cache';

import { DetailedEventEntity, UserEntity } from '@/domain/types';
import { AttendanceStatus, CalendarStatus, Role } from '@/domain/constants';
import { Api } from 'src/modules/api';

export type ActionResponse = {
  id?: number;
  success: boolean;
  message: string;
  data?: any;
};

export async function createEvent(
  event: DetailedEventEntity
): Promise<ActionResponse> {
  // Normalize line endings and remove excessive new lines
  event.description = event.description
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  const api = new Api();
  await api.createEvent(event);

  if (api.isError()) {
    return {
      success: false,
      message: api.getUiErrorMessage(),
    };
  }

  const createdEvent = api.getEvent();
  if (!createdEvent?.id) {
    return {
      success: false,
      message: 'Unexpected error: server response does not contain event',
    };
  }

  return {
    id: createdEvent.id,
    success: true,
    message: 'Event created successfully',
  };
}

export async function editEvent(
  event: DetailedEventEntity,
  id: number
): Promise<ActionResponse> {
  // Normalize line endings and remove excessive new lines
  event.description = event.description
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  const api = new Api();
  await api.updateEvent(event, id);

  if (api.isError()) {
    return {
      success: false,
      message: api.getUiErrorMessage(),
    };
  }

  const updatedEvent = api.getEvent();
  if (!updatedEvent?.id) {
    return {
      success: false,
      message: 'Unexpected error: server response does not contain event',
    };
  }

  revalidatePath(`/events/${id}`);

  return {
    id: updatedEvent.id,
    success: true,
    message: 'Event saved successfully',
  };
}

export async function deleteEvent(id: number): Promise<ActionResponse> {
  const api = new Api();
  await api.deleteEvent(id);

  if (api.isError()) {
    return {
      success: false,
      message: api.getUiErrorMessage(),
    };
  }

  if (!api.isEventDeleted()) {
    return {
      success: false,
      message: 'Unexpected error: event may not have been deleted',
    };
  }

  return {
    success: true,
    message: 'Event deleted successfully',
  };
}

export async function setAttendanceStatus(
  userId: number,
  eventId: number,
  status: AttendanceStatus
): Promise<ActionResponse> {
  const api = new Api();
  await api.setAttendance(userId, eventId, status);

  if (api.isError()) {
    return { success: false, message: api.getUiErrorMessage() };
  }

  revalidatePath(`/events/${eventId}`);

  return { success: true, message: '' };
}

export async function setCalendarStatus(
  userId: number,
  eventId: number,
  status: CalendarStatus
): Promise<ActionResponse> {
  return { success: true, message: '' };
}

export async function searchUsers(searchTerm: string): Promise<ActionResponse> {
  const api = new Api();
  await api.fetchUsers(searchTerm);

  if (api.isError()) {
    return {
      success: false,
      message: api.getUiErrorMessage(),
    };
  }

  const users = api.getUsers();
  if (!users) {
    return {
      success: false,
      message: 'Unexpected error: server response does not contain users',
    };
  }

  return {
    success: true,
    message: '',
    data: { users },
  };
}

export async function updateUserRole(
  userId: number,
  userRole: Role
): Promise<ActionResponse> {
  const api = new Api();
  await api.updateUserRole(userId, userRole);

  if (api.isError()) {
    return {
      success: false,
      message: api.getUiErrorMessage(),
    };
  }

  const updatedUser = api.getUser();

  if (!updatedUser?.id) {
    return {
      success: false,
      message: 'Unexpected error: server response does not contain user',
    };
  }

  return {
    id: updatedUser.id,
    success: true,
    message: 'Role successfully updated',
  };
}

export async function updateUserProfile(
  userId: number,
  userName: string
): Promise<ActionResponse> {
  const api = new Api();
  await api.updateUserProfile(userId, userName);

  if (api.isError()) {
    return {
      success: false,
      message: api.getUiErrorMessage(),
    };
  }

  const updatedUser = api.getUser();

  if (!updatedUser?.id) {
    return {
      success: false,
      message:
        'Unexpected error: server response does not contain user profile',
    };
  }

  revalidatePath(`/profile`);

  return {
    id: updatedUser.id,
    success: true,
    message: 'User profile successfully updated',
  };
}
