import { GlassCard } from "@/components/ui/glass-card";
import type { BatterySummary, EnergySummary, SalesSummary } from "@/lib/types";

function buildSparkline(values: number[]) {
  if (!values.length) {
    return "";
  }

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1 || 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

interface EnergyCardsProps {
  energy: EnergySummary;
  sales: SalesSummary;
  batteries: BatterySummary;
}

export function EnergyCards({ energy, sales, batteries }: EnergyCardsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <GlassCard padding="lg" className="space-y-4">
        <header className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-tertiary)">
            Energy production
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            {energy.mw.toFixed(1)} MW live
          </h3>
        </header>
        <p className="text-sm text-(--text-secondary)">
          Capacity utilisation {Math.round(energy.capacityPct * 100)}% with
          telemetry freshness {energy.freshnessSec}s.
        </p>
        <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-3">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-24 w-full text-(--trust-primary)"
            role="img"
            aria-label="Energy production sparkline"
          >
            <defs>
              <linearGradient id="energySpark" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--trust-primary)"
                  stopOpacity="0.8"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(var(--color-teal-500-rgb),0.1)"
                  stopOpacity="0.1"
                />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#energySpark)"
              strokeWidth={3}
              strokeLinecap="round"
              points={buildSparkline(energy.spark)}
            />
          </svg>
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary)">
          Source: {energy.sourceProvenance}
        </p>
      </GlassCard>
      <GlassCard padding="lg" className="space-y-4">
        <header className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-tertiary)">
            Energy sales
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            {sales.mwToGrid.toFixed(1)} MW to grid
          </h3>
        </header>
        <p className="text-sm text-(--text-secondary)">
          {Math.round(sales.pctOfTotal * 100)}% of generation sold with TWAP $
          {sales.twap.toFixed(2)}. Freshness {sales.freshnessSec}s.
        </p>
        <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3 text-xs text-(--text-secondary)">
          Oracle provenance: {sales.sourceProvenance}
        </div>
      </GlassCard>
      <GlassCard padding="lg" className="space-y-4">
        <header className="space-y-1">
          <p className="text-xs uppercase tracking-[0.3em] text-(--text-tertiary)">
            Battery status
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            SOC trend
          </h3>
        </header>
        <ul className="space-y-2 text-sm text-(--text-secondary)">
          {batteries.units.map((unit) => (
            <li
              key={unit.id}
              className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3"
            >
              <div className="flex items-center justify-between text-(--text-primary)">
                <span>{unit.id.toUpperCase()}</span>
                <span>{unit.socPct}%</span>
              </div>
              <progress
                max={100}
                value={unit.socPct}
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[rgba(var(--color-teal-500-rgb),0.15)] [appearance:none]"
              />
              <p className="mt-2 text-xs text-(--text-secondary)">
                Rate {unit.rateKw >= 0 ? "+" : ""}
                {unit.rateKw} kW • Time to target {unit.ttfMin} min →{" "}
                {unit.targetPct}%
              </p>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
