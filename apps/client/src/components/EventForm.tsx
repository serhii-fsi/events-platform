'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createEvent } from 'src/app/actions';
import { DetailedEventEntity } from '@/domain/types';
import { dateTo } from '@/utils/date';

import { Textarea } from '@/shadcnui/textarea';
import { Button } from '@/shadcnui/button';
import { Send } from 'lucide-react';
import { Input } from '@/shadcnui/input';
import { DatePicker } from '@/shadcnui/datepicker';
import { Skeleton } from '@/shadcnui/skeleton';
import { toast } from '@/shadcnui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcnui/form';

const FormSchema = z
  .object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters.' })
      .max(100, {
        message: 'Title must be at most 100 characters.',
      }),
    description: z
      .string()
      .min(10, { message: 'Description must be at least 10 characters.' })
      .max(1000, { message: 'Description must be at most 1000 characters.' }),
    startDate: z.date({
      required_error: 'Required',
    }),
    startTime: z.string().length(5, { message: 'Required' }),
    endDate: z.date({
      required_error: 'Required',
    }),
    endTime: z.string().length(5, { message: 'Required' }),
    location: z
      .string()
      .min(3, { message: 'Location must be at least 3 characters.' })
      .max(200, { message: 'Location must be at most 200 characters.' }),
  })
  .refine(
    (data) => {
      const startTimestamp = new Date(
        `${data.startDate.toDateString()} ${data.startTime}`
      );
      const endTimestamp = new Date(
        `${data.endDate.toDateString()} ${data.endTime}`
      );
      return endTimestamp > startTimestamp;
    },
    {
      message: 'End date and time must be after start date and time',
      path: ['endDate'],
    }
  );

export function EventForm({
  formAction,
  redirect,
  event,
}: {
  formAction: typeof createEvent;
  redirect?: 'push' | 'replace';
  event?: DetailedEventEntity | undefined;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const useFormReturn = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      startDate: event?.startAt,
      startTime: event?.startAt ? dateTo.hhmm(event?.startAt) : '',
      endDate: event?.endAt,
      endTime: event?.endAt ? dateTo.hhmm(event?.endAt) : '',
      location: event?.location || '',
    },
  });

  const onSubmit = async function (data: z.infer<typeof FormSchema>) {
    setLoading(true);

    const newEvent: DetailedEventEntity = {
      title: data.title,
      description: data.description,
      startAt: new Date(`${data.startDate.toDateString()} ${data.startTime}`),
      endAt: new Date(`${data.endDate.toDateString()} ${data.endTime}`),
      location: data.location,
    };
    const res = await formAction(newEvent);

    toast({
      variant: res.success ? 'default' : 'destructive',
      title: res.success ? 'Success' : 'Error',
      description: res.message,
    });

    if (!res.success) {
      setLoading(false);
      return;
    }

    if (redirect === 'replace') {
      router.replace('events/' + res.id);
    } else if (redirect === 'push') {
      router.push('events/' + res.id);
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-gap5 w-full md:flex-row">
        {/* Left side */}
        <div className="w-full md:w-3/5">
          <div className="flex flex-col gap-y-gap3">
            <div className="flex flex-col gap-y-gapText">
              <Skeleton className="h-6 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
            <div className="flex flex-col gap-y-gapText">
              <Skeleton className="h-6 w-32" /> {/* Label */}
              <Skeleton className="h-[300px] w-full" /> {/* Textarea */}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-full flex flex-col gap-y-gap3 md:w-2/5">
          <div className="flex gap-gap2">
            <div className="w-2/3">
              <Skeleton className="h-6 w-24" /> {/* Label */}
              <Skeleton className="h-10 w-full mt-2" /> {/* DatePicker */}
            </div>
            <div className="w-1/3">
              <Skeleton className="h-6 w-24" /> {/* Label */}
              <Skeleton className="h-10 w-full mt-2" /> {/* Time Input */}
            </div>
          </div>
          <div className="flex gap-gap2">
            <div className="w-2/3">
              <Skeleton className="h-6 w-24" /> {/* Label */}
              <Skeleton className="h-10 w-full mt-2" /> {/* DatePicker */}
            </div>
            <div className="w-1/3">
              <Skeleton className="h-6 w-24" /> {/* Label */}
              <Skeleton className="h-10 w-full mt-2" /> {/* Time Input */}
            </div>
          </div>
          <div className="flex flex-col gap-y-gapText">
            <Skeleton className="h-6 w-28" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Location Input */}
          </div>
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" /> {/* Button */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...useFormReturn}>
      <form
        onSubmit={useFormReturn.handleSubmit(onSubmit)}
        className="flex flex-col gap-gap5 w-full md:flex-row"
      >
        {/* Left side */}
        <div className="w-full md:w-3/5">
          <div className="flex flex-col gap-y-gap3">
            {/* Event Title */}
            <FormField
              control={useFormReturn.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-gapText">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Description */}
            <FormField
              control={useFormReturn.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-y-gapText">
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Event Description"
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share essential details: venue rules, age restrictions,
                    accessibility features, seating arrangements, and any
                    special requirements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="w-full flex flex-col gap-y-gap3 md:w-2/5">
          {/* Start Date and Time */}
          <div className="flex gap-gap2">
            <FormField
              control={useFormReturn.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-2/3 flex flex-col gap-y-gapText overflow-hidden">
                  <FormLabel>Start date</FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Start date"
                    className="w-full overflow-clip"
                    disabledDates={(date) =>
                      date <
                      new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                    }
                    dateFormat="PPP"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={useFormReturn.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="w-1/3 flex flex-col gap-y-gapText">
                  <FormLabel>Start time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Start time"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        useFormReturn.trigger(['startDate', 'endDate']);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* End Date and Time */}
          <div className="flex gap-gap2">
            <FormField
              control={useFormReturn.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-2/3 flex flex-col gap-y-gapText overflow-hidden">
                  <FormLabel>End date</FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="End date"
                    className="w-full overflow-clip"
                    disabledDates={(date) =>
                      date <
                      new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                    }
                    dateFormat="PPP"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={useFormReturn.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="w-1/3 flex flex-col gap-y-gapText">
                  <FormLabel>End time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="End time"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        useFormReturn.trigger(['startDate', 'endDate']);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location */}
          <FormField
            control={useFormReturn.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-gapText">
                <FormLabel>Event location</FormLabel>
                <FormControl>
                  <Input placeholder="Event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <div className="">
              <Button type="submit" className="">
                <Send /> Create Event
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
