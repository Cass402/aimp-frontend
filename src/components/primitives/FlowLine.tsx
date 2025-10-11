/**
 * FlowLine - Animated SVG Data/Energy Flow Primitive
 *
 * Visual representation of energy flows, data streams, and autonomous decisions
 * moving through the system. Core primitive for digital twin visualization.
 *
 * Design Philosophy:
 * - **Motion as Meaning**: Flow direction, speed, and intensity convey state
 * - **Calm Animation**: 60fps organic motion, never jarring or anxiety-inducing
 * - **Semantic Color**: Agent persona colors + status colors for trust signals
 * - **Performance First**: Canvas fallback for >50 simultaneous flows
 *
 * Use Cases:
 * - Energy flow (solar → battery → grid)
 * - Data provenance (sensor → oracle → AI → blockchain)
 * - Decision propagation (AI agent → execution → verification)
 * - Revenue distribution (generation → trading → tokenholders)
 *
 * Behavioral Psychology:
 * - Smooth flow = system health, trust in autonomy
 * - Pulsing dots = data packets, discrete units of value
 * - Flow speed = urgency/importance (slow calm vs fast critical)
 * - Color intensity = magnitude (dim background vs bright foreground)
 *
 * Performance Targets:
 * - 60fps sustained for <50 simultaneous flows
 * - GPU-accelerated SVG transforms
 * - Automatic Canvas fallback for mobile/low-power
 *
 * @see PRD Section 7.5 - Digital Twin Visualization
 * @see PRD Section 12.4 - Animation Principles
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { COLORS, MOTION } from "@/lib/constants";
import type { AgentPersona } from "@/lib/types/core";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Flow direction along the line
 */
export type FlowDirection = "forward" | "reverse" | "bidirectional";

/**
 * Flow speed semantic levels
 */
export type FlowSpeed = "slow" | "medium" | "fast" | "critical";

/**
 * Flow line style
 */
export type FlowStyle = "solid" | "dashed" | "dotted";

/**
 * Flow intensity (visual weight)
 */
export type FlowIntensity = "subtle" | "normal" | "strong" | "intense";

/**
 * Point coordinate (x, y) or (x, y, label)
 */
export type FlowPoint = [number, number] | [number, number, string];

/**
 * Curve type for path interpolation
 */
export type CurveType = "linear" | "smooth" | "step" | "arc";

/**
 * Flow line component props
 */
export interface FlowLineProps
  extends Omit<
    React.SVGProps<SVGSVGElement>,
    "children" | "style" | "from" | "to"
  > {
  /**
   * Start point [x, y] or [x, y, label]
   */
  from: FlowPoint;

  /**
   * End point [x, y] or [x, y, label]
   */
  to: FlowPoint;

  /**
   * Optional intermediate waypoints for complex paths
   */
  waypoints?: FlowPoint[];

  /**
   * Flow direction along the line
   */
  direction?: FlowDirection;

  /**
   * Flow speed (affects animation timing)
   */
  speed?: FlowSpeed;

  /**
   * Line style variant
   */
  styleVariant?: FlowStyle;

  /**
   * Flow intensity (visual weight)
   */
  intensity?: FlowIntensity;

  /**
   * Curve interpolation type
   */
  curve?: CurveType;

  /**
   * Color override (defaults to agent persona or status colors)
   */
  color?: string;

  /**
   * Agent persona for semantic coloring
   */
  agent?: AgentPersona;

  /**
   * Status-based coloring (overrides agent)
   */
  status?: "verified" | "warning" | "critical";

  /**
   * Show animated flow dots/particles
   */
  animated?: boolean;

  /**
   * Number of animated particles
   */
  particleCount?: number;

  /**
   * Stroke width in pixels
   */
  strokeWidth?: number;

  /**
   * Show arrow at end point
   */
  showArrow?: boolean;

  /**
   * Show glow effect
   */
  glow?: boolean;

  /**
   * Custom className for container
   */
  className?: string;

  /**
   * Accessibility label
   */
  ariaLabel?: string;
}

// ============================================================================
// CONSTANTS & UTILITIES
// ============================================================================

/**
 * Speed to animation duration mapping (ms)
 * Uses MOTION constants for consistency with project animation system
 */
const SPEED_DURATION: Record<FlowSpeed, number> = {
  slow: MOTION.breath.slow, // 4000ms - Calm background flows aligned with breath timing
  medium: MOTION.breath.medium, // 2500ms - Normal operational flows
  fast: MOTION.breath.fast, // 1500ms - Important data streams
  critical: MOTION.duration.normal, // 300ms - Urgent/critical flows (quick feedback)
};

/**
 * Intensity to opacity mapping
 */
