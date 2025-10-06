"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { EmergencyOverride } from "./emergency-override";
import { Provenance } from "./provenance";
import { WalletDropdown } from "./wallet-dropdown";
import { MobileMenuDrawer } from "./mobile-menu-drawer";
import { CommandPalette } from "./command-palette";
import { SystemStatusDropdown } from "./system-status-dropdown";
import { QuickActionsMenu } from "./quick-actions-menu";
import { cn } from "@/lib/utils";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [liveTrustMetrics, setLiveTrustMetrics] = useState(trustMetrics);
  const headerRef = useRef<HTMLElement>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Scroll detection for header shrink effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        "glass-panel glass-panel-elevated z-40 mx-auto max-w-7xl",
        "mt-3 sm:mt-4",
        "rounded-xl sm:rounded-2xl",
        "px-3 sm:px-4 md:px-6 lg:px-8",
        // Dynamic padding based on scroll (much more compact)
        isScrolled && !prefersReducedMotion
          ? "py-2 shadow-[0_20px_50px_rgba(2,8,20,0.45)]"
          : "py-2.5 sm:py-3",
        "transition-all duration-300 ease-neural",
        "overflow-visible", // Allow dropdowns to extend beyond header
        isEmergencyMode &&
          "border-critical-primary/30 bg-critical-background/10 shadow-[0_0_24px_rgba(192,21,47,0.15)]"
      )}
      role="banner"
      aria-label="AIMP Navigation and Status"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 relative">
        {/* Brand Identity - Compact */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 group transition-all duration-200 ease-neural",
            "hover:opacity-80 focus-visible:u-focus-ring rounded-lg"
          )}
          aria-label="AIMP - Return to home"
        >
          <span className="text-xl">⚡</span>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-(--text-primary)">
              AIMP
            </span>
            <Provenance
              hash="0xa1b2c3..."
              type="protocol"
              className="opacity-60 group-hover:opacity-100"
            />
          </div>
        </Link>

        {/* Navigation - Compact */}
        <nav
          className="hidden md:flex items-center gap-1"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ease-neural",
                  "relative overflow-hidden",
                  "focus-visible:u-focus-ring",
                  // Active state styling
                  isActive
                    ? "text-(--text-primary) bg-(--glass-surface-primary) shadow-sm"
                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--glass-surface-primary)/50"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-trust-primary/10 to-prosperity-primary/10" />
                )}
                {/* Hover effect */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-trust-primary/5 to-prosperity-primary/5",
                    "opacity-0 hover:opacity-100 transition-opacity duration-200"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions - Compact */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* System Status Dropdown */}
          <SystemStatusDropdown
            metrics={liveTrustMetrics}
            isEmergencyMode={isEmergencyMode}
          />

          {/* Emergency Override - Icon Only */}
          <EmergencyOverride
            isActive={isEmergencyMode}
            onToggle={handleEmergencyOverride}
          />

          {/* Quick Actions Menu */}
          <QuickActionsMenu
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-all duration-200",
              "text-(--text-secondary) hover:text-(--text-primary)",
              "hover:bg-(--glass-surface-primary) focus-visible:u-focus-ring"
            )}
            aria-label="Open mobile menu"
          >
            <span className="text-lg">☰</span>
          </button>

          {/* Wallet Connection with Trust Indicators */}
          <div className="flex items-center gap-2">
            {walletState.address ? (
              <WalletDropdown
                address={walletState.address}
                balance={walletState.balance!}
                network={walletState.network!}
                onDisconnect={handleWalletDisconnect}
              />
            ) : walletState.isConnecting ? (
              // Enhanced loading skeleton with shimmer
              <div className="flex items-center gap-2 px-3 py-2 sm:px-4 md:px-5 lg:px-6">
                <div className="relative h-2 w-2 rounded-full bg-(--intelligence-primary)/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-4 w-24 rounded bg-(--glass-surface-primary)/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            ) : (
              <button
                onClick={handleWalletConnect}
                disabled={walletState.isConnecting}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full transition-all duration-200 ease-neural",
                  "border border-(--glass-border-highlight) bg-(--glass-surface-primary)",
                  "px-3 py-2 sm:px-4 md:px-5 lg:px-6 text-sm font-semibold text-(--text-primary)",
                  "shadow-[0px_18px_32px_rgba(2,8,20,0.28)]",
                  "hover:shadow-[0px_22px_40px_rgba(2,8,20,0.35)] hover:scale-[1.02]",
                  "focus-visible:u-focus-ring disabled:opacity-60 disabled:cursor-not-allowed",
                  "relative overflow-hidden group"
                )}
                aria-label={
                  walletState.isConnecting
                    ? "Connecting wallet..."
                    : "Connect Solana wallet"
                }
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-prosperity-primary/10 to-trust-primary/10",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  )}
                />

                <span
                  className={cn(
                    "relative z-10 h-2 w-2 rounded-full transition-all duration-200",
                    walletState.isConnecting
                      ? "bg-(--intelligence-primary) animate-pulse"
                      : "bg-(--prosperity-primary) shadow-[0_0_16px_rgba(50,184,198,0.55)]"
                  )}
                />

                <span className="relative z-10">Connect Wallet</span>
              </button>
            )}
          </div>
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
