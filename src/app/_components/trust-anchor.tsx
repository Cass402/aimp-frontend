"use client";

import { useEffect, useRef, useState } from "react";
import { ExplainTooltip } from "./explain-tooltip";
import { Provenance } from "./provenance";
import { cn } from "@/lib/utils";

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
    icon: "🛡️",
    color: "text-(--prosperity-primary)",
    bgGradient: "from-prosperity-primary/5 to-prosperity-primary/0",
  },
  governance: {
    icon: "👥",
    color: "text-(--intelligence-primary)",
    bgGradient: "from-intelligence-primary/5 to-intelligence-primary/0",
  },
  transparency: {
    icon: "🔍",
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
  const [isExpanded, setIsExpanded] = useState(false);
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
        "group relative cursor-pointer transition-all duration-200 ease-neural",
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Category gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          config.bgGradient,
          "rounded-3xl"
        )}
      />

      {/* Content */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm" role="img" aria-hidden="true">
              {config.icon}
            </span>
            <h3
              className={cn(
                "text-sm font-semibold transition-colors duration-200",
                "text-(--text-primary) group-hover:" + config.color
              )}
            >
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <ExplainTooltip
              content={explanation}
              confidence={confidence}
              provenanceHash={provenanceHash}
            />
            <Provenance
              hash={provenanceHash}
              type="data"
              className="opacity-60 group-hover:opacity-100"
            />
          </div>
        </div>

        <p className="text-xs text-(--text-secondary) leading-relaxed">
          {detail}
        </p>

        {/* Confidence indicator */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-(--glass-surface-primary) rounded-full overflow-hidden">
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
              "text-xs font-semibold",
              confidence >= 95 ? config.color : "text-(--text-secondary)"
            )}
          >
            {confidence}%
          </span>
        </div>

        {/* Expandable metrics */}
        {isExpanded && (
          <div
            className={cn(
              "mt-4 pt-4 border-t border-(--glass-border-soft)",
              "animate-in slide-in-from-top-2 duration-200"
            )}
          >
            <div className="grid gap-2">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-(--text-tertiary) capitalize">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </span>
                  <span className="font-semibold text-(--text-primary)">
                    {typeof value === "string" ? value : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expansion indicator */}
      <div
        className={cn(
          "absolute bottom-2 right-2 transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={cn("transition-colors duration-200", config.color)}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
