import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";

export default function ConnectPage() {
  return (
    <div className="space-y-6 pb-16">
      <GlassCard
        padding="lg"
        variant="trust"
        trustLevel="high"
        className="space-y-4"
      >
        <StatusPill tone="info" label="Wallet" detail="Demo" />
        <h1 className="text-3xl font-semibold text-(--text-primary)">
          Connect your Solana wallet
        </h1>
        <p className="text-sm text-(--text-secondary)">
          Wallet wiring uses Solana wallet adapter packages specified in the
          PRD. Demo sessions preload mock holdings while production mode will
          request read-only authority and AI constraint attestations.
        </p>
        <p className="text-xs text-(--text-tertiary)">
          Coming soon: Phantom, Solflare, Ledger, Coinbase, Backpack.
        </p>
      </GlassCard>
    </div>
  );
}
