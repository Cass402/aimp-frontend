/**
 * ExplanationModal - AI Decision Transparency Interface
 *
 * The cornerstone of AIMP's explainability-first architecture. Every AI decision
 * can be inspected, traced, and understood through this modal.
 *
 * Design Philosophy:
 * - **Transparency by Default**: No hidden reasoning
 * - **Traceability**: Full provenance from sensors → AI → action
 * - **Verifiability**: zkProof hashes for cryptographic guarantee
 * - **Human-Readable**: Technical depth without jargon overload
 *
 * Information Architecture:
 * 1. Decision Summary (what was decided)
 * 2. Agent Reasoning (why it was decided)
 * 3. Input Constraints (safety bounds checked)
 * 4. Data Sources (provenance with freshness)
 * 5. Cryptographic Proof (verification hash)
 * 6. Alternative Actions (what was considered but rejected)
 *
 * Behavioral Psychology:
 * - Calm revelation: Information unfolds, not overwhelms
 * - Confidence signals: Visual trust indicators throughout
 * - Escape hatches: Close/dismiss always visible
 * - Progressive disclosure: Summary → details → technical
 *
 * @see PRD Section 5.1 - Explainability-First Design
 * @see PRD Section 7.3 - Dashboard Calm Precision Core
 */

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { formatFreshness } from "@/lib/format";
import { COLORS, MOTION, BEHAVIOR, PERFORMANCE } from "@/lib/constants";
import type {
  AgentPersona,
  ProofArtifact,
  OperationalStatus,
} from "@/lib/types";

import { GlassCard } from "@/components/ui/glass-card";
import { ProofBadge } from "@/components/primitives/ProofBadge";
import { StatPill } from "@/components/primitives/StatPill";
import { HealthDot } from "@/components/primitives/HealthDot";
import {
  AgentMotion,
  TrustMathMotion,
  TrustDecayMotion,
  OperationalMotion,
  StatusChange,
  PressInteraction,
  InstantFeedback,
  EmergencyOverride,
  ProofGlow,
  Stagger,
  Breathing,
  Shimmer,
  FlowAnimation,
  GovernanceMotion,
} from "@/components/primitives/Motion";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Input data source for decision
 */
export interface DecisionInput {
  /** Input parameter key */
  key: string;

  /** Input value (any type) */
  value: string | number | boolean;

  /** Data source identifier (e.g., "oracle:pyth", "sensor:panel-a1") */
  source: string;

  /** Data freshness in seconds */
  freshnessSeconds: number;

  /** Trust score for this input (0-100) */
  trustScore?: number;
}

/**
 * Safety constraint validated
 */
export interface Constraint {
  /** Constraint description */
  description: string;

  /** Whether constraint was satisfied */
  satisfied: boolean;

  /** Constraint limit value */
  limit?: string | number;

  /** Actual value that was checked */
  actual?: string | number;
}

/**
 * Alternative action that was considered
 */
export interface AlternativeAction {
  /** Action description */
  action: string;

  /** Reason it was rejected */
  rejectionReason: string;

  /** Confidence score if it was chosen */
  alternativeConfidence?: number;
}

/**
 * Full explanation payload
 */
export interface Explanation {
  /** Unique explanation ID */
  id: string;

  /** Agent persona that made the decision */
  agent: AgentPersona;

  /** Decision summary (one line) */
  summary: string;

  /** Detailed reasoning steps */
  reasoning: string[];

  /** Safety constraints validated */
  constraints: Constraint[];

  /** Input data sources */
  inputs: DecisionInput[];

  /** Cryptographic proof artifact */
  proof?: ProofArtifact;

  /** Alternative actions considered */
  alternatives?: AlternativeAction[];

  /** Decision timestamp */
  timestamp: string;

  /** Decision confidence score (0-100) */
  confidence?: number;

  /** Impact level (low/medium/high/critical) */
  impact?: "low" | "medium" | "high" | "critical";
}

/**
 * ExplanationModal props
 */
export interface ExplanationModalProps {
  /** Explanation to display */
  explanation: Explanation | null;

  /** Whether modal is open */
  isOpen: boolean;

  /** Close handler */
  onClose: () => void;

  /** Optional override handler (for critical decisions) */
  onOverride?: () => void;

  /** Custom className */
  className?: string;
}

// ============================================================================
// AGENT METADATA
// ============================================================================

const AGENT_METADATA: Record<
  AgentPersona,
  { name: string; color: string; icon: string }
