import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, pool } from './connection';
import fs from 'fs';
import path from 'path';

const runMigration = async (filePath: string) => {
  const sql = fs.readFileSync(path.resolve(filePath), 'utf-8');
  try {
    console.log(sql);

    await pool.query(sql);
    console.log(`Migration ${filePath} executed successfully`);
  } catch (error) {
    console.error(`Error executing migration ${filePath}:`, error);
  }
};

export const migrator = async () => {
  const migrationsFolder = './apps/api/src/db/migrations';
  const migrationFiles = fs.readdirSync(migrationsFolder);

  for (const file of migrationFiles) {
    const filePath = path.join(migrationsFolder, file);
    if (fs.lstatSync(filePath).isFile()) {
      await runMigration(filePath);
    } else {
      console.log(`Skipping directory ${filePath}`);
    }
  }
};

// export const migrator = async () => {
//   //   try {
//   const res = await migrate(db, {
//     migrationsFolder: './apps/api/src/db/migrations',
//   });

//   console.log('Migration successful');
//   console.log(res);
//   //   } catch (error) {
//   //     console.error(error);
//   //     process.exit(1);
//   //   }
// };
// //
// // migrator();
