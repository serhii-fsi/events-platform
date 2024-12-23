import { formatDate } from '@/utils/formatDate';
import { formatEventTime } from '@/utils/formatEventTime';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcnui/card';

export const EventCard = async ({
  id,
  title,
  startAt,
  endAt,
  location,
}: any) => {
  return (
    <Link href={`/events/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-text2">{title}</CardTitle>
          <CardDescription>{formatDate(startAt)}</CardDescription>
          <CardDescription>{formatEventTime(startAt, endAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-text1">{location}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};
