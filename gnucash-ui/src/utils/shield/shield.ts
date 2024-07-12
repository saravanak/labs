import { TRPCError } from '@trpc/server';
import { allow, rule, shield } from 'trpc-shield';
import { Context } from '../trpc-server';

const isAuthenticated = rule<Context>()(
  async (ctx: any, type, path, input, rawInput) => {
    return (ctx as any)?.session?.user?.email?.length > 0;
  }
);

export const permissions = shield<Context>(
  {
    query: {
      healthchecker: allow,
    },
    mutation: {},
  },
  {
    fallbackRule: isAuthenticated,
    allowExternalErrors: true,
    fallbackError: new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not allowed',
    }),
  }
);
