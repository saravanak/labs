"use client";
import ListBags from "@/components/rt/list-bags";
import { trpc } from "@/utils/trpc";

export default function ShelfsBagListingPage({ params }: any) {
  const [luggageResult] = trpc.useQueries((t) => [
    t.luggage.list({ shelfId: parseInt(params.shelf) }),
  ]);

  return (
    <h1>
      There are {luggageResult.data?.luggages.length}
      <ListBags bags={luggageResult} />
    </h1>
  );
}
