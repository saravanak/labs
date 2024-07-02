"use client";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/utils/trpc";
import { useInViewport } from "ahooks";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { Button } from "../../ui/button";
import { FlexJustifySpread } from "../../ui/ui-hoc/flex-justify-spread";

export default function SharedSpaceListing() {
  const ref = useRef(null);
  const [inView, threshold] = useInViewport(ref, {
    threshold: 1,
  });

  const { fetchNextPage, data, error, isLoading } =
    trpc.todoUser.getSharedSpaces.useInfiniteQuery(
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

    if (todos?.pages[0].items.length == 0) {
      return (
        <FlexJustifySpread>
          You have no todos
          <Button variant="outline" size="sm" onClick={() => {}}><Plus/> Space </Button>
        </FlexJustifySpread>
      );
    }

    return (
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
        <div ref={ref}>&nbsp;</div>
      </div>
    );
  }
  if (isLoading) {
    return <Progress data-state="indeterminate" />;
  }

  return <>{components}</>;
}

