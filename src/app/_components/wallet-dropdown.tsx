"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Provenance } from "./provenance";
import { DropdownPortal } from "./dropdown-portal";

interface WalletDropdownProps {
  address: string;
  balance: number;
  network: string;
  onDisconnect: () => void;
}

export function WalletDropdown({
  address,
  balance,
  network,
  onDisconnect,
}: WalletDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullAddress = "7xKXp9mPqRb3fN8Y2vH5tL6wQ1dJ4sK9mPqRb3fN8";
  const explorerUrl = `https://solscan.io/account/${fullAddress}?cluster=${network}`;

  return (
    <>
      {/* Wallet Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 text-xs text-(--text-secondary) transition-all duration-200",
          "hover:text-(--text-primary) focus-visible:u-focus-ring rounded-lg px-2 py-1",
          isOpen && "text-(--text-primary)"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex flex-col text-right">
          <span className="font-mono">{address}</span>
          <span className="text-(--prosperity-primary)">{balance} SOL</span>
        </div>
        <div className="h-2 w-2 rounded-full bg-(--prosperity-primary) shadow-[0_0_12px_rgba(50,184,198,0.6)] animate-pulse" />
      </button>

      {/* Dropdown Menu via Portal */}
      <DropdownPortal isOpen={isOpen} triggerRef={buttonRef}>
        <div
          ref={dropdownRef}
          className={cn(
            "w-72 glass-panel glass-panel-elevated rounded-2xl p-3",
            "animate-in slide-in-from-top-2 duration-200"
          )}
        >
          {/* Wallet Info */}
          <div className="border-b border-(--glass-border-primary) pb-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-(--text-tertiary)">
                Connected Wallet
              </span>
              <Provenance hash={address.slice(0, 10)} type="data" />
            </div>
            <div className="font-mono text-sm text-(--text-primary) break-all mb-2">
              {fullAddress}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-(--prosperity-primary)">
                {balance} SOL
              </span>
              <span className="text-xs text-(--text-tertiary) uppercase tracking-wider">
                {network}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-1">
            <button
              onClick={handleCopyAddress}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl",
                "text-sm text-(--text-secondary) hover:text-(--text-primary)",
                "hover:bg-(--glass-surface-primary) transition-all duration-200",
                "focus-visible:u-focus-ring"
              )}
            >
              <span className="text-lg">📋</span>
              <span className="flex-1 text-left">
                {copied ? "Copied!" : "Copy Address"}
              </span>
              {copied && (
                <span className="text-xs text-(--prosperity-primary)">✓</span>
              )}
            </button>

            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl",
                "text-sm text-(--text-secondary) hover:text-(--text-primary)",
                "hover:bg-(--glass-surface-primary) transition-all duration-200",
                "focus-visible:u-focus-ring"
              )}
            >
              <span className="text-lg">🔍</span>
              <span className="flex-1 text-left">View on Solscan</span>
              <span className="text-xs">↗</span>
            </a>

            <button
              onClick={() => {
                onDisconnect();
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl",
                "text-sm text-critical-primary hover:text-critical-primary",
                "hover:bg-critical-background/20 transition-all duration-200",
                "focus-visible:u-focus-ring"
              )}
            >
              <span className="text-lg">🔌</span>
              <span className="flex-1 text-left">Disconnect</span>
            </button>
          </div>
        </div>
      </DropdownPortal>
    </>
  );
}
