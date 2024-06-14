// import userRouter from '@/server/user-route';
import { t } from '@/utils/trpc-server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import SuperJSON from 'superjson';
import { appRoutes } from '@/server/router/_app';

const healthCheckerRouter = t.router({
  healthchecker: t.procedure.query(({ ctx }) => {
    return {
      status: 'success',
      message: 'Welcome to trpc with Next.js 14 and React Query',
    };
  }),
});

export const appRouter = t.mergeRouters( appRoutes, healthCheckerRouter);

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: () => {},
  });

export type AppRouter = typeof appRouter;