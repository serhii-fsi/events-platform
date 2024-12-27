import { EventForm } from '@/components/EventForm';
import { createEvent } from 'src/app/actions';

export default async function Page() {
  // const event = {
  //   id: 1,
  //   title: '111111111111111111111111',
  //   description: '222222222222222222222222222',
  //   startAt: new Date(),
  //   endAt: new Date(new Date(new Date().getTime() + 1000 * 60)),
  //   location: '444444444444444444444',
  // };

  return (
    <div className="my-gap5">
      <h1 className="text-4xl font-black text-center mb-gap5">Create Event</h1>
      <EventForm {...{ formAction: createEvent, redirect: 'replace' }} />
    </div>
  );
}
