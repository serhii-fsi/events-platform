import {
  pgEnum,
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'editor', 'admin']);
export const attendanceStatusEnum = pgEnum('attendance_status', [
  'attending',
  'declined',
]);
export const calendarStatusEnum = pgEnum('calendar_status', [
  'added',
  'removed',
]);

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 50 }).notNull().unique(),
  role: userRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Events table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 1000 }).notNull(),
  startAt: timestamp('start_at').notNull(),
  endAt: timestamp('end_at').notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Event attendance junction table
export const attendance = pgTable(
  'attendance',
  {
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    eventId: integer('event_id')
      .references(() => events.id, { onDelete: 'cascade' })
      .notNull(),
    status: attendanceStatusEnum('status'), // null default
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('attendance_user_event_idx').on(table.userId, table.eventId),
  ]
);

// Event calendar status junction table
export const calendar = pgTable(
  'calendar',
  {
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    eventId: integer('event_id')
      .references(() => events.id, { onDelete: 'cascade' })
      .notNull(),
    status: calendarStatusEnum('status'), // null default
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('calendar_user_event_idx').on(table.userId, table.eventId),
  ]
);

// Triggers for updating timestamps
export const timestamps = sql`
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();

    CREATE TRIGGER update_events_updated_at
        BEFORE UPDATE ON events
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();

    CREATE TRIGGER update_attendance_updated_at
        BEFORE UPDATE ON attendance
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();

    CREATE TRIGGER update_calendar_updated_at
        BEFORE UPDATE ON calendar
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at();
`;
