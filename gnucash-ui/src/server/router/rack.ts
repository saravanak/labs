import { z } from "zod";
import { t } from "@/utils/trpc-server";
import { prisma } from "@/lib/prisma/client";
import { TRPCError } from "@trpc/server";

export const rackRouter = t.router({
  count: t.procedure
    .input(
      z.object({
        s: z.string(),
      })
    )
    .query(async (opts) => {
      const rackCount = await prisma.rack.count({
        where: {
          name: {
            startsWith: opts.input.s,
          },
        },
      });

      return { count: rackCount };
    }),
  list: t.procedure.query(async (opts) => {
    // const { limit, page } = filterQuery;
    // const take = limit || 10;
    // const skip = (page - 1) * limit;

    try {
      const racks = await prisma.rack.findMany();

      return { racks };
    } catch (err: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    }
  }),
});
// export type definition of API
export type AppRouter = typeof rackRouter;

