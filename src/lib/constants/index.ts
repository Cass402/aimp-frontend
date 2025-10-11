/**
 * AIMP Constants & Design Tokens
 *
 * Centralized design system values, configuration constants,
 * and semantic tokens for consistent UI behavior.
 *
 * Philosophy: Design tokens encode trust principles into reusable values.
 * Every constant represents a decision about how autonomy should feel.
 */

// ============================================================================
// DESIGN SYSTEM - Colors (matching Tailwind config)
// ============================================================================

export const COLORS = {
  // Agent persona accent colors (semantic naming for personality)
  agent: {
    operations: "#3B82F6", // Blue: Technical, calm
    markets: "#10B981", // Green: Growth, verified
    maintenance: "#F59E0B", // Amber: Attention, warmth
    governance: "#6B7280", // Gray: Neutral, authoritative
    neutral: "#8B5CF6", // Purple: No agent active, potential, ready
  },

  // Status Colors
  status: {
    verified: "#10B981", // Green - safe, healthy
    warning: "#F59E0B", // Amber - attention needed
    critical: "#EF4444", // Red - danger, boundary
  },

  // Glass System
  glass: {
    subtle: "rgba(255, 255, 255, 0.02)",
    light: "rgba(255, 255, 255, 0.06)",
    medium: "rgba(255, 255, 255, 0.12)",
    strong: "rgba(255, 255, 255, 0.18)",
  },
} as const;

// ============================================================================
// ANIMATION - Motion Timings (Physics of Calm)
// ============================================================================

export const MOTION = {
  // Duration (ms)
  duration: {
    instant: 0,
    micro: 100, // Micro-interactions
    fast: 200, // Quick feedback
    normal: 300, // Standard transitions
    relaxed: 500, // Calm, measured
    slow: 750, // Deliberate, important
    extraSlow: 1000, // Dramatic, rare
  },

  // Easing curves
  easing: {
    organic: "cubic-bezier(0.25, 0.1, 0.25, 1)", // Apple-grade
    glass: "cubic-bezier(0.4, 0, 0.2, 1)", // Material glass
    bounceSoft: "cubic-bezier(0.68, -0.55, 0.265, 1.55)", // Gentle bounce
    easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)", // Subtle back ease
  },

  // Breathing animation periods (ms)
  breath: {
    slow: 4000, // Calm system heartbeat
    medium: 2500, // Normal activity
    fast: 1500, // Active processing
  },
} as const;

// ============================================================================
// LAYOUT - Spacing & Sizing
// ============================================================================

export const LAYOUT = {
  // Container widths
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },

  // Glass layer spacing (px)
  glassDepth: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },

  // Component rhythm (px)
  rhythm: {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    "2xl": 64,
  },
} as const;

// ============================================================================
// PERFORMANCE - Perceptual Thresholds & Rhythms
// ============================================================================

export const PERFORMANCE = {
  // Target response thresholds aligned to human perception
  targets: {
    loadTime: 2000, // < 2s on 3G (PRD Section 4)
    timeToInteractive: 3000, // < 3s TTI
    animationFPS: 60, // Sustained 60fps
    instantPerception: 100, // ≤100ms feels instantaneous
    frameInterval: 16, // 60 fps rhythm (16ms/frame)
    perceptionJND: 13, // human visual JND (ms)
    stableRhythmVariance: 4, // ≤4ms frame jitter preserves fluency
    inputLatency: 100, // < 100ms response
    dataRefresh: 500, // < 500ms P95
  },

  // Trust refresh cycle for UI feedback pulses (ms)
  pulses: {
    confirmation: 1000, // 1s heartbeat for proof pulses
    interactionEcho: 200, // subtle echo after user action
  },

  // Data freshness thresholds (seconds)
  freshness: {
    critical: 10, // Alert if stale beyond this
    warning: 60, // Warning indicator
    stale: 300, // Consider stale
  },

  // Trust score thresholds (0-100)
  trust: {
    excellent: 90,
    good: 70,
    fair: 50,
    poor: 30,
  },
} as const;

// ============================================================================
// API - Adaptive Revalidation & Biofeedback Timing
// ============================================================================

