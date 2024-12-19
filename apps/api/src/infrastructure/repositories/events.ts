import { db } from '../db/connection';
import { events } from '../db/schema';
import { desc, sql } from 'drizzle-orm';
import {
  BaseEventEntity,
  DetailedEventEntity,
  PaginationParams,
  ItemsWithTotalResult,
} from '../../domain/types';

const eventsRepository = {
  findMany: async ({
    skip,
    take,
  }: PaginationParams): Promise<ItemsWithTotalResult<BaseEventEntity>> => {
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
        .limit(take)
        .offset(skip)
        .orderBy(desc(events.startAt)),

      db.select({ count: sql<number>`count(*)` }).from(events),
    ]);

    const total = totalCount[0].count;

    return {
      items: eventsResult,
      totalItems: total,
    };
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
};

export default eventsRepository;
