"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DropdownPortal } from "./dropdown-portal";
import { Lightning, Search, Question } from "../../components/ui/icons";

interface QuickActionsMenuProps {
  onOpenCommandPaletteAction: () => void;
  notificationCount?: number;
}

export function QuickActionsMenu({
  onOpenCommandPaletteAction,
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
      icon: Lightning,
      label: "Command Palette",
      shortcut: "⌘K",
      action: () => {
        onOpenCommandPaletteAction();
        setIsOpen(false);
      },
    },
    {
      id: "search",
      icon: Search,
      label: "Search Assets",
      shortcut: "⌘S",
      action: () => {
        // Future: Open search
        setIsOpen(false);
      },
    },
    {
      id: "help",
      icon: Question,
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
      {/* Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center p-2 rounded-md text-(color:--text-secondary)",
          "hover:text-(color:--text-primary) hover:bg-(color:--glass-surface-primary)",
          "transition-colors duration-200 focus:outline-none focus:ring-2",
          "focus:ring-(color:--trust-primary) focus:ring-offset-2",
          isOpen &&
            "bg-(color:--glass-surface-primary) text-(color:--text-primary)"
        )}
        aria-label="Quick actions"
      >
        <Lightning size={18} />
        {notificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-(color:--trust-primary)" />
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
              className="w-full flex items-center justify-start space-x-3 p-3 text-sm text-(color:--text-secondary) hover:text-(color:--text-primary) hover:bg-(color:--glass-surface-primary) rounded-md transition-colors duration-200"
            >
              <action.icon size={16} />
              <span className="flex-1 text-left">{action.label}</span>
              {action.shortcut && (
                <kbd className="px-1.5 py-0.5 rounded bg-(color:--glass-surface-primary) text-xs text-(color:--text-tertiary) font-mono">
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
