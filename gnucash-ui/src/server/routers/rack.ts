import { z } from 'zod';
import { t, shieldedProcedure, publicProcedure } from '@/utils/trpc-server';
import { prisma } from '@/lib/prisma/client';
import { RackModel } from '@/lib/prisma/zod';

export const rackRouter = t.router({
  count: publicProcedure
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
  listRacks: shieldedProcedure.query(async (opts) => {
    // const { limit, page } = filterQuery;
    // const take = limit || 10;
    // const skip = (page - 1) * limit;

    const racks = await prisma.rack.findMany();
    return { racks };
  }),
  create: shieldedProcedure
    .input(RackModel.omit({ id: true }))
    .mutation(async (opts) => {
      return prisma.rack.create({
        data: opts.input,
      });
    }),
});
// export type definition of API
