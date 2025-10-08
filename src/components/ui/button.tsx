import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--trust-primary) focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "bg-(--trust-primary) text-white shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-(--critical-primary) text-white shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-(--trust-primary) bg-transparent text-(--trust-primary) hover:bg-(--trust-primary) hover:text-white hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-(--glass-surface-primary) text-(--text-primary) border border-(--glass-border-soft) hover:bg-(--glass-surface-elevated) hover:shadow-md hover:scale-[1.01] active:scale-[0.99]",
        ghost:
          "text-(--text-primary) hover:bg-(--glass-surface-primary) hover:scale-[1.01] active:scale-[0.99]",
        link: "text-(--trust-primary) underline-offset-4 hover:underline",
        neon: "bg-gradient-to-r from-(--teal-300) to-(--prosperity-energy) text-(--text-primary) shadow-[0_0_20px_rgba(var(--color-teal-300-rgb),0.5)] hover:shadow-[0_0_30px_rgba(var(--color-teal-300-rgb),0.7)] hover:scale-[1.02] active:scale-[0.98]",
        holographic:
          "bg-gradient-to-br from-(--intelligence-primary)/20 to-(--prosperity-energy)/20 border border-(--trust-primary)/30 text-(--text-primary) backdrop-blur-lg hover:border-(--trust-primary)/50 hover:shadow-[0_0_30px_rgba(var(--color-teal-500-rgb),0.3)] hover:scale-[1.02] active:scale-[0.98] holographic-border",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {children}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
