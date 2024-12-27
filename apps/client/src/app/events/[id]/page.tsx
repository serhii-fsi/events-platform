import { notFound } from 'next/navigation';
import { Api } from 'src/modules/api';
import { formatDate } from '@/utils/formatDate';
import { formatEventTime } from '@/utils/formatEventTime';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcnui/card';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    throw new Error('No event id provided');
  }

  const api = new Api();
  await api.fetchEvent(id);

  if (api.isNotFound()) notFound();
  if (api.isError()) {
    throw new Error(api.getUiErrorMessage());
  }

  const event = api.getEvent();
  if (!event) {
    throw new Error('Unexpected error: unable to get event from server');
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-text2">{event.title}</CardTitle>
          <CardDescription>{formatDate(event.startAt)}</CardDescription>
          <CardDescription>
            {formatEventTime(event.startAt, event.endAt)}
          </CardDescription>
          <CardDescription>{event.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-text1">{event.description}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
