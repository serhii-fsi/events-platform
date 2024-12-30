import { date } from '@/utils/date';
import { BaseEventEntity } from '@/domain/types';
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
}: BaseEventEntity) => {
  const startEndObj = date.toStartEndObj(startAt, endAt);

  return (
    <Link href={`/events/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-text2">{title}</CardTitle>

          <CardDescription>
            {startEndObj.date && startEndObj.timeRange ? (
              <>
                <div className="">{startEndObj.date}</div>
                <div className="">{startEndObj.timeRange}</div>
              </>
            ) : (
              <>
                <div className="">{startEndObj.start?.date}</div>
                <div className="">{startEndObj.start?.time}</div>

                <div className="">{startEndObj.end?.date}</div>
                <div className="">{startEndObj.end?.time}</div>
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-text1">{location}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};
