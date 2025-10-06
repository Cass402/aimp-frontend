import { Suspense } from "react";

import { GlassCard } from "@/components/ui/glass-card";
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
  const [summary, assets, explanations] = await Promise.all([
    getPortfolioSummary(),
    getPortfolioAssets(),
    getLatestExplanations(),
  ]);

  return (
    <div className="space-y-10 pb-16">
      <PortfolioSummaryCard summary={summary} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <DecisionFeed explanations={explanations} />
        <Suspense
          fallback={
            <GlassCard
              padding="lg"
              variant="neural"
              aiState="processing"
              trustLevel="medium"
            >
              Loading upcoming actions…
            </GlassCard>
          }
        >
          <UpcomingActions />
        </Suspense>
      </div>
      <HoldingsTable assets={assets} />
    </div>
  );
}
