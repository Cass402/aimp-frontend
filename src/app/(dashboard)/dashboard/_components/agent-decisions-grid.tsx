/**
 * AgentDecisionsGrid - AI Agent Decision Cards
 *
 * Grid display of recent autonomous agent decisions with
 * confidence scores, impact levels, and expand-to-explain interactions.
 *
 * @see PRD Section 7.3 - Dashboard Agent Activity
 */

import { GlassCard } from "@/components/ui/glass-card";
import { AgentDecisionsGridClient } from "./agent-decisions-grid-client";

// Fetch agent decisions from API
async function getAgentDecisions() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/agents/decisions?limit=12&format=standard`,
      {
        next: { revalidate: 15 }, // Refresh every 15 seconds
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch agent decisions:", response.statusText);
      return [];
    }

    const json = await response.json();

    // The API returns { data: [...decisions...] } where data is the array directly
    return json.data || [];
  } catch (error) {
    console.error("Error fetching agent decisions:", error);
    return [];
  }
}

export async function AgentDecisionsGrid() {
  const decisions = await getAgentDecisions();

  // Handle empty state
  if (!decisions || decisions.length === 0) {
    return (
      <GlassCard
        padding="lg"
        variant="neural"
        aiState="idle"
        trustLevel="high"
        className="space-y-6"
      >
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
              Recent Decisions
            </p>
            <h3 className="text-xl font-semibold text-(--text-primary)">
              No recent agent decisions
            </h3>
          </div>
        </header>
        <div className="text-center py-8">
          <p className="text-(--text-secondary)">
            Agent decision history will appear here once AI operations begin.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="learning"
      trustLevel="high"
      className="space-y-6"
    >
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
            Recent Decisions
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            {decisions.length} autonomous actions with full transparency
          </h3>
        </div>
      </header>

      <AgentDecisionsGridClient decisions={decisions} />

      <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
        <p className="text-sm text-(--text-secondary)">
          Click any decision to view detailed reasoning, constraints, and data
          sources. All actions are logged on-chain with cryptographic proofs.
        </p>
      </div>
    </GlassCard>
  );
}
