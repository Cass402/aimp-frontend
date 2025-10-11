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

// ===========================================
// AUDIENCE DATA
// ===========================================

const audiences = [
  {
    id: "developers",
    icon: "👨‍💻",
    title: "For Developers",
    color: "var(--intelligence-primary)",
    features: [
      "Architecture diagrams & system design",
      "API documentation & integration guides",
      "GitHub repository & contribution guidelines",
      "Tech stack: Next.js 15, Solana, zkSNARKs",
    ],
    ctaText: "View Developer Docs",
  },
  {
    id: "investors",
    icon: "💼",
    title: "For Investors",
    color: "var(--prosperity-energy)",
    features: [
      "Revenue model & earning potential",
      "Market size & growth projections",
      "Risk management & safety protocols",
      "Transparent on-chain distributions",
    ],
    ctaText: "See Investment Details",
  },
  {
    id: "judges",
    icon: "🏆",
    title: "For Judges",
    color: "var(--trust-primary)",
    features: [
      "Innovation: First explainable autonomous infrastructure",
      "Implementation: Working system with real metrics",
      "Impact: Democratizing infrastructure ownership",
      "Quality: 60fps, <2s load, accessibility",
    ],
    ctaText: "Technical Deep Dive",
  },
] as const;

// ===========================================
// MOTION VARIANTS
// ===========================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      delay: index * 0.1 + 0.3,
    },
  }),
};

// ===========================================
// MAIN COMPONENT
// ===========================================

export function BuiltForEveryone() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
    amount: 0.2,
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={sectionRef}
        className="relative z-10 min-h-screen w-full flex items-center justify-center px-6 py-24"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <m.div className="text-center mb-16" variants={fadeUpVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary) mb-4">
              Built for Everyone
            </h2>
            <p className="text-lg text-(--text-secondary) max-w-3xl mx-auto">
              Whether you&apos;re building, investing, or evaluating —
              there&apos;s depth here for you.
            </p>
          </m.div>

          {/* Three Audience Cards */}
          <div className="grid gap-8 lg:grid-cols-3">
            {audiences.map((audience, index) => (
              <m.div
                key={audience.id}
                custom={index}
                variants={cardVariants}
                className="group relative"
              >
                <AudienceCard audience={audience} />
              </m.div>
            ))}
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}

// ===========================================
// AUDIENCE CARD COMPONENT
// ===========================================

interface AudienceCardProps {
  audience: (typeof audiences)[number];
}

function AudienceCard({ audience }: AudienceCardProps) {
  return (
    <GlassCard
      padding="lg"
      variant="elevated"
      className="h-full flex flex-col transition-all duration-300 hover:scale-[1.01] cursor-pointer"
    >
      {/* Icon */}
      <div
        className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl border transition-shadow duration-300 group-hover:shadow-lg"
        style={{
          backgroundColor: `${audience.color}10`,
          borderColor: `${audience.color}30`,
          boxShadow: `0 0 0 rgba(0,0,0,0)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 30px ${audience.color}30`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
        }}
      >
        <span className="text-4xl">{audience.icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-4">
        {audience.title}
      </h3>

      {/* Features List */}
      <div className="space-y-3 mb-6 flex-1">
        {audience.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span
              className="mt-1 flex-shrink-0"
              style={{ color: audience.color }}
            >
              ▸
            </span>
            <span className="text-sm text-(--text-secondary)">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        type="button"
        className="group/btn w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-300"
        style={{
          backgroundColor: `${audience.color}10`,
          borderColor: `${audience.color}30`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${audience.color}20`;
          e.currentTarget.style.borderColor = `${audience.color}50`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `${audience.color}10`;
          e.currentTarget.style.borderColor = `${audience.color}30`;
        }}
      >
        <span
          className="text-sm md:text-base font-semibold"
          style={{ color: audience.color }}
        >
          {audience.ctaText}
        </span>
        <span
          className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
          style={{ color: audience.color }}
        >
          →
        </span>
      </button>
    </GlassCard>
  );
}