export const API = {
  // Base URL (environment-aware)
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",

  // Temporal intervals (ms) respectful of attention cycles
  revalidate: {
    portfolio: 10, // Portfolio & prices (seconds for Next.js)
    telemetry: 1, // Energy metrics (seconds for Next.js)
    explanations: 0, // Real-time (no-store)
    proofs: 30, // Stale-while-revalidate (seconds)
    passive: 300000, // 5 min idle refresh aligns to breath cycle
    active: 10000, // 10s when user is interacting
    realtime: 1000, // 1s for live-critical data
  },

  // Timeouts tuned for calm realism (ms)
  timeout: {
    default: 8000, // 8s before fallback messaging
    critical: 3000, // 3s for high-stakes calls
    background: 30000, // 30s for background tasks
  },
} as const;

// ============================================================================
// BLOCKCHAIN - Proof Finality & Visibility Durations
// ============================================================================

export const BLOCKCHAIN = {
  // Network (environment-aware)
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet",

  // RPC endpoints
  rpcEndpoint:
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com",

  // Commitment levels
  commitment: "confirmed" as const,

  // Confirmation latency thresholds (ms)
  confirmationLatency: {
    feelFinal: 10000, // 10s maximum latency for trust
    pendingPulse: 2000, // 2s before showing "Pending…"
  },

  // Proof visibility timing
  proofVisibility: {
    highlightDuration: 5000, // 5s subtle glow on confirmed data
  },

  // Program IDs (mock for MVP)
  programs: {
    assetRegistry: "AssetRegistry11111111111111111111111111111",
    revenueDistribution: "RevenueDist11111111111111111111111111111",
    aiAuthPDA: "AIAuthPDA111111111111111111111111111111111",
    governanceRegistry: "Governance11111111111111111111111111111",
  },
} as const;

// ============================================================================
// FEATURE FLAGS - Environment Configuration
// ============================================================================

export const FEATURES = {
  // Mock data mode (for offline/preview builds)
  useMocks: process.env.NEXT_PUBLIC_USE_MOCKS === "1",

  // Analytics
  analytics: {
    vercel: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID !== undefined,
    sentry: process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined,
    posthog: process.env.NEXT_PUBLIC_POSTHOG_KEY !== undefined,
  },

  // Debug mode
  debug: process.env.NODE_ENV === "development",

  // PWA features
  pwa: {
    enabled: true,
    offline: true,
    backgroundSync: true,
  },
} as const;

// ============================================================================
// AGENT PERSONAS - Tonal & Micro-Affective Tokens
// ============================================================================

export const AGENTS = {
  operations: {
    id: "operations",
    name: "Operations Agent",
    description: "Controls generation, storage, and dispatch decisions",
    tone: { name: "calm", pace: 1.0 }, // steady 1.0× speech rate
    microAffect: { pulse: 200, ease: 150 }, // 200ms pulse, 150ms ease
    color: COLORS.agent.operations,
    icon: "⚡",
  },
  markets: {
    id: "markets",
    name: "Markets Agent",
    description: "Trades energy and optimizes yield",
    tone: { name: "analytical", pace: 1.2 }, // precise 1.2× rate
    microAffect: { pulse: 150, ease: 100 },
    color: COLORS.agent.markets,
    icon: "📈",
  },
  maintenance: {
    id: "maintenance",
    name: "Maintenance Agent",
    description: "Detects faults and coordinates self-repair",
    tone: { name: "supportive", pace: 0.9 }, // empathetic slower pace
    microAffect: { pulse: 250, ease: 200 },
    color: COLORS.agent.maintenance,
    icon: "🔧",
  },
  governance: {
    id: "governance",
    name: "Governance Agent",
    description: "Enforces constraints and mediates overrides",
    tone: { name: "authoritative", pace: 1.1 },
    microAffect: { pulse: 100, ease: 80 },
    color: COLORS.agent.governance,
    icon: "⚖️",
  },
} as const;

// ============================================================================
// SYSTEM MESSAGES - Calm, Concise, Humanized Feedback
// ============================================================================

