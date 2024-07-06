import { cn } from "@/lib/utils";

export default function TwoLineListItem({
  firstLine,
  secondLineGenerator,
  secondLine,
  model,
  className,
  ...props
}: any) {
  return (
    <div {...props} className={cn("p-2", className)}>
      <div>{firstLine}</div>
      <div className="align-right text-sm text-gray-400">
        {secondLineGenerator ? secondLineGenerator(model) : secondLine}
      </div>
    </div>
  );
}

