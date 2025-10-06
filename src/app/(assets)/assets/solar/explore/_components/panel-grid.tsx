import { GlassCard } from "@/components/ui/glass-card";
import type { PanelGridResponse, PanelExplanation } from "@/lib/types";

interface PanelGridProps {
  grid: PanelGridResponse;
  focusedPanel?: string;
  explanation: PanelExplanation;
}

const statusStyles: Record<string, string> = {
  healthy:
    "border-(--glass-border-highlight) bg-[rgba(var(--color-teal-500-rgb),0.16)] text-(--prosperity-primary)",
  attention:
    "border-(--glass-border-strong) bg-[rgba(var(--color-orange-500-rgb),0.16)] text-(--caution-primary)",
  fault:
    "border-(--glass-border-strong) bg-[rgba(var(--color-red-400-rgb),0.18)] text-(--critical-primary)",
};

export function PanelGrid({ grid, focusedPanel, explanation }: PanelGridProps) {
  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="learning"
      trustLevel="medium"
      className="space-y-5"
    >
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
          Panel health grid
        </p>
        <h3 className="text-xl font-semibold text-(--text-primary)">
          Maintenance agent watches every string
        </h3>
      </header>
      <div className="grid grid-cols-6 gap-3 md:grid-cols-8">
        {grid.grid.map((panel) => (
          <span
            key={panel.id}
            className={`${statusStyles[panel.status] ?? "border-(--glass-border-soft) bg-(--glass-surface-primary) text-(--text-primary)"} flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-semibold shadow-[0_12px_22px_rgba(4,12,24,0.28)]`}
            aria-label={`${panel.id} ${panel.status}`}
          >
            {panel.id.split("-")[1]}
          </span>
        ))}
      </div>
      <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-4 text-sm text-(--text-secondary)">
        <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
          Focus {focusedPanel ?? "D17"}
        </p>
        <p className="mt-1 text-(--text-primary)">
          {explanation.status}: {explanation.cause}
        </p>
        <p className="mt-1 text-xs">Fix ETA {explanation.fixEta}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-[0.12em]">
          {explanation.constraints.map((constraint) => (
            <span
              key={constraint}
              className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-elevated) px-3 py-1 text-(--text-secondary)"
            >
              {constraint}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
