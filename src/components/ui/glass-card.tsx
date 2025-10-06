"use client";

import type { ReactNode, ElementType } from "react";
import { forwardRef, useState, useEffect, useRef } from "react";
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

  // NEW: Loading/skeleton state
  isLoading?: boolean;

  // NEW: Lazy load animation (waits for intersection)
  lazyLoad?: boolean;

  // NEW: Ripple effect on click
  enableRipple?: boolean;

  // NEW: Test ID for easier e2e testing
  testId?: string;
}

// ===========================================
// PERFORMANCE: Consolidated padding system reduces CSS overhead
// PSYCHOLOGY: Predictable spacing creates cognitive familiarity
// ===========================================

const paddingClasses: Record<NonNullable<GlassCardProps["padding"]>, string> = {
  none: "",
  xs: "p-2 sm:p-3 md:p-4", // 8px → 12px → 16px - tight spacing
  sm: "p-3 sm:p-4 md:p-5", // 12px → 16px → 20px - compact cards
  md: "p-4 sm:p-5 md:p-6 lg:p-7", // 16px → 20px → 24px → 28px - balanced default
  lg: "p-6 sm:p-7 md:p-8 lg:p-10", // 24px → 28px → 32px → 40px - spacious
  xl: "p-8 sm:p-9 md:p-10 lg:p-12", // 32px → 36px → 40px → 48px - hero sections
};

// ===========================================
// COGNITIVE PSYCHOLOGY: Semantic variants reduce cognitive load
// TRUST BUILDING: Each variant optimized for different trust contexts
// ===========================================

const variantClasses: Record<NonNullable<GlassCardProps["variant"]>, string> = {
  // Standard glassmorphic surface for general content
  default: cn(
    "bg-(--glass-surface-primary)",
    "border border-(--glass-border-soft)",
    "backdrop-blur-[var(--backdrop-blur-light)]",
    "shadow-(--shadow-neural-soft)"
  ),

  // Elevated cards for important actions - builds trust through prominence
  elevated: cn(
    "bg-(--glass-surface-elevated)",
    "border border-(--glass-border-strong)",
    "backdrop-blur-[var(--backdrop-blur-medium)]",
    "shadow-(--shadow-neural-strong)",
    "transform-gpu" // Performance: Force GPU layer
  ),

  // Modal overlays for critical interactions
  modal: cn(
    "bg-(--glass-surface-modal)",
    "border border-(--glass-border-highlight)",
    "backdrop-blur-[var(--backdrop-blur-heavy)]",
    "shadow-(--shadow-neural-floating)"
  ),

  // Neural variant for AI-related content - builds intelligence trust
  neural: cn(
    "bg-gradient-to-br from-(--intelligence-primary)/10 to-(--intelligence-secondary)/5",
    "border border-(--intelligence-accent)/20",
    "backdrop-blur-[var(--backdrop-blur-medium)]",
    "shadow-(--glow-neural-primary)"
  ),

  // Trust variant for safety-critical information
  trust: cn(
    "bg-gradient-to-br from-(--trust-primary)/8 to-(--trust-secondary)/4",
    "border border-(--trust-primary)/25",
    "backdrop-blur-[var(--backdrop-blur-light)]",
    "shadow-(--glow-trust-primary)"
  ),

  // Prosperity variant for positive outcomes and growth
  prosperity: cn(
    "bg-gradient-to-br from-(--prosperity-primary)/8 to-(--prosperity-energy)/4",
    "border border-(--prosperity-primary)/25",
    "backdrop-blur-[var(--backdrop-blur-light)]",
    "shadow-(--glow-prosperity-primary)"
  ),
};

// ===========================================
// MOTION PSYCHOLOGY: Physics-based animations feel natural and trustworthy
// PERFORMANCE: Optimized for 60fps using transform and opacity only
// ===========================================

const motionVariants: Variants = {
  // Entrance animations - faster and more responsive
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 4,
    filter: "blur(2px)",
  },

  // Settled state - instant and stable
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 500, // Increased from 380 for snappier feel
      damping: 35, // Increased from 30 for less bounce
      mass: 0.6, // Reduced from 0.8 for faster response
    },
  },

  // Hover state - more pronounced lift with shadow
  hover: {
    scale: 1.02, // Increased from 1.01 for better feedback
    y: -2, // Increased from -1 for more depth
    transition: {
      type: "spring",
      stiffness: 600, // Very responsive
      damping: 30,
      mass: 0.4, // Light and quick
    },
  },

  // Focus state - more prominent for accessibility
  focus: {
    scale: 1.01, // Added subtle scale
    boxShadow:
      "0 0 0 3px var(--trust-primary)/50, 0 0 0 6px var(--trust-primary)/20, var(--glow-trust-primary)",
    transition: {
      duration: 0.2, // Slightly longer for visibility
      ease: "easeOut",
    },
  },

  // Tap feedback - instant response
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.08, // Reduced from 0.1 for instant feel
      ease: "easeOut",
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
  alert: "border-(--critical-primary) shadow-(--critical-primary)/20",
};

// ===========================================
// TRUST LEVEL INDICATORS: Progressive visual cues build confidence
// COGNITIVE PSYCHOLOGY: Visual hierarchy guides attention to trust signals
// ===========================================

const trustLevelClasses: Record<
  NonNullable<GlassCardProps["trustLevel"]>,
  string
