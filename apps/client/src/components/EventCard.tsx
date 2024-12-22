import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';

export const EventCard = async ({ id, title, startAt, location }: any) => {
  return (
    <Link href={`/events/${id}`}>
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{formatDate(startAt)}</p>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </Link>
  );
};
