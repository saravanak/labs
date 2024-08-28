'use client';

import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { schemes } from '../geo-patterns/palette-context-provider';
import { useEffect, useState } from 'react';
import { last, random } from 'lodash';
import { useToggle } from '@uidotdev/usehooks';

export default function ShowPaintLog() {
  const queryClient = useQueryClient();

  const [viewImage, setViewImage] = useToggle(true);

  const { data: intervalData, isLoading: isLoadingIntervalData } = useQuery({
    queryFn: async () => {
      const response = await fetch('/api/bland/paints?mode=date-intervals');

      return response.json();
    },
    queryKey: [['paint-date-intervals']],
  });
  const { data, isLoading, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery({
      queryFn: async ({ queryKey, pageParam = 0 }) => {
        const response = await fetch(
          `/api/bland/paints?mode=rows&limit=100&cursor=${pageParam}`
        );

        return response.json();
      },

      queryKey: [['paint-logs', intervalData]],
      getNextPageParam: (lastPage: any[], allPages: any[]) => {
        if (lastPage.length > 0) {
          return last(lastPage).id;
        }
        return undefined;
      },
    });

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage]);

  return (
    <>
      {intervalData && JSON.stringify(intervalData, null, 2)}
      {isLoading && 'We are loading'}
      {!viewImage && <form
        encType='multipart/form-data'
        action='http://localhost:7070/upload'
        method='post'
      >
        <input type='file' name='myFile' />
        <input type='submit' value='upload' />
      </form>}
      {viewImage && data && (
        <div className='grid grid-cols-100 w-[100px]'>
          {data?.pages.map((page, pageIndex) => {
            return page.map((v: any, i: any) => {
              return (
                <div
                  className='w-[10px] h-[10px] aspect-square '
                  key={i}
                  style={{
                    backgroundColor: schemes[0][v.color],
                    // animation: `myAnim ${random(
                    //   0,
                    //   5
                    // )}s ease 0s 1 normal forwards`,
                    gridColumnStart: v.x,
                    gridRowStart: v.y,
                  }}
                >
                  {' '}
                  &nbsp;
                </div>
              );
            });
          })}
        </div>
      )}
    </>
  );
}
