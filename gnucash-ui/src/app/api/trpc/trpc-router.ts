// import userRouter from '@/server/user-route';
import { t, publicProcedure, shieldedProcedure } from '@/utils/trpc-server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import SuperJSON from 'superjson';
import { appRoutes } from '@/server/routers/_app';


import createSubscriber from "pg-listen"

// Accepts the same connection config object that the "pg" package would take
const subscriber = createSubscriber({ connectionString: process.env.DATABASE_URL })
const CHANNEL_NAME = "my-channel";


subscriber.notifications.on(CHANNEL_NAME, (payload) => {
  // Payload as passed to subscriber.notify() (see below)
  console.log("Received notification in 'my-channel':", payload)
})

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error)
  process.exit(1)
})

process.on("exit", () => {
  subscriber.close()
})

// export async function connect () {
//   console.log('Connect called...');  
//   await subscriber.connect()
//   await subscriber.listenTo(CHANNEL_NAME)
// }

// (async ()=> {await connect()})();


const healthCheckerRouter = t.router({
  healthchecker: shieldedProcedure.query(({ ctx }) => {
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
    ctx: {}  as any
  } );

export type AppRouter = typeof appRouter;