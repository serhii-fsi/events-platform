import { request, seedDb, purgeDb } from '../../support/utils';
import { USERS } from '../../support/test-constants';
import * as DOMAIN from '../../../../api/src/domain/constants';
import { log } from 'console';

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

  // Update event details
  describe('PATCH /api/events/{eventId}', () => {
    const UPDATE_EVENT = {
      title: 'Updated Conference 2025',
      description: 'Updated annual conference description',
      startAt: '2025-03-16T10:00:00.000Z',
      endAt: '2025-03-16T18:00:00.000Z',
      location: 'Updated Convention Center',
    };

    describe('happy path scenarios', () => {
      ['EDITOR Rachel', 'ADMIN David'].forEach((user) => {
        it(`should allow ${user} to update event details`, async () => {
          const response = await request('patch', `/api/events/${eventId}`, {
            data: UPDATE_EVENT,
            token: USERS[user].token,
          });

          expect(response.status).toBe(200);
          expect(response.data).toMatchObject({
            data: {
              event: {
                id: eventId,
                ...UPDATE_EVENT,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            },
          });
        });
      });

      it('should allow partial updates', async () => {
        const partialUpdate = {
          title: 'Partially Updated Conference',
          description: 'Partially updated description',
        };

        const response = await request('patch', `/api/events/${eventId}`, {
          data: partialUpdate,
          token: USERS['EDITOR Rachel'].token,
        });

        expect(response.status).toBe(200);
        expect(response.data.data.event).toMatchObject({
          id: eventId,
          ...partialUpdate,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
    });

    describe('error scenarios', () => {
      it('should return 401 for unauthenticated users', async () => {
        const response = await request('patch', `/api/events/${eventId}`, {
          data: UPDATE_EVENT,
          token: USERS['VISITOR Sam'].token,
        });

        expect(response.status).toBe(401);
        expect(response.data).toMatchObject({
          status: 401,
          error: DOMAIN.ERRORS.AUTHENTICATION,
        });
      });

      it('should return 403 for regular users', async () => {
        const response = await request('patch', `/api/events/${eventId}`, {
          data: UPDATE_EVENT,
          token: USERS['USER Carol'].token,
        });

        expect(response.status).toBe(403);
        expect(response.data).toMatchObject({
          status: 403,
          error: DOMAIN.ERRORS.AUTHORIZATION,
        });
      });

      it('should return 404 when event does not exist', async () => {
        const nonExistentId = 99999;
        const response = await request(
          'patch',
          `/api/events/${nonExistentId}`,
          {
            data: UPDATE_EVENT,
            token: USERS['EDITOR Rachel'].token,
          }
        );

        expect(response.status).toBe(404);
        expect(response.data).toMatchObject({
          status: 404,
          error: DOMAIN.ERRORS.EVENT_NOT_FOUND,
        });
      });

      it('should return 400 when updating with invalid date range', async () => {
        const invalidUpdate = {
          startAt: '2025-03-16T18:00:00.000Z',
          endAt: '2025-03-16T10:00:00.000Z',
        };

        const response = await request('patch', `/api/events/${eventId}`, {
          data: invalidUpdate,
          token: USERS['EDITOR Rachel'].token,
        });

        expect(response.status).toBe(400);
        expect(response.data).toMatchObject({
          status: 400,
          error: DOMAIN.ERRORS.INVALID_DATE_RANGE,
        });
      });

      it('should return 400 when request contains unknown fields', async () => {
        const updateWithUnknownFields = {
          title: 'Valid Title',
          maliciousField: 'some-malicious-data',
        };

        const response = await request('patch', `/api/events/${eventId}`, {
          data: updateWithUnknownFields,
          token: USERS['EDITOR Rachel'].token,
        });

        expect(response.status).toBe(400);
      });
    });
  });
});
