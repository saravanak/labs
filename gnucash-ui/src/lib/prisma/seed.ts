import { faker } from '@faker-js/faker';
import { seed_insertManyCommentsIntoTodo } from './../typed-queries/todo/action';
import { Shelf } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import { omit, times } from 'lodash';
import getLuggages from './data';
import { fakeComment, fakeRack, fakeShelf, fakeUser } from './fake-data';
import prisma from './index';
import { pgClient } from './client';
import { SeedCreateTodos } from './seeds/seed-utils';

const db = enhance(prisma, {}, { kinds: ['delegate'] });

async function main() {
  times(5, async () => {
    const rack = await prisma.rack.create({ data: fakeRack() });

    times(4, async () => {
      const shelfData = fakeShelf() as Shelf;
      shelfData.rackId = rack.id;
      const shelf = await prisma.shelf.create({ data: shelfData });
      times(3, async () => {
        await prisma.luggage.createMany({ data: getLuggages(shelf) });
      });
    });
  });

  return await SeedCreateTodos({
    email: 'neo@example.com',
    spacename: "Neo's Space",
    title: 'I need to breathe',
    description: 'Thats is, to live.',
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const truncate_db = `DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
      EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;`;
