"use client";

import { useState, useRef, useLayoutEffect } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  type Variants,
} from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

// ===========================================
// PSYCHOLOGY: Phases structured to build trust through progressive disclosure
// COGNITIVE LOAD: Each phase contains 7±2 key concepts for optimal mental processing
// ===========================================

const phases = [
  {
    badge: "01",
    title: "Connect & Authenticate",
    summary:
      "Connect a Solana wallet or load the demo session. AIMP validates AI agent authority, constraint registry, and oracle health before rendering dashboards.",
    trustLevel: "medium" as const,
    aiActivity: "Validating cryptographic authority and constraint bounds",
    neuralHint: "trust-validation",
  },
  {
    badge: "02",
    title: "Buy & Simulate",
    summary:
      "Request a quote via Jupiter mocks, inspect worst-case outcomes and AI guardrails, then execute with decoded receipts and proof hashes.",
    trustLevel: "medium" as const,
    aiActivity: "Simulating market conditions with safety constraints",
    neuralHint: "risk-analysis",
  },
  {
    badge: "03",
    title: "Observe & Explain",
    summary:
      "Dashboard glass cards stream operations, maintenance alerts, and market hedges — each with persona voice and replayable evidence.",
    trustLevel: "high" as const,
    aiActivity: "Monitoring infrastructure with explainable decisions",
    neuralHint: "active-monitoring",
  },
  {
    badge: "04",
    title: "Explore & Override",
    summary:
      "Digital twin flow lines, battery plans, and panel grid animate live telemetry. Emergency override is always visible, audited, and reversible.",
    trustLevel: "high" as const,
    aiActivity: "Maintaining human authority over autonomous systems",
    neuralHint: "human-control",
  },
] as const;

// ===========================================
// MOTION PSYCHOLOGY: Staggered animations reduce cognitive load and build anticipation
// PERFORMANCE: GPU-optimized transforms for 60fps experience
// ===========================================

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Custom ease matching globals.css --ease-neural
    },
  },
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
};

const phaseVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      mass: 0.9,
      delay: index * 0.12, // Additional stagger for phases
    },
  }),
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 1,
      delay: 0.3,
    },
  },
};

const pulseVariants: Variants = {
  idle: {
    opacity: 0.6,
    scale: 1,
  },
  active: {
    opacity: [0.6, 1, 0.6],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1], // easeInOut cubic bezier
    },
  },
};

// ===========================================
// NEURAL DESIGN: Ambient micro-interactions suggest AI presence
// ACCESSIBILITY: Respects prefers-reduced-motion
// ===========================================

interface NeuralIndicatorProps {
  hint: string;
  isActive: boolean;
  className?: string;
}

function NeuralIndicator({ hint, isActive, className }: NeuralIndicatorProps) {
  return (
    <m.div
      className={cn(
        "relative h-2 w-2 rounded-full transition-all duration-500",
        "bg-[var(--intelligence-primary)]",
        className
      )}
      variants={pulseVariants}
      animate={isActive ? "active" : "idle"}
      aria-label={`AI ${hint} indicator`}
    >
      {/* Neural glow effect */}
      <div className="absolute inset-0 -m-1 rounded-full bg-[var(--intelligence-primary)] opacity-20 blur-sm" />
      <div className="absolute inset-0 -m-2 rounded-full bg-[var(--intelligence-primary)] opacity-10 blur-md" />
    </m.div>
  );
}

// ===========================================
// TRUST BUILDING: Progressive badge system with semantic meaning
// COGNITIVE ERGONOMICS: Clear visual hierarchy and recognizable patterns
// ===========================================

interface PhaseBadgeProps {
  badge: string;
  trustLevel: "low" | "medium" | "high";
  isInView: boolean;
}

