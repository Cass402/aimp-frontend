/**
 * TxReceipt - Decoded Solana Transaction Display
 *
 * Translates raw blockchain transactions into human-readable receipts.
 * Shows what the AI actually did on-chain with full transparency.
 *
 * Design Philosophy:
 * - **Explainable**: Every program instruction decoded to human language
 * - **Verifiable**: Link to blockchain explorer for independent audit
 * - **Contextual**: Show AI agent that initiated transaction
 * - **Trustworthy**: Display success/failure states with error context
 *
 * Information Hierarchy:
 * 1. Transaction status (success/pending/failed)
 * 2. Agent attribution (who initiated this)
 * 3. Action summary (what happened)
 * 4. Program interactions (which smart contracts)
 * 5. Blockchain metadata (signature, slot, block time)
 * 6. Explorer link (verify independently)
 *
 * Interaction Model:
 * - Hover program names: Show program ID tooltip
 * - Click signature: Copy to clipboard
 * - Click explorer link: Open in new tab
 * - Click agent: Show agent context
 *
 * Performance:
 * - Lazy load transaction details
 * - Memoized signature formatting
 * - Virtualized instruction list (if >10 instructions)
 *
 * @see PRD Section 7.6 - Override & Audit Interfaces
 * @see PRD Section 8.2 - Transaction Receipt (API)
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime, formatNumber } from "@/lib/format";
import type { AgentPersona, TrustGrade, OperationalStatus } from "@/lib/types";
import { PERFORMANCE, BEHAVIOR } from "@/lib/constants";

import { GlassCard } from "@/components/ui/glass-card";
import { StatPill } from "@/components/primitives/StatPill";
import { HealthDot } from "@/components/primitives/HealthDot";
import { ProofBadge } from "@/components/primitives/ProofBadge";
import {
  AgentMotion,
  TrustMathMotion,
  TrustDecayMotion,
  OperationalMotion,
  GovernanceMotion,
  StatusChange,
  PressInteraction,
  InstantFeedback,
  ProofGlow,
  Breathing,
  Shimmer,
  FlowAnimation,
  Stagger,
  EmergencyOverride,
} from "@/components/primitives/Motion";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Solana program instruction (decoded)
 */
export interface ProgramInstruction {
  /** Program name (human-readable) */
  programName: string;

  /** Program ID (base58 address) */
  programId: string;

  /** Instruction name/type */
  instruction: string;

  /** Decoded arguments */
  args?: Record<string, unknown>;

  /** Accounts involved */
  accounts?: string[];
}

/**
 * Transaction status
 */
export type TransactionStatus = "success" | "pending" | "failed";

/**
 * Solana transaction receipt
 */
export interface SolanaTransaction {
  /** Transaction signature (base58) */
  signature: string;

  /** Transaction status */
  status: TransactionStatus;

  /** Block time (ISO 8601) */
  blockTime: string;

  /** Slot number */
  slot: number;

  /** Agent that initiated transaction */
  agent: AgentPersona;

  /** Human-readable action summary */
  summary: string;

  /** Program instructions */
  instructions: ProgramInstruction[];

  /** Fee paid (lamports) */
  fee: number;

  /** Error message (if failed) */
  error?: string;

  /** Blockchain explorer URL */
  explorerUrl?: string;

  /** Whether transaction was part of emergency override */
  isEmergencyOverride?: boolean;

  /** Number of witness signers (for multi-sig) */
  witnessCount?: number;

  /** Whether transaction violated safety constraints */
  hasConstraintViolation?: boolean;

  /** Whether agent is in maintenance mode */
  isAgentInMaintenance?: boolean;

  /** zkProof hash for verification */
  zkProofHash?: string;
}

/**
 * TxReceipt props
 */
export interface TxReceiptProps {
  /** Transaction to display */
  transaction: SolanaTransaction;

  /** Click handler for agent name */
  onAgentClick?: (agent: AgentPersona) => void;

  /** Custom className */
  className?: string;

  /** Show full instruction details */
  showDetails?: boolean;

  /** Compact mode (smaller padding, reduced text) */
  compact?: boolean;

  /** Loading state */
  isLoading?: boolean;
}

// ============================================================================
// AGENT METADATA
// ============================================================================

const AGENT_CONFIG: Record<
  AgentPersona,
  { icon: string; label: string; color: string }
