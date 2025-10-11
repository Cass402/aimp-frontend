/**
 * AgentCard - Compact AI Agent Decision Card
 *
 * Displays agent decisions at-a-glance with expand-to-explain interaction.
 * Primary surface for AI activity visualization on the dashboard.
 *
 * Design Philosophy:
 * - **Glanceable**: Key decision visible without interaction
 * - **Trustworthy**: Agent identity, confidence, timestamp always shown
 * - **Progressive**: Click to expand full explanation
 * - **Contextual**: Visual state reflects decision importance
 *
 * Information Hierarchy:
 * 1. Agent identity (icon + name + persona color)
 * 2. Decision summary (one sentence)
 * 3. Confidence score (visual trust indicator)
 * 4. Timestamp (relative freshness)
 * 5. Impact badge (if high/critical)
 * 6. Expand affordance (subtle "View Details" hint)
 *
 * Interaction Model:
 * - Hover: Subtle glow (agent persona color)
 * - Click: Opens ExplanationModal with full reasoning
 * - Keyboard: Tab + Enter accessible
 *
 * Performance:
 * - Lazy proof rendering (only if expanded)
 * - Memoized timestamp formatting
 * - GPU-accelerated hover states
 *
 * @see PRD Section 7.3 - Dashboard Calm Precision Core
 * @see PRD Section 8.2 - Agent Decision Card (API)
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import { PERFORMANCE } from "@/lib/constants";
import type {
  AgentPersona,
  OperationalStatus,
  TrustGrade,
} from "@/lib/types/core";

import { GlassCard } from "@/components/ui/glass-card";
import { StatPill } from "@/components/primitives/StatPill";
import { HealthDot } from "@/components/primitives/HealthDot";
import {
  AgentMotion,
  Breathing,
  StatusChange,
  TrustMathMotion,
  TrustDecayMotion,
  OperationalMotion,
  PressInteraction,
  InstantFeedback,
  ProofGlow,
  FlowAnimation,
  GovernanceMotion,
  Shimmer,
  Stagger,
  EmergencyOverride,
} from "@/components/primitives/Motion";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Agent decision preview (minimal payload for card display)
 */
export interface AgentDecision {
  /** Unique decision ID */
  id: string;

  /** Agent persona */
  agent: AgentPersona;

  /** Decision summary (one sentence) */
  summary: string;

  /** Decision confidence (0-100) */
  confidence: number;

  /** Decision timestamp (ISO 8601) */
  timestamp: string;

  /** Impact level */
  impact?: "low" | "medium" | "high" | "critical";

  /** Whether decision is currently active/executing */
  isActive?: boolean;

  /** Number of constraints validated */
  constraintsCount?: number;

  /** Number of data sources used */
  inputsCount?: number;

  /** Whether any constraints were violated */
  hasConstraintViolations?: boolean;

  /** Whether decision is in maintenance mode */
  isInMaintenance?: boolean;
}

/**
 * AgentCard props
 */
export interface AgentCardProps {
  /** Agent decision to display */
  decision: AgentDecision;

  /** Click handler (opens explanation modal) */
  onClick?: (decision: AgentDecision) => void;

  /** Whether card is in loading state */
  isLoading?: boolean;

  /** Whether card is disabled/non-interactive */
  disabled?: boolean;

  /** Custom className */
  className?: string;

  /** Show expand hint text */
  showExpandHint?: boolean;

  /** Compact mode (smaller padding, reduced text) */
  compact?: boolean;

  /** Whether decision is in emergency override state */
  isOverridden?: boolean;
}

// ============================================================================
// AGENT METADATA
// ============================================================================

const AGENT_CONFIG: Record<
  AgentPersona,
  { icon: string; label: string; glowClass: string }
