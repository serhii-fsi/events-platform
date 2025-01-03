'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Optional,
  DetailedEventEntity,
  AuthUser,
  Attendance,
  Calendar,
} from '@/domain/types';
import { AttendanceStatus, CalendarStatus } from '@/domain/constants';
import { setAttendanceStatus, setCalendarStatus } from 'src/app/actions';

import { Button, buttonVariants } from '@/shadcnui/button';
import { Ban, Trash2, Pencil, Check, CalendarPlus } from 'lucide-react';
import { Skeleton } from '@/shadcnui/skeleton';
import { toast } from '@/shadcnui/use-toast';
import { GoogleCalendarButton } from './GoogleCalendarButton';

export const EventAttendance = ({
  authUser,
  event,
  attendance,
  calendar,
}: {
  authUser: AuthUser;
  event: DetailedEventEntity;
  attendance?: Optional<
    Attendance,
    'userId' | 'eventId' | 'createdAt' | 'updatedAt'
  > | null;
  calendar?: Optional<
    Calendar,
    'userId' | 'eventId' | 'createdAt' | 'updatedAt'
  > | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [attendance?.status]);

  const setAttendance = async (status: AttendanceStatus) => {
    if (status === attendance?.status) return;
    setIsLoading(true);
    const res = await setAttendanceStatus(
      authUser?.id as number,
      event.id as number,
      status
    );
    if (!res.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.message,
      });
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="flex flex-row items gap-gap2">
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-64" />
        </>
      ) : (
        <>
          <div>
            {attendance?.status !== AttendanceStatus.ATTENDING ? (
              <Button
                onClick={() => setAttendance(AttendanceStatus.ATTENDING)}
                variant="default"
              >
                <Check />
                Attend Event
              </Button>
            ) : (
              <Button
                onClick={() => setAttendance(AttendanceStatus.DECLINED)}
                variant="destructive"
              >
                <Ban />
                Decline Attendance
              </Button>
            )}
          </div>

          {attendance?.status === AttendanceStatus.ATTENDING ? (
            <div>
              <GoogleCalendarButton event={event} />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
