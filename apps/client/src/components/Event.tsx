import { formatDate } from '@/utils/formatDate';
import { formatTime } from '@/utils/formatEventTime';
import { DetailedEventEntity, AuthUser } from '@/domain/types';
import { deleteEvent } from 'src/app/actions';

import { EventControl } from '@/components/EventControl';

export const Event = async ({
  event,
  authUser,
}: {
  event: DetailedEventEntity;
  authUser: AuthUser;
}) => {
  return (
    <div className="flex flex-col gap-gap5 w-full md:flex-row">
      {/* Left side */}
      <div className="w-full md:w-2/3">
        <div className="flex flex-col gap-y-gap3">
          <h1 className="flex flex-col gap-y-gapText text-text4 font-bold">
            {event.title}
          </h1>
          <div className="flex flex-col gap-y-gapText text-text2">
            {event.description}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="w-full flex flex-col gap-y-gap3 md:w-1/3">
        <div className="flex flex-col gap-gap1">
          <div className="text-text3 font-bold">Starts:</div>
          <div className="flex gap-gap1 justify-start pl-gap2">
            <div className="">{formatDate(event.startAt)}</div>
            <div className="">{formatTime(event.startAt)}</div>
          </div>
        </div>
        <div className="flex flex-col gap-gap1">
          <div className="text-text3 font-bold">Ends:</div>
          <div className="flex gap-gap1 justify-start pl-gap2">
            <div className="">{formatDate(event.endAt)}</div>
            <div className="">{formatTime(event.endAt)}</div>
          </div>
        </div>
        <div className="flex flex-col gap-gap1">
          <div className="text-text3 font-bold">Location:</div>
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
