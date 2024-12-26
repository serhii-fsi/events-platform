import { dateTo } from '@/utils/date';
import { DetailedEventEntity } from '@/domain/types';

import { Textarea } from '@/shadcnui/textarea';
import { Button } from '@/shadcnui/button';
import { Send } from 'lucide-react';
import { Input } from '@/shadcnui/input';
import { DatePicker } from '@/shadcnui/datepicker';

export const EventForm = async ({
  event,
}: {
  event: Partial<DetailedEventEntity> | null;
}) => {
  return (
    <div className="my-gap5">
      <h1 className="text-4xl font-black text-center mb-gap5">Create Event</h1>

      <div className="flex gap-gap5 w-full ">
        {/* Left side */}
        <div className="w-3/5">
          <div className="flex flex-col gap-y-gap3">
            <div className="flex flex-col gap-y-gap10px">
              <label className="">Event Title</label>
              <Input
                defaultValue={event?.title}
                placeholder="Event Title"
                className=""
              />
            </div>
            <div className="flex flex-col gap-y-gap10px">
              <label className="">Event Description</label>
              <Textarea
                defaultValue={event?.description}
                placeholder="Event Description"
                className="min-h-[300px]"
              />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-2/5 flex flex-col gap-y-gap3">
          <div className="flex gap-gap2">
            <div className="w-2/3 flex flex-col gap-y-gap10px">
              <label className="">Start date</label>
              <DatePicker
                value={event?.startAt}
                className="w-full overflow-clip"
                placeholder="Start date"
              />
            </div>
            <div className="w-1/3 flex flex-col gap-y-gap10px">
              <label className="">End time</label>
              <Input
                defaultValue={dateTo.hhmm(event?.startAt)}
                type="time"
                placeholder="End time"
              />
            </div>
          </div>
          <div className="flex gap-gap2">
            <div className="w-2/3 flex flex-col gap-y-gap10px">
              <label className="">End date</label>
              <DatePicker
                className="w-full"
                value={event?.endAt}
                placeholder="End date"
              />
            </div>
            <div className="w-1/3 flex flex-col gap-y-gap10px">
              <label className="">End time</label>
              <Input
                defaultValue={dateTo.hhmm(event?.endAt)}
                type="time"
                placeholder="End time"
              />
            </div>
          </div>
          <div className="">
            <div className="flex flex-col gap-y-gap10px">
              <label className="">Event location</label>
              <Input
                defaultValue={event?.location}
                placeholder="Event location"
                className=""
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="">
              <Button type="submit" className="">
                <Send /> Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
