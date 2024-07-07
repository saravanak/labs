import { shield, allow, deny, rule, and } from "trpc-shield";
import { Context } from "../trpc-server";

const isAuthenticated = rule<Context>()(
  async (ctx, type, path, input, rawInput) => {
    return !!(ctx as any)?.session?.user?.email;
  }
);

export const permissions = shield<Context>(
  {
    query: {
      listRacks: and(isAuthenticated),
      getOwnTodos: isAuthenticated,
      getDetailedView: isAuthenticated,
      getValidStatuses: isAuthenticated,
    },
    mutation: {},
  },
  { fallbackRule: isAuthenticated }
);