function PhaseBadge({ badge, trustLevel, isInView }: PhaseBadgeProps) {
  const trustColors = {
    low: "border-[var(--glass-border-soft)] bg-[var(--glass-surface-primary)]",
    medium: "border-[var(--trust-primary)]/20 bg-[var(--trust-primary)]/8",
    high: "border-[var(--trust-primary)]/30 bg-[var(--trust-primary)]/12 shadow-[var(--glow-trust-primary)]",
  };

  return (
    <m.div
      className={cn(
        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl",
        "text-sm font-semibold text-[var(--text-primary)]",
        "transition-all duration-500 ease-[var(--ease-neural)]",
        trustColors[trustLevel]
      )}
      whileHover={{
        scale: 1.05,
        y: -1,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      whileTap={{ scale: 0.95 }}
      animate={
        isInView
          ? {
              borderColor:
                trustLevel === "high" ? "var(--trust-primary)" : undefined,
            }
          : {}
      }
    >
      {badge}
    </m.div>
  );
}

// ===========================================
// MAIN COMPONENT: Cinematic flow narrative with psychological trust building
// PERFORMANCE: Optimized re-renders and intersection observer for viewport awareness
// ===========================================

export function FlowNarrative() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  });

  // Track which phases are visible for progressive trust building
  useLayoutEffect(() => {
    if (isInView) {
      // Simulate AI processing states with progressive phase activation
      const timeouts: NodeJS.Timeout[] = [];

      phases.forEach((_, index) => {
        const timeout = setTimeout(
          () => {
            setActivePhase(index);
            // Deactivate after a natural duration to simulate AI completion
            setTimeout(() => {
              setActivePhase(null);
            }, 1200);
          },
          (index + 1) * 800
        );
        timeouts.push(timeout);
      });

      return () => timeouts.forEach(clearTimeout);
    }
  }, [isInView]);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        className="mt-20 grid gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        aria-labelledby="flow-narrative-heading"
      >
        {/* PSYCHOLOGY: Header creates cognitive anchor and sets expectations */}
        <m.header className="space-y-3" variants={headerVariants}>
          <div className="flex items-center gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--text-tertiary)]">
              Minimal Vertical Slice
            </p>
            <NeuralIndicator
              hint="system-overview"
              isActive={isInView}
              className="opacity-60"
            />
          </div>

          <h2
            id="flow-narrative-heading"
            className="max-w-4xl text-3xl font-semibold leading-tight text-[var(--text-primary)] lg:text-4xl"
          >
            <span className="text-[var(--intelligence-primary)]">Ingest</span>
            <span className="mx-3 text-[var(--text-tertiary)]">→</span>
            <span className="text-[var(--intelligence-secondary)]">Decide</span>
            <span className="mx-3 text-[var(--text-tertiary)]">→</span>
            <span className="text-[var(--prosperity-primary)]">Execute</span>
            <span className="mx-3 text-[var(--text-tertiary)]">→</span>
            <span className="text-[var(--trust-primary)]">Observe</span>
            <span className="ml-4 text-[var(--text-secondary)]">
              — delivered through calm, intelligent glass surfaces.
            </span>
          </h2>
        </m.header>

        {/* TRUST BUILDING: Main card with neural variant suggests AI intelligence */}
        <m.div variants={cardVariants}>
          <GlassCard
            padding="xl"
            variant="neural"
            aiState="processing"
            trustLevel="high"
            className="overflow-hidden"
            aria-label="AIMP process flow phases"
          >
            {/* COGNITIVE LOAD: Grid layout provides clear mental model */}
            <div className="grid gap-8 lg:grid-cols-2">
              {phases.map((phase, index) => (
                <m.article
                  key={phase.title}
                  className="group relative flex items-start gap-5"
                  variants={phaseVariants}
                  custom={index}
                  onHoverStart={() => setActivePhase(index)}
                  onHoverEnd={() => setActivePhase(null)}
                  role="article"
                  aria-labelledby={`phase-${index}-title`}
                >
                  {/* VISUAL HIERARCHY: Badge provides clear sequence anchor */}
                  <PhaseBadge
                    badge={phase.badge}
                    trustLevel={phase.trustLevel}
                    isInView={isInView}
                  />

                  <div className="flex-1 space-y-3">
                    {/* TYPOGRAPHY: Clear hierarchy with semantic color coding */}
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        id={`phase-${index}-title`}
                        className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)] transition-colors duration-300 group-hover:text-[var(--trust-primary)]"
                      >
                        {phase.title}
                      </h3>

                      <NeuralIndicator
                        hint={phase.neuralHint}
                        isActive={activePhase === index}
                        className="mt-1"
                      />
                    </div>

                    {/* EXPLAINABILITY: Clear description with trust-building language */}
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
                      {phase.summary}
                    </p>

                    {/* AI TRANSPARENCY: Show what AI is actively doing */}
                    <m.div
                      className="flex items-center gap-2 text-xs text-[var(--intelligence-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      animate={{
                        opacity: activePhase === index ? 1 : undefined,
                      }}
                    >
                      <div className="h-1 w-1 rounded-full bg-[var(--intelligence-primary)] animate-pulse" />
                      <span className="font-medium">AI Activity:</span>
                      <span className="text-[var(--text-secondary)]">
                        {phase.aiActivity}
                      </span>
                    </m.div>
                  </div>
                </m.article>
              ))}
            </div>

            {/* TRUST FOUNDATION: Constraints-first autonomy messaging */}
            <m.div
              className="mt-10 rounded-2xl border border-[var(--glass-border-strong)] bg-gradient-to-r from-[var(--glass-surface-elevated)] to-[var(--glass-surface-primary)] p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 1.2, duration: 0.6 },
                    }
                  : {}
              }
            >
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--trust-primary)]/10">
                  <div className="h-3 w-3 rounded-full bg-[var(--trust-primary)]" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                    Constraints-First Autonomy
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    AIMP is built on <strong>constraints-first autonomy</strong>
                    : AI agents act only within verifiable bounds, every oracle
                    input carries provenance, and humans can pause execution in
                    under{" "}
                    <strong className="text-[var(--trust-primary)]">
                      200ms
                    </strong>
                    . This is the surface that earns trust in the first three
                    seconds.
                  </p>
                </div>
              </div>
            </m.div>
          </GlassCard>
        </m.div>
      </m.section>
    </LazyMotion>
  );
}
