/**
 * Enhanced Asset Header Component
 *
 * Shows asset metadata with real-time status and ownership information
 */

import { formatNumber } from "@/lib/format";
import { generateMockAssetMetadata } from "@/lib/mock";
import { GlassCard } from "@/components/ui/glass-card";
import { StatPill } from "@/components/primitives/StatPill";
import { HealthDot } from "@/components/primitives/HealthDot";
import { Breathing } from "@/components/primitives/Motion";

export async function EnhancedAssetHeader() {
  const asset = generateMockAssetMetadata();

  return (
    <GlassCard
      padding="lg"
      variant="trust"
      trustLevel="high"
      aiState="optimizing"
      className="space-y-6"
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Breathing rhythm="slow">
            <HealthDot
              health={asset.status === "operational" ? 95 : 70}
              size="lg"
              autoPulse
            />
          </Breathing>
          <div>
            <h1 className="text-3xl font-semibold text-(--text-primary)">
              {asset.name}
            </h1>
            <p className="text-sm text-(--text-tertiary)">{asset.location}</p>
          </div>
        </div>
        <StatPill
          label={asset.status.toUpperCase()}
          status={asset.status === "operational" ? "verified" : "warning"}
          size="md"
        />
      </div>

      {/* Asset Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-5 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-2">
            Capacity
          </p>
          <p className="text-2xl font-mono font-semibold text-(--text-primary)">
            {formatNumber(asset.capacity)} kW
          </p>
        </div>

        <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-5 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-2">
            Your Ownership
          </p>
          <p className="text-2xl font-mono font-semibold text-(--prosperity-primary)">
            {asset.ownershipPercentage}%
          </p>
        </div>

        <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-5 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-2">
            Token Supply
          </p>
          <p className="text-2xl font-mono font-semibold text-(--text-primary)">
            {formatNumber(asset.tokenSupply)}
          </p>
        </div>

        <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-5 py-4">
          <p className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary) mb-2">
            Installed
          </p>
          <p className="text-2xl font-mono font-semibold text-(--text-primary)">
            {new Date(asset.installDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
