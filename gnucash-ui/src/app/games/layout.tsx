"use client";
import { useState, useEffect } from "react";

export default function GamesLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="w-full flex flex-col justify-center align-center items-center">
      {isClient ?  children  : null as any}
    </div>
  );
}
