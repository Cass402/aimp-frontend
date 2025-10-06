import {
  getBatterySummary,
  getEnergySummary,
  getPriceHistory,
  getSalesSummary,
  getSolarAssetSummary,
  getUpcomingActions,
} from "@/lib/data";

import { AssetHeader } from "./_components/asset-header";
import { EnergyCards } from "./_components/energy-cards";
import { PlannedActions } from "./_components/planned-actions";
import { PriceChart } from "./_components/price-chart";

export const revalidate = 60;

export default async function SolarAssetPage() {
  const [summary, priceHistory, energy, sales, batteries, upcoming] =
    await Promise.all([
      getSolarAssetSummary(),
      getPriceHistory(),
      getEnergySummary(),
      getSalesSummary(),
      getBatterySummary(),
      getUpcomingActions(),
    ]);

  return (
    <div className="space-y-10 pb-16">
      <AssetHeader summary={summary} />
      <PriceChart priceHistory={priceHistory} />
      <EnergyCards energy={energy} sales={sales} batteries={batteries} />
      <PlannedActions upcoming={upcoming} />
    </div>
  );
}
