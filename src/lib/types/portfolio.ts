export interface PortfolioSummary {
  sol: number;
  solar: {
    units: number;
    valueUsd: number;
  };
  apy: number;
}

export interface PortfolioAssetPosition {
  id: string;
  name: string;
  units: number;
  valueUsd: number;
  pnl24h: number;
}
