import { GlassCard } from "@/components/ui/glass-card";
import { PageLayout } from "@/app/_components/page-layout";
import { Stack } from "@/components/ui/layout";
import { ContentSection } from "@/components/ui/page-structure";
import { getSolarAssetSummary } from "@/lib/data";

import { InvestForm } from "./_components/invest-form";

export const revalidate = 120;

export default async function InvestPage() {
  const summary = await getSolarAssetSummary();

  return (
    <PageLayout
      header={{
        category: "Investment opportunity",
        title: `Invest in ${summary.name}`,
        description:
          "Purchase fractional ownership of AI-managed solar infrastructure with transparent operations and proven performance.",
        variant: "default",
        actions: (
          <span className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-2 text-xs uppercase tracking-[0.32em] text-(--text-secondary)">
            {summary.location}
          </span>
        ),
      }}
    >
      <Stack space="lg" className="pb-16">
        <ContentSection
          title="Asset Overview"
          description="Key performance metrics and operational highlights"
        >
          <GlassCard
            padding="lg"
            variant="prosperity"
            trustLevel="high"
            aiState="optimizing"
            className="space-y-4"
          >
            <div className="grid gap-4 text-sm text-(--text-secondary) sm:grid-cols-3">
              <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
                  Token price
                </p>
                <p className="text-xl font-semibold text-(--text-primary)">
                  ${summary.tokenPrice.toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
                  ROI
                </p>
                <p className="text-xl font-semibold text-(--prosperity-primary)">
                  {(summary.roi * 100).toFixed(1)}%
                </p>
              </div>
              <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
                  Guardrails
                </p>
                <p className="text-(--text-secondary)">
                  Max tx $1,000 • Daily $5,000 • Proof hash + PDA decode
                </p>
              </div>
            </div>
          </GlassCard>
        </ContentSection>

        <ContentSection
          title="Investment Interface"
          description="Purchase tokens with built-in safety constraints and transparent pricing"
        >
          <InvestForm tokenPrice={summary.tokenPrice} />
        </ContentSection>
      </Stack>
    </PageLayout>
  );
}
