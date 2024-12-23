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
    <div className="flex flex-col gap-y-gap2">
      {/* Banner Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-text4 font-bold">Explore Local Events</h1>
        <p className="text-text1">
          Your guide to gigs, clubs, festivals, and more!
        </p>
      </div>
      {/* Events List */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gap2">
        {events.map((evt: any) => (
          <EventCard key={evt.id} {...evt} />
        ))}
      </div>
    </div>
  );
};