export const MESSAGES = {
  // Loading states
  loading: {
    default: "Loading data…",
    portfolio: "Loading portfolio…",
    energy: "Loading energy metrics…",
    explanation: "Generating explanation…",
    transaction: "Processing transaction…",
    proofs: "Verifying proofs…",
  },

  // Error messages
  errors: {
    network: "Connection lost. Retrying…",
    timeout: "Taking longer than expected. Please wait…",
    unauthorized: "Please connect your wallet to proceed.",
    notFound: "Resource not found.",
    server: "Server error. Please try again later.",
    unknown: "An unexpected error occurred.",
  },

  // Success messages
  success: {
    transaction: "Transaction complete",
    override: "Override applied",
    resume: "System resumed",
  },

  // Status messages
  status: {
    paused: "Paused — awaiting input",
    degraded: "Degraded — read-only mode",
    failsafe: "Failsafe Mode — AI Authority Suspended",
    normal: "All systems operational",
  },
} as const;

// ============================================================================
// ACCESSIBILITY - Perceptual Grounding & Neuroinclusion
// ============================================================================

export const A11Y = {
  // Motion preferences
  motion: {
    default: 150, // 150ms motion tokens for state changes
    reduce: 0, // 0ms when user prefers reduced motion
  },

  // Focus styling
  focus: {
    ringWidth: 2, // px WCAG 2.2
    ringOffset: 2, // px
    animation: 150, // ms ease-in-out
  },

  // Minimum tap target size (px) - WCAG 2.5.5
  minTapTarget: 44,

  // Contrast ratios (WCAG 2.2 Level AA)
  contrast: {
    normalText: 4.5, // Normal text
    largeText: 3.0, // 18pt+ or 14pt+ bold
    ui: 3.0, // UI components
  },

  // Screen reader labels
  srLabels: {
    menu: "Main navigation",
    search: "Search",
    close: "Close",
    expand: "Expand",
    collapse: "Collapse",
  },
} as const;

// ============================================================================
// CHARTS - Neuroaesthetic Defaults for Calm Visualization
// ============================================================================

export const CHARTS = {
  // Grid pulse rhythm (ms)
  gridPulse: 2000, // 0.5 Hz gentle grid emphasis

  // Lightweight Charts config
  lightweightCharts: {
    layout: {
      background: { color: "transparent" },
      textColor: "#B3B3B3",
    },
    grid: {
      vertLines: { color: "rgba(255, 255, 255, 0.04)" },
      horzLines: { color: "rgba(255, 255, 255, 0.04)" },
    },
    crosshair: {
      mode: 1, // Magnet mode
    },
  },

  // D3 scales
  d3: {
    colorScheme: [
      COLORS.agent.operations,
      COLORS.agent.markets,
      COLORS.agent.maintenance,
      COLORS.agent.governance,
    ],
  },

  // Sparkline defaults
  sparkline: {
    width: 100,
    height: 24,
    strokeWidth: 2,
    smooth: true,
    duration: 5000, // shows 5s data window
  },

  // Agent-specific colors for charts
  colors: {
    operations: COLORS.agent.operations,
    markets: COLORS.agent.markets,
    maintenance: COLORS.agent.maintenance,
    governance: COLORS.agent.governance,
  },
} as const;

// ============================================================================
// WALLET - Trustworthy Onboarding & Confirmation Rhythm
// ============================================================================

export const WALLET = {
  // Supported wallets
  adapters: ["phantom", "solflare", "backpack", "coinbase", "ledger"],

  // Auto-connect settings
  autoConnect: true,
  autoConnectDelay: 500, // 0.5s post-load auto-connect

  // Confirmation animation timing (ms)
  confirmAnimation: 200, // 200ms progress update steps

  // Local storage keys
  storageKeys: {
    wallet: "aimp:wallet",
    autoConnect: "aimp:autoConnect",
  },
} as const;

// ============================================================================
// BEHAVIOR - Trust-Behavioral Extensions
// ============================================================================

export const BEHAVIOR = {
  trustDecayRate: 0.8, // per minute trust half-life
  confidenceDelay: 300, // ms before showing confidence levels
  proofPulseInterval: 1000, // ms heartbeat for proof state
} as const;

// ============================================================================
// TYPE EXPORTS - For type-safe constant usage
// ============================================================================

export type AgentId = keyof typeof AGENTS;
export type AnimationDuration = keyof typeof MOTION.duration;
export type AnimationEasing = keyof typeof MOTION.easing;
export type LayoutSize = keyof typeof LAYOUT.container;
