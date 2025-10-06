"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { StatusPill } from "./status-pill";
import { ExplainTooltip } from "./explain-tooltip";
import { DropdownPortal } from "./dropdown-portal";

interface TrustMetric {
  id: string;
  tone: "positive" | "info" | "neutral" | "critical";
  label: string;
  detail: string;
  explanation: string;
  lastUpdated: string;
  confidence: number;
  provenanceHash: string;
}

interface SystemStatusDropdownProps {
  metrics: TrustMetric[];
  isEmergencyMode: boolean;
}

export function SystemStatusDropdown({
  metrics,
  isEmergencyMode,
}: SystemStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const overallStatus = isEmergencyMode ? "critical" : "healthy";
  const statusColor = isEmergencyMode
    ? "text-critical-primary"
    : "text-prosperity-primary";
  const statusIcon = isEmergencyMode ? "🚨" : "✓";

  return (
    <>
      {/* Status Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200",
          "text-sm font-medium",
          "border border-(--glass-border-highlight) bg-(--glass-surface-primary)/50",
          "hover:bg-(--glass-surface-primary) hover:shadow-sm",
          "focus-visible:u-focus-ring",
          isOpen && "bg-(--glass-surface-primary) shadow-sm"
        )}
        aria-expanded={isOpen}
        aria-label="System status"
      >
        <span className="text-base">{statusIcon}</span>
        <span className={cn("hidden sm:inline", statusColor)}>
          {overallStatus === "critical" ? "Emergency" : "System OK"}
        </span>
      </button>

      {/* Dropdown via Portal */}
      <DropdownPortal isOpen={isOpen} triggerRef={buttonRef}>
        <div
          ref={dropdownRef}
          className={cn(
            "w-80 max-w-[90vw] glass-panel glass-panel-elevated rounded-2xl p-4",
            "animate-in slide-in-from-top-2 duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-(--glass-border-primary)">
            <div>
              <h3 className="font-semibold text-(--text-primary)">
                System Status
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-(--text-tertiary) uppercase tracking-wider">
                  Safety Posture
                </span>
                <ExplainTooltip
                  content="AI operations are constrained by cryptographic authority with human oversight and emergency controls."
                  confidence={98}
                  lastUpdated="2s ago"
                />
              </div>
            </div>
            <span className={cn("text-2xl", statusColor)}>{statusIcon}</span>
          </div>

          {/* Trust Metrics */}
          <div className="space-y-2">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="p-2 rounded-xl hover:bg-(--glass-surface-primary)/50 transition-colors"
              >
                <StatusPill
                  tone={
                    isEmergencyMode && metric.id === "safety"
                      ? "critical"
                      : metric.tone
                  }
                  label={metric.label}
                  detail={
                    isEmergencyMode && metric.id === "safety"
                      ? "Paused"
                      : metric.detail
                  }
                  explanation={metric.explanation}
                  confidence={metric.confidence}
                  lastUpdated={metric.lastUpdated}
                  provenanceHash={metric.provenanceHash}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-(--glass-border-primary)">
            <p className="text-xs text-(--text-tertiary)">
              {isEmergencyMode
                ? "All autonomous operations paused • Human oversight required"
                : "All systems operational • AI constraints active"}
            </p>
          </div>
        </div>
      </DropdownPortal>
    </>
  );
}
