import type {
  BatterySummary,
  EnergySaleExplanation,
  EnergySummary,
  PanelExplanation,
  PanelGridResponse,
  PricePoint,
  SalesSummary,
  SolarAssetSummary,
} from "@/lib/types";

export const mockSolarSummary: SolarAssetSummary = {
  name: "Sorrento Ridge Solar",
  location: "Imperial Valley, CA",
  tokenPrice: 20.12,
  roi: 0.174,
};

export const mockPriceHistory: PricePoint[] = Array.from(
  { length: 24 },
  (_, index) => {
    const hoursAgo = 23 - index;
    const base = 19.8 + Math.sin(index / 4) * 0.6;
    const wobble = (index % 5) * 0.05;
    return {
      t: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
      p: Number((base + wobble).toFixed(2)),
    };
  }
);

export const mockEnergySummary: EnergySummary = {
  mw: 4.2,
  capacityPct: 0.82,
  spark: [3.8, 3.9, 4.1, 4.25, 4.2, 4.3, 4.0, 4.1],
  sourceProvenance: "telemetry + irradiance forecast",
  freshnessSec: 4,
};

export const mockSalesSummary: SalesSummary = {
  mwToGrid: 2.8,
  pctOfTotal: 0.67,
  twap: 36.2,
  sourceProvenance: "oracle:pyth+switchboard",
  freshnessSec: 18,
};

export const mockBatterySummary: BatterySummary = {
  units: [
    { id: "bank-01", socPct: 74, rateKw: 420, ttfMin: 54, targetPct: 68 },
    { id: "bank-02", socPct: 69, rateKw: -320, ttfMin: 32, targetPct: 72 },
    { id: "bank-03", socPct: 61, rateKw: 260, ttfMin: 84, targetPct: 70 },
  ],
};

export const mockPanelGrid: PanelGridResponse = {
  grid: Array.from({ length: 24 }, (_, idx) => {
    const health =
      idx % 11 === 0 ? "fault" : idx % 6 === 0 ? "attention" : "healthy";
    return {
      id: `panel-${idx + 1}`,
      status: health,
      voltage: Number((640 + Math.random() * 12).toFixed(1)),
      eff: Number((0.88 - Math.random() * 0.05).toFixed(2)),
      issue: health === "fault" ? "String imbalance" : undefined,
    };
  }),
};

export const mockPanelExplanation: PanelExplanation = {
  status: "Attention",
  cause: "Voltage drift detected in string D17",
  fixEta: "2h 30m",
  constraints: ["Dispatch capped at 92%", "Field tech notified"],
};

export const mockEnergySaleExplanation: EnergySaleExplanation = {
  priceNow: 39.1,
  twap: 36.7,
  rationale: "Dispatching into evening peak while preserving battery reserve",
  constraints: ["Max dispatch 2MW", "Reserve floor 45% SOC"],
  oracle: {
    sources: ["pyth", "switchboard", "internal forecast"],
    deviation: 1.6,
    freshness: 18,
  },
};
