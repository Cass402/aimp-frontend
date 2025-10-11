"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  type Variants,
} from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import type { AgentPersona, TrustMathematics } from "@/lib/types";

// ===========================================
// TYPES
// ===========================================

type AgentMetric = {
  label: string;
  value: string;
  verified?: boolean;
  warning?: boolean;
  energy?: boolean;
};

type AgentShowcaseData = {
  id: AgentPersona;
  name: string;
  emoji: string;
  demoEmoji: string;
  personality: string;
  description: string;
  recentDecision: string;
  demoTitle: string;
  metrics: AgentMetric[];
  trustMath: TrustMathematics;
  ctaText: string;
  ambientColor: string;
  glowColor: string;
  breathAnimation: string;
};

// ===========================================
// AI AGENT DATA: Full-screen cinematic introductions
// TYPE SAFETY: AgentPersona ensures semantic color system alignment
// ===========================================

const agents: readonly AgentShowcaseData[] = [
  {
    id: "operations",
    name: "Operations Agent",
    emoji: "🤖",
    demoEmoji: "⚡",
    personality: "Analytical, calm precision",
    description:
      "Controls energy generation, storage dispatch, and grid interactions. Optimizes every watt with constraint-aware decision trees.",
    recentDecision:
      "Charging batteries 2-4pm. SOC < 80%, price $32/MWh, forecast irradiance rising.",
    demoTitle: "Energy Dispatch Logic",
    metrics: [
      { label: "Battery SOC", value: "78%" },
      { label: "Grid Price", value: "$32/MWh" },
      { label: "Solar Forecast", value: "↑ Rising" },
      { label: "Decision", value: "Charge Now", verified: true },
    ],
    trustMath: {
      confidenceScore: 96,
      witnessCount: 24,
      deviationSigma: 0.015,
      exceedsThreshold: false,
      trustGrade: "excellent",
    },
    ctaText: "Explore Live Reasoning",
    ambientColor: "var(--agent-operations)",
    glowColor: "var(--agent-operations-glow)",
    breathAnimation: "animate-breath-slow",
  },
  {
    id: "sentinel",
    name: "Maintenance Agent",
    emoji: "🔧",
    demoEmoji: "🛠️",
    personality: "Supportive, direct action",
    description:
      "Monitors system health, predicts failures, and coordinates self-repair. Keeps infrastructure running at peak efficiency.",
    recentDecision:
      "Inverter #3 voltage deviation detected. Auto-repair in 6min.",
    demoTitle: "System Health Monitor",
    metrics: [
      { label: "Inverter #3", value: "Deviation", warning: true },
      { label: "Repair ETA", value: "6 minutes" },
      { label: "Impact", value: "Minimal" },
      { label: "Status", value: "Auto-fixing", verified: true },
    ],
    trustMath: {
      confidenceScore: 88,
      witnessCount: 18,
      deviationSigma: 0.022,
      exceedsThreshold: false,
      trustGrade: "good",
    },
    ctaText: "See Maintenance Examples",
    ambientColor: "var(--agent-maintenance)",
    glowColor: "var(--agent-maintenance-glow)",
    breathAnimation: "animate-breath-medium",
  },
  {
    id: "markets",
    name: "Markets Agent",
    emoji: "📈",
    demoEmoji: "💹",
    personality: "Confident, data-driven",
    description:
      "Analyzes energy markets, optimizes trading strategies, and maximizes revenue. Every sale backed by market intelligence.",
    recentDecision: "Selling 1.2MW @ 18:30 due to $38-40/MWh price band.",
    demoTitle: "Market Analysis",
    metrics: [
      { label: "Price Band", value: "$38-40/MWh", energy: true },
      { label: "Sell Volume", value: "1.2 MW", energy: true },
      { label: "Timing", value: "18:30", energy: true },
      { label: "Confidence", value: "94%", verified: true },
    ],
    trustMath: {
      confidenceScore: 94,
      witnessCount: 32,
      deviationSigma: 0.018,
      exceedsThreshold: false,
      trustGrade: "excellent",
    },
    ctaText: "View Market Strategy",
    ambientColor: "var(--agent-markets)",
    glowColor: "var(--agent-markets-glow)",
    breathAnimation: "animate-breath-fast",
  },
] as const;

// ===========================================
// MOTION VARIANTS
// ===========================================

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const agentSectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ===========================================
// FULL-SCREEN AGENT SHOWCASE COMPONENT
// ===========================================

