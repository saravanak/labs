import { trpc } from "@/utils/trpc";
import ListItem from "../ui/lists/list-item";
import HocSelect from "../ui/ui-hoc/hoc-select";
import LoaderListItem from "../ui/lists/loader-list";

export default function SpacesChooser({
  setSpace,
  space,
  spaceViewingLabel,
  spaceLabel,
}: any) {
  const {
    data: allSpaces,
    isLoading,
    isError,
  } = trpc.space.getAllSpaces.useQuery({
    limit: 100,
    cursor: undefined,
  });

  return (
    <>
      {isLoading ? <LoaderListItem /> : null}

      {allSpaces ? (
        <ListItem drawBorder={true}>
          <HocSelect
            selectLabelInline={spaceViewingLabel}
            placeholder={spaceLabel}
            value={space}
            dataTestPrefix="space-chooser"
            onValueChange={(chosenSpaceId: any) => {
              const foundSpace = allSpaces.items.find(
                (v) => v.id == chosenSpaceId
              );
              if (foundSpace) {
                setSpace(foundSpace);
              }
            }}
            options={allSpaces.items.map(({ id, name, count }: any) => ({
              value: id,
              label: `${name} (${count} todos)`,
            }))}
          />
        </ListItem>
      ) : null}
    </>
  );
}

