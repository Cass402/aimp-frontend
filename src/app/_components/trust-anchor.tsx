"use client";

import { useEffect, useRef } from "react";
import { ExplainTooltip } from "./explain-tooltip";
import { Provenance } from "./provenance";
import { cn } from "@/lib/utils";
import { Shield, Users, Search } from "@/components/ui/icons";

type TrustMetricPrimitive = string | number | boolean | null | undefined | Date;
type TrustMetricValue = TrustMetricPrimitive | readonly TrustMetricPrimitive[];

interface TrustAnchorProps {
  id: string;
  title: string;
  detail: string;
  explanation: string;
  metrics: Record<string, TrustMetricValue>;
  provenanceHash: string;
  confidence: number;
  category: "safety" | "governance" | "transparency";
  className?: string;
}

const categoryConfig = {
  safety: {
    icon: Shield,
    color: "text-(--prosperity-primary)",
    bgGradient: "from-prosperity-primary/5 to-prosperity-primary/0",
  },
  governance: {
    icon: Users,
    color: "text-(--intelligence-primary)",
    bgGradient: "from-intelligence-primary/5 to-intelligence-primary/0",
  },
  transparency: {
    icon: Search,
    color: "text-(--trust-primary)",
    bgGradient: "from-trust-primary/5 to-trust-primary/0",
  },
};

export function TrustAnchor({
  id,
  title,
  detail,
  explanation,
  metrics,
  provenanceHash,
  confidence,
  category,
  className,
}: TrustAnchorProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const config = categoryConfig[category];

  useEffect(() => {
    if (!progressBarRef.current) return;
    const clampedConfidence = Math.max(0, Math.min(confidence, 100));
    progressBarRef.current.style.width = `${clampedConfidence}%`;
  }, [confidence]);

  return (
    <div
      id={id}
      className={cn(
        "group relative transition-all duration-200 ease-neural",
        "rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary)",
        "p-4 hover:border-(--glass-border-strong) hover:bg-(--glass-surface-elevated)",
        "overflow-hidden", // Prevent content bleeding
        className
      )}
    >
      {/* Category gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          config.bgGradient
        )}
      />

      {/* Content */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <config.icon
              size={14}
              aria-hidden="true"
              className="flex-shrink-0"
            />
            <h3
              className={cn(
                "text-sm font-semibold transition-colors duration-200 truncate",
                "text-(--text-primary) group-hover:" + config.color
              )}
            >
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <ExplainTooltip
              content={explanation}
              confidence={confidence}
              provenanceHash={provenanceHash}
            />
          </div>
        </div>

        <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2">
          {detail}
        </p>

        {/* Confidence indicator */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-(--glass-surface-secondary) rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className={cn(
                "h-full w-0 bg-gradient-to-r transition-all duration-500 ease-neural",
                confidence >= 95
                  ? "from-prosperity-primary to-prosperity-secondary"
                  : confidence >= 80
                    ? "from-caution-primary to-caution-secondary"
                    : "from-critical-primary to-critical-secondary"
              )}
              aria-hidden="true"
            />
          </div>
          <span
            className={cn(
              "text-xs font-semibold flex-shrink-0",
              confidence >= 95 ? config.color : "text-(--text-secondary)"
            )}
          >
            {confidence}%
          </span>
        </div>

        {/* Provenance hash - positioned at bottom */}
        <div className="flex items-center justify-start">
          <Provenance
            hash={provenanceHash}
            type="data"
            className="opacity-60 group-hover:opacity-100 text-xs"
          />
        </div>

        {/* Always visible metrics */}
        <div
          className={cn(
            "mt-4 pt-4 border-t border-(--glass-border-soft)",
            "max-h-48 overflow-y-auto" // Prevent excessive height
          )}
        >
          <div className="grid gap-2">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs gap-2">
                <span className="text-(--text-tertiary) capitalize truncate">
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                </span>
                <span className="font-semibold text-(--text-primary) flex-shrink-0 text-right">
                  {typeof value === "string" ? value : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
