import { db } from '../connection';

export const drop = async () => {
  // Delete all data
  await db.execute('DROP TABLE IF EXISTS attendance');
  await db.execute('DROP TABLE IF EXISTS calendar');
  await db.execute('DROP TABLE IF EXISTS users');
  await db.execute('DROP TABLE IF EXISTS events');
};
