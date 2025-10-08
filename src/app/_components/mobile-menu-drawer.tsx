"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Lightning, Bell } from "@/components/ui/icons";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{
    href: string;
    label: string;
    priority?: "high" | "medium" | "low";
  }>;
}

export function MobileMenuDrawer({
  isOpen,
  onClose,
  navItems,
}: MobileMenuDrawerProps) {
  const pathname = usePathname();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] z-[101]",
          "glass-panel glass-panel-elevated border-l border-(--glass-border-highlight)",
          "animate-in slide-in-from-right duration-300 ease-neural",
          "flex flex-col"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-(--glass-border-primary)">
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.45em] text-(--text-tertiary)">
              AIMP
            </span>
            <span className="text-lg font-semibold text-(--text-primary)">
              Navigation
            </span>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="Close menu"
          >
            <span className="text-2xl">✕</span>
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl",
                    "text-base font-medium transition-all duration-200",
                    "relative overflow-hidden group",
                    isActive
                      ? "text-(--text-primary) bg-(--glass-surface-primary) shadow-sm"
                      : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--glass-surface-primary)/50"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Priority indicator */}
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-200",
                      isActive
                        ? "bg-(--trust-primary) shadow-[0_0_12px_rgba(77,160,255,0.6)]"
                        : "bg-(--text-tertiary) opacity-40 group-hover:opacity-100"
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <span className="text-sm text-(--trust-primary)">●</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer Quick Actions */}
        <div className="border-t border-(--glass-border-primary) p-4">
          <div className="text-xs uppercase tracking-wider text-(--text-tertiary) mb-3">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto p-3"
            >
              <Lightning className="w-6 h-6" />
              <span className="text-xs">Command</span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center gap-1 h-auto p-3"
            >
              <Bell className="w-6 h-6" />
              <span className="text-xs">Alerts</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
