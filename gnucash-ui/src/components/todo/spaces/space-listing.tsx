"use client";
import ListItem from "@/components/ui/lists/list-item";
import TwoLineListItem from "@/components/ui/lists/two-line-list-item";
import { trpc } from "@/utils/trpc";
import { useInViewport } from "ahooks";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "../../ui/button";

export default function SpaceListing({ mode }: any) {
  const ref = useRef(null);
  const [inView, threshold] = useInViewport(ref, {
    threshold: 1,
  });

  const router = useRouter();
  const pathname = usePathname();

  const isSharing = mode == "shared";

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
          <Button onClick={() => {}}>Click here to create some!</Button>{" "}
        </div>
      );
    }

    return (
      <div>
        {isSharing ? null : (
          <ListItem className="">
            <Button
              variant="outline"
              size="list"
              onClick={() => router.push(`${pathname}/create-space`)}
            >
              <Plus />
              <div className="font-bold" data-retour-step="create-space">
                Create a new Space
              </div>
            </Button>
          </ListItem>
        )}
        <div className="w-[3/6] max-h-full overflow-hidden">
          <div className="w-full h-full overflow-auto">
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
                          <div className="flex flex-col p-2 text-[0.75em] rounded-md  bg-gray-200 w-[6em] ">
                            <div className="flex">
                              {v._count.todos == 0 ? (
                                "Empty"
                              ) : (
                                <>{v._count.todos} Todos</>
                              )}
                            </div>
                            <div>
                              {v._count.spaceSharing == 0 ? (
                                "Private"
                              ) : (
                                <>{v._count.spaceSharing} Shares</>
                              )}{" "}
                            </div>
                          </div>
                          <TwoLineListItem
                            className="item-start grow"
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
                            variant="outline"
                            color="lightgray"
                            size="sm"
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

