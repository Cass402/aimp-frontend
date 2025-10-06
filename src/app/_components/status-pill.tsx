import { ExplainTooltip } from "./explain-tooltip";
import { Provenance } from "./provenance";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  tone: "positive" | "info" | "neutral" | "caution" | "critical";
  label: string;
  detail: string;
  explanation?: string;
  confidence?: number;
  lastUpdated?: string;
  provenanceHash?: string;
  className?: string;
}

const toneConfig = {
  positive: {
    bg: "bg-(--prosperity-primary)/15",
    border: "border-(--prosperity-primary)/30",
    text: "text-(--prosperity-primary)",
    glow: "shadow-[0_0_16px_rgba(50,184,198,0.2)]",
  },
  info: {
    bg: "bg-(--intelligence-primary)/15",
    border: "border-(--intelligence-primary)/30",
    text: "text-(--intelligence-primary)",
    glow: "shadow-[0_0_16px_rgba(41,150,161,0.2)]",
  },
  neutral: {
    bg: "bg-(--glass-surface-primary)",
    border: "border-(--glass-border-soft)",
    text: "text-(--text-primary)",
    glow: "shadow-[0_0_12px_rgba(0,0,0,0.1)]",
  },
  caution: {
    bg: "bg-(--caution-primary)/15",
    border: "border-(--caution-primary)/30",
    text: "text-(--caution-primary)",
    glow: "shadow-[0_0_16px_rgba(230,129,97,0.2)]",
  },
  critical: {
    bg: "bg-(--critical-primary)/15",
    border: "border-(--critical-primary)/30",
    text: "text-(--critical-primary)",
    glow: "shadow-[0_0_16px_rgba(192,21,47,0.2)]",
  },
};

export function StatusPill({
  tone,
  label,
  detail,
  explanation,
  confidence,
  lastUpdated,
  provenanceHash,
  className,
}: StatusPillProps) {
  const config = toneConfig[tone];
  const hasExplainability =
    explanation || confidence || lastUpdated || provenanceHash;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
        "text-xs font-semibold transition-all duration-200 ease-neural",
        "hover:scale-105 group relative",
        config.bg,
        config.border,
        config.text,
        config.glow,
        "border backdrop-blur-sm",
        className
      )}
    >
      {/* Status indicator dot */}
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-all duration-200",
          tone === "critical" ? "animate-pulse" : "",
          config.text.replace("text-", "bg-")
        )}
      />

      {/* Label and detail */}
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <span className="text-(--text-secondary)">•</span>
        <span className="font-medium">{detail}</span>
      </div>

      {/* Explainability and provenance */}
      {hasExplainability && (
        <div className="flex items-center gap-1 ml-1">
          {(explanation || confidence || lastUpdated) && (
            <ExplainTooltip
              content={explanation || `${label} status: ${detail}`}
              confidence={confidence}
              lastUpdated={lastUpdated}
              provenanceHash={provenanceHash}
            />
          )}

          {provenanceHash && (
            <Provenance
              hash={provenanceHash}
              type="data"
              className="opacity-60 group-hover:opacity-100"
            />
          )}
        </div>
      )}

      {/* Confidence indicator (subtle background bar) */}
      {confidence && (
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
          <div
            className={cn(
              "h-full bg-gradient-to-r transition-all duration-500",
              config.text.replace("text-", "from-"),
              config.text.replace("text-", "to-") + "/50"
            )}
            style={{ width: `${confidence}%` }}
          />
        </div>
      )}
    </div>
  );
}
