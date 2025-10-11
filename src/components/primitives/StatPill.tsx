/**
 * StatPill - Inline Status Indicator Primitive
 *
 * Compact, color-coded status badges that communicate system state through
 * calm, accessible visual language. Core primitive for trust-first UI.
 *
 * Design Philosophy:
 * - **Color-Blind Safe**: WCAG 2.2 AAA palette (green/amber/red tested for deuteranomaly)
 * - **Semantic Clarity**: Status conveyed through icon + text + color (triple redundancy)
 * - **Calm Precision**: Subtle animations, no anxiety-inducing flashing
 * - **Cognitive Load**: Instant recognition through consistent patterns
 *
 * Use Cases:
 * - System status: Normal → Alert → Paused → Degraded
 * - Agent activity: Active → Processing → Idle → Offline
 * - Data freshness: Fresh → Recent → Stale → Expired
 * - Trust levels: Verified → Warning → Critical → Unknown
 *
 * Behavioral Psychology:
 * - Green (verified): Universal positive, safe to proceed
 * - Amber (warning): Attention required, not urgent
 * - Red (critical): Immediate action, boundary crossed
 * - Gray (neutral): Inactive, paused, or informational
 *
 * @see PRD Section 12.3 - Status Indicators
 * @see WCAG 2.2 - Color Contrast Guidelines
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { PERFORMANCE, AGENTS } from "@/lib/constants";
import type { TrustMathematics } from "@/lib/types";

// ============================================================================
// TYPES - Agent Persona Mapping
// ============================================================================

/**
 * Agent persona types from AIMP constants (actual implementation)
 * Maps to AGENTS constant keys
 */
export type AgentPersonaConstant = keyof typeof AGENTS;

/**
 * Type guard to check if a string is a valid agent persona from constants
 */
const isValidAgentPersona = (
  persona: string
): persona is AgentPersonaConstant => {
  return persona in AGENTS;
};

// ============================================================================
// STATUS PILL VARIANTS
// ============================================================================

/**
 * Status pill variants with semantic status types
 *
 * Status Hierarchy:
 * - verified: Healthy, operational, proof validated (green)
 * - warning: Attention needed, degraded performance (amber)
 * - critical: Immediate action required, safety boundary (red)
 * - info: Informational, neutral state (blue)
 * - paused: Intentionally halted, awaiting input (gray)
 * - offline: Not operational, disconnected (dark gray)
 */
const statPillVariants = cva(
  [
    // Base styles
    "inline-flex items-center gap-1.5",
    "rounded-full",
    "px-3 py-1",
    "text-detail-sm font-medium",
    "transition-all duration-normal ease-organic", // Uses Tailwind's duration-normal (300ms from MOTION.duration.normal)
    "border",

    // Performance optimization
    "will-change-[background-color,border-color,transform]",
    "transform-gpu",

    // Accessibility: high contrast support
    "@supports (forced-colors: active) { border-2 }",
  ],
  {
    variants: {
      /**
       * Status variant - Semantic status types with color-blind safe palette
       */
      status: {
        verified: [
          "bg-status-verified/10",
          "text-status-verified",
          "border-status-verified/30",
          "hover:bg-status-verified/20",
          "hover:border-status-verified/50",
        ],
        warning: [
          "bg-status-warning/10",
          "text-status-warning",
          "border-status-warning/30",
          "hover:bg-status-warning/20",
          "hover:border-status-warning/50",
        ],
        critical: [
          "bg-status-critical/10",
          "text-status-critical",
          "border-status-critical/30",
          "hover:bg-status-critical/20",
          "hover:border-status-critical/50",
          "animate-alert-pulse", // Gentle pulse for urgency
        ],
        info: [
          "bg-agent-operations/10",
          "text-agent-operations",
          "border-agent-operations/30",
          "hover:bg-agent-operations/20",
          "hover:border-agent-operations/50",
        ],
        paused: [
          "bg-foreground/5",
          "text-foreground-secondary",
          "border-foreground-secondary/20",
          "hover:bg-foreground/10",
          "hover:border-foreground-secondary/30",
        ],
        offline: [
          "bg-foreground/5",
          "text-foreground-tertiary",
          "border-foreground-tertiary/20",
          "opacity-70",
        ],
      },

      /**
       * Size variant - Compact → Normal → Large
       */
      size: {
        sm: "px-2 py-0.5 text-detail-xs gap-1",
        md: "px-3 py-1 text-detail-sm gap-1.5",
        lg: "px-4 py-1.5 text-detail-md gap-2",
      },

      /**
       * Show pulsing dot indicator for active states
       */
      showDot: {
        true: "",
        false: "",
      },

      /**
       * Interactive variant (clickable/hoverable)
       */
      interactive: {
        true: [
          "cursor-pointer",
          "hover:scale-[1.05]",
          "active:scale-[0.98]",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ],
        false: "",
      },
    },
    defaultVariants: {
      status: "info",
      size: "md",
      showDot: true,
      interactive: false,
    },
  }
);

