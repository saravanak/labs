import { shield, allow, deny, rule, and } from "trpc-shield";
import { Context } from "../trpc-server";

const isAuthenticated = rule<Context>()(async (ctx, type, path, input, rawInput) => {
  console.log(`isAuthenticated : ${ctx?.session?.user?.name}`);
  
  return !!ctx?.session?.user?.name 
})

export const permissions = shield<Context>(
  {
    query: {
      listRacks: and(isAuthenticated),
    },
    mutation: {},
  },
  { fallbackRule: deny }
);

