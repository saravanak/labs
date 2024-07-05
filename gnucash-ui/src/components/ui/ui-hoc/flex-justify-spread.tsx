import { cn } from "@/lib/utils";

export function FlexJustifySpread({ children, className, onClick }: any) {
  const defaultClassNames = "flex flex-1 items-center justify-between";
  return (
    <div
      className={cn(defaultClassNames, className)}
      onClick={onClick ? onClick : null}
    >
      {children}
    </div>
  );
}