> = {
  operations: {
    icon: "⚡",
    label: "Operations",
    glowClass: "hover:shadow-glow-operations",
  },
  markets: {
    icon: "📊",
    label: "Markets",
    glowClass: "hover:shadow-glow-markets",
  },
  sentinel: {
    icon: "🛡️",
    label: "Sentinel",
    glowClass: "hover:shadow-glow-sentinel",
  },
  governor: {
    icon: "⚖️",
    label: "Governor",
    glowClass: "hover:shadow-glow-governance",
  },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Agent header (icon + name + timestamp) with freshness decay and stale badge
 */
function AgentHeader({
  agent,
  timestamp,
  isActive,
  compact,
}: {
  agent: AgentPersona;
  timestamp: string;
  isActive?: boolean;
  compact?: boolean;
}) {
  const config = AGENT_CONFIG[agent];
  const relativeTime = React.useMemo(
    () => formatRelativeTime(timestamp),
    [timestamp]
  );

  // Calculate data age for freshness decay
  const dataAgeSeconds = React.useMemo(() => {
    const now = Date.now();
    const decisionTime = new Date(timestamp).getTime();
    return Math.floor((now - decisionTime) / 1000);
  }, [timestamp]);

  const isStale = dataAgeSeconds > PERFORMANCE.freshness.stale; // 300s

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Breathing rhythm={isActive ? "medium" : "slow"} agent={agent}>
          <span
            className={cn(
              compact ? "text-lg" : "text-xl",
              isActive && "animate-pulse"
            )}
            role="img"
            aria-label={`${config.label} Agent`}
          >
            {config.icon}
          </span>
        </Breathing>
        <div>
          <p
            className={cn(
              "font-semibold",
              compact ? "text-detail-sm" : "text-body-sm"
            )}
            data-agent={agent}
          >
            {config.label}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Stale data badge */}
        {isStale && (
          <StatusChange triggerKey={`stale-${isStale}`}>
            <span className="px-2 py-0.5 rounded-glass-sm bg-status-warning/10 border border-status-warning/30 text-detail-xs font-semibold text-status-warning uppercase">
              Stale
            </span>
          </StatusChange>
        )}

        <TrustDecayMotion dataAgeSeconds={dataAgeSeconds}>
          <StatusChange triggerKey={timestamp}>
            <time
              className={cn(
                "text-foreground-tertiary",
                compact ? "text-detail-xs" : "text-detail-sm",
                isStale && "text-status-warning"
              )}
              dateTime={timestamp}
              title={new Date(timestamp).toLocaleString()}
            >
              {relativeTime}
            </time>
          </StatusChange>
        </TrustDecayMotion>
      </div>
    </div>
  );
}

/**
 * Decision summary with enhanced health indicators, witness count, and dynamic pills
 */
