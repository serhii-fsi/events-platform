import { notFound } from 'next/navigation';
import { Api } from 'src/modules/api';

import { Event } from '@/components/Event';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  if (!eventId || String(eventId) !== id) {
    throw new Error('No event id provided');
  }

  const [apiEvent, apiAuth] = await Promise.all([
    new Api().fetchEvent(eventId),
    new Api().fetchAuthUser(),
  ]);

  if (apiEvent.isNotFound()) notFound();
  if (apiEvent.isError()) {
    throw new Error(apiEvent.getUiErrorMessage());
  }
  const event = apiEvent.getEvent();
  if (!event) {
    throw new Error('Unexpected error: unable to get event');
  }

  const authUser = apiAuth.getAuthUser();
  let attendance = null;
  let calendar = null;
  if (authUser?.id) {
    const [apiAttendance, apiCalendar] = await Promise.all([
      new Api().fetchAttendance(authUser.id, eventId),
      new Api().fetchCalendar(authUser.id, eventId),
    ]);
    attendance = apiAttendance.getAttendance();
    calendar = apiCalendar.getCalendar();
  }

  return (
    <div className="my-gap5">
      <Event
        event={event}
        authUser={authUser}
        attendance={attendance}
        calendar={calendar}
      />
    </div>
  );
}
