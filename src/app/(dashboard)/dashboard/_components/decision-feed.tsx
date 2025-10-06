import { GlassCard } from "@/components/ui/glass-card";
import type { Explanation } from "@/lib/types";

const personaCopy: Record<
  Explanation["persona"],
  { label: string; colorClass: string }
> = {
  operations: {
    label: "Operations Agent",
    colorClass: "text-(--trust-primary)",
  },
  maintenance: {
    label: "Maintenance Agent",
    colorClass: "text-(--caution-primary)",
  },
  markets: {
    label: "Energy Markets Agent",
    colorClass: "text-(--prosperity-primary)",
  },
};

interface DecisionFeedProps {
  explanations: Explanation[];
}

export function DecisionFeed({ explanations }: DecisionFeedProps) {
  return (
    <GlassCard padding="lg" className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Latest AI decisions
        </p>
        <h3 className="text-xl font-semibold text-(--text-primary)">
          Every action is paired with persona reasoning, constraints, and proof
          references.
        </h3>
      </header>
      <div className="space-y-5">
        {explanations.map((item) => {
          const persona = personaCopy[item.persona];
          return (
            <div
              key={item.id}
              className="grid gap-3 rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-5 py-4 shadow-[0_18px_32px_rgba(4,10,22,0.22)] md:grid-cols-[minmax(0,1fr)_auto] md:items-start"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.32em]">
                  <span className={`font-semibold ${persona.colorClass}`}>
                    {persona.label}
                  </span>
                  <span className="text-(--text-tertiary)">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-lg font-semibold text-(--text-primary)">
                  {item.title}
                </p>
                <p className="text-sm text-(--text-secondary)">
                  {item.summary}
                </p>
                <div className="grid gap-2 text-sm text-(--text-secondary) md:grid-cols-2">
                  <ul className="space-y-1">
                    {item.reasoning.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {item.constraints.map((constraint) => (
                      <li key={constraint} className="text-(--text-secondary)">
                        Constraint: {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 text-xs">
                {item.zkProofHash ? (
                  <span className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-3 py-1 font-medium text-(--text-secondary)">
                    Proof hash {item.zkProofHash}
                  </span>
                ) : null}
                <span className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-3 py-1 font-medium text-(--text-secondary)">
                  {item.inputs.length} inputs
                </span>
                <button
                  type="button"
                  className="rounded-full border border-(--glass-border-highlight) bg-(--glass-surface-primary) px-4 py-2 text-sm font-semibold text-(--text-primary) transition hover:shadow-[0_0_32px_rgba(33,128,141,0.2)] focus-visible:u-focus-ring"
                >
                  Explain decision
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
