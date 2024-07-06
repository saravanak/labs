import PagesIndexPage from "@/components/todo/spaces/spaces-index-page";
import { createServertRPCCaller } from "@/server/routers/_app";


//https://tanstack.com/query/v4/docs/framework/react/guides/ssr
export default async function SpacesPage() {
  const caller = await createServertRPCCaller();

  const counts = await caller.space.spaceCounts();

  return <PagesIndexPage {...counts} />;
}

