import { cache } from "react";

import { useMocks } from "@/lib/config/flags";
import type { PortfolioAssetPosition, PortfolioSummary } from "@/lib/types";
import { mockPortfolioAssets, mockPortfolioSummary } from "./mock/portfolio";

const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 25));

export const getPortfolioSummary = cache(
  async (): Promise<PortfolioSummary> => {
    if (!useMocks) {
      throw new Error("Portfolio summary API not implemented yet");
    }

    await simulateLatency();
    return mockPortfolioSummary;
  }
);

export const getPortfolioAssets = cache(
  async (): Promise<PortfolioAssetPosition[]> => {
    if (!useMocks) {
      throw new Error("Portfolio assets API not implemented yet");
    }

    await simulateLatency();
    return mockPortfolioAssets;
  }
);
