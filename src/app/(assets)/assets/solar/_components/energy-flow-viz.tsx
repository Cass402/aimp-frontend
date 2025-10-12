/**
 * Energy Flow Visualization Component
 *
 * Real-time energy flow diagram showing solar → battery → consumption → grid
 * with animated FlowLine components and live telemetry.
 */

import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

import { GlassCard } from "@/components/ui/glass-card";
import { StatPill } from "@/components/primitives/StatPill";
import { FlowLine } from "@/components/primitives/FlowLine";
import { ProofBadge } from "@/components/primitives/ProofBadge";
import { StatusChange } from "@/components/primitives/Motion";

interface EnergyData {
  currentGeneration: number;
  currentConsumption: number;
  batterySOC: number;
  batteryHealth: number;
  gridExport: number;
  panelEfficiency: number;
  inverterStatus: string;
  dataAge: number;
}

async function getEnergyFlowData(): Promise<EnergyData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/energy`, {
      next: { revalidate: 5 }, // 5s real-time updates
    });

    if (!response.ok) {
      throw new Error("Failed to fetch energy data");
    }

    const json = await response.json();
    const data = json.data;

    // Extract from the enhanced API response
    return {
      currentGeneration: data.flowAnalysis?.totalGeneration ?? 0,
      currentConsumption: data.flowAnalysis?.totalConsumption ?? 0,
      batterySOC: data.batteryHealth?.stateOfCharge ?? 0,
      batteryHealth: data.batteryHealth?.stateOfHealth ?? 0,
      gridExport: data.flowAnalysis?.netGridFlow ?? 0,
      panelEfficiency: data.flowAnalysis?.systemEfficiency ?? 0,
      inverterStatus: data.gridInteraction?.gridSyncStatus ?? "operational",
      dataAge: data.dataAge ?? 0,
    };
  } catch (error) {
    console.error("Error fetching energy flow data:", error);
    // Return fallback data
    return {
      currentGeneration: 0,
      currentConsumption: 0,
      batterySOC: 0,
      batteryHealth: 0,
      gridExport: 0,
      panelEfficiency: 0,
      inverterStatus: "offline",
      dataAge: 0,
    };
  }
}

export async function EnergyFlowVisualization() {
  const energy = await getEnergyFlowData();

  // Calculate flow directions and magnitudes
  const netFlow = energy.currentGeneration - energy.currentConsumption;
  const batteryFlow = energy.batterySOC < 95 ? Math.min(netFlow, 50) : 0;
  const gridFlow = netFlow - batteryFlow;

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="processing"
      trustLevel="high"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-(--text-primary)">
          Energy Flow
        </h2>
        <ProofBadge
          label="Live Telemetry"
          state="verified"
          hash={`${energy.dataAge}s-fresh`}
          size="sm"
        />
      </div>

      {/* Flow Visualization */}
      <div className="relative h-96 flex items-center justify-center rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-8">
        {/* Solar Panels (Source) */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10">
          <div className="rounded-3xl border-2 border-(--trust-primary) bg-(--glass-surface-primary) p-5 shadow-lg">
            <div className="text-3xl mb-2">☀️</div>
            <div className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-1">
              Solar Panels
            </div>
            <div className="text-lg font-mono font-semibold text-(--trust-primary)">
              {formatNumber(energy.currentGeneration)} kW
            </div>
          </div>
        </div>

        {/* Battery (Middle Top) */}
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 z-10">
          <div
            className={cn(
              "rounded-3xl border-2 bg-(--glass-surface-primary) p-5 shadow-lg",
              energy.batterySOC > 80
                ? "border-(--trust-primary)"
                : "border-(--status-warning)"
            )}
          >
            <div className="text-3xl mb-2">🔋</div>
            <div className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-1">
              Battery
            </div>
            <div className="text-lg font-mono font-semibold text-(--text-primary)">
              {formatNumber(energy.batterySOC)}%
            </div>
            <div className="text-xs text-(--text-tertiary)">
              Health: {formatNumber(energy.batteryHealth)}%
            </div>
          </div>
        </div>

        {/* Consumption (Middle Bottom) */}
        <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 z-10">
          <div className="rounded-3xl border-2 border-(--glass-border-soft) bg-(--glass-surface-primary) p-5 shadow-lg">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-1">
              Consumption
            </div>
            <div className="text-lg font-mono font-semibold text-(--text-primary)">
              {formatNumber(energy.currentConsumption)} kW
            </div>
          </div>
        </div>

        {/* Grid (Destination) */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10">
          <div
            className={cn(
              "rounded-3xl border-2 bg-(--glass-surface-primary) p-5 shadow-lg",
              energy.gridExport > 0
                ? "border-(--prosperity-primary)"
                : "border-(--glass-border-soft)"
            )}
          >
            <div className="text-3xl mb-2">🏭</div>
            <div className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-1">
              Grid Export
            </div>
            <div className="text-lg font-mono font-semibold text-(--prosperity-primary)">
              {formatNumber(Math.max(0, energy.gridExport))} kW
            </div>
          </div>
        </div>

        {/* Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Solar → Battery */}
          {batteryFlow > 0 && (
            <FlowLine
              from={[20, 50]}
              to={[48, 25]}
              intensity="strong"
              status="verified"
              animated
              speed="medium"
              glow
            />
          )}

          {/* Solar → Consumption */}
          <FlowLine
            from={[20, 50]}
            to={[48, 75]}
            intensity="normal"
            status="verified"
            animated
            speed="medium"
            glow
          />

          {/* Battery → Consumption (if discharging) */}
          {energy.batterySOC < 90 && netFlow < 0 && (
            <FlowLine
              from={[50, 28]}
              to={[50, 72]}
              intensity="subtle"
              status="warning"
              animated
              speed="fast"
            />
          )}

          {/* Consumption → Grid */}
          {gridFlow > 0 && (
            <FlowLine
              from={[52, 75]}
              to={[80, 50]}
              intensity="strong"
              status="verified"
              animated
              speed="medium"
              glow
            />
          )}
        </svg>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-(--glass-border-soft)">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-2">
            Efficiency
          </p>
          <StatusChange triggerKey={energy.panelEfficiency}>
            <p className="text-lg font-mono font-semibold text-(--prosperity-primary)">
              {formatNumber(energy.panelEfficiency)}%
            </p>
          </StatusChange>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-2">
            Net Flow
          </p>
          <StatusChange triggerKey={netFlow}>
            <p
              className={cn(
                "text-lg font-mono font-semibold",
                netFlow > 0
                  ? "text-(--prosperity-primary)"
                  : "text-(--status-warning)"
              )}
            >
              {netFlow > 0 ? "+" : ""}
              {formatNumber(netFlow)} kW
            </p>
          </StatusChange>
        </div>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-2">
            Inverter
          </p>
          <StatPill
            label={energy.inverterStatus}
            status={
              energy.inverterStatus === "operational" ||
              energy.inverterStatus === "synchronized"
                ? "verified"
                : "warning"
            }
            size="sm"
          />
        </div>
      </div>
    </GlassCard>
  );
}
