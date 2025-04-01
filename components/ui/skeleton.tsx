import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

const skeletonButtonVariants = cva(
  "animate-pulse rounded-md bg-accent",
  {
    variants: {
      variant: {
        default: "bg-primary/40",
        destructive: "bg-destructive/40",
        outline: "bg-gray-300 dark:bg-gray-700",
        secondary: "bg-secondary/40",
        ghost: "bg-gray-200 dark:bg-gray-600",
        link: "bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Skeleton Button Component
function SkeletonButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonButtonVariants>) {
  return (
    <div
      data-slot="skeleton-button"
      className={cn(skeletonButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Skeleton, SkeletonButton };
