/**
 * Motion Primitives - Reusable Animation Wrappers
 *
 * Declarative animation components for consistent, performant motion patterns.
 * Every animation respects user preferences and maintains 60fps target.
 *
 * Design Philosophy:
 * - **Motion as Meaning**: Animations convey state changes, never decorative
 * - **Calm Precision**: Organic easing, no jarring movements
 * - **Respect Autonomy**: Honors prefers-reduced-motion
 * - **Performance First**: GPU-accelerated, will-change hints
 * - **Composable**: Stackable for complex choreography
 *
 * Animation Principles (PRD Section 12.5):
 * - Enter: 400-600ms with organic easing
 * - Exit: 200-300ms (faster than enter)
 * - Stagger: 50-100ms delay between items
 * - Hover: 150ms for instant feedback
 * - Transform-only: Use translate/scale/opacity for 60fps
 *
 * Accessibility:
 * - Auto-detects prefers-reduced-motion
 * - Reduces duration to 50ms for reduced motion
 * - Disables scale/rotate, keeps opacity/translate
 *
 * @see PRD Section 12.5 - Motion Design System
 * @see WCAG 2.2.2 Pause, Stop, Hide (Level A)
 */

"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { MOTION, PERFORMANCE, BEHAVIOR } from "@/lib/constants";
import type { TrustMathematics, OperationalStatus } from "@/lib/types";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Animation direction for slides
 */
export type SlideDirection = "up" | "down" | "left" | "right";

/**
 * Agent persona for animation calibration
 * Each agent has distinct motion characteristics reflecting their cognitive style
 */
export type AgentPersona = "operations" | "markets" | "sentinel" | "governor";

/**
 * Trust level for motion intensity modulation
 * Higher trust = more confident/assertive motion
 */
export type TrustLevel = "excellent" | "good" | "fair" | "poor" | "suspect";

/**
 * System state affecting motion behavior
 * Different states produce distinct motion personalities
 */
export type SystemState =
  | "normal" // Standard operations
  | "degraded" // Reduced performance indication
  | "emergency" // Critical state with desaturated motion
  | "paused"; // System paused, minimal motion

/**
 * Flow direction for energy/data visualization
 */
export type FlowDirection =
  | "charging"
  | "discharging"
  | "bidirectional"
  | "idle";

/**
 * Governance animation state
 */
export type GovernanceState = "enforcing" | "voting" | "compliant" | "violated";

/**
 * Base motion component props
 */
export interface BaseMotionProps {
  /**
   * Animation delay in seconds
   */
  delay?: number;

  /**
   * Animation duration in seconds (auto-adjusted for reduced motion)
   */
  duration?: number;

  /**
   * Disable animation (renders instantly)
   */
  disabled?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Children to animate
   */
  children: React.ReactNode;
}

/**
 * AIMP-enhanced motion props with trust and agent awareness
 */
export interface AIMPMotionProps extends BaseMotionProps {
  /**
   * Agent persona influencing motion characteristics
   * - operations: Steady, technical (1.0× speed)
   * - markets: Quick, analytical (1.2× speed)
   * - sentinel: Vigilant, measured (0.9× speed)
   * - governor: Authoritative, precise (1.1× speed)
   */
  agent?: AgentPersona;

  /**
   * Trust level modulating motion confidence
   * Higher trust = more assertive animations
   */
  trustLevel?: TrustLevel;

  /**
   * System state affecting motion behavior
   */
  systemState?: SystemState;

  /**
   * Data freshness in seconds (affects motion urgency)
   * Fresh data (<10s) = confident motion
   * Stale data (>300s) = subdued motion
   */
  freshnessSeconds?: number;
}

/**
 * Enhanced motion props with TrustMathematics integration
 */
export interface TrustMathMotionProps extends BaseMotionProps {
  /**
   * Full trust mathematics object for data-driven motion
   */
  trustMath?: TrustMathematics;

  /**
   * Operational status affecting motion characteristics
   */
  operationalStatus?: OperationalStatus;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Fade variants (opacity only)
 */
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide variants (opacity + translate)
 */
const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  down: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 12 },
  },
  left: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -12 },
  },
  right: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 12 },
  },
};

/**
 * Scale variants (opacity + scale)
 */
const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

/**
 * Blur variants (opacity + filter blur)
 */
const blurVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(4px)" },
};

/**
 * Proof glow variants - for cryptographic verification visualization
 */
/**
 * Emergency state variants - desaturated, minimal motion
 */
const emergencyVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 }, // Reduced opacity for emergency
  exit: { opacity: 0 },
};

/**
 * Status change variants - subtle scale pulse for state transitions
 */
const statusChangeVariants: Variants = {
  hidden: { scale: 1 },
  visible: { scale: [1, 1.1, 1] },
  exit: { scale: 1 },
};

/**
 * Alert pulse variants - 3 pulses then stop for critical alerts
 */
const alertPulseVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: [1, 0.7, 1, 0.7, 1, 0.7, 1],
  },
  exit: { opacity: 1 },
};

