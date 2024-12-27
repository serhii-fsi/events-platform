'use server';

import { DetailedEventEntity } from '@/domain/types';
import { Api } from 'src/modules/api';

export type EventFormActionResponse = {
  id?: number;
  success: boolean;
  message: string;
};

export async function createEvent(
  event: DetailedEventEntity
): Promise<EventFormActionResponse> {
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

  const createdEvent = api.getCreatedEvent();
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
  event: Partial<DetailedEventEntity>
): Promise<EventFormActionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    id: 1,
    success: true,
    message: 'Success',
  };
}
