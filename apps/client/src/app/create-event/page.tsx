import { EventForm } from '@/components/EventForm';
import { createEvent } from 'src/app/actions';

export default async function Page() {
  return (
    <div className="my-gap5">
      <h1 className="text-4xl font-black text-center mb-gap5">Create Event</h1>
      <EventForm {...{ formAction: createEvent, redirect: 'replace' }} />
    </div>
  );
}
