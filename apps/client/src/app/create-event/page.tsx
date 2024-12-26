import { EventForm } from '@/components/EventForm';

export default async function Page() {
  const event = {
    id: 1,
    title: '111111111111111111111111',
    description: '222222222222222222222222222',
    startAt: new Date(111111),
    endAt: new Date(),
    // location: '444444444444444444444',
  };

  return <EventForm event={event} />;
}