/**
 * Shimmer variants - loading/processing animation
 */
const shimmerVariants: Variants = {
  hidden: { backgroundPosition: "-200% 0" },
  visible: {
    backgroundPosition: "200% 0",
  },
  exit: { backgroundPosition: "200% 0" },
};

/**
 * Press down/up variants - button interaction feedback
 */
const pressDownVariants: Variants = {
  hidden: { scale: 1 },
  visible: { scale: 0.98 },
  exit: { scale: 1 },
};

const pressUpVariants: Variants = {
  hidden: { scale: 0.98 },
  visible: { scale: 1 },
  exit: { scale: 1 },
};

/**
 * Flow animation variants - for energy/data visualization
 */
const flowVariants = {
  charging: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  },
  discharging: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  },
  bidirectional: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 1, 0],
      x: [-50, 0, 0, 50],
    },
    exit: { opacity: 0 },
  },
  idle: {
    hidden: { opacity: 0.3 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  },
};

/**
 * Governance animation variants
 */
const governanceVariants = {
  enforcing: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: { opacity: 0, scale: 0.95 },
  },
  voting: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.7, 1, 0.7],
    },
    exit: { opacity: 0 },
  },
  compliant: {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  },
  violated: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [1, 0.6, 1],
      scale: [1, 1.05, 1],
    },
    exit: { opacity: 0 },
  },
};

/**
 * Operational status variants
 */
const operationalStatusVariants = {
  optimal: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  nominal: {
    hidden: { opacity: 0 },
    visible: { opacity: 0.95 },
    exit: { opacity: 0 },
  },
  degraded: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.7, 0.85, 0.7],
    },
    exit: { opacity: 0 },
  },
  maintenance: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.6, 0.9, 0.6],
      scale: [1, 1.02, 1],
    },
    exit: { opacity: 0 },
  },
  fault: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [1, 0.5, 1, 0.5, 1, 0.5, 1],
    },
    exit: { opacity: 0 },
  },
};

// ============================================================================
// REDUCED MOTION DETECTION & MOTION CALIBRATION
// ============================================================================

/**
 * Hook to detect user's motion preference
 */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Get agent-specific motion multiplier
 * Each agent persona has distinct motion characteristics
 */
function getAgentMotionMultiplier(agent?: AgentPersona): number {
  if (!agent) return 1.0;

  const multipliers: Record<AgentPersona, number> = {
    operations: 1.0, // Steady, technical precision
    markets: 1.2, // Quick, analytical responses
    sentinel: 0.9, // Measured, vigilant caution
    governor: 1.1, // Authoritative, balanced
  };

  return multipliers[agent];
}

/**
 * Get agent-specific easing curve
 * Each agent persona has a distinct motion personality
 */
function getAgentEasing(agent?: AgentPersona): string {
  if (!agent) return MOTION.easing.organic;

  const easingMap: Record<AgentPersona, string> = {
    operations: MOTION.easing.organic, // Steady, predictable
    markets: MOTION.easing.bounceSoft, // Quick, analytical
    sentinel: MOTION.easing.glass, // Smooth, measured
    governor: MOTION.easing.easeOutBack, // Authoritative
  };

  return easingMap[agent];
}

/**
 * Get trust-based opacity modifier
 * Lower trust = reduced visual confidence
 */
function getTrustOpacity(trustLevel?: TrustLevel): number {
  if (!trustLevel) return 1.0;

  const opacityMap: Record<TrustLevel, number> = {
    excellent: 1.0, // Full confidence
    good: 0.95, // Slight reduction
    fair: 0.85, // Noticeable reduction
    poor: 0.7, // Significant reduction
    suspect: 0.6, // Minimal confidence
  };

  return opacityMap[trustLevel];
}

/**
 * Get TrustMathematics-based opacity with witness count and deviation
 * More witnesses and lower deviation = higher confidence
 */
function getTrustMathOpacity(trustMath?: TrustMathematics): number {
  if (!trustMath) return 1.0;

  // Base opacity from confidence score
  let opacity = trustMath.confidenceScore / 100;

  // Boost from multiple witnesses (cap at +0.1)
  const witnessBoost = Math.min(trustMath.witnessCount * 0.02, 0.1);
  opacity += witnessBoost;

  // Penalty from deviation (each sigma reduces by 0.05, cap at -0.2)
  const deviationPenalty = Math.min(trustMath.deviationSigma * 0.05, 0.2);
  opacity -= deviationPenalty;

  // Clamp to valid range
  return Math.max(0.5, Math.min(1.0, opacity));
}

/**
 * Get TrustMathematics-based duration modifier
 * High deviation or low witness count = slower, more cautious
 */
function getTrustMathDurationModifier(trustMath?: TrustMathematics): number {
  if (!trustMath) return 1.0;

  // Higher deviation = slower motion (up to 1.5× slower)
  const deviationFactor = 1 + Math.min(trustMath.deviationSigma * 0.15, 0.5);

  // Fewer witnesses = slightly slower (up to 1.2× slower)
  const witnessFactor =
    trustMath.witnessCount === 0
      ? 1.2
      : Math.max(1.0, 1.2 - trustMath.witnessCount * 0.1);

  return deviationFactor * witnessFactor;
}

