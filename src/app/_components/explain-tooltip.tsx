"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExplainTooltipProps {
  content: string;
  confidence?: number;
  lastUpdated?: string;
  provenanceHash?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ExplainTooltip({
  content,
  confidence,
  lastUpdated,
  provenanceHash,
  className,
  children,
}: ExplainTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-flex", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex h-4 w-4 items-center justify-center rounded-full",
          "bg-(--intelligence-primary)/20 text-(--intelligence-primary)",
          "hover:bg-(--intelligence-primary)/30 transition-all duration-200",
          "text-xs font-medium focus-visible:u-focus-ring"
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-label="Explain this information"
      >
        {children || "?"}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50",
            "w-80 p-4 rounded-2xl backdrop-blur-heavy",
            "bg-(--glass-surface-modal) border border-(--glass-border-highlight)",
            "shadow-[0_20px_40px_rgba(0,0,0,0.3)] animate-in fade-in-0 zoom-in-95 duration-200"
          )}
        >
          <div className="space-y-3">
            <p className="text-sm text-(--text-primary) leading-relaxed">
              {content}
            </p>

            {(confidence || lastUpdated || provenanceHash) && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-(--glass-border-soft)">
                {confidence && (
                  <div className="space-y-1">
                    <div className="text-xs text-(--text-tertiary)">
                      Confidence
                    </div>
                    <div className="text-sm font-semibold text-(--prosperity-primary)">
                      {confidence}%
                    </div>
                  </div>
                )}

                {lastUpdated && (
                  <div className="space-y-1">
                    <div className="text-xs text-(--text-tertiary)">
                      Updated
                    </div>
                    <div className="text-sm font-semibold text-(--text-primary)">
                      {lastUpdated}
                    </div>
                  </div>
                )}

                {provenanceHash && (
                  <div className="col-span-2 space-y-1">
                    <div className="text-xs text-(--text-tertiary)">
                      Proof Hash
                    </div>
                    <div className="text-xs font-mono text-(--intelligence-primary)">
                      {provenanceHash}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tooltip arrow */}
          <div
            className={cn(
              "absolute top-full left-1/2 -translate-x-1/2",
              "border-4 border-transparent border-t-(--glass-surface-modal)"
            )}
          />
        </div>
      )}
    </div>
  );
}
