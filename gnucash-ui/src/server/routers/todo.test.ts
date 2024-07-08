import { beforeAll, beforeEach, describe, expect, test } from "vitest";

import { AppRouter, appRouter } from "@/app/api/trpc/trpc-router";
import { prisma, pgClient } from "@/lib/prisma/client";
import {
  resetDB,
  seedCreateTodos,
  seedCreateUsers,
} from "@/lib/prisma/seeds/seed-utils";
import { t } from "@/utils/trpc-server";
import { type inferProcedureInput } from "@trpc/server";
import { Case } from "change-case-all";
import { Space, User } from "@prisma/client";
import { seed_shareMany } from "@/lib/typed-queries/space/action";

const userEmailForColor = (color: string) => `t-${color}@test.example.com`;
const sharingMatrix = [
  { giver: "red", receiver: "blue" },
  { giver: "red", receiver: "green" },
  { giver: "red", receiver: "yellow" },

  { giver: "blue", receiver: "green" },
  { giver: "blue", receiver: "yellow" },

  { giver: "green", receiver: "yellow" },
];

describe("todo routes", async () => {
  let caller: AppRouter;
  let ctx: any;
  let userSpaceGivers: any[];
  let usersAndSpaces: any[];
  const createCaller = t.createCallerFactory<AppRouter>(appRouter);
  beforeAll(async () => {
    await resetDB();
    usersAndSpaces = await Promise.all<
      { color: string; user: User; userSpace: Space }[]
    >(
      ["red", "blue", "green", "yellow", "brown"].map((v) => {
        return new Promise<{ color: string; user: User; userSpace: Space }>(
          async (resolve) => {
            let ownerEmail = userEmailForColor(v);
            const { user, userSpace } = await seedCreateUsers({
              email: ownerEmail,
              spacename: `${Case.title(v)} Space`,
            });

            for (var i = 0; i < 5; i++) {
              await seedCreateTodos({
                user,
                commentsCount: 2,
                title: `title-${v}-${i}`,
                description: `desc-${v}-${i}`,
              });
            }

            resolve({ color: v, user, userSpace });
          }
        ) as any;
      })
    );
    /**
     *  Sharing space
     *  R -> B, G, Y
     *  B ->    G, Y
     *  G ->       Y
     *  Y ->
     *  Br ->
     */
    userSpaceGivers = [];
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
    console.log(userSpaceGivers);

    const spacesInserted = await seed_shareMany.run(
      {
        userSpaces: userSpaceGivers.map(({ userId, spaceId }: any) => ({
          userId,
          spaceId,
        })),
      },
      pgClient
    );
  });

  describe("getOwnTodos", async () => {
    const limit = 10;
    describe("with session user as the todo owner", () => {
      let ownerEmail = userEmailForColor("red");
      beforeAll(async () => {
        ctx = {
          session: {
            user: {
              id: (
                await prisma.user.findFirst({ where: { email: ownerEmail } })
              )?.id,
              email: ownerEmail,
            },
          },
          headers: null as any,
          prisma: null as any,
        };

        caller = createCaller(ctx) as unknown as AppRouter;
      });
      test("returns correctly with no search text and status options", async () => {
        const input: inferProcedureInput<AppRouter["todo"]["getOwnTodos"]> = {
          limit,
          cursor: null,
          searchText: null,
          statuses: [],
        };

        const todos: any = await caller.todo.getOwnTodos(input as any);

        expect(todos.items.length).toEqual(5);
        expect(todos.nextCursor).toBeGreaterThan(0);
      });

      test("returns correctly with title search text", async () => {
        let input: inferProcedureInput<AppRouter["todo"]["getOwnTodos"]> = {
          limit,
          cursor: null,
          searchText: "title-red-1",
          statuses: [],
        };

        let todos: any = await caller.todo.getOwnTodos(input as any);

        expect(todos.items.length).toEqual(1);
        expect(todos.items[0].title).toEqual("title-red-1");

        input = {
          limit,
          cursor: null,
          searchText: "foo-1",
          statuses: [],
        };

        todos = await caller.todo.getOwnTodos(input as any);

        expect(todos.items.length).toEqual(0);
      });

      test("returns correctly with description search text", async () => {
        let input: inferProcedureInput<AppRouter["todo"]["getOwnTodos"]> = {
          limit,
          cursor: null,
          searchText: "desc-red-1",
          statuses: [],
        };

        let todos: any = await caller.todo.getOwnTodos(input as any);

        expect(todos.items.length).toEqual(1);
        expect(todos.items[0].description).toEqual("desc-red-1");

        input = {
          limit,
          cursor: null,
          searchText: "foo-1",
          statuses: [],
        };

        todos = await caller.todo.getOwnTodos(input as any);

        expect(todos.items.length).toEqual(0);
      });
    });
    describe("with session user as someone else", () => {
      const userEmail = userEmailForColor("black");
      beforeEach(async () => {
        ctx = {
          session: {
            user: {
              id: "foor-asdf",
              email: userEmail,
            },
          },
          headers: null as any,
          prisma: null as any,
        };

        caller = createCaller(ctx) as unknown as AppRouter;
      });
      test("returns no todos", async () => {
        const input = {
          limit,
          cursor: null,
          searchText: null,
          statuses: [],
        };

        const todos: any = await caller.todo.getOwnTodos(input as any);

        expect(todos.items.length).toEqual(0);
      });
    });

    describe("for shared spaces", () => {
      test.each(sharingMatrix)(
        "$receiver does not see $giver todos",
        async ({ giver, receiver }) => {
          const ownerEmail = userEmailForColor(receiver);

          ctx = {
            session: {
              user: {
                id: (
                  await prisma.user.findFirst({ where: { email: ownerEmail } })
                )?.id,
                email: ownerEmail,
              },
            },
            headers: null as any,
            prisma: null as any,
          };

          caller = createCaller(ctx) as unknown as AppRouter;
          const input = {
            limit,
            cursor: null,
            searchText: `title-${giver}-`,
            statuses: [],
          };

          const todos: any = await caller.todo.getOwnTodos(input as any);
          expect(todos.items.length).toEqual(0);
        }
      );
    });

    describe.only("for owned spaces", () => {
      let user;
      beforeAll(async () => {
        user = usersAndSpaces.find((v: any) => v.color == "red").user;
        const spaceCreted = await prisma.space.create({
          data: {
            name: "another red space",
            owner_id: user.id,
          },
        });
        for (var i = 0; i < 5; i++) {
          await seedCreateTodos({
            user,
            commentsCount: 2,
            title: `title-red2-${i}`,
            description: `desc-red2-${i}`,
          });
        }

        ctx = {
          session: {
            user: {
              id: user.id,
              email: user.email,
            },
          },
          headers: null as any,
          prisma: null as any,
        };

        caller = createCaller(ctx) as unknown as AppRouter;
      });
      test("is able to access all todos on owining spaces", async () => {
        const input = {
          limit,
          cursor: null,
          searchText: `title-red2-`,
          statuses: [],
        };
        const todos: any = await caller.todo.getOwnTodos(input as any);
        expect(todos.items.length).toEqual(5);
      });
    });
  });
});

