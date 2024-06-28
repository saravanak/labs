import NextAuth, { AuthOptions, getServerSession } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { t } from "@/utils/trpc-server";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextRequest } from "next/server";
import { appRouter } from "../../trpc/trpc-router";
import { UserService } from "@/server/services/user";

const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});

const emailProvider = EmailProvider({
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
});

const credentialProvider = CredentialsProvider({
  name: "CYPRESS_ONLY",
  credentials: {
    email: { label: "email", type: "text", placeholder: "enter your email" },
  },
  async authorize(credentials, req) {
    const user = await prisma.user.upsert({
      where: {
        email: credentials?.email,
      },
      update: {},
      create: {
        email: credentials?.email as string,
        name: "CYP_" + credentials?.email,
      },
    });

    if (user) {
      console.log(`CYPRESS_ONLY: ${user}`);
      
      return user;
    }

    return null;
  },
});

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  session: {
    strategy : process.env.CYPRESS_TESTING_E2E ? "jwt" : 'database'
  }, 
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
    async session({ session, token, user }: any) {
      console.log("inside session callback", session, token, user);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      session.user.id = token ? token.sub : user.id;

      await UserService.defaultOrCreateOwnerSpace(session.user);
      return session;
    },
  },
};

const auth = async (req: NextRequest, ctx: any) => {
  const { params } = ctx;

  console.log({ params, url: req.url });

  authOptions.providers = [];
  if (params.nextauth.includes("github")) {
    authOptions.providers = [githubProvider];
  }

  authOptions.providers.push(emailProvider);

  if (process.env.CYPRESS_TESTING_E2E) {
    authOptions.providers = [credentialProvider];
  }

  return await NextAuth(req, ctx, authOptions);
};

export { auth as GET, auth as POST };

export const getServerAuthSession = () => {
  console.log(`getServerAuthSession`);

  return getServerSession(authOptions);
};
