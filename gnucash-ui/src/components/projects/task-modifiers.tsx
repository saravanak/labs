'use client';
import { Button } from '@/components/ui/button';
import queryClient from '@/utils/query-client';
import {
  UseQueryResult,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCounter, useList, useToggle } from '@uidotdev/usehooks';
import { useEffect } from 'react';

export default function TaskPrimitivesComponent({ scheduler }: any) {
  const queryClient = useQueryClient();

  const [isRunning, toggleTicker] = useToggle();
  const [playerPosition, { increment, set }] = useCounter();
  const [tasks, { push, set: setArray, clear }] = useList([
    {
      tick: 0,
    },
  ]);

  const width = '100px';
  const height = '25px';

  const userQueries = useQueries({
    queries: scheduler(tasks).map((task: any) => {

      return {
        queryFn: ({ signal }: any) => {
            return new Promise((resolve, reject) => {
              const timeoutId = setTimeout(() => resolve(true), 1000);
              signal?.addEventListener('abort', () => {
                console.log('Cancelling the query');
                clearTimeout(timeoutId);
                reject(new Error("asdasd"));
              });
            });
        },
        queryKey: [task],
      };
    }),
  });

  useEffect(() => {
    let setIntervalId = null;
    if (isRunning) {
      setIntervalId = setInterval(() => {
        increment();
      }, 10);
    }

    return () => {
      setIntervalId && clearInterval(setIntervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    if (playerPosition > 800) {
      set(1);
    }
  }, [playerPosition]);

  function addQueryTask() {
    push({
      tick: playerPosition,
    });
  }

  return (
    <div>
      <div className='flex jsutify-around gap-2'>
        <Button key='start' onClick={() => toggleTicker()}>
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button key='clear' onClick={() => clear()}>
          {' '}
          ClearAll
        </Button>
        <Button key='push' onClick={() => addQueryTask()}>
          {' '}
          Push task
        </Button>
      </div>
      <div
        className='relative'
        style={{ height: '200px', width: '800px', border: '1px solid blue' }}
      >
        {tasks.map(({ tick }, i): any => {
          const status = queryClient.getQueryState([{ tick }])?.status;
          return (
            <div
              style={{
                left: `${tick}px`,
                width,
                backgroundColor: 'gray',
                height,
                position: 'relative',
              }}
              key={`${tick}-${status}`}
            >
              {status}
            </div>
          );
        })}
        <div
          className='absolute top-0 h-full border-l-2 border-red-300 bg-white'
          key='player'
          style={{
            left: `${playerPosition}px`,
            width: `${800 - playerPosition - 10}px`,
          }}
        >
          &nbsp;
        </div>
      </div>
    </div>
  );
}
