"use client";
import { trpc } from "@/utils/trpc";
import { useInViewport } from "ahooks";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";

export default function SpaceListing() {
  const ref = useRef(null);
  const [inView, threshold] = useInViewport(ref, {
    threshold: 1,
  });

  const { fetchNextPage, data, error, hasNextPage } =
    trpc.todoUser.getUserSpaces.useInfiniteQuery(
      {
        limit: 9,
      },
      {
        getNextPageParam: (lastPage: any) => {
          return lastPage.nextCursor;
        },
      }
    );
  console.log(data);

  useEffect(() => {
    if (inView) {
      console.log("Fetching next state from inview handler");

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
      <Card className="my-8">
        <CardTitle className="m-4">Spaces you own</CardTitle>
        <div className="w-[3/6] max-h-[80svh] overflow-hidden mx-2">
          <div className="w-full h-full  overflow-auto">
            <div className="">
              {todos.pages.map((todo, index) => {
                return (
                  <Fragment key={index}>
                    {todo.items.map((v: any, itemindex) => {
                      return (
                        <div
                          key={itemindex}
                          className="border-b border-gray-200 py-4"
                        >
                          <i>{v.name}</i> has {v._count.todos} Todos
                        </div>
                      );
                    })}
                  </Fragment>
                );
              })}
            </div>
            <div
              ref={ref}
              >
                &nbsp;
                </div>
          </div>
        </div>
      </Card>
    );
  }

  return <>{components}</>;
}

