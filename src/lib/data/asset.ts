import { cache } from "react";

import { useMocks } from "@/lib/config/flags";
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
import {
  mockBatterySummary,
  mockEnergySaleExplanation,
  mockEnergySummary,
  mockPanelExplanation,
  mockPanelGrid,
  mockPriceHistory,
  mockSalesSummary,
  mockSolarSummary,
} from "./mock/asset";

const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 40));

export const getSolarAssetSummary = cache(
  async (): Promise<SolarAssetSummary> => {
    if (!useMocks) {
      throw new Error("Solar asset summary API not implemented yet");
    }

    await simulateLatency();
    return mockSolarSummary;
  }
);

export const getPriceHistory = cache(async (): Promise<PricePoint[]> => {
  if (!useMocks) {
    throw new Error("Price history API not implemented yet");
  }

  await simulateLatency();
  return mockPriceHistory;
});

export const getEnergySummary = cache(async (): Promise<EnergySummary> => {
  if (!useMocks) {
    throw new Error("Energy summary API not implemented yet");
  }

  await simulateLatency();
  return mockEnergySummary;
});

export const getSalesSummary = cache(async (): Promise<SalesSummary> => {
  if (!useMocks) {
    throw new Error("Sales summary API not implemented yet");
  }

  await simulateLatency();
  return mockSalesSummary;
});

export const getBatterySummary = cache(async (): Promise<BatterySummary> => {
  if (!useMocks) {
    throw new Error("Battery summary API not implemented yet");
  }

  await simulateLatency();
  return mockBatterySummary;
});

export const getPanelGrid = cache(async (): Promise<PanelGridResponse> => {
  if (!useMocks) {
    throw new Error("Panel grid API not implemented yet");
  }

  await simulateLatency();
  return mockPanelGrid;
});

export const getPanelExplanation = cache(
  async (): Promise<PanelExplanation> => {
    if (!useMocks) {
      throw new Error("Panel explanation API not implemented yet");
    }

    await simulateLatency();
    return mockPanelExplanation;
  }
);

export const getEnergySaleExplanation = cache(
  async (): Promise<EnergySaleExplanation> => {
    if (!useMocks) {
      throw new Error("Energy sale explanation API not implemented yet");
    }

    await simulateLatency();
    return mockEnergySaleExplanation;
  }
);
