import { prisma } from "@/lib/prisma/client";
import { UserModel } from "@/lib/prisma/zod";
import { shieldedProcedure, t } from "@/utils/trpc-server";
import { z } from "zod";
import { SpaceService } from "../services/space";
import { last } from "lodash";

export const spaceRouter = t.router({
  removeUserFromSpace: t.procedure
    .input(
      z.object({
        spaceId: z.number(),
        memberIdRemove: z.string(),
      })
    )
    .mutation(async (opts) => {
      return SpaceService.removeUserFromSpace(opts.input);
    }),
  register: t.procedure
    .input(UserModel.pick({ name: true, email: true }))
    .mutation(async (opts) => {
      const user = await prisma.user.create({
        data: {
          email: opts.input.email,
          name: opts.input.name,
        },
      });

      return { user };
    }),

  getAllSpaces: shieldedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),        
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;
      const items = await SpaceService.getAllSpaces(session.user, opts.input);
      return {
        items,
        nextCursor: last(items)?.id,
      };
    }),
});
// export type definition of API

