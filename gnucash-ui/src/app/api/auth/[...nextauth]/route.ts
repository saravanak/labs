import NextAuth from 'next-auth';

import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';

import { NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth-options';

const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});

const emailProvider = EmailProvider({
  server: process.env.EMAIL_SERVER,
  from: process.env.EMAIL_FROM,
});

const credentialProvider = CredentialsProvider({
  name: 'cypress_only',
  credentials: {
    email: { label: 'email', type: 'text', placeholder: 'enter your email' },
  },
  async authorize(credentials, req) {

    const user = await prisma.user.upsert({
      where: {
        email: credentials?.email,
      },
      update: {},
      create: {
        email: credentials?.email as string,
        name: 'CYP_' + credentials?.email,
      },
    });

    if (user) {

      return user;
    }

    return null;
  },
});

const auth = async (req: NextRequest, ctx: any) => {
  const { params } = ctx;


  authOptions.providers = [];
  if (params.nextauth.includes('github')) {
    authOptions.providers = [githubProvider];
  }

  authOptions.providers.push(emailProvider);

  if (process.env.CYPRESS_TESTING_E2E) {
    authOptions.providers = [credentialProvider];
  }

  return await NextAuth(req, ctx, authOptions);
};

export { auth as GET, auth as POST };
