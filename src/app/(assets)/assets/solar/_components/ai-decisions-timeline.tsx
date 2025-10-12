/**
 * AI Decisions Timeline Component
 *
 * Displays recent AI agent decisions for this specific asset
 * with clickable cards that open detailed explanations.
 */

"use client";

import * as React from "react";

import {
  AgentCard,
  AgentCardGrid,
  type AgentDecision,
} from "@/components/intelligence/AgentCard";
import { ExplanationModal } from "@/components/intelligence/ExplanationModal";

interface AIDecisionsTimelineProps {
  decisions: AgentDecision[];
}

async function fetchExplanation(decisionId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/explanations/${decisionId}`);
  if (!response.ok) throw new Error("Failed to fetch explanation");
  const json = await response.json();
  return json.data;
}

export function AIDecisionsTimeline({ decisions }: AIDecisionsTimelineProps) {
  const [selectedDecision, setSelectedDecision] =
    React.useState<AgentDecision | null>(null);
  const [isExplanationOpen, setIsExplanationOpen] = React.useState(false);
  const [explanation, setExplanation] = React.useState<Record<
    string,
    unknown
  > | null>(null);

  // Fetch explanation when decision is selected
  React.useEffect(() => {
    if (selectedDecision && isExplanationOpen && !explanation) {
      fetchExplanation(selectedDecision.id)
        .then((data) => {
          setExplanation(data);
        })
        .catch((error) => {
          console.error("Failed to fetch explanation:", error);
        });
    }
  }, [selectedDecision, isExplanationOpen, explanation]);

  const handleDecisionClick = React.useCallback((decision: AgentDecision) => {
    setSelectedDecision(decision);
    setExplanation(null); // Reset explanation when selecting new decision
    setIsExplanationOpen(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setIsExplanationOpen(false);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-(--text-primary)">
          AI Decision Timeline
        </h2>
        <span className="text-sm text-(--text-tertiary)">
          {decisions.length} recent decisions
        </span>
      </div>

      <AgentCardGrid columns={2}>
        {decisions.map((decision) => (
          <AgentCard
            key={decision.id}
            decision={decision}
            onClick={handleDecisionClick}
            showExpandHint
          />
        ))}
      </AgentCardGrid>

      {/* Explanation Modal */}
      {selectedDecision && (
        <ExplanationModal
          isOpen={isExplanationOpen}
          onClose={handleCloseModal}
          explanation={
            explanation as unknown as Parameters<
              typeof ExplanationModal
            >[0]["explanation"]
          }
        />
      )}
    </div>
  );
}
