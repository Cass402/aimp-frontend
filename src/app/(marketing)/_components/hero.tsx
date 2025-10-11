"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  animate,
  useInView,
  type Variants,
} from "motion/react";
import { StatusPill } from "@/app/_components/status-pill";
import { HeroEnergyGrid } from "./hero-energy-grid";
import { HeroTrustPillars } from "./hero-trust-pillars";

// ===========================================
// ANIMATED NUMBER - Smooth Counters
// ===========================================

interface AnimatedNumberProps {
  value: number;
  unit?: string;
  formatValue?: (val: number) => string;
}

function AnimatedNumber({
  value,
  unit = "",
  formatValue,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: shouldReduceMotion ? 0 : 1.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });

    return () => controls.stop();
  }, [isInView, value, shouldReduceMotion]);

  const formatted = formatValue
    ? formatValue(displayValue)
    : displayValue.toLocaleString();

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {formatted}
      {unit && ` ${unit}`}
    </span>
  );
}

// ===========================================
// NEUROAESTHETIC MOTION VARIANTS (CALM + PURPOSEFUL)
// ===========================================

const containerVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Calm, organic easing
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Magnetic hover effect for interactive elements
const magneticHoverVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ===========================================
// HERO COMPONENT - FOCUSED ON MESSAGING
// ===========================================