> = {
  low: "opacity-85",
  medium: "opacity-95 border-(--trust-primary)/20",
  high: cn(
    "opacity-100",
    "border-(--trust-primary)/30", // Increased from /25
    "shadow-(--glow-trust-primary)",
    "ring-1 ring-(--trust-primary)/10", // Added subtle ring
    "relative after:absolute after:inset-0 after:rounded-[inherit]",
    "after:bg-gradient-to-r after:from-(--trust-primary)/8 after:to-transparent", // Increased from /5
    "after:pointer-events-none"
  ),
};

// ===========================================
// LOADING STATE: Skeleton UI for better perceived performance
// ===========================================

const loadingClasses = cn(
  "animate-pulse",
  "bg-gradient-to-r from-(--glass-surface-primary) via-(--glass-surface-elevated) to-(--glass-surface-primary)",
  "bg-[length:200%_100%]",
  "pointer-events-none"
);

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
      isLoading = false,
      lazyLoad = false,
      enableRipple = false,
      testId,
      ...props
    },
    ref
  ) => {
    const [isInView, setIsInView] = useState(!lazyLoad);
    const [ripples, setRipples] = useState<
      Array<{ x: number; y: number; id: number }>
    >([]);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const internalRef = useRef<HTMLDivElement>(null);

    // Combine external ref with internal ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(internalRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current =
            internalRef.current;
        }
      }
    }, [ref]);

    // Check for reduced motion preference
    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Intersection observer for lazy loading animations
    useEffect(() => {
      if (!lazyLoad || !internalRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "50px" }
      );

      observer.observe(internalRef.current);
      return () => observer.disconnect();
    }, [lazyLoad]);

    // Ripple effect handler
    const handleRippleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableRipple || !internalRef.current) return;

      const rect = internalRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.();
    };

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

      // Loading state
      isLoading && loadingClasses,

      // Interactive states
      isInteractive &&
        cn(
          "cursor-pointer",
          "transition-all duration-200 ease-[var(--ease-organic)]", // Changed from transition-colors
          "hover:shadow-(--shadow-neural-strong)", // Add shadow on hover
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-(--trust-primary)",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foundation-void)]",
          "active:scale-[0.99]" // Subtle press feedback
        ),

      // Custom classes override
      className
    );

    // ===========================================
    // PERFORMANCE OPTIMIZATION: Conditional motion loading
    // ACCESSIBILITY: Respects prefers-reduced-motion automatically
    // ===========================================

    // Disable motion if user prefers reduced motion
    const shouldUseMotion = enableMotion && !prefersReducedMotion && isInView;

    if (!shouldUseMotion) {
      return (
        <Component
          ref={internalRef}
          className={cardClasses}
          onClick={enableRipple ? handleRippleClick : onClick}
          role={semanticRole}
          aria-label={semanticLabel}
          aria-describedby={ariaDescribedby}
          aria-busy={isLoading}
          tabIndex={isInteractive ? 0 : undefined}
          data-testid={testId}
          data-variant={variant}
          data-ai-state={aiState}
          {...props}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-(--trust-primary)/20 animate-ping pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
            />
          ))}

          {/* Content container with proper z-index for layering */}
          <div className="relative z-10">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-(--glass-border-soft) rounded animate-pulse" />
                <div className="h-4 bg-(--glass-border-soft) rounded animate-pulse w-3/4" />
              </div>
            ) : (
              children
            )}
          </div>
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
          ref={internalRef}
          className={cardClasses}
          onClick={enableRipple ? handleRippleClick : onClick}
          role={semanticRole}
          aria-label={semanticLabel}
          aria-describedby={ariaDescribedby}
          aria-busy={isLoading}
          tabIndex={isInteractive ? 0 : undefined}
          data-testid={testId}
          data-variant={variant}
          data-ai-state={aiState}
          // Motion configuration
          variants={motionVariants}
          initial="initial"
          animate="animate"
          whileHover={isInteractive && !isLoading ? "hover" : undefined}
          whileFocus={isInteractive && !isLoading ? "focus" : undefined}
          whileTap={isInteractive && !isLoading ? "tap" : undefined}
          // Accessibility: Keyboard support for interactive cards
          onKeyDown={(e) => {
            if (
              isInteractive &&
              !isLoading &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              if (enableRipple) {
                // Simulate click for ripple effect
                const rect = internalRef.current?.getBoundingClientRect();
                if (rect) {
                  const id = Date.now();
                  setRipples((prev) => [
                    ...prev,
                    { x: rect.width / 2, y: rect.height / 2, id },
                  ]);
                  setTimeout(
                    () => setRipples((prev) => prev.filter((r) => r.id !== id)),
                    600
                  );
                }
              }
              onClick?.();
            }
          }}
          {...props}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <m.span
              key={ripple.id}
              className="absolute rounded-full bg-(--trust-primary)/20 pointer-events-none"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
            />
          ))}
          {/* 
          LAYERING SYSTEM: Proper z-index management for glass effects
          PSYCHOLOGY: Clear content hierarchy reduces cognitive load
        */}
          <div className="relative z-10">
            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-(--glass-border-soft) rounded" />
                <div className="h-4 bg-(--glass-border-soft) rounded w-3/4" />
                <div className="h-4 bg-(--glass-border-soft) rounded w-1/2" />
              </div>
            ) : (
              children
            )}
          </div>

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
              className="absolute top-2 right-2 w-2 h-2 rounded-full bg-(--trust-primary)"
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
