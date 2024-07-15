import { reverse } from 'lodash';
import prisma from '@/lib/prisma';
import { beforeAll, describe, expect, test } from 'vitest';
import { apiCaller, setupUsers } from '../../../tests/utils/setup-utils';
import { JPUtils, schemasByAPI } from '@/server/tests/utils/jp-utils';
import { HTTP_ERRORS } from '@/server/tests/utils/setup-utils';

const BEFORE_ALL_TIMEOUT = 30000; // 30 sec

async function getSpaceForColor(usersAndSpaces: any, color: string) {
  return usersAndSpaces.find((v: any) => v.color == color).userSpace.id;
}

async function getUserForColor(usersAndSpaces: any, color: string) {
  return usersAndSpaces.find((v: any) => v.color == color).user.id;
}

describe('spaces GETTERS', () => {
  let limit = 5;
  let usersAndSpaces: any;
  let redSpaceId: any;
  let yellowSpaceId: any;
  let brownId: any;
  beforeAll(async () => {
    usersAndSpaces = await setupUsers();
    redSpaceId = await getSpaceForColor(usersAndSpaces, 'red');
    yellowSpaceId = await getSpaceForColor(usersAndSpaces, 'yellow');
    brownId = await getUserForColor(usersAndSpaces, 'brown');
  }, BEFORE_ALL_TIMEOUT);

  describe('getSpace', () => {
    test('red able to get their space', async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: 'space.getSpace',
        userColor: 'red',
        getParams: {
          spaceId: redSpaceId,
        },
      });
      const parsedObject = JPUtils.parseReturnValue(
        responseJson,
        schemasByAPI['space.getSpace']
      );

      expect(parsedObject.success).toBeTruthy();

      expect(response.status).toBe(200);
    });
    test('yellow able to get red space', async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: 'space.getSpace',
        userColor: 'yellow',
        getParams: {
          spaceId: redSpaceId,
        },
      });
      const parsedObject = JPUtils.parseReturnValue(
        responseJson,
        schemasByAPI['space.getSpace']
      );

      expect(parsedObject.success).toBeTruthy();
    });
    test('red not able to get yellow space', async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: 'space.getSpace',
        userColor: 'red',
        getParams: {
          spaceId: yellowSpaceId,
        },
      });
      expect(JPUtils.getErrorStatus(responseJson)).toEqual(
        HTTP_ERRORS.FORBIDDEN
      );
    });
  });

  describe('addUserToSpace', () => {
    test("yellow not able to add member to  red's space", async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: 'space.addUserToSpace',
        userColor: 'yellow',
        method: 'POST',
        getParams: {
          spaceId: redSpaceId,
          inviteeEmail: 'foor@bar.com',
        },
      });
      expect(JPUtils.getErrorStatus(responseJson)).toEqual(
        HTTP_ERRORS.FORBIDDEN
      );
    });
    test('red cannot add a nonexistent user as a member', async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: 'space.addUserToSpace',
        userColor: 'red',
        method: 'POST',
        getParams: {
          spaceId: redSpaceId,
          inviteeEmail: 'foor@bar.com',
        },
      });
      expect(JPUtils.getErrorStatus(responseJson)).toEqual(
        HTTP_ERRORS.UNPROCESSABLE_CONTENT
      );
    });
    test.only('red can add and remove brown user', async () => {
      const { response, responseJson, responseText } = await apiCaller({
        path: 'space.addUserToSpace',
        userColor: 'red',
        method: 'POST',
        getParams: {
          spaceId: redSpaceId,
          inviteeEmail: 't-brown@test.example.com',
        },
      });
      expect(response.status).toBe(200);

      const {
        response: r1,
        responseJson: rj1,
        responseText: rt1,
      } = await apiCaller({
        path: 'space.getUserSpaces',
        userColor: 'brown',
        getParams: {
          limit: 10,
        },
      });

      const parsedObject = JPUtils.parseFirstItem(
        rj1,
        schemasByAPI['space.getUserSpaces']
      );

      expect(parsedObject.success).toBeTruthy();
      expect(JPUtils.firstItem(rj1).sharedWithCount).toEqual(0);

      const {
        response: r2,
        responseJson: rj2,
        responseText: rt2,
      } = await apiCaller({
        path: 'space.spaceCounts',
        userColor: 'brown',
        getParams: {},
      });

      expect(parsedObject.success).toBeTruthy();
      expect(JPUtils.returnValue(rj2)).toEqual({
        owningSpaces: 1,
        sharedSpaces: 1,
      });

      const {
        response: r3,
        responseJson: rj3,
        responseText: rt3,
      } = await apiCaller({
        path: 'space.removeUserFromSpace',
        userColor: 'red',
        method: 'POST',
        getParams: {
          spaceId: redSpaceId,
          memberIdRemove: brownId,
        },
      });
      expect(r3.status).toBe(200);

      const {
        response: r4,
        responseJson: rj4,
        responseText: rt4,
      } = await apiCaller({
        path: 'space.spaceCounts',
        userColor: 'brown',
        getParams: {},
      });

      expect(parsedObject.success).toBeTruthy();
      expect(JPUtils.returnValue(rj4)).toEqual({
        owningSpaces: 1,
        sharedSpaces: 0,
      });
    });
  });
});