function DecisionContent({
  summary,
  confidence,
  impact,
  compact,
  agent,
  inputsCount,
  isInMaintenance,
}: {
  summary: string;
  confidence: number;
  impact?: string;
  compact?: boolean;
  agent: AgentPersona;
  inputsCount?: number;
  isInMaintenance?: boolean;
}) {
  const confidenceStatus =
    confidence >= 90 ? "verified" : confidence >= 70 ? "warning" : "critical";

  // Map confidence to trust grade
  const trustGrade: TrustGrade =
    confidence >= 90
      ? "excellent"
      : confidence >= 70
        ? "good"
        : confidence >= 50
          ? "fair"
          : confidence >= 30
            ? "poor"
            : "suspect";

  // Build trust mathematics payload with witness count
  const trustMath = {
    confidenceScore: confidence / 100,
    witnessCount: inputsCount || 1,
    deviationSigma: confidence >= 90 ? 0.5 : confidence >= 70 ? 1.0 : 2.0,
    exceedsThreshold: confidence >= PERFORMANCE.trust.excellent,
    trustGrade,
  };

  // Map to operational status with maintenance support
  const operationalStatus: OperationalStatus = isInMaintenance
    ? "maintenance"
    : impact === "critical" || confidence < 50
      ? "fault"
      : confidence >= 90
        ? "optimal"
        : confidence >= 70
          ? "nominal"
          : "degraded";

  // Health dot status with enhanced pulse speeds
  const healthStatus =
    operationalStatus === "optimal"
      ? "healthy"
      : operationalStatus === "fault"
        ? "critical"
        : "degraded";

  const pulseSpeed: "slow" | "medium" | "fast" | "none" =
    operationalStatus === "fault"
      ? "fast"
      : operationalStatus === "degraded"
        ? "medium"
        : "slow";

  // Determine if this is an energy decision for flow animation
  const isEnergyDecision = agent === "operations" || agent === "sentinel";

  const content = (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <HealthDot
          status={healthStatus}
          size="sm"
          className="mt-1"
          pulse={pulseSpeed}
        />
        <p
          className={cn(
            "text-foreground-primary leading-relaxed flex-1",
            compact ? "text-body-sm" : "text-body-md",
            "line-clamp-2" // Limit to 2 lines
          )}
        >
          {summary}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Confidence pill with StatusChange */}
        <StatusChange triggerKey={`confidence-${confidence}`}>
          <StatPill
            label={`${confidence}%`}
            status={confidenceStatus}
            size={compact ? "sm" : "md"}
            tooltipText={`Confidence: ${confidence}% (${trustGrade}) • ${inputsCount || 1} ${inputsCount === 1 ? "witness" : "witnesses"}`}
          />
        </StatusChange>

        {/* Impact pill with StatusChange */}
        {impact && (impact === "high" || impact === "critical") && (
          <StatusChange triggerKey={`impact-${impact}`}>
            <StatPill
              label={impact}
              status={impact === "critical" ? "critical" : "warning"}
              size={compact ? "sm" : "md"}
            />
          </StatusChange>
        )}

        {/* Maintenance badge */}
        {isInMaintenance && (
          <StatusChange triggerKey={`maintenance-${isInMaintenance}`}>
            <span className="px-2 py-0.5 rounded-glass-sm bg-status-info/10 border border-status-info/30 text-detail-xs font-semibold text-status-info uppercase">
              Maintenance
            </span>
          </StatusChange>
        )}
      </div>
    </div>
  );

  // Wrap with appropriate motion based on agent and status
  if (agent === "governor") {
    return (
      <GovernanceMotion
        state={operationalStatus === "fault" ? "violated" : "compliant"}
      >
        <TrustMathMotion trustMath={trustMath}>{content}</TrustMathMotion>
      </GovernanceMotion>
    );
  }

  if (isEnergyDecision) {
    return (
      <FlowAnimation
        direction={
          operationalStatus === "optimal"
            ? "charging"
            : operationalStatus === "maintenance"
              ? "idle"
              : "discharging"
        }
      >
        <OperationalMotion operationalStatus={operationalStatus}>
          <TrustMathMotion trustMath={trustMath}>{content}</TrustMathMotion>
        </OperationalMotion>
      </FlowAnimation>
    );
  }

  return (
    <OperationalMotion operationalStatus={operationalStatus}>
      <TrustMathMotion trustMath={trustMath}>{content}</TrustMathMotion>
    </OperationalMotion>
  );
}

/**
 * Metadata footer (constraints, inputs counts)
 */
function MetadataFooter({
  constraintsCount,
  inputsCount,
  compact,
}: {
  constraintsCount?: number;
  inputsCount?: number;
  compact?: boolean;
}) {
  if (!constraintsCount && !inputsCount) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 pt-3 mt-3 border-t border-glass-border",
        "text-foreground-tertiary",
        compact ? "text-detail-xs" : "text-detail-sm"
      )}
    >
      {constraintsCount !== undefined && (
        <span>
          <span className="font-mono font-semibold">{constraintsCount}</span>{" "}
          {constraintsCount === 1 ? "constraint" : "constraints"}
        </span>
      )}
      {inputsCount !== undefined && (
        <span>
          <span className="font-mono font-semibold">{inputsCount}</span>{" "}
          {inputsCount === 1 ? "source" : "sources"}
        </span>
      )}
    </div>
  );
}

/**
 * Expand hint (subtle "View Details" affordance)
 */
