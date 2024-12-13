import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

//--------- test
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { serial, varchar, pgTable } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Define the users table schema
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
});
//
//
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const db = drizzle(pool);

// Create table and insert data
const setupDatabase = async () => {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  `);

  await db.insert(users).values([{ name: 'John Doe' }, { name: 'Jane Doe' }]);
};

setupDatabase();

app.get('/users', async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json({ message: 'Hello111', allUsers: allUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//--------- test

app.get('/', (req, res) => {
  res.send({ message: 'Hello API ddsd' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
