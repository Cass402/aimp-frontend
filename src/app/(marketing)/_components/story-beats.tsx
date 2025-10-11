"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { LazyMotion, domAnimation, m, type Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StoryBeats() {
  return (
    <LazyMotion features={domAnimation}>
      {/* Intro Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-7xl w-full text-center">
          <m.div
            className="inline-flex flex-col sm:flex-row items-center gap-3 mb-6 px-6 py-3 rounded-2xl bg-(--glass-surface-primary) border border-(--glass-border-soft)"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-(--text-tertiary)">
              Infrastructure is opaque, centralized, inefficient
            </span>
            <span className="text-(--intelligence-primary)">→</span>
            <span className="text-sm text-(--text-secondary) font-medium">
              Transparent, autonomous, fractionally-owned infrastructure
            </span>
            <span className="text-(--trust-primary)">→</span>
            <span className="text-sm text-(--trust-primary) font-semibold">
              Every decision explainable, every action verifiable
            </span>
          </m.div>

          <m.h2
            className="text-4xl md:text-5xl font-bold text-(--text-primary) mb-4"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What Makes AIMP Unprecedented
          </m.h2>
          <m.p
            className="text-lg text-(--text-secondary) max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            The first platform where AI autonomously manages real infrastructure
            while every decision remains explainable, verifiable, and under
            human control.
          </m.p>
        </div>

        {/* Scroll Nudge */}
        <m.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-(--text-tertiary)">
            Scroll to see how transparency becomes reality
          </p>
          <div className="w-6 h-10 rounded-full border-2 border-(--glass-border-soft) flex items-start justify-center p-2">
            <m.div
              className="w-1.5 h-3 rounded-full bg-(--text-secondary)"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </m.div>
      </section>

      {/* Story Beat 1: EXPLAINABLE AUTONOMY */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden px-6 py-20">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, var(--intelligence-primary) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story Narrative */}
            <m.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) leading-tight">
                EXPLAINABLE
                <br />
                AUTONOMY
              </h3>

              <div className="space-y-6">
                <p className="text-2xl text-(--text-secondary) leading-relaxed">
                  Every decision the AI makes is transparent. No black boxes.
                </p>

                <p className="text-lg text-(--text-secondary) leading-relaxed">
                  Watch the Operations Agent explain why it&apos;s storing
                  energy instead of selling to the grid. See the data sources,
                  the constraints, the reasoning—all in human terms.
                </p>

                <p className="text-base text-(--text-tertiary) leading-relaxed">
                  This isn&apos;t AI that hides its thinking. This is AI that
                  shows its work, step by step, decision by decision.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  "Human-readable reasoning",
                  "Real-time constraints",
                  "Source provenance",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 rounded-xl text-sm font-medium"
                    style={{
                      backgroundColor: "var(--intelligence-primary)10",
                      border: "1px solid var(--intelligence-primary)30",
                      color: "var(--intelligence-primary)",
                    }}
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </m.div>

            {/* Right: Live Demo */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard
                padding="lg"
                variant="neural"
                className="backdrop-blur-md"
              >
                <div className="space-y-6">
                  {/* Agent header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-(--glass-border-soft)">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--intelligence-primary)20",
                        border: "2px solid var(--intelligence-primary)40",
                      }}
                    >
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-(--text-primary)">
                        Operations Agent
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--intelligence-primary)" }}
                      >
                        Analyzing energy patterns...
                      </p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: "var(--trust-primary)10",
                        color: "var(--trust-primary)",
                      }}
                    >
                      ● Live
                    </span>
                  </div>

                  {/* Decision */}
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: "var(--intelligence-primary)05",
                      border: "1px solid var(--intelligence-primary)20",
                    }}
                  >
                    <p className="text-xs font-semibold text-(--text-primary) mb-2">
                      Decision:
                    </p>
                    <p className="text-sm text-(--text-secondary)">
                      &quot;Demand low at 14:30. Storing 800kW in batteries
                      until 18:00 peak pricing.&quot;
                    </p>
                  </div>

                  {/* Reasoning steps */}
                  <div className="p-4 rounded-xl bg-(--glass-surface-primary) border border-(--glass-border-soft)">
                    <p className="text-xs font-semibold text-(--text-primary) mb-3">
                      Reasoning:
                    </p>
                    <div className="space-y-2 text-sm text-(--text-secondary)">
                      {[
                        "Grid demand: 2.1 MW (< 3.5 MW threshold)",
                        "Battery SOC: 45% (safe range 40-80%)",
                        "Peak pricing $38-42/MWh at 18:00-20:00",
                        "Action: Store now, sell at peak",
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span
                            className="font-bold"
                            style={{ color: "var(--intelligence-primary)" }}
                          >
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data sources */}
                  <div className="flex flex-wrap gap-2">
                    {["Oracle: Pyth", "Freshness: 1.2s", "94% Confidence"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-xs"
                          style={{
                            backgroundColor: "var(--trust-primary)10",
                            border: "1px solid var(--trust-primary)30",
                            color: "var(--trust-primary)",
                          }}
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </GlassCard>
            </m.div>
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 text-center">
        <m.p
          className="text-2xl text-(--text-secondary) italic max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          &quot;This isn&apos;t black box AI. This is AI that explains
          itself.&quot;
        </m.p>
      </section>

      {/* Story Beat 2: VERIFIABLE PROOFS */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden px-6 py-20">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 50%, var(--trust-primary) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story Narrative */}
            <m.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) leading-tight">
                VERIFIABLE
                <br />
                PROOFS
              </h3>

              <div className="space-y-6">
                <p className="text-2xl text-(--text-secondary) leading-relaxed">
                  Trust through cryptography, not promises.
                </p>

                <p className="text-lg text-(--text-secondary) leading-relaxed">
                  Watch as every decision gets cryptographically verified on
                  Solana. zkSNARK proofs ensure AI operates within boundaries—no
                  exceptions, no loopholes.
                </p>

                <p className="text-base text-(--text-tertiary) leading-relaxed">
                  Don&apos;t trust what we say. Verify what the blockchain
                  proves. Every action, every transaction, every proof—immutable
                  and traceable.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  "zkSNARK verification",
                  "On-chain proof",
                  "Immutable audit trail",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 rounded-xl text-sm font-medium"
                    style={{
                      backgroundColor: "var(--trust-primary)10",
                      border: "1px solid var(--trust-primary)30",
                      color: "var(--trust-primary)",
                    }}
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </m.div>

            {/* Right: Proof Demo */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard
                padding="lg"
                variant="trust"
                className="backdrop-blur-md"
              >
                <div className="space-y-6">
                  {/* Proof header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-(--glass-border-soft)">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--trust-primary)20",
                        border: "2px solid var(--trust-primary)40",
                      }}
                    >
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-(--text-primary)">
                        Proof Generation
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--trust-primary)" }}
                      >
                        Verifying compliance...
                      </p>
                    </div>
                  </div>

                  {/* Verification steps */}
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: "var(--trust-primary)05",
                        border: "1px solid var(--trust-primary)20",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-(--text-primary)">
                          1. Constraint Validation
                        </p>
                        <span
                          className="text-xl"
                          style={{ color: "var(--trust-primary)" }}
                        >
                          ✓
                        </span>
                      </div>
                      <p className="text-xs text-(--text-tertiary)">
                        Battery SOC within safe range (40-80%) ✓
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: "var(--trust-primary)05",
                        border: "1px solid var(--trust-primary)20",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-(--text-primary)">
                          2. zkSNARK Generation
                        </p>
                        <span
                          className="text-xl"
                          style={{ color: "var(--trust-primary)" }}
                        >
                          ✓
                        </span>
                      </div>
                      <p className="text-xs text-(--text-tertiary) font-mono">
                        Proof: 0x8f2a...93bc
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: "var(--trust-primary)05",
                        border: "1px solid var(--trust-primary)20",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-(--text-primary)">
                          3. On-Chain Verification
                        </p>
                        <m.span
                          className="text-sm"
                          style={{ color: "var(--trust-primary)" }}
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ● Verifying
                        </m.span>
                      </div>
                      <p className="text-xs text-(--text-tertiary)">
                        Submitting to Solana...
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: "var(--trust-primary)10",
                        border: "2px solid var(--trust-primary)40",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p
                          className="text-sm font-bold"
                          style={{ color: "var(--trust-primary)" }}
                        >
                          ✓ Verified on Solana
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-(--text-tertiary) font-mono">
                          Tx: 5Qm8...kP3z
                        </p>
                        <button
                          type="button"
                          className="text-xs hover:underline"
                          style={{ color: "var(--trust-primary)" }}
                        >
                          View →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          </div>
        </div>
      </section>

      {/* Story Beat 3: HUMAN OVERRIDE */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden px-6 py-20">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--prosperity-primary) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story Narrative */}
            <m.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--text-primary) leading-tight">
                HUMAN
                <br />
                OVERRIDE
              </h3>

              <div className="space-y-6">
                <p className="text-2xl text-(--text-secondary) leading-relaxed">
                  Autonomy within governance, never without consent.
                </p>

                <p className="text-lg text-(--text-secondary) leading-relaxed">
                  Emergency stop always within thumb&apos;s reach. One click
                  pauses all AI operations. The system waits for your command.
                </p>

                <p className="text-base text-(--text-tertiary) leading-relaxed">
                  This is autonomy with accountability. AI operates under
                  cryptographic authority, but humans hold the ultimate control.
                  Always.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  "One-click override",
                  "Instant AI pause",
                  "On-chain logging",
                ].map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 rounded-xl text-sm font-medium"
                    style={{
                      backgroundColor: "var(--prosperity-primary)10",
                      border: "1px solid var(--prosperity-primary)30",
                      color: "var(--prosperity-primary)",
                    }}
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </m.div>

            {/* Right: Override Demo */}
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard
                padding="lg"
                variant="elevated"
                className="backdrop-blur-md"
              >
                <div className="space-y-6">
                  {/* Demo header */}
                  <div className="text-center pb-4 border-b border-(--glass-border-soft)">
                    <p className="text-base font-bold text-(--text-primary) mb-2">
                      Interactive Override Demo
                    </p>
                    <p className="text-xs text-(--text-tertiary)">
                      Safe simulation — no real infrastructure affected
                    </p>
                  </div>

                  {/* Current status */}
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: "var(--trust-primary)05",
                      border: "1px solid var(--trust-primary)20",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-(--text-primary)">
                        AI Status
                      </p>
                      <span
                        className="px-3 py-1 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: "var(--trust-primary)10",
                          color: "var(--trust-primary)",
                        }}
                      >
                        ● Active
                      </span>
                    </div>
                    <p className="text-xs text-(--text-tertiary)">
                      Managing 2.8 MW across 4 solar arrays
                    </p>
                  </div>

                  {/* Override button */}
                  <m.button
                    type="button"
                    className="group w-full p-8 rounded-2xl border-2 transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--status-warning)20, var(--status-warning)10)",
                      borderColor: "var(--status-warning)40",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">⚠️</span>
                      <span className="text-xl font-bold text-(--text-primary)">
                        Emergency Override
                      </span>
                      <p className="text-xs text-(--text-tertiary)">
                        Click to pause all AI operations
                      </p>
                    </div>
                  </m.button>

                  {/* What happens */}
                  <div className="p-4 rounded-xl bg-(--glass-surface-primary) border border-(--glass-border-soft)">
                    <p className="text-sm font-semibold text-(--text-primary) mb-3">
                      What happens when you override:
                    </p>
                    <div className="space-y-2 text-xs text-(--text-secondary)">
                      {[
                        "AI operations pause immediately",
                        "Override state shown across all screens",
                        "Event logged on-chain with timestamp",
                        "You take manual control",
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span
                            className="font-bold"
                            style={{ color: "var(--prosperity-primary)" }}
                          >
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
