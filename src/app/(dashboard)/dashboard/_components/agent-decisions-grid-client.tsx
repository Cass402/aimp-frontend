/**
 * AgentDecisionsGridClient - Client wrapper for interactive decision cards
 */

"use client";

import * as React from "react";
import {
  AgentCard,
  type AgentDecision,
} from "@/components/intelligence/AgentCard";
import {
  ExplanationModal,
  type Explanation,
} from "@/components/intelligence/ExplanationModal";

interface AgentDecisionsGridClientProps {
  decisions: AgentDecision[];
}

// Fetch explanation from API
async function fetchExplanation(
  decisionId: string
): Promise<Explanation | null> {
  const response = await fetch(`/api/explanations/${decisionId}`);

  if (!response.ok) {
    console.error("Failed to fetch explanation");
    return null;
  }

  const json = await response.json();
  return json.data;
}

export function AgentDecisionsGridClient({
  decisions,
}: AgentDecisionsGridClientProps) {
  const [selectedDecision, setSelectedDecision] =
    React.useState<AgentDecision | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [explanation, setExplanation] = React.useState<Explanation | null>(
    null
  );
  const [isLoadingExplanation, setIsLoadingExplanation] = React.useState(false);

  const handleDecisionClick = React.useCallback(
    async (decision: AgentDecision) => {
      setSelectedDecision(decision);
      setIsModalOpen(true);
      setIsLoadingExplanation(true);

      try {
        const exp = await fetchExplanation(decision.id);
        setExplanation(exp);
      } catch (error) {
        console.error("Failed to fetch explanation:", error);
      } finally {
        setIsLoadingExplanation(false);
      }
    },
    []
  );

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
    setSelectedDecision(null);
    setExplanation(null);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {decisions.map((decision) => (
          <AgentCard
            key={decision.id}
            decision={decision}
            onClick={handleDecisionClick}
            showExpandHint
          />
        ))}
      </div>

      {/* Explanation Modal */}
      {selectedDecision && (
        <ExplanationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          explanation={isLoadingExplanation ? null : explanation}
        />
      )}
    </>
  );
}
