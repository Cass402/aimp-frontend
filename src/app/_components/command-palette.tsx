"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Chart,
  Lightning,
  Search,
  Plug,
  Users,
  Alert,
} from "@/components/ui/icons";

interface CommandAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
  category: "navigation" | "actions" | "emergency";
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: CommandAction[] = [
    {
      id: "nav-dashboard",
      label: "Go to Dashboard",
      icon: Chart,
      action: () => router.push("/dashboard"),
      keywords: ["dashboard", "home", "overview"],
      category: "navigation",
    },
    {
      id: "nav-assets",
      label: "View Assets",
      icon: Lightning,
      action: () => router.push("/assets/solar"),
      keywords: ["assets", "solar", "energy"],
      category: "navigation",
    },
    {
      id: "nav-invest",
      label: "Invest in Infrastructure",
      icon: Chart,
      action: () => router.push("/invest"),
      keywords: ["invest", "buy", "purchase"],
      category: "navigation",
    },
    {
      id: "nav-agents",
      label: "Meet the Agents",
      icon: Users,
      action: () => router.push("/agents"),
      keywords: ["agents", "ai", "team"],
      category: "navigation",
    },
    {
      id: "nav-explore",
      label: "Explore Digital Twin",
      icon: Search,
      action: () => router.push("/assets/solar/explore"),
      keywords: ["explore", "twin", "diagram"],
      category: "navigation",
    },
    {
      id: "action-connect",
      label: "Connect Wallet",
      icon: Plug,
      action: () => {
        // Trigger wallet connect
        const connectBtn = document.querySelector('[aria-label*="Connect"]');
        (connectBtn as HTMLButtonElement)?.click();
      },
      keywords: ["wallet", "connect", "phantom"],
      category: "actions",
    },
    {
      id: "emergency-pause",
      label: "Emergency Pause",
      icon: Alert,
      action: () => {
        const emergencyBtn = document.querySelector(
          '[aria-label*="Emergency"]'
        );
        (emergencyBtn as HTMLButtonElement)?.click();
      },
      keywords: ["emergency", "pause", "stop", "override"],
      category: "emergency",
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(searchLower) ||
      cmd.keywords?.some((kw) => kw.includes(searchLower))
    );
  });

  // Reset selection when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
          onClose();
          setSearch("");
        }
      } else if (e.key === "Escape") {
        onClose();
        setSearch("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="fixed inset-x-0 top-[20vh] z-[201] flex justify-center px-4">
        <div
          className={cn(
            "w-full max-w-2xl glass-panel glass-panel-elevated rounded-2xl",
            "shadow-[0_24px_64px_rgba(0,0,0,0.5)]",
            "animate-in zoom-in-95 slide-in-from-top-4 duration-200"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          {/* Search Input */}
          <div className="border-b border-(--glass-border-primary) p-4">
            <div className="flex items-center gap-3">
              <Lightning className="w-6 h-6" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  "flex-1 bg-transparent border-none outline-none",
                  "text-base text-(--text-primary) placeholder:text-(--text-tertiary)"
                )}
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-(--glass-surface-primary) text-xs text-(--text-tertiary) font-mono">
                ESC
              </kbd>
            </div>
          </div>

          {/* Commands List */}
          <div className="max-h-96 overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-12 text-center text-(--text-tertiary)">
                No commands found
              </div>
            ) : (
              <div className="space-y-1">
                {["navigation", "actions", "emergency"].map((category) => {
                  const categoryCommands = filteredCommands.filter(
                    (cmd) => cmd.category === category
                  );
                  if (categoryCommands.length === 0) return null;

                  return (
                    <div key={category}>
                      <div className="px-3 py-2 text-xs uppercase tracking-wider text-(--text-tertiary)">
                        {category}
                      </div>
                      {categoryCommands.map((cmd) => {
                        const globalIndex = filteredCommands.indexOf(cmd);
                        const isSelected = globalIndex === selectedIndex;

                        return (
                          <Button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              onClose();
                              setSearch("");
                            }}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start gap-3 h-auto px-3 py-2.5",
                              isSelected
                                ? "bg-(--glass-surface-primary) text-(--text-primary) shadow-sm"
                                : "text-(--text-secondary) hover:bg-(--glass-surface-primary)/50",
                              cmd.category === "emergency" &&
                                "text-critical-primary hover:bg-critical-background/20"
                            )}
                          >
                            <cmd.icon className="w-5 h-5" />
                            <span className="flex-1 font-medium text-left">
                              {cmd.label}
                            </span>
                            {isSelected && (
                              <kbd className="hidden sm:inline-flex px-2 py-1 rounded bg-(--glass-surface-primary) text-xs text-(--text-tertiary) font-mono">
                                ↵
                              </kbd>
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-(--glass-border-primary) px-4 py-3">
            <div className="flex items-center justify-between text-xs text-(--text-tertiary)">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-(--glass-surface-primary) font-mono">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-(--glass-surface-primary) font-mono">
                    ↵
                  </kbd>
                  <span>Execute</span>
                </div>
              </div>
              <span>⌘K to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
