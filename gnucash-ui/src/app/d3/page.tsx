"use client";
import LinePlot from "@/components/d3/line-plot";
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
          <Image alt="" src="/game-shots/wip.jpg" width={300} height={200} />
           <LinePlot data={[1, 4, 2, 4, 9, 2]} />
        </>
      ) : null}
    </>
  );
}

