import { GlassCard } from "@/components/ui/glass-card";

export default function AgentsPage() {
  return (
    <div className="space-y-6 pb-16">
      <GlassCard
        padding="lg"
        variant="neural"
        aiState="learning"
        trustLevel="medium"
        className="space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          Agent personas
        </p>
        <h1 className="text-3xl font-semibold text-(--text-primary)">
          Meet the voices behind autonomous operations
        </h1>
        <p className="text-sm text-(--text-secondary)">
          Each AI persona mirrors an operational domain with explainable
          reasoning, constraint evidence, and tone tuned to the PRD. This page
          will host persona scripts and example decision narratives in a future
          milestone.
        </p>
      </GlassCard>
    </div>
  );
}
