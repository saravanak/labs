import { PrismaClient } from '@prisma/client';
import { enhance } from '../zenstack/enhance';
import pg from 'pg';
const { Client } = pg;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pgClient?: any;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ||
  (() => {console.warn("creating prisma client"); return true })() && 
  enhance(
    new PrismaClient({ log: process.env.ENABLE_QUERY_LOGS ? ['query'] : ['info'] }),
    {},
    { kinds: ['delegate'] }
  );

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const pgClient =
  globalForPrisma.pgClient ||
  new Client({
    connectionString: process.env.DATABASE_URL,
    application_name: 'pg_typed_runner',
  });

if (!globalForPrisma.pgClient) {
  pgClient.connect();
}

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pgClient = pgClient;
}

//Ref https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