/**
 * Check if TrustMathematics indicates alert condition
 */
function isAlertCondition(trustMath?: TrustMathematics): boolean {
  return trustMath?.exceedsThreshold === true;
}

/**
 * Get freshness-based duration modifier
 * Stale data = slower, more cautious animations
 */
function getFreshnessDurationModifier(freshnessSeconds?: number): number {
  if (freshnessSeconds === undefined) return 1.0;

  // Critical fresh: <10s = 1.0× (normal speed)
  if (freshnessSeconds < PERFORMANCE.freshness.critical) return 1.0;

  // Warning fresh: <60s = 1.1× (slightly slower)
  if (freshnessSeconds < PERFORMANCE.freshness.warning) return 1.1;

  // Stale: >300s = 1.3× (noticeably slower to indicate uncertainty)
  if (freshnessSeconds > PERFORMANCE.freshness.stale) return 1.3;

  // In between: interpolate
  return 1.2;
}

/**
 * Get trust decay opacity based on BEHAVIOR.trustDecayRate
 * Simulates trust degrading over time
 */
function getTrustDecayOpacity(ageSeconds: number): number {
  // trustDecayRate = 0.8 per minute
  const decayPerSecond = BEHAVIOR.trustDecayRate / 60;
  const decayFactor = Math.pow(1 - decayPerSecond, ageSeconds);
  return Math.max(0.5, decayFactor);
}

/**
 * Get operational status motion characteristics
 */
function getOperationalStatusCharacteristics(status?: OperationalStatus): {
  speedMultiplier: number;
  opacityModifier: number;
  shouldPulse: boolean;
} {
  if (!status)
    return { speedMultiplier: 1.0, opacityModifier: 1.0, shouldPulse: false };

  const characteristicsMap: Record<
    OperationalStatus,
    { speedMultiplier: number; opacityModifier: number; shouldPulse: boolean }
  > = {
    optimal: { speedMultiplier: 1.0, opacityModifier: 1.0, shouldPulse: false },
    nominal: {
      speedMultiplier: 1.0,
      opacityModifier: 0.95,
      shouldPulse: false,
    },
    degraded: { speedMultiplier: 1.3, opacityModifier: 0.8, shouldPulse: true },
    maintenance: {
      speedMultiplier: 1.2,
      opacityModifier: 0.85,
      shouldPulse: true,
    },
    fault: { speedMultiplier: 0.8, opacityModifier: 0.9, shouldPulse: true },
  };

  return characteristicsMap[status];
}

/**
 * Check if system state requires emergency motion mode
 */
function isEmergencyState(systemState?: SystemState): boolean {
  return systemState === "emergency";
}

/**
 * Check if motion should be paused
 */
function isMotionPaused(systemState?: SystemState): boolean {
  return systemState === "paused";
}

/**
 * Validate animation duration stays within 60fps budget
 * Returns adjusted duration if it risks frame drops
 */
/**
 * Validate animation duration against 60fps frame budget
 * Warns in development if animation may impact performance
 *
 * @param durationMs - Animation duration in milliseconds
 * @returns The validated duration (unchanged)
 */
export function validateFrameBudget(durationMs: number): number {
  const frameInterval = PERFORMANCE.targets.frameInterval; // 16ms
  const maxFrames = Math.ceil(durationMs / frameInterval);

  // If animation would take more than 60 frames (1 second), warn in dev
  if (maxFrames > 60 && process.env.NODE_ENV === "development") {
    console.warn(
      `Animation duration ${durationMs}ms may impact 60fps target (${maxFrames} frames)`
    );
  }

  return durationMs;
}

/**
 * Get instant perception duration for critical feedback
 * Uses PERFORMANCE.targets.instantPerception (100ms)
 */
function getInstantDuration(): number {
  return PERFORMANCE.targets.instantPerception;
}

/**
 * Get input latency compliant duration
 * Uses PERFORMANCE.targets.inputLatency (100ms)
 */
function getInputLatencyDuration(): number {
  return PERFORMANCE.targets.inputLatency;
}

// ============================================================================
// FADE IN COMPONENT
// ============================================================================

export interface FadeInProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {}

/**
 * FadeIn - Simple opacity animation
 *
 * @example
 * ```tsx
 * <FadeIn delay={0.2} duration={0.5}>
 *   <p>This text fades in</p>
 * </FadeIn>
 * ```
 */
export function FadeIn({
  children,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1], // organic easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SLIDE IN COMPONENT
// ============================================================================

export interface SlideInProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Slide direction
   */
  direction?: SlideDirection;
}

/**
 * SlideIn - Slide + fade animation
 *
 * @example
 * ```tsx
 * <SlideIn direction="up" delay={0.1}>
 *   <Card>Slides up from below</Card>
 * </SlideIn>
 * ```
 */
