import {
  getBatterySummary,
  getEnergySaleExplanation,
  getEnergySummary,
  getPanelExplanation,
  getPanelGrid,
} from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";

import { FlowDiagram } from "./_components/flow-diagram";
import { OverrideCard } from "./_components/override-card";
import { PanelGrid } from "./_components/panel-grid";

export const revalidate = 30;

export default async function SolarExplorePage() {
  const [energy, batteries, panelGrid, panelExplanation, saleExplanation] =
    await Promise.all([
      getEnergySummary(),
      getBatterySummary(),
      getPanelGrid(),
      getPanelExplanation(),
      getEnergySaleExplanation(),
    ]);

  const batteryAvgMw =
    batteries.units.reduce((sum, unit) => sum + unit.rateKw, 0) / 1000;

  return (
    <div className="grid gap-6 pb-16 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <FlowDiagram
          generationMw={energy.mw}
          toGridMw={
            saleExplanation.priceNow > saleExplanation.twap
              ? energy.mw * 0.66
              : energy.mw * 0.5
          }
          toBatteryMw={Math.max(0, batteryAvgMw)}
          status={
            panelExplanation.status.toLowerCase().includes("alert")
              ? "alert"
              : "normal"
          }
        />
        <PanelGrid grid={panelGrid} explanation={panelExplanation} />
      </div>
      <div className="space-y-6">
        <OverrideCard />
        <GlassCard padding="lg" className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
            Energy sale insight
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            {saleExplanation.rationale}
          </h3>
          <p className="text-sm text-(--text-secondary)">
            Spot ${saleExplanation.priceNow.toFixed(2)} • TWAP $
            {saleExplanation.twap.toFixed(2)} • Deviation{" "}
            {saleExplanation.oracle.deviation.toFixed(1)}σ • Freshness{" "}
            {saleExplanation.oracle.freshness}s
          </p>
          <div className="flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-[0.12em] text-(--text-tertiary)">
            {saleExplanation.constraints.map((constraint) => (
              <span
                key={constraint}
                className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-3 py-1 text-(--text-secondary)"
              >
                {constraint}
              </span>
            ))}
          </div>
          <p className="text-xs text-(--text-muted)">
            Oracle sources: {saleExplanation.oracle.sources.join(", ")}
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
