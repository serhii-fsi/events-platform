import { db } from '../connection';
import { users, events, attendance, calendar } from '../schema';
import { migrator } from '../migrate';

import path from 'path';
import fs from 'fs';

export const seed = async () => {
  const usersData = require(__dirname + '/db/seeds/data/dev/users.json');
  // const eventsData = require('/app/apps/api/src/db/seeds/data/dev/events.json');
  // const relationsData = require('/app/apps/api/src/db/seeds/data/dev/relations.json');

  // await require('./db/seeds/seed').seed(
  //   usersData,
  //   eventsData,
  //   relationsData
  // );

  return 'Seeded';

  // await migrator();
  // // Insert users
  // await db.insert(users).values(usersData);
  // // Insert events
  // await db.insert(events).values(eventsData);
  // // Insert attendance and calendar relations
  // const attendanceData = relationsData.map((relation) => ({
  //   userId: relation.userId,
  //   eventId: relation.eventId,
  //   status: relation.attendance,
  // }));
  // //
  // const calendarData = relationsData.map((relation) => ({
  //   userId: relation.userId,
  //   eventId: relation.eventId,
  //   status: relation.calendar,
  // }));
  // await db.insert(attendance).values(attendanceData);
  // await db.insert(calendar).values(calendarData);
};
