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
        // Dynamic padding based on scroll — shadow from globals.css
        isScrolled && !prefersReducedMotion
          ? "py-2 shadow-(--shadow-neural-floating)"
          : "py-2.5 sm:py-3",
        "transition-all duration-(--duration-slow)",
        "overflow-visible", // Allow dropdowns to extend beyond header
        isEmergencyMode &&
          "border-(color:--critical-primary)/30 bg-(color:--critical-background) shadow-(--glow-neural-primary)"
      )}
      role="banner"
      aria-label="AIMP Navigation and Status"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 relative">
        {/* Brand Identity — Enhanced with floating animation */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 group transition-all duration-(--duration-normal)",
              "hover:opacity-80 focus-visible:u-focus-ring rounded-lg"
            )}
            aria-label="AIMP - Return to home"
          >
            <span
              className={cn(
                "text-xl",
                !prefersReducedMotion && "animate-neural-float"
              )}
            >
              ⚡
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-(length:--size-sm) font-bold uppercase tracking-[0.3em] text-(color:--text-primary)">
                AIMP
              </span>
              <Provenance
                hash="0xa1b2c3..."
                type="protocol"
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-(--duration-normal)"
              />
            </div>
          </Link>

          {/* AI Activity Indicator — shows system is actively managing */}
          <div
            className={cn(
              "hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full",
              "ai-status-active text-(length:--size-xs) font-medium"
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(color:--intelligence-primary) opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-(color:--intelligence-primary)"></span>
            </span>
            <span className="hidden xl:inline">AI Active</span>
          </div>

          {/* Visual separator */}
          <div className="hidden md:block h-6 w-px bg-(color:--glass-border-soft)" />
        </div>

        {/* Navigation — Enhanced with hover transforms */}
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
                  "rounded-full px-3 py-1.5 text-(length:--size-xs) sm:text-(length:--size-sm) font-medium transition-all duration-(--duration-normal)",
                  "relative overflow-hidden",
                  "focus-visible:u-focus-ring",
                  // Enhanced hover with subtle lift (respects reduced-motion)
                  !prefersReducedMotion && "hover:-translate-y-0.5",
                  // Active state styling from globals.css tokens
                  isActive
                    ? "text-(color:--text-primary) bg-(color:--glass-surface-primary) shadow-(--shadow-neural-soft)"
                    : "text-(color:--text-secondary) hover:text-(color:--text-primary) hover:bg-(color:--glass-surface-primary)/50"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Active indicator — using CSS variable colors */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-(color:--trust-primary)/10 to-(color:--prosperity-primary)/10" />
                )}
                {/* Hover effect — using CSS variable colors and duration */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-(color:--trust-primary)/5 to-(color:--prosperity-primary)/5",
                    "opacity-0 hover:opacity-100 transition-opacity duration-(--duration-normal)"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Trust Badge Indicator — visible trust metric */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Visual separator */}
          <div className="h-6 w-px bg-(color:--glass-border-soft)" />

          <div
            className={cn(
              "trust-metric trust-metric--success",
              !prefersReducedMotion && "animate-trust-pulse"
            )}
          >
            <span className="text-(length:--size-xs) font-medium">
              98% Safe
            </span>
          </div>
        </div>

        {/* Actions — Enhanced with visual separation */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Visual separator */}
          <div className="hidden xl:block h-6 w-px bg-(color:--glass-border-soft) mr-1" />
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
              "md:hidden p-2 rounded-lg transition-all duration-(--duration-normal)",
              "text-(color:--text-secondary) hover:text-(color:--text-primary)",
              "hover:bg-(color:--glass-surface-primary) focus-visible:u-focus-ring"
            )}
            aria-label="Open mobile menu"
          >
            <span className="text-(length:--size-lg)">☰</span>
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
              // Enhanced loading skeleton with shimmer — using CSS variable tokens
              <div className="flex items-center gap-2 px-3 py-2 sm:px-4 md:px-5 lg:px-6">
                <div className="relative h-2 w-2 rounded-full bg-(color:--intelligence-primary)/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-4 w-24 rounded bg-(color:--glass-surface-primary)/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            ) : (
              <button
                onClick={handleWalletConnect}
                disabled={walletState.isConnecting}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full transition-all duration-(--duration-normal)",
                  "border border-(color:--glass-border-highlight) bg-(color:--glass-surface-primary)",
                  "px-3 py-2 sm:px-4 md:px-5 lg:px-6 text-(length:--size-sm) font-semibold text-(color:--text-primary)",
                  "shadow-(--shadow-neural-strong)",
                  // Enhanced glow on hover with multiple layers
                  "hover:shadow-(--glow-trust-primary) hover:scale-[1.02]",
                  !prefersReducedMotion && "hover:-translate-y-0.5",
                  "focus-visible:u-focus-ring disabled:opacity-60 disabled:cursor-not-allowed",
                  "relative overflow-hidden group"
                )}
                aria-label={
                  walletState.isConnecting
                    ? "Connecting wallet..."
                    : "Connect Solana wallet"
                }
              >
                {/* Base gradient layer */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-(color:--prosperity-primary)/10 to-(color:--trust-primary)/10",
                    "opacity-0 group-hover:opacity-100 transition-opacity duration-(--duration-slow)"
                  )}
                />

                {/* Enhanced glow layer on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-(color:--prosperity-primary)/5 to-(color:--trust-primary)/5",
                    "opacity-0 group-hover:opacity-100 blur-xl transition-all duration-(--duration-slow)"
                  )}
                />

                <span
                  className={cn(
                    "relative z-10 h-2 w-2 rounded-full transition-all duration-(--duration-normal)",
                    walletState.isConnecting
                      ? "bg-(color:--intelligence-primary) animate-pulse"
                      : "bg-(color:--prosperity-primary) shadow-(--glow-prosperity-primary) group-hover:scale-110"
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