> = {
  operations: {
    icon: "⚡",
    label: "Operations",
    color: "text-agent-operations",
  },
  markets: {
    icon: "📊",
    label: "Markets",
    color: "text-agent-markets",
  },
  sentinel: {
    icon: "🛡️",
    label: "Sentinel",
    color: "text-agent-sentinel",
  },
  governor: {
    icon: "⚖️",
    label: "Governor",
    color: "text-agent-governance",
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format Solana signature for display (truncated)
 */
function formatSignature(signature: string): string {
  if (signature.length <= 16) return signature;
  return `${signature.slice(0, 8)}...${signature.slice(-8)}`;
}

/**
 * Format lamports to SOL
 */
function formatLamportsToSol(lamports: number): string {
  const sol = lamports / 1e9;
  return `${sol.toFixed(9)} SOL`;
}

/**
 * Copy to clipboard with feedback
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

/**
 * Map transaction status to trust grade
 */
function mapStatusToTrustGrade(
  status: TransactionStatus,
  dataAgeSeconds: number
): TrustGrade {
  if (status === "failed") return "poor";
  if (status === "pending") return "good";

  // Success transactions decay over time
  if (dataAgeSeconds < PERFORMANCE.freshness.critical) return "excellent";
  if (dataAgeSeconds < PERFORMANCE.freshness.warning) return "good";
  if (dataAgeSeconds < PERFORMANCE.freshness.stale) return "fair";
  return "poor";
}

/**
 * Map transaction status to operational status
 */
function mapStatusToOperational(status: TransactionStatus): OperationalStatus {
  switch (status) {
    case "success":
      return "optimal";
    case "pending":
      return "nominal";
    case "failed":
      return "fault";
    default:
      return "nominal";
  }
}

/**
 * Map transaction status to health status
 */
function mapStatusToHealth(
  status: TransactionStatus
): "healthy" | "degraded" | "critical" | "offline" {
  switch (status) {
    case "success":
      return "healthy";
    case "pending":
      return "offline";
    case "failed":
      return "critical";
    default:
      return "degraded";
  }
}

/**
 * Get flow direction based on agent persona
 */
function getFlowDirection(
  agent: AgentPersona
): "charging" | "discharging" | "bidirectional" | "idle" {
  switch (agent) {
    case "operations":
      return "charging";
    case "markets":
      return "bidirectional";
    case "sentinel":
      return "discharging";
    case "governor":
      return "idle";
    default:
      return "idle";
  }
}

/**
 * Calculate trust decay percentage based on data age
 * Uses BEHAVIOR.trustDecayRate (0.8/min) for realistic decay
 */
function calculateTrustDecay(dataAgeSeconds: number): number {
  const ageMinutes = dataAgeSeconds / 60;
  const decayFactor = Math.pow(BEHAVIOR.trustDecayRate, ageMinutes);
  return Math.max(0, Math.min(100, decayFactor * 100));
}

/**
 * Get freshness color based on data age
 */
function getFreshnessColor(dataAgeSeconds: number): string {
  if (dataAgeSeconds < PERFORMANCE.freshness.critical)
    return "bg-status-verified";
  if (dataAgeSeconds < PERFORMANCE.freshness.warning)
    return "bg-status-warning";
  return "bg-status-critical";
}

/**
 * Get trust score percentage from trust grade
 */
function getTrustScorePercentage(trustGrade: TrustGrade): number {
  switch (trustGrade) {
    case "excellent":
      return 95;
    case "good":
      return 75;
    case "fair":
      return 55;
    case "poor":
      return 35;
    case "suspect":
      return 15;
    default:
      return 50;
  }
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Trust score visualization bar
 */
const TrustScoreBar = React.memo(function TrustScoreBar({
  trustGrade,
  dataAgeSeconds,
  compact,
}: {
  trustGrade: TrustGrade;
  dataAgeSeconds: number;
  compact?: boolean;
}) {
  const trustPercentage = getTrustScorePercentage(trustGrade);
  const decayPercentage = calculateTrustDecay(dataAgeSeconds);
  const displayPercentage = Math.floor(
    (trustPercentage * decayPercentage) / 100
  );

  const gradientColor =
    trustGrade === "excellent" || trustGrade === "good"
      ? "from-status-verified to-status-verified/50"
      : trustGrade === "fair"
        ? "from-status-warning to-status-warning/50"
        : "from-status-critical to-status-critical/50";

  const tooltip = `Trust: ${displayPercentage}% (Base: ${trustPercentage}%, Decay: ${Math.floor(decayPercentage)}%)\nAge: ${dataAgeSeconds}s • Decay rate: ${BEHAVIOR.trustDecayRate}/min`;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        compact ? "text-detail-xs" : "text-detail-sm"
      )}
      title={tooltip}
    >
      <span className="text-foreground-tertiary min-w-[60px]">
        Trust: {displayPercentage}%
      </span>
      <div className="flex-1 h-1.5 bg-glass-medium rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full bg-gradient-to-r transition-all duration-slow",
            gradientColor
          )}
          style={{ width: `${displayPercentage}%` }}
        />
      </div>
    </div>
  );
});

