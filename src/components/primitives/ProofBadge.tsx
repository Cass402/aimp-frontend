/**
 * ProofBadge - Verification Indicator Primitive
 *
 * Visual proof-of-verification component that communicates on-chain validation
 * through calm, trust-building design. Core primitive for explainability UI.
 *
 * Design Philosophy:
 * - **Transparency as Trust**: Every proof is traceable to on-chain hash
 * - **Calm Verification**: Subtle glow instead of aggressive checkmarks
 * - **Progressive Disclosure**: Hover reveals full proof metadata
 * - **Zero-Knowledge Respect**: Hash displayed, computation hidden
 *
 * Use Cases:
 * - AI decision verification (zkProof of reasoning)
 * - Data source validation (oracle signatures)
 * - Transaction confirmation (Solana finality)
 * - Audit trail entries (immutable proof chain)
 *
 * Behavioral Psychology:
 * - Verified glow: Subtle green pulse = trust earned, not demanded
 * - Pending shimmer: Amber animation = transparency during wait
 * - Failed state: Red with explanation = honest failure communication
 * - Tooltip depth: Hash + timestamp + source = full accountability
 *
 * @see PRD Section 6 - AI Agent Personas (proof requirements)
 * @see PRD Section 8.9 - ProofMetadata type definition
 * @see PRD Section 12.3 - Trust Indicators
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { truncateHash, formatDateTime } from "@/lib/format";
import type { ProofArtifact } from "@/lib/types";

// ============================================================================
// PROOF BADGE VARIANTS
// ============================================================================

/**
 * Proof badge variants for verification states
 *
 * State Hierarchy:
 * - verified: On-chain proof validated (green glow)
 * - pending: Awaiting confirmation (amber shimmer)
 * - failed: Verification failed (red, minimal prominence)
 * - none: No proof available (neutral gray)
 */
