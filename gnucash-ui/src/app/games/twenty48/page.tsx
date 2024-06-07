"use client";
import dynamic from 'next/dynamic'

const Twenty48 = dynamic(() => import("@/components/d3/twenty48"), { ssr: false })

export default function D3Page() {
  return <div className="flex place-content-center w-full" ><Twenty48/></div>
}
