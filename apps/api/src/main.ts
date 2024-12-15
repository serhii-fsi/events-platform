import express from 'express';
import { setupDb } from './db/setupDb';

import { checkSeedData } from './db/seeds/checkSeedData';
import { seed } from './db/seeds/seed';
import { purge } from './db/seeds/purge';

import { users, events, attendance, calendar } from './db/schema';
import { db } from './db/connection';

import { eq } from 'drizzle-orm';

import { PROD_MODE, DEV_MODE, TEST_MODE } from './common/utils/appMode';

const host = process.env.HOST;
const port = Number(process.env.PORT);

const app = express();

// //--------- test
// import { Pool } from 'pg';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { serial, varchar, pgTable } from 'drizzle-orm/pg-core';
// import { sql } from 'drizzle-orm';

// // Define the users table schema
// const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 100 }).notNull(),
// });

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DB,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// const db = drizzle(pool);

// // Create table and insert data
// const setupDatabase = async () => {
//   await db.execute(sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(100) NOT NULL
//     )
//   `);

//   await db.insert(users).values([{ name: 'John Doe' }, { name: 'Jane Doe' }]);
// };

// setupDatabase();

// app.get('/users', async (req, res) => {
//   try {
//     const allUsers = await db.select().from(users);
//     res.json({ message: 'Hello111', allUsers: allUsers });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// //--------- test

// Create tables if they don't exist and seed db
setupDb();
//
// Seed db
if (DEV_MODE || TEST_MODE)
  app.get('/seed-db', async (req, res) => {
    try {
      res.json({
        message: (await checkSeedData()) || (await seed()),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Drop db
if (DEV_MODE || TEST_MODE)
  app.get('/drop-db', async (req, res) => {
    try {
      res.json({
        message: await purge(),
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/users', async (req, res) => {
  await db.update(users).set({ name: 'John Doe' }).where(eq(users.id, 1));

  const allUsers = await db.select().from(users);
  res.send({ users: allUsers });
});

app.get('/', async (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