function ExpandHint({ compact }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "absolute bottom-2 right-2",
        "text-foreground-tertiary",
        compact ? "text-detail-xs" : "text-detail-sm",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-normal"
      )}
    >
      <span className="flex items-center gap-1">
        <span>View Details</span>
        <span className="text-xs">→</span>
      </span>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * AgentCard - Compact agent decision display with expand interaction
 *
 * @example
 * ```tsx
 * const [selectedDecision, setSelectedDecision] = useState<AgentDecision | null>(null);
 *
 * <AgentCard
 *   decision={{
 *     id: "decision-001",
 *     agent: "operations",
 *     summary: "Increased battery discharge rate to meet peak demand",
 *     confidence: 92,
 *     timestamp: "2024-01-15T14:30:00Z",
 *     impact: "medium",
 *     isActive: true,
 *     constraintsCount: 5,
 *     inputsCount: 8,
 *   }}
 *   onClick={(decision) => setSelectedDecision(decision)}
 *   showExpandHint
 * />
 * ```
 */
export const AgentCard = React.forwardRef<HTMLDivElement, AgentCardProps>(
  (
    {
      decision,
      onClick,
      isLoading = false,
      disabled = false,
      className,
      showExpandHint = true,
      compact = false,
      isOverridden = false,
      ...props
    },
    ref
  ) => {
    const config = AGENT_CONFIG[decision.agent];
    const isInteractive = !disabled && !isLoading && !!onClick;

    // Keyboard handler
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (isInteractive && onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick(decision);
        }
      },
      [isInteractive, onClick, decision]
    );

    // Click handler
    const handleClick = React.useCallback(() => {
      if (isInteractive && onClick) {
        onClick(decision);
      }
    }, [isInteractive, onClick, decision]);

    // High confidence gets proof glow
    const isHighConfidence = decision.confidence >= 90;
    const isCriticalImpact = decision.impact === "critical";
    const isFaultState =
      decision.confidence < 50 || decision.impact === "critical";

    // Calculate stale state for shimmer effect
    const dataAgeSeconds = React.useMemo(() => {
      const now = Date.now();
      const decisionTime = new Date(decision.timestamp).getTime();
      return Math.floor((now - decisionTime) / 1000);
    }, [decision.timestamp]);

    const isStale = dataAgeSeconds > PERFORMANCE.freshness.stale; // 300s

    // Build card content
    const cardContent = (
      <div
        ref={ref}
        className={cn("group", className)}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={
          isInteractive
            ? `${config.label} Agent decision: ${decision.summary}. Click for details.`
            : undefined
        }
        {...props}
      >
        <GlassCard
          className={cn(
            compact ? "p-3" : "p-4",
            "relative",
            "transition-all duration-normal",
            isInteractive && "cursor-pointer",
            isInteractive && config.glowClass,
            isInteractive && "hover:border-glass-border-heavy",
            disabled && "opacity-60 cursor-not-allowed",
            isLoading && "animate-pulse"
          )}
        >
          {/* Agent Header */}
          <AgentHeader
            agent={decision.agent}
            timestamp={decision.timestamp}
            isActive={decision.isActive}
            compact={compact}
          />

          {/* Decision Content */}
          <DecisionContent
            summary={decision.summary}
            confidence={decision.confidence}
            impact={decision.impact}
            compact={compact}
            agent={decision.agent}
            inputsCount={decision.inputsCount}
            isInMaintenance={decision.isInMaintenance}
          />

          {/* Metadata Footer */}
          <MetadataFooter
            constraintsCount={decision.constraintsCount}
            inputsCount={decision.inputsCount}
            compact={compact}
          />

          {/* Expand Hint */}
          {showExpandHint && isInteractive && <ExpandHint compact={compact} />}

          {/* Constraint violation badge */}
          {decision.hasConstraintViolations && (
            <div className="absolute top-2 left-2">
              <StatusChange
                triggerKey={`violation-${decision.hasConstraintViolations}`}
              >
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-glass-sm bg-status-critical/10 border border-status-critical/30 text-detail-xs font-semibold text-status-critical uppercase">
                  <span>⚠</span>
                  <span>Constraint Violation</span>
                </span>
              </StatusChange>
            </div>
          )}

          {/* Active indicator (pulsing dot) */}
          {decision.isActive && (
            <div className="absolute top-2 right-2">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-verified opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-verified"></span>
              </span>
            </div>
          )}
        </GlassCard>
      </div>
    );

    // Wrap with interaction primitives
    let wrappedCard = cardContent;

    // Add Breathing for critical/fault states (urgent attention)
    if (isFaultState) {
      wrappedCard = <Breathing rhythm="fast">{wrappedCard}</Breathing>;
    }

    // Add Shimmer for stale data (refresh indicator)
    if (isStale) {
      wrappedCard = <Shimmer isLoading={isStale}>{wrappedCard}</Shimmer>;
    }

    // Add enhanced loading state with Shimmer
    if (isLoading) {
      wrappedCard = <Shimmer isLoading={true}>{wrappedCard}</Shimmer>;
    }

    // Add PressInteraction for interactive cards
    if (isInteractive) {
      wrappedCard = <PressInteraction>{wrappedCard}</PressInteraction>;
    }

    // Add InstantFeedback for critical impact decisions
    if (isCriticalImpact) {
      wrappedCard = <InstantFeedback>{wrappedCard}</InstantFeedback>;
    }

    // Add ProofGlow for high confidence decisions
    if (isHighConfidence) {
      wrappedCard = (
        <ProofGlow verified={true} proofType="zkProof">
          {wrappedCard}
        </ProofGlow>
      );
    }

    // Add EmergencyOverride visual if overridden
    if (isOverridden) {
      wrappedCard = (
        <EmergencyOverride isActive={true}>{wrappedCard}</EmergencyOverride>
      );
    }

    return (
      <AgentMotion
        agent={decision.agent}
        trustLevel={
          decision.confidence >= 90
            ? "excellent"
            : decision.confidence >= 70
              ? "good"
              : "fair"
        }
      >
        {wrappedCard}
      </AgentMotion>
    );
  }
);

