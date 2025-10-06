"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  assets: "Assets",
  solar: "Solar Farm",
  explore: "Digital Twin",
  invest: "Invest",
  agents: "AI Agents",
  explainability: "Explainability",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  connect: "Connect Wallet",
};

export function Breadcrumb() {
  const pathname = usePathname();

  // Don't show on home page
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Don't show if only one segment
  if (segments.length < 2) return null;

  const breadcrumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const label =
      routeLabels[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;

    return { path, label, isLast };
  });

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors duration-150"
      >
        🏠
      </Link>
      {breadcrumbs.map((crumb) => (
        <div key={crumb.path} className="flex items-center gap-2">
          <span className="text-(--text-tertiary)">›</span>
          {crumb.isLast ? (
            <span className="text-(--text-primary) font-medium">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.path}
              className={cn(
                "text-(--text-secondary) hover:text-(--text-primary)",
                "transition-colors duration-150"
              )}
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
