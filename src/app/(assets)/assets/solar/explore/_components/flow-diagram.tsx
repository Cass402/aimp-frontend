"use client";

import type { MouseEvent } from "react";

import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";

interface FlowDiagramProps {
  generationMw: number;
  toGridMw: number;
  toBatteryMw: number;
  status: "normal" | "alert";
  onExplainGrid?: () => void;
  onExplainBattery?: () => void;
}

export function FlowDiagram({
  generationMw,
  toGridMw,
  toBatteryMw,
  status,
  onExplainGrid,
  onExplainBattery,
}: FlowDiagramProps) {
  const statusTone = status === "alert" ? "critical" : "positive";

  const handleExplain =
    (handler?: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handler?.();
    };

  return (
    <GlassCard
      padding="lg"
      className="space-y-6"
      variant="elevated"
      trustLevel="high"
      aiState="optimizing"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
            Digital twin overview
          </p>
          <h2 className="text-2xl font-semibold text-(--text-primary)">
            Flowing {generationMw.toFixed(1)} MW through autonomous dispatch
          </h2>
        </div>
        <StatusPill
          tone={statusTone}
          label="Safety"
          detail={status === "alert" ? "Alert" : "Normal"}
        />
      </div>
      <div className="relative rounded-[32px] border border-(--glass-border-strong) bg-(--glass-surface-elevated) p-8 text-sm text-(--text-primary)">
        <svg viewBox="0 0 320 220" className="h-[220px] w-full">
          <defs>
            <linearGradient id="flowGreen" x1="0" y1="0" x2="1" y2="0">
              <stop
                offset="0%"
                stopColor="var(--prosperity-primary)"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="var(--prosperity-primary)"
                stopOpacity="0.85"
              />
            </linearGradient>
            <linearGradient id="flowBlue" x1="0" y1="0" x2="1" y2="0">
              <stop
                offset="0%"
                stopColor="var(--trust-primary)"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="var(--trust-primary)"
                stopOpacity="0.85"
              />
            </linearGradient>
          </defs>
          <circle
            cx="160"
            cy="110"
            r="48"
            fill="rgba(var(--color-slate-900-rgb),0.78)"
            stroke="rgba(var(--color-gray-300-rgb),0.16)"
            strokeWidth="1"
          />
          <text
            x="160"
            y="105"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="14"
            fontWeight="600"
          >
            Solar Core
          </text>
          <text
            x="160"
            y="125"
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="12"
          >
            {generationMw.toFixed(1)} MW
          </text>
          <path
            d="M208 110 C240 110 240 60 290 60"
            stroke="url(#flowGreen)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M112 110 C80 110 80 160 30 160"
            stroke="url(#flowBlue)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx="290"
            cy="60"
            r="24"
            fill="rgba(var(--color-teal-500-rgb),0.22)"
            stroke="rgba(var(--color-teal-500-rgb),0.38)"
            strokeWidth="1"
          />
          <circle
            cx="30"
            cy="160"
            r="24"
            fill="rgba(var(--color-teal-300-rgb),0.18)"
            stroke="rgba(var(--color-teal-300-rgb),0.35)"
            strokeWidth="1"
          />
          <text
            x="290"
            y="55"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="12"
            fontWeight="600"
          >
            Grid
          </text>
          <text
            x="290"
            y="73"
            textAnchor="middle"
            fill="var(--prosperity-primary)"
            fontSize="11"
          >
            {toGridMw.toFixed(1)} MW
          </text>
          <text
            x="30"
            y="155"
            textAnchor="middle"
            fill="var(--text-primary)"
            fontSize="12"
            fontWeight="600"
          >
            Battery
          </text>
          <text
            x="30"
            y="173"
            textAnchor="middle"
            fill="var(--trust-primary)"
            fontSize="11"
          >
            {toBatteryMw.toFixed(1)} MW
          </text>
        </svg>
        <div className="absolute inset-x-8 bottom-6 flex flex-wrap items-center justify-between gap-3 text-xs text-(--text-secondary)">
          <button
            type="button"
            onClick={handleExplain(onExplainGrid)}
            className="rounded-full border border-(--glass-border-highlight) bg-[rgba(var(--color-teal-500-rgb),0.12)] px-4 py-2 font-semibold text-(--trust-primary) transition hover:bg-[rgba(var(--color-teal-500-rgb),0.18)] focus-visible:u-focus-ring"
          >
            Explain grid sale
          </button>
          <button
            type="button"
            onClick={handleExplain(onExplainBattery)}
            className="rounded-full border border-(--glass-border-highlight) bg-[rgba(var(--color-teal-300-rgb),0.12)] px-4 py-2 font-semibold text-(--prosperity-primary) transition hover:bg-[rgba(var(--color-teal-300-rgb),0.18)] focus-visible:u-focus-ring-prosperity"
          >
            Explain battery plan
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
