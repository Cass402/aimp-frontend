import Link from "next/link";

const trustCues = [
  {
    title: "Constraints Active",
    detail: "Max dispatch 2.5MW • Proof hash logged",
  },
  {
    title: "Human Override",
    detail: "Emergency stop reachable in <200ms",
  },
  {
    title: "Audit Trail",
    detail: "On-chain receipts + telemetry snapshots",
  },
];

export function AppFooter() {
  return (
    <footer className="mx-auto w-[min(1100px,100%)] pb-12 pt-10 text-sm text-(--text-secondary)">
      <div className="glass-panel glass-panel-elevated flex flex-col gap-8 rounded-[26px] px-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
            Trust Anchors
          </p>
          <h2 className="text-2xl font-semibold text-(--text-primary)">
            Every decision is constrained, explainable, and auditable.
          </h2>
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {trustCues.map((cue) => (
            <div
              key={cue.title}
              className="rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-4 text-left"
            >
              <p className="text-sm font-semibold text-(--text-primary)">
                {cue.title}
              </p>
              <p className="mt-1 text-xs text-(--text-secondary)">
                {cue.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 text-xs uppercase tracking-[0.32em] text-(--text-tertiary) md:flex-row md:items-center md:justify-between">
        <span>AIMP — Autonomous Infrastructure Interface</span>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="transition hover:text-(--text-primary)"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition hover:text-(--text-primary)"
          >
            Terms
          </Link>
          <Link
            href="/explainability"
            className="transition hover:text-(--text-primary)"
          >
            Explainability Charter
          </Link>
        </div>
      </div>
    </footer>
  );
}
