import { GlassCard } from "@/components/ui/glass-card";
import { Container } from "@/components/ui/layout";

export default function PrivacyPage() {
  return (
    <Container size="xl" className="py-6 lg:py-8">
      <div className="space-y-6 pb-16">
        <GlassCard
          padding="lg"
          variant="trust"
          trustLevel="high"
          enableMotion={false}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
            Privacy notice
          </p>
          <h1 className="text-3xl font-semibold text-(--text-primary)">
            Transparent telemetry, user-first data guardrails
          </h1>
          <p className="text-sm text-(--text-secondary)">
            This placeholder will detail how mock telemetry, wallet addresses,
            and explainability logs are handled in demo mode. Production wiring
            will include Supabase storage policies and on-chain receipt
            references.
          </p>
        </GlassCard>
      </div>
    </Container>
  );
}
