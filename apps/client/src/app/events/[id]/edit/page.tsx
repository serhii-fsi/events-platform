import { ErrorPage } from '@/components/ErrorPage';
import { notFound } from 'next/navigation';
import { Api } from 'src/modules/api';
import { Role } from '@/domain/constants';
import { editEvent } from 'src/app/actions';

import { EventForm } from '@/components/EventForm';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  if (!eventId || String(eventId) !== id) {
    return <ErrorPage message="No event id provided" />;
  }

  const [apiAuth, apiEvent] = await Promise.all([
    new Api().fetchAuthUser(),
    new Api().fetchEvent(eventId),
  ]);

  const authUser = apiAuth.getAuthUser();

  if (apiAuth.isError()) {
    return <ErrorPage message={apiAuth.getUiErrorMessage()} />;
  }

  if (authUser?.role !== Role.EDITOR && authUser?.role !== Role.ADMIN) {
    return <ErrorPage message="Only editors and admins can edit events" />;
  }

  if (apiEvent.isNotFound()) notFound();
  if (apiEvent.isError()) {
    return <ErrorPage message={apiEvent.getUiErrorMessage()} />;
  }

  const event = apiEvent.getEvent();
  if (!event) {
    return (
      <ErrorPage message="Unexpected error: unable to get event from server" />
    );
  }

  return (
    <div>
      <h1 className="text-text5 font-black text-center mb-gap5">Edit Event</h1>
      <EventForm {...{ formAction: editEvent, redirect: 'replace', event }} />
    </div>
  );
}
