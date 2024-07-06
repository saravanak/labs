"use client";
import { clamp } from "@/utils/string";
import { trpc } from "@/utils/trpc";
import { useInViewport } from "ahooks";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import PropertyListItem from "../ui/lists/property-list-item";

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

  const todoFetchQuery = spaceId
    ? trpc.todo.getTodosForSpace.useInfiniteQuery
    : trpc.todo.getOwnTodos.useInfiniteQuery;

  const { fetchNextPage, data, error, hasNextPage } = todoFetchQuery(
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
      <>
        {todos.pages.map((todo, index) => {
          return (
            <Fragment key={index}>
              {todo.items.map((v: any, itemindex) => {
                return (
                  <PropertyListItem
                    key={itemindex}
                    propertyRenderer={() => {
                      return (
                        <div className="flex flex-col text-ellipsis overflow-hidden w-3/4">
                          <div className="font-bold">
                            #{v.id} {v.title}{" "}
                          </div>

                          <div>{clamp(v.description, 72)}</div>
                        </div>
                      );
                    }}
                    onClick={() => router.push(`/todos/${v.id}`)}
                    value={v.StatusTransitions[0].status}
                    asTag={true}
                    tagColor="bg-green-600 text-gray-200 font-bold text-xs whitespace-nowrap"
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
            className="mb-8"
          >
            Load more
          </Button>
        ) : null}
      </>
    );
  }

  return <>{components}</>;
}

