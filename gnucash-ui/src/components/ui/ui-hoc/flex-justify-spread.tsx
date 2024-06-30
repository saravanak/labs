import { cn } from "@/lib/utils";

export function FlexJustifySpread({ children, className }: any) {
  const defaultClassNames = "flex justify-between";
  return <div className={cn(defaultClassNames, className)}>{children}</div>;
}
