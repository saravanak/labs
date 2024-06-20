import { PrismaClient, Rack, Shelf } from "@prisma/client";
import getLuggages from "./data";
import { fakeRack, fakeShelf } from "./fake-data";
import { times } from "lodash";
import { CompleteShelf } from "./zod";

const prisma = new PrismaClient();
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
