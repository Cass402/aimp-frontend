import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
  variant?: "default" | "elevated" | "modal";
}

const paddingMap: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  none: "",
  sm: "px-4 py-4 md:px-5",
  md: "px-6 py-6 md:px-7 md:py-7",
  lg: "px-8 py-8 md:px-10 md:py-10",
};

export function GlassCard({
  children,
  className,
  padding = "md",
  variant = "default",
}: GlassCardProps) {
  const variantClasses: Record<
    NonNullable<GlassCardProps["variant"]>,
    string
  > = {
    default: "glass-panel",
    elevated: "glass-panel glass-panel-elevated",
    modal: "glass-panel glass-panel-modal",
  };

  return (
    <div
      className={cn(
        variantClasses[variant],
        "relative overflow-hidden isolation-auto",
        paddingMap[padding],
        className
      )}
    >
      <div className="relative z-10 space-y-0">{children}</div>
    </div>
  );
}
