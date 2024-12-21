import { db } from '../db/connection';
import { calendar } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { UserId, EventId, Calendar } from '../../domain/types';

const calendarRepository = {
  findByUserAndEvent: async (
    userId: UserId,
    eventId: EventId
  ): Promise<Calendar | null> => {
    const [result] = await db
      .select({
        userId: calendar.userId,
        eventId: calendar.eventId,
        status: calendar.status,
        createdAt: calendar.createdAt,
        updatedAt: calendar.updatedAt,
      })
      .from(calendar)
      .where(and(eq(calendar.userId, userId), eq(calendar.eventId, eventId)))
      .limit(1);

    return (result || null) as Calendar | null;
  },
};

export default calendarRepository;
