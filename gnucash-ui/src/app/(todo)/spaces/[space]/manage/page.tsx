import ManageSpace from "@/components/todo/spaces/manage-space";
import { createServertRPCCaller } from "@/server/routers/_app";

export default async function ManageSpacePage({ params }: any) {
  if (!params) {
    return null;
  }

  const caller = await createServertRPCCaller();

  //TODO: REturn spaces, with isOwning so we can

  // 1) not show the manage varieties.
  // 2) show todo listing always
  const members = await caller.space.getMembers({
    spaceId: parseInt(params.space),
  });

  return <ManageSpace spaceWithUsers={members} />;
}

