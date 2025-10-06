import type { PortfolioAssetPosition, PortfolioSummary } from "@/lib/types";

export const mockPortfolioSummary: PortfolioSummary = {
  sol: 128.42,
  solar: {
    units: 820,
    valueUsd: 16450,
  },
  apy: 0.124,
};

export const mockPortfolioAssets: PortfolioAssetPosition[] = [
  {
    id: "solar-farm-alpha",
    name: "Sorrento Ridge Solar",
    units: 820,
    valueUsd: 16450,
    pnl24h: 0.021,
  },
  {
    id: "battery-trust",
    name: "Grid Battery Reserve",
    units: 120,
    valueUsd: 3620,
    pnl24h: -0.006,
  },
];