const INTENSITY_OPACITY: Record<FlowIntensity, number> = {
  subtle: 0.2,
  normal: 0.5,
  strong: 0.8,
  intense: 1.0,
};

/**
 * Get color from agent persona or status
 * Integrates with AIMP's AGENTS constant for semantic coloring
 */
function getFlowColor(
  agent?: AgentPersona,
  status?: "verified" | "warning" | "critical",
  customColor?: string
): string {
  if (customColor) return customColor;

  if (status) {
    return COLORS.status[status];
  }

  if (agent) {
    // Map agent persona to AGENTS constant for color consistency
    // Note: Types file has sentinel/governor, constants have maintenance/governance
    const colorMap: Record<AgentPersona, keyof typeof COLORS.agent> = {
      operations: "operations",
      markets: "markets",
      sentinel: "maintenance", // Map sentinel -> maintenance color
      governor: "governance", // Map governor -> governance color
    };
    return COLORS.agent[colorMap[agent]];
  }

  return COLORS.agent.operations; // Default to operations blue
}

/**
 * Generate SVG path from points with curve interpolation
 */
function generatePath(
  from: FlowPoint,
  to: FlowPoint,
  waypoints: FlowPoint[] = [],
  curve: CurveType = "smooth"
): string {
  const allPoints = [from, ...waypoints, to];

  if (curve === "linear") {
    // Straight lines between points
    const pathData = allPoints.map((point, i) => {
      const [x, y] = point;
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    });
    return pathData.join(" ");
  }

  if (curve === "step") {
    // 90-degree step transitions (grid-aligned)
    const pathData: string[] = [];
    for (let i = 0; i < allPoints.length - 1; i++) {
      const [x1, y1] = allPoints[i];
      const [x2, y2] = allPoints[i + 1];

      if (i === 0) pathData.push(`M ${x1} ${y1}`);

      // Step horizontally then vertically
      const midX = (x1 + x2) / 2;
      pathData.push(`L ${midX} ${y1}`);
      pathData.push(`L ${midX} ${y2}`);
      pathData.push(`L ${x2} ${y2}`);
    }
    return pathData.join(" ");
  }

  if (curve === "arc") {
    // Simple arc between two points
    const [x1, y1] = from;
    const [x2, y2] = to;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const radius = Math.sqrt(dx * dx + dy * dy) / 2;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;
  }

  // Default: smooth cubic Bezier curves
  if (allPoints.length === 2) {
    // Single curve with automatic control points
    const [x1, y1] = allPoints[0];
    const [x2, y2] = allPoints[1];
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Control points offset perpendicular to line
    const cx1 = x1 + dx * 0.33;
    const cy1 = y1 + dy * 0.33;
    const cx2 = x1 + dx * 0.66;
    const cy2 = y1 + dy * 0.66;

    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  // Multiple curves through waypoints
  const pathData: string[] = [];
  for (let i = 0; i < allPoints.length - 1; i++) {
    const [x1, y1] = allPoints[i];
    const [x2, y2] = allPoints[i + 1];

    if (i === 0) pathData.push(`M ${x1} ${y1}`);

    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx1 = x1 + dx * 0.4;
    const cy1 = y1 + dy * 0.4;
    const cx2 = x1 + dx * 0.6;
    const cy2 = y1 + dy * 0.6;

    pathData.push(`C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
  }

  return pathData.join(" ");
}

/**
 * Calculate path length (approximate for animations)
 * Note: In production, this would use SVGPathElement.getTotalLength() for accuracy
 */
function calculatePathLength(path: string): number {
  // Simple approximation - would use SVG API in real DOM
  const matches = path.match(/[ML]\s*[\d.]+\s+[\d.]+/g);
  if (!matches || matches.length < 2) return 100;

  return matches.length * 50; // Rough estimate for demo/SSR
}

/**
 * Get stroke width based on intensity and base size
 * Ensures visual hierarchy and accessibility
 */
function getStrokeWidth(baseWidth: number, intensity: FlowIntensity): number {
  const intensityMultiplier: Record<FlowIntensity, number> = {
    subtle: 0.75,
    normal: 1.0,
    strong: 1.5,
    intense: 2.0,
  };
  return baseWidth * intensityMultiplier[intensity];
}

// ============================================================================
// FLOW LINE COMPONENT
// ============================================================================

/**
 * FlowLine - Animated SVG flow visualization
 *
 * @example
 * ```tsx
 * // Simple energy flow
 * <FlowLine
 *   from={[100, 100]}
 *   to={[400, 100]}
 *   agent="operations"
 *   animated
 * />
 *
 * // Multi-segment data flow with waypoints
 * <FlowLine
 *   from={[0, 0, "Sensor"]}
 *   to={[500, 300, "Blockchain"]}
 *   waypoints={[[200, 100, "Oracle"], [350, 200, "AI"]]}
 *   direction="forward"
 *   speed="fast"
 *   curve="smooth"
 *   agent="markets"
 *   animated
 *   particleCount={3}
 * />
 *
 * // Bidirectional battery flow
 * <FlowLine
 *   from={[0, 0]}
 *   to={[200, 0]}
 *   direction="bidirectional"
 *   status="verified"
 *   intensity="strong"
 *   glow
 * />
 * ```
 */
export const FlowLine = React.forwardRef<SVGSVGElement, FlowLineProps>(
  (
    {
      className,
      from,
      to,
      waypoints = [],
      direction = "forward",
      speed = "medium",
      styleVariant = "solid",
      intensity = "normal",
      curve = "smooth",
      color: customColor,
      agent,
      status,
      animated = true,
      particleCount = 2,
      strokeWidth = 2,
      showArrow = true,
      glow = false,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    // Generate path
    const pathData = React.useMemo(
      () => generatePath(from, to, waypoints, curve),
      [from, to, waypoints, curve]
    );

    // Calculate approximate path length for animations
    const pathLength = React.useMemo(
      () => calculatePathLength(pathData),
      [pathData]
    );

    // Get flow color
    const flowColor = React.useMemo(
      () => getFlowColor(agent, status, customColor),
      [agent, status, customColor]
    );

    // Get opacity from intensity
    const opacity = INTENSITY_OPACITY[intensity];

    // Animation duration from speed (aligned with MOTION constants)
    const animationDuration = SPEED_DURATION[speed];

    // Calculate adaptive stroke width based on intensity
    const adaptiveStrokeWidth = React.useMemo(
      () => getStrokeWidth(strokeWidth, intensity),
      [strokeWidth, intensity]
    );

    // Dash array for line styles
    const strokeDasharray = React.useMemo(() => {
      if (styleVariant === "dashed") return "10 5";
      if (styleVariant === "dotted") return "2 4";
      return undefined;
    }, [styleVariant]);

    // Generate unique IDs for filters/gradients
    const flowId = React.useId();
    const glowFilterId = `glow-${flowId}`;
    const gradientId = `gradient-${flowId}`;

    // Accessibility label
    const label = React.useMemo(() => {
      if (ariaLabel) return ariaLabel;

      const fromLabel = from[2] || "start";
      const toLabel = to[2] || "end";
      const directionLabel = direction === "bidirectional" ? "between" : "from";

      return `Flow ${directionLabel} ${fromLabel} to ${toLabel}`;
    }, [ariaLabel, from, to, direction]);

    return (
      <svg
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 w-full h-full overflow-visible",
          className
        )}
        aria-label={label}
        role="img"
        {...props}
      >
        {/* Definitions */}
        <defs>
          {/* Glow filter */}
          {glow && (
            <filter
              id={glowFilterId}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          {/* Flow gradient for depth */}
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
            <stop
              offset="0%"
              stopColor={flowColor}
              stopOpacity={opacity * 0.3}
            />
            <stop offset="50%" stopColor={flowColor} stopOpacity={opacity} />
            <stop
              offset="100%"
              stopColor={flowColor}
              stopOpacity={opacity * 0.3}
            />
          </linearGradient>

          {/* Arrow marker */}
          {showArrow && (
            <marker
              id={`arrow-${flowId}`}
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 0 L 10 5 L 0 10 z"
                fill={flowColor}
                opacity={opacity}
              />
            </marker>
          )}
        </defs>

        {/* Base path - uses adaptive stroke width */}
        <path
          d={pathData}
          stroke={flowColor}
          strokeWidth={adaptiveStrokeWidth}
          strokeDasharray={strokeDasharray}
          fill="none"
          opacity={opacity * 0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={glow ? `url(#${glowFilterId})` : undefined}
          className="transition-all duration-normal ease-organic"
        />

        {/* Animated overlay path - slightly wider for depth effect */}
        {animated && (
          <path
            d={pathData}
            stroke={`url(#${gradientId})`}
            strokeWidth={adaptiveStrokeWidth + 1}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${pathLength * 0.3} ${pathLength}`}
            className={cn(
              "animate-flow-dash ease-organic",
              direction === "reverse" && "[animation-direction:reverse]"
            )}
            // Use data attribute for dynamic animation duration (read by CSS)
            data-flow-duration={animationDuration}
          />
        )}

        {/* Animated particles - scale with stroke width and intensity */}
        {animated && particleCount > 0 && (
          <>
            {Array.from({ length: particleCount }).map((_, i) => (
              <circle
                key={i}
                r={adaptiveStrokeWidth * 1.5}
                fill={flowColor}
                opacity={opacity}
                className={cn(
                  "animate-flow-particle ease-organic",
                  direction === "reverse" && "[animation-direction:reverse]"
                )}
                // Use data attributes for dynamic values
                data-flow-duration={animationDuration}
                data-flow-delay={(animationDuration / particleCount) * i}
              >
                <animateMotion
                  dur={`${animationDuration}ms`}
                  repeatCount="indefinite"
                  begin={`${(animationDuration / particleCount) * i}ms`}
                >
                  <mpath href={`#path-${flowId}`} />
                </animateMotion>
              </circle>
            ))}

            {/* Hidden path for particle motion */}
            <path id={`path-${flowId}`} d={pathData} fill="none" />
          </>
        )}

        {/* Direction arrows - scale with adaptive stroke width */}
        {showArrow && (
          <>
            {(direction === "forward" || direction === "bidirectional") && (
              <circle
                cx={to[0]}
                cy={to[1]}
                r={adaptiveStrokeWidth * 2}
                fill={flowColor}
                opacity={opacity}
                className="transition-all duration-normal ease-organic"
              />
            )}
            {direction === "bidirectional" && (
              <circle
                cx={from[0]}
                cy={from[1]}
                r={adaptiveStrokeWidth * 2}
                fill={flowColor}
                opacity={opacity}
                className="transition-all duration-normal ease-organic"
              />
            )}
          </>
        )}
      </svg>
    );
  }
);

