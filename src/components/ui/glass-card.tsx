"use client";

import type { ReactNode, ElementType } from "react";
import { forwardRef } from "react";
import { LazyMotion, domAnimation, m, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

// ===========================================
// PERFORMANCE: Optimized prop types using React 19 patterns
// PSYCHOLOGY: Clear semantic variants that communicate purpose
// ===========================================

interface GlassCardProps {
  children: ReactNode;
  className?: string;

  // Enhanced padding system for better visual rhythm
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

  // Semantic variants that communicate trust and intelligence
  variant?:
    | "default"
    | "elevated"
    | "modal"
    | "neural"
    | "trust"
    | "prosperity";

  // AI activity states for dynamic trust building
  aiState?: "idle" | "processing" | "learning" | "optimizing" | "alert";

  // Motion preferences - respects user accessibility settings
  enableMotion?: boolean;

  // Trust-building micro-interactions
  trustLevel?: "low" | "medium" | "high";

  // Semantic HTML element for accessibility
  as?: ElementType;

  // Optional click handler for interactive cards
  onClick?: () => void;

  // Enhanced accessibility
  role?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

// ===========================================
// PERFORMANCE: Consolidated padding system reduces CSS overhead
// PSYCHOLOGY: Predictable spacing creates cognitive familiarity
// ===========================================

const paddingClasses: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  none: "",
  xs: "p-3 md:p-4", // 12px → 16px - tight spacing for dense info
  sm: "p-4 md:p-5", // 16px → 20px - compact cards
  md: "p-6 md:p-7", // 24px → 28px - balanced default
  lg: "p-8 md:p-10", // 32px → 40px - spacious content
  xl: "p-10 md:p-12", // 40px → 48px - hero sections
};

// ===========================================
// COGNITIVE PSYCHOLOGY: Semantic variants reduce cognitive load
// TRUST BUILDING: Each variant optimized for different trust contexts
// ===========================================

const variantClasses: Record<NonNullable<GlassCardProps["variant"]>, string> = {
  // Standard glassmorphic surface for general content
  default: cn(
    "bg-[var(--glass-surface-primary)]",
    "border border-[var(--glass-border-soft)]",
    "backdrop-blur-[var(--backdrop-blur-light)]",
    "shadow-[var(--shadow-neural-soft)]"
  ),

  // Elevated cards for important actions - builds trust through prominence
  elevated: cn(
    "bg-[var(--glass-surface-elevated)]",
    "border border-[var(--glass-border-strong)]",
    "backdrop-blur-[var(--backdrop-blur-medium)]",
    "shadow-[var(--shadow-neural-strong)]",
    "transform-gpu" // Performance: Force GPU layer
  ),

  // Modal overlays for critical interactions
  modal: cn(
    "bg-[var(--glass-surface-modal)]",
    "border border-[var(--glass-border-highlight)]",
    "backdrop-blur-[var(--backdrop-blur-heavy)]",
    "shadow-[var(--shadow-neural-floating)]"
  ),

  // Neural variant for AI-related content - builds intelligence trust
  neural: cn(
    "bg-gradient-to-br from-[var(--intelligence-primary)]/10 to-[var(--intelligence-secondary)]/5",
    "border border-[var(--intelligence-accent)]/20",
    "backdrop-blur-[var(--backdrop-blur-medium)]",
    "shadow-[var(--glow-neural-primary)]"
  ),

  // Trust variant for safety-critical information
  trust: cn(
    "bg-gradient-to-br from-[var(--trust-primary)]/8 to-[var(--trust-secondary)]/4",
    "border border-[var(--trust-primary)]/25",
    "backdrop-blur-[var(--backdrop-blur-light)]",
    "shadow-[var(--glow-trust-primary)]"
  ),

  // Prosperity variant for positive outcomes and growth
  prosperity: cn(
    "bg-gradient-to-br from-[var(--prosperity-primary)]/8 to-[var(--prosperity-energy)]/4",
    "border border-[var(--prosperity-primary)]/25",
    "backdrop-blur-[var(--backdrop-blur-light)]",
    "shadow-[var(--glow-prosperity-primary)]"
  ),
};

// ===========================================
// MOTION PSYCHOLOGY: Physics-based animations feel natural and trustworthy
// PERFORMANCE: Optimized for 60fps using transform and opacity only
// ===========================================

const motionVariants: Variants = {
  // Entrance animations that build anticipation and trust
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    filter: "blur(4px)",
  },

  // Settled state feels stable and trustworthy
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    // PERFORMANCE: Use will-change for GPU optimization (applied as a style/target, not a transition property)
    willChange: "transform, opacity, filter",
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 30,
      mass: 0.8,
    },
  },

  // Hover state provides immediate feedback - builds interactive trust
  hover: {
    scale: 1.01,
    y: -1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.6,
    },
  },

  // Focus state for keyboard navigation - accessibility first
  focus: {
    scale: 1.005,
    boxShadow: "0 0 0 3px var(--trust-primary), var(--glow-trust-primary)",
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },

  // Tap feedback on mobile - immediate response builds trust
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

// ===========================================
// AI STATE VISUAL FEEDBACK: Dynamic trust building through state communication
// PSYCHOLOGY: Users trust systems they can understand and predict
// ===========================================

