"use client";
import Tessellation from "@/components/geo-patterns/tessallation";
import SpinnerPage from "@/components/spinners/spinner-page";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function D3Page() {
  const [isClient, setIsClient] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  const isTesellation = searchParams.get("art") == "tessellation";
  const isSpinners = searchParams.get("art") == "spinners";

  return isClient ? (
    <>
      {isTesellation && <Tessellation />}
      {isSpinners && <SpinnerPage />}
    </>
  ) : null;
}

