'use client';

import { DetailedEventEntity } from '@/domain/types';

import { CalendarPlus } from 'lucide-react';
import { buttonVariants } from '@/shadcnui/button';

export const GoogleCalendarButton = ({
  event,
  baseUrl,
}: {
  event: DetailedEventEntity;
  baseUrl: string;
}) => {
  const formatDateForCalendar = (date: Date) => {
    return new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
  };

  const generateGoogleCalendarUrl = () => {
    const gCalendarBaseUrl =
      'https://calendar.google.com/calendar/u/0/r/eventedit';
    const start = formatDateForCalendar(event.startAt);
    const end = formatDateForCalendar(event.endAt);
    const url =
      `${gCalendarBaseUrl}?` +
      `trp=false&` +
      `dates=${start}/${end}&` +
      `text=${encodeURIComponent(event.title)}&` +
      `location=${encodeURIComponent(event.location)}&` +
      `details=${encodeURIComponent(
        event.description + `\n\n Website: ${baseUrl}/events/${event.id}`
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
      Add To Google Calendar
    </a>
  );
};
