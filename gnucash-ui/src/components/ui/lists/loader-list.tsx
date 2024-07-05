import { Skeleton } from "../skeleton";

export default function LoaderListItem() {
  return (
    <div>
      <Skeleton className="h-[125px]  rounded-xl p-2 m-2"> &nbsp;</Skeleton>
      <div className="space-y-2 p-2">
        <Skeleton className="h-4 "> &nbsp;</Skeleton>
        <Skeleton className="h-4 ">&nbsp;</Skeleton>
      </div>
    </div>
  );
}
