"use client";

import { cn } from "@/lib/utils";
import { Lightning, Lock, Balance, Chart } from "@/components/ui/icons";

interface ProvenanceProps {
  hash: string;
  type: "protocol" | "system" | "legal" | "data";
  label?: string;
  className?: string;
  onClick?: () => void;
}

const typeConfig = {
  protocol: {
    icon: Lightning,
    color: "text-(--intelligence-primary)",
    bgColor: "bg-(--intelligence-primary)/10",
    label: "Protocol",
  },
  system: {
    icon: Lock,
    color: "text-(--trust-primary)",
    bgColor: "bg-(--trust-primary)/10",
    label: "System",
  },
  legal: {
    icon: Balance,
    color: "text-(--text-secondary)",
    bgColor: "bg-(--glass-surface-primary)",
    label: "Legal",
  },
  data: {
    icon: Chart,
    color: "text-(--prosperity-primary)",
    bgColor: "bg-(--prosperity-primary)/10",
    label: "Data",
  },
};

export function Provenance({
  hash,
  type,
  label,
  className,
  onClick,
}: ProvenanceProps) {
  const config = typeConfig[type];
  const displayLabel = label || config.label;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default action: copy hash to clipboard
      navigator.clipboard.writeText(hash);
      // In a real app, you'd show a toast notification
      console.log(`Copied ${displayLabel} hash: ${hash}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1",
        "text-xs font-medium transition-all duration-200",
        "hover:scale-105 focus-visible:u-focus-ring",
        config.bgColor,
        config.color,
        "border border-current/20 hover:border-current/40",
        className
      )}
      title={`${displayLabel} provenance hash: ${hash}\nClick to copy`}
      aria-label={`${displayLabel} provenance hash`}
    >
      <config.icon size={10} aria-hidden="true" />
      <span className="font-mono text-[10px] tracking-tight">{hash}</span>
    </button>
  );
}
