"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva("relative h-3 w-full overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: "bg-(--glass-surface-primary) border border-(--glass-border-soft)",
      trust: "bg-(--trust-primary)/10 border border-(--trust-primary)/20",
      prosperity:
        "bg-(--prosperity-primary)/10 border border-(--prosperity-primary)/20",
      intelligence:
        "bg-(--intelligence-primary)/10 border border-(--intelligence-primary)/20",
      critical: "bg-(--critical-primary)/10 border border-(--critical-primary)/20",
      neon: "bg-(--teal-500)/10 border border-(--teal-300)/30 shadow-[0_0_10px_rgba(var(--color-teal-300-rgb),0.2)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-(--trust-primary)",
        trust:
          "bg-gradient-to-r from-(--trust-primary) to-(--trust-secondary)",
        prosperity:
          "bg-gradient-to-r from-(--prosperity-primary) to-(--prosperity-energy)",
        intelligence:
          "bg-gradient-to-r from-(--intelligence-primary) to-(--intelligence-accent)",
        critical:
          "bg-gradient-to-r from-(--critical-primary) to-(--critical-secondary)",
        neon: "bg-gradient-to-r from-(--teal-300) to-(--prosperity-energy) shadow-[0_0_15px_rgba(var(--color-teal-300-rgb),0.5)]",
      },
      animated: {
        true: "relative overflow-hidden",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: true,
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorClassName?: string;
  showLabel?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      variant,
      indicatorClassName,
      showLabel,
      animated = true,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <div className="relative w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ variant }), className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              progressIndicatorVariants({ variant, animated }),
              indicatorClassName
            )}
            style={{
              transform: `translateX(-${mounted ? 100 - (value || 0) : 100}%)`,
            }}
          >
            {animated && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>
        {showLabel && (
          <div className="mt-1 text-xs text-(--text-secondary) text-right font-medium">
            {value}%
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
