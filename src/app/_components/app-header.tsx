"use client";

import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import { StatusPill } from "./status-pill";
import { ExplainTooltip } from "./explain-tooltip";
import { EmergencyOverride } from "./emergency-override";
import { Provenance } from "./provenance";
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
  const [walletState, setWalletState] = useState<WalletConnectionState>({
    isConnecting: false,
  });
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

  return (
    <header
      ref={headerRef}
      className={cn(
        "glass-panel glass-panel-elevated sticky top-4 z-40 mx-auto mt-6 w-[min(1180px,100%)] rounded-[26px] px-6 py-4",
        "transition-all duration-300 ease-neural",
        isEmergencyMode &&
          "border-critical-primary/30 bg-critical-background/10 shadow-[0_0_24px_rgba(192,21,47,0.15)]"
      )}
      role="banner"
      aria-label="AIMP Navigation and Status"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Brand Identity with Trust Signals */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 group transition-all duration-200 ease-neural",
              "hover:scale-[1.02] focus-visible:u-focus-ring"
            )}
            aria-label="Return to AIMP landing page"
          >
            <span
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                "border border-(--glass-border-highlight) bg-(--glass-surface-primary)",
                "text-lg font-semibold text-current shadow-[0_12px_26px_rgba(4,8,18,0.28)]",
                "transition-all duration-200 ease-neural",
                "group-hover:shadow-[0_16px_32px_rgba(4,8,18,0.35)] group-hover:border-(--trust-primary)/50",
                "relative overflow-hidden"
              )}
            >
              <span className="relative z-10">⚡️</span>
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br from-prosperity-primary/10 to-intelligence-primary/5",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}
              />
            </span>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold uppercase tracking-[0.45em] text-(--text-tertiary)">
                  AIMP
                </span>
                <Provenance
                  hash="0xa1b2c3..."
                  type="protocol"
                  className="opacity-60 group-hover:opacity-100"
                />
              </div>
              <span className="text-lg font-semibold text-(--text-primary) leading-tight">
                Own the Sun. Trust the Machine.
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation with Progressive Enhancement */}
        <nav
          className="flex flex-wrap items-center gap-2 md:gap-4"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-neural",
                "text-(--text-secondary) hover:text-(--text-primary)",
                "hover:bg-(--glass-surface-primary)/50 hover:backdrop-blur-sm",
                "focus-visible:u-focus-ring relative overflow-hidden",
                item.priority === "high" && "font-semibold"
              )}
              {...(item.priority === "high" && { "data-priority": "high" })}
            >
              <span className="relative z-10">{item.label}</span>
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-trust-primary/5 to-prosperity-primary/5",
                  "opacity-0 hover:opacity-100 transition-opacity duration-200"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Trust Dashboard with Explainability */}
        <div className="flex items-center gap-3">
          {/* Safety Posture Display */}
          <div className="hidden flex-col gap-1 text-right text-[0.7rem] uppercase tracking-[0.24em] text-(--text-secondary) sm:flex">
            <div className="flex items-center gap-1">
              <span>Safety Posture</span>
              <ExplainTooltip
                content="AI operations are constrained by cryptographic authority with human oversight and emergency controls."
                confidence={98}
                lastUpdated="2s ago"
              />
            </div>
            <span
              className={cn(
                "text-(--text-primary) transition-colors duration-200",
                isEmergencyMode && "text-critical-primary"
              )}
            >
              {isEmergencyMode
                ? "Emergency Paused"
                : "Verified by AI Constraints"}
            </span>
          </div>

          {/* Trust Metrics Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {trustMetrics.map((metric) => (
              <StatusPill
                key={metric.id}
                tone={
                  isEmergencyMode && metric.id === "safety"
                    ? "critical"
                    : metric.tone
                }
                label={metric.label}
                detail={
                  isEmergencyMode && metric.id === "safety"
                    ? "Paused"
                    : metric.detail
                }
                explanation={metric.explanation}
                confidence={metric.confidence}
                lastUpdated={metric.lastUpdated}
                provenanceHash={metric.provenanceHash}
                className={cn(
                  "transition-all duration-300 ease-neural",
                  metric.id === "safety" && isEmergencyMode && "animate-pulse"
                )}
              />
            ))}
          </div>

          {/* Emergency Override */}
          <EmergencyOverride
            isActive={isEmergencyMode}
            onToggle={handleEmergencyOverride}
            className="ml-2"
          />

          {/* Wallet Connection with Trust Indicators */}
          <div className="flex items-center gap-2">
            {walletState.address ? (
              <div className="flex items-center gap-2 text-xs text-(--text-secondary)">
                <div className="flex flex-col text-right">
                  <span className="font-mono">{walletState.address}</span>
                  <span className="text-(--prosperity-primary)">
                    {walletState.balance} SOL
                  </span>
                </div>
                <div
                  className={cn(
                    "h-2 w-2 rounded-full bg-(--prosperity-primary)",
                    "shadow-[0_0_12px_rgba(50,184,198,0.6)] animate-pulse"
                  )}
                />
              </div>
            ) : (
              <button
                onClick={handleWalletConnect}
                disabled={walletState.isConnecting}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full transition-all duration-200 ease-neural",
                  "border border-(--glass-border-highlight) bg-(--glass-surface-primary)",
                  "px-4 py-2 text-sm font-semibold text-(--text-primary)",
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

                <span className="relative z-10">
                  {walletState.isConnecting
                    ? "Connecting..."
                    : "Connect Wallet"}
                </span>

                {walletState.isConnecting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-trust-primary/20 to-transparent animate-shimmer" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Alert Banner */}
      {isEmergencyMode && (
        <div
          className={cn(
            "mt-4 rounded-2xl border border-critical-primary/30 bg-critical-background/20 p-3",
            "backdrop-blur-sm animate-in slide-in-from-top-2 duration-300"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-critical-primary animate-pulse" />
              <span className="text-sm font-medium text-critical-primary">
                Emergency Override Active
              </span>
            </div>
            <div className="text-xs text-(--text-secondary)">
              All autonomous operations paused • Human oversight required
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
