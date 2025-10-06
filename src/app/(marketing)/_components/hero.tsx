import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";

const metrics = [
  {
    label: "Autonomy",
    value: "98.6%",
    detail: "Decisions executed within safety bands",
  },
  {
    label: "Yield",
    value: "12.4%",
    detail: "APY net of constraints",
  },
  {
    label: "Proof",
    value: "0x42…ab",
    detail: "Latest zk proof hash",
  },
];

export function Hero() {
  return (
    <section className="relative grid gap-10 py-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] md:items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <StatusPill
            tone="info"
            label="Demo Mode"
            detail="Solar Farm Colosseum"
          />
          <h1 className="text-4xl font-semibold text-(--text-primary) md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Own the Sun. Trust the Machine. Watch it work in real time.
          </h1>
          <p className="max-w-xl text-base text-(--text-secondary) md:text-lg">
            AIMP is the autonomous infrastructure interface where AI agents
            operate tokenized solar farms under cryptographic authority. Invest
            in seconds, observe every watt, and inspect every decision with
            proof-backed explainability.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,var(--prosperity-primary),var(--trust-primary),var(--intelligence-primary))] px-6 py-3 text-sm font-semibold text-black shadow-[0_24px_44px_rgba(33,128,141,0.32)] transition hover:shadow-[0_28px_56px_rgba(33,128,141,0.42)] focus-visible:u-focus-ring-prosperity"
          >
            Connect &amp; Buy 200 SOLAR
          </Link>
          <Link
            href="/assets/solar"
            className="inline-flex items-center gap-2 rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-6 py-3 text-sm font-semibold text-(--text-primary) transition hover:bg-(--glass-surface-elevated) focus-visible:u-focus-ring"
          >
            Explore the asset →
          </Link>
          <span className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
            Safety-first • Explainable • Solana-native
          </span>
        </div>
      </div>
      <GlassCard
        className="relative overflow-hidden"
        padding="lg"
        variant="elevated"
        trustLevel="high"
        aiState="optimizing"
      >
        <div
          className="absolute inset-0 rounded-[24px] border border-(--glass-border-highlight) bg-[radial-gradient(120%_90%_at_20%_15%,rgba(var(--color-teal-500-rgb),0.18),transparent),radial-gradient(100%_80%_at_85%_0%,rgba(var(--color-gray-300-rgb),0.12),transparent)]"
          aria-hidden
        />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-(--text-tertiary)">
                Solar Farm Status
              </p>
              <h2 className="text-2xl font-semibold text-(--text-primary)">
                Sorrento Ridge Alpha
              </h2>
              <p className="text-sm text-(--text-secondary)">
                AI Operations, AI Authority PDA, multi-oracle telemetry
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 text-right">
              <StatusPill tone="positive" label="Live" detail="Normal" />
              <span className="text-xs uppercase tracking-[0.3em] text-(--text-muted)">
                Refresh &lt; 500ms
              </span>
            </div>
          </div>
          <div className="grid gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex items-start justify-between rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
                    {metric.label}
                  </p>
                  <p className="text-sm text-(--text-secondary)">
                    {metric.detail}
                  </p>
                </div>
                <p className="text-2xl font-semibold text-(--text-primary)">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-(--glass-border-strong) bg-[rgba(var(--color-slate-900-rgb),0.78)] p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
              Constraint guardrails
            </p>
            <ul className="mt-3 space-y-2 text-sm text-(--text-secondary)">
              <li>• Max discharge: 2MW • SOC cap: 80%</li>
              <li>• Oracle deviation alarm at 3.5σ</li>
              <li>• Emergency override &lt; 200ms human acknowledgement</li>
            </ul>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
