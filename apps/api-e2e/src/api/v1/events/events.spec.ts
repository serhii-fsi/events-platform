import axios from 'axios';
import { request, seedDb, purgeDb } from '../../../support/utils';

import * as DOMAIN from '../../../../../api/src/domain/constants';

const USERS = {
  'VISITOR Sam': { token: null },
  'USER Carol': {
    token: '{"name":"Carol Reed", "email":"carol.reed@hotmail.com"}',
  },
  'EDITOR Rachel': {
    token: '{"name":"Rachel Green", "email":"rachel.green@gmail.com"}',
  },
  'EDITOR Thomas': {
    token: '{"name":"Thomas Brown", "email":"thomas.brown@gmail.com"}',
  },
  'ADMIN David': {
    token: '{"name":"David Thompson", "email":"david.thompson@gmail.com"}',
  },
  'ADMIN EMMA': {
    token: '{"name":"Emma Roberts", "email":"emma.roberts@gmail.com"}',
  },
};

const EVENT_REQ = {
  title: 'Test Conference 2025',
  description: 'Annual test conference',
  startAt: '2025-03-15T09:00:00.000Z',
  endAt: '2025-03-15T17:00:00.000Z',
  location: 'Test Convention Center',
};

const EVENT_RES = {
  data: {
    event: {
      ...EVENT_REQ,
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    },
  },
};

beforeAll(async () => {
  // Reset database before running tests
  await purgeDb();
  await seedDb();
});

describe('Events API', () => {
  // Get events
  describe('GET /api/events', () => {
    describe('happy path scenarios', () => {
      it('should return first page of events with default pagination', async () => {
        const response = await axios.get('/api/events');
        expect(response.status).toBe(200);

        const { data, meta } = response.data;
        expect(Array.isArray(data.events)).toBe(true);
        expect(data.events.length).toBe(10); // default limit
        expect(meta.pagination.currentPage).toBe(1);
        expect(meta.pagination.totalPages).toBeGreaterThan(0);
      });

      it('should return events with custom pagination parameters', async () => {
        const response = await axios.get('/api/events', {
          params: { page: 2, limit: 5 },
        });
        expect(response.status).toBe(200);

        const { data, meta } = response.data;
        expect(Array.isArray(data.events)).toBe(true);
        expect(data.events.length).toBe(5);
        expect(meta.pagination.currentPage).toBe(2);
      });

      it('should return correct event data structure', async () => {
        const response = await axios.get('/api/events');
        expect(response.status).toBe(200);

        const event = response.data.data.events[0];
        expect(event).toMatchObject({
          id: expect.any(Number),
          title: expect.any(String),
          startAt: expect.any(String),
          endAt: expect.any(String),
          location: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
    });

    describe('pagination edge cases', () => {
      it('should return empty events array for page beyond total pages', async () => {
        const initialResponse = await axios.get('/api/events');
        const totalPages = initialResponse.data.meta.pagination.totalPages;

        const response = await axios.get('/api/events', {
          params: { page: totalPages + 1 },
        });
        expect(response.status).toBe(200);
        expect(response.data.data.events).toHaveLength(0);
      });
    });
  });

  // Create event
  describe('POST /api/events', () => {
    const POST_RESULTS = {
      'VISITOR Sam': {
        status: 401,
        res: { status: 401, error: DOMAIN.ERRORS.AUTHENTICATION },
      },
      'USER Carol': {
        status: 403,
        res: { status: 403, error: DOMAIN.ERRORS.AUTHORIZATION },
      },
      'EDITOR Rachel': { status: 201, res: EVENT_RES },
      'ADMIN David': { status: 201, res: EVENT_RES },
    };

    describe('happy path scenarios', () => {
      ['EDITOR Rachel', 'ADMIN David'].forEach((user) => {
        const result = POST_RESULTS[user];
        const testDescription = `${user} should successfully create event with status ${result.status}`;

        it(testDescription, async () => {
          const response = await request(
            'post',
            '/api/events',
            EVENT_REQ,
            USERS[user].token
          );
          expect(response.status).toBe(result.status);
          expect(response.data).toMatchObject(result.res);
        });
      });
    });

    describe('error scenarios', () => {
      ['VISITOR Sam', 'USER Carol'].forEach((user) => {
        const result = POST_RESULTS[user];
        const testDescription = `${user} should receive ${result.res.error} error with status ${result.status}`;

        it(testDescription, async () => {
          const response = await request(
            'post',
            '/api/events',
            EVENT_REQ,
            USERS[user].token
          );
          expect(response.status).toBe(result.status);
          expect(response.data).toMatchObject(result.res);
        });
      });

      it('should return error when editor tries to create event with startAt equal to or after endAt', async () => {
        const invalidEventReqs = [
          { ...EVENT_REQ, startAt: EVENT_REQ.endAt },
          {
            ...EVENT_REQ,
            startAt: new Date(
              // startAt 1 minute after endAt
              new Date(EVENT_REQ.endAt).getTime() + 60000
            ).toISOString(),
          },
        ];

        for (const invalidEventReq of invalidEventReqs) {
          const response = await request(
            'post',
            '/api/events',
            invalidEventReq,
            USERS['EDITOR Rachel'].token
          );

          expect(response.status).toBe(400);
          expect(response.data).toMatchObject({
            status: 400,
            error: DOMAIN.ERRORS.INVALID_DATE_RANGE,
          });
        }
      });
    });
  });
});
