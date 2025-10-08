import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-2xl border backdrop-blur-xl transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-(--glass-surface-primary) border-(--glass-border-soft) hover:shadow-(--shadow-neural-strong) hover:-translate-y-0.5",
        elevated:
          "bg-(--glass-surface-elevated) border-(--glass-border-strong) shadow-(--shadow-neural-strong) hover:shadow-xl hover:-translate-y-1",
        neural:
          "bg-gradient-to-br from-(--intelligence-primary)/10 to-(--intelligence-secondary)/5 border-(--intelligence-accent)/20 shadow-(--glow-neural-primary) hover:shadow-(--glow-neural-primary) hover:-translate-y-0.5",
        trust:
          "bg-gradient-to-br from-(--trust-primary)/8 to-(--trust-secondary)/4 border-(--trust-primary)/25 shadow-(--glow-trust-primary) hover:shadow-(--glow-trust-primary) hover:-translate-y-0.5",
        prosperity:
          "bg-gradient-to-br from-(--prosperity-primary)/8 to-(--prosperity-energy)/4 border-(--prosperity-primary)/25 shadow-(--glow-prosperity-primary) hover:shadow-(--glow-prosperity-primary) hover:-translate-y-0.5",
        neon: "bg-(--glass-surface-primary) border-(--teal-300)/40 shadow-[0_0_30px_rgba(var(--color-teal-300-rgb),0.2)] hover:shadow-[0_0_45px_rgba(var(--color-teal-300-rgb),0.3)] hover:-translate-y-1",
        holographic:
          "glass-panel-ultra holographic-border hover:-translate-y-1",
        liquid: "liquid-glass border-(--trust-primary)/20 hover:-translate-y-0.5",
      },
      effect: {
        none: "",
        scan: "scan-lines",
        glow: "pulsing-glow",
      },
    },
    defaultVariants: {
      variant: "default",
      effect: "none",
    },
  }
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, effect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, effect }), className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-none tracking-tight text-(--text-primary)",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-(--text-secondary)", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-4 border-t border-(--glass-border-soft)", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