> = {
  operations: {
    name: "Operations Agent",
    color: COLORS.agent.operations,
    icon: "⚡",
  },
  markets: {
    name: "Markets Agent",
    color: COLORS.agent.markets,
    icon: "📊",
  },
  sentinel: {
    name: "Sentinel Agent",
    color: COLORS.agent.maintenance, // Using maintenance color for sentinel
    icon: "🛡️",
  },
  governor: {
    name: "Governor Agent",
    color: COLORS.agent.governance, // Using governance color for governor
    icon: "⚖️",
  },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Modal backdrop with blur
 */
function ModalBackdrop({
  className,
  onClick,
  agent,
}: {
  className?: string;
  onClick?: () => void;
  agent?: AgentPersona;
}) {
  // Agent-specific backdrop tints for contextual atmosphere
  const agentTint = agent
    ? {
        operations: "bg-[#10b981]/5", // Emerald tint for operations
        markets: "bg-[#3b82f6]/5", // Blue tint for markets
        sentinel: "bg-[#f59e0b]/5", // Amber tint for sentinel
        governor: "bg-[#8b5cf6]/5", // Purple tint for governance
      }[agent]
    : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: MOTION.duration.normal / 1000 }}
      onClick={onClick}
      style={{ backdropFilter: "blur(8px)" }}
      className={cn(
        "fixed inset-0 z-50",
        "bg-background/80",
        agentTint,
        "cursor-pointer",
        className
      )}
    />
  );
}

/**
 * Agent header badge with agent-specific motion and breathing icon
 */
function AgentHeader({
  agent,
  timestamp,
}: {
  agent: AgentPersona;
  timestamp: string;
}) {
  const metadata = AGENT_METADATA[agent];

  return (
    <AgentMotion agent={agent}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Breathing rhythm="slow" agent={agent}>
            <span className="text-2xl" role="img" aria-label={metadata.name}>
              {metadata.icon}
            </span>
          </Breathing>
          <div>
            <h3 className="text-body-lg font-semibold" data-agent={agent}>
              {metadata.name}
            </h3>
            <StatusChange triggerKey={timestamp}>
              <p className="text-body-sm text-foreground-secondary">
                {new Date(timestamp).toLocaleString()}
              </p>
            </StatusChange>
          </div>
        </div>
      </div>
    </AgentMotion>
  );
}

/**
 * Decision summary section with operational status mapping and governance motion
 */
function DecisionSummary({
  summary,
  confidence,
  impact,
  agent,
}: {
  summary: string;
  confidence?: number;
  impact?: string;
  agent: AgentPersona;
}) {
  // Map confidence/impact to operational status
  const operationalStatus: OperationalStatus = (() => {
    if (
      impact === "critical" ||
      (confidence !== undefined && confidence < 50)
    ) {
      return "fault";
    }
    if (confidence !== undefined && confidence >= 90) {
      return "optimal";
    }
    if (confidence !== undefined && confidence >= 70) {
      return "nominal";
    }
    return "degraded";
  })();

  const isFaultState = operationalStatus === "fault";

  // Use GovernanceMotion for governor agent, OperationalMotion for others
  const MotionWrapper =
    agent === "governor" ? GovernanceMotion : OperationalMotion;
  const motionProps =
    agent === "governor"
      ? {
          state: isFaultState
            ? "violated"
            : ("compliant" as
                | "violated"
                | "compliant"
                | "enforcing"
                | "voting"),
        }
      : { operationalStatus, delay: BEHAVIOR.confidenceDelay / 1000 };

  const content = (
    <div className="space-y-3">
      <h4 className="text-body-sm font-semibold text-foreground-secondary uppercase tracking-wide">
        Decision
      </h4>
      <p className="text-body-lg text-foreground-primary leading-relaxed">
        {summary}
      </p>
      <div className="flex items-center gap-2">
        {confidence !== undefined && (
          <StatPill
            label={`Confidence: ${confidence}%`}
            status={
              confidence >= 90
                ? "verified"
                : confidence >= 70
                  ? "warning"
                  : "critical"
            }
            size="sm"
          />
        )}
        {impact && (
          <StatPill
            label={`Impact: ${impact}`}
            status={
              impact === "critical"
                ? "critical"
                : impact === "high"
                  ? "warning"
                  : "info"
            }
            size="sm"
          />
        )}
      </div>
    </div>
  );

  // Wrap fault states in breathing animation for critical attention
  if (isFaultState) {
    return (
      <MotionWrapper {...motionProps}>
        <Breathing rhythm="fast">{content}</Breathing>
      </MotionWrapper>
    );
  }

  return <MotionWrapper {...motionProps}>{content}</MotionWrapper>;
}

/**
 * Reasoning steps section with flow animations for energy decisions
 */
