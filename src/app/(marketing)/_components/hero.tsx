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
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";

// ===========================================
// RESEARCH-DRIVEN AI METRICS WITH TRUST PSYCHOLOGY
// ===========================================

interface AIMetric {
  label: string;
  value: string;
  detail: string;
  trustSignal: "high" | "medium" | "monitoring";
  explanation: string;
  confidence: number;
  lastUpdated: string;
  provenanceHash: string;
}

const metrics: AIMetric[] = [
  {
    label: "Autonomy",
    value: "98.6%",
    detail: "Decisions executed within safety bands",
    trustSignal: "high",
    explanation:
      "AI operating within predefined safety constraints with human override available",
    confidence: 94,
    lastUpdated: "2 min ago",
    provenanceHash: "0x42a7f8b9",
  },
  {
    label: "Yield",
    value: "12.4%",
    detail: "APY net of constraints",
    trustSignal: "high",
    explanation:
      "Risk-adjusted returns after safety derates and grid priority constraints",
    confidence: 91,
    lastUpdated: "5 min ago",
    provenanceHash: "0x8d9c2ef1",
  },
  {
    label: "Proof",
    value: "0x42…ab",
    detail: "Latest zk proof hash",
    trustSignal: "monitoring",
    explanation:
      "Zero-knowledge proof of AI decision validity with cryptographic attestation",
    confidence: 98,
    lastUpdated: "12 sec ago",
    provenanceHash: "0x42a7f8ab",
  },
];

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
  initial: { scale: 1, opacity: 0.7 },
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1], // easeInOut cubic bezier
    },
  },
};

// ===========================================
// TRUST-FIRST HERO COMPONENT
// ===========================================

