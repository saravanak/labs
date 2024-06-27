import { prisma } from "@/lib/prisma/client";
import { t } from "@/utils/trpc-server";
import { z } from "zod";

export const countryRouter = t.router({
  list: t.procedure
    .query(async () => {
      return await prisma.country.findMany()
    }),  
});


