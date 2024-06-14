"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function RTPageComponent() {
  const [searchFor, setSearchFor] = useState("");


  const [count, racks] = trpc.useQueries((t) => [
    t.rack.count({ s: searchFor }, { enabled: false }),
    t.rack.list(),
  ]);

  const result = trpc.rack.count.useQuery({
    s: searchFor,
  });

  if (count?.isLoading) {
    return <p>Loading</p>;
  }

  function handleChange(e) {
    setSearchFor(e.target.value);
  }

  return (
    <h1>
      {result?.data?.count}



      <input type="text" value={searchFor} onChange={(e) => handleChange(e)} />
      {JSON.stringify(racks)}
    </h1>
  );
}

