"use client";
import SpacesChooser from "@/components/todo/spaces-chooser";
import TodoListing from "@/components/todo/todo-listing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListItem from "@/components/ui/lists/list-item";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce, useToggle } from "@uidotdev/usehooks";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

export default function TodosListingPage() {
  const [isFitlerViewEnabled, onFilterViewToggle] = useToggle(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchTextInput = useRef<any>(null);

  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState<any>(null);
  const debouncedSearchTerm = useDebounce(searchText, 300);

  const space = useMemo(() => {
    const queryParams = new URLSearchParams(searchParams.toString());

    const spaceNames = queryClient.getQueryData([["space", "getAllSpaces"]], {
      exact: false,
    }) as any;

    if (!spaceNames?.items) {
      return null;
    }

    return spaceNames.items.find((v: any) => v.id == queryParams.get("space"));
  }, [searchParams]);

  const spaceHeader = space ? `Todos in ${space.name}` : `All todos`;
  const spaceLabel = space ? `${space.name}` : `Select a space`;
  const spaceViewingLabel = space
    ? `Viewing todos in ${space.name}`
    : `Viewing all todos`;

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  const [statuses, setStatuses] = useState([
    {
      label: "Todo",
      value: "todo",
      selected: true,
    },
    {
      label: "In-Progress",
      value: "in-progress",
      selected: true,
    },
    {
      label: "Done",
      value: "done",
      selected: true,
    },
  ]);

  const toggleState = function (value: any) {
    const newState = statuses.map((v) => {
      if (v.value == value) {
        return {
          ...v,
          selected: !v.selected,
        };
      } else {
        return v;
      }
    });

    setStatuses([...newState]);
  };

  return (
    <>
      <ListItem variant="header" className="sticky top-0" drawBorder={true}>
        <Button variant="outline" onClick={() => onFilterViewToggle()}>
          <Filter />
        </Button>
        <div className="grow text-center">
          <span className="text-xl text-muted underline mr-2">
            {isFitlerViewEnabled ? "Filtering" : ""}{" "}
          </span>
          {spaceHeader}
        </div>
        {space ? (
          <Button
            variant="outline"
            onClick={() =>
              router.push(pathname + "?" + createQueryString("space", null))
            }
          >
            All Spaces
          </Button>
        ) : null}
      </ListItem>

      {isFitlerViewEnabled ? (
        <div className="sticky top-[70px] bg-card border-2 border-border">
          <ListItem className="justify-spread" drawBorder={true}>
            <div className="font-bold"> By Status</div>
            <ListItem className="justify-end">
              {statuses.map(({ value, label, selected }: any) => {
                return (
                  <Button
                    key={value}
                    variant={`${selected ? "selected" : "outline"}` as any}
                    className="mr-2"
                    onClick={() => toggleState(value)}
                  >
                    {label}
                  </Button>
                );
              })}
            </ListItem>
          </ListItem>
          <ListItem className="justify-spread" drawBorder={true}>
            <div className="font-bold grow"> Title/Description</div>
            <div className="flex w-1/2">
              <Input
                type="text"
                ref={searchTextInput}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.trim())}
                className=""
              />
            </div>
          </ListItem>
        </div>
      ) : (
        <SpacesChooser
          space={space}
          setSpace={(v: any) => {
            router.push(pathname + "?" + createQueryString("space", v.id));
          }}
          spaceLabel={spaceLabel}
          spaceViewingLabel={spaceViewingLabel}
        />
      )}

      <TodoListing
        space={space}
        statuses={statuses.filter((v) => v.selected).map((v) => v.value)}
        searchText={debouncedSearchTerm}
      />
    </>
  );
}

