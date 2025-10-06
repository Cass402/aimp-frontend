"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { LazyMotion, domAnimation, m, type Variants } from "motion/react";
import { useState } from "react";

// ===========================================
// ENHANCED FEATURE DATA: Persona-driven content with trust psychology
// Each feature targets specific emotional states and cognitive patterns
// ===========================================

const highlights = [
  {
    title: "Explainable Autonomy",
    subtitle: "Operations Agent", // Persona clarity for trust building
    description:
      "Every AI action ships with persona-led reasoning, constraint evidence, and oracle provenance. Nothing feels like a black box—everything has a clear 'why.'",
    bullets: [
      {
        text: "Operations, Maintenance, and Markets voices",
        icon: "personas", // Humanizes AI through distinct personalities
      },
      {
        text: "Proof hashes logged for critical decisions",
        icon: "security", // Reinforces cryptographic trust
      },
      {
        text: "Human override always within 2 clicks",
        icon: "control", // Addresses autonomy anxiety
      },
    ],
    variant: "neural" as const,
    aiState: "learning" as const,
    trustLevel: "medium" as const,
    ambientColor: "var(--intelligence-primary)",
    persona: "technical", // Influences micro-copy tone
  },
  {
    title: "Trust-First Ownership",
    subtitle: "Markets Agent", // Financial persona for credibility
    description:
      "Connect, review guardrails, and acquire SOLAR tokens with worst-case quotes, decoded PDAs, and fee transparency. Risk-first design builds real confidence.",
    bullets: [
      {
        text: "Worst-case scenarios surfaced before upside",
        icon: "risk-first", // Addresses loss aversion psychology
      },
      {
        text: "Decoded program + PDA map for every receipt",
        icon: "transparency", // Technical transparency builds competence trust
      },
      {
        text: "Safety constraints actively monitored",
        icon: "safety", // Continuous reassurance pattern
      },
    ],
    variant: "trust" as const,
    aiState: "processing" as const,
    trustLevel: "high" as const, // Peak trust for financial decisions
    ambientColor: "var(--trust-primary)",
    persona: "analytical",
  },
  {
    title: "Live Digital Twin",
    subtitle: "Maintenance Agent", // Technical persona for system monitoring
    description:
      "Explore the solar farm with animated flows, panel health dots, and battery state-of-charge. 60fps smooth, fully accessible, proof of life.",
    bullets: [
      {
        text: "Grid and battery flows with real-time tooltips",
        icon: "live-data", // Reinforces system liveliness
      },
      {
        text: "Panel drilldowns with Maintenance summaries",
        icon: "detail-access", // Satisfies curiosity and control needs
      },
      {
        text: "Emergency override with tamper-evident log",
        icon: "emergency", // Ultimate trust through veto power
      },
    ],
    variant: "elevated" as const,
    aiState: "optimizing" as const,
    trustLevel: "medium" as const,
    ambientColor: "var(--prosperity-energy)",
    persona: "supportive",
  },
];

// ===========================================
// MICRO-INTERACTION VARIANTS: Physics-based animations for trust communication
// Research-backed timing and easing for subconscious reliability signals
// ===========================================

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24, // Slightly more lift for impact
    scale: 0.97, // Subtle scale for depth
    filter: "blur(8px)", // Softer initial blur
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 380, // Snappy but not jarring
      damping: 28, // Well-damped for trustworthiness
      mass: 0.7, // Light feel
      delay: index * 0.1, // Staggered reveal builds anticipation
    },
  }),
  hover: {
    y: -2, // Subtle lift suggests responsiveness
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.5, // Quick response
    },
  },
  tap: {
    scale: 0.99, // Minimal press feedback
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};

// Enhanced header animation with organic movement
const headerVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
};

// Ambient pulse for trust indicators - subtle "proof of life"
const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.02, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2.4, // Slow, breathing rhythm
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Progressive bullet reveal for cognitive load management
const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -8, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      delay: index * 0.08, // Quick succession for momentum
    },
  }),
};

