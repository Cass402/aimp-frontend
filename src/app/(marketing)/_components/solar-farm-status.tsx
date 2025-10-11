"use client";

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
import type { AgentPersona, TrustMathematics } from "@/lib/types";

// ===========================================
// RESEARCH-DRIVEN AI METRICS WITH TRUST PSYCHOLOGY
// TYPE SAFETY: AgentPersona for semantic color alignment
// ===========================================

interface AIMetric {
  label: string;
  value: string;
  detail: string;
  trustSignal: "high" | "medium" | "monitoring";
  explanation: string;
  trustMath: TrustMathematics;
  agent: AgentPersona;
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
    trustMath: {
      confidenceScore: 94,
      witnessCount: 38,
      deviationSigma: 0.012,
      exceedsThreshold: false,
      trustGrade: "excellent",
    },
    agent: "operations",
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
    trustMath: {
      confidenceScore: 91,
      witnessCount: 42,
      deviationSigma: 0.015,
      exceedsThreshold: false,
      trustGrade: "excellent",
    },
    agent: "markets",
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
    trustMath: {
      confidenceScore: 98,
      witnessCount: 56,
      deviationSigma: 0.005,
      exceedsThreshold: false,
      trustGrade: "excellent",
    },
    agent: "governor",
    lastUpdated: "12 sec ago",
    provenanceHash: "0x42a7f8ab",
  },
];

// ===========================================
// MOTION VARIANTS FOR HORIZONTAL LAYOUT
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
      ease: [0.16, 1, 0.3, 1],
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

export function SolarFarmStatus() {
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
      <section className="w-full" aria-labelledby="solar-farm-heading">
        <m.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="w-full"
        >
          <GlassCard
            agent="operations"
            trustMath={{
              confidenceScore: 96,
              witnessCount: 48,
              deviationSigma: 0.01,
              exceedsThreshold: false,
              trustGrade: "excellent",
            }}
            className="relative overflow-hidden w-full"
            padding="md"
            variant="neural"
            aiState="optimizing"
            aria-label="Live solar farm AI operations dashboard"
          >
            {/* AI Activity Pulse - Operations monitoring */}
            {!shouldReduceMotion && (
              <m.div
                variants={pulseVariants}
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-(--agent-operations) shadow-[0_0_12px_var(--agent-operations-glow)]"
                aria-hidden="true"
              />
            )}

            <div className="relative space-y-6">
              {/* Header with Real-time Context */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-(--text-tertiary)">
                    Solar Farm Status
                  </p>
                  <h2
                    id="solar-farm-heading"
                    className="text-2xl font-semibold text-(--text-primary)"
                  >
                    Sorrento Ridge Alpha
                  </h2>
                  <p className="text-sm text-(--text-secondary)">
                    AI Operations • Authority PDA • Multi-Oracle Telemetry
                  </p>
                </div>

                <div className="flex flex-col sm:text-right space-y-2">
                  <StatusPill
                    tone="positive"
                    label="Active"
                    detail="Optimizing"
                    explanation="AI currently optimizing energy dispatch based on grid prices and weather forecasts"
                    confidence={94}
                  />
                  <div className="flex items-center gap-1 text-xs text-(--text-muted) sm:justify-end">
                    <div className="h-2 w-2 rounded-full bg-(--agent-operations) animate-pulse" />
                    <span>Live • {currentTime.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              {/* AI Metrics with Horizontal Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics.map((metric) => (
                  <m.div
                    key={metric.label}
                    variants={itemVariants}
                    className="group relative overflow-hidden rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-4 transition-all duration-200 hover:border-(--glass-border-strong) hover:bg-(--glass-surface-elevated)"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium uppercase tracking-[0.32em] text-(--text-tertiary)">
                            {metric.label}
                          </p>
                          <div
                            className={`h-2 w-2 rounded-full ${
                              metric.trustSignal === "high"
                                ? "bg-(--agent-markets) shadow-[0_0_4px_var(--agent-markets-glow)]" // 🟢 Green - high performance
                                : metric.trustSignal === "medium"
                                  ? "bg-(--agent-maintenance) shadow-[0_0_4px_var(--agent-maintenance-glow)]" // 🟡 Amber - needs attention
                                  : "bg-(--agent-operations) animate-pulse shadow-[0_0_4px_var(--agent-operations-glow)]" // 🟦 Blue - monitoring
                            }`}
                            aria-label={`Trust level: ${metric.trustSignal}`}
                          />
                        </div>
                        <button
                          className="text-xs text-(--agent-operations) hover:text-(--agent-governance) transition-colors"
                          aria-label={`Explain ${metric.label} metric`}
                          title={metric.explanation}
                        >
                          Why?
                        </button>
                      </div>

                      <div className="space-y-2">
                        <p className="text-3xl font-semibold text-(--text-primary) font-mono">
                          {metric.value}
                        </p>
                        <p className="text-sm text-(--text-secondary)">
                          {metric.detail}
                        </p>
                        <div className="text-xs text-(--text-muted)">
                          {metric.trustMath.confidenceScore}% confidence •{" "}
                          {metric.lastUpdated}
                        </div>
                      </div>
                    </div>

                    {/* Hover explanation */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-lg border border-(--glass-border-strong) bg-(--glass-surface-modal) p-3 text-xs text-(--text-secondary) backdrop-blur-sm">
                        {metric.explanation}
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* Safety Constraints - Full Width */}
              <div className="rounded-2xl border border-(--glass-border-strong) bg-[rgba(var(--color-slate-900-rgb),0.78)] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.35em] text-(--text-tertiary)">
                    Safety Guardrails
                  </p>
                  <span className="text-xs text-(--agent-markets)">Active</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-(--text-secondary)">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-(--agent-markets)" />
                    Max discharge: 2MW • SOC cap: 80%
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-(--agent-operations)" />
                    Oracle deviation alarm at 3.5σ
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-(--agent-governance)" />
                    Emergency override &lt; 200ms acknowledgment
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-(--glass-border-soft)">
                  <p className="text-xs text-(--text-muted)">
                    Last constraint check: {currentTime.toLocaleTimeString()} •{" "}
                    Next verification:{" "}
                    {new Date(Date.now() + 60000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </m.div>
      </section>
    </LazyMotion>
  );
}
