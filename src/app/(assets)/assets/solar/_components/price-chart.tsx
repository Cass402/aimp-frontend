import { GlassCard } from "@/components/ui/glass-card";
import type { PricePoint } from "@/lib/types";

interface PriceChartProps {
  priceHistory: PricePoint[];
}

function toPath(points: PricePoint[]) {
  if (!points.length) {
    return "";
  }
  const values = points.map((point) => point.p);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const coords = points
    .map((point, index) => {
      const x = (index / (points.length - 1 || 1)) * 100;
      const y = 100 - ((point.p - min) / range) * 100;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return coords;
}

export function PriceChart({ priceHistory }: PriceChartProps) {
  const path = toPath(priceHistory);
  const latest = priceHistory.at(-1);

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="optimizing"
      trustLevel="medium"
      className="space-y-5"
    >
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
            Price history (24h)
          </p>
          <h3 className="text-2xl font-semibold text-(--text-primary)">
            ${latest?.p.toFixed(2) ?? "—"}
          </h3>
        </div>
        <span className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-2 text-xs uppercase tracking-[0.24em] text-(--text-secondary)">
          Oracle coverage Pyth + Switchboard
        </span>
      </header>
      <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-6">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-56 w-full"
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--trust-primary)"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="rgba(var(--color-teal-500-rgb),0)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="var(--trust-primary)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            points={path}
          />
          <polyline
            fill="url(#priceGradient)"
            stroke="none"
            points={`0,100 ${path} 100,100`}
          />
        </svg>
      </div>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
        <span>
          Last updated{" "}
          {latest
            ? new Date(latest.t).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </span>
        <span>Data cache revalidates every hour</span>
      </div>
    </GlassCard>
  );
}