export function Hero() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const shouldReduceMotion = useReducedMotion();

  // Real-time clock for transparency
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="relative isolate"
        role="banner"
        aria-label="AIMP autonomous infrastructure interface"
      >
        {/* Neural Grid Background (Subtle) */}
        <div
          className="absolute inset-0 neural-grid opacity-30"
          aria-hidden="true"
        />

        <m.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative grid gap-8 py-12 md:grid-cols-[minmax(0,1fr)_minmax(340px,440px)] md:items-start md:gap-12 lg:gap-16"
        >
          {/* Left Column: Trust-First Messaging */}
          <m.div variants={itemVariants} className="space-y-8">
            {/* Status First - Research shows users need safety signals in first 3 seconds */}
            <div className="flex flex-wrap items-center gap-3">
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
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-[1.1] text-[var(--text-primary)] md:text-5xl lg:text-[3.75rem]">
                <span className="block">Own the Sun.</span>
                <span className="block bg-gradient-to-r from-[var(--trust-primary)] to-[var(--intelligence-primary)] bg-clip-text text-transparent">
                  Trust the Machine.
                </span>
                <span className="block">Watch It Work.</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg lg:text-xl">
                AIMP is where AI agents operate tokenized solar farms under
                <strong className="font-semibold text-[var(--text-primary)]">
                  {" "}
                  cryptographic authority
                </strong>
                . Invest in seconds, observe every watt, and inspect every
                decision with
                <strong className="font-semibold text-[var(--trust-primary)]">
                  {" "}
                  proof-backed explainability
                </strong>
                .
              </p>

              {/* Trust Pillars - Behavioral UX: Address concerns upfront */}
              <div className="grid grid-cols-3 gap-4 text-xs uppercase tracking-[0.32em] text-[var(--text-tertiary)] md:flex md:gap-8">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--prosperity-primary)] shadow-[0_0_6px_rgba(50,184,198,0.4)]" />
                  Safety-First
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--intelligence-primary)] shadow-[0_0_6px_rgba(41,150,161,0.4)]" />
                  Explainable
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--trust-primary)] shadow-[0_0_6px_rgba(33,128,141,0.4)]" />
                  Solana-Native
                </div>
              </div>
            </div>

            {/* CTA Section - Progressive Trust Building */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Primary CTA - Risk-First Design */}
                <Link
                  href="/invest"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,var(--prosperity-primary),var(--trust-primary),var(--intelligence-primary))] px-8 py-4 text-sm font-semibold text-black shadow-[0_24px_44px_rgba(33,128,141,0.32)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_32px_64px_rgba(33,128,141,0.42)] focus-visible:u-focus-ring-prosperity"
                  role="button"
                  aria-describedby="primary-cta-help"
                >
                  <span className="relative z-10">Connect & Buy 200 SOLAR</span>
                  {!shouldReduceMotion && (
                    <m.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/assets/solar"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border-soft)] bg-[var(--glass-surface-primary)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-sm transition-all duration-200 hover:bg-[var(--glass-surface-elevated)] hover:border-[var(--glass-border-strong)] focus-visible:u-focus-ring"
                >
                  Explore the Asset
                  <span className="text-[var(--trust-primary)]">→</span>
                </Link>
              </div>

              {/* Risk Context - Transparency First */}
              <div
                id="primary-cta-help"
                className="rounded-lg border border-[var(--glass-border-soft)] bg-[var(--glass-surface-primary)] p-4 text-xs text-[var(--text-secondary)]"
              >
                <p className="mb-2 font-medium text-[var(--text-primary)]">
                  Investment Notice:
                </p>
                <p>
                  200 SOLAR ≈ $1,024 at current price. Max daily AI spend: $50.
                  Emergency human override active. See full risk disclosure
                  before investing.
                </p>
              </div>
            </div>
          </m.div>

          {/* Right Column: Live AI Dashboard */}
          <m.div variants={itemVariants}>
            <GlassCard
              className="relative overflow-hidden"
              padding="lg"
              variant="neural"
              trustLevel="high"
              aiState="optimizing"
              aria-label="Live solar farm AI operations dashboard"
            >
              {/* Enhanced Glass Effect */}
              <div
                className="absolute inset-0 rounded-[24px] border border-[var(--glass-border-highlight)] bg-[radial-gradient(120%_90%_at_20%_15%,rgba(var(--color-teal-500-rgb),0.18),transparent),radial-gradient(100%_80%_at_85%_0%,rgba(var(--color-gray-300-rgb),0.12),transparent)]"
                aria-hidden="true"
              />

              {/* AI Activity Pulse */}
              {!shouldReduceMotion && (
                <m.div
                  variants={pulseVariants}
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[var(--intelligence-primary)] shadow-[0_0_12px_rgba(41,150,161,0.6)]"
                  aria-hidden="true"
                />
              )}

              <div className="relative space-y-6">
                {/* Header with Real-time Context */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
                      Solar Farm Status
                    </p>
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                      Sorrento Ridge Alpha
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      AI Operations • Authority PDA • Multi-Oracle Telemetry
                    </p>
                  </div>

                  <div className="text-right space-y-2">
                    <StatusPill
                      tone="positive"
                      label="Active"
                      detail="Optimizing"
                      explanation="AI currently optimizing energy dispatch based on grid prices and weather forecasts"
                      confidence={94}
                    />
                    <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <div className="h-2 w-2 rounded-full bg-[var(--intelligence-primary)] animate-pulse" />
                      <span>Live • {currentTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                {/* AI Metrics with Explainability */}
                <div className="space-y-3">
                  {metrics.map((metric, index) => (
                    <m.div
                      key={metric.label}
                      variants={itemVariants}
                      className="group relative overflow-hidden rounded-2xl border border-[var(--glass-border-soft)] bg-[var(--glass-surface-primary)] p-4 transition-all duration-200 hover:border-[var(--glass-border-strong)] hover:bg-[var(--glass-surface-elevated)]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-medium uppercase tracking-[0.32em] text-[var(--text-tertiary)]">
                              {metric.label}
                            </p>
                            <div
                              className={`h-2 w-2 rounded-full ${
                                metric.trustSignal === "high"
                                  ? "bg-[var(--prosperity-primary)] shadow-[0_0_4px_rgba(50,184,198,0.6)]"
                                  : metric.trustSignal === "medium"
                                    ? "bg-[var(--caution-primary)] shadow-[0_0_4px_rgba(230,129,97,0.6)]"
                                    : "bg-[var(--intelligence-primary)] animate-pulse shadow-[0_0_4px_rgba(41,150,161,0.6)]"
                              }`}
                              aria-label={`Trust level: ${metric.trustSignal}`}
                            />
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">
                            {metric.detail}
                          </p>
                          <div className="text-xs text-[var(--text-muted)]">
                            {metric.confidence}% confidence •{" "}
                            {metric.lastUpdated}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-semibold text-[var(--text-primary)] font-mono">
                            {metric.value}
                          </p>
                          <button
                            className="mt-1 text-xs text-[var(--intelligence-primary)] hover:text-[var(--trust-primary)] transition-colors"
                            aria-label={`Explain ${metric.label} metric`}
                            title={metric.explanation}
                          >
                            Why?
                          </button>
                        </div>
                      </div>

                      {/* Hover explanation */}
                      <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="rounded-lg border border-[var(--glass-border-strong)] bg-[var(--glass-surface-modal)] p-3 text-xs text-[var(--text-secondary)] backdrop-blur-sm">
                          {metric.explanation}
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>

                {/* Safety Constraints - Transparency */}
                <div className="rounded-2xl border border-[var(--glass-border-strong)] bg-[rgba(var(--color-slate-900-rgb),0.78)] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--text-tertiary)]">
                      Safety Guardrails
                    </p>
                    <span className="text-xs text-[var(--prosperity-primary)]">
                      Active
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--prosperity-primary)]" />
                      Max discharge: 2MW • SOC cap: 80%
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--intelligence-primary)]" />
                      Oracle deviation alarm at 3.5σ
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--trust-primary)]" />
                      Emergency override &lt; 200ms acknowledgment
                    </li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-[var(--glass-border-soft)]">
                    <p className="text-xs text-[var(--text-muted)]">
                      Last constraint check: {currentTime.toLocaleTimeString()}{" "}
                      • Next verification:{" "}
                      {new Date(Date.now() + 60000).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
