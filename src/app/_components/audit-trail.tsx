import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuditTrailProps {
  totalDecisions: string;
  humanOverrides: string;
  lastAudit: string;
  className?: string;
}

export function AuditTrail({
  totalDecisions,
  humanOverrides,
  lastAudit,
  className,
}: AuditTrailProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-(--text-primary)">
          System Audit Trail
        </h3>
        <Link
          href="/audit"
          className={cn(
            "text-xs text-(--intelligence-primary) hover:text-(--intelligence-secondary)",
            "underline underline-offset-2 transition-colors duration-200"
          )}
        >
          View Full Report
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <div className="text-xs text-(--text-tertiary)">Total Decisions</div>
          <div className="text-lg font-bold text-(--prosperity-primary)">
            {totalDecisions}
          </div>
          <div className="text-xs text-(--text-secondary)">
            All logged on-chain
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-(--text-tertiary)">Human Overrides</div>
          <div className="text-lg font-bold text-(--text-primary)">
            {humanOverrides}
          </div>
          <div className="text-xs text-(--text-secondary)">Last 30 days</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-(--text-tertiary)">Last Audit</div>
          <div className="text-lg font-bold text-(--prosperity-primary)">
            Passed
          </div>
          <div className="text-xs text-(--text-secondary)">{lastAudit}</div>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-2 p-3 rounded-xl",
          "bg-(--glass-surface-primary)/50 border border-(--glass-border-soft)"
        )}
      >
        <div className="h-2 w-2 rounded-full bg-(--prosperity-primary) animate-pulse" />
        <span className="text-xs text-(--text-secondary)">
          Real-time audit logging active • Next scheduled audit: Dec 15, 2024
        </span>
      </div>
    </div>
  );
}
