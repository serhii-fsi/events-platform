import { notFound } from 'next/navigation';
import { DetailedEventResponseDto, DetailedEventDto } from '@/dto';
import { mapDtoToDetailedEvent } from '@/utils/mappers';
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

async function getEventById(id: string) {
  const api = new Api<DetailedEventResponseDto>(`/api/events/${id}`);
  await api.fetch();

  if (api.isNotFound()) notFound();
  if (api.isError()) {
    throw new Error(api.getUiErrorMessage());
  }

  const responseDto = api.getData() as DetailedEventResponseDto;
  const eventDto = responseDto?.data?.event as DetailedEventDto;
  if (!eventDto) {
    throw new Error('Unexpected error: server response does not contain event');
  }

  const event = mapDtoToDetailedEvent(eventDto);
  return event;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    throw new Error('No event id provided');
  }

  const event = await getEventById(id);

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
          <p className="text-text1">{event?.description}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
