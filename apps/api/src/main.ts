import express from 'express';
import { setupDb } from './db/setupDb';

import { checkSeedData } from './db/seeds/checkSeedData';
import { seed } from './db/seeds/seed';
import { purge } from './db/seeds/purge';

import { users, events, attendance, calendar } from './db/schema';
import { db } from './db/connection';

import { eq } from 'drizzle-orm';

import { setupSwagger } from './openapi/swagger';

import { validator } from './middleware/validator';

import { PROD_MODE, DEV_MODE, TEST_MODE } from './common/utils/appMode';

const host = process.env.HOST;
const port = Number(process.env.PORT);

const app = express();
//
app.use(express.json());
app.use(validator);

setupSwagger(app);

// Create tables if they don't exist and seed db
setupDb();

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

app.get('/api/users', async (req, res) => {
  await db.update(users).set({ name: 'John Doe' }).where(eq(users.id, 1));

  const allUsers = await db.select().from(users);
  res.send({ data: { users: allUsers } });
});

app.get('/', async (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: err.errors,
  });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
