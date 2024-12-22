import { mapDtoToBaseEvent } from '@/utils/mappers';
import { fetchApi } from '@/utils/fetchApi';
import { EventCard } from '@/components/EventCard';
import { log } from 'node:console';

export default async function Index({
  params: { id },
}: {
  params: { id: string };
}) {
  const { json, error } = await fetchApi(`/api/events/${id}`);

  if (error) {
    throw new Error(error);
  }

  let event = json?.data?.event || [];
  event = mapDtoToBaseEvent(event);

  return (
    <div className="p-4">
      <EventCard key={event.id} {...event} />
    </div>
  );
}
