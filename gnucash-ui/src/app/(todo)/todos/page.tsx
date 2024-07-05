"use client";
import SpacesChooser from "@/components/todo/spaces-chooser";
import TodoListing from "@/components/todo/todo-listing";
import { useState } from "react";
import ListItem from "@/components/ui/lists/list-item";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToggle } from "@uidotdev/usehooks";

export default function TodosListingPage() {
  const [space, setSpace] = useState<any>(null);
  const [isFitlerViewEnabled, onFilterViewToggle] = useToggle(false);
  const spaceHeader = space ? `Todos in ${space.name}` : `All todos`;
  const spaceLabel = space ? `${space.name}` : `Select a space`;
  const spaceViewingLabel = space
    ? `Viewing todos in ${space.name}`
    : `Viewing all todos`;

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
        <div className="grow text-center"> {spaceHeader}</div>
        {space ? (
          <Button variant="outline" onClick={() => setSpace(null)}>
            <X />
          </Button>
        ) : null}
      </ListItem>

      {isFitlerViewEnabled ? (
        <ListItem className="justify-center">
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
      ) : (
        <SpacesChooser
          space={space}
          setSpace={setSpace}
          spaceLabel={spaceLabel}
          spaceViewingLabel={spaceViewingLabel}
        />
      )}

      <TodoListing space={space} statuses={statuses.filter(v => v.selected).map(v => v.value)}/>
    </>
  );
}

