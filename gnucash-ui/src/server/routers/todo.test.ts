/**
 * Integration test example for the `post` router
 */

import { describe, expect, test } from "@jest/globals";
import { type inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext, t } from "@/utils/trpc-server";
import { AppRouter, appRouter } from "@/app/api/trpc/trpc-router";

test("add and get post", async () => {
  const ORIG_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ORIG_ENV }
    process.env.CYPRESS_TESTING_E2E = 'apple'
  })

  afterEach(() => {
    process.env = ORIG_ENV
  })

  const createCaller = t.createCallerFactory(appRouter);

  const ctx = await createInnerTRPCContext({} as any);

  const caller = createCaller({
    session: {},
    headers: null as any,
    prisma: null as any,
  });

  const input: inferProcedureInput<AppRouter["todo"]["getOwnTodos"]> = {
    limit: 5,
    cursor: null,
  };

  const todos = await caller.todo.getOwnTodos(input);

  console.log({ todos });
});

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(4);
  });
});
