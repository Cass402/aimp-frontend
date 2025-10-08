"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Provenance } from "./provenance";
import { DropdownPortal } from "./dropdown-portal";
import { Clipboard, Check, Search, Plug } from "@/components/ui/icons";

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
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className={cn(
          "h-auto p-2 gap-2 text-xs font-mono",
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
      </Button>

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
            <Button
              onClick={handleCopyAddress}
              variant="ghost"
              className="w-full justify-start gap-3 h-auto px-3 py-2 text-sm"
            >
              <Clipboard size={16} />
              <span className="flex-1 text-left">
                {copied ? "Copied!" : "Copy Address"}
              </span>
              {copied && (
                <Check size={12} className="text-(--prosperity-primary)" />
              )}
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full justify-start gap-3 h-auto px-3 py-2 text-sm"
            >
              <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                <Search size={16} />
                <span className="flex-1 text-left">View on Solscan</span>
                <span className="text-xs">↗</span>
              </a>
            </Button>

            <Button
              onClick={() => {
                onDisconnect();
                setIsOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start gap-3 h-auto px-3 py-2 text-sm text-critical-primary hover:text-critical-primary hover:bg-critical-background/20"
            >
              <Plug size={16} />
              <span className="flex-1 text-left">Disconnect</span>
            </Button>
          </div>
        </div>
      </DropdownPortal>
    </>
  );
}
