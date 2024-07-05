import { SpaceService } from "@/server/services/space";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

import { User } from "@prisma/client";
import ManageSpace from "@/components/todo/spaces/manage-space";

export default async function ManageSpacePage({ params }: any) {
  if (!params) {
    return null;
  }

  const session = await getServerSession(authOptions);

  if (session) {
    const spaceWithUsers = (await SpaceService.getMembers(
      session?.user as User,
      parseInt(params.space)
    )) as any;

    return <ManageSpace spaceWithUsers={spaceWithUsers} />;
  } else {
    return null;
  }
}

