/**
 * Hardware Health Monitoring Component
 *
 * Displays health status for solar farm hardware components
 * with predictive maintenance indicators.
 */

import { generateMockHardwareHealth } from "@/lib/mock";
import { GlassCard } from "@/components/ui/glass-card";
import { HealthDot } from "@/components/primitives/HealthDot";

export async function HardwareHealthSection() {
  const health = generateMockHardwareHealth();

  return (
    <GlassCard
      padding="lg"
      variant="trust"
      trustLevel="high"
      aiState="processing"
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-(--text-primary)">
        Hardware Health
      </h2>

      <div className="space-y-3">
        {health.map((item) => (
          <div
            key={item.component}
            className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <HealthDot health={item.health} size="md" autoPulse />
                <span className="text-base font-semibold text-(--text-primary)">
                  {item.component}
                </span>
              </div>
              <span className="text-xl font-mono font-semibold text-(--text-primary)">
                {item.health}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-(--text-tertiary)">Last: </span>
                <span className="text-(--text-secondary)">
                  {new Date(item.lastMaintenance).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-(--text-tertiary)">Next: </span>
                <span className="text-(--text-secondary)">
                  {new Date(item.nextMaintenance).toLocaleDateString()}
                </span>
              </div>
            </div>

            {item.issues.length > 0 && (
              <div className="mt-3 pt-3 border-t border-(--glass-border-soft) text-sm text-(--status-warning)">
                <span className="font-semibold">Issues:</span>{" "}
                {item.issues.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
