import PagesIndexPage from "@/components/todo/spaces/spaces-index-page";
import { authOptions } from "@/lib/auth-options";
import { SpaceService } from "@/server/services/space";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function SpacesPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    const counts = await SpaceService.getSpaceCounts(session?.user as User);
    return <PagesIndexPage {...counts} />;
  } else {
    return null;
  }
}

