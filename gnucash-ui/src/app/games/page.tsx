"use client";
import { useState, useEffect } from 'react'

import Puzzle15 from "@/components/games/puzzle-15"

export default function() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
      }, [])
 return <>{isClient ? <Puzzle15/>: null}</>
}