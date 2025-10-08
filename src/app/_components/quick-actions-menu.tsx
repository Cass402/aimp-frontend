"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownPortal } from "./dropdown-portal";
import { Lightning, Search, Question } from "@/components/ui/icons";

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
      icon: Lightning,
      label: "Command Palette",
      shortcut: "⌘K",
      action: () => {
        onOpenCommandPalette();
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
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="icon"
        className={cn(
          "relative p-2 h-auto w-auto",
          isOpen && "bg-(--glass-surface-primary) text-(--text-primary)"
        )}
        aria-label="Quick actions"
      >
        <Lightning size={18} />
        {notificationCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-trust-primary" />
        )}
      </Button>

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
            <Button
              key={action.id}
              onClick={action.action}
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3 text-sm"
            >
              <action.icon size={16} />
              <span className="flex-1 text-left">{action.label}</span>
              {action.shortcut && (
                <kbd className="px-1.5 py-0.5 rounded bg-(--glass-surface-primary) text-xs text-(--text-tertiary) font-mono">
                  {action.shortcut}
                </kbd>
              )}
            </Button>
          ))}
        </div>
      </DropdownPortal>
    </>
  );
}
