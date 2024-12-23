import { mapDtoToDetailedEvent } from '@/utils/mappers';
import { fetchApi } from '@/utils/fetchApi';
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

export default async function Index({
  params: { id },
}: {
  params: { id: string };
}) {
  const json = await fetchApi(`/api/events/${id}`);

  if (json.error) {
    throw new Error(json.error);
  }

  let event = json?.data?.event || [];
  event = mapDtoToDetailedEvent(event);

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
