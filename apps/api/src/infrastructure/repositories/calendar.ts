import { db } from '../db/connection';
import { calendar } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { UserId, EventId, Calendar } from '../../domain/types';
import { CalendarStatus } from '../../domain/constants';

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

  setStatus: async (
    userId: UserId,
    eventId: EventId,
    status: CalendarStatus
  ): Promise<Calendar> => {
    const [updated] = await db
      .insert(calendar)
      .values({
        userId,
        eventId,
        status,
      })
      .onConflictDoUpdate({
        target: [calendar.userId, calendar.eventId],
        set: { status },
      })
      .returning();

    return updated as Calendar;
  },
};

export default calendarRepository;
