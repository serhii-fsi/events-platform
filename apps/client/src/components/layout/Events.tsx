import { notFound } from 'next/navigation';
import { ErrorPage } from '@/components/ErrorPage';
import { Api } from 'src/modules/api';

import { EventCard } from '@/components/EventCard';
import { EventsPagination } from '../Pagination';

export const Events = async ({ page }: { page: number }) => {
  const api = new Api();
  await api.fetchEvents(page);

  if (api.isError()) {
    return <ErrorPage message={api.getUiErrorMessage()} />;
  }

  const ret = api.getEvents();
  if (!ret) {
    return (
      <ErrorPage message="Unexpected error: unable to get events from server" />
    );
  }
  const { events, pagination } = ret;

  if (page > pagination.totalPages) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-gap5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-gap2">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      <EventsPagination paginationResult={pagination} />
    </div>
  );
};
