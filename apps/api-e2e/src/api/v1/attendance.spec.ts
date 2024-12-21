import { request, seedDb, purgeDb } from '../../support/utils';
import * as DOMAIN from '../../../../api/src/domain/constants';
import {
  USERS,
  TEST_RELATIONS,
  TEST_EVENTS,
} from '../../support/test-constants';

type UserEventData = {
  relation: (typeof TEST_RELATIONS)[0];
  event: (typeof TEST_EVENTS)[0];
};

const findUserEventData = (userId: number): UserEventData => {
  const relation = TEST_RELATIONS.find(
    (relation) => relation.userId === userId
  );
  const event = TEST_EVENTS.find((event) => event.id === relation.eventId);
  return { relation, event };
};

describe('Attendance API', () => {
  beforeAll(async () => {
    await purgeDb();
    await seedDb();
  });

  describe('GET /api/users/{userId}/events/{eventId}/attendance-status', () => {
    describe('happy path scenarios', () => {
      [
        USERS['USER Robert'],
        USERS['EDITOR Rachel'],
        USERS['ADMIN David'],
      ].forEach((user) => {
        it(`${user.role} should be able to get their own attendance status`, async () => {
          const { relation, event } = findUserEventData(user.id);

          const response = await request(
            'get',
            `/api/users/${user.id}/events/${event.id}/attendance-status`,
            {
              token: user.token,
            }
          );

          expect(response.status).toBe(200);
          expect(response.data).toMatchObject({
            data: {
              attendanceStatus: {
                status: relation.attendance,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            },
          });
        });
      });

      [
        USERS['USER Robert'],
        USERS['EDITOR Rachel'],
        USERS['ADMIN David'],
      ].forEach((targetUser) => {
        it(`admin should be able to get attendance status for other ${targetUser.role}`, async () => {
          const { relation, event } = findUserEventData(targetUser.id);

          const response = await request(
            'get',
            `/api/users/${targetUser.id}/events/${event.id}/attendance-status`,
            {
              token: USERS['ADMIN EMMA'].token,
            }
          );

          expect(response.status).toBe(200);
          expect(response.data).toMatchObject({
            data: {
              attendanceStatus: {
                status: relation.attendance,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            },
          });
        });
      });
    });

    describe('error scenarios', () => {
      // Testing non-existent events and events without attendance status
      [
        USERS['USER Robert'],
        USERS['EDITOR Rachel'],
        USERS['ADMIN David'],
      ].forEach((user) => {
        it(`${user.role} should receive 404 when accessing non-existent event`, async () => {
          const response = await request(
            'get',
            `/api/users/${user.id}/events/999999/attendance-status`,
            {
              token: user.token,
            }
          );

          expect(response.status).toBe(404);
          expect(response.data).toMatchObject({
            status: 404,
            error: DOMAIN.ERRORS.ATTENDANCE_NOT_FOUND,
          });
        });

        it(`${user.role} should receive 404 when accessing event without attendance status`, async () => {
          // Event with ID 1 exists but none of the test users have attendance status for it
          const response = await request(
            'get',
            `/api/users/${user.id}/events/1/attendance-status`,
            {
              token: user.token,
            }
          );

          expect(response.status).toBe(404);
          expect(response.data).toMatchObject({
            status: 404,
            error: DOMAIN.ERRORS.ATTENDANCE_NOT_FOUND,
          });
        });
      });

      // Test that users and editors cannot access others attendance status
      [
        USERS['VISITOR Sam'],
        USERS['USER Carol'],
        USERS['EDITOR Rachel'],
      ].forEach((requestingUser) => {
        [
          USERS['USER Robert'],
          USERS['EDITOR Thomas'],
          USERS['ADMIN David'],
        ].forEach((targetUser) => {
          if (targetUser.id !== requestingUser?.id) {
            it(`${requestingUser.role} should not be able to get attendance status for other ${targetUser.role}`, async () => {
              const { event } = findUserEventData(targetUser.id);

              const response = await request(
                'get',
                `/api/users/${targetUser.id}/events/${event.id}/attendance-status`,
                {
                  token: requestingUser.token,
                }
              );

              if (!requestingUser.token) {
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
          }
        });
      });
    });
  });

  describe('PATCH /api/users/{userId}/events/{eventId}/attendance-status', () => {
    describe('happy path scenarios', () => {
      [
        USERS['USER Robert'],
        USERS['EDITOR Rachel'],
        USERS['ADMIN David'],
      ].forEach((user) => {
        it(`${user.role} should be able to update their attendance status`, async () => {
          const { relation, event } = findUserEventData(user.id);
          const currentStatus = relation.attendance;
          const newStatus =
            currentStatus === 'attending' ? 'declined' : 'attending';

          const response = await request(
            'patch',
            `/api/users/${user.id}/events/${event.id}/attendance-status`,
            {
              token: user.token,
              data: { attendanceStatus: newStatus },
            }
          );

          expect(response.status).toBe(200);
          expect(response.data).toMatchObject({
            data: {
              attendanceStatus: {
                status: newStatus,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              },
            },
          });

          const getResponse = await request(
            'get',
            `/api/users/${user.id}/events/${event.id}/attendance-status`,
            {
              token: user.token,
            }
          );

          expect(getResponse.status).toBe(200);
          expect(getResponse.data.data.attendanceStatus.status).toBe(newStatus);
        });
      });
    });

    describe('error scenarios', () => {
      it('should return 401 for unauthenticated users', async () => {
        const { relation, event } = findUserEventData(USERS['USER Robert'].id);

        const response = await request(
          'patch',
          `/api/users/${relation.userId}/events/${event.id}/attendance-status`,
          {
            token: USERS['VISITOR Sam'].token,
            data: { attendanceStatus: 'attending' },
          }
        );

        expect(response.status).toBe(401);
        expect(response.data).toMatchObject({
          status: 401,
          error: DOMAIN.ERRORS.AUTHENTICATION,
        });
      });

      // Test that users cannot update others' attendance status
      [
        USERS['USER Carol'],
        USERS['EDITOR Rachel'],
        USERS['ADMIN EMMA'],
      ].forEach((requestingUser) => {
        [
          USERS['USER Robert'],
          USERS['EDITOR Thomas'],
          USERS['ADMIN David'],
        ].forEach((targetUser) => {
          if (targetUser.id !== requestingUser.id) {
            it(`${requestingUser.role} should not be able to update attendance status for other ${targetUser.role}`, async () => {
              const { event } = findUserEventData(targetUser.id);

              const response = await request(
                'patch',
                `/api/users/${targetUser.id}/events/${event.id}/attendance-status`,
                {
                  token: requestingUser.token,
                  data: { attendanceStatus: 'attending' },
                }
              );

              expect(response.status).toBe(403);
              expect(response.data).toMatchObject({
                status: 403,
                error: DOMAIN.ERRORS.AUTHORIZATION,
              });
            });
          }
        });
      });

      it('should return 404 when event does not exist', async () => {
        const user = USERS['USER Robert'];

        const response = await request(
          'patch',
          `/api/users/${user.id}/events/999999/attendance-status`,
          {
            token: user.token,
            data: { attendanceStatus: 'attending' },
          }
        );

        expect(response.status).toBe(404);
        expect(response.data).toMatchObject({
          status: 404,
          error: DOMAIN.ERRORS.EVENT_NOT_FOUND,
        });
      });
    });
  });
});
