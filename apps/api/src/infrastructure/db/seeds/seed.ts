import { db } from '../connection';
import { sql } from 'drizzle-orm';
import { users, events, attendance, calendar } from '../schema';
import { AttendanceStatus, CalendarStatus } from '../../../domain/constants';
import { UserEntity } from '../../../domain/types';

import usersData from './data/dev/users';
import eventsData from './data/dev/events';
import relationsData from './data/dev/relations';

export const seed = async () => {
  try {
    // Insert users
    await db.insert(users).values(usersData as UserEntity[]);
    // Reset the sequence for the events table
    await db.execute(
      sql`SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id), 1) + 1, false) FROM users`
    );

    // Insert events
    const eventsDataParsed = eventsData.map((event) => ({
      ...event,
      startAt: new Date(event.startAt),
      endAt: new Date(event.endAt),
    }));
    await db.insert(events).values(eventsDataParsed);
    // Reset the sequence for the events table
    await db.execute(
      sql`SELECT setval(pg_get_serial_sequence('events', 'id'), coalesce(max(id), 1) + 1, false) FROM events`
    );

    // Insert attendance data
    const attendanceData = relationsData.map((relation) => ({
      userId: relation.userId,
      eventId: relation.eventId,
      status: relation.attendance as AttendanceStatus,
    }));
    await db.insert(attendance).values(attendanceData);

    // Insert calendar data
    const calendarData = relationsData.map((relation) => ({
      userId: relation.userId,
      eventId: relation.eventId,
      status: relation.calendar as CalendarStatus,
    }));
    await db.insert(calendar).values(calendarData);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
