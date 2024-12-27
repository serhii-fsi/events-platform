'use server';

import { DetailedEventEntity } from '@/domain/types';
import {
  DetailedEventResponseDto,
  DetailedEventDto,
  CreateEventRequestDto,
} from '@/dto';
import { mapDetailedEventToDto } from '@/utils/mappers';
import { Api } from 'src/modules/api';

export type EventFormActionResponse = {
  id?: number;
  success: boolean;
  message: string;
};

export async function createEvent(
  event: DetailedEventEntity
): Promise<EventFormActionResponse> {
  console.error('event data <<<=====================', event);
  const res: EventFormActionResponse = { success: false, message: '' };

  // Normalize line endings and remove excessive new lines
  event.description = event.description
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  const reqEventDto: CreateEventRequestDto = mapDetailedEventToDto(event);
  console.error('event data <<<=====================', reqEventDto);

  const api = new Api<DetailedEventResponseDto>(`/api/events`, {
    method: 'POST',
    body: JSON.stringify(reqEventDto),
  });
  await api.fetch();

  if (api.isError()) {
    res.success = false;
    res.message = api.getUiErrorMessage();
    return res;
  }

  const responseDto = api.getData() as DetailedEventResponseDto;
  const eventDto = responseDto?.data?.event as DetailedEventDto;
  if (!eventDto || !eventDto.id) {
    res.success = false;
    res.message = 'Unexpected error: server response does not contain event';
    return res;
  }

  return {
    id: eventDto.id,
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