export function FeatureHighlights() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <section className="mt-12 space-y-8">
        {" "}
        {/* Increased spacing for breathing room */}
        {/* Enhanced header with trust-building hierarchy */}
        <m.header
          className="flex flex-col gap-3"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-tertiary)] font-medium">
            The Interface
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] leading-tight">
            Designed for trust, explainability,{" "}
            <span className="bg-gradient-to-r from-[var(--trust-primary)] to-[var(--prosperity-energy)] bg-clip-text text-transparent">
              and real economic gravity.
            </span>
          </h2>

          {/* Trust reinforcement tagline */}
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
            Where autonomous infrastructure meets human understanding. Every
            decision is explainable, every action is auditable, every outcome is
            transparent.
          </p>
        </m.header>
        {/* Enhanced grid with improved spacing and hierarchy */}
        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {highlights.map((highlight, index) => (
            <m.div
              key={highlight.title}
              custom={index}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group" // Group for advanced hover effects
            >
              <GlassCard
                padding="lg"
                variant={highlight.variant}
                aiState={highlight.aiState}
                trustLevel={highlight.trustLevel}
                className="flex h-full flex-col gap-6 relative overflow-hidden"
              >
                {/* Ambient background glow - subtle AI presence indicator */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${highlight.ambientColor}08 0%, transparent 60%)`,
                  }}
                />

                {/* Enhanced header with persona clarity */}
                <div className="space-y-3 relative z-10">
                  {/* Persona indicator - builds trust through role clarity */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: highlight.ambientColor,
                        boxShadow: `0 0 8px ${highlight.ambientColor}40`,
                      }}
                    />
                    <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                      {highlight.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] leading-tight">
                    {highlight.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {highlight.description}
                  </p>
                </div>

                {/* Enhanced bullet list with progressive reveal */}
                <m.ul
                  className="mt-auto space-y-3 text-sm relative z-10"
                  initial="hidden"
                  animate="visible"
                >
                  {highlight.bullets.map((bullet, bulletIndex) => (
                    <m.li
                      key={bullet.text}
                      custom={bulletIndex}
                      variants={bulletVariants}
                      className="flex items-start gap-3 group/bullet"
                    >
                      {/* Enhanced bullet indicator with trust gradient */}
                      <span
                        className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0 relative"
                        style={{
                          background: `linear-gradient(135deg, ${highlight.ambientColor}, var(--trust-primary))`,
                        }}
                      >
                        {/* Subtle pulse for high-trust items */}
                        {highlight.trustLevel === "high" && (
                          <m.span
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${highlight.ambientColor}, var(--trust-primary))`,
                            }}
                            variants={pulseVariants}
                            animate="pulse"
                          />
                        )}
                      </span>

                      <span className="text-[var(--text-secondary)] group-hover/bullet:text-[var(--text-primary)] transition-colors duration-200">
                        {bullet.text}
                      </span>
                    </m.li>
                  ))}
                </m.ul>

                {/* Trust level visual indicator - builds confidence through clarity */}
                {highlight.trustLevel === "high" && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--trust-primary)]/10 text-[var(--trust-primary)] border border-[var(--trust-primary)]/20">
                      High Trust
                    </div>
                  </div>
                )}

                {/* Interaction affordance - subtle visual cue for explorability */}
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 rounded-full bg-[var(--trust-primary)]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--trust-primary)]" />
                  </div>
                </div>
              </GlassCard>
            </m.div>
          ))}
        </div>
        {/* Call-to-action section - guides next steps */}
        <m.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Ready to experience autonomous infrastructure?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button className="px-6 py-3 bg-[var(--trust-primary)] text-[var(--color-btn-primary-text)] rounded-lg font-medium hover:bg-[var(--trust-secondary)] transition-colors duration-200">
              Connect Wallet
            </button>
            <button className="px-6 py-3 text-[var(--trust-primary)] border border-[var(--trust-primary)]/30 rounded-lg font-medium hover:bg-[var(--trust-primary)]/10 transition-colors duration-200">
              Explore Digital Twin
            </button>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