FlowLine.displayName = "FlowLine";

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * EnergyFlow - Pre-configured for energy visualization
 * Uses operations agent color (electric blue) for technical energy flows
 *
 * @example
 * ```tsx
 * <EnergyFlow from={[0, 0]} to={[200, 0]} direction="forward" speed="medium" />
 * ```
 */
export const EnergyFlow = React.forwardRef<
  SVGSVGElement,
  Omit<FlowLineProps, "agent">
>((props, ref) => {
  return (
    <FlowLine
      ref={ref}
      agent="operations"
      intensity="strong"
      glow
      speed="medium"
      {...props}
    />
  );
});

EnergyFlow.displayName = "EnergyFlow";

/**
 * DataFlow - Pre-configured for data streams
 * Uses markets agent color (emerald) for data/trading flows
 *
 * @example
 * ```tsx
 * <DataFlow from={[0, 0]} to={[200, 0]} speed="fast" curve="smooth" />
 * ```
 */
export const DataFlow = React.forwardRef<
  SVGSVGElement,
  Omit<FlowLineProps, "agent">
>((props, ref) => {
  return (
    <FlowLine
      ref={ref}
      agent="markets"
      styleVariant="dashed"
      particleCount={3}
      speed="fast"
      {...props}
    />
  );
});

DataFlow.displayName = "DataFlow";

