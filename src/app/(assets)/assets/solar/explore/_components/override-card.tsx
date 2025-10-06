import { GlassCard } from "@/components/ui/glass-card";

export function OverrideCard() {
  return (
    <GlassCard
      padding="lg"
      className="space-y-4"
      variant="elevated"
      trustLevel="high"
      aiState="alert"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
            Emergency override
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            Human veto in &lt;200&nbsp;ms
          </h3>
        </div>
        <span
          className="h-3 w-3 rounded-full bg-(--critical-primary) shadow-[0_0_18px_rgba(var(--color-red-400-rgb),0.7)]"
          aria-hidden
        />
      </div>
      <p className="text-sm text-(--text-secondary)">
        Triggering pause halts dispatch, logs proof hash, and emits
        tamper-evident record. Resume requires multi-sig and AI constraint
        check.
      </p>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full border border-(--glass-border-strong) bg-[rgba(var(--color-red-400-rgb),0.12)] px-6 py-3 text-sm font-semibold text-(--critical-primary) shadow-[0_18px_34px_rgba(var(--color-red-500-rgb),0.24)] transition hover:bg-[rgba(var(--color-red-400-rgb),0.18)] focus-visible:u-focus-ring"
      >
        Initiate emergency stop
      </button>
      <p className="text-xs text-(--text-muted)">
        Last invoked 2 days ago • Tx hash 0x91…ac • Audit trail synced
      </p>
    </GlassCard>
  );
}
