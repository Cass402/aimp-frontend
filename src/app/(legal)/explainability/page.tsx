import { GlassCard } from "@/components/ui/glass-card";

export default function ExplainabilityPage() {
  return (
    <div className="space-y-6 pb-16">
      <GlassCard
        padding="lg"
        variant="trust"
        trustLevel="high"
        enableMotion={false}
        className="space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Explainability charter
        </p>
        <h1 className="text-3xl font-semibold text-(--text-primary)">
          Proof-backed narratives for every AI action
        </h1>
        <p className="text-sm text-(--text-secondary)">
          The charter will document persona roles, zk proof expectations,
          constraint libraries, and escalation paths. It ensures the UI remains
          auditable and aligned with the PRD philosophy.
        </p>
      </GlassCard>
    </div>
  );
}
