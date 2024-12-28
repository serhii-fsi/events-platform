'use server';

import { DetailedEventEntity } from '@/domain/types';
import { Api } from 'src/modules/api';

export type ActionResponse = {
  id?: number;
  success: boolean;
  message: string;
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
