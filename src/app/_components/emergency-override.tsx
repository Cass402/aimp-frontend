import { useState } from "react";
import { cn } from "@/lib/utils";

interface EmergencyOverrideProps {
  isActive: boolean;
  onToggle: (action: "pause" | "resume") => void;
  className?: string;
}

export function EmergencyOverride({
  isActive,
  onToggle,
  className,
}: EmergencyOverrideProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [lastAction, setLastAction] = useState<Date | null>(null);

  const handleClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      // Auto-cancel confirmation after 5 seconds
      setTimeout(() => setIsConfirming(false), 5000);
      return;
    }

    const action = isActive ? "resume" : "pause";
    onToggle(action);
    setIsConfirming(false);
    setLastAction(new Date());
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium",
          "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          isActive
            ? "text-(color:--caution-primary) hover:bg-(color:--caution-primary)/10 focus:ring-(color:--caution-primary)"
            : "text-(color:--critical-primary) hover:bg-(color:--critical-primary)/10 focus:ring-(color:--critical-primary)",
          isConfirming && "animate-pulse"
        )}
        aria-label={
          isActive ? "Resume AI operations" : "Emergency pause AI operations"
        }
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            isActive
              ? "bg-(color:--caution-primary)"
              : "bg-(color:--critical-primary)"
          )}
        />

        <span>
          {isConfirming
            ? isActive
              ? "Confirm Resume?"
              : "Confirm Pause?"
            : isActive
              ? "Resume"
              : "Pause"}
        </span>
      </button>

      {/* Confirmation overlay */}
      {isConfirming && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 z-50 w-64 p-4 rounded-2xl",
            "bg-(--glass-surface-modal) border border-(--glass-border-highlight)",
            "backdrop-blur-heavy shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
            "animate-in fade-in-0 slide-in-from-top-2 duration-200"
          )}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full animate-pulse",
                  isActive ? "bg-caution-primary" : "bg-critical-primary"
                )}
              />
              <h4 className="text-sm font-semibold text-(--text-primary)">
                {isActive ? "Resume Operations" : "Emergency Override"}
              </h4>
            </div>

            <p className="text-xs text-(--text-secondary) leading-relaxed">
              {isActive
                ? "This will restore autonomous AI operations within approved constraints."
                : "This will immediately pause all AI operations and require human approval to resume."}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleClick}
                className={cn(
                  "flex-1 rounded-lg px-3 py-2 text-xs font-semibold",
                  "transition-all duration-200",
                  isActive
                    ? "bg-caution-primary text-white hover:bg-caution-secondary"
                    : "bg-critical-primary text-white hover:bg-critical-secondary"
                )}
              >
                {isActive ? "Resume" : "Pause"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className={cn(
                  "flex-1 rounded-lg px-3 py-2 text-xs font-medium",
                  "bg-(--glass-surface-primary) text-(--text-secondary)",
                  "hover:bg-(--glass-surface-primary)/80 hover:text-(--text-primary)",
                  "transition-all duration-200"
                )}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Confirmation arrow */}
          <div
            className={cn(
              "absolute bottom-full left-6",
              "border-4 border-transparent border-b-(--glass-surface-modal)"
            )}
          />
        </div>
      )}

      {/* Last action timestamp */}
      {lastAction && !isConfirming && (
        <div className="absolute top-full left-0 mt-1 text-xs text-(--text-tertiary)">
          Last action: {lastAction.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
