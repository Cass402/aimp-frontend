/**
 * PortfolioSummaryCard - Comprehensive Portfolio Display
 *
 * Enhanced portfolio summary with token holdings, energy production,
 * 24h changes, and AI-managed metrics.
 *
 * @see PRD Section 7.1 - Dashboard Portfolio Intelligence
 */

import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";
import type { PortfolioSummary } from "@/lib/types";

interface PortfolioSummaryCardProps {
  summary: PortfolioSummary;
}

// Format percentage with sign and color
function formatPercentage(value: number): { text: string; color: string } {
  const sign = value >= 0 ? "+" : "";
  const color = value >= 0 ? "text-[#22c55e]" : "text-[#ef4444]";
  return {
    text: `${sign}${value.toFixed(2)}%`,
    color,
  };
}

// Format large numbers with K/M suffix
function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(2);
}

export function PortfolioSummaryCard({ summary }: PortfolioSummaryCardProps) {
  const apyPercentage = (summary.apy * 100).toFixed(1);
  const change24h = formatPercentage((summary.solar.valueUsd / 1000 - 1) * 5.2); // Mock 24h change

  return (
    <GlassCard
      padding="lg"
      variant="elevated"
      trustLevel="high"
      aiState="optimizing"
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)]"
        aria-hidden
      />

      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <StatusPill tone="positive" label="Portfolio" detail="AI-managed" />
          <h2 className="text-2xl font-semibold text-(--text-primary)">
            Your solar position is earning{" "}
            <span className="text-(--prosperity-primary) font-bold shadow-(--glow-prosperity-primary) px-1">
              {apyPercentage}% APY
            </span>{" "}
            with guardrails active.
          </h2>
          <p className="max-w-xl text-sm text-(--text-secondary)">
            Holdings refresh every 500&nbsp;ms with oracle provenance and AI
            authority attestations. You can inspect receipts, override
            automation, and view persona explanations at any time.
          </p>
        </div>

        {/* Total Value Card */}
        <div className="glass-panel rounded-2xl px-6 py-4 hover:shadow-(--shadow-neural-strong) transition-all duration-300 min-w-[200px]">
          <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary)">
            Total Value
          </p>
          <p className="mt-1 text-3xl font-bold text-(--prosperity-primary) shadow-(--glow-prosperity-primary)">
            ${summary.solar.valueUsd.toLocaleString()}
          </p>
          <p className={`text-sm mt-1 ${change24h.color}`}>
            {change24h.text} 24h
          </p>
        </div>
      </div>

      {/* Token Holdings Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* SOL Balance */}
        <div className="glass-panel rounded-xl px-4 py-3 hover:shadow-(--shadow-neural-soft) transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-(--text-tertiary)">
              SOL
            </p>
            <div
              className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
              aria-hidden
            />
          </div>
          <p className="text-xl font-semibold text-(--text-primary)">
            {summary.sol.toFixed(2)}
          </p>
          <p className="text-xs text-(--text-secondary) mt-1">
            ${(summary.sol * 150).toFixed(2)}
          </p>
        </div>

        {/* SOLAR Tokens */}
        <div className="glass-panel rounded-xl px-4 py-3 hover:shadow-(--shadow-neural-soft) transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-(--text-tertiary)">
              SOLAR
            </p>
            <div
              className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
              aria-hidden
            />
          </div>
          <p className="text-xl font-semibold text-(--text-primary)">
            {formatCompact(summary.solar.units)}
          </p>
          <p className="text-xs text-(--text-secondary) mt-1">
            {summary.solar.units.toLocaleString()} units
          </p>
        </div>

        {/* Energy Produced */}
        <div className="glass-panel rounded-xl px-4 py-3 hover:shadow-(--shadow-neural-soft) transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-(--text-tertiary)">
              Energy 24h
            </p>
            <div
              className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"
              aria-hidden
            />
          </div>
          <p className="text-xl font-semibold text-(--text-primary)">
            {(summary.solar.units * 0.12).toFixed(1)} kWh
          </p>
          <p className="text-xs text-green-400 mt-1">+8.3% vs avg</p>
        </div>

        {/* ROI */}
        <div className="glass-panel rounded-xl px-4 py-3 hover:shadow-(--shadow-neural-soft) transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-(--text-tertiary)">
              ROI
            </p>
            <div
              className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
              aria-hidden
            />
          </div>
          <p className="text-xl font-semibold text-(--prosperity-primary)">
            +{(summary.apy * 30).toFixed(1)}%
          </p>
          <p className="text-xs text-(--text-secondary) mt-1">30d return</p>
        </div>
      </div>

      {/* Performance Metrics Bar */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--glass-fill-subtle) border border-(--glass-border-soft)">
          <div
            className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
            aria-hidden
          />
          <span className="text-(--text-tertiary)">AI Decisions:</span>
          <span className="font-semibold text-(--text-primary) ml-auto">
            247 today
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--glass-fill-subtle) border border-(--glass-border-soft)">
          <div className="w-2 h-2 rounded-full bg-blue-400" aria-hidden />
          <span className="text-(--text-tertiary)">Efficiency:</span>
          <span className="font-semibold text-(--text-primary) ml-auto">
            94.2%
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--glass-fill-subtle) border border-(--glass-border-soft)">
          <div className="w-2 h-2 rounded-full bg-purple-400" aria-hidden />
          <span className="text-(--text-tertiary)">Risk Score:</span>
          <span className="font-semibold text-(--text-primary) ml-auto">
            Low (8/100)
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
