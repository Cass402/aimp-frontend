"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { EmergencyOverride } from "./emergency-override";
import { WalletDropdown } from "./wallet-dropdown";
import { MobileMenuDrawer } from "./mobile-menu-drawer";
import { CommandPalette } from "./command-palette";
import { SystemStatusDropdown } from "./system-status-dropdown";
import { QuickActionsMenu } from "./quick-actions-menu";
import { cn } from "@/lib/utils";
import { Lightning, Menu } from "../../components/ui/icons";

const navItems: Array<{
  href: string;
  label: string;
  priority?: "high" | "medium" | "low";
}> = [
  { href: "/dashboard", label: "Dashboard", priority: "high" },
  { href: "/assets/solar", label: "Assets", priority: "high" },
  { href: "/invest", label: "Invest", priority: "medium" },
  { href: "/agents", label: "Meet the Agents", priority: "low" },
];

// Trust metrics with explainability
const trustMetrics = [
  {
    id: "safety",
    tone: "positive" as const,
    label: "Safety",
    detail: "Normal",
    explanation:
      "All AI constraints active. Maximum dispatch 2.5MW verified. Human override available <200ms.",
    lastUpdated: "2s ago",
    confidence: 98,
    provenanceHash: "0x7a2f8b...",
  },
  {
    id: "oracle",
    tone: "info" as const,
    label: "Oracle",
    detail: "Healthy",
    explanation:
      "Multi-source price feed active. Deviation guard: ±2.1%. Freshness: 12s average.",
    lastUpdated: "8s ago",
    confidence: 94,
    provenanceHash: "0x3e9d1c...",
  },
  {
    id: "ai-authority",
    tone: "neutral" as const,
    label: "AI Authority",
    detail: "Enabled",
    explanation:
      "Autonomous operations within constraints. 47 decisions executed safely today. Next review: 4h.",
    lastUpdated: "15s ago",
    confidence: 96,
    provenanceHash: "0x5c4a89...",
  },
];

interface WalletConnectionState {
  isConnecting: boolean;
  address?: string;
  network?: string;
  balance?: number;
}

export function AppHeader() {
  const pathname = usePathname();
  const [walletState, setWalletState] = useState<WalletConnectionState>({
    isConnecting: false,
  });
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [liveTrustMetrics, setLiveTrustMetrics] = useState(trustMetrics);
  const headerRef = useRef<HTMLElement>(null);

  // Keyboard navigation for menu items (Arrow Left/Right)
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      const nav = headerRef.current?.querySelector("nav");
      if (!nav) return;

      const links = Array.from(nav.querySelectorAll("a"));
      const currentIndex = links.findIndex(
        (link) => link === document.activeElement
      );

      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % links.length;
        links[nextIndex]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + links.length) % links.length;
        links[prevIndex]?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, []);

  // Command Palette shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleCommandPalette = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleCommandPalette);
    return () => window.removeEventListener("keydown", handleCommandPalette);
  }, []);

  // Simulated WebSocket for live trust metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTrustMetrics((prev) =>
        prev.map((metric) => {
          const randomChange = Math.random() > 0.7;
          if (!randomChange) return metric;

          return {
            ...metric,
            confidence: Math.min(
              99,
              Math.max(90, metric.confidence + (Math.random() - 0.5) * 3)
            ),
            lastUpdated: `${Math.floor(Math.random() * 30) + 1}s ago`,
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleWalletConnect = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true }));

    // Simulate wallet connection with optimistic UI
    try {
      // In real implementation, connect to Phantom/Solflare
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setWalletState({
        isConnecting: false,
        address: "7xKX...9mPq",
        network: "mainnet-beta",
        balance: 42.7,
      });
    } catch (error) {
      setWalletState({ isConnecting: false });
      console.error("Wallet connection failed:", error);
    }
  }, []);

  const handleEmergencyOverride = useCallback((action: "pause" | "resume") => {
    setIsEmergencyMode(action === "pause");
    // In real implementation, trigger blockchain pause transaction
    console.log(`Emergency ${action} triggered`);
  }, []);

  const handleWalletDisconnect = useCallback(() => {
    setWalletState({ isConnecting: false });
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-4 left-4 right-4 z-[9999]",
        "glass-panel glass-panel-elevated rounded-2xl px-6 py-3",
        "backdrop-blur-md shadow-lg border border-(color:--glass-border-soft)/40",
        "max-w-7xl mx-auto",
        "transition-all duration-300",
        isEmergencyMode &&
          "border-(color:--critical-primary)/50 bg-(color:--critical-background) shadow-(color:--critical-primary)/20"
      )}
      style={{
        position: "fixed",
        top: "16px",
        left: "16px",
        right: "16px",
        zIndex: 9999,
      }}
      role="banner"
      aria-label="AIMP Navigation"
    >
      <div className="flex h-10 items-center justify-between">
        {/* Left: Brand + Navigation */}
        <div className="flex items-center space-x-8">
          {/* Brand */}
          <Link
            href="/"
            className={cn(
              "flex items-center space-x-2 group",
              "hover:opacity-80 transition-opacity duration-200"
            )}
            aria-label="AIMP Home"
          >
            <Lightning className="w-6 h-6 text-(color:--trust-primary)" />
            <span className="text-xl font-bold text-(color:--text-primary)">
              AIMP
            </span>
          </Link>

          {/* Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            role="navigation"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                    isActive
                      ? "text-(color:--text-primary) bg-(color:--glass-surface-primary)"
                      : "text-(color:--text-secondary) hover:text-(color:--text-primary) hover:bg-(color:--glass-surface-primary)/50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Status + Actions */}
        <div className="flex items-center space-x-3">
          {/* AI Status Badge */}
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-(color:--glass-surface-primary) text-xs font-medium text-(color:--text-secondary)">
            <div className="w-2 h-2 rounded-full bg-(color:--intelligence-primary) animate-pulse"></div>
            <span>AI Active</span>
          </div>

          {/* System Health */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-(color:--glass-surface-primary) text-xs font-medium text-(color:--text-secondary)">
            <div className="w-2 h-2 rounded-full bg-(color:--trust-primary)"></div>
            <span>98% Safe</span>
          </div>

          {/* System Controls */}
          <div className="flex items-center space-x-2">
            <SystemStatusDropdown
              metrics={liveTrustMetrics}
              isEmergencyMode={isEmergencyMode}
            />

            <EmergencyOverride
              isActive={isEmergencyMode}
              onToggle={handleEmergencyOverride}
            />

            <QuickActionsMenu
              onOpenCommandPaletteAction={() => setIsCommandPaletteOpen(true)}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "md:hidden p-2 rounded-md text-(color:--text-secondary)",
              "hover:text-(color:--text-primary) hover:bg-(color:--glass-surface-primary)",
              "transition-colors duration-200"
            )}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Wallet Connection */}
          {walletState.address ? (
            <WalletDropdown
              address={walletState.address}
              balance={walletState.balance!}
              network={walletState.network!}
              onDisconnect={handleWalletDisconnect}
            />
          ) : walletState.isConnecting ? (
            <div className="flex items-center space-x-2 px-4 py-2 rounded-md bg-(color:--glass-surface-primary) text-sm">
              <div className="w-2 h-2 rounded-full bg-(color:--intelligence-primary) animate-pulse"></div>
              <span className="text-(color:--text-secondary)">
                Connecting...
              </span>
            </div>
          ) : (
            <button
              onClick={handleWalletConnect}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md",
                "bg-(color:--trust-primary) text-white",
                "hover:bg-(color:--trust-secondary) transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-(color:--trust-primary) focus:ring-offset-2"
              )}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </header>
  );
}