// ============================================================================
// STATUS DOT COMPONENT
// ============================================================================

/**
 * Pulsing status dot - Visual heartbeat indicator
 *
 * Uses MOTION.breath timing constants for synchronized pulsing
 * across all status indicators in the UI
 */
const StatusDot = React.memo<{
  status: NonNullable<VariantProps<typeof statPillVariants>["status"]>;
  animated?: boolean;
}>(({ status, animated = true }) => {
  const dotColorClass = React.useMemo(() => {
    const colorMap = {
      verified: "bg-status-verified",
      warning: "bg-status-warning",
      critical: "bg-status-critical",
      info: "bg-agent-operations",
      paused: "bg-foreground-secondary",
      offline: "bg-foreground-tertiary",
    };
    return colorMap[status];
  }, [status]);

  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      {/* Outer pulse ring (only for active statuses) */}
      {animated && status !== "offline" && status !== "paused" && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            dotColorClass,
            status === "critical" ? "animate-ping-fast" : "animate-ping-medium"
          )}
        />
      )}

      {/* Core dot */}
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          dotColorClass
        )}
      />
    </span>
  );
});

StatusDot.displayName = "StatusDot";

// ============================================================================
// STATUS ICONS MAPPING
// ============================================================================

/**
 * Status icon mapping for semantic clarity
 * Provides visual redundancy beyond color alone (accessibility)
 */
const STATUS_ICONS: Record<
  NonNullable<VariantProps<typeof statPillVariants>["status"]>,
  string | null
> = {
  verified: "✓",
  warning: "⚠",
  critical: "⚠",
  info: "ⓘ",
  paused: "⏸",
  offline: "⏻",
};

// ============================================================================
// COMPONENT TYPES
// ============================================================================

export interface StatPillProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof statPillVariants> {
  /**
   * Status label text
   */
  label: string;

  /**
   * Optional icon override (defaults to status-specific icon)
   */
  icon?: string | React.ReactNode;

  /**
   * Show icon (default: true)
   */
  showIcon?: boolean;

  /**
   * Show pulsing dot animation (default: true for active states)
   */
  animated?: boolean;

  /**
   * Optional tooltip/title text
   */
  tooltipText?: string;

  /**
   * Click handler (makes pill interactive)
   */
  onClick?: () => void;

  /**
   * Freshness metadata (auto-sets status based on PERFORMANCE thresholds)
   */
  freshnessSec?: number;

  /**
   * Trust score (0-100) to auto-determine status
   */
  trustScore?: number;

  /**
   * Trust mathematics object for sophisticated trust-based status
   */
  trustMathematics?: TrustMathematics;

  /**
   * Agent persona for agent-specific styling and icons
   * Uses actual AGENTS constant keys: "operations" | "markets" | "maintenance" | "governance"
   */
  agentPersona?: AgentPersonaConstant;
}

// ============================================================================
// STAT PILL COMPONENT
// ============================================================================

/**
 * StatPill - Inline status indicator with color-blind safe design
 *
 * @example
 * ```tsx
 * // Basic status pill
 * <StatPill status="verified" label="Operational" />
 *
 * // Interactive with tooltip
 * <StatPill
 *   status="warning"
 *   label="Degraded"
 *   interactive
 *   onClick={() => showDetails()}
 *   tooltipText="Click for details"
 * />
 *
 * // Auto-status from freshness
 * <StatPill
 *   label="Data"
 *   freshnessSec={120}
 *   showDot
 * />
 *
 * // Auto-status from trust score
 * <StatPill
 *   label="Confidence"
 *   trustScore={85}
 * />
 * ```
 */
