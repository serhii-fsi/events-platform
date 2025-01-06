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
import { Calendar, Clock, LocateFixed } from 'lucide-react';

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
        <CardHeader className="space-y-gap2 p-gap2">
          <CardTitle className="text-text2 leading-normal">{title}</CardTitle>
          <CardDescription className="text-text1 font-light space-y-gapText">
            {startEndObj.date && startEndObj.timeRange ? (
              <>
                <div className="flex gap-gapText">
                  <Calendar
                    strokeWidth={1}
                    className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
                  />
                  {startEndObj.date}
                </div>
                <div className="flex gap-gapText">
                  <Clock
                    strokeWidth={1}
                    className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
                  />
                  {startEndObj.timeRange}
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-gapText">
                  <Calendar
                    strokeWidth={1}
                    className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
                  />
                  {startEndObj.start?.date}
                </div>
                <div className="flex gap-gapText">
                  <Clock
                    strokeWidth={1}
                    className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
                  />
                  {startEndObj.start?.time}
                </div>
                <div className="flex gap-gapText pl-[20px]">
                  <Calendar
                    strokeWidth={1}
                    className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
                  />
                  {startEndObj.end?.date}
                </div>
                <div className="flex gap-gapText pl-[20px]">
                  <Clock
                    strokeWidth={1}
                    className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
                  />
                  {startEndObj.end?.time}
                </div>
              </>
            )}
            <div className="flex gap-gapText">
              <LocateFixed
                strokeWidth={1}
                className="w-[20px] h-[20px] mt-[2px] flex-shrink-0"
              />
              {location}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
