import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import type { PortfolioAssetPosition } from "@/lib/types";

interface HoldingsTableProps {
  assets: PortfolioAssetPosition[];
}

function formatUsd(value: number) {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function HoldingsTable({ assets }: HoldingsTableProps) {
  return (
    <GlassCard padding="lg" className="space-y-5">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Holdings
        </p>
        <h3 className="text-xl font-semibold text-(--text-primary)">
          Assets under AI authority
        </h3>
      </header>
      <div className="overflow-hidden rounded-3xl border border-(--glass-border-soft)">
        <table className="min-w-full divide-y divide-(--glass-border-soft)">
          <thead className="bg-(--glass-surface-primary) text-left text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
            <tr>
              <th className="px-5 py-3 font-medium">Asset</th>
              <th className="px-5 py-3 font-medium">Units</th>
              <th className="px-5 py-3 font-medium">Value</th>
              <th className="px-5 py-3 font-medium">24h PnL</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--glass-border-soft) text-sm text-(--text-secondary)">
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="transition hover:bg-(--glass-surface-primary)"
              >
                <td className="px-5 py-4 text-(--text-primary)">
                  {asset.name}
                </td>
                <td className="px-5 py-4">{asset.units.toLocaleString()}</td>
                <td className="px-5 py-4">{formatUsd(asset.valueUsd)}</td>
                <td
                  className={cn(
                    "px-5 py-4 font-medium",
                    asset.pnl24h >= 0
                      ? "text-(--prosperity-primary)"
                      : "text-(--critical-primary)"
                  )}
                >
                  {(asset.pnl24h * 100).toFixed(2)}%
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-(--glass-border-highlight) bg-(--glass-surface-primary) px-4 py-2 text-xs font-semibold text-(--text-primary) transition hover:shadow-[0_0_24px_rgba(33,128,141,0.18)] focus-visible:u-focus-ring"
                    >
                      View explanations
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-elevated) px-4 py-2 text-xs font-semibold text-(--text-primary) transition hover:shadow-[0_0_28px_rgba(19,52,59,0.22)] focus-visible:u-focus-ring"
                    >
                      Manage
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
