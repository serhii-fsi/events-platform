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

  describe('PATCH /api/users/{userId}/role', () => {
    describe('happy path scenarios', () => {
      const targetUser = USERS['USER Carol'];
      ['editor', 'admin', 'user'].forEach((newRole) => {
        it(`admin should be able to update ${targetUser.role} to ${newRole}`, async () => {
          const response = await request(
            'patch',
            `/api/users/${targetUser.id}/role`,
            {
              data: { role: newRole },
              token: USERS['ADMIN EMMA'].token,
            }
          );

          expect(response.status).toBe(200);
          expect(response.data).toMatchObject({
            data: {
              user: {
                id: targetUser.id,
                name: targetUser.name,
                email: targetUser.email,
                role: newRole,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            },
          });
          targetUser.role = newRole;
        });
      });
    });

    describe('error scenarios', () => {
      it('should return 401 for unauthenticated users', async () => {
        const targetUser = USERS['USER Carol'];

        const response = await request(
          'patch',
          `/api/users/${targetUser.id}/role`,
          {
            data: { role: 'editor' },
            token: USERS['VISITOR Sam'].token,
          }
        );

        expect(response.status).toBe(401);
        expect(response.data).toMatchObject({
          status: 401,
          error: DOMAIN.ERRORS.AUTHENTICATION,
        });
      });

      [
        USERS['VISITOR Sam'],
        USERS['USER Robert'],
        USERS['EDITOR Rachel'],
      ].forEach((user) => {
        it(`${user.role} should not be able to update user roles`, async () => {
          const targetUser = USERS['USER Carol'];

          const response = await request(
            'patch',
            `/api/users/${targetUser.id}/role`,
            {
              data: { role: 'editor' },
              token: user.token,
            }
          );

          expect(response.status).toBe(user.role === 'visitor' ? 401 : 403);
          expect(response.data).toMatchObject({
            status: user.role === 'visitor' ? 401 : 403,
            error:
              user.role === 'visitor'
                ? DOMAIN.ERRORS.AUTHENTICATION
                : DOMAIN.ERRORS.AUTHORIZATION,
          });
        });
      });

      it('should return 404 when user does not exist', async () => {
        const response = await request('patch', `/api/users/99999/role`, {
          data: { role: 'editor' },
          token: USERS['ADMIN EMMA'].token,
        });

        expect(response.status).toBe(404);
        expect(response.data).toMatchObject({
          status: 404,
          error: DOMAIN.ERRORS.USER_NOT_FOUND,
        });
      });
    });
  });
});
