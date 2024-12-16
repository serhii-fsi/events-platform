import express from 'express';
const router = express.Router();

import { users, events, attendance, calendar } from '../../db/schema';
import { db } from '../../db/connection';
import { eq, sql } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';
import { AppError, UnauthorizedError } from '../../common/errors/app';

router.get('/api/users', async (req, res, next) => {
  try {
    // throw new AppError('This is a test error');
    // throw new UnauthorizedError(
    //   'You are not authorized to access this resource'
    // );

    await db.update(users).set({ name: 'John Doe' }).where(eq(users.id, 1));
    // await db.execute(sql`SELECT * FROM ddddd WHERE id = 1`);
    const allUsers = await db.select().from(users);
    res.send({ data: { users: allUsers } });
  } catch (error) {
    next(error);
  }
});

export default router;