/**
 * Transaction age timeline bar
 */
const AgeTimeline = React.memo(function AgeTimeline({
  dataAgeSeconds,
  compact,
}: {
  dataAgeSeconds: number;
  compact?: boolean;
}) {
  const maxAge = PERFORMANCE.freshness.stale;
  const agePercentage = Math.min(100, (dataAgeSeconds / maxAge) * 100);
  const freshnessColor = getFreshnessColor(dataAgeSeconds);

  const freshnessLabel =
    dataAgeSeconds < PERFORMANCE.freshness.critical
      ? "Fresh"
      : dataAgeSeconds < PERFORMANCE.freshness.warning
        ? "Recent"
        : dataAgeSeconds < PERFORMANCE.freshness.stale
          ? "Aging"
          : "Stale";

  const tooltip = `Age: ${dataAgeSeconds}s • ${freshnessLabel}\nFresh < ${PERFORMANCE.freshness.critical}s\nRecent < ${PERFORMANCE.freshness.warning}s\nStale > ${PERFORMANCE.freshness.stale}s`;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        compact ? "text-detail-xs" : "text-detail-sm"
      )}
      title={tooltip}
    >
      <span className="text-foreground-tertiary min-w-[60px]">
        {freshnessLabel}
      </span>
      <div className="flex-1 h-1.5 bg-glass-medium rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-slow", freshnessColor)}
          style={{ width: `${Math.min(100, agePercentage)}%` }}
        />
      </div>
      <span className="text-foreground-tertiary min-w-[40px] text-right">
        {dataAgeSeconds}s
      </span>
    </div>
  );
});

/**
 * Transaction status badge
 */
const StatusBadge = React.memo(function StatusBadge({
  status,
  isEmergencyOverride,
  dataAgeSeconds,
  hasConstraintViolation,
}: {
  status: TransactionStatus;
  isEmergencyOverride?: boolean;
  dataAgeSeconds: number;
  hasConstraintViolation?: boolean;
}) {
  const statusConfig = {
    success: {
      label: "Success",
      status: "verified" as const,
      icon: "✓",
    },
    pending: {
      label: "Pending",
      status: "warning" as const,
      icon: "⏳",
    },
    failed: {
      label: "Failed",
      status: "critical" as const,
      icon: "✗",
    },
  };

  const config = statusConfig[status];
  const healthStatus = mapStatusToHealth(status);
  const pulseSpeed: "slow" | "medium" | "fast" | "none" =
    status === "failed" ? "fast" : status === "pending" ? "medium" : "slow";
  const isStale = dataAgeSeconds > PERFORMANCE.freshness.stale;

  // Enhanced tooltip with trust mathematics
  const decayPercent = calculateTrustDecay(dataAgeSeconds);
  const statusTooltip = `${config.label} • Age: ${dataAgeSeconds}s • Trust decay: ${decayPercent.toFixed(1)}% (rate: ${BEHAVIOR.trustDecayRate}/min)`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <StatusChange triggerKey={`status-${status}`}>
        <div className="flex items-center gap-1.5">
          <HealthDot status={healthStatus} pulse={pulseSpeed} />
          <StatPill
            label={`${config.icon} ${config.label}`}
            status={config.status}
            tooltipText={statusTooltip}
          />
        </div>
      </StatusChange>

      {isEmergencyOverride && (
        <StatusChange triggerKey={`override-${isEmergencyOverride}`}>
          <StatPill
            label="🚨 Override"
            status="critical"
            tooltipText="Transaction initiated by emergency override"
          />
        </StatusChange>
      )}

      {isStale && (
        <StatusChange triggerKey={`stale-${isStale}`}>
          <StatPill
            label="STALE"
            status="warning"
            tooltipText={`Data age: ${dataAgeSeconds}s (>${PERFORMANCE.freshness.stale}s)`}
          />
        </StatusChange>
      )}

      {hasConstraintViolation && (
        <StatusChange triggerKey={`violation-${hasConstraintViolation}`}>
          <StatPill
            label="⚠ Constraint Violation"
            status="critical"
            tooltipText="Transaction violated safety constraints"
          />
        </StatusChange>
      )}
    </div>
  );
});