function ReasoningSteps({
  reasoning,
  agent,
}: {
  reasoning: string[];
  agent: AgentPersona;
}) {
  // Check if this is an energy-related decision (operations/sentinel agents)
  const isEnergyDecision = agent === "operations" || agent === "sentinel";

  return (
    <div className="space-y-3">
      <h4 className="text-body-sm font-semibold text-foreground-secondary uppercase tracking-wide">
        Reasoning
      </h4>
      <Stagger staggerDelay={0.05} variant="slide-up">
        {reasoning.map((step, index) => (
          <div key={index} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-glass-medium border border-glass-border flex items-center justify-center text-detail-xs font-mono">
              {index + 1}
            </span>
            <div className="flex-1">
              {isEnergyDecision ? (
                <FlowAnimation direction="bidirectional">
                  <p className="text-body-sm text-foreground-primary leading-relaxed">
                    {step}
                  </p>
                </FlowAnimation>
              ) : (
                <p className="text-body-sm text-foreground-primary leading-relaxed">
                  {step}
                </p>
              )}
            </div>
          </div>
        ))}
      </Stagger>
    </div>
  );
}

/**
 * Constraints section with status change animations and health indicators
 */
function ConstraintsSection({ constraints }: { constraints: Constraint[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-body-sm font-semibold text-foreground-secondary uppercase tracking-wide">
        Safety Constraints
      </h4>
      <div className="space-y-2">
        {constraints.map((constraint, index) => (
          <StatusChange
            key={index}
            triggerKey={`${constraint.satisfied}-${index}`}
          >
            <div
              className={cn(
                "p-3 rounded-glass-sm border",
                constraint.satisfied
                  ? "bg-status-verified/5 border-status-verified/30"
                  : "bg-status-critical/5 border-status-critical/30"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <HealthDot
                    status={constraint.satisfied ? "healthy" : "critical"}
                    size="sm"
                  />
                  <div className="flex-1">
                    <p className="text-body-sm text-foreground-primary">
                      {constraint.description}
                    </p>
                    {(constraint.limit !== undefined ||
                      constraint.actual !== undefined) && (
                      <p className="text-detail-sm text-foreground-tertiary mt-1">
                        {constraint.limit !== undefined &&
                          `Limit: ${constraint.limit}`}
                        {constraint.limit !== undefined &&
                          constraint.actual !== undefined &&
                          " • "}
                        {constraint.actual !== undefined &&
                          `Actual: ${constraint.actual}`}
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={cn(
                    "text-lg",
                    constraint.satisfied
                      ? "text-status-verified"
                      : "text-status-critical"
                  )}
                >
                  {constraint.satisfied ? "✓" : "✗"}
                </span>
              </div>
            </div>
          </StatusChange>
        ))}
      </div>
    </div>
  );
}

/**
 * Data sources section with trust mathematics and decay animations
 */
function DataSourcesSection({ inputs }: { inputs: DecisionInput[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-body-sm font-semibold text-foreground-secondary uppercase tracking-wide">
        Data Sources
      </h4>
      <div className="space-y-2">
        {inputs.map((input, index) => {
          const isStale = input.freshnessSeconds > PERFORMANCE.freshness.stale; // 300s
          const trustStatus = input.trustScore
            ? input.trustScore >= 90
              ? "verified"
              : input.trustScore >= 70
                ? "warning"
                : "critical"
            : undefined;

          // Build trust mathematics payload
          const trustMath = input.trustScore
            ? {
                confidenceScore: input.trustScore / 100,
                witnessCount: 1, // Single source
                deviationSigma:
                  input.trustScore >= 90
                    ? 0.5
                    : input.trustScore >= 70
                      ? 1.0
                      : 2.0,
                exceedsThreshold:
                  input.trustScore >= PERFORMANCE.trust.excellent,
                trustGrade: (input.trustScore >= 90
                  ? "excellent"
                  : input.trustScore >= 70
                    ? "good"
                    : "fair") as
                  | "excellent"
                  | "good"
                  | "fair"
                  | "poor"
                  | "suspect",
              }
            : undefined;

          const DataSourceContent = (
            <div className="p-3 rounded-glass-sm bg-glass-light border border-glass-border">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-body-sm font-mono font-semibold text-foreground-primary">
                      {input.key}
                    </span>
                    {input.trustScore !== undefined && (
                      <StatPill
                        label={`${input.trustScore}%`}
                        status={trustStatus}
                        size="sm"
                      />
                    )}
                  </div>
                  <p className="text-body-sm text-foreground-primary mb-2">
                    {String(input.value)}
                  </p>
                  <div className="flex items-center gap-2 text-detail-xs text-foreground-tertiary">
                    <span className="font-mono">{input.source}</span>
                    <span>•</span>
                    <span className={cn(isStale && "text-status-warning")}>
                      {formatFreshness(input.freshnessSeconds)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );

          // Wrap with TrustDecayMotion if stale, TrustMathMotion if has trust score
          // Add Shimmer for stale data to indicate refreshing
          if (isStale) {
            const decayContent = (
              <TrustDecayMotion
                key={index}
                dataAgeSeconds={input.freshnessSeconds}
              >
                {DataSourceContent}
              </TrustDecayMotion>
            );

            return (
              <Shimmer key={index} isLoading={isStale}>
                {decayContent}
              </Shimmer>
            );
          }

          if (trustMath) {
            return (
              <TrustMathMotion key={index} trustMath={trustMath}>
                {DataSourceContent}
              </TrustMathMotion>
            );
          }

          return <div key={index}>{DataSourceContent}</div>;
        })}
      </div>
    </div>
  );
}

/**
 * Proof section with glow animation
 */
function ProofSection({ proof }: { proof?: ProofArtifact }) {
  if (!proof) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-body-sm font-semibold text-foreground-secondary uppercase tracking-wide">
        Cryptographic Proof
      </h4>
      <ProofGlow
        verified={proof.verification.verified}
        proofType={
          proof.proofType === "zk_snark" || proof.proofType === "zk_stark"
            ? "zkProof"
            : "signature"
        }
      >
        <div className="p-4 rounded-glass-sm bg-glass-light border border-glass-border">
          <div className="flex items-center gap-3 mb-3">
            <ProofBadge proof={proof} showTooltip={false} />
            <div>
              <p className="text-detail-sm font-semibold text-foreground-primary">
                {proof.proofType === "zk_snark" ||
                proof.proofType === "zk_stark"
                  ? "Zero-Knowledge Proof"
                  : proof.proofType === "signature"
                    ? "Cryptographic Signature"
                    : "Cryptographic Proof"}
              </p>
              <p className="text-detail-xs text-foreground-tertiary">
                {proof.verification.verified
                  ? "Verified on-chain"
                  : "Pending verification"}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-detail-xs text-foreground-tertiary">
                Proof Data:
              </span>
              <p className="text-detail-sm font-mono text-foreground-secondary break-all">
                {proof.proofData.slice(0, 20)}...{proof.proofData.slice(-20)}
              </p>
            </div>
            {proof.creationTime && (
              <div>
                <span className="text-detail-xs text-foreground-tertiary">
                  Timestamp:
                </span>
                <p className="text-detail-sm text-foreground-secondary">
                  {new Date(proof.creationTime).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </ProofGlow>
    </div>
  );
}

/**
 * Alternatives section with status change animations and confidence bars
 */
function AlternativesSection({
  alternatives,
  chosenConfidence,
}: {
  alternatives?: AlternativeAction[];
  chosenConfidence?: number;
}) {
  if (!alternatives || alternatives.length === 0) return null;

  // Find max confidence for scaling bars
  const maxConfidence = Math.max(
    chosenConfidence || 0,
    ...alternatives.map((a) => a.alternativeConfidence || 0)
  );

  return (
    <div className="space-y-3">
      <h4 className="text-body-sm font-semibold text-foreground-secondary uppercase tracking-wide">
        Alternatives Considered
      </h4>
      <div className="space-y-2">
        {alternatives.map((alt, index) => (
          <StatusChange
            key={index}
            triggerKey={`${alt.action}-${alt.alternativeConfidence}-${index}`}
          >
            <div className="p-3 rounded-glass-sm bg-glass-light border border-glass-border opacity-70">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <p className="text-body-sm text-foreground-primary mb-1">
                    {alt.action}
                  </p>
                  <p className="text-detail-sm text-foreground-tertiary">
                    Rejected: {alt.rejectionReason}
                  </p>
                </div>
                {alt.alternativeConfidence !== undefined && (
                  <span className="text-detail-sm font-semibold text-foreground-secondary">
                    {alt.alternativeConfidence}%
                  </span>
                )}
              </div>

              {/* Confidence comparison bar */}
              {alt.alternativeConfidence !== undefined && maxConfidence > 0 && (
                <div className="relative h-1 bg-glass-medium rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(alt.alternativeConfidence / maxConfidence) * 100}%`,
                    }}
                    transition={{
                      duration: MOTION.duration.slow / 1000,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: index * 0.05,
                    }}
                    className="absolute inset-y-0 left-0 bg-status-warning/50"
                  />
                </div>
              )}
            </div>
          </StatusChange>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * ExplanationModal - Full AI decision transparency interface
 *
 * @example
 * ```tsx
 * const [explanation, setExplanation] = useState<Explanation | null>(null);
 *
 * <ExplanationModal
 *   explanation={explanation}
 *   isOpen={!!explanation}
 *   onClose={() => setExplanation(null)}
 *   onOverride={() => {
 *     // Handle emergency override
 *     console.log("Decision overridden by human");
 *   }}
 * />
 * ```
 */
export function ExplanationModal({
  explanation,
  isOpen,
  onClose,
  onOverride,
  className,
}: ExplanationModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && explanation && (
        <>
          {/* Backdrop */}
          <ModalBackdrop onClick={onClose} agent={explanation.agent} />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                duration: MOTION.duration.normal / 1000,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={cn(
                "relative w-full max-w-3xl max-h-[90vh]",
                "pointer-events-auto",
                className
              )}
            >
              <GlassCard className="overflow-hidden">
                {/* Scrollable content wrapped in agent motion */}
                <AgentMotion agent={explanation.agent} delay={0.1}>
                  <div className="overflow-y-auto max-h-[calc(90vh-4rem)] custom-scrollbar">
                    <div className="p-6 space-y-6">
                      {/* Header - already uses AgentMotion */}
                      <AgentHeader
                        agent={explanation.agent}
                        timestamp={explanation.timestamp}
                      />

                      {/* Decision Summary - already uses OperationalMotion */}
                      <DecisionSummary
                        summary={explanation.summary}
                        confidence={explanation.confidence}
                        impact={explanation.impact}
                        agent={explanation.agent}
                      />

                      {/* Reasoning */}
                      <AgentMotion
                        agent={explanation.agent}
                        delay={BEHAVIOR.confidenceDelay / 1000 + 0.1}
                      >
                        <ReasoningSteps
                          reasoning={explanation.reasoning}
                          agent={explanation.agent}
                        />
                      </AgentMotion>

                      {/* Constraints */}
                      {explanation.constraints.length > 0 && (
                        <AgentMotion
                          agent={explanation.agent}
                          delay={BEHAVIOR.confidenceDelay / 1000 + 0.15}
                        >
                          <ConstraintsSection
                            constraints={explanation.constraints}
                          />
                        </AgentMotion>
                      )}

                      {/* Data Sources */}
                      <AgentMotion
                        agent={explanation.agent}
                        delay={BEHAVIOR.confidenceDelay / 1000 + 0.2}
                      >
                        <DataSourcesSection inputs={explanation.inputs} />
                      </AgentMotion>

                      {/* Proof */}
                      <AgentMotion
                        agent={explanation.agent}
                        delay={BEHAVIOR.confidenceDelay / 1000 + 0.25}
                      >
                        <ProofSection proof={explanation.proof} />
                      </AgentMotion>

                      {/* Alternatives */}
                      <AgentMotion
                        agent={explanation.agent}
                        delay={BEHAVIOR.confidenceDelay / 1000 + 0.3}
                      >
                        <AlternativesSection
                          alternatives={explanation.alternatives}
                          chosenConfidence={explanation.confidence}
                        />
                      </AgentMotion>
                    </div>
                  </div>
                </AgentMotion>

                {/* Footer with actions */}
                <div className="border-t border-glass-border p-4 bg-glass-light">
                  <div className="flex items-center justify-between gap-3">
                    <PressInteraction>
                      <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-glass-sm text-body-sm font-medium text-foreground-primary hover:bg-glass-medium transition-colors duration-normal"
                      >
                        Close
                      </button>
                    </PressInteraction>

                    {onOverride && (
                      <EmergencyOverride isActive={true}>
                        <InstantFeedback>
                          <PressInteraction>
                            <button
                              onClick={() => {
                                onOverride();
                                onClose();
                              }}
                              className="px-4 py-2 rounded-glass-sm text-body-sm font-semibold text-status-critical border border-status-critical/30 hover:bg-status-critical/10 transition-colors duration-normal"
                            >
                              Override Decision
                            </button>
                          </PressInteraction>
                        </InstantFeedback>
                      </EmergencyOverride>
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* Close button (top-right) */}
              <PressInteraction>
                <button
                  onClick={onClose}
                  className={cn(
                    "absolute -top-2 -right-2",
                    "w-8 h-8 rounded-full",
                    "bg-glass-medium border border-glass-border",
                    "flex items-center justify-center",
                    "text-foreground-secondary hover:text-foreground-primary",
                    "hover:bg-glass-heavy",
                    "transition-colors duration-fast",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                  aria-label="Close explanation"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </PressInteraction>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default ExplanationModal;
