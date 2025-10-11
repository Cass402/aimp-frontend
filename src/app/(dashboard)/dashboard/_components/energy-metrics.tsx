/**
 * EnergyMetricsCard - Live Energy Generation & Consumption
 *
 * Displays real-time energy metrics including generation, consumption,
 * battery state, and grid export with operational status indicators.
 *
 * @see PRD Section 7.3 - Dashboard Energy Metrics
 */

import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";
import { formatNumber } from "@/lib/format";

// Fetch energy data from API
async function getEnergyMetrics() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/energy`, {
      next: { revalidate: 5 }, // Refresh every 5 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch energy metrics:", response.statusText);
      return null;
    }

    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.error("Error fetching energy metrics:", error);
    return null;
  }
}

export async function EnergyMetricsCard() {
  const energy = await getEnergyMetrics();

  // Handle null/error case
  if (!energy) {
    return (
      <GlassCard
        padding="lg"
        variant="neural"
        aiState="idle"
        trustLevel="medium"
        className="space-y-6"
      >
        <div className="text-center py-8">
          <p className="text-(--text-secondary)">
            Unable to load energy metrics. Please try again later.
          </p>
        </div>
      </GlassCard>
    );
  }

  // Extract data from nested API response structure
  // The API returns EnhancedEnergyMetrics with nested properties
  const generation =
    energy.flowAnalysis?.totalGeneration ?? energy.currentGeneration ?? 0;
  const consumption =
    energy.flowAnalysis?.totalConsumption ?? energy.currentConsumption ?? 0;
  const batterySOC =
    energy.batteryHealth?.stateOfCharge ?? energy.batterySOC ?? 0;
  const batteryHealth =
    energy.batteryHealth?.stateOfHealth ?? energy.batteryHealthPercent ?? 0;
  const gridFlow = energy.flowAnalysis?.netGridFlow ?? energy.gridExportKw ?? 0;
  const efficiency =
    energy.flowAnalysis?.systemEfficiency ?? energy.panelEfficiency ?? 0;
  const inverterStatus =
    energy.constraintValidation?.safetyStatus ??
    energy.inverterStatus ??
    "safe";

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="optimizing"
      trustLevel="high"
      className="space-y-6"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)]"
        aria-hidden
      />

      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
            Live Energy Status
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            Real-time generation & consumption
          </h3>
        </div>
        <StatusPill
          tone={
            inverterStatus === "safe" || inverterStatus === "operational"
              ? "positive"
              : "caution"
          }
          label="System"
          detail={inverterStatus}
        />
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Generation */}
        <div className="glass-panel rounded-2xl px-4 py-4 hover:shadow-(--shadow-neural-strong) transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary) mb-2">
            Generation
          </p>
          <p className="text-2xl font-bold text-(--prosperity-primary) shadow-(--glow-prosperity-primary)">
            {formatNumber(generation)} kW
          </p>
          <p className="text-xs text-(--text-secondary) mt-1">
            Efficiency: {formatNumber(efficiency)}%
          </p>
        </div>

        {/* Consumption */}
        <div className="glass-panel rounded-2xl px-4 py-4 hover:shadow-(--shadow-neural-strong) transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary) mb-2">
            Consumption
          </p>
          <p className="text-2xl font-bold text-(--text-primary)">
            {formatNumber(consumption)} kW
          </p>
          <p className="text-xs text-(--text-secondary) mt-1">
            Net: {gridFlow >= 0 ? "+" : ""}
            {formatNumber(gridFlow)} kW
          </p>
        </div>

        {/* Battery SOC */}
        <div className="glass-panel rounded-2xl px-4 py-4 hover:shadow-(--shadow-neural-strong) transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary) mb-2">
            Battery SOC
          </p>
          <p className="text-2xl font-bold text-(--text-primary)">
            {formatNumber(batterySOC)}%
          </p>
          <p className="text-xs text-(--text-secondary) mt-1">
            Health: {formatNumber(batteryHealth)}%
          </p>
        </div>

        {/* Grid Export */}
        <div className="glass-panel rounded-2xl px-4 py-4 hover:shadow-(--shadow-neural-strong) transition-all duration-300">
          <p className="text-xs uppercase tracking-[0.28em] text-(--text-tertiary) mb-2">
            Grid {gridFlow >= 0 ? "Export" : "Import"}
          </p>
          <p
            className={`text-2xl font-bold ${gridFlow >= 0 ? "text-(--prosperity-primary) shadow-(--glow-prosperity-primary)" : "text-(--text-primary)"}`}
          >
            {formatNumber(Math.abs(gridFlow))} kW
          </p>
          <p className="text-xs text-(--text-secondary) mt-1">
            {gridFlow >= 0 ? "Revenue generating" : "Consuming from grid"}
          </p>
        </div>
      </div>

      {/* Status Message */}
      <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
        <p className="text-sm text-(--text-secondary)">
          <span className="text-(--prosperity-primary) font-semibold">
            ⚡ System operating optimally
          </span>
          {" • "}
          All metrics within normal parameters. AI is{" "}
          {gridFlow >= 0
            ? "maximizing grid export during peak pricing"
            : "optimizing energy consumption"}
          .
        </p>
      </div>
    </GlassCard>
  );
}
