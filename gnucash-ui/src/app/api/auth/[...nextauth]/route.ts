import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import type { Adapter } from "next-auth/adapters";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { t } from "@/utils/trpc-server";
import { appRouter } from "../../trpc/trpc-router";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, email }: any) {
      const { createCallerFactory } = t;
      console.log({ user, account, email });

      let verificationRequest =  email?.verificationRequest;
      
      console.log("Iam the flow", user, account, email);

      const createCaller = createCallerFactory(appRouter);
      const caller = createCaller({});

      const userWithEmail = await caller.user.findBy({ email: user.email });

      console.log({ userWithEmail });

      if (verificationRequest && userWithEmail.count == 1) {
        //Only send emails for users who'e email is already present
        return true;
      } else if(verificationRequest) {
        return "/register";
      } else {
        return "/";
      }
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

