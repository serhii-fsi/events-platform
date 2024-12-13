import { db } from '../db/connection';
import { events } from '../db/schema';
import { desc, sql } from 'drizzle-orm';
import { BaseEventEntity, DetailedEventEntity } from '../../domain/entities';
import { PaginationParams, PaginatedResult } from '../../domain/types';

const eventsRepository = {
  findMany: async ({
    skip,
    take,
  }: PaginationParams): Promise<PaginatedResult<BaseEventEntity>> => {
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
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / take),
        currentPage: Math.floor(skip / take) + 1,
      },
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
