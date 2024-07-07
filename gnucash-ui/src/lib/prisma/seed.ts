import { faker } from "@faker-js/faker";
import { seed_insertManyCommentsIntoTodo } from "./../typed-queries/todo/action";
import { Shelf } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";
import { omit, times } from "lodash";
import getLuggages from "./data";
import { fakeComment, fakeRack, fakeShelf, fakeUser } from "./fake-data";
import prisma from "./index";
import { pgClient } from "./client";

const db = enhance(prisma, {}, { kinds: ["delegate"] });

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
    data: { statuses: ["todo", "in-progress", "done"].join(",") },
  });

  const statusMeta = await prisma.statusMeta.findFirst();

  const newUser = omit(fakeUser(), ["space_id"]);
  newUser.email = "neo@example.com";
  const user = await prisma.user.create({ data: newUser });

  const userSpace = await prisma.space.create({
    data: {
      owner_id: user.id,
      name: "Demo Space for Neo",
      is_system_space: true,
    },
  });
  const todo = await db.todo.create({
    data: {
      statusMeta: { connect: { id: statusMeta?.id } },
      title: "I need to breathe",
      description: "That is, to live!",
      space: { connect: { id: userSpace?.id } },
    },
  });

  await prisma.statusTransitions.create({
    data: {
      status: statusMeta?.statuses.split(",")[0] as string,
      todo_id: todo.id,
      comment: `Changed by ${user.email}`,
    },
  });

  const insertedComments = await seed_insertManyCommentsIntoTodo.run(
    {
      todos: Array(10)
        .fill(null)
        .map(() => ({
          commentContent: faker.lorem.lines(2),
          userId: user?.id,
        })),
    },
    pgClient
  );

  return await Promise.all(
    insertedComments.map(({ id: commentId }) => {
      return db.commentable.create({
        data: {
          commentee_id: todo.id,
          commentee_type: "Todo",
          comment_id: commentId,
        },
      });
    })
  );
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

