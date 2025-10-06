import { GlassCard } from "@/components/ui/glass-card";
import { getSolarAssetSummary } from "@/lib/data";

import { InvestForm } from "./_components/invest-form";

export const revalidate = 120;

export default async function InvestPage() {
  const summary = await getSolarAssetSummary();

  return (
    <div className="space-y-10 pb-16">
      <GlassCard
        padding="lg"
        variant="prosperity"
        trustLevel="high"
        aiState="optimizing"
        className="space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Market overview
        </p>
        <div className="flex flex-wrap items-baseline gap-4 text-(--text-primary)">
          <h1 className="text-3xl font-semibold">Invest in {summary.name}</h1>
          <span className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-2 text-xs uppercase tracking-[0.32em] text-(--text-secondary)">
            {summary.location}
          </span>
        </div>
        <div className="grid gap-4 text-sm text-(--text-secondary) sm:grid-cols-3">
          <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
              Token price
            </p>
            <p className="text-xl font-semibold text-(--text-primary)">
              ${summary.tokenPrice.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
              ROI
            </p>
            <p className="text-xl font-semibold text-(--prosperity-primary)">
              {(summary.roi * 100).toFixed(1)}%
            </p>
          </div>
          <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
              Guardrails
            </p>
            <p className="text-(--text-secondary)">
              Max tx $1,000 • Daily $5,000 • Proof hash + PDA decode
            </p>
          </div>
        </div>
      </GlassCard>
      <InvestForm tokenPrice={summary.tokenPrice} />
    </div>
  );
}
