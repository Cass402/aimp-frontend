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
    subtitle: "See AI Reasoning in Real-Time", // Persona clarity for trust building
    description:
      "Watch the Operations Agent explain why it's storing energy instead of selling to the grid. See the data sources, the constraints, the reasoning—all in human terms. No black boxes.",
    bullets: [
      {
        text: "Human-readable decision explanations",
        icon: "personas", // Humanizes AI through distinct personalities
      },
      {
        text: "Real-time constraint validation",
        icon: "security", // Reinforces cryptographic trust
      },
      {
        text: "Source provenance for every data point",
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
    title: "Verifiable Proofs",
    subtitle: "Trust Through Cryptography", // Financial persona for credibility
    description:
      "Every decision gets cryptographically verified on Solana. zkSNARK proofs ensure AI operates within boundaries—no exceptions, no loopholes. Don't trust promises. Trust proofs.",
    bullets: [
      {
        text: "zkSNARK verification for compliance",
        icon: "risk-first", // Addresses loss aversion psychology
      },
      {
        text: "On-chain proof submission and verification",
        icon: "transparency", // Technical transparency builds competence trust
      },
      {
        text: "Immutable audit trail for every action",
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
    title: "Human Override",
    subtitle: "Autonomy with Accountability", // Technical persona for system monitoring
    description:
      "Emergency stop always within thumb's reach. One click pauses all AI operations. The system waits for your command. AI operates under cryptographic authority, but humans hold ultimate control.",
    bullets: [
      {
        text: "One-click emergency override",
        icon: "live-data", // Reinforces system liveliness
      },
      {
        text: "Instant AI pause with confirmation",
        icon: "detail-access", // Satisfies curiosity and control needs
      },
      {
        text: "Tamper-evident on-chain logging",
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
  const [, setHoveredCard] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <section className="mt-12 space-y-8">
        {/* Feature cards grid */}
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
                    <span className="text-xs font-medium text-(--text-tertiary) uppercase tracking-wider">
                      {highlight.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-(--text-primary) leading-tight">
                    {highlight.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-(--text-secondary)">
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

                      <span className="text-(--text-secondary) group-hover/bullet:text-(--text-primary) transition-colors duration-200">
                        {bullet.text}
                      </span>
                    </m.li>
                  ))}
                </m.ul>

                {/* Trust level visual indicator - builds confidence through clarity */}
                {highlight.trustLevel === "high" && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-(--trust-primary)/10 text-(--trust-primary) border border-(--trust-primary)/20">
                      High Trust
                    </div>
                  </div>
                )}

                {/* Interaction affordance - subtle visual cue for explorability */}
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 rounded-full bg-(--trust-primary)/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-(--trust-primary)" />
                  </div>
                </div>
              </GlassCard>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
