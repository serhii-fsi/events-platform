import { date } from '@/utils/date';
import {
  Optional,
  DetailedEventEntity,
  AuthUser,
  Attendance,
  Calendar,
} from '@/domain/types';
import { Role } from '@/domain/constants';
import { ENV } from '@/utils/env';
import {
  deleteEvent,
  setAttendanceStatus,
  setCalendarStatus,
} from 'src/app/actions';

import { Calendar as CalendarIcon, Clock, LocateFixed } from 'lucide-react';

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

  const isEventAttendanceControlAllowed =
    authUser &&
    (authUser.role === Role.USER ||
      authUser.role === Role.EDITOR ||
      authUser.role === Role.ADMIN);

  const isEventControlAllowed =
    authUser && (authUser.role === Role.EDITOR || authUser.role === Role.ADMIN);

  return (
    <article className="flex flex-col w-full gap-gap4 md:flex-row md:gap-gap5">
      {/* Left side */}
      <div className="w-full md:w-2/3 flex flex-col gap-y-gap4">
        <div className="flex flex-col gap-y-gap3">
          <h1 className="text-text4 font-bold">{event.title}</h1>

          <Description text={event.description} className="text-text2" />
        </div>

        {isEventAttendanceControlAllowed ? (
          <EventAttendance
            authUser={authUser}
            event={event}
            attendance={attendance}
            attendanceAction={setAttendanceStatus}
            calendar={calendar}
            baseUrl={ENV.CLIENT_URL}
          />
        ) : null}
      </div>
      {/* Right side */}
      <div className="w-full flex flex-col gap-y-gap4 md:w-1/3">
        <div className="flex flex-col gap-y-gap1 mt-gap1 text-text2">
          {startEndObj.date && startEndObj.timeRange ? (
            <>
              <div className="flex gap-gapText">
                <CalendarIcon
                  strokeWidth={1}
                  className="w-[20px] h-[20px] mt-[3px] flex-shrink-0"
                />
                {startEndObj.date}
              </div>
              <div className="flex gap-gapText">
                <Clock
                  strokeWidth={1}
                  className="w-[20px] h-[20px] mt-[3px] flex-shrink-0"
                />
                {startEndObj.timeRange}
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-gapText">
                <CalendarIcon
                  strokeWidth={1}
                  className="w-[20px] h-[20px] mt-[3px] flex-shrink-0"
                />
                {startEndObj.start?.date}
              </div>
              <div className="flex gap-gapText">
                <Clock
                  strokeWidth={1}
                  className="w-[20px] h-[20px] mt-[3px] flex-shrink-0"
                />
                {startEndObj.start?.time}
              </div>
              <div className="flex gap-gapText pl-[20px]">
                <CalendarIcon
                  strokeWidth={1}
                  className="w-[20px] h-[20px] mt-[3px] flex-shrink-0"
                />
                {startEndObj.end?.date}
              </div>
              <div className="flex gap-gapText pl-[20px]">
                <Clock
                  strokeWidth={1}
                  className="w-[20px] h-[20px] mt-[3px] flex-shrink-0"
                />
                {startEndObj.end?.time}
              </div>
            </>
          )}
          <div className="flex gap-gapText">
            <LocateFixed
              strokeWidth={1}
              className="w-[20px] h-[20px] mt-[3px] flex-shrink-0"
            />
            {event.location}
          </div>
        </div>

        {isEventControlAllowed ? (
          <div className="flex flex-col gap-gap1 items-end">
            <EventControl
              event={event}
              deleteAction={deleteEvent}
              redirectPath={'/'}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
};
