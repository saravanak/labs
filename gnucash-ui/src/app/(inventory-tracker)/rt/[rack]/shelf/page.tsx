"use client";
import ListShelves from "@/components/rt/list-shelves";
import { trpc } from "@/utils/trpc";

export default function ShelfListingPage({ params }:any) {
    
  const [shelvesResult] = trpc.useQueries((t) => [
    t.shelf.list({ rackId: parseInt(params.rack) }),    
  ]);

  return <h1>There are {shelvesResult.data?.shelves.length}

        <ListShelves shelves={shelvesResult} />
  </h1>

}