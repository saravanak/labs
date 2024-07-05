
import prisma from "@/lib/prisma";
import { initTRPC } from "@trpc/server";
import { enhance } from "@zenstackhq/runtime";
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
  
  let session = await getServerAuthSession() || {} as any;

  
  if(magicToken) {
    const user = await prisma.user.findFirst({
      where: {
        api_key: magicToken
      }
    })
    if(user) {
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

import { DefaultSession, getServerSession } from "next-auth";
import { permissions } from "./shield/shield";
import { authOptions } from "@/lib/auth-options";


export type Context = typeof createTRPCContext;

export const globalMiddleware = t.middleware(async ({ ctx, next }) => {
  console.log("inside middleware!");
  return next();
});

export const permissionsMiddleware = t.middleware(permissions);

export const publicProcedure = t.procedure;

export const shieldedProcedure = t.procedure
  .use(globalMiddleware)
  .use(permissionsMiddleware);

export { t };