const proofBadgeVariants = cva(
  [
    // Base styles
    "inline-flex items-center gap-1.5",
    "rounded-full",
    "px-2.5 py-1",
    "text-detail-xs font-mono font-medium",
    "transition-all duration-normal ease-organic",
    "border",
    "backdrop-blur-glass-sm",

    // Performance optimization
    "will-change-[background-color,border-color,box-shadow]",
    "transform-gpu",

    // Accessibility
    "@supports (forced-colors: active) { border-2 }",
  ],
  {
    variants: {
      /**
       * Verification state
       */
      state: {
        verified: [
          "bg-status-verified/10",
          "text-status-verified",
          "border-status-verified/30",
          "shadow-glow-verified",
          "hover:bg-status-verified/20",
          "hover:border-status-verified/50",
          "hover:shadow-glow-verified-lg",
          "animate-proof-glow", // Subtle breathing glow
        ],
        pending: [
          "bg-status-warning/10",
          "text-status-warning",
          "border-status-warning/30",
          "shadow-glow-warning",
          "hover:bg-status-warning/20",
          "animate-shimmer", // Gentle shimmer during wait
        ],
        failed: [
          "bg-status-critical/5",
          "text-status-critical/70",
          "border-status-critical/20",
          "hover:bg-status-critical/10",
          "opacity-70",
        ],
        none: [
          "bg-foreground/5",
          "text-foreground-tertiary",
          "border-foreground-tertiary/20",
          "hover:bg-foreground/10",
          "opacity-60",
        ],
      },

      /**
       * Size variant
       */
      size: {
        xs: "px-2 py-0.5 text-detail-xs gap-1",
        sm: "px-2.5 py-1 text-detail-xs gap-1.5",
        md: "px-3 py-1.5 text-detail-sm gap-1.5",
        lg: "px-4 py-2 text-detail-md gap-2",
      },

      /**
       * Interactive (shows tooltip on hover/click)
       */
      interactive: {
        true: [
          "cursor-pointer",
          "hover:scale-[1.05]",
          "active:scale-[0.98]",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-status-verified",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ],
        false: "",
      },

      /**
       * Show verification icon
       */
      showIcon: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      state: "none",
      size: "sm",
      interactive: true,
      showIcon: true,
    },
  }
);

// ============================================================================
// VERIFICATION ICONS
// ============================================================================

/**
 * State-specific icons for visual redundancy
 */
const PROOF_ICONS = {
  verified: "✓",
  pending: "⏳",
  failed: "✗",
  none: "—",
} as const;

// ============================================================================
// COMPONENT TYPES
// ============================================================================

export interface ProofBadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof proofBadgeVariants> {
  /**
   * Proof artifact object (auto-determines state)
   */
  proof?: ProofArtifact | null;

  /**
   * Manual state override (if not using proof object)
   */
  state?: "verified" | "pending" | "failed" | "none";

  /**
   * Proof hash to display (truncated automatically)
   */
  hash?: string;

  /**
   * Label text (default: "Proof")
   */
  label?: string;

  /**
   * Show full tooltip on hover
   */
  showTooltip?: boolean;

  /**
   * Custom tooltip content
   */
  tooltipContent?: React.ReactNode;

  /**
   * Click handler (for proof detail modal)
   */
  onProofClick?: (proof?: ProofArtifact) => void;

  /**
   * Show timestamp in tooltip
   */
  showTimestamp?: boolean;

  /**
   * Compact mode (hash only, no label)
   */
  compact?: boolean;
}

// ============================================================================
// PROOF BADGE COMPONENT
// ============================================================================

/**
 * ProofBadge - Verification indicator with on-chain proof traceability
 *
 * @example
 * ```tsx
 * // Basic verified proof
 * <ProofBadge
 *   hash="0x1234...abcd"
 *   state="verified"
 *   label="Verified"
 * />
 *
 * // With full proof metadata
 * <ProofBadge
 *   proof={{
 *     hash: "0x1234567890abcdef",
 *     proofType: "zksnark-groth16",
 *     timestamp: "2025-10-09T12:00:00Z",
 *     verified: true,
 *   }}
 *   onClick={(proof) => showProofModal(proof)}
 * />
 *
 * // Pending verification
 * <ProofBadge state="pending" label="Verifying..." />
 *
 * // Compact mode (hash only)
 * <ProofBadge
 *   hash="0xabcd1234"
 *   state="verified"
 *   compact
 * />
 * ```
 */
export const ProofBadge = React.forwardRef<HTMLDivElement, ProofBadgeProps>(
  (
    {
      className,
      state: stateProp,
      size,
      interactive: interactiveProp,
      showIcon = true,
      proof,
      hash: hashProp,
      label = "Proof",
      showTooltip = true,
      tooltipContent,
      onClick,
      onProofClick,
      showTimestamp = true,
      compact = false,
      ...props
    },
    ref
  ) => {
    // Auto-determine state from proof artifact
    const state = React.useMemo(() => {
      if (stateProp) return stateProp;
      if (!proof) return "none";
      if (proof.verification?.verified === false) return "failed";
      if (proof.verification?.verified === true) return "verified";
      return "pending";
    }, [stateProp, proof]);

    // Get hash from proof or prop
    const hash = hashProp || proof?.proofData;

    // Truncate hash for display
    const displayHash = React.useMemo(() => {
      if (!hash) return null;
      return truncateHash(hash);
    }, [hash]);

    // Interactive if onProofClick provided or tooltip enabled
    const interactive = interactiveProp ?? (!!onProofClick || showTooltip);

    // Build tooltip content
    const tooltip = React.useMemo(() => {
      if (tooltipContent) return tooltipContent;
      if (!showTooltip) return null;

      const parts: string[] = [];

      // State label
      const stateLabels = {
        verified: "✓ Verified",
        pending: "⏳ Pending verification",
        failed: "✗ Verification failed",
        none: "No proof available",
      };
      parts.push(stateLabels[state]);

      // Full hash
      if (hash) {
        parts.push(`Hash: ${hash}`);
      }

      // Proof type
      if (proof?.proofType) {
        parts.push(`Type: ${proof.proofType}`);
      }

      // Timestamp
      if (showTimestamp && proof?.creationTime) {
        parts.push(`Verified: ${formatDateTime(proof.creationTime)}`);
      }

      // Verifier
      if (proof?.verification?.verifier) {
        parts.push(`Verifier: ${String(proof.verification.verifier)}`);
      }

      return parts.join("\n");
    }, [tooltipContent, showTooltip, state, hash, proof, showTimestamp]);

    // Convert tooltip ReactNode to string for title attribute
    const tooltipString = React.useMemo(() => {
      if (typeof tooltip === "string") return tooltip;
      return null;
    }, [tooltip]);

    // Aria label for accessibility
    const ariaLabel = React.useMemo(() => {
      const stateText = {
        verified: "verified proof",
        pending: "pending proof",
        failed: "failed proof",
        none: "no proof",
      };

      if (compact && hash) {
        return `${stateText[state]}: ${hash}`;
      }

      return `${label}, ${stateText[state]}${hash ? `, hash: ${displayHash}` : ""}`;
    }, [state, label, hash, displayHash, compact]);

    // Handle click
    const handleClick = React.useCallback(() => {
      if (onProofClick) {
        onProofClick(proof || undefined);
      }
    }, [onProofClick, proof]);

    // Keyboard handler
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (onProofClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      },
      [onProofClick, handleClick]
    );

    return (
      <div
        ref={ref}
        className={cn(
          proofBadgeVariants({ state, size, interactive, showIcon }),
          className
        )}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={ariaLabel}
        title={typeof tooltip === "string" ? tooltip : ariaLabel}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...props}
      >
        {/* Verification icon */}
        {showIcon && (
          <span className="flex-shrink-0 leading-none" aria-hidden="true">
            {PROOF_ICONS[state]}
          </span>
        )}

        {/* Content */}
        {compact ? (
          // Compact mode: hash only
          displayHash && (
            <span className="flex-shrink-0 leading-none tabular-nums">
              {displayHash}
            </span>
          )
        ) : (
          // Normal mode: label and optional hash
          <>
            <span className="flex-shrink-0 leading-none">{label}</span>
            {displayHash && (
              <>
                <span className="opacity-50" aria-hidden="true">
                  ·
                </span>
                <span className="flex-shrink-0 leading-none tabular-nums opacity-70">
                  {displayHash}
                </span>
              </>
            )}
          </>
        )}

        {/* Verification pulse indicator (verified state only) */}
        {state === "verified" && (
          <span className="relative flex h-1.5 w-1.5 ml-0.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-status-verified opacity-75 animate-ping-slow" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-verified" />
          </span>
        )}
      </div>
    );
  }
);

