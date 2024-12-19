import { request } from '../../support/utils';
import { USERS } from '../../support/test-constants';
import * as DOMAIN from '../../../../api/src/domain/constants';

describe('Auth API', () => {
  // Get authorization status
  describe('GET /api/auth/status', () => {
    const GET_RESULTS = {
      'VISITOR Sam': {
        status: 401,
        res: { status: 401, error: DOMAIN.ERRORS.AUTHENTICATION },
      },
      'USER Carol': {
        status: 200,
        res: {
          data: {
            user: {
              id: expect.any(Number),
              name: 'Carol Reed',
              email: 'carol.reed@hotmail.com',
              role: DOMAIN.Role.USER,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          },
        },
      },
      'EDITOR Rachel': {
        status: 200,
        res: {
          data: {
            user: {
              id: expect.any(Number),
              name: 'Rachel Green',
              email: 'rachel.green@gmail.com',
              role: DOMAIN.Role.EDITOR,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          },
        },
      },
      'ADMIN David': {
        status: 200,
        res: {
          data: {
            user: {
              id: expect.any(Number),
              name: 'David Thompson',
              email: 'david.thompson@gmail.com',
              role: DOMAIN.Role.ADMIN,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          },
        },
      },
    };

    describe('happy path scenarios', () => {
      ['USER Carol', 'EDITOR Rachel', 'ADMIN David'].forEach((user) => {
        const result = GET_RESULTS[user];
        const testDescription = `${user} should successfully get auth status with status ${result.status}`;

        it(testDescription, async () => {
          const response = await request('get', '/api/auth/status', {
            token: USERS[user].token,
          });
          expect(response.status).toBe(result.status);
          expect(response.data).toMatchObject(result.res);
        });
      });
    });

    describe('error scenarios', () => {
      const user = 'VISITOR Sam';
      const result = GET_RESULTS[user];
      const testDescription = `${user} should receive ${result.res.error} error with status ${result.status}`;

      it(testDescription, async () => {
        const response = await request('get', '/api/auth/status', {
          token: USERS[user].token,
        });
        expect(response.status).toBe(result.status);
        expect(response.data).toMatchObject(result.res);
      });
    });
  });
});