export function SlideIn({
  children,
  direction = "up",
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: SlideInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={slideVariants[direction]}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1], // organic easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SCALE IN COMPONENT
// ============================================================================

export interface ScaleInProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {}

/**
 * ScaleIn - Scale + fade animation
 *
 * @example
 * ```tsx
 * <ScaleIn delay={0.3}>
 *   <Button>Pops into view</Button>
 * </ScaleIn>
 * ```
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: ScaleInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  // Disable scale for reduced motion, use fade only
  const variants = prefersReducedMotion ? fadeVariants : scaleVariants;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1], // organic easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// BLUR IN COMPONENT
// ============================================================================

export interface BlurInProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {}

/**
 * BlurIn - Blur + fade animation (glass awakening effect)
 *
 * @example
 * ```tsx
 * <BlurIn delay={0.1}>
 *   <GlassCard>Glass awakening effect</GlassCard>
 * </BlurIn>
 * ```
 */
export function BlurIn({
  children,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: BlurInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  // Disable blur for reduced motion, use fade only
  const variants = prefersReducedMotion ? fadeVariants : blurVariants;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1], // organic easing
      }}
      className={cn("will-change-[filter,opacity]", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// STAGGER CONTAINER COMPONENT
// ============================================================================

export interface StaggerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Stagger delay between children (seconds)
   */
  staggerDelay?: number;

  /**
   * Initial delay before stagger begins (seconds)
   */
  initialDelay?: number;

  /**
   * Animation duration for each child
   */
  duration?: number;

  /**
   * Animation type for children
   */
  variant?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "scale";

  /**
   * Children to stagger
   */
  children: React.ReactNode;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * Stagger - Container for staggered child animations
 *
 * @example
 * ```tsx
 * <Stagger staggerDelay={0.1} variant="slide-up">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Stagger>
 * ```
 */
export function Stagger({
  children,
  staggerDelay = 0.08, // 80ms default stagger
  initialDelay = 0,
  duration = MOTION.duration.normal,
  variant = "fade",
  className,
  ...props
}: StaggerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;
  const reducedStagger = prefersReducedMotion ? 0 : staggerDelay;

  // Get variants based on type
  const getVariants = () => {
    switch (variant) {
      case "fade":
        return fadeVariants;
      case "slide-up":
        return slideVariants.up;
      case "slide-down":
        return slideVariants.down;
      case "slide-left":
        return slideVariants.left;
      case "slide-right":
        return slideVariants.right;
      case "scale":
        return prefersReducedMotion ? fadeVariants : scaleVariants;
      default:
        return fadeVariants;
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedStagger,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={getVariants()}
          transition={{
            duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
            ease: [0.25, 0.1, 0.25, 1], // organic easing
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================================
// PRESENCE WRAPPER (for exit animations)
// ============================================================================

export interface PresenceProps {
  /**
   * Condition to show/hide content
   */
  show: boolean;

  /**
   * Animation mode
   */
  mode?: "wait" | "sync" | "popLayout";

  /**
   * Children to animate
   */
  children: React.ReactNode;
}

/**
 * Presence - Wrapper for exit animations (requires AnimatePresence)
 *
 * Note: This is a placeholder. In production, import AnimatePresence from motion/react
 * and wrap conditional content to enable exit animations.
 *
 * @example
 * ```tsx
 * <Presence show={isOpen}>
 *   <FadeIn>
 *     <Modal>Content that fades out on exit</Modal>
 *   </FadeIn>
 * </Presence>
 * ```
 */
export function Presence({ show, children }: PresenceProps) {
  // Simple implementation without AnimatePresence
  // In production, use: <AnimatePresence mode={mode}>{show && children}</AnimatePresence>
  return show ? <>{children}</> : null;
}

// ============================================================================
// SCROLL REVEAL COMPONENT
// ============================================================================

export interface ScrollRevealProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Trigger when element is this % visible
   */
  threshold?: number;

  /**
   * Animation variant
   */
  variant?: "fade" | "slide-up" | "scale" | "blur";

  /**
   * Animate only once (don't re-trigger on scroll)
   */
  once?: boolean;
}

/**
 * ScrollReveal - Animate elements on scroll into view
 *
 * @example
 * ```tsx
 * <ScrollReveal variant="slide-up" threshold={0.3} once>
 *   <Section>Reveals when 30% visible</Section>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  threshold = 0.2,
  variant = "fade",
  once = true,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: ScrollRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  // Get variants based on type
  const getVariants = () => {
    switch (variant) {
      case "fade":
        return fadeVariants;
      case "slide-up":
        return slideVariants.up;
      case "scale":
        return prefersReducedMotion ? fadeVariants : scaleVariants;
      case "blur":
        return prefersReducedMotion ? fadeVariants : blurVariants;
      default:
        return fadeVariants;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={getVariants()}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1], // organic easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// AIMP-SPECIFIC MOTION COMPONENTS
// ============================================================================

export interface ProofGlowProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Whether proof is verified (triggers glow animation)
   */
  verified?: boolean;

  /**
   * Proof type for semantic color selection
   */
  proofType?: "zkProof" | "signature" | "merkle" | "commitment";
}

/**
 * ProofGlow - Cryptographic proof verification animation
 *
 * Uses BEHAVIOR.proofPulseInterval for timing consistency
 *
 * @example
 * ```tsx
 * <ProofGlow verified={true} proofType="zkProof">
 *   <ProofBadge hash="0x42...ab" />
 * </ProofGlow>
 * ```
 */
export function ProofGlow({
  children,
  verified = false,
  proofType = "zkProof",
  delay = 0,
  duration = MOTION.duration.relaxed,
  disabled = false,
  className,
  ...props
}: ProofGlowProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  // Get proof type specific styling hints
  const proofTypeClass =
    proofType === "zkProof"
      ? "data-[verified=true]:shadow-glow-verified"
      : "data-[verified=true]:shadow-proof";

  // Use BEHAVIOR.proofPulseInterval for glow timing
  const glowDuration = BEHAVIOR.proofPulseInterval / 1000; // Convert to seconds

  return (
    <motion.div
      initial="hidden"
      animate={verified ? "glow" : "visible"}
      exit="exit"
      variants={{
        hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        },
        glow: {
          opacity: [1, 0.85, 1],
          scale: [1, 1.02, 1],
          filter: ["blur(0px)", "blur(0px)", "blur(0px)"],
          transition: {
            duration: glowDuration,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
        exit: { opacity: 0, scale: 0.98, filter: "blur(2px)" },
      }}
      transition={{
        duration: reducedDuration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      data-verified={verified}
      data-proof-type={proofType}
      className={cn(
        "will-change-[opacity,transform,filter]",
        proofTypeClass,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface AgentMotionProps
  extends AIMPMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Animation variant
   */
  variant?: "fade" | "slide-up" | "scale" | "blur";
}

/**
 * AgentMotion - Agent persona-aware motion wrapper
 *
 * Automatically calibrates animation speed and confidence based on:
 * - Agent personality (operations = steady, markets = quick, etc.)
 * - Trust level (higher trust = more confident motion)
 * - Data freshness (stale data = more cautious motion)
 * - System state (emergency = minimal motion)
 *
 * @example
 * ```tsx
 * <AgentMotion
 *   agent="markets"
 *   trustLevel="excellent"
 *   freshnessSeconds={5}
 *   variant="slide-up"
 * >
 *   <AgentCard>Markets Agent Decision</AgentCard>
 * </AgentMotion>
 * ```
 */
export function AgentMotion({
  children,
  agent,
  trustLevel,
  systemState,
  freshnessSeconds,
  variant = "fade",
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: AgentMotionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Calculate calibrated motion parameters
  const agentMultiplier = getAgentMotionMultiplier(agent);
  const agentEasing = getAgentEasing(agent); // Agent-specific easing curve
  const freshnessModifier = getFreshnessDurationModifier(freshnessSeconds);
  const trustOpacity = getTrustOpacity(trustLevel);
  const emergency = isEmergencyState(systemState);
  const paused = isMotionPaused(systemState);

  // Combine all duration modifiers
  const calibratedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : emergency || paused
      ? 0 // No animation in emergency/paused
      : (duration / agentMultiplier) * freshnessModifier;

  if (disabled || paused) {
    return <div className={className}>{children}</div>;
  }

  // Get variants based on type and system state
  const getVariants = () => {
    if (emergency) return emergencyVariants;

    switch (variant) {
      case "fade":
        return fadeVariants;
      case "slide-up":
        return slideVariants.up;
      case "scale":
        return prefersReducedMotion ? fadeVariants : scaleVariants;
      case "blur":
        return prefersReducedMotion ? fadeVariants : blurVariants;
      default:
        return fadeVariants;
    }
  };

  // Parse easing string to array for motion
  const parseEasing = (easingStr: string): [number, number, number, number] => {
    const match = easingStr.match(/cubic-bezier\(([\d.,\s]+)\)/);
    if (match) {
      const values = match[1].split(",").map((n) => parseFloat(n.trim()));
      return [values[0], values[1], values[2], values[3]];
    }
    return [0.25, 0.1, 0.25, 1]; // Fallback to organic
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={getVariants()}
      transition={{
        duration: calibratedDuration,
        delay,
        ease: parseEasing(agentEasing),
      }}
      style={{ opacity: trustOpacity }}
      className={cn(
        emergency && "saturate-50", // Desaturate in emergency
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface TrustMotionProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Trust level affecting motion confidence
   */
  trustLevel: TrustLevel;

  /**
   * Data freshness in seconds
   */
  freshnessSeconds?: number;

  /**
   * Whether data is stale (overrides freshness calculation)
   */
  isStale?: boolean;
}

/**
 * TrustMotion - Trust-level calibrated motion
 *
 * Motion intensity and opacity adjust based on trust metrics:
 * - Excellent trust: Full confidence, normal speed
 * - Good trust: Slightly subdued
 * - Fair trust: Noticeably cautious
 * - Poor/Suspect: Minimal motion, low opacity
 *
 * @example
 * ```tsx
 * <TrustMotion trustLevel="good" freshnessSeconds={30}>
 *   <MetricCard confidence={85} />
 * </TrustMotion>
 * ```
 */
export function TrustMotion({
  children,
  trustLevel,
  freshnessSeconds,
  isStale = false,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: TrustMotionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trustOpacity = getTrustOpacity(trustLevel);
  const freshnessModifier = getFreshnessDurationModifier(freshnessSeconds);

  const calibratedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration * freshnessModifier;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeVariants}
      transition={{
        duration: calibratedDuration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ opacity: trustOpacity }}
      className={cn(
        isStale && "opacity-70", // Additional staleness indicator
        (trustLevel === "poor" || trustLevel === "suspect") && "opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface BreathingProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Breathing rhythm
   * - slow: 4000ms (calm system heartbeat)
   * - medium: 2500ms (normal activity)
   * - fast: 1500ms (active processing)
   */
  rhythm?: "slow" | "medium" | "fast";

  /**
   * Agent persona for color pulsing
   */
  agent?: AgentPersona;
}

/**
 * Breathing - Autonomous activity indicator
 *
 * Gentle pulsing animation indicating AI agent activity level.
 * Rhythm adjusts to convey different operational states without
 * being distracting.
 *
 * @example
 * ```tsx
 * <Breathing rhythm="medium" agent="operations">
 *   <ActivityIndicator />
 * </Breathing>
 * ```
 */
export function Breathing({
  children,
  rhythm = "medium",
  agent,
  delay = 0,
  disabled = false,
  className,
  ...props
}: BreathingProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const breathDuration = MOTION.breath[rhythm];

  // Get agent-specific glow class if agent provided
  const agentGlowClass = agent ? `shadow-glow-${agent}` : "";

  return (
    <motion.div
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.015, 1],
      }}
      transition={{
        duration: breathDuration / 1000, // Convert to seconds
        delay,
        repeat: Infinity,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      data-agent={agent}
      className={cn(
        "will-change-[opacity,transform]",
        agentGlowClass,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface EmergencyOverrideProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Whether emergency override is active
   */
  isActive: boolean;
}

/**
 * EmergencyOverride - Emergency state motion wrapper
 *
 * When emergency override is triggered:
 * - Desaturates content (grayscale effect)
 * - Reduces motion to minimal
 * - Applies red calm state visual treatment
 *
 * @example
 * ```tsx
 * <EmergencyOverride isActive={emergencyActive}>
 *   <Dashboard />
 * </EmergencyOverride>
 * ```
 */
export function EmergencyOverride({
  children,
  isActive,
  delay = 0,
  duration = MOTION.duration.fast,
  disabled = false,
  className,
  ...props
}: EmergencyOverrideProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        opacity: isActive ? 0.7 : 1,
        filter: isActive ? "saturate(0.2)" : "saturate(1)",
      }}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(
        "will-change-[opacity,filter]",
        isActive && "border-2 border-status-critical/50",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// TRUST MATHEMATICS MOTION COMPONENTS
// ============================================================================

export interface TrustMathMotionComponentProps
  extends TrustMathMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {}

/**
 * TrustMathMotion - Data-driven motion using TrustMathematics
 *
 * Motion characteristics automatically calibrated based on:
 * - witnessCount: More witnesses = more confident motion
 * - deviationSigma: Higher deviation = more cautious motion
 * - exceedsThreshold: Triggers alert-style pulsing
 * - confidenceScore: Affects opacity and duration
 *
 * @example
 * ```tsx
 * <TrustMathMotion
 *   trustMath={{
 *     confidenceScore: 85,
 *     witnessCount: 3,
 *     deviationSigma: 1.2,
 *     exceedsThreshold: false,
 *     trustGrade: "good"
 *   }}
 * >
 *   <DataCard />
 * </TrustMathMotion>
 * ```
 */
export function TrustMathMotion({
  children,
  trustMath,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: TrustMathMotionComponentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const opacity = getTrustMathOpacity(trustMath);
  const durationModifier = getTrustMathDurationModifier(trustMath);
  const isAlert = isAlertCondition(trustMath);

  const calibratedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration * durationModifier;

  // Add confidence delay for low-confidence data
  const confidenceDelay =
    trustMath && trustMath.confidenceScore < 70
      ? BEHAVIOR.confidenceDelay / 1000
      : 0;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate={isAlert ? "alert" : "visible"}
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity },
        alert: {
          opacity: [opacity, opacity * 0.7, opacity],
        },
        exit: { opacity: 0 },
      }}
      transition={{
        duration: calibratedDuration,
        delay: delay + confidenceDelay,
        ease: [0.25, 0.1, 0.25, 1],
        ...(isAlert && {
          repeat: 3,
        }),
      }}
      className={cn(
        isAlert && "animate-alert-pulse",
        trustMath?.trustGrade === "poor" && "opacity-70",
        trustMath?.trustGrade === "suspect" && "opacity-60",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface TrustDecayMotionProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Age of data in seconds for trust decay calculation
   */
  dataAgeSeconds: number;
}

/**
 * TrustDecayMotion - Animated trust degradation over time
 *
 * Uses BEHAVIOR.trustDecayRate to simulate trust fading as data ages
 *
 * @example
 * ```tsx
 * <TrustDecayMotion dataAgeSeconds={120}>
 *   <StaleDataWarning />
 * </TrustDecayMotion>
 * ```
 */
export function TrustDecayMotion({
  children,
  dataAgeSeconds,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: TrustDecayMotionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const decayOpacity = getTrustDecayOpacity(dataAgeSeconds);

  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: decayOpacity }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(dataAgeSeconds > 300 && "text-status-warning", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// OPERATIONAL STATUS MOTION COMPONENTS
// ============================================================================

export interface OperationalMotionProps
  extends TrustMathMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {}

/**
 * OperationalMotion - Motion based on operational status
 *
 * Maps operational states to appropriate motion characteristics:
 * - optimal: Full speed, confident
 * - nominal: Normal motion
 * - degraded: Slower, subdued with pulsing
 * - maintenance: Pulsing/breathing indication
 * - fault: Alert pulse
 *
 * @example
 * ```tsx
 * <OperationalMotion operationalStatus="degraded">
 *   <SystemStatusCard />
 * </OperationalMotion>
 * ```
 */
export function OperationalMotion({
  children,
  operationalStatus,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: OperationalMotionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const characteristics =
    getOperationalStatusCharacteristics(operationalStatus);
  const calibratedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration * characteristics.speedMultiplier;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants =
    operationalStatus && operationalStatusVariants[operationalStatus]
      ? operationalStatusVariants[operationalStatus]
      : fadeVariants;

  // Specific transitions for animated operational states
  const transitionConfig = (() => {
    if (!operationalStatus) {
      return {
        duration: calibratedDuration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      };
    }

    switch (operationalStatus) {
      case "degraded":
        return {
          duration: 3,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // easeInOut
        };
      case "maintenance":
        return {
          duration: 2.5,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // easeInOut
        };
      case "fault":
        return {
          duration: 1,
          times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // easeInOut
        };
      default:
        return {
          duration: calibratedDuration,
          delay,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        };
    }
  })();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={transitionConfig}
      style={{ opacity: characteristics.opacityModifier }}
      className={cn(
        operationalStatus === "fault" && "text-status-critical",
        operationalStatus === "degraded" && "text-status-warning",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// STATUS & INTERACTION MOTION COMPONENTS
// ============================================================================

export interface StatusChangeProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Trigger animation on state change
   */
  triggerKey?: string | number;
}

/**
 * StatusChange - Subtle pulse animation for state transitions
 *
 * @example
 * ```tsx
 * <StatusChange triggerKey={status}>
 *   <StatusIndicator status={status} />
 * </StatusChange>
 * ```
 */
export function StatusChange({
  children,
  triggerKey,
  delay = 0,
  duration = MOTION.duration.fast,
  disabled = false,
  className,
  ...props
}: StatusChangeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={triggerKey}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={statusChangeVariants}
      transition={{
        duration: reducedDuration / 1000, // Convert ms to seconds for Framer Motion
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface AlertPulseProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Whether alert is active (triggers 3 pulses)
   */
  isActive?: boolean;
}

/**
 * AlertPulse - Critical alert animation (3 pulses then stop)
 *
 * @example
 * ```tsx
 * <AlertPulse isActive={hasCriticalError}>
 *   <ErrorAlert />
 * </AlertPulse>
 * ```
 */
export function AlertPulse({
  children,
  isActive = false,
  disabled = false,
  className,
  ...props
}: AlertPulseProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={isActive ? "active" : "inactive"}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={alertPulseVariants}
      transition={{
        duration: 1,
        times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
        ease: [0.42, 0, 0.58, 1], // easeInOut approximation
      }}
      className={cn(isActive && "text-status-critical", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface ShimmerProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Whether shimmer animation is active
   */
  isLoading?: boolean;
}

/**
 * Shimmer - Loading/processing animation
 *
 * @example
 * ```tsx
 * <Shimmer isLoading={isProcessing}>
 *   <ProcessingIndicator />
 * </Shimmer>
 * ```
 */
export function Shimmer({
  children,
  isLoading = false,
  disabled = false,
  className,
  ...props
}: ShimmerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={isLoading ? "visible" : "hidden"}
      variants={shimmerVariants}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "linear",
      }}
      className={cn(
        isLoading &&
          "bg-gradient-to-r from-transparent via-glass-medium to-transparent bg-[length:200%_100%]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface PressInteractionProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Whether button is currently pressed
   */
  isPressed?: boolean;
}

/**
 * PressInteraction - Button press feedback animation
 *
 * Uses PERFORMANCE.targets.inputLatency for responsive feel
 *
 * @example
 * ```tsx
 * <PressInteraction isPressed={isPressed}>
 *   <Button>Click Me</Button>
 * </PressInteraction>
 * ```
 */
export function PressInteraction({
  children,
  isPressed = false,
  disabled = false,
  className,
  ...props
}: PressInteractionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { style, ...restProps } = props;
  const htmlProps = restProps as React.HTMLAttributes<HTMLDivElement>;

  if (disabled || prefersReducedMotion) {
    return (
      <div className={className} {...htmlProps}>
        {children}
      </div>
    );
  }

  const interactionDuration = getInputLatencyDuration() / 1000; // Convert to seconds

  return (
    <motion.div
      animate={isPressed ? "visible" : "exit"}
      variants={isPressed ? pressDownVariants : pressUpVariants}
      transition={{
        duration: interactionDuration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
      {...restProps}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// FLOW & GOVERNANCE MOTION COMPONENTS
// ============================================================================

export interface FlowAnimationProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Flow direction for energy/data visualization
   */
  direction?: FlowDirection;

  /**
   * Flow speed multiplier (1.0 = normal)
   */
  speed?: number;
}

/**
 * FlowAnimation - Energy/data flow visualization
 *
 * @example
 * ```tsx
 * <FlowAnimation direction="charging" speed={1.2}>
 *   <EnergyFlowPath />
 * </FlowAnimation>
 * ```
 */
export function FlowAnimation({
  children,
  direction = "idle",
  speed = 1.0,
  delay = 0,
  duration = MOTION.duration.normal,
  disabled = false,
  className,
  ...props
}: FlowAnimationProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const calibratedDuration = prefersReducedMotion
    ? MOTION.duration.instant
    : duration / speed;

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants = flowVariants[direction];

  // For bidirectional flow, we need infinite repeat
  const transitionConfig =
    direction === "bidirectional"
      ? {
          duration: 2,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // easeInOut
        }
      : {
          duration: calibratedDuration,
          delay,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={transitionConfig}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface GovernanceMotionProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {
  /**
   * Governance animation state
   */
  state?: GovernanceState;
}

/**
 * GovernanceMotion - Policy enforcement & voting animations
 *
 * Different motion for governance states:
 * - enforcing: Authoritative easeOutBack entry
 * - voting: Pulsing to indicate active voting
 * - compliant: Smooth confirmation
 * - violated: Alert pulse (3× repeat)
 *
 * @example
 * ```tsx
 * <GovernanceMotion state="enforcing">
 *   <PolicyCard />
 * </GovernanceMotion>
 * ```
 */
export function GovernanceMotion({
  children,
  state = "compliant",
  disabled = false,
  className,
  ...props
}: GovernanceMotionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = governanceVariants[state];

  // Different transitions for different states
  const transitionConfig = (() => {
    switch (state) {
      case "enforcing":
        return {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // easeOutBack
        };
      case "voting":
        return {
          duration: 2,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // easeInOut
        };
      case "violated":
        return {
          duration: 0.5,
          repeat: 3,
          ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // easeInOut
        };
      default:
        return {
          duration: MOTION.duration.normal,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        };
    }
  })();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={transitionConfig}
      className={cn(
        state === "violated" && "text-status-critical",
        state === "enforcing" && "text-agent-governance",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// INSTANT FEEDBACK COMPONENTS
// ============================================================================

export interface InstantFeedbackProps
  extends BaseMotionProps,
    Omit<HTMLMotionProps<"div">, "children"> {}

/**
 * InstantFeedback - Sub-100ms critical feedback
 *
 * Uses PERFORMANCE.targets.instantPerception (100ms) for
 * immediate user feedback that feels instantaneous
 *
 * @example
 * ```tsx
 * <InstantFeedback>
 *   <ToastNotification />
 * </InstantFeedback>
 * ```
 */
export function InstantFeedback({
  children,
  delay = 0,
  disabled = false,
  className,
  ...props
}: InstantFeedbackProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const instantDuration = getInstantDuration() / 1000; // Convert to seconds

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: prefersReducedMotion ? 0 : instantDuration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Comprehensive motion primitive exports
 * Organized by category for easy discovery
 */
const MotionPrimitives = {
  // Base animations
  FadeIn,
  SlideIn,
  ScaleIn,
  BlurIn,
  Stagger,
  Presence,
  ScrollReveal,

  // AIMP-specific animations
  ProofGlow,
  AgentMotion,
  TrustMotion,
  Breathing,
  EmergencyOverride,

  // Trust Mathematics motion
  TrustMathMotion,
  TrustDecayMotion,

  // Operational status motion
  OperationalMotion,

  // Status & interaction motion
  StatusChange,
  AlertPulse,
  Shimmer,
  PressInteraction,

  // Flow & governance motion
  FlowAnimation,
  GovernanceMotion,

  // Instant feedback
  InstantFeedback,
};

export default MotionPrimitives;
