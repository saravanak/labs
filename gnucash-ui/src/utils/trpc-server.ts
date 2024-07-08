import prisma from "@/lib/prisma";
import { TRPCError, initTRPC } from "@trpc/server";
import { NextRequest } from "next/server";
import trpcOptions from "./trpc-options";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

export const getServerAuthSession = () => {
  console.log(`getServerAuthSession`);

  return getServerSession(authOptions);
};

interface CreateContextOptions {
  headers: Headers;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string;
      email: string;
    };
  }
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */

export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  const magicToken = opts.headers && opts.headers.get("X-MAGIC-TOKEN");

  let session = (await getServerAuthSession()) || ({} as any);

  if (magicToken) {
    const user = await prisma.user.findFirst({
      where: {
        api_key: magicToken,
      },
    });
    if (user) {
      session.user = user;
    }
  }

  return {
    session,
    headers: opts.headers,
    prisma,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: { req: NextRequest }) => {
  // Fetch stuff that depends on the request

  return await createInnerTRPCContext({
    headers: opts.req.headers,
  });
};
const t = initTRPC.context<typeof createTRPCContext>().create(trpcOptions);

import { authOptions } from "@/lib/auth-options";
import { DefaultSession, getServerSession } from "next-auth";
import { permissions } from "./shield/shield";
import { TodoService } from "@/server/services/todo";
import { SpaceService } from "@/server/services/space";

export type Context = typeof createTRPCContext;

export const globalMiddleware = t.middleware(
  async ({ next, ctx, type, path, input, rawInput, meta }: any) => {
    if (!rawInput) {
      return next();
    }
    const { session } = ctx;
    const spaceId = rawInput.spaceId;

    switch (path) {
      case "todo.getOwnTodos":
      case "space.getSpace":
      case "space.getMembers":
        if (spaceId) {
          const sharedSpace = await SpaceService.isSharedWithUser(
            spaceId,
            session.user
          );

          if (!sharedSpace) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "Can't access space",
            });
          }
        }
        break;
      case "space.addUserToSpace":
      case "space.removeUserFromSpace":
        if (spaceId) {
          const sharedSpace = await SpaceService.isOwner(spaceId, session.user);

          if (!sharedSpace) {
            throw new TRPCError({
              code: "FORBIDDEN",
              message: "Can't access space",
            });
          }
        }
        break;
      case "todo.getDetailedView":
      case "todo.getTodo":
      case "todo.updateTodo":
      case "todo.changeStatus":
      case "todo.getValidStatuses":
      case "todo.addComment":
        const todo = await TodoService.getTodo(rawInput.todoId);

        const sharedSpace = await SpaceService.isSharedWithUser(
          todo?.spaceId || -1,
          session.user
        );

        if (!sharedSpace) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Can't access space",
          });
        }
        return next({
          ctx: {
            ...ctx,
            todo,
          },
        });
    }

    return next();
  }
);

export const permissionsMiddleware = t.middleware(permissions);

export const publicProcedure = t.procedure;

export const shieldedProcedure = t.procedure
  .use(globalMiddleware)
  .use(permissionsMiddleware);

export { t };

