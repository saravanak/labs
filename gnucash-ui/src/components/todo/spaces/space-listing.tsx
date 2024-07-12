'use client';
import ListItem from '@/components/ui/lists/list-item';
import TwoLineListItem from '@/components/ui/lists/two-line-list-item';
import { trpc } from '@/utils/trpc';
import { useInViewport } from 'ahooks';
import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Button } from '../../ui/button';
import { useSession } from 'next-auth/react';

export default function SpaceListing({ mode }: any) {
  const ref = useRef(null);
  const [inView, threshold] = useInViewport(ref, {
    threshold: 1,
  });

  const { data: userSession }: any = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isSharing = mode == 'shared';
  const isDemoUser = userSession && userSession.user.isDemoUser;

  const pager = isSharing
    ? trpc.space.getSharedSpaces
    : trpc.space.getUserSpaces;

  const { fetchNextPage, data, error, hasNextPage } = pager.useInfiniteQuery(
    {
      limit: 9,
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

  let components = <></>;
  if (data) {
    const todos = data;

    if (todos?.pages?.length == 0) {
      return (
        <div>
          you have no todos
          <Button onClick={() => {}}>Click here to create some!</Button>{' '}
        </div>
      );
    }

    return (
      <div>
        {isSharing ? null : (
          <>
            <ListItem className=''>
              <Button
                variant='outline'
                size='list'
                data-test-action='create-space'
                disabled={isDemoUser}
                onClick={() => router.push(`${pathname}/create-space`)}
              >
                <div className='flex flex-col items-center align-middle py-2'>
                  <div className='flex grow'>
                    <Plus />
                    <div className='font-bold' data-retour-step='create-space'>
                      Create a new Space
                    </div>
                  </div>
                  <div
                    className='text-xs text-muted'
                    data-test-data='readonly-warning-create-space'
                  >
                    {isDemoUser &&
                      "You can't create a space while in the demo. Please sign"}
                  </div>
                </div>
              </Button>
            </ListItem>
          </>
        )}
        <div className='w-[3/6] max-h-full overflow-hidden'>
          <div className='w-full h-full overflow-auto'>
            {todos.pages.map((space, index) => {
              return (
                <div key={index}>
                  {space.items.map((v: any, itemindex) => {
                    return (
                      <div key={itemindex}>
                        <ListItem
                          drawBorder={true}
                          onClick={() => {
                            router.push(`${pathname}/${v.id}/manage`);
                          }}
                        >
                          <div className='flex flex-col p-2 text-[0.75em] rounded-md  bg-gray-200 w-[6em] '>
                            <div className='flex'>
                              {v.todosCount == 0 ? (
                                'Empty'
                              ) : (
                                <>{v.todosCount} Todos</>
                              )}
                            </div>
                            <div>
                              {v.sharedWithCount == 0 ? (
                                'Private'
                              ) : (
                                <>{v.sharedWithCount} Shares</>
                              )}{' '}
                            </div>
                          </div>
                          <TwoLineListItem
                            className='item-start grow'
                            firstLine={v.name}
                            secondLine={v.owner}
                          />

                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `${pathname}/${v.id}/manage/add-todo`
                              );
                            }}
                            data-test-action={`add-todo-${v.id}`}
                            variant='outline'
                            color='lightgray'
                            size='sm'
                          >
                            Add Todo
                          </Button>
                        </ListItem>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div ref={ref}>&nbsp;</div>
        </div>
      </div>
    );
  }

  return <>{components}</>;
}
