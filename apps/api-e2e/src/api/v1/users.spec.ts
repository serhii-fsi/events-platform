import { request, seedDb, purgeDb } from '../../support/utils';
import { USERS } from '../../support/test-constants';
import * as DOMAIN from '../../../../api/src/domain/constants';

describe('Users API', () => {
  beforeAll(async () => {
    await purgeDb();
    await seedDb();
  });

  describe('GET /api/users', () => {
    describe('happy path scenarios', () => {
      it('admin should be able to search users with search parameter', async () => {
        const searchQuery = 'Robert';
        const response = await request('get', '/api/users', {
          params: { search: searchQuery },
          token: USERS['ADMIN EMMA'].token,
        });

        expect(response.status).toBe(200);
        expect(response.data.data.users).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.stringContaining(searchQuery),
            }),
          ])
        );
      });
    });

    describe('error scenarios', () => {
      [
        USERS['VISITOR Sam'],
        USERS['USER Carol'],
        USERS['EDITOR Rachel'],
      ].forEach((user) => {
        it(`${user.role} should not be able to search users`, async () => {
          const response = await request('get', '/api/users', {
            params: { search: 'Robert' },
            token: user.token,
          });

          if (!user.token) {
            expect(response.status).toBe(401);
            expect(response.data).toMatchObject({
              status: 401,
              error: DOMAIN.ERRORS.AUTHENTICATION,
            });
          } else {
            expect(response.status).toBe(403);
            expect(response.data).toMatchObject({
              status: 403,
              error: DOMAIN.ERRORS.AUTHORIZATION,
            });
          }
        });
      });
    });
  });
});
