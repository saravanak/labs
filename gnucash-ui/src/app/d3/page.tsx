"use client";
import Tessellation from "@/components/geo-patterns/tessallation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function D3Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient])

  return (
    <>
      {isClient ? (
        <>
           <Tessellation />
        </>
      ) : null}
    </>
  );
}

