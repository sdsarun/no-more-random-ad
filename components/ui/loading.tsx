import React from "react";
import { Loader2, type LucideProps } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type LoadingProps = React.ComponentProps<"div"> & {
  icon?: React.ComponentType<LucideProps>;
  iconProps?: LucideProps;
  loadingText?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
};

const loadingVariants = cva(
  "flex justify-center items-center gap-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      variant: {
        default: "text-gray-400",
        primary: "text-gray-400",
        secondary: "text-gray-400",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const iconSizeMap: Record<NonNullable<LoadingProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

function Loading({
  className,
  icon: IconCustom,
  iconProps,
  loadingText = "Loading...",
  size = "md",
  variant,
  ...props
}: LoadingProps) {
  const IconComponent = IconCustom ?? Loader2;

  return (
    <div
      className={cn(loadingVariants({ size, variant }), className)}
      {...props}
    >
      <IconComponent 
        {...iconProps}
        size={iconProps?.size ?? iconSizeMap[size]} 
        className={cn("animate-spin", iconProps?.className)}
      />
      <span className={loadingVariants({ size })}>{loadingText}</span>
    </div>
  );
}

export { Loading };
