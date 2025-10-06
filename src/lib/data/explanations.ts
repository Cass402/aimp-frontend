import { cache } from "react";

import { useMocks } from "@/lib/config/flags";
import type { Explanation, UpcomingActionsResponse } from "@/lib/types";
import {
  mockLatestExplanations,
  mockUpcomingActions,
} from "./mock/explanations";

const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 35));

export const getLatestExplanations = cache(async (): Promise<Explanation[]> => {
  if (!useMocks) {
    throw new Error("Latest explanations API not implemented yet");
  }

  await simulateLatency();
  return mockLatestExplanations;
});

export const getUpcomingActions = cache(
  async (): Promise<UpcomingActionsResponse> => {
    if (!useMocks) {
      throw new Error("Upcoming actions API not implemented yet");
    }

    await simulateLatency();
    return mockUpcomingActions;
  }
);
