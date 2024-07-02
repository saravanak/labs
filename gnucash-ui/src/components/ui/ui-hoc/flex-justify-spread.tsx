import { cn } from "@/lib/utils";

export function FlexJustifySpread({ children, className }: any) {
  const defaultClassNames = "flex flex-1 items-center justify-between";
  return <div className={cn(defaultClassNames, className)}>{children}</div>;
}

