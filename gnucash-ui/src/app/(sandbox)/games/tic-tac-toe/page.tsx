'use client';
import { useEffect, useState } from 'react';
import Game from '@/components/games/tic-tac-toe/game';

export default function Home() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {isClient ? <Game /> : null}
    </main>
  );
}
