import { prisma } from "@/lib/prisma/client";
export async function GET() {
  const rackCount = await prisma.rack.count({
    where: {
      name: {
        startsWith: "k",
      },
    },
  });
  return Response.json({ data: rackCount });
}
