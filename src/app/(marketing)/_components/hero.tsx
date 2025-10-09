"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { StatusPill } from "@/app/_components/status-pill";

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

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
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
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(var(--color-slate-900-rgb),0.02)] to-transparent pointer-events-none" />

        <m.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative w-full max-w-5xl mx-auto text-center"
        >
          <m.div variants={itemVariants} className="space-y-10">
            {/* Status First - Research shows users need safety signals in first 3 seconds */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
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
            </div>

            {/* Hero Message - Cognitive Psychology: Lead with clear value prop */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1
                  id="hero-heading"
                  className="text-5xl font-bold leading-[1.05] text-(--text-primary) md:text-6xl lg:text-7xl xl:text-8xl tracking-tight"
                >
                  <span className="block mb-2">Own the Sun.</span>
                  <span className="block mb-2 bg-gradient-to-r from-(--trust-primary) via-(--intelligence-primary) to-(--prosperity-primary) bg-clip-text text-transparent">
                    Trust the Machine.
                  </span>
                  <span className="block">Watch It Work.</span>
                </h1>

                <div className="max-w-4xl mx-auto">
                  <p className="text-lg leading-relaxed text-(--text-secondary) md:text-xl lg:text-2xl font-light">
                    AIMP is where AI agents operate tokenized solar farms under
                    <strong className="font-semibold text-(--text-primary) mx-1">
                      cryptographic authority
                    </strong>
                    . Invest in seconds, observe every watt, and inspect every
                    decision with
                    <strong className="font-semibold text-(--trust-primary) mx-1">
                      proof-backed explainability
                    </strong>
                    .
                  </p>
                </div>
              </div>

              {/* Trust Pillars - Behavioral UX: Address concerns upfront */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-(--glass-surface-primary) border border-(--glass-border-soft)">
                  <div className="h-2 w-2 rounded-full bg-(--trust-primary) shadow-[0_0_8px_rgba(50,184,198,0.6)]" />
                  <span className="text-sm font-medium text-(--text-primary) tracking-wide">
                    Cryptographic Proof
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-(--glass-surface-primary) border border-(--glass-border-soft)">
                  <div className="h-2 w-2 rounded-full bg-(--intelligence-primary) shadow-[0_0_8px_rgba(41,150,161,0.6)]" />
                  <span className="text-sm font-medium text-(--text-primary) tracking-wide">
                    Emergency Override
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-(--glass-surface-primary) border border-(--glass-border-soft)">
                  <div className="h-2 w-2 rounded-full bg-(--prosperity-primary) shadow-[0_0_8px_rgba(85,169,123,0.6)]" />
                  <span className="text-sm font-medium text-(--text-primary) tracking-wide">
                    Full Explainability
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/connect"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-(--trust-primary) to-(--intelligence-primary) px-10 py-5 font-semibold text-white text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(41,150,161,0.4)] hover:scale-[1.02] active:scale-[0.98] min-w-[240px]"
                  aria-describedby="primary-cta-help"
                >
                  <span className="relative z-10 text-white">
                    Connect Wallet & Invest
                  </span>
                  {!shouldReduceMotion && (
                    <m.div
                      variants={pulseVariants}
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                  )}
                </Link>

                <Link
                  href="/assets/solar/explore"
                  className="group relative overflow-hidden rounded-2xl border-2 border-(--glass-border-strong) bg-(--glass-surface-primary) backdrop-blur-sm px-10 py-5 font-semibold text-(--text-primary) text-lg transition-all duration-300 hover:border-(--trust-primary) hover:bg-(--glass-surface-elevated) hover:scale-[1.02] active:scale-[0.98] min-w-[240px]"
                >
                  <span className="relative z-10">Explore Digital Twin</span>
                </Link>
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
