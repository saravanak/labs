"use client";
import { trpc } from "@/utils/trpc";
import { useInViewport } from "ahooks";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { Button } from "../ui/button";

export default function TodoListing({
  space = {},
  statuses,
}: {
  space: any;
  statuses: any;
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

  if (error) {
    return <h1 data-test-data="not-logged-in"> Please login</h1>;
  }

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
      <>
        {todos.pages.map((todo, index) => {
          return (
            <Fragment key={index}>
              {todo.items.map((v: any, itemindex) => {
                return (
                  <div
                    key={itemindex}
                    className="border-b border-gray-600 py-4 px-2"
                    onClick={() => router.push(`/todos/${v.id}`)}
                  >
                    {v.title}
                    {v.desciption}
                    {index * 9 + itemindex + 1} {v.StatusTransitions[0].status}
                  </div>
                );
              })}
            </Fragment>
          );
        })}

        {hasNextPage ? (
          <Button
            ref={ref}
            onClick={() => {
              console.log("Calling nextpage");

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

