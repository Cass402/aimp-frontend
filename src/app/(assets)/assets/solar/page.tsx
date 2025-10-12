/**
 * Solar Asset Detail Page - Enhanced Living Machine Visualization
 *
 * Individual solar farm interface showcasing the "digital twin" concept:
 * - Real-time asset metadata with ownership information
 * - Hardware health monitoring with predictive maintenance
 * - Price history with oracle coverage visualization
 * - Energy production, sales, and battery status metrics
 * - Trust-building transparency through live telemetry
 *
 * Enhanced with:
 * - Server-side data fetching with Next.js revalidation
 * - HealthDot indicators for component status
 * - Current project's GlassCard styling
 */

import { Suspense } from "react";

import { PageLayout } from "@/app/_components/page-layout";
import { Stack } from "@/components/ui/layout";
import { GlassCard } from "@/components/ui/glass-card";

import { EnhancedAssetHeader } from "./_components/enhanced-asset-header";
import { HardwareHealthSection } from "./_components/hardware-health";
import { PriceChart } from "./_components/price-chart";
import { EnergyCards } from "./_components/energy-cards";

// Loading components
function HeaderSkeleton() {
  return (
    <GlassCard padding="lg" className="h-32 animate-pulse">
      <div className="space-y-3">
        <div className="h-6 w-1/3 bg-(--glass-surface-primary) rounded" />
        <div className="h-4 w-2/3 bg-(--glass-surface-primary) rounded" />
      </div>
    </GlassCard>
  );
}

function PriceChartSkeleton() {
  return (
    <GlassCard padding="lg" className="h-96 animate-pulse">
      <div className="h-full bg-(--glass-surface-primary) rounded-3xl" />
    </GlassCard>
  );
}

function HealthSkeleton() {
  return (
    <GlassCard padding="lg" className="h-64 animate-pulse">
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-(--glass-surface-primary) rounded-3xl"
          />
        ))}
      </div>
    </GlassCard>
  );
}

function EnergyCardsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <GlassCard key={i} padding="lg" className="h-64 animate-pulse">
          <div className="h-full bg-(--glass-surface-primary) rounded-3xl" />
        </GlassCard>
      ))}
    </div>
  );
}

export default function SolarAssetPage() {
  return (
    <PageLayout
      header={{
        category: "Solar farm",
        title: "Mojave Desert Solar — Asset SF-001",
        description:
          "Real-time performance monitoring, energy production, and AI-driven optimization of your solar infrastructure asset.",
        variant: "default",
      }}
    >
      <Stack space="lg" className="pb-16">
        {/* Enhanced Asset Header */}
        <Suspense fallback={<HeaderSkeleton />}>
          <EnhancedAssetHeader />
        </Suspense>

        {/* Price Chart */}
        <Suspense fallback={<PriceChartSkeleton />}>
          <PriceChart />
        </Suspense>

        {/* Energy Metrics Cards */}
        <Suspense fallback={<EnergyCardsSkeleton />}>
          <EnergyCards />
        </Suspense>

        {/* Hardware Health */}
        <Suspense fallback={<HealthSkeleton />}>
          <HardwareHealthSection />
        </Suspense>
      </Stack>
    </PageLayout>
  );
}
