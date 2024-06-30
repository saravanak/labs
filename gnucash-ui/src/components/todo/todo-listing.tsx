"use client";
import { trpc } from "@/utils/trpc";
import { useInViewport } from "ahooks";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function TodoListing() {
  const ref = useRef(null);
  const [inView, threshold] = useInViewport(ref, {
    threshold: 1,
  });

  const { fetchNextPage, data, error, hasNextPage } =
    trpc.todo.getOwnTodos.useInfiniteQuery(
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

  if (error) {
    return <h1 data-test-data="not-logged-in"> Please login</h1>;
  }

  const router = useRouter();
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
      <Card>
        <div className="w-[3/6] h-[80svh] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA4 bg-white">
          <div className="w-full h-full rounded overflow-scroll">
            <div className="py-[15px] px-5">
              <div className="text-violet11 text-[15px] leading-[18px] font-medium">
                Tags
              </div>

              {todos.pages.map((todo, index) => {
                return (
                  <Fragment key={index}>
                    {todo.items.map((v: any, itemindex) => {
                      return (
                        <div
                          key={itemindex}
                          className="border-b border-gray-600 py-4"
                        >
                          {v.StatusTransitions[0].status}
                        </div>
                      );
                    })}
                  </Fragment>
                );
              })}
            </div>
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
          </div>
        </div>
        {inView}
        {threshold}
      </Card>
    );
  }

  return <>{components}</>;
}

