export interface SolarAssetSummary {
  name: string;
  location: string;
  tokenPrice: number;
  roi: number;
}

export interface PricePoint {
  t: string;
  p: number;
}

export interface EnergySummary {
  mw: number;
  capacityPct: number;
  spark: number[];
  sourceProvenance: string;
  freshnessSec: number;
}

export interface SalesSummary {
  mwToGrid: number;
  pctOfTotal: number;
  twap: number;
  sourceProvenance: string;
  freshnessSec: number;
}

export interface BatteryUnit {
  id: string;
  socPct: number;
  rateKw: number;
  ttfMin: number;
  targetPct: number;
}

export interface BatterySummary {
  units: BatteryUnit[];
}

export interface UpcomingAction {
  title: string;
  startAt: string;
  reason: string;
  constraints: string[];
}

export interface UpcomingActionsResponse {
  actions: UpcomingAction[];
}

export interface PanelStatus {
  id: string;
  status: "healthy" | "attention" | "fault";
  voltage: number;
  eff: number;
  issue?: string;
}

export interface PanelGridResponse {
  grid: PanelStatus[];
}

export interface PanelExplanation {
  status: string;
  cause: string;
  fixEta: string;
  constraints: string[];
}

export interface EnergySaleExplanation {
  priceNow: number;
  twap: number;
  rationale: string;
  constraints: string[];
  oracle: {
    sources: string[];
    deviation: number;
    freshness: number;
  };
}
