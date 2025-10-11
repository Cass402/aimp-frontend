/**
 * HoldingsTable - Enhanced Asset Holdings Display
 *
 * Comprehensive table showing portfolio assets with performance metrics,
 * allocation percentages, efficiency scores, and quick actions.
 *
 * @see PRD Section 7.1 - Dashboard Portfolio Holdings
 */

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

function formatPercentage(value: number, includeSign = true) {
  const sign = includeSign && value >= 0 ? "+" : "";
  return `${sign}${(value * 100).toFixed(2)}%`;
}

// Get health color based on efficiency or performance
function getHealthColor(value: number): string {
  if (value >= 90) return "text-green-400";
  if (value >= 70) return "text-blue-400";
  if (value >= 50) return "text-yellow-400";
  return "text-orange-400";
}

export function HoldingsTable({ assets }: HoldingsTableProps) {
  // Calculate total value for allocation percentages
  const totalValue = assets.reduce((sum, asset) => sum + asset.valueUsd, 0);

  return (
    <GlassCard
      padding="lg"
      trustLevel="medium"
      enableMotion={false}
      className="space-y-5"
    >
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Holdings
        </p>
        <div className="flex items-end justify-between">
          <h3 className="text-xl font-semibold text-(--text-primary)">
            Assets under AI authority
          </h3>
          <p className="text-sm text-(--text-secondary)">
            {assets.length} asset{assets.length !== 1 ? "s" : ""} · Total:{" "}
            {formatUsd(totalValue)}
          </p>
        </div>
      </header>

      <div className="overflow-hidden rounded-3xl border border-(--glass-border-soft)">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-(--glass-border-soft)">
            <thead className="bg-(--glass-surface-primary) text-left text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
              <tr>
                <th className="px-5 py-3 font-medium">Asset</th>
                <th className="px-5 py-3 font-medium text-right">Units</th>
                <th className="px-5 py-3 font-medium text-right">Value</th>
                <th className="px-5 py-3 font-medium text-right">Allocation</th>
                <th className="px-5 py-3 font-medium text-right">24h PnL</th>
                <th className="px-5 py-3 font-medium text-center">
                  Performance
                </th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--glass-border-soft) text-sm text-(--text-secondary)">
              {assets.map((asset) => {
                const allocation = (asset.valueUsd / totalValue) * 100;
                // Mock efficiency score (would come from API)
                const efficiency = 85 + Math.random() * 15;

                return (
                  <tr
                    key={asset.id}
                    className="transition hover:bg-(--glass-surface-primary)"
                  >
                    {/* Asset Name with Icon */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white"
                          aria-hidden
                        >
                          {asset.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-(--text-primary)">
                            {asset.name}
                          </p>
                          <p className="text-xs text-(--text-tertiary)">
                            Solar Asset
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Units */}
                    <td className="px-5 py-4 text-right">
                      <p className="font-medium text-(--text-primary)">
                        {asset.units.toLocaleString()}
                      </p>
                      <p className="text-xs text-(--text-tertiary)">kWh</p>
                    </td>

                    {/* Value */}
                    <td className="px-5 py-4 text-right">
                      <p className="font-semibold text-(--text-primary)">
                        {formatUsd(asset.valueUsd)}
                      </p>
                    </td>

                    {/* Allocation with Progress Bar */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col items-end gap-1">
                        <p className="font-medium text-(--text-primary)">
                          {allocation.toFixed(1)}%
                        </p>
                        <div className="w-16 h-1.5 rounded-full bg-(--glass-fill-subtle) overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                            style={{ width: `${Math.min(allocation, 100)}%` }}
                            aria-hidden
                          />
                        </div>
                      </div>
                    </td>

                    {/* 24h PnL */}
                    <td className="px-5 py-4 text-right">
                      <p
                        className={cn(
                          "font-semibold",
                          asset.pnl24h >= 0 ? "text-green-400" : "text-red-400"
                        )}
                      >
                        {formatPercentage(asset.pnl24h)}
                      </p>
                      <p className="text-xs text-(--text-tertiary)">
                        {asset.pnl24h >= 0 ? "↑" : "↓"}{" "}
                        {formatUsd(asset.valueUsd * Math.abs(asset.pnl24h))}
                      </p>
                    </td>

                    {/* Performance Score */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="relative w-12 h-12">
                          <svg className="w-12 h-12 transform -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              className="text-(--glass-border-soft)"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${(efficiency / 100) * 125.6} 125.6`}
                              className={getHealthColor(efficiency)}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className={cn(
                                "text-xs font-bold",
                                getHealthColor(efficiency)
                              )}
                            >
                              {efficiency.toFixed(0)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-(--text-tertiary)">
                          Efficiency
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-(--glass-border-highlight) bg-(--glass-surface-primary) px-3 py-1.5 text-xs font-semibold text-(--text-primary) transition hover:shadow-[0_0_24px_rgba(33,128,141,0.18)] focus-visible:u-focus-ring"
                        >
                          Explain
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-elevated) px-3 py-1.5 text-xs font-semibold text-(--text-primary) transition hover:shadow-[0_0_28px_rgba(19,52,59,0.22)] focus-visible:u-focus-ring"
                        >
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between px-2 text-xs text-(--text-tertiary)">
        <p>Last updated: just now · Auto-refreshing every 30s</p>
        <p>All values in USD · Performance tracked by AI agents</p>
      </div>
    </GlassCard>
  );
}
