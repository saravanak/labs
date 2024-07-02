"use client";
import ListItem from "@/components/ui/lists/list-item";
import { trpc } from "@/utils/trpc";
import { useInViewport } from "ahooks";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import SpaceCreateForm from "./space-create-form";

export default function SpaceListing() {
  const ref = useRef(null);
  const [inView, threshold] = useInViewport(ref, {
    threshold: 1,
  });
  
  const router = useRouter();
  const pathname = usePathname();
  const [showTodoForm, setShowTodoForm] = useState(false);

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

  useEffect(() => {
    if (inView) {
      console.log("Fetching next state from inview handler");

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
      <div>
        <ListItem>
          <div className="font-bold">Create a new Space</div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`${pathname}/create-space`)}
          >
            <Plus />
            Space
          </Button>
        </ListItem>        
        <div className="w-[3/6] max-h-full overflow-hidden">
          <div className="w-full h-full overflow-auto">
            <div className="">
              {todos.pages.map((space, index) => {
                return (
                  <div key={index}>
                    {space.items.map((v: any, itemindex) => {
                      return (
                        <ListItem key={itemindex}>
                          <div>{v.name}</div>
                          <div>{v._count.todos} Todos </div>
                          <div>{v._count.spaceSharing} Members </div>
                          <Button
                            onClick={() => setShowTodoForm(true)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus></Plus>Todo
                          </Button>
                          {/* <AddUserToSpace spaceId={v.id} />
                          {showTodoForm ? (
                            <TodoEditForm spaceId={v.id} />
                          ) : null} */}
                        </ListItem>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div ref={ref}>&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }

  return <>{components}</>;
}