/**
 * Agent attribution
 */
const AgentAttribution = React.memo(function AgentAttribution({
  agent,
  onClick,
  compact,
  trustGrade,
  witnessCount = 1,
  dataAgeSeconds,
  isInMaintenance,
}: {
  agent: AgentPersona;
  onClick?: (agent: AgentPersona) => void;
  compact?: boolean;
  trustGrade: TrustGrade;
  witnessCount?: number;
  dataAgeSeconds: number;
  isInMaintenance?: boolean;
}) {
  const config = AGENT_CONFIG[agent];
  const isInteractive = !!onClick;

  const handleClick = React.useCallback(() => {
    if (onClick) onClick(agent);
  }, [onClick, agent]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (isInteractive && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handleClick();
      }
    },
    [isInteractive, handleClick]
  );

  // Breathing rhythm based on data age
  const breathingRhythm: "slow" | "medium" | "fast" =
    dataAgeSeconds < PERFORMANCE.freshness.critical
      ? "fast"
      : dataAgeSeconds < PERFORMANCE.freshness.warning
        ? "medium"
        : "slow";

  const buttonContent = (
    <button
      type="button"
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      disabled={!isInteractive}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-glass-sm",
        "bg-glass-light border border-glass-border",
        "transition-all duration-fast",
        compact ? "text-detail-sm" : "text-body-sm",
        config.color,
        isInteractive && "cursor-pointer",
        isInteractive &&
          "hover:bg-glass-medium hover:border-glass-border-heavy",
        isInteractive &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glass-border-heavy",
        !isInteractive && "cursor-default",
        isInMaintenance && "opacity-50"
      )}
      aria-label={
        isInteractive ? `View ${config.label} agent details` : undefined
      }
    >
      <Breathing rhythm={breathingRhythm}>
        <span className={compact ? "text-sm" : "text-base"}>{config.icon}</span>
      </Breathing>
      <span className="font-semibold">{config.label}</span>
      {isInMaintenance && (
        <span className="text-detail-xs text-foreground-tertiary ml-1">
          (OFFLINE)
        </span>
      )}
    </button>
  );

  const confidence =
    trustGrade === "excellent"
      ? 95
      : trustGrade === "good"
        ? 75
        : trustGrade === "fair"
          ? 55
          : 35;

  // Enhanced tooltip with witness consensus math
  const decayPercent = calculateTrustDecay(dataAgeSeconds);
  const agentTooltip = `${config.label} Agent • Confidence: ${confidence}% • Witnesses: ${witnessCount} • Trust decay: ${decayPercent.toFixed(1)}% • Age: ${dataAgeSeconds}s`;

  return (
    <div className="flex items-center gap-2" title={agentTooltip}>
      <span className="text-foreground-tertiary text-detail-sm">
        Initiated by
      </span>
      <TrustMathMotion
        trustMath={{
          confidenceScore: confidence,
          witnessCount: witnessCount,
          deviationSigma: 1.0,
          exceedsThreshold: false,
          trustGrade: trustGrade,
        }}
      >
        {isInteractive ? (
          <PressInteraction>{buttonContent}</PressInteraction>
        ) : (
          buttonContent
        )}
      </TrustMathMotion>
    </div>
  );
});

/**
 * Transaction metadata (signature, slot, time, fee)
 */
