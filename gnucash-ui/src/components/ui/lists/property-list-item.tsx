import { cn } from "@/lib/utils";
import ListItem from "./list-item";
import { Case } from "change-case-all";

export default function PropertyListItem({
  property,
  value,
  asTag,
  tagColor,
  ...props
}: any) {
  return (
    <ListItem {...props} drawBorder={true}>
      <div className="font-bold mr-8">{Case.title(property)}</div>
      <div
        className={cn(
          "align-right px-4 py-2 rounded-md mx-2",
          asTag ? `${tagColor}` : ""
        )}
      >
        {value}
      </div>
    </ListItem>
  );
}