const aiStateClasses: Record<NonNullable<GlassCardProps["aiState"]>, string> = {
  idle: "",
  processing: "ai-status-active animate-pulse",
  learning: "ai-status-learning",
  optimizing: "ai-status-optimizing",
  alert: "border-[var(--critical-primary)] shadow-[var(--critical-primary)]/20",
};

// ===========================================
// TRUST LEVEL INDICATORS: Progressive visual cues build confidence
// COGNITIVE PSYCHOLOGY: Visual hierarchy guides attention to trust signals
// ===========================================

const trustLevelClasses: Record<
  NonNullable<GlassCardProps["trustLevel"]>,
  string
> = {
  low: "opacity-90",
  medium: "opacity-95 border-[var(--trust-primary)]/15",
  high: cn(
    "opacity-100",
    "border-[var(--trust-primary)]/25",
    "shadow-[var(--glow-trust-primary)]",
    "relative after:absolute after:inset-0 after:rounded-[inherit]",
    "after:bg-gradient-to-r after:from-[var(--trust-primary)]/5 after:to-transparent",
    "after:pointer-events-none"
  ),
};

// ===========================================
// MAIN COMPONENT: ForwardRef for proper React 19 patterns
// PERFORMANCE: Memoization handled by React 19 compiler automatically
// ===========================================

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      padding = "md",
      variant = "default",
      aiState = "idle",
      enableMotion = true,
      trustLevel = "medium",
      as: Component = "div",
      onClick,
      role,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      ...props
    },
    ref
  ) => {
    // ===========================================
    // ACCESSIBILITY: Semantic roles and ARIA labels for screen readers
    // TRUST BUILDING: Clear communication of interactive capabilities
    // ===========================================

    const isInteractive = Boolean(onClick);
    const semanticRole = role || (isInteractive ? "button" : undefined);
    const semanticLabel =
      ariaLabel || (isInteractive ? "Interactive glass card" : undefined);

    // ===========================================
    // PERFORMANCE: Single className computation reduces reconciliation
    // COGNITIVE PSYCHOLOGY: Consistent class ordering improves mental model
    // ===========================================

    const cardClasses = cn(
      // Base glass card styling - establishes visual foundation
      "relative overflow-hidden",
      "rounded-[var(--radius-lg)]",
      "isolate", // Creates stacking context for proper layering
      "transform-gpu", // Force GPU acceleration for better performance

      // Variant-specific styling
      variantClasses[variant],

      // Spacing system
      paddingClasses[padding],

      // AI state feedback
      aiStateClasses[aiState],

      // Trust level indicators
      trustLevel && trustLevelClasses[trustLevel],

      // Interactive states
      isInteractive &&
        cn(
          "cursor-pointer",
          "transition-colors duration-200 ease-[var(--ease-organic)]",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--trust-primary)]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundation-void)]"
        ),

      // Custom classes override
      className
    );

    // ===========================================
    // PERFORMANCE OPTIMIZATION: Conditional motion loading
    // ACCESSIBILITY: Respects prefers-reduced-motion automatically
    // ===========================================

    if (!enableMotion) {
      return (
        <Component
          ref={ref}
          className={cardClasses}
          onClick={onClick}
          role={semanticRole}
          aria-label={semanticLabel}
          aria-describedby={ariaDescribedby}
          tabIndex={isInteractive ? 0 : undefined}
          {...props}
        >
          {/* Content container with proper z-index for layering */}
          <div className="relative z-10">{children}</div>
        </Component>
      );
    }

    // ===========================================
    // MOTION-ENABLED VERSION: Enhanced micro-interactions for trust building
    // PERFORMANCE: LazyMotion reduces bundle size, domAnimation optimizes for web
    // ===========================================

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          className={cardClasses}
          onClick={onClick}
          role={semanticRole}
          aria-label={semanticLabel}
          aria-describedby={ariaDescribedby}
          tabIndex={isInteractive ? 0 : undefined}
          // Motion configuration
          variants={motionVariants}
          initial="initial"
          animate="animate"
          whileHover={isInteractive ? "hover" : undefined}
          whileFocus={isInteractive ? "focus" : undefined}
          whileTap={isInteractive ? "tap" : undefined}
          // Performance optimizations
          style={{
            willChange: "transform, opacity", // Optimize for animations
          }}
          // Accessibility: Keyboard support for interactive cards
          onKeyDown={(e) => {
            if (isInteractive && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onClick?.();
            }
          }}
          {...props}
        >
          {/* 
          LAYERING SYSTEM: Proper z-index management for glass effects
          PSYCHOLOGY: Clear content hierarchy reduces cognitive load
        */}
          <div className="relative z-10">{children}</div>

          {/* 
          TRUST INDICATOR: Subtle glow for high-trust content
          NEURAL DESIGN: Ambient lighting suggests AI presence
        */}
          {trustLevel === "high" && (
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, var(--trust-primary)/8, transparent 70%)",
              }}
            />
          )}

          {/*
          AI ACTIVITY INDICATOR: Pulsing accent for active AI states  
          EXPLAINABILITY: Visual cue that AI is working builds confidence
        */}
          {aiState !== "idle" && (
            <m.div
              className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--trust-primary)]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            />
          )}
        </m.div>
      </LazyMotion>
    );
  }
);

// ===========================================
// COMPONENT METADATA: Improves debugging and React DevTools experience
// ===========================================

GlassCard.displayName = "GlassCard";

// ===========================================
// TYPE EXPORTS: Enhanced developer experience
// ===========================================

export type { GlassCardProps };
