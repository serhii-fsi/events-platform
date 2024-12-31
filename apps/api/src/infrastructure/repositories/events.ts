import { db } from '../db/connection';
import { events } from '../db/schema';
import { gte, sql, eq } from 'drizzle-orm';
import {
  BaseEventEntity,
  DetailedEventEntity,
  PaginationParams,
  ItemsWithTotalResult,
  EventId,
  UpdateEventEntity,
} from '../../domain/types';

const eventsRepository = {
  findMany: async (
    { skip, take }: PaginationParams,
    after: Date
  ): Promise<ItemsWithTotalResult<BaseEventEntity>> => {
    const [eventsResult, totalCount] = await Promise.all([
      db
        .select({
          id: events.id,
          title: events.title,
          startAt: events.startAt,
          endAt: events.endAt,
          location: events.location,
          createdAt: events.createdAt,
          updatedAt: events.updatedAt,
        })
        .from(events)
        .where(gte(events.startAt, after))
        .limit(take)
        .offset(skip)
        .orderBy(events.startAt),

      db.select({ count: sql<number>`count(*)` }).from(events),
    ]);

    const total = totalCount[0].count;

    return {
      items: eventsResult,
      totalItems: total,
    };
  },

  findById: async (id: EventId): Promise<DetailedEventEntity | null> => {
    const [event] = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        startAt: events.startAt,
        endAt: events.endAt,
        location: events.location,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      })
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    return event || null;
  },

  create: async (event: DetailedEventEntity): Promise<DetailedEventEntity> => {
    const [created] = await db
      .insert(events)
      .values({
        title: event.title,
        description: event.description,
        startAt: event.startAt,
        endAt: event.endAt,
        location: event.location,
      })
      .returning();

    return created;
  },

  update: async (
    id: EventId,
    event: UpdateEventEntity
  ): Promise<DetailedEventEntity> => {
    const [updated] = await db
      .update(events)
      .set(
        ['title', 'description', 'startAt', 'endAt', 'location'].reduce(
          (acc, field) => {
            if (event[field] !== undefined) acc[field] = event[field];
            return acc;
          },
          {} as Partial<DetailedEventEntity>
        )
      )
      .where(eq(events.id, id))
      .returning();

    return updated;
  },

  delete: async (id: EventId): Promise<void> => {
    await db.delete(events).where(eq(events.id, id));
  },
};

export default eventsRepository;
