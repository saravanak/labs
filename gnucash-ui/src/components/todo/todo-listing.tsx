'use client';
import { clamp } from '@/utils/string';
import { trpc } from '@/utils/trpc';
import { useInViewport } from 'ahooks';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import PropertyListItem from '../ui/lists/property-list-item';
import LoaderListItem from '../ui/lists/loader-list';
import { Case } from 'change-case-all';

export default function TodoListing({
  space = {},
  statuses,
  searchText,
}: {
  space: any;
  statuses: any;
  searchText: any;
}) {
  const { id: spaceId, name: spaceName } = space || {};
  const router = useRouter();

  const ref = useRef(null);
  const [inView, threshold] = useInViewport(ref, {
    threshold: 1,
  });

  const { fetchNextPage, data, error, hasNextPage, isLoading } =
    trpc.todo.getOwnTodos.useInfiniteQuery(
      {
        limit: 9,
        spaceId: spaceId ? spaceId : null,
        statuses,
        searchText,
      },
      {
        getNextPageParam: (lastPage: any) => {
          return lastPage.nextCursor;
        },
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return Array(5)
      .fill(0)
      .map((v, i) => <LoaderListItem key={i} />);
  }

  let components = <></>;
  if (data) {
    const todos = data;

    if (todos?.pages?.length == 0) {
      return (
        <div>
          you have no todos
          <Button onClick={() => {}}>Click here to create some!</Button>
        </div>
      );
    }

    return (
      <div data-test-data='todo-listing'>
        {todos.pages.map((todo: any, index: any) => {
          return (
            <Fragment key={index}>
              {todo.items.map((v: any, itemindex: any) => {
                return (
                  <PropertyListItem
                    key={itemindex}
                    propertyRenderer={() => {
                      return (
                        <div className='flex flex-col text-ellipsis overflow-hidden w-3/4'>
                          <div
                            className='font-bold'
                            data-test-data={`todo-row-${Case.kebab(v.title)}`}
                          >
                            #{v.id} {v.title}
                          </div>

                          <div
                            data-test-data={`todo-desc-${Case.kebab(v.title)}`}
                          >
                            {clamp(v.description, 72)}
                          </div>
                        </div>
                      );
                    }}
                    onClick={() => router.push(`/todos/${v.id}`)}
                    value={v.status}
                    asTag={true}
                    tagColor='bg-green-600 text-gray-200 font-bold text-xs whitespace-nowrap'
                  />
                );
              })}
            </Fragment>
          );
        })}

        {hasNextPage ? (
          <Button
            ref={ref}
            onClick={() => {
              fetchNextPage();
            }}
            className='mb-8'
          >
            Load more
          </Button>
        ) : null}
      </div>
    );
  }

  return <>{components}</>;
}
