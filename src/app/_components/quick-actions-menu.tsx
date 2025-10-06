"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DropdownPortal } from "./dropdown-portal";

interface QuickActionsMenuProps {
  onOpenCommandPalette: () => void;
  notificationCount?: number;
}

export function QuickActionsMenu({
  onOpenCommandPalette,
  notificationCount = 0,
}: QuickActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const actions = [
    {
      id: "command",
      icon: "⚡",
      label: "Command Palette",
      shortcut: "⌘K",
      action: () => {
        onOpenCommandPalette();
        setIsOpen(false);
      },
    },
    {
      id: "search",
      icon: "🔍",
      label: "Search Assets",
      shortcut: "⌘S",
      action: () => {
        // Future: Open search
        setIsOpen(false);
      },
    },
    {
      id: "help",
      icon: "❓",
      label: "Help & Docs",
      action: () => {
        window.open("/explainability", "_blank");
        setIsOpen(false);
      },
    },
  ];

  return (
    <>
      {/* Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-lg transition-all duration-200",
          "text-(--text-secondary) hover:text-(--text-primary)",
          "hover:bg-(--glass-surface-primary) focus-visible:u-focus-ring",
          isOpen && "bg-(--glass-surface-primary) text-(--text-primary)"
        )}
        aria-label="Quick actions"
      >
        <span className="text-lg">⚡</span>
        {notificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-trust-primary" />
        )}
      </button>

      {/* Dropdown via Portal */}
      <DropdownPortal isOpen={isOpen} triggerRef={buttonRef}>
        <div
          ref={menuRef}
          className={cn(
            "w-56 glass-panel glass-panel-elevated rounded-xl p-2",
            "animate-in slide-in-from-top-2 duration-200"
          )}
        >
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg",
                "text-sm text-(--text-secondary) hover:text-(--text-primary)",
                "hover:bg-(--glass-surface-primary) transition-all duration-150",
                "focus-visible:u-focus-ring text-left"
              )}
            >
              <span className="text-base">{action.icon}</span>
              <span className="flex-1">{action.label}</span>
              {action.shortcut && (
                <kbd className="px-1.5 py-0.5 rounded bg-(--glass-surface-primary) text-xs text-(--text-tertiary) font-mono">
                  {action.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>
      </DropdownPortal>
    </>
  );
}
