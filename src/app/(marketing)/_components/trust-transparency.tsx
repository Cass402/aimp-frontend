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
// TRUST CATEGORIES DATA
// ===========================================

const trustCategories = [
  {
    id: "technical",
    icon: "🔍",
    title: "Technical Transparency",
    color: "var(--intelligence-primary)",
    breathAnimation: undefined,
    signals: [
      {
        icon: "✓",
        title: "Smart Contract Audited",
        description: "Security audit by leading blockchain firm",
        link: "View Report →",
        verified: true,
      },
      {
        icon: "⚡",
        title: "Open Source Code",
        description: "Full transparency, community contributions welcome",
        link: "GitHub →",
        badge: "Active",
        verified: true,
      },
      {
        icon: "📊",
        title: "Performance Metrics",
        description: "60fps UI, <2s load time, 99.9% uptime",
        link: "Live Dashboard →",
      },
    ],
  },
  {
    id: "verification",
    icon: "🔐",
    title: "Real-Time Verification",
    color: "var(--trust-primary)",
    breathAnimation: "animate-breath-slow",
    signals: [
      {
        title: "On-Chain Transactions",
        live: true,
        transactions: [
          { label: "Energy Dispatch", hash: "0x8f...92a" },
          { label: "Revenue Distribution", hash: "0x3d...14b" },
          { label: "Proof Verification", hash: "0xa2...7c8" },
        ],
        footer: "All verified on Solana blockchain",
      },
      {
        title: "Oracle Health",
        percentage: "100%",
        badges: ["Pyth", "Switchboard"],
        description: "Multi-source consensus, <2s freshness",
      },
      {
        title: "Proof Generation",
        percentage: "100%",
        description: "zkSNARK verification, <2s latency",
      },
    ],
  },
  {
    id: "community",
    icon: "🏆",
    title: "Community Recognition",
    color: "var(--prosperity-energy)",
    breathAnimation: undefined,
    signals: [
      {
        icon: "🥇",
        title: "Solana Colosseum Hackathon",
        subtitle: "Innovation Award 2025",
        subtitleColor: "var(--prosperity-energy)",
      },
      {
        title: "Developer Community",
        count: "250+",
        description: "Active contributors across GitHub, Discord, and forums",
        stats: ["⭐ 1.2k stars", "🍴 340 forks", "💬 Active discussions"],
      },
      {
        icon: "🛡️",
        title: "Security Partnership",
        description: "Verified by leading blockchain security firm",
      },
    ],
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

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      delay: index * 0.1,
    },
  }),
};

// ===========================================
// MAIN COMPONENT
// ===========================================

export function TrustTransparency() {
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
          <m.div className="text-center mb-20" variants={fadeUpVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary) mb-4">
              Trust Through Transparency
            </h2>
            <p className="text-lg text-(--text-secondary) max-w-3xl mx-auto">
              Every claim verified. Every metric proven. Every decision
              traceable.
            </p>
          </m.div>

          {/* Three Trust Categories */}
          <div className="grid gap-12 lg:grid-cols-3">
            {trustCategories.map((category, index) => (
              <m.div
                key={category.id}
                custom={index}
                variants={categoryVariants}
              >
                <TrustCategory category={category} />
              </m.div>
            ))}
          </div>

          {/* Bottom trust message */}
          <m.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.6, duration: 0.6 },
                  }
                : {}
            }
          >
            <div className="inline-flex flex-col gap-3 px-10 py-6 rounded-3xl bg-(--glass-surface-primary) border border-(--glass-border-soft) backdrop-blur-xl">
              <p className="text-base md:text-lg text-(--text-secondary)">
                Don&apos;t trust promises.
              </p>
              <p className="text-2xl md:text-3xl text-(--trust-primary) font-bold">
                Trust proofs.
              </p>
            </div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
}

// ===========================================
// TRUST CATEGORY COMPONENT
// ===========================================

interface TrustCategoryProps {
  category: (typeof trustCategories)[number];
}

function TrustCategory({ category }: TrustCategoryProps) {
  return (
    <div className="h-full">
      {/* Category Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-2xl border ${category.breathAnimation || ""}`}
          style={{
            backgroundColor: `${category.color}10`,
            borderColor: `${category.color}30`,
          }}
        >
          <span className="text-2xl">{category.icon}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-(--text-primary)">
          {category.title}
        </h3>
      </div>

      {/* Trust Signals */}
      <div className="space-y-4">
        {category.signals.map((signal, idx) => (
          <TrustSignal
            key={idx}
            signal={signal}
            categoryColor={category.color}
          />
        ))}
      </div>
    </div>
  );
}

