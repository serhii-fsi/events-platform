import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Api } from 'src/modules/api';
import { editEvent } from 'src/app/actions';

import { EventForm } from '@/components/EventForm';

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
  if (!authUser) {
    redirect('/');
  }

  if (apiEvent.isNotFound()) notFound();
  if (apiEvent.isError()) {
    throw new Error(apiEvent.getUiErrorMessage());
  }

  const event = apiEvent.getEvent();
  if (!event) {
    throw new Error('Unexpected error: unable to get event from server');
  }

  return (
    <div className="my-gap5">
      <h1 className="text-4xl font-black text-center mb-gap5">Edit Event</h1>
      <EventForm {...{ formAction: editEvent, redirect: 'replace', event }} />
    </div>
  );
}
