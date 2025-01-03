'use client';

import { DetailedEventEntity } from '@/domain/types';

import { Ban, Trash2, Pencil, Check, CalendarPlus } from 'lucide-react';
import { Button, buttonVariants } from '@/shadcnui/button';

export const GoogleCalendarButton = ({
  event,
}: {
  event: DetailedEventEntity;
}) => {
  const formatDateForCalendar = (date: Date) => {
    return new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
  };

  const generateGoogleCalendarUrl = () => {
    const baseUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';
    const start = formatDateForCalendar(event.startAt);
    const end = formatDateForCalendar(event.endAt);
    const url =
      `${baseUrl}?` +
      `dates=${start}/${end}&` +
      `text=${encodeURIComponent(event.title)}&` +
      `location=${encodeURIComponent(event.location)}&` +
      `details=${encodeURIComponent(
        event.description +
          `\n\n Website: http://localhost:4001/events/${event.id}`
      )}`;
    return url;
  };

  return (
    <a
      href={generateGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({ variant: 'outline' })}
    >
      <CalendarPlus />
      Add To Calendar
    </a>
  );
};
