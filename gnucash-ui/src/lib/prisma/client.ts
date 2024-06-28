import { PrismaClient } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";
import pg from "pg";
const { Client } = pg;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pgClient?: any;
};

export const prisma = enhance(
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] }),
  {},
  { kinds: ["delegate"] }
);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma as any;
}

const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect();
// const query : IGetTodosWithLatestStatusesQuery;

export const pgClient = client;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgClient = pgClient;
}

//Ref https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient

