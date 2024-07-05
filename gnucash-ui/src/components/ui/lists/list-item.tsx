import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { FlexJustifySpread } from "../ui-hoc/flex-justify-spread";

const listVariants = cva("p-2 min-h-[4em]", {
  variants: {
    variant: {
      default: "",
      header:
        "font-bold justify-center border-b-2 border-gray-200 bg-card text-lg",
      heading2: "font-bold border-b-2 border-gray-200 bg-card text-lg",
    },

    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default function ListItem({
  children,
  className,
  drawBorder = false,
  onClick,
  variant,
  size,
  ...props
}: any) {
  return (
    <>
      <FlexJustifySpread
        {...props}
        className={cn(listVariants({ className, variant }))}
        onClick={onClick}
      >
        {children}
      </FlexJustifySpread>
      {drawBorder ? (
        <div className="border-b border-gray-200 border-b-[1px]" />
      ) : null}
    </>
  );
}

