import {
  getBatterySummary,
  getEnergySummary,
  getPriceHistory,
  getSalesSummary,
  getSolarAssetSummary,
  getUpcomingActions,
} from "@/lib/data";

import { PageLayout } from "@/app/_components/page-layout";
import { Stack } from "@/components/ui/layout";
import { ContentSection } from "@/components/ui/page-structure";

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
    <PageLayout
      header={{
        category: "Solar farm",
        title: "Mojave Desert Solar — Asset SF-001",
        description:
          "Monitor real-time performance, energy production, and AI-driven optimization of your solar infrastructure asset.",
        variant: "default",
      }}
    >
      <Stack space="lg" className="pb-16">
        <ContentSection
          title="Asset Overview"
          description="Real-time operational metrics and performance indicators"
        >
          <AssetHeader summary={summary} />
        </ContentSection>

        <ContentSection
          title="Price Performance"
          description="Historical price data and market performance trends"
        >
          <PriceChart priceHistory={priceHistory} />
        </ContentSection>

        <ContentSection
          title="Energy Management"
          description="Energy production, sales activity, and battery storage optimization"
        >
          <EnergyCards energy={energy} sales={sales} batteries={batteries} />
        </ContentSection>

        <ContentSection
          title="Planned Operations"
          description="Upcoming AI-driven actions and scheduled optimizations"
        >
          <PlannedActions upcoming={upcoming} />
        </ContentSection>
      </Stack>
    </PageLayout>
  );
}
