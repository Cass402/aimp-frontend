import { GlassCard } from "@/components/ui/glass-card";
import type { UpcomingActionsResponse } from "@/lib/types";

interface PlannedActionsProps {
  upcoming: UpcomingActionsResponse;
}

export function PlannedActions({ upcoming }: PlannedActionsProps) {
  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="processing"
      trustLevel="medium"
      className="space-y-4"
    >
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
          Planned actions
        </p>
        <h3 className="text-xl font-semibold text-(--text-primary)">
          What the AI will do next
        </h3>
      </header>
      <ul className="space-y-3 text-sm text-(--text-secondary)">
        {upcoming.actions.map((action) => (
          <li
            key={action.title}
            className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-4"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
                {new Date(action.startAt).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-base font-semibold text-(--text-primary)">
                {action.title}
              </span>
              <span>{action.reason}</span>
              <div className="flex flex-wrap gap-2 pt-2 text-[0.7rem] uppercase tracking-[0.12em]">
                {action.constraints.map((constraint) => (
                  <span
                    key={constraint}
                    className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-3 py-1 text-(--text-secondary)"
                  >
                    {constraint}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
