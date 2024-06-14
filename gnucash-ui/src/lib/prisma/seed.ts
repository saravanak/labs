import { PrismaClient } from '@prisma/client'
import getLuggages from './data'
const prisma = new PrismaClient()
async function main() {
  const rLoftKE = await prisma.rack.upsert({
    where: { shortName: 'L-KE' },
    update: {},
    create: {
      name: 'kitchen east facing' ,
      type: 'loft',
      comment: "A sample comment",
      shortName: 'L-KE'
      
    },
  })
  const  shelfKEPartA = await prisma.shelf.upsert({
    where: { shortName: 'A' },
    update: {},
    create: {
      shelfId: rLoftKE.id,
      shortName: 'A',
      comment: "A sample comment",      
      
    },
  })

  await prisma.luggage.createMany({data:getLuggages(shelfKEPartA)})
  console.log({ rLoftKE, shelfKEPartA })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })