"use client";
import { useState, useEffect } from 'react'

import Puzzle15 from "@/components/games/puzzle-15"

export default function() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
      }, [])
 return <div className="w-full flex flex-col justify-center align-center items-center">{isClient ? <Puzzle15/>: null}</div>
}