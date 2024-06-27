import { CompleteTodo, TodoModel } from "./zod/todo";
import prisma from "./index";
import { times } from "lodash";
import getLuggages from "./data";
import {
  fakeComment,
  fakeRack,
  fakeShelf,
  fakeSpaceComplete,
  fakeTodo,
  fakeTodoComplete,
  fakeUser,
  fakeUserComplete,
} from "./fake-data";
import { connect } from "http2";
import { Shelf } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";

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
  console.log(fakeUser());

  const user = await prisma.user.create({ data: fakeUser() });

  const userSpace = await prisma.space.create({ data: { ownerId: user.id } });
  const todo = await db.todo.create({
    data: {
      statusMeta: { connect: { id: statusMeta?.id } },
      title: "asda",
      descritpion: "asda",
      space: { connect: { id: userSpace?.id } },
    },
  });

  await db.comment.createMany({
    data: Array(10)
      .fill(null)
      .map((v) => {
        return {
          comment: fakeComment().comment,
          commentableId: todo.id,
          userId: user.id,
        };
      }),
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