ProofBadge.displayName = "ProofBadge";

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * VerifiedBadge - Pre-configured verified proof
 */
export const VerifiedBadge = React.forwardRef<
  HTMLDivElement,
  Omit<ProofBadgeProps, "state">
>((props, ref) => {
  return <ProofBadge ref={ref} state="verified" {...props} />;
});

VerifiedBadge.displayName = "VerifiedBadge";

/**
 * PendingBadge - Pre-configured pending verification
 */
export const PendingBadge = React.forwardRef<
  HTMLDivElement,
  Omit<ProofBadgeProps, "state">
>((props, ref) => {
  return (
    <ProofBadge ref={ref} state="pending" label="Verifying..." {...props} />
  );
});

PendingBadge.displayName = "PendingBadge";

/**
 * ProofHashBadge - Compact hash-only display
 */
export const ProofHashBadge = React.forwardRef<
  HTMLDivElement,
  Omit<ProofBadgeProps, "compact">
>((props, ref) => {
  return <ProofBadge ref={ref} compact {...props} />;
});

ProofHashBadge.displayName = "ProofHashBadge";

// ============================================================================
// PROOF BADGE GROUP - Multiple proofs layout
// ============================================================================

export interface ProofBadgeGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of proofs to display
   */
  proofs: (ProofArtifact | null | undefined)[];

  /**
   * Layout orientation
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Maximum number of badges to show (rest in "+" indicator)
   */
  maxVisible?: number;

  /**
   * Badge size
   */
  size?: ProofBadgeProps["size"];

  /**
   * Click handler for individual proofs
   */
  onProofClick?: (proof: ProofArtifact, index: number) => void;

  /**
   * Click handler for overflow indicator
   */
  onShowAll?: () => void;
}

/**
 * ProofBadgeGroup - Display multiple proofs with overflow handling
 *
 * @example
 * ```tsx
 * <ProofBadgeGroup
 *   proofs={decisionProofs}
 *   maxVisible={3}
 *   onProofClick={(proof) => showProofModal(proof)}
 *   onShowAll={() => showAllProofsModal()}
 * />
 * ```
 */
export const ProofBadgeGroup = React.forwardRef<
  HTMLDivElement,
  ProofBadgeGroupProps
>(
  (
    {
      className,
      proofs,
      orientation = "horizontal",
      maxVisible = 3,
      size = "sm",
      onProofClick,
      onShowAll,
      ...props
    },
    ref
  ) => {
    // Filter out null/undefined proofs
    const validProofs = React.useMemo(
      () => proofs.filter((p): p is ProofArtifact => !!p),
      [proofs]
    );

    // Split visible and overflow proofs
    const visibleProofs = validProofs.slice(0, maxVisible);
    const overflowCount = Math.max(0, validProofs.length - maxVisible);

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2",
          orientation === "vertical" && "flex-col",
          orientation === "horizontal" && "flex-row flex-wrap",
          className
        )}
        role="list"
        aria-label={`${validProofs.length} verification proof${validProofs.length === 1 ? "" : "s"}`}
        {...props}
      >
        {/* Visible proofs */}
        {visibleProofs.map((proof, index) => (
          <div key={proof.proofId || index} role="listitem">
            <ProofBadge
              proof={proof}
              size={size}
              onProofClick={
                onProofClick ? () => onProofClick(proof, index) : undefined
              }
            />
          </div>
        ))}

        {/* Overflow indicator */}
        {overflowCount > 0 && (
          <div role="listitem">
            <div
              className={cn(
                proofBadgeVariants({
                  state: "none",
                  size,
                  interactive: !!onShowAll,
                }),
                "font-semibold"
              )}
              role={onShowAll ? "button" : undefined}
              tabIndex={onShowAll ? 0 : undefined}
              onClick={onShowAll}
              onKeyDown={
                onShowAll
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onShowAll();
                      }
                    }
                  : undefined
              }
              title={`Show ${overflowCount} more proof${overflowCount === 1 ? "" : "s"}`}
              aria-label={`Show ${overflowCount} more verification proof${overflowCount === 1 ? "" : "s"}`}
            >
              +{overflowCount}
            </div>
          </div>
        )}
      </div>
    );
  }
);

ProofBadgeGroup.displayName = "ProofBadgeGroup";

// ============================================================================
// EXPORTS
// ============================================================================

export default ProofBadge;
