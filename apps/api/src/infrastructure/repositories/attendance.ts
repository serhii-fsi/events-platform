import { db } from '../db/connection';
import { attendance } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { UserId, EventId, Attendance } from '../../domain/types';

const attendanceRepository = {
  findByUserAndEvent: async (
    userId: UserId,
    eventId: EventId
  ): Promise<Attendance | null> => {
    const [result] = await db
      .select({
        userId: attendance.userId,
        eventId: attendance.eventId,
        status: attendance.status,
        createdAt: attendance.createdAt,
        updatedAt: attendance.updatedAt,
      })
      .from(attendance)
      .where(
        and(eq(attendance.userId, userId), eq(attendance.eventId, eventId))
      )
      .limit(1);

    return (result || null) as Attendance | null;
  },
};

export default attendanceRepository;
