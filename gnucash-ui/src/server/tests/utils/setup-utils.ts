import { pgClient } from '@/lib/prisma/client';
import {
  resetDB,
  seedCreateTodos,
  seedCreateUsers,
} from '@/lib/prisma/seeds/seed-utils';
import { seed_shareMany } from '@/lib/typed-queries/space/action';
import { Space, User } from '@prisma/client';
import { Case } from 'change-case-all';

const baseUrl = 'http://localhost:3000/api/trpc';

export const userEmailForColor = (color: string) =>
  `t-${color}@test.example.com`;

export const apiKeyFor = (color: string) => `__key__${color}`;

export const TASK_STATUSES = ['todo', 'in-progress', 'done'];

export async function setupUsers() {
  await resetDB();
  const usersAndSpaces = await Promise.all<
    { color: string; user: User; userSpace: Space }[]
  >(
    ['red', 'blue', 'green', 'yellow', 'brown'].map((v) => {
      return new Promise<{ color: string; user: User; userSpace: Space }>(
        async (resolve) => {
          let ownerEmail = userEmailForColor(v);
          const { user, userSpace } = await seedCreateUsers({
            email: ownerEmail,
            spacename: `${Case.title(v)} Space`,
            apiKey: apiKeyFor(v),
          });

          for (var i = 0; i < 5; i++) {
            await seedCreateTodos({
              user,
              commentsCount: 2,
              title: `title-${v}-${i}`,
              description: `desc-${v}-${i}`,
              status: TASK_STATUSES[i % 3],
            });
          }

          resolve({ color: v, user, userSpace });
        }
      ) as any;
    })
  );
  const userSpaceGivers = [];
  for (var giver = 0; giver < usersAndSpaces.length; giver++) {
    for (var receiver = 0; receiver < usersAndSpaces.length - 1; receiver++) {
      if (receiver > giver) {
        userSpaceGivers.push({
          spaceId: usersAndSpaces[giver].userSpace.id,
          userId: usersAndSpaces[receiver].user.id,
          giverColor: usersAndSpaces[giver].color,
          receiverColor: usersAndSpaces[receiver].color,
        });
      }
    }
  }

  await seed_shareMany.run(
    {
      userSpaces: userSpaceGivers.map(({ userId, spaceId }: any) => ({
        userId,
        spaceId,
      })),
    },
    pgClient
  );

  return usersAndSpaces;
}

export const HTTP_ERRORS = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
};

export async function apiCaller({
  path,
  getParams,
  userColor,
  payload,
  method = 'GET',
}: {
  path: any;
  getParams?: any;
  userColor?: any;
  payload?: any;
  method?: any;
}) {
  const encodedParams = getParams
    ? encodeURIComponent(JSON.stringify({ json: getParams }))
    : '';
  const inputParams =
    getParams && method == 'GET' ? `?input=${encodedParams}` : '';
  const headers: Record<string, any> = userColor
    ? {
        'X-MAGIC-TOKEN': apiKeyFor(userColor),
      }
    : {};

  if (method == 'POST') {
    headers['Content-Type'] = 'application/json';
  }
  const url = `${baseUrl}/${path}${inputParams}`;
  console.log({ url });

  const response = await fetch(url, {
    headers,
    method,
    body: method == 'POST' ? JSON.stringify({ json: getParams }) : undefined,
  });

  const responseText = await response.text();

  let responseJson = {};
  let parseError: any = {};
  try {
    responseJson = JSON.parse(responseText);
  } catch (error) {
    parseError = error;
  }

  return { response, responseJson, responseText, parseError };
}
