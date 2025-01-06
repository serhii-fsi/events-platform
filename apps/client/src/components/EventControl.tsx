'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DetailedEventEntity } from '@/domain/types';
import { deleteEvent } from 'src/app/actions';

import { Button, buttonVariants } from '@/shadcnui/button';
import { Ban, Trash2, Pencil, Check } from 'lucide-react';
import { Skeleton } from '@/shadcnui/skeleton';
import { toast } from '@/shadcnui/use-toast';

export const EventControl = ({
  event,
  deleteAction,
  redirectPath,
}: {
  event: DetailedEventEntity;
  deleteAction: typeof deleteEvent;
  redirectPath: string;
}) => {
  const [isStartDeleting, setIsStartDeleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteEventHandler = async () => {
    setIsDeleting(true);
    const res = await deleteAction(event.id as number);

    toast({
      variant: res.success ? 'default' : 'destructive',
      title: res.success ? 'Success' : 'Error',
      description: res.message,
    });

    if (!res.success) {
      setIsDeleting(false);
      return;
    }
    router.replace(redirectPath);
  };

  return (
    <div className="flex flex-row gap-gap2 flex-wrap justify-end">
      {isDeleting ? (
        <>
          <div className="flex flex-col items-end gap-gap2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="flex flex-col items-end gap-gap2">
            <Skeleton className="h-10 w-28" />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-end gap-gap2">
            {isStartDeleting ? (
              <>
                <Button
                  onClick={() => setIsStartDeleting(false)}
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  <Ban />
                  Cancel
                </Button>

                <Button
                  onClick={deleteEventHandler}
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  <Check />
                  Confirm Delete
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsStartDeleting(true)}
                className={buttonVariants({ variant: 'destructive' })}
              >
                <Trash2 />
                Delete Event
              </Button>
            )}
          </div>

          <Link
            href={`/events/${event.id}/edit`}
            className={buttonVariants({ variant: 'outline' })}
          >
            <Pencil />
            Edit Event
          </Link>
        </>
      )}
    </div>
  );
};