// ===========================================
// TRUST SIGNAL COMPONENT
// ===========================================

interface TrustSignalProps {
  signal: any; // Type varies per category
  categoryColor: string;
}

function TrustSignal({ signal, categoryColor }: TrustSignalProps) {
  // Technical Transparency signals
  if ("link" in signal && signal.link) {
    return (
      <GlassCard
        padding="md"
        variant="elevated"
        className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {signal.verified && (
              <span className="text-(--trust-primary)">{signal.icon}</span>
            )}
            {!signal.verified && signal.icon && (
              <span style={{ color: categoryColor }}>{signal.icon}</span>
            )}
            <span className="text-sm md:text-base font-semibold text-(--text-primary)">
              {signal.title}
            </span>
          </div>
          <span
            className="text-xs md:text-sm transition-colors duration-300"
            style={{ color: categoryColor }}
          >
            {signal.link}
          </span>
        </div>
        {signal.badge && (
          <span className="inline-block px-2 py-1 rounded-lg bg-(--trust-primary) bg-opacity-10 text-xs text-(--trust-primary) font-medium mb-2">
            {signal.badge}
          </span>
        )}
        <p className="text-xs md:text-sm text-(--text-tertiary)">
          {signal.description}
        </p>
      </GlassCard>
    );
  }

  // Real-Time Verification - On-Chain Transactions
  if ("transactions" in signal) {
    return (
      <GlassCard padding="md" variant="elevated">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm md:text-base font-semibold text-(--text-primary)">
            {signal.title}
          </span>
          {signal.live && (
            <span className="px-2 py-1 rounded-lg bg-(--trust-primary) bg-opacity-10 text-xs text-(--trust-primary) font-medium animate-breath-fast">
              ● Live
            </span>
          )}
        </div>
        <div className="space-y-2 mb-3">
          {signal.transactions.map((tx: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs md:text-sm"
            >
              <span className="text-(--text-tertiary)">{tx.label}</span>
              <span className="text-(--trust-primary) font-mono">
                {tx.hash}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-(--text-tertiary)">{signal.footer}</p>
      </GlassCard>
    );
  }

  // Real-Time Verification - Oracle Health / Proof Generation
  if ("percentage" in signal) {
    return (
      <GlassCard padding="md" variant="elevated">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm md:text-base font-semibold text-(--text-primary)">
            {signal.title}
          </span>
          <span className="text-(--trust-primary) font-bold">
            {signal.percentage}
          </span>
        </div>
        {signal.badges && (
          <div className="flex items-center gap-2 mb-2">
            {signal.badges.map((badge: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-lg bg-(--trust-primary) bg-opacity-10 text-xs text-(--trust-primary)"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs md:text-sm text-(--text-tertiary)">
          {signal.description}
        </p>
      </GlassCard>
    );
  }

  // Community Recognition - Award/Partnership
  if ("subtitle" in signal) {
    return (
      <GlassCard padding="md" variant="elevated">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{signal.icon}</span>
          <div>
            <p className="text-sm md:text-base font-semibold text-(--text-primary)">
              {signal.title}
            </p>
            <p
              className="text-xs md:text-sm"
              style={{ color: signal.subtitleColor }}
            >
              {signal.subtitle}
            </p>
          </div>
        </div>
      </GlassCard>
    );
  }

  // Community Recognition - Developer Community
  if ("count" in signal) {
    return (
      <GlassCard padding="md" variant="elevated">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm md:text-base font-semibold text-(--text-primary)">
            {signal.title}
          </span>
          <span className="font-bold" style={{ color: categoryColor }}>
            {signal.count}
          </span>
        </div>
        <p className="text-xs md:text-sm text-(--text-tertiary) mb-3">
          {signal.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-(--text-tertiary)">
          {signal.stats.map((stat: string, idx: number) => (
            <span key={idx} className="flex items-center gap-1">
              {stat}
              {idx < signal.stats.length - 1 && <span className="ml-1">•</span>}
            </span>
          ))}
        </div>
      </GlassCard>
    );
  }

  // Community Recognition - Security Partnership
  if ("icon" in signal && "description" in signal) {
    return (
      <GlassCard padding="md" variant="elevated">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{signal.icon}</span>
          <div>
            <p className="text-sm md:text-base font-semibold text-(--text-primary)">
              {signal.title}
            </p>
            <p className="text-xs md:text-sm text-(--text-tertiary)">
              {signal.description}
            </p>
          </div>
        </div>
      </GlassCard>
    );
  }

  return null;
}
