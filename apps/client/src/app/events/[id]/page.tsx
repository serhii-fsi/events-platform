import { notFound } from 'next/navigation';
import { Api } from 'src/modules/api';
import { convertToHtml } from '@/utils/convertToHtml';

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
    throw new Error('Unexpected error: unable to get event from server');
  }

  event.description = convertToHtml(event.description);

  return (
    <div className="my-gap5">
      <Event event={event} authUser={authUser} />
    </div>
  );
}