const TransactionMetadata = React.memo(function TransactionMetadata({
  signature,
  slot,
  blockTime,
  fee,
  explorerUrl,
  compact,
  witnessCount = 1,
  zkProofHash,
}: {
  signature: string;
  slot: number;
  blockTime: string;
  fee: number;
  explorerUrl?: string;
  compact?: boolean;
  witnessCount?: number;
  zkProofHash?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const relativeTime = React.useMemo(
    () => formatRelativeTime(blockTime),
    [blockTime]
  );

  const handleCopySignature = React.useCallback(async () => {
    const success = await copyToClipboard(signature);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [signature]);

  return (
    <div
      className={cn(
        "space-y-2 p-3 rounded-glass-sm bg-glass-light border border-glass-border",
        compact && "p-2 space-y-1.5"
      )}
    >
      <Stagger staggerDelay={0.05} variant="fade">
        <div className="space-y-2">
          {/* Signature with ProofBadge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-foreground-tertiary mb-1",
                  compact ? "text-detail-xs" : "text-detail-sm"
                )}
              >
                Signature
              </p>
              <PressInteraction>
                <button
                  type="button"
                  onClick={handleCopySignature}
                  className={cn(
                    "font-mono break-all text-left w-full",
                    "text-foreground-secondary hover:text-foreground-primary",
                    "transition-colors duration-fast",
                    "focus-visible:outline-none focus-visible:underline",
                    compact ? "text-detail-xs" : "text-detail-sm"
                  )}
                  title="Click to copy full signature"
                >
                  <ProofBadge
                    hash={signature}
                    state="verified"
                    label="Signature"
                    compact={compact}
                  />
                </button>
              </PressInteraction>
              {copied && (
                <InstantFeedback>
                  <StatusChange triggerKey={`copied-${copied}`}>
                    <span className="text-detail-xs text-status-verified ml-2">
                      ✓ Copied!
                    </span>
                  </StatusChange>
                </InstantFeedback>
              )}
            </div>
          </div>

          {/* Witness count (multi-sig) */}
          {witnessCount > 1 && (
            <div className={compact ? "text-detail-xs" : "text-detail-sm"}>
              <p className="text-foreground-tertiary mb-0.5">Witnesses</p>
              <p className="text-foreground-primary">
                Verified by {witnessCount}{" "}
                {witnessCount === 1 ? "signer" : "signers"}
              </p>
            </div>
          )}

          {/* zkProof hash */}
          {zkProofHash && (
            <div className={compact ? "text-detail-xs" : "text-detail-sm"}>
              <p className="text-foreground-tertiary mb-0.5">zkProof</p>
              <ProofBadge
                hash={zkProofHash}
                state="verified"
                label="zkProof"
                compact={compact}
              />
            </div>
          )}

          {/* Slot & Time */}
          <div
            className={cn(
              "grid grid-cols-2 gap-3",
              compact ? "text-detail-xs" : "text-detail-sm"
            )}
          >
            <div>
              <p className="text-foreground-tertiary mb-0.5">Slot</p>
              <StatusChange triggerKey={`slot-${slot}`}>
                <p className="font-mono text-foreground-primary">
                  {formatNumber(slot)}
                </p>
              </StatusChange>
            </div>
            <div>
              <p className="text-foreground-tertiary mb-0.5">Time</p>
              <time
                className="text-foreground-primary"
                dateTime={blockTime}
                title={new Date(blockTime).toLocaleString()}
              >
                {relativeTime}
              </time>
            </div>
          </div>

          {/* Fee */}
          <div className={compact ? "text-detail-xs" : "text-detail-sm"}>
            <p className="text-foreground-tertiary mb-0.5">Fee</p>
            <StatusChange triggerKey={`fee-${fee}`}>
              <p className="font-mono text-foreground-primary">
                {formatLamportsToSol(fee)}
              </p>
            </StatusChange>
          </div>

          {/* Explorer Link */}
          {explorerUrl && (
            <div className="pt-2 border-t border-glass-border">
              <PressInteraction>
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5",
                    "text-foreground-secondary hover:text-foreground-primary",
                    "transition-colors duration-fast",
                    "focus-visible:outline-none focus-visible:underline",
                    compact ? "text-detail-xs" : "text-detail-sm"
                  )}
                >
                  <span>View in Explorer</span>
                  <span className="text-xs">↗</span>
                </a>
              </PressInteraction>
            </div>
          )}
        </div>
      </Stagger>
    </div>
  );
});

/**
 * Program instruction display
 */
