import { prisma } from "@/lib/prisma/client";
import { UserModel } from "@/lib/prisma/zod";
import { t } from "@/utils/trpc-server";
import { z } from "zod";

export const userRouter = t.router({
  findBy: t.procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async (opts) => {
      const userCount = await prisma.user.count({
        where: {
          email: {
            equals: opts.input.email,
          },
        },
      });

      return { count: userCount };
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
});
// export type definition of API

