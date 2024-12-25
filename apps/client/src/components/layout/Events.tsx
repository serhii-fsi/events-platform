import { Api } from 'src/modules/api';
import { mapDtoToBaseEvent } from '@/utils/mappers';
import { EventsListResponseDto, BaseEventDto } from '@/dto';
import { EventCard } from '@/components/EventCard';

export const Events = async ({ page = '1' }) => {
  const api = new Api<EventsListResponseDto>(`/api/events`);
  await api.fetch();

  if (api.isError()) {
    throw new Error(api.getUiErrorMessage());
  }

  const responseDto = api.getData() as EventsListResponseDto;
  const eventsDto = responseDto?.data?.events as BaseEventDto[];
  if (!eventsDto) {
    throw new Error(
      'Unexpected error: server response does not contain events'
    );
  }
  if (eventsDto.length < 1) {
    throw new Error('Server response does not contain events');
  }

  const events = eventsDto.map(mapDtoToBaseEvent);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gap2">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
