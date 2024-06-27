import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

import prisma from "@/lib/prisma";
import { t } from "@/utils/trpc-server";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextRequest } from "next/server";
import { appRouter } from "../../trpc/trpc-router";

const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});

const emailProvider = EmailProvider({
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [],
  callbacks: {
    async signIn({ user, account, email }: any) {
      const { createCallerFactory } = t;
      console.log({ user, account, email });

      let verificationRequest = email?.verificationRequest;

      const createCaller = createCallerFactory(appRouter);
      const caller = createCaller({} as any);

      const userWithEmail = await caller.user.findBy({ email: user.email });

      console.log({ userWithEmail });

      if (verificationRequest && userWithEmail.count == 1) {
        //Only send emails for users who'e email is already present
        return true;
      } else if (verificationRequest) {
        return "/register";
      } else {
        return true;
      }
    },
    session({ session, token, user }:any) {
        console.log('inside session callback');
      
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        session.user = user;
      return session;
    },
  },
};

const auth = async (req: NextRequest, ctx: any) => {
  const { params } = ctx;

  console.log({ params, url: req.url });

  authOptions.providers= []
  if (params.nextauth.includes("github")) {
    authOptions.providers = [githubProvider];
  }

  authOptions.providers.push(emailProvider);

  return await NextAuth(req, ctx, authOptions);
};

export { auth as GET, auth as POST };

export const getServerAuthSession = () => {
  console.log(`getServerAuthSession`);
  
  return getServerSession(authOptions);
}