export function Hero() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative min-h-[85vh] flex items-center py-12"
        aria-labelledby="hero-heading"
        role="banner"
      >
        {/* Hexagonal Energy Grid Background */}
        <HeroEnergyGrid opacity={0.5} spacing={170} showConnections />

        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(var(--color-slate-900-rgb),0.02)] to-transparent pointer-events-none z-[1]" />

        <m.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative w-full max-w-5xl mx-auto text-center z-10"
        >
          <m.div variants={itemVariants} className="space-y-14">
            {/* Status First - Research shows users need safety signals in first 3 seconds */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <StatusPill
                tone="positive"
                label="Live System"
                detail="Normal Operations"
                explanation="All AI agents operating within safety parameters with human oversight active"
                confidence={96}
                lastUpdated={currentTime.toLocaleTimeString()}
                provenanceHash="0xf4e8c7d2"
                className="shadow-[0_0_12px_rgba(50,184,198,0.15)]"
              />
              <StatusPill
                tone="info"
                label="Demo Mode"
                detail="Sorrento Ridge Alpha"
                explanation="Demonstration environment with real AI decision logic on simulated solar farm data"
                confidence={100}
                lastUpdated="now"
              />
              {/* Live Energy Output with Animated Counter */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--prosperity-primary)]/10 to-[var(--prosperity-energy)]/10 border border-[var(--prosperity-energy)]/30">
                <div className="relative flex h-2 w-2">
                  {!shouldReduceMotion && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--status-verified)] opacity-75" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--status-verified)]" />
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  <AnimatedNumber value={847} unit="MWh" /> Today
                </span>
              </div>
            </div>

            {/* Hero Message - Cognitive Psychology: Lead with clear value prop */}
            <div className="space-y-10">
              <div className="space-y-8">
                <h1
                  id="hero-heading"
                  className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] text-[var(--text-primary)] tracking-tight"
                >
                  <span className="block mb-3">Own the Sun.</span>
                  <span className="block mb-3 bg-gradient-to-r from-[var(--trust-primary)] via-[var(--intelligence-primary)] to-[var(--prosperity-primary)] bg-clip-text text-transparent">
                    Trust the Machine.
                  </span>
                  <span className="block">Watch It Work.</span>
                </h1>

                <div className="max-w-4xl mx-auto">
                  <p className="text-xl leading-relaxed text-[var(--text-secondary)] md:text-2xl lg:text-3xl font-light">
                    The first platform where AI autonomously manages real
                    infrastructure while every decision remains
                    <strong className="font-semibold text-[var(--trust-primary)] mx-1">
                      explainable, verifiable,
                    </strong>
                    and under
                    <strong className="font-semibold text-[var(--text-primary)] mx-1">
                      human control
                    </strong>
                    . Invest fractionally, observe in real-time, understand
                    completely.
                  </p>
                </div>
              </div>

              {/* Trust Pillars Cards - Expandable trust factors */}
              <HeroTrustPillars />
            </div>

            {/* CTA Section */}
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center gap-8">
                {/* Primary CTA with Premium Glow */}
                <div className="group relative inline-flex flex-col items-center gap-6">
                  {/* Radial blur glow background - more subtle */}
                  <div
                    className="absolute inset-[-20%] mx-auto h-[300px] w-[300px] rounded-full bg-[var(--status-verified)]/12 opacity-70 blur-[100px] transition-opacity duration-700 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <m.div
                    variants={
                      !shouldReduceMotion ? magneticHoverVariants : undefined
                    }
                    whileHover={!shouldReduceMotion ? "hover" : undefined}
                    whileTap={!shouldReduceMotion ? "tap" : undefined}
                  >
                    <Link
                      href="/connect"
                      className="relative inline-flex items-center gap-3 rounded-xl border-2 border-[var(--status-verified)]/50 bg-background/40 px-8 py-4 text-lg md:text-xl font-semibold text-[var(--text-primary)] shadow-[0_0_40px_rgba(52,199,89,0.3)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--status-verified)]/70 hover:shadow-[0_0_60px_rgba(52,199,89,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--status-verified)]/40"
                      aria-describedby="primary-cta-help"
                    >
                      <span className="relative z-10 text-white">
                        Connect Wallet — Own Real Infrastructure
                      </span>
                      <span className="text-[var(--status-verified)] transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </Link>
                  </m.div>

                  <span className="text-sm uppercase tracking-[0.4em] text-[var(--text-tertiary)]">
                    Live System · Normal Operations
                  </span>
                </div>

                {/* Secondary CTA */}
                <m.div
                  variants={
                    !shouldReduceMotion ? magneticHoverVariants : undefined
                  }
                  whileHover={!shouldReduceMotion ? "hover" : undefined}
                  whileTap={!shouldReduceMotion ? "tap" : undefined}
                >
                  <Link
                    href="/assets/solar/explore"
                    className="group relative overflow-hidden rounded-xl border-2 border-[var(--glass-border-strong)] bg-[var(--glass-surface-primary)] backdrop-blur-sm px-8 py-4 font-semibold text-[var(--text-primary)] text-lg transition-all duration-300 hover:border-[var(--trust-primary)] hover:bg-[var(--glass-surface-elevated)]"
                  >
                    <span className="relative z-10">Explore Digital Twin</span>
                  </Link>
                </m.div>
              </div>

              {/* Performance Stats */}
              <div className="flex flex-col items-center gap-3 mt-8">
                <span className="text-sm text-[var(--text-secondary)]">
                  AI-managed solar farms.{" "}
                  <span className="text-[var(--text-primary)]">
                    Every decision explainable.
                  </span>
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                  Currently dispatching{" "}
                  <span className="font-semibold text-[var(--prosperity-energy)]">
                    <AnimatedNumber value={847} /> MWh
                  </span>{" "}
                  of provable output.
                </span>
                <span className="text-xs text-[var(--text-tertiary)]/80">
                  Calibrated for 60fps trust cadence.
                </span>
              </div>

              {/* Risk Context - Transparency First */}
              <div
                id="primary-cta-help"
                className="max-w-3xl mx-auto rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) backdrop-blur-sm p-6 text-sm text-(--text-secondary)"
              >
                <p className="mb-3 font-semibold text-(--text-primary) text-base">
                  Investment Notice:
                </p>
                <p className="leading-relaxed">
                  200 SOLAR ≈ $1,024 at current price. Max daily AI spend: $50.
                  Emergency human override active. See full risk disclosure
                  before investing.
                </p>
              </div>
            </div>
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
