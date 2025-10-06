import { GlassCard } from "@/components/ui/glass-card";

export default function TermsPage() {
  return (
    <div className="space-y-6 pb-16">
      <GlassCard padding="lg" className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Terms preview
        </p>
        <h1 className="text-3xl font-semibold text-(--text-primary)">
          Principles for autonomous asset interaction
        </h1>
        <p className="text-sm text-(--text-secondary)">
          Draft terms will codify safety guardrails, override expectations, and
          on-chain transparency commitments. This page reserves space for the
          legal copy referenced in the PRD.
        </p>
      </GlassCard>
    </div>
  );
}
