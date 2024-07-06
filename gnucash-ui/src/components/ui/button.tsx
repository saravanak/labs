import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        selected:
          "border border-input bg-primary text-primary-foreground hover:bg-primary/90 border-yellow-600 border-4",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        formAction: " text-center content-center ",
        ghost: "hover:bg-inherit",
        link: "text-primary underline-offset-4 hover:underline",
      },
      btnColor: {
        userAgree: "bg-green-600 text-secondary-foreground hover:bg-green/80",
        userCancel: "bg-gray-400 text-secondary-foreground hover:bg-gray/80",
        lightgray: "bg-gray-300 text-secondary-foreground hover:bg-gray/40",
        default: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-1 rounded-md px-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        list: "w-full grow rounded-none py-4",
        formAction: "h-full rounded-none basis-1/4  h-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      btnColor: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, btnColor, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, btnColor, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

