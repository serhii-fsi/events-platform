import { mapDtoToBaseEvent } from '@/utils/mappers';
import { fetchApi } from '@/utils/fetchApi';
import { EventCard } from '@/components/EventCard';

export default async function Index({
  params: { id },
}: {
  params: { id: string };
}) {
  const json = await fetchApi(`/api/events/${id}`);

  if (json.error) {
    throw new Error(json.error);
  }

  let event = json?.data?.event || [];
  event = mapDtoToBaseEvent(event);

  return (
    <div className="p-4">
      <EventCard key={event.id} {...event} />
    </div>
  );
}
