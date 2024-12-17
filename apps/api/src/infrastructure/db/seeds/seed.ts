import { db } from '../connection';
import { users, events, attendance, calendar } from '../schema';

import usersData from './data/dev/users';
import eventsData from './data/dev/events';
import relationsData from './data/dev/relations';

export const seed = async () => {
  try {
    // Insert users
    await db.insert(users).values(usersData);

    // Insert events
    const eventsDataParsed = eventsData.map((event) => ({
      ...event,
      startAt: new Date(event.startAt),
      endAt: new Date(event.endAt),
    }));
    await db.insert(events).values(eventsDataParsed);

    // Insert attendance data
    const attendanceData = relationsData.map((relation) => ({
      userId: relation.userId,
      eventId: relation.eventId,
      status: relation.attendance,
    }));
    await db.insert(attendance).values(attendanceData);

    // Insert calendar data
    const calendarData = relationsData.map((relation) => ({
      userId: relation.userId,
      eventId: relation.eventId,
      status: relation.calendar,
    }));
    await db.insert(calendar).values(calendarData);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
