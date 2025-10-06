import type { Explanation, UpcomingActionsResponse } from "@/lib/types";

export const mockLatestExplanations: Explanation[] = [
  {
    id: "exp-ops-001",
    persona: "operations",
    title: "Derating inverter cluster to 92%",
    summary:
      "Thermal threshold triggered — smoothing output to protect hardware.",
    reasoning: [
      "Panel temperature trend exceeded 68°C",
      "Grid price remains in mid band",
      "Maintains battery charge window for 18:00 dispatch",
    ],
    constraints: [
      "Thermal ceiling 70°C",
      "Daily discharge <= 1.2 cycles",
      "Voltage ripple < 4%",
    ],
    inputs: [
      {
        key: "temp.panel",
        value: 68.4,
        source: "telemetry",
        freshnessSec: 4,
      },
      {
        key: "grid.price",
        value: 36.2,
        source: "oracle:pyth+switchboard",
        freshnessSec: 14,
      },
      {
        key: "battery.soc",
        value: 74,
        source: "telemetry",
        freshnessSec: 5,
      },
    ],
    zkProofHash: "0x42ab91",
    nextActions: [
      "Re-evaluate discharge at 18:05",
      "Send maintenance ping if >69°C",
    ],
    timestamp: new Date().toISOString(),
  },
  {
    id: "exp-market-002",
    persona: "markets",
    title: "Scheduling 1.2MW grid sale at 18:30",
    summary:
      "Evening peak pricing and battery headroom allow profitable dispatch.",
    reasoning: [
      "TWAP > spot by 6.2%",
      "Battery SOC 74% > target 68%",
      "No safety constraints violated",
    ],
    constraints: [
      "Max dispatch 2MW",
      "Reserve floor 45% SOC",
      "Oracle deviation < 3.5σ",
    ],
    inputs: [
      {
        key: "price.twap",
        value: 38.7,
        source: "oracle:pyth",
        freshnessSec: 30,
      },
      {
        key: "battery.reserve",
        value: 45,
        source: "policy",
        freshnessSec: 0,
      },
    ],
    timestamp: new Date().toISOString(),
  },
];

export const mockUpcomingActions: UpcomingActionsResponse = {
  actions: [
    {
      title: "Charge batteries 14:00–16:00",
      startAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      reason: "Low price window and irradiance spike",
      constraints: ["SOC cap 80%", "Charge rate <= 1.5MW"],
    },
    {
      title: "Inspect panel string D17",
      startAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      reason: "Efficiency drop flagged by Maintenance agent",
      constraints: ["Lock-out tag before inspection", "Thermal limit 70°C"],
    },
  ],
};
