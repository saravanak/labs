import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import type { Adapter } from "next-auth/adapters";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { t } from "@/utils/trpc-server";
import { appRouter } from "../../trpc/trpc-router";
import { NextRequest } from "next/server";
import { remove } from "lodash";

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
    async signIn({ user, account, email, provider }: any) {
      const { createCallerFactory } = t;
      console.log({ user, account, email });

      let verificationRequest = email?.verificationRequest;

      console.log("Iam the flow", user, account, email);

      const createCaller = createCallerFactory(appRouter);
      const caller = createCaller({});

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
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

