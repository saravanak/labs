import { cn } from "@/lib/utils";

export function FlexJustifySpread({ children, className, onClick, ...props }: any) {
  const defaultClassNames = "flex flex-1 items-center justify-between";
  return (
    <div
      className={cn(defaultClassNames, className)}
      onClick={onClick ? onClick : null}
      {...props}
    >
      {children}
    </div>
  );
}

