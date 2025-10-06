import { GlassCard } from "@/components/ui/glass-card";

const highlights = [
  {
    title: "Explainable Autonomy",
    description:
      "Every AI action ships with persona-led reasoning, constraint evidence, and oracle provenance so nothing feels like a black box.",
    bullets: [
      "Operations, Maintenance, and Markets voices",
      "Proof hashes logged for critical decisions",
      "Human override always within 2 clicks",
    ],
  },
  {
    title: "Trust-First Ownership",
    description:
      "Connect, review guardrails, and acquire SOLAR tokens with worst-case quotes, decoded PDAs, and fee transparency before you confirm.",
    bullets: [
      "Worst-case receives surfaced before upside",
      "Decoded program + PDA map for every receipt",
      "Safety pill reaffirms constraints are active",
    ],
  },
  {
    title: "Live Digital Twin",
    description:
      "Explore the solar farm with animated flows, panel health dots, and battery state-of-charge — all keyboard accessible and 60fps smooth.",
    bullets: [
      "Grid and battery flows with explainable tooltips",
      "Panel drilldowns with Maintenance persona summaries",
      "Emergency override with tamper-evident log",
    ],
  },
];

export function FeatureHighlights() {
  return (
    <section className="mt-12 space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          The Interface
        </p>
        <h2 className="text-3xl font-semibold text-(--text-primary)">
          Designed for trust, explainability, and real economic gravity.
        </h2>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <GlassCard
            key={highlight.title}
            padding="lg"
            className="flex h-full flex-col gap-5"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-(--text-primary)">
                {highlight.title}
              </h3>
              <p className="text-sm text-(--text-secondary)">
                {highlight.description}
              </p>
            </div>
            <ul className="mt-auto space-y-2 text-sm text-(--text-secondary)">
              {highlight.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-1 h-2 w-2 rounded-full bg-[linear-gradient(135deg,var(--prosperity-primary),var(--trust-primary))]"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
