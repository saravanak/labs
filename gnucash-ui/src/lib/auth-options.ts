import { AuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { UserService } from "@/server/services/user";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  session: {
    strategy: process.env.CYPRESS_TESTING_E2E ? "jwt" : "database",
  },
  providers: [],
  callbacks: {
    // async signIn({ user, account, email }: any) {
    //   const { createCallerFactory } = t;
    //   console.log({ user, account, email });

    //   let verificationRequest = email?.verificationRequest;

    //   const createCaller = createCallerFactory(appRouter);
    //   const caller = createCaller({} as any);

    //   const userWithEmail = await caller.user.findBy({ email: user.email });

    //   console.log({ userWithEmail });

    //   if (verificationRequest && userWithEmail.count == 1) {
    //     //Only send emails for users who'e email is already present
    //     return true;
    //   } else if (verificationRequest) {
    //     return "/register";
    //   } else {
    //     return true;
    //   }
    // },
    async session({ session, token, user }: any) {
      session.user.id = token ? token.sub : user.id;
      session.user.isDemoUser = session?.user.email == "neo@example.com";
      if(!session.user.isDemoUser) {
        //We do the setup for the demo user on seeding.
        await UserService.defaultOrCreateOwnerSpace(session.user);
      }
      return session;
    },
  },
};
