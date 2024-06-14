import { z } from 'zod';
import { t } from '@/utils/trpc-server';
import { rackRouter } from './rack';


export const appRoutes = t.router({
  hello: t.procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  rack: rackRouter
});
// export type definition of API
export type AppRouter = typeof appRoutes;