export const StatPill = React.forwardRef<HTMLDivElement, StatPillProps>(
  (
    {
      className,
      status: statusProp,
      size,
      showDot,
      interactive: interactiveProp,
      label,
      icon,
      showIcon = true,
      animated = true,
      tooltipText,
      onClick,
      freshnessSec,
      trustScore,
      trustMathematics,
      agentPersona,
      ...props
    },
    ref
  ) => {
    // Auto-determine status from freshness if provided
    const statusFromFreshness = React.useMemo(() => {
      if (freshnessSec === undefined) return null;
      if (freshnessSec < PERFORMANCE.freshness.critical) return "verified";
      if (freshnessSec < PERFORMANCE.freshness.warning) return "warning";
      if (freshnessSec < PERFORMANCE.freshness.stale) return "critical";
      return "offline";
    }, [freshnessSec]);

    // Auto-determine status from trust mathematics (priority over simple trust score)
    const statusFromTrustMath = React.useMemo(() => {
      if (!trustMathematics) return null;

      // Map trust grades to status
      const gradeToStatus: Record<
        TrustMathematics["trustGrade"],
        NonNullable<VariantProps<typeof statPillVariants>["status"]>
      > = {
        excellent: "verified",
        good: "verified",
        fair: "warning",
        poor: "critical",
        suspect: "critical",
      };

      return gradeToStatus[trustMathematics.trustGrade];
    }, [trustMathematics]);

    // Auto-determine status from simple trust score if provided
    const statusFromTrust = React.useMemo(() => {
      if (trustScore === undefined) return null;
      if (trustScore >= PERFORMANCE.trust.excellent) return "verified";
      if (trustScore >= PERFORMANCE.trust.good) return "warning";
      if (trustScore >= PERFORMANCE.trust.fair) return "critical";
      return "offline";
    }, [trustScore]);

    // Final status (priority: explicit > trustMath > trust > freshness > default)
    const status =
      statusProp ||
      statusFromTrustMath ||
      statusFromTrust ||
      statusFromFreshness ||
      "info";

    // Interactive if onClick provided
    const interactive = interactiveProp || !!onClick;

    // Focus ring color based on status
    const focusRingClass = React.useMemo(() => {
      const ringMap = {
        verified: "focus-visible:ring-status-verified",
        warning: "focus-visible:ring-status-warning",
        critical: "focus-visible:ring-status-critical",
        info: "focus-visible:ring-agent-operations",
        paused: "focus-visible:ring-foreground-secondary",
        offline: "focus-visible:ring-foreground-tertiary",
      };
      return ringMap[status];
    }, [status]);

    // Get icon (custom > agent > status default)
    const displayIcon = React.useMemo(() => {
      if (!showIcon) return null;
      if (icon) return icon;
      // Use agent icon if agent persona is provided and valid
      if (agentPersona && isValidAgentPersona(agentPersona)) {
        return AGENTS[agentPersona].icon;
      }
      return STATUS_ICONS[status];
    }, [showIcon, icon, agentPersona, status]);

    // Semantic aria-label for accessibility
    const ariaLabel = React.useMemo(() => {
      const statusText = {
        verified: "verified status",
        warning: "warning status",
        critical: "critical status",
        info: "informational status",
        paused: "paused status",
        offline: "offline status",
      };
      return `${label}, ${statusText[status]}`;
    }, [label, status]);

    return (
      <div
        ref={ref}
        className={cn(
          statPillVariants({ status, size, showDot, interactive }),
          interactive && focusRingClass,
          className
        )}
        {...(interactive
          ? {
              role: "button" as const,
              tabIndex: 0,
              onClick,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {
              role: "status" as const,
            })}
        aria-live={status === "critical" ? "assertive" : "polite"}
        aria-label={ariaLabel}
        title={tooltipText || ariaLabel}
        {...props}
      >
        {/* Pulsing dot indicator */}
        {showDot && <StatusDot status={status} animated={animated} />}

        {/* Icon (if provided) */}
        {displayIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {typeof displayIcon === "string" ? (
              <span className="text-current">{displayIcon}</span>
            ) : (
              displayIcon
            )}
          </span>
        )}

        {/* Label text */}
        <span className="flex-shrink-0 leading-none">{label}</span>
      </div>
    );
  }
);

StatPill.displayName = "StatPill";

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * StatusPill - Pre-configured for system status
 */
export const StatusPill = React.forwardRef<
  HTMLDivElement,
  Omit<StatPillProps, "status"> & {
    isHealthy?: boolean;
    isPaused?: boolean;
    isOffline?: boolean;
  }
>(({ isHealthy, isPaused, isOffline, label, ...props }, ref) => {
  const status = isOffline
    ? "offline"
    : isPaused
      ? "paused"
      : isHealthy
        ? "verified"
        : "warning";

  return <StatPill ref={ref} status={status} label={label} {...props} />;
});

StatusPill.displayName = "StatusPill";

/**
 * FreshnessPill - Pre-configured for data freshness
 */
export const FreshnessPill = React.forwardRef<
  HTMLDivElement,
  Omit<StatPillProps, "status" | "freshnessSec"> & {
    seconds: number;
  }
>(({ seconds, label, ...props }, ref) => {
  return (
    <StatPill
      ref={ref}
      freshnessSec={seconds}
      label={label || "Data"}
      {...props}
    />
  );
});

FreshnessPill.displayName = "FreshnessPill";

/**
 * TrustPill - Pre-configured for trust/confidence scores
 */
export const TrustPill = React.forwardRef<
  HTMLDivElement,
  Omit<StatPillProps, "status" | "trustScore"> & {
    score: number;
  }
>(({ score, label, ...props }, ref) => {
  return (
    <StatPill
      ref={ref}
      trustScore={score}
      label={label || `${score}% confidence`}
      {...props}
    />
  );
});

TrustPill.displayName = "TrustPill";

/**
 * AgentPill - Pre-configured for agent persona status
 * Uses AIMP agent constants for consistent persona representation
 *
 * @example
 * ```tsx
 * <AgentPill persona="operations" label="Active" status="verified" />
 * <AgentPill persona="markets" label="Trading" />
 * ```
 */
export const AgentPill = React.forwardRef<
  HTMLDivElement,
  Omit<StatPillProps, "agentPersona"> & {
    persona: AgentPersonaConstant;
  }
>(({ persona, label, ...props }, ref) => {
  const agentConfig = AGENTS[persona];

  return (
    <StatPill
      ref={ref}
      agentPersona={persona}
      label={label || agentConfig.name}
      status="info"
      {...props}
    />
  );
});

AgentPill.displayName = "AgentPill";

/**
 * TrustMathPill - Pre-configured for trust mathematics objects
 * Automatically maps trust grades to status and provides enhanced tooltips
 *
 * @example
 * ```tsx
 * <TrustMathPill
 *   trustMath={{
 *     confidenceScore: 95,
 *     witnessCount: 3,
 *     deviationSigma: 0.8,
 *     exceedsThreshold: false,
 *     trustGrade: "excellent"
 *   }}
 * />
 * ```
 */
export const TrustMathPill = React.forwardRef<
  HTMLDivElement,
  Omit<StatPillProps, "trustMathematics"> & {
    trustMath: TrustMathematics;
  }
>(({ trustMath, label, ...props }, ref) => {
  // Generate enhanced tooltip with trust details
  const enhancedTooltip = `${label || "Trust"}: ${trustMath.trustGrade.toUpperCase()} (${trustMath.confidenceScore}% confidence, ${trustMath.witnessCount} sources, σ=${trustMath.deviationSigma.toFixed(2)})`;

  return (
    <StatPill
      ref={ref}
      trustMathematics={trustMath}
      label={label || `${trustMath.confidenceScore}% confidence`}
      tooltipText={enhancedTooltip}
      {...props}
    />
  );
});

TrustMathPill.displayName = "TrustMathPill";

// ============================================================================
// EXPORTS
// ============================================================================

export default StatPill;
