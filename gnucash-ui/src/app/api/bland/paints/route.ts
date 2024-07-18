import { DB, PaintMatrix } from '@/kysely/db';
import {
  ExpressionBuilder,
  Kysely,
  PostgresDialect,
  Selectable,
  sql,
} from 'kysely';
import { Pool } from 'pg';

export type Paints = Selectable<PaintMatrix>;
const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    application_name: 'kysely_pool',
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: Request) {
  const url = new URL(request.url);
  const urlSps = new URLSearchParams(url.search);
  const mode = urlSps.get('mode');
  const cursorParam = urlSps.get('cursor');
  const cursor = cursorParam ? parseInt(cursorParam, 10) : 0;

  console.log({ mode });
  let dbRows;
  switch (mode) {
    case 'date-intervals':
      dbRows = await db
        .selectFrom('paint_matrix')
        .innerJoin('painting', 'painting.id', 'paint_matrix.paint_id')
        .where('painting.id', '=', 2)
        .select((eb: ExpressionBuilder<DB, 'paint_matrix'>) => [
          eb.fn.max('created_at').as('max'),
          eb.fn.min('created_at').as('min'),
          sql<Date>`
            max(${eb.ref('created_at')})
            -
            min(${eb.ref('created_at')})
          `.as('duration'),
        ])
        .execute();

      break;

    case 'rows':
      dbRows = await db
        .selectFrom('paint_matrix')
        .innerJoin('painting', 'painting.id', 'paint_matrix.paint_id')
        .select(['paint_matrix.x', 'paint_matrix.id', 'paint_matrix.y','paint_matrix.color' ])
        .orderBy('paint_matrix.id')
        .where('paint_matrix.id', '>', cursor)
        .where('painting.id', '=', 2)
        .limit(100)
        .execute();

      break;
  }
  const asString = JSON.stringify(dbRows);
  return new Response(asString);
}
