import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 border",
  {
    variants: {
      variant: {
        default:
          "border-(--trust-primary)/30 bg-(--trust-primary)/10 text-(--trust-primary) hover:bg-(--trust-primary)/20",
        secondary:
          "border-(--glass-border-soft) bg-(--glass-surface-primary) text-(--text-secondary) hover:bg-(--glass-surface-elevated)",
        destructive:
          "border-(--critical-primary)/30 bg-(--critical-background) text-(--critical-primary) hover:bg-(--critical-primary)/15",
        success:
          "border-(--prosperity-primary)/30 bg-(--prosperity-primary)/10 text-(--prosperity-primary) hover:bg-(--prosperity-primary)/20",
        warning:
          "border-(--caution-primary)/30 bg-(--caution-background) text-(--caution-primary) hover:bg-(--caution-primary)/15",
        outline:
          "border-(--trust-primary) text-(--trust-primary) hover:bg-(--trust-primary)/10",
        neon: "border-(--teal-300)/50 bg-(--teal-300)/10 text-(--teal-300) shadow-[0_0_10px_rgba(var(--color-teal-300-rgb),0.3)] hover:shadow-[0_0_15px_rgba(var(--color-teal-300-rgb),0.5)] neon-text",
        holographic:
          "border-(--trust-primary)/40 bg-gradient-to-r from-(--intelligence-primary)/15 to-(--prosperity-energy)/15 text-(--text-primary) backdrop-blur-sm hover:from-(--intelligence-primary)/25 hover:to-(--prosperity-energy)/25 holographic-border",
      },
      size: {
        default: "h-6 px-3 text-xs",
        sm: "h-5 px-2 text-[10px]",
        lg: "h-7 px-4 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        glow: "pulsing-glow",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  dot?: boolean;
}

function Badge({
  className,
  variant,
  size,
  animation,
  icon,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, animation }), className)}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
        </span>
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
