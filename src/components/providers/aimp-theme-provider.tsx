"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface AIMPThemeConfig {
  mode: "dark" | "light" | "auto";
  trustLevel: number; // 0-100, affects UI intensity
  aiActivity: "idle" | "active" | "learning" | "optimizing";
  performanceMode: "low" | "medium" | "high";
  motionEnabled: boolean;
  glassEffectsEnabled: boolean;
}

interface AIMPThemeContextType {
  config: AIMPThemeConfig;
  updateConfig: (updates: Partial<AIMPThemeConfig>) => void;
  cssVariables: Record<string, string>;
}

const defaultConfig: AIMPThemeConfig = {
  mode: "dark",
  trustLevel: 85,
  aiActivity: "idle",
  performanceMode: "high",
  motionEnabled: true,
  glassEffectsEnabled: true,
};

const AIMPThemeContext = createContext<AIMPThemeContextType | null>(null);

export function AIMPThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AIMPThemeConfig>(defaultConfig);
  const prefersReducedMotion = useReducedMotion();

  const cssVariables = useMemo(() => {
    const trustIntensity = (config.trustLevel / 100).toFixed(2);
    const aiIntensity = config.aiActivity === "idle" ? "0.30" : "1";

    return {
      "--aimp-trust-intensity": trustIntensity,
      "--aimp-ai-intensity": aiIntensity,
      "--aimp-motion-enabled": config.motionEnabled ? "1" : "0",
      "--aimp-glass-enabled": config.glassEffectsEnabled ? "1" : "0",
      "--aimp-performance-mode": config.performanceMode,
    } satisfies Record<string, string>;
  }, [config]);

  useEffect(() => {
    if (!config.motionEnabled && !config.glassEffectsEnabled) {
      return;
    }

    if (prefersReducedMotion) {
      setConfig((prev) => ({ ...prev, motionEnabled: false }));
    }
  }, [prefersReducedMotion, config.motionEnabled, config.glassEffectsEnabled]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;

    if (config.mode === "dark") {
      root.setAttribute("data-color-scheme", "dark");
    } else if (config.mode === "light") {
      root.setAttribute("data-color-scheme", "light");
    } else {
      root.removeAttribute("data-color-scheme");
    }

    root.setAttribute("data-theme", "aimp-dark");

    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      Object.keys(cssVariables).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [config.mode, cssVariables]);

  const updateConfig = (updates: Partial<AIMPThemeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AIMPThemeContext.Provider value={{ config, updateConfig, cssVariables }}>
      <div className="min-h-screen" data-theme="aimp-dark">
        {children}
      </div>
    </AIMPThemeContext.Provider>
  );
}

export function useAIMPTheme() {
  const context = useContext(AIMPThemeContext);

  if (!context) {
    throw new Error("useAIMPTheme must be used within AIMPThemeProvider");
  }

  return context;
}
