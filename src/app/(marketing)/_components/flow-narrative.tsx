import { GlassCard } from "@/components/ui/glass-card";

const phases = [
  {
    badge: "01",
    title: "Connect & Authenticate",
    summary:
      "Connect a Solana wallet or load the demo session. AIMP validates AI agent authority, constraint registry, and oracle health before rendering dashboards.",
  },
  {
    badge: "02",
    title: "Buy & Simulate",
    summary:
      "Request a quote via Jupiter mocks, inspect worst-case outcomes and AI guardrails, then execute with decoded receipts and proof hashes.",
  },
  {
    badge: "03",
    title: "Observe & Explain",
    summary:
      "Dashboard glass cards stream operations, maintenance alerts, and market hedges — each with persona voice and replayable evidence.",
  },
  {
    badge: "04",
    title: "Explore & Override",
    summary:
      "Digital twin flow lines, battery plans, and panel grid animate live telemetry. Emergency override is always visible, audited, and reversible.",
  },
];

export function FlowNarrative() {
  return (
    <section className="mt-16 grid gap-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Minimal Vertical Slice
        </p>
        <h2 className="text-3xl font-semibold text-(--text-primary)">
          Ingest → Decide → Execute → Observe, delivered in a calm glass
          surface.
        </h2>
      </header>
      <GlassCard
        padding="lg"
        variant="neural"
        aiState="processing"
        trustLevel="medium"
        className="flex flex-col gap-6"
      >
        <ol className="grid gap-5 md:grid-cols-2">
          {phases.map((phase) => (
            <li key={phase.title} className="flex items-start gap-4">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-(--glass-border-highlight) bg-(--glass-surface-primary) text-sm font-semibold text-(--text-primary)">
                {phase.badge}
              </span>
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--text-tertiary)">
                  {phase.title}
                </p>
                <p className="text-sm text-(--text-secondary)">
                  {phase.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="rounded-2xl border border-(--glass-border-strong) bg-[rgba(var(--color-slate-900-rgb),0.72)] p-5 text-sm text-(--text-secondary)">
          AIMP is built on constraints-first autonomy: AI agents act only within
          verifiable bounds, every oracle input carries provenance, and humans
          can pause execution in under 200&nbsp;ms. This is the surface that
          earns trust in the first three seconds.
        </div>
      </GlassCard>
    </section>
  );
}
