// import userRouter from '@/server/user-route';
import { t, publicProcedure, shieldedProcedure } from '@/utils/trpc-server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import SuperJSON from 'superjson';
import { appRoutes } from '@/server/routers/_app';

import createSubscriber from 'pg-listen';
import prisma from '@/lib/prisma';

// Accepts the same connection config object that the "pg" package would take
const subscriber = createSubscriber({
  connectionString: process.env.DATABASE_URL,
});
const CHANNEL_NAME = 'my-channel';

subscriber.notifications.on(CHANNEL_NAME, (payload) => {
  // Payload as passed to subscriber.notify() (see below)
});

subscriber.events.on('error', (error) => {
  console.error('Fatal database connection error:', error);
  process.exit(1);
});

process.on('exit', () => {
  subscriber.close();
});

const healthCheckerRouter = t.router({
  healthchecker: shieldedProcedure.query(async ({ ctx }) => {

    return {
      status: 'success',
      message: 'Welcome to trpc with Next.js 14 and React Query',
    };
  }),
});

export const appRouter = t.mergeRouters(appRoutes, healthCheckerRouter);

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: {} as any,
  });

export type AppRouter = typeof appRouter;