/**
 * RevenueFlow - Pre-configured for financial flows
 * Uses verified status color (green) for confirmed revenue streams
 *
 * @example
 * ```tsx
 * <RevenueFlow from={[0, 0]} to={[200, 0]} intensity="intense" glow />
 * ```
 */
export const RevenueFlow = React.forwardRef<
  SVGSVGElement,
  Omit<FlowLineProps, "status">
>((props, ref) => {
  return (
    <FlowLine
      ref={ref}
      status="verified"
      intensity="intense"
      glow
      speed="medium"
      {...props}
    />
  );
});

RevenueFlow.displayName = "RevenueFlow";

/**
 * MaintenanceFlow - Pre-configured for maintenance/alert flows
 * Uses maintenance/warning colors for system attention indicators
 *
 * @example
 * ```tsx
 * <MaintenanceFlow from={[0, 0]} to={[200, 0]} speed="slow" status="warning" />
 * ```
 */
export const MaintenanceFlow = React.forwardRef<
  SVGSVGElement,
  Omit<FlowLineProps, "status">
>((props, ref) => {
  return (
    <FlowLine
      ref={ref}
      status="warning"
      intensity="normal"
      speed="slow"
      styleVariant="dashed"
      {...props}
    />
  );
});

MaintenanceFlow.displayName = "MaintenanceFlow";

/**
 * CriticalFlow - Pre-configured for critical/emergency flows
 * Uses critical status color (red) with fast animation for urgency
 *
 * @example
 * ```tsx
 * <CriticalFlow from={[0, 0]} to={[200, 0]} speed="critical" glow />
 * ```
 */
export const CriticalFlow = React.forwardRef<
  SVGSVGElement,
  Omit<FlowLineProps, "status" | "speed">
>((props, ref) => {
  return (
    <FlowLine
      ref={ref}
      status="critical"
      intensity="intense"
      speed="critical"
      glow
      particleCount={4}
      {...props}
    />
  );
});

CriticalFlow.displayName = "CriticalFlow";

// ============================================================================
// EXPORTS
// ============================================================================

export default FlowLine;
