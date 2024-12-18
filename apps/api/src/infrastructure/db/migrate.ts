import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { db } from './connection';
import { timestamps } from './schema';
import { getRootPath } from '../utils/getRootPath';

export const migrate = async () => {
  await migratePg(db, {
    migrationsFolder:
      getRootPath() + 'apps/api/src/infrastructure/db/migrations',
  });

  await db.execute(timestamps);
};
