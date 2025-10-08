import { Suspense } from "react";

import { GlassCard } from "@/components/ui/glass-card";
import { PageLayout } from "@/app/_components/page-layout";
import { Grid, Stack } from "@/components/ui/layout";
import { ContentSection } from "@/components/ui/page-structure";
import {
  getLatestExplanations,
  getPortfolioAssets,
  getPortfolioSummary,
  getUpcomingActions,
} from "@/lib/data";

import { DecisionFeed } from "./_components/decision-feed";
import { HoldingsTable } from "./_components/holdings-table";
import { PortfolioSummaryCard } from "./_components/portfolio-summary";

export const revalidate = 60;

async function UpcomingActions() {
  const { actions } = await getUpcomingActions();

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="processing"
      trustLevel="medium"
      className="space-y-4"
    >
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
            Upcoming actions
          </p>
          <h3 className="text-lg font-semibold text-(--text-primary)">
            Next AI moves with guardrails
          </h3>
        </div>
      </header>
      <ul className="space-y-4 text-sm text-(--text-secondary)">
        {actions.map((action) => (
          <li
            key={action.title}
            className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
                {new Date(action.startAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-base font-semibold text-(--text-primary)">
                {action.title}
              </span>
              <span>{action.reason}</span>
              <div className="flex flex-wrap gap-2 pt-2 text-[0.7rem] uppercase tracking-[0.12em]">
                {action.constraints.map((constraint) => (
                  <span
                    key={constraint}
                    className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-3 py-1 text-(--text-secondary)"
                  >
                    {constraint}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default async function DashboardPage() {
  const [portfolioSummary, portfolioAssets, explanations] = await Promise.all([
    getPortfolioSummary(),
    getPortfolioAssets(),
    getLatestExplanations(),
  ]);

  return (
    <PageLayout
      header={{
        category: "Portfolio overview",
        title: "Autonomous Infrastructure Dashboard",
        description:
          "Monitor your AI-managed assets, track performance, and review recent AI decisions with full explainability.",
        variant: "default",
      }}
    >
      <Stack space="lg" className="pb-16">
        {/* Portfolio Summary Section */}
        <ContentSection
          title="Portfolio Performance"
          description="Real-time performance metrics and asset health overview"
          spacing="md"
        >
          <Grid cols={1}>
            <Suspense
              fallback={
                <GlassCard
                  padding="lg"
                  variant="neural"
                  isLoading
                  className="h-48"
                >
                  Loading portfolio summary...
                </GlassCard>
              }
            >
              <PortfolioSummaryCard summary={portfolioSummary} />
            </Suspense>
          </Grid>
        </ContentSection>

        {/* Two-column layout for main content */}
        <Grid cols={2} gap="lg">
          {/* Left column: Decision Feed */}
          <ContentSection
            title="AI Decision History"
            description="Latest autonomous decisions with full explainability"
            spacing="md"
          >
            <Suspense
              fallback={
                <GlassCard
                  padding="lg"
                  variant="neural"
                  isLoading
                  className="h-96"
                >
                  Loading decision feed...
                </GlassCard>
              }
            >
              <DecisionFeed explanations={explanations} />
            </Suspense>
          </ContentSection>

          {/* Right column: Upcoming Actions & Holdings */}
          <Stack space="lg">
            <ContentSection
              title="Upcoming Actions"
              description="Planned AI operations with safety constraints"
              spacing="md"
            >
              <Suspense
                fallback={
                  <GlassCard
                    padding="lg"
                    variant="neural"
                    isLoading
                    className="h-64"
                  >
                    Loading upcoming actions...
                  </GlassCard>
                }
              >
                <UpcomingActions />
              </Suspense>
            </ContentSection>

            <ContentSection
              title="Asset Holdings"
              description="Your tokenized infrastructure assets"
              spacing="md"
            >
              <Suspense
                fallback={
                  <GlassCard
                    padding="lg"
                    variant="neural"
                    isLoading
                    className="h-80"
                  >
                    Loading holdings table...
                  </GlassCard>
                }
              >
                <HoldingsTable assets={portfolioAssets} />
              </Suspense>
            </ContentSection>
          </Stack>
        </Grid>
      </Stack>
    </PageLayout>
  );
}
