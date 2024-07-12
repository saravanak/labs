'use client';
import { collapseNumbers } from '@/app/utils/utils-2048';
import { randomInt, max } from 'd3';
import { useCallback, useEffect, useState } from 'react';

const randomGenerator = randomInt(0, 16);

function initGame() {
  const _initialSequence = Array(16).fill(null);
  const firstPosition = randomGenerator();
  let secondPosition = randomGenerator();

  while (secondPosition == firstPosition) {
    secondPosition = randomGenerator();
  }
  _initialSequence[firstPosition] = 2;
  _initialSequence[secondPosition] = 2;
  return _initialSequence;
}

export default function Twenty48() {
  const [numbers, setNumbers] = useState<any>(initGame());

  const getNumbers = () => {
    return numbers;
  };

  const handleKeypress = useCallback(
    (e: any) => {
      console.log('I am the keypress');
      e.stopPropagation();
      e.preventDefault();

      const newMatrix = [...getNumbers()];

      //1 2 3 4
      let collapseTracks = [];
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          for (var i = 0; i < 4; i++) {
            const track = [12 + i, 8 + i, 4 + i, 0 + i];
            if (e.key == 'ArrowUp') {
              track.reverse();
            }
            collapseTracks.push(track);
          }
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          for (var i = 0; i < 4; i++) {
            const track = [0 + i * 4, 1 + i * 4, 2 + i * 4, 3 + i * 4];
            if (e.key == 'ArrowRight') {
              track.reverse();
            }
            collapseTracks.push(track);
          }
          break;
      }

      if (!collapseTracks.length) {
        return;
      }

      collapseTracks.forEach((track) => {
        const trackToCollapse = track.map((pos) => numbers[pos]);
        const collapsedTrack = collapseNumbers(trackToCollapse);

        track.forEach((v, i) => (newMatrix[v] = collapsedTrack[i]));
      });
      const emptySlots = newMatrix
        .map((v, i) => (v == null ? i : null))
        .filter((v: any) => v != null);
      const randomSlot = randomInt(0, emptySlots.length)();
      newMatrix[randomSlot] =
        2 *
        Math.pow(2, randomInt(0, Math.max(0, Math.log2(max(newMatrix)) - 2))());
      setNumbers([...newMatrix]);
    },
    [numbers, getNumbers]
  );

  useEffect(() => {
    console.log('Entering useeffect');
    document.addEventListener('keydown', handleKeypress);

    return () => {
      document.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <div className='flex flex-col'>
      <h2 className='text-red-400 font-bold w-full block p-4'>
        {' '}
        Bugs Beware!!
      </h2>
      <div>
        <div className='relative w-[480px] h-[480px]p-2'>
          {numbers.map((v: any, i: any) => {
            return (
              <div
                className={`absolute w-[120px] h-[120px] text-center leading-[120px] border  text-3xl cell-${v} border-8`}
                style={{
                  transform: `translate( ${120 * (i % 4)}px, ${
                    Math.floor(i / 4) * 120
                  }px)`,
                }}
                data-action-target={i}
                key={i}
              >
                {v} {/* :{i}  */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
