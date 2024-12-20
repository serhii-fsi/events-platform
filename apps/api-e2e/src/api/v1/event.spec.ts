import { request, seedDb, purgeDb } from '../../support/utils';
import { USERS } from '../../support/test-constants';
import * as DOMAIN from '../../../../api/src/domain/constants';

const SAMPLE_EVENT = {
  title: 'Test Conference 2025',
  description: 'Annual test conference',
  startAt: '2025-03-15T09:00:00.000Z',
  endAt: '2025-03-15T17:00:00.000Z',
  location: 'Test Convention Center',
};

describe('Event API', () => {
  let eventId: number;

  beforeAll(async () => {
    // Reset database before running tests
    await purgeDb();
    await seedDb();

    // Create a test event to use in tests
    const response = await request('post', '/api/events', {
      data: SAMPLE_EVENT,
      token: USERS['EDITOR Rachel'].token,
    });
    eventId = response.data.data.event.id;
  });

  // Get event details
  describe('GET /api/events/{eventId}', () => {
    describe('happy path scenarios', () => {
      it('should return event details for visitors', async () => {
        const response = await request('get', `/api/events/${eventId}`);

        expect(response.status).toBe(200);
        expect(response.data).toMatchObject({
          data: {
            event: {
              id: eventId,
              title: SAMPLE_EVENT.title,
              description: SAMPLE_EVENT.description,
              startAt: SAMPLE_EVENT.startAt,
              endAt: SAMPLE_EVENT.endAt,
              location: SAMPLE_EVENT.location,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          },
        });
      });

      ['USER Carol', 'EDITOR Rachel', 'ADMIN David'].forEach((user) => {
        it(`should return event details for ${user}`, async () => {
          const response = await request('get', `/api/events/${eventId}`, {
            token: USERS[user].token,
          });

          expect(response.status).toBe(200);
          expect(response.data).toMatchObject({
            data: {
              event: {
                id: eventId,
                title: SAMPLE_EVENT.title,
                description: SAMPLE_EVENT.description,
                startAt: SAMPLE_EVENT.startAt,
                endAt: SAMPLE_EVENT.endAt,
                location: SAMPLE_EVENT.location,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            },
          });
        });
      });
    });

    describe('error scenarios', () => {
      it('should return 404 when event does not exist', async () => {
        const nonExistentId = 99999;
        const response = await request('get', `/api/events/${nonExistentId}`);

        expect(response.status).toBe(404);
        expect(response.data).toMatchObject({
          status: 404,
          error: DOMAIN.ERRORS.EVENT_NOT_FOUND,
        });
      });
    });
  });
});
