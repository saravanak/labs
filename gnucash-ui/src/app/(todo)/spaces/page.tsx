import PagesIndexPage from "@/components/todo/spaces/spaces-index-page";
import { SpaceService } from "@/server/services/space";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
// import { createServertRPCCaller } from "@/server/routers/_app";


export default async function SpacesPage() {

  const session = await getServerSession(authOptions);
  if(session) {
    const counts = await SpaceService.getSpaceCounts(session?.user as User)
    return <PagesIndexPage {...counts} />;
  } else {
    return null;
  }

  

}

