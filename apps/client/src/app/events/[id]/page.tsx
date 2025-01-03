import { notFound } from 'next/navigation';
import { Api } from 'src/modules/api';

import { Event } from '@/components/Event';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    throw new Error('No event id provided');
  }

  const [apiAuth, apiEvent] = await Promise.all([
    new Api().fetchAuthUser(),
    new Api().fetchEvent(id),
  ]);

  const authUser = apiAuth.getAuthUser();

  if (apiEvent.isNotFound()) notFound();
  if (apiEvent.isError()) {
    throw new Error(apiEvent.getUiErrorMessage());
  }

  const event = apiEvent.getEvent();
  if (!event) {
    throw new Error('Unexpected error: unable to get event');
  }

  const [apiAttendance, apiCalendar] = await Promise.all([
    new Api().fetchAttendance(String(authUser?.id), id),
    new Api().fetchCalendar(String(authUser?.id), id),
  ]);

  const attendance = apiAttendance.getAttendance();
  const calendar = apiCalendar.getCalendar();

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
