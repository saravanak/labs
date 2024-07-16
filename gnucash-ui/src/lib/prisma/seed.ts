import { Shelf } from '@prisma/client';
import { enhance } from '../zenstack/enhance';
import { times } from 'lodash';
import getLuggages from './data';
import { fakeRack, fakeShelf } from './fake-data';
import prisma from './index';
import { seedCreateTodos, seedCreateUsers } from './seeds/seed-utils';

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

  await prisma.statusMeta.create({
    data: {
      statuses: 'todo,in-progress,done'
    }
  })

  const { user, userSpace } = await seedCreateUsers({
    email: 'neo@example.com',
    spacename: "Neo's Space",
  });

  return await seedCreateTodos({
    user,
    title: 'I need to breathe',
    description: 'Thats is, to live.',
    commentsCount: 1,
    userSpaceId: userSpace.id,
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
