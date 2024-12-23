import { mapDtoToBaseEvent } from '@/utils/mappers';
import { fetchApi } from '@/utils/fetchApi';
import { EventCard } from '@/components/EventCard';

export const Events = async ({ page = '1' }) => {
  const json = await fetchApi(`/api/events?page=${page}`);

  if (json.error) {
    throw new Error(json.error);
  }

  let events = json?.data?.events || [];
  events = events.map(mapDtoToBaseEvent);

  return (
    <div className="p-4">
      {/* Banner Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Explore Local Events</h1>
        <p>Your guide to gigs, clubs, festivals, and more!</p>
      </div>
      {/* Events List */}
      {events.map((evt: any) => (
        <EventCard key={evt.id} {...evt} />
      ))}
    </div>
  );
};
