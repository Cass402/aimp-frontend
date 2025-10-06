import { GlassCard } from "@/components/ui/glass-card";
import type { SolarAssetSummary } from "@/lib/types";

interface AssetHeaderProps {
  summary: SolarAssetSummary;
}

export function AssetHeader({ summary }: AssetHeaderProps) {
  return (
    <GlassCard padding="lg" className="space-y-6">
      <div className="flex flex-wrap items-baseline gap-3 text-(--text-primary)">
        <h1 className="text-3xl font-semibold">{summary.name}</h1>
        <span className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-2 text-xs uppercase tracking-[0.3em] text-(--text-secondary)">
          {summary.location}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-5 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
            Token price
          </p>
          <p className="text-2xl font-semibold text-(--text-primary)">
            ${summary.tokenPrice.toFixed(2)}
          </p>
        </div>
        <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-5 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
            ROI
          </p>
          <p className="text-2xl font-semibold text-(--prosperity-primary)">
            {(summary.roi * 100).toFixed(1)}%
          </p>
        </div>
        <div className="rounded-3xl border border-(--prosperity-primary) bg-[rgba(var(--color-teal-500-rgb),0.12)] px-5 py-4 text-sm text-(--prosperity-primary)">
          Constraints active: Max dispatch 2MW, SOC cap 80%, Oracle deviation
          3.5σ.
        </div>
      </div>
    </GlassCard>
  );
}
