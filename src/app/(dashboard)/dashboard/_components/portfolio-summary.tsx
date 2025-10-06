import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";
import type { PortfolioSummary } from "@/lib/types";

interface PortfolioSummaryCardProps {
  summary: PortfolioSummary;
}

export function PortfolioSummaryCard({ summary }: PortfolioSummaryCardProps) {
  const apyPercentage = (summary.apy * 100).toFixed(1);

  return (
    <GlassCard padding="lg" className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)]"
        aria-hidden
      />
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <StatusPill tone="positive" label="Portfolio" detail="AI-managed" />
          <h2 className="text-2xl font-semibold text-(--text-primary)">
            Your solar position is earning {apyPercentage}% APY with guardrails
            active.
          </h2>
          <p className="max-w-xl text-sm text-(--text-secondary)">
            Holdings refresh every 500&nbsp;ms with oracle provenance and AI
            authority attestations. You can inspect receipts, override
            automation, and view persona explanations at any time.
          </p>
        </div>
        <div className="grid gap-3 text-right text-sm">
          <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
            <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary)">
              SOL Balance
            </p>
            <p className="mt-1 text-2xl font-semibold text-(--text-primary)">
              {summary.sol.toFixed(2)} SOL
            </p>
          </div>
          <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
            <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary)">
              SOLAR Units
            </p>
            <p className="mt-1 text-2xl font-semibold text-(--text-primary)">
              {summary.solar.units.toLocaleString()}
            </p>
            <p className="text-xs text-(--text-secondary)">
              ≈ $
              {summary.solar.valueUsd.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
