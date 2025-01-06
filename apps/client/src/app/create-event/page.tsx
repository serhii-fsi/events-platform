import { EventForm } from '@/components/EventForm';
import { createEvent } from 'src/app/actions';

export default async function Page() {
  return (
    <div>
      <h1 className="text-text5 font-black text-center mb-gap5">
        Create Event
      </h1>
      <EventForm {...{ formAction: createEvent, redirect: 'replace' }} />
    </div>
  );
}
