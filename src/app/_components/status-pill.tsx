import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  tone?: "positive" | "caution" | "critical" | "info" | "neutral";
  label: string;
  detail?: string;
  icon?: ReactNode;
}

const toneStyles: Record<NonNullable<StatusPillProps["tone"]>, string> = {
  positive: "status--success",
  caution: "status--warning",
  critical: "status--error",
  info: "status--info",
  neutral:
    "border border-(--glass-border-soft) bg-(--glass-surface-primary) text-(--text-secondary)",
};

export function StatusPill({
  label,
  detail,
  tone = "neutral",
  icon,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "status",
        "gap-2 uppercase tracking-[0.18em] text-[0.65rem]",
        toneStyles[tone]
      )}
    >
      {icon ? (
        <span className="text-xs" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="font-semibold text-current">{label}</span>
      {detail ? (
        <span className="font-medium text-(--text-secondary)">{detail}</span>
      ) : null}
    </span>
  );
}
