"use client";
import LinePlot from "@/components/d3/line-plot";
import Image from "next/image";

export default function D3Page() {
  return (
    <>
      <Image alt="" src="/game-shots/wip.jpg" width={300} height={200} />
      <div className="flex place-content-center w-full">
        <LinePlot data={[1, 4, 2, 4, 9, 2]} />
      </div>
    </>
  );
}

