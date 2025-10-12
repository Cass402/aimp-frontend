import { GlassCard } from "@/components/ui/glass-card";
import { generateMockPriceHistory } from "@/lib/mock";

type PricePoint = { p: number; t: string };

function toPath(points: PricePoint[], min: number, max: number) {
  if (!points.length) {
    return "";
  }
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

export async function PriceChart() {
  const priceHistory = generateMockPriceHistory();
  const latest = priceHistory.at(-1);
  const first = priceHistory.at(0);

  // Calculate price change
  const priceChange = latest && first ? latest.p - first.p : 0;
  const priceChangePercent = first ? (priceChange / first.p) * 100 : 0;
  const isPositive = priceChange >= 0;

  // Get min/max for chart scaling
  const values = priceHistory.map((point) => point.p);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const path = toPath(priceHistory, min, max);

  // Generate time labels (every 6 hours)
  const timeLabels = [0, 6, 12, 18, 24].map((hour) => ({
    x: (hour / 24) * 100,
    label: hour === 24 ? "Now" : `${hour % 12 || 12}${hour < 12 ? "AM" : "PM"}`,
  }));

  // Generate price labels (reversed for correct display order)
  const priceLabels = [max, (min + max) / 2, min].map((price, index) => ({
    y: index * 50,
    label: `$${price.toFixed(2)}`,
  }));

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="optimizing"
      trustLevel="medium"
      className="space-y-5"
    >
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
            Price history (24h)
          </p>
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl font-semibold text-(--text-primary)">
              ${latest?.p.toFixed(2) ?? "—"}
            </h3>
            <span
              className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}
            >
              {isPositive ? "+" : ""}
              {priceChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        <span className="rounded-full border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-2 text-xs uppercase tracking-[0.24em] text-(--text-secondary)">
          Oracle coverage Pyth + Switchboard
        </span>
      </header>
      <div className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-6 relative">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-56 w-full"
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                stopOpacity="0.15"
              />
              <stop
                offset="100%"
                stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          <line
            x1="0"
            y1="25"
            x2="100"
            y2="25"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.2"
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.2"
          />
          <line
            x1="0"
            y1="75"
            x2="100"
            y2="75"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.2"
          />

          {/* Area fill */}
          <polyline
            fill="url(#priceGradient)"
            stroke="none"
            points={`0,100 ${path} 100,100`}
          />

          {/* Price line */}
          <polyline
            fill="none"
            stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
            strokeWidth={0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            points={path}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Y-axis price labels */}
        <div className="absolute left-0 top-6 bottom-6 flex flex-col justify-between text-[10px] text-(--text-tertiary) pointer-events-none">
          {priceLabels.map((label, i) => (
            <span key={i} className="leading-none">
              {label.label}
            </span>
          ))}
        </div>

        {/* X-axis time labels */}
        <div className="absolute bottom-0 left-6 right-6 flex justify-between text-[10px] text-(--text-tertiary) mt-2">
          {timeLabels.slice(0, -1).map((label, i) => (
            <span key={i}>{label.label}</span>
          ))}
        </div>
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
