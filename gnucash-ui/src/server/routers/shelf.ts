import { z } from 'zod';
import { prisma } from '@/lib/prisma/client';
import { ShelfModel } from '@/lib/prisma/zod';
import { t } from '@/utils/trpc-server';
import { TRPCError } from '@trpc/server';

export const shelfRouter = t.router({
  list: t.procedure
    .input(
      z.object({
        rackId: z.number(),
      })
    )
    .query(async (opts) => {
      // const { limit, page } = filterQuery;
      // const take = limit || 10;
      // const skip = (page - 1) * limit;

      console.log(opts.input.rackId);
      try {
        const shelves = await prisma.shelf.findMany({
          where: {
            rackId: opts.input.rackId,
          },
        });

        return { shelves };
      } catch (err: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message,
        });
      }
    }),
  // create: t.procedure
  //   .input(ShelfModel.omit({ id: true }))
  //   .mutation(async (opts) => {
  //     return prisma.rack.create({
  //       data: opts.input,
  //     });
  //   }),
});
