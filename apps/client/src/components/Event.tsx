import { date } from '@/utils/date';
import {
  Optional,
  DetailedEventEntity,
  AuthUser,
  Attendance,
  Calendar,
} from '@/domain/types';
import { deleteEvent } from 'src/app/actions';

import { Description } from '@/components/Description';
import { EventControl } from '@/components/EventControl';
import { EventAttendance } from '@/components/EventAttendance';

export const Event = ({
  event,
  authUser,
  attendance,
  calendar,
}: {
  event: DetailedEventEntity;
  authUser: AuthUser | null;
  attendance: Optional<
    Attendance,
    'userId' | 'eventId' | 'createdAt' | 'updatedAt'
  > | null;
  calendar: Optional<
    Calendar,
    'userId' | 'eventId' | 'createdAt' | 'updatedAt'
  > | null;
}) => {
  const startEndObj = date.toStartEndObj(event.startAt, event.endAt);

  return (
    <div className="flex flex-col gap-gap5 w-full md:flex-row">
      {/* Left side */}
      <div className="w-full md:w-2/3">
        <div className="flex flex-col gap-y-gap3">
          <h1 className="flex flex-col gap-y-gapText text-text4 font-bold">
            {event.title}
          </h1>
          <Description text={event.description} />
          {authUser?.id ? (
            <EventAttendance
              authUser={authUser}
              event={event}
              attendance={attendance}
              calendar={calendar}
            />
          ) : null}
        </div>
      </div>
      {/* Right side */}
      <div className="w-full flex flex-col gap-y-gap3 md:w-1/3">
        {startEndObj.date && startEndObj.timeRange ? (
          <div className="flex flex-col gap-gap1">
            <div className="text-text3 font-bold">Date</div>
            <div className="flex flex-col gap-gap1 justify-start pl-gap2">
              <div className="">{startEndObj.date}</div>
              <div className="">{startEndObj.timeRange}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-gap1">
            <div className="text-text3 font-bold">Starts</div>
            <div className="flex flex-col gap-gap1 justify-start pl-gap2">
              <div className="">{startEndObj.start?.date}</div>
              <div className="">{startEndObj.start?.time}</div>
            </div>
            <div className="text-text3 font-bold">Ends</div>
            <div className="flex flex-col gap-gap1 justify-start pl-gap2">
              <div className="">{startEndObj.end?.date}</div>
              <div className="">{startEndObj.end?.time}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-gap1">
          <div className="text-text3 font-bold">Location</div>
          <div className="flex gap-gap1 justify-start pl-gap2">
            <div className="">{event.location}</div>
          </div>
        </div>
        {authUser?.role === 'editor' || authUser?.role === 'admin' ? (
          <div className="flex flex-col gap-gap1 items-end">
            <EventControl
              event={event}
              deleteAction={deleteEvent}
              redirectPath={'/'}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