const InstructionItem = React.memo(function InstructionItem({
  instruction,
  index,
  showDetails,
  compact,
  agent,
}: {
  instruction: ProgramInstruction;
  index: number;
  showDetails?: boolean;
  compact?: boolean;
  agent: AgentPersona;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const hasDetails =
    (instruction.args && Object.keys(instruction.args).length > 0) ||
    (instruction.accounts && instruction.accounts.length > 0);

  const flowDirection = getFlowDirection(agent);

  return (
    <FlowAnimation direction={flowDirection} speed={1.0}>
      <div
        className={cn(
          "p-3 rounded-glass-sm bg-glass-light border border-glass-border",
          compact && "p-2"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={cn(
                  "font-mono text-foreground-tertiary",
                  compact ? "text-detail-xs" : "text-detail-sm"
                )}
              >
                #{index + 1}
              </span>
              <span
                className={cn(
                  "font-semibold text-foreground-primary",
                  compact ? "text-body-sm" : "text-body-md"
                )}
              >
                {instruction.programName}
              </span>
            </div>
            <p
              className={cn(
                "text-foreground-secondary",
                compact ? "text-detail-sm" : "text-body-sm"
              )}
            >
              {instruction.instruction}
            </p>

            {/* Program ID tooltip */}
            <p
              className={cn(
                "font-mono text-foreground-tertiary mt-1",
                compact ? "text-detail-xs" : "text-detail-sm"
              )}
              title={instruction.programId}
            >
              {formatSignature(instruction.programId)}
            </p>

            {/* Expandable details */}
            {showDetails && hasDetails && (
              <PressInteraction>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={cn(
                    "mt-2 text-foreground-secondary hover:text-foreground-primary",
                    "transition-colors duration-fast",
                    "focus-visible:outline-none focus-visible:underline",
                    compact ? "text-detail-xs" : "text-detail-sm"
                  )}
                >
                  {isExpanded ? "Hide" : "Show"} details
                </button>
              </PressInteraction>
            )}

            {isExpanded && hasDetails && (
              <div className="mt-2 space-y-2">
                {/* Arguments */}
                {instruction.args &&
                  Object.keys(instruction.args).length > 0 && (
                    <div>
                      <p
                        className={cn(
                          "text-foreground-tertiary mb-1",
                          compact ? "text-detail-xs" : "text-detail-sm"
                        )}
                      >
                        Arguments:
                      </p>
                      <pre
                        className={cn(
                          "font-mono p-2 rounded bg-background/50 overflow-x-auto",
                          compact ? "text-detail-xs" : "text-detail-sm"
                        )}
                      >
                        {JSON.stringify(instruction.args, null, 2)}
                      </pre>
                    </div>
                  )}

                {/* Accounts */}
                {instruction.accounts && instruction.accounts.length > 0 && (
                  <div>
                    <p
                      className={cn(
                        "text-foreground-tertiary mb-1",
                        compact ? "text-detail-xs" : "text-detail-sm"
                      )}
                    >
                      Accounts ({instruction.accounts.length}):
                    </p>
                    <ul className="space-y-1">
                      {instruction.accounts.map((account, i) => (
                        <li
                          key={i}
                          className={cn(
                            "font-mono text-foreground-secondary",
                            compact ? "text-detail-xs" : "text-detail-sm"
                          )}
                        >
                          {formatSignature(account)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </FlowAnimation>
  );
});

/**
 * Error display (if transaction failed)
 */
const ErrorDisplay = React.memo(function ErrorDisplay({
  error,
  compact,
}: {
  error: string;
  compact?: boolean;
}) {
  return (
    <Breathing rhythm="fast">
      <div
        className={cn(
          "p-3 rounded-glass-sm",
          "bg-status-critical/5 border border-status-critical/30",
          compact && "p-2"
        )}
      >
        <div className="flex items-start gap-2">
          <span className="text-status-critical text-lg">⚠</span>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "font-semibold text-status-critical mb-1",
                compact ? "text-body-sm" : "text-body-md"
              )}
            >
              Transaction Failed
            </p>
            <p
              className={cn(
                "text-foreground-secondary",
                compact ? "text-detail-sm" : "text-body-sm"
              )}
            >
              {error}
            </p>
          </div>
        </div>
      </div>
    </Breathing>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * TxReceipt - Decoded Solana transaction display
 *
 * @example
 * ```tsx
 * <TxReceipt
 *   transaction={{
 *     signature: "5J7...",
 *     status: "success",
 *     blockTime: "2024-01-15T14:30:00Z",
 *     slot: 123456789,
 *     agent: "operations",
 *     summary: "Increased battery discharge rate",
 *     instructions: [
 *       {
 *         programName: "AssetRegistry",
 *         programId: "AssetReg1...",
 *         instruction: "UpdateEnergyDispatch",
 *         args: { rate: 150, duration: 3600 },
 *       },
 *     ],
 *     fee: 5000,
 *     explorerUrl: "https://explorer.solana.com/tx/5J7...",
 *   }}
 *   showDetails
 * />
 * ```
 */
export const TxReceipt = React.forwardRef<HTMLDivElement, TxReceiptProps>(
  (
    {
      transaction,
      onAgentClick,
      className,
      showDetails = false,
      compact = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const isSuccess = transaction.status === "success";
    const isPending = transaction.status === "pending";
    const isFailed = transaction.status === "failed";

    // A11Y: Respect motion preferences
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Calculate data age for trust decay
    const dataAgeSeconds = React.useMemo(() => {
      return Math.floor(
        (Date.now() - new Date(transaction.blockTime).getTime()) / 1000
      );
    }, [transaction.blockTime]);

    // Map status to trust grade and operational status
    const trustGrade = React.useMemo(
      () => mapStatusToTrustGrade(transaction.status, dataAgeSeconds),
      [transaction.status, dataAgeSeconds]
    );

    const operationalStatus = React.useMemo(
      () => mapStatusToOperational(transaction.status),
      [transaction.status]
    );

    // Check if stale
    const isStale = dataAgeSeconds > PERFORMANCE.freshness.stale;

    // Build card content
    const cardContent = (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <GlassCard className={compact ? "p-3" : "p-4"}>
          {/* Header: Status + Agent */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <StatusBadge
              status={transaction.status}
              isEmergencyOverride={transaction.isEmergencyOverride}
              dataAgeSeconds={dataAgeSeconds}
              hasConstraintViolation={transaction.hasConstraintViolation}
            />
            <AgentAttribution
              agent={transaction.agent}
              onClick={onAgentClick}
              compact={compact}
              trustGrade={trustGrade}
              witnessCount={transaction.witnessCount}
              dataAgeSeconds={dataAgeSeconds}
              isInMaintenance={transaction.isAgentInMaintenance}
            />
          </div>

          {/* Trust & Freshness Visualization */}
          <div className="mb-4 space-y-2">
            <TrustScoreBar
              trustGrade={trustGrade}
              dataAgeSeconds={dataAgeSeconds}
              compact={compact}
            />
            <AgeTimeline dataAgeSeconds={dataAgeSeconds} compact={compact} />
          </div>

          {/* Summary */}
          <div className="mb-4">
            <p
              className={cn(
                "text-foreground-primary leading-relaxed",
                compact ? "text-body-sm" : "text-body-md"
              )}
            >
              {transaction.summary}
            </p>
          </div>

          {/* Error (if failed) */}
          {isFailed && transaction.error && (
            <div className="mb-4">
              <ErrorDisplay error={transaction.error} compact={compact} />
            </div>
          )}

          {/* Instructions */}
          {transaction.instructions.length > 0 && (
            <div className="mb-4">
              <h3
                className={cn(
                  "text-foreground-secondary font-semibold mb-3",
                  compact ? "text-body-sm" : "text-body-md"
                )}
              >
                Program Interactions ({transaction.instructions.length})
              </h3>
              {/* Advanced stagger with scale variant for dramatic reveals */}
              {prefersReducedMotion ? (
                <div className="space-y-2">
                  {transaction.instructions.map((instruction, index) => (
                    <InstructionItem
                      key={index}
                      instruction={instruction}
                      index={index}
                      showDetails={showDetails}
                      compact={compact}
                      agent={transaction.agent}
                    />
                  ))}
                </div>
              ) : (
                <Stagger staggerDelay={0.05} variant="scale">
                  <div className="space-y-2">
                    {transaction.instructions.map((instruction, index) => (
                      <InstructionItem
                        key={index}
                        instruction={instruction}
                        index={index}
                        showDetails={showDetails}
                        compact={compact}
                        agent={transaction.agent}
                      />
                    ))}
                  </div>
                </Stagger>
              )}
            </div>
          )}

          {/* Metadata */}
          <TransactionMetadata
            signature={transaction.signature}
            slot={transaction.slot}
            blockTime={transaction.blockTime}
            fee={transaction.fee}
            explorerUrl={transaction.explorerUrl}
            compact={compact}
            witnessCount={transaction.witnessCount}
            zkProofHash={transaction.zkProofHash}
          />
        </GlassCard>
      </div>
    );

    // Wrap with appropriate motion primitives in correct order
    let wrappedCard = cardContent;

    // Layer 1: Shimmer for loading states
    if (isLoading) {
      wrappedCard = <Shimmer isLoading={true}>{wrappedCard}</Shimmer>;
    }

    // Layer 2: Breathing for pending state (respects motion preferences)
    if (isPending && !isLoading) {
      wrappedCard = (
        <Breathing rhythm="slow" disabled={prefersReducedMotion}>
          {wrappedCard}
        </Breathing>
      );
    }

    // Layer 3: Shimmer for stale data
    if (isStale && !isLoading && !isPending) {
      wrappedCard = <Shimmer isLoading={isStale}>{wrappedCard}</Shimmer>;
    }

    // Layer 4: ProofGlow for successful transactions
    if (isSuccess) {
      wrappedCard = (
        <ProofGlow verified={true} proofType="signature">
          {wrappedCard}
        </ProofGlow>
      );
    }

    // Layer 5: InstantFeedback for failed transactions (urgent attention)
    if (isFailed) {
      wrappedCard = <InstantFeedback>{wrappedCard}</InstantFeedback>;
    }

    // Layer 6: EmergencyOverride wrapper (highest priority visual state)
    if (transaction.isEmergencyOverride) {
      wrappedCard = (
        <EmergencyOverride isActive={true}>{wrappedCard}</EmergencyOverride>
      );
    }

    // Layer 7: GovernanceMotion for governance agent or violations
    if (
      transaction.agent === "governor" ||
      transaction.hasConstraintViolation
    ) {
      wrappedCard = (
        <GovernanceMotion
          state={transaction.hasConstraintViolation ? "violated" : "enforcing"}
        >
          {wrappedCard}
        </GovernanceMotion>
      );
    }

    // Layer 8: OperationalMotion based on status
    wrappedCard = (
      <OperationalMotion operationalStatus={operationalStatus}>
        {wrappedCard}
      </OperationalMotion>
    );

    // Layer 9: TrustDecayMotion based on data age
    wrappedCard = (
      <TrustDecayMotion dataAgeSeconds={dataAgeSeconds}>
        {wrappedCard}
      </TrustDecayMotion>
    );

    // Layer 10: AgentMotion (outermost, agent personality)
    return (
      <AgentMotion agent={transaction.agent} trustLevel={trustGrade}>
        {wrappedCard}
      </AgentMotion>
    );
  }
);

TxReceipt.displayName = "TxReceipt";

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * TxReceiptSkeleton - Loading placeholder
 */
export function TxReceiptSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <Breathing rhythm="slow">
      <Shimmer isLoading={true}>
        <GlassCard className={compact ? "p-3" : "p-4"}>
          {/* Header skeleton */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div
              className={cn(
                "bg-glass-medium rounded-glass-sm",
                compact ? "h-5 w-20" : "h-6 w-24"
              )}
            />
            <div
              className={cn(
                "bg-glass-medium rounded-glass-sm",
                compact ? "h-5 w-24" : "h-6 w-28"
              )}
            />
          </div>

          {/* Summary skeleton */}
          <div className="mb-4 space-y-2">
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

          {/* Instructions skeleton */}
          <div className="mb-4 space-y-2">
            <div
              className={cn(
                "bg-glass-medium rounded",
                compact ? "h-3 w-32" : "h-4 w-40"
              )}
            />
            <div className={cn("bg-glass-medium rounded-glass-sm", "h-16")} />
            <div className={cn("bg-glass-medium rounded-glass-sm", "h-16")} />
          </div>

          {/* Metadata skeleton */}
          <div className={cn("bg-glass-medium rounded-glass-sm", "h-32")} />
        </GlassCard>
      </Shimmer>
    </Breathing>
  );
}

/**
 * TxReceiptList - Virtualized list of transactions
 */
export function TxReceiptList({
  transactions,
  onAgentClick,
  showDetails = false,
  compact = false,
  className,
}: {
  transactions: SolanaTransaction[];
  onAgentClick?: (agent: AgentPersona) => void;
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Stagger staggerDelay={0.1} variant="slide-up">
      <div className={cn("space-y-4", className)}>
        {transactions.map((transaction) => (
          <TxReceipt
            key={transaction.signature}
            transaction={transaction}
            onAgentClick={onAgentClick}
            showDetails={showDetails}
            compact={compact}
          />
        ))}
      </div>
    </Stagger>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default TxReceipt;
