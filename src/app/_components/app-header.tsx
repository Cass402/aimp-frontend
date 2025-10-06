import Link from "next/link";
import { StatusPill } from "./status-pill";
import { cn } from "@/lib/utils";

const navItems: Array<{ href: string; label: string }> = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/assets/solar", label: "Assets" },
  { href: "/invest", label: "Invest" },
  { href: "/agents", label: "Meet the Agents" },
];

export function AppHeader() {
  return (
    <header className="glass-panel glass-panel-elevated sticky top-4 z-40 mx-auto mt-6 w-[min(1180px,100%)] rounded-[26px] px-6 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Return to landing"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-(--glass-border-highlight) bg-(--glass-surface-primary) text-lg font-semibold text-current shadow-[0_12px_26px_rgba(4,8,18,0.28)]">
              ⚡️
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.45em] text-(--text-tertiary)">
                AIMP
              </span>
              <span className="text-lg font-semibold text-(--text-primary)">
                Own the Sun. Trust the Machine.
              </span>
            </div>
          </Link>
        </div>
        <nav className="flex flex-wrap items-center gap-2 md:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-(--text-secondary) transition hover:text-(--text-primary) focus-visible:u-focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden flex-col gap-1 text-right text-[0.7rem] uppercase tracking-[0.24em] text-(--text-secondary) sm:flex">
            <span>Safety Posture</span>
            <span className="text-(--text-primary)">
              Verified by AI Constraints
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill tone="positive" label="Safety" detail="Normal" />
            <StatusPill tone="info" label="Oracle" detail="Healthy" />
            <StatusPill tone="neutral" label="AI Authority" detail="Enabled" />
          </div>
          <Link
            href="/connect"
            className={cn(
              "ml-2 inline-flex items-center gap-2 rounded-full border border-(--glass-border-highlight) bg-(--glass-surface-primary) px-4 py-2 text-sm font-semibold text-(--text-primary) shadow-[0px_18px_32px_rgba(2,8,20,0.28)] transition",
              "hover:shadow-[0px_22px_40px_rgba(2,8,20,0.35)] focus-visible:u-focus-ring"
            )}
          >
            <span className="h-2 w-2 rounded-full bg-(--prosperity-primary) shadow-[0_0_16px_rgba(50,184,198,0.55)]" />
            Connect Wallet
          </Link>
        </div>
      </div>
    </header>
  );
}