AgentCard.displayName = "AgentCard";

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * AgentCardSkeleton - Loading placeholder with shimmer
 */
export function AgentCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <Shimmer isLoading={true}>
      <GlassCard className={cn(compact ? "p-3" : "p-4")}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "rounded-full bg-glass-medium",
                compact ? "h-5 w-5" : "h-6 w-6"
              )}
            />
            <div
              className={cn(
                "bg-glass-medium rounded",
                compact ? "h-3 w-16" : "h-4 w-20"
              )}
            />
          </div>
          <div
            className={cn(
              "bg-glass-medium rounded",
              compact ? "h-2 w-12" : "h-3 w-16"
            )}
          />
        </div>

        <div className="space-y-2 mb-3">
          <div
            className={cn(
              "bg-glass-medium rounded",
              compact ? "h-3" : "h-4",
              "w-full"
            )}
          />
          <div
            className={cn(
              "bg-glass-medium rounded",
              compact ? "h-3" : "h-4",
              "w-3/4"
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "bg-glass-medium rounded-glass-sm",
              compact ? "h-5 w-12" : "h-6 w-16"
            )}
          />
        </div>
      </GlassCard>
    </Shimmer>
  );
}

/**
 * AgentCardGrid - Responsive grid layout with stagger animation
 */
export function AgentCardGrid({
  children,
  columns = 3,
  gap = "normal",
  className,
}: {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "tight" | "normal" | "relaxed";
  className?: string;
}) {
  const gapClass = {
    tight: "gap-2",
    normal: "gap-4",
    relaxed: "gap-6",
  }[gap];

  const columnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <Stagger staggerDelay={0.03} variant="slide-up">
      <div className={cn("grid", columnsClass, gapClass, className)}>
        {children}
      </div>
    </Stagger>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default AgentCard;
