"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const pillarVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1], // easeOutBack
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function HeroTrustPillars() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      className="flex flex-wrap justify-center items-stretch gap-6 max-w-4xl mx-auto"
    >
      {/* Pillar 1: Built on Solana */}
      <m.div
        variants={shouldReduceMotion ? undefined : pillarVariants}
        className="flex-1 min-w-[240px]"
      >
        <GlassCard
          variant="elevated"
          className="h-full flex flex-col items-center text-center gap-4 p-6 hover:scale-[1.02] transition-transform duration-300"
        >
          {/* Icon - Solana blockchain (Operations) */}
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--agent-operations)]/20 blur-xl rounded-full animate-breath-medium" />
            <div className="relative text-5xl">⚡</div>
          </div>

          {/* Content */}
          <div>
            <p className="text-lg font-semibold text-[var(--text-primary)] mb-1">
              Built on Solana
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              High-speed blockchain with{" "}
              <span className="text-[var(--agent-operations)] font-medium">
                sub-second finality
              </span>
            </p>
          </div>

          {/* Trust indicator */}
          <div className="mt-auto pt-3 border-t border-[var(--glass-border-soft)] w-full">
            <p className="text-xs text-[var(--text-tertiary)]">
              Enterprise-grade infrastructure
            </p>
          </div>
        </GlassCard>
      </m.div>

      {/* Pillar 2: zkSNARK Proofs */}
      <m.div
        variants={shouldReduceMotion ? undefined : pillarVariants}
        className="flex-1 min-w-[240px]"
      >
        <GlassCard
          variant="elevated"
          className="h-full flex flex-col items-center text-center gap-4 p-6 hover:scale-[1.02] transition-transform duration-300"
        >
          {/* Icon - Cryptographic verification (Governance) */}
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--agent-governance)]/20 blur-xl rounded-full animate-breath-medium" />
            <div className="relative text-5xl">🔐</div>
          </div>

          {/* Content */}
          <div>
            <p className="text-lg font-semibold text-[var(--text-primary)] mb-1">
              Verified by Math
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              Every decision{" "}
              <span className="text-[var(--agent-governance)] font-medium">
                cryptographically proven
              </span>{" "}
              on-chain
            </p>
          </div>

          {/* Trust indicator */}
          <div className="mt-auto pt-3 border-t border-[var(--glass-border-soft)] w-full">
            <p className="text-xs text-[var(--text-tertiary)]">
              zkSNARK verification
            </p>
          </div>
        </GlassCard>
      </m.div>

      {/* Pillar 3: Emergency Override (MOST IMPORTANT) */}
      <m.div
        variants={shouldReduceMotion ? undefined : pillarVariants}
        className="flex-1 min-w-[240px]"
      >
        <GlassCard
          variant="elevated"
          className="h-full flex flex-col items-center text-center gap-4 p-6 hover:scale-[1.04] hover:-translate-y-1 transition-all duration-300 border-2 border-[var(--status-critical)]/30"
        >
          {/* Icon - More prominent */}
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--status-critical)]/20 blur-2xl rounded-full animate-breath-fast" />
            <div className="relative text-6xl">⚠️</div>
          </div>

          {/* Content */}
          <div>
            <p className="text-lg font-bold text-[var(--text-primary)] mb-1">
              Emergency Override
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              One-click AI pause.{" "}
              <span className="text-[var(--status-critical)] font-semibold">
                You&apos;re always in control.
              </span>
            </p>
          </div>

          {/* Trust indicator - Emphasized */}
          <div className="mt-auto pt-3 border-t border-[var(--glass-border-soft)] w-full">
            <p className="text-xs text-[var(--status-critical)] font-medium">
              Human authority: always available
            </p>
          </div>
        </GlassCard>
      </m.div>
    </m.div>
  );
}