export function AgentShowcase() {
  const introRef = useRef<HTMLElement>(null);
  const isIntroInView = useInView(introRef, {
    once: true,
    margin: "-100px",
    amount: 0.3,
  });

  return (
    <LazyMotion features={domAnimation}>
      {/* Intro Screen */}
      <m.section
        ref={introRef}
        className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6"
        initial="hidden"
        animate={isIntroInView ? "visible" : "hidden"}
        variants={fadeUpVariants}
      >
        <div className="mx-auto max-w-4xl w-full text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary)">
            Meet Your AI Agents
          </h2>
          <p className="text-lg text-(--text-secondary) max-w-3xl mx-auto">
            This isn&apos;t black box AI. These are specialized intelligences
            that explain every decision they make.
          </p>
          <p className="text-base text-(--text-tertiary) max-w-2xl mx-auto">
            Each agent has its own personality, expertise, and communication
            style — making autonomous infrastructure feel human.
          </p>
        </div>

        {/* Scroll nudge */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-xs text-(--text-tertiary)">
            Meet the three agents
          </p>
          <div className="w-6 h-10 rounded-full border-2 border-(--glass-border-soft) flex items-start justify-center p-2">
            <div
              className="w-1.5 h-3 rounded-full bg-(--text-secondary)"
              style={{
                animation: "bounce 2s infinite",
              }}
            />
          </div>
        </div>
      </m.section>

      {/* Individual Agent Sections */}
      {agents.map((agent, index) => (
        <AgentSection key={agent.id} agent={agent} index={index} />
      ))}

      {/* Closing message */}
      <section className="relative z-10 min-h-screen w-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-6 rounded-3xl bg-(--glass-surface-primary) border-2 border-(--glass-border-soft) backdrop-blur-xl shadow-2xl">
            <span className="text-base md:text-lg text-(--text-secondary)">
              These agents work together, 24/7, making
            </span>
            <span className="text-3xl md:text-4xl font-bold text-(--agent-operations)">
              1,203
            </span>
            <span className="text-base md:text-lg text-(--text-secondary)">
              decisions daily —
            </span>
            <span className="text-3xl md:text-4xl font-bold text-(--agent-governance)">
              all explainable
            </span>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}

// ===========================================
// INDIVIDUAL AGENT SECTION
// ===========================================

interface AgentSectionProps {
  agent: (typeof agents)[number];
  index: number;
}

function AgentSection({ agent }: AgentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-150px",
    amount: 0.3,
  });

  return (
    <m.section
      ref={sectionRef}
      className="relative z-10 min-h-screen w-full flex items-center justify-center px-6 py-12"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={agentSectionVariants}
    >
      <div className="mx-auto max-w-7xl w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: Agent narrative */}
        <m.div className="space-y-6" variants={fadeUpVariants}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-full border-2 ${agent.breathAnimation}`}
              style={{
                backgroundColor: `${agent.ambientColor}20`,
                borderColor: `${agent.ambientColor}40`,
                boxShadow: `0 0 30px ${agent.ambientColor}30`,
              }}
            >
              <span className="text-5xl">{agent.emoji}</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-(--text-primary)">
                {agent.name}
              </h3>
              <p
                className="text-sm font-medium italic"
                style={{ color: agent.ambientColor }}
              >
                &ldquo;{agent.personality}&rdquo;
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg text-(--text-secondary) leading-relaxed">
            {agent.description}
          </p>

          <div
            className="p-6 rounded-3xl border-2"
            style={{
              backgroundColor: `${agent.ambientColor}05`,
              borderColor: `${agent.ambientColor}20`,
            }}
          >
            <p className="text-xs text-(--text-tertiary) mb-3 font-semibold uppercase tracking-wider">
              Recent Decision:
            </p>
            <p className="text-sm md:text-base text-(--text-secondary) leading-relaxed mb-4">
              &ldquo;{agent.recentDecision}&rdquo;
            </p>
            <button
              type="button"
              className="group/btn w-full flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-300"
              style={{
                backgroundColor: `${agent.ambientColor}10`,
                borderColor: `${agent.ambientColor}30`,
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: agent.ambientColor }}
              >
                {agent.ctaText}
              </span>
              <span
                className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                style={{ color: agent.ambientColor }}
              >
                →
              </span>
            </button>
          </div>
        </m.div>

        {/* Right: Visual demo */}
        <m.div className="relative" variants={fadeUpVariants}>
          <div
            className={`absolute inset-0 blur-3xl rounded-full ${agent.breathAnimation}`}
            style={{
              backgroundColor: `${agent.ambientColor}10`,
            }}
          />
          <div
            className="relative"
            style={{
              borderColor: `${agent.ambientColor}40`,
              boxShadow: `0 0 40px ${agent.ambientColor}20`,
            }}
          >
            <GlassCard
              agent={agent.id}
              trustMath={agent.trustMath}
              padding="lg"
              variant="elevated"
              className="border-2"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">{agent.demoEmoji}</div>
                <p className="text-xl md:text-2xl font-bold text-(--text-primary)">
                  {agent.demoTitle}
                </p>
                <div className="space-y-2 text-left">
                  {agent.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm items-center"
                    >
                      <span className="text-(--text-tertiary)">
                        {metric.label}:
                      </span>
                      <span
                        className={`font-mono font-semibold ${
                          metric.verified
                            ? "text-(--agent-governance)" // 🔵 Purple - verified/trust
                            : metric.warning
                              ? "text-(--status-warning)"
                              : metric.energy
                                ? "text-(--agent-markets)" // 🟢 Green - energy/markets
                                : ""
                        }`}
                        style={
                          !metric.verified && !metric.warning && !metric.energy
                            ? { color: agent.ambientColor }
                            : undefined
                        }
                      >
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </m.div>
      </div>
    </m.section>
  );
}
