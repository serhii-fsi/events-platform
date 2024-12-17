import { db } from '../connection';
import { sql } from 'drizzle-orm';

export const purge = async () => {
  await db.execute(sql`
    TRUNCATE
      TABLE 
        users,
        events,
        attendance,
        calendar
      RESTART IDENTITY CASCADE`);
  return true;
};
