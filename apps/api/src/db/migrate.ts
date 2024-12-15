import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { sql } from 'drizzle-orm';
import { db } from './connection';

import { timestamps } from './schema';

export const migrate = async () => {
  await migratePg(db, {
    migrationsFolder: './apps/api/src/db/migrations',
  });

  await db.execute(timestamps);
};
