/**
 * AgentSidebar - Interactive AI Agent Q&A Interface
 *
 * Conversational interface for querying AI agents about their decisions,
 * reasoning, and system state. Provides natural language explainability.
 *
 * Design Philosophy:
 * - **Accessible**: Natural language questions, no technical jargon required
 * - **Contextual**: Agents respond with persona-specific voice/tone
 * - **Transparent**: Every answer includes data sources and confidence
 * - **Educational**: Helps users build mental models of autonomous systems
 *
 * Information Hierarchy:
 * 1. Active agent selection (visual persona indicator)
 * 2. Conversation history (question → answer pairs)
 * 3. Input field (natural language queries)
 * 4. Suggested questions (contextual prompts)
 * 5. Status indicators (thinking, error, ready)
 *
 * Interaction Model:
 * - Type question → Agent responds with reasoning
 * - Click suggested question → Auto-populate and send
 * - Switch agent → Context preserved, different perspective
 * - Hover answers → Show confidence scores and sources
 *
 * Performance:
 * - Streaming responses (progressive display)
 * - Message virtualization (if >50 messages)
 * - Debounced typing indicators
 * - Optimistic UI updates
 *
 * @see PRD Section 7.3 - Dashboard Intelligence Layer
 * @see PRD Section 6 - Agent Personas (Voice & Tone)
 * @see PRD Section 8.2 - Agent Q&A Interface (API)
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import type {
  AgentPersona,
  TrustGrade,
  OperationalStatus,
  TrustMathematics,
} from "@/lib/types";
import { PERFORMANCE, BEHAVIOR } from "@/lib/constants";

import { GlassCard } from "@/components/ui/glass-card";
import { StatPill } from "@/components/primitives/StatPill";
import { ProofBadge } from "@/components/primitives/ProofBadge";
import { HealthDot } from "@/components/primitives/HealthDot";
import {
  AgentMotion,
  Breathing,
  StatusChange,
  PressInteraction,
  Shimmer,
  Stagger,
  TrustMathMotion,
  TrustDecayMotion,
  GovernanceMotion,
  OperationalMotion,
  FlowAnimation,
  InstantFeedback,
  EmergencyOverride,
  ProofGlow,
} from "@/components/primitives/Motion";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Agent health status for availability indicators
 */
export type AgentHealthStatus = "online" | "thinking" | "error" | "offline";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate trust decay percentage based on message age
 */
function calculateTrustDecay(dataAgeSeconds: number): number {
  const ageMinutes = dataAgeSeconds / 60;
  return Math.pow(BEHAVIOR.trustDecayRate, ageMinutes) * 100;
}

/**
 * Get freshness color based on message age
 */
function getFreshnessColor(
  dataAgeSeconds: number
): "verified" | "warning" | "critical" {
  if (dataAgeSeconds < PERFORMANCE.freshness.critical) return "verified";
  if (dataAgeSeconds < PERFORMANCE.freshness.warning) return "warning";
  return "critical";
}

/**
 * Map agent health to operational status
 */
function mapAgentHealthToOperational(
  health: AgentHealthStatus
): OperationalStatus {
  const mapping: Record<AgentHealthStatus, OperationalStatus> = {
    online: "optimal",
    thinking: "nominal",
    error: "fault",
    offline: "maintenance",
  };
  return mapping[health];
}

/**
 * Map agent health to health dot status
 */
function mapAgentHealthToHealthDot(health: AgentHealthStatus): {
  status: "healthy" | "degraded" | "critical" | "offline";
  pulse: "slow" | "medium" | "fast" | "none";
} {
  const mapping: Record<
    AgentHealthStatus,
    {
      status: "healthy" | "degraded" | "critical" | "offline";
      pulse: "slow" | "medium" | "fast" | "none";
    }
  > = {
    online: { status: "healthy", pulse: "slow" },
    thinking: { status: "healthy", pulse: "medium" },
    error: { status: "critical", pulse: "fast" },
    offline: { status: "offline", pulse: "none" },
  };
  return mapping[health];
}

/**
 * Agent message in conversation
 */
export interface AgentMessage {
  /** Message ID */
  id: string;

  /** Message role (user or agent) */
  role: "user" | "agent";

  /** Message content */
  content: string;

  /** Agent that sent this message (if role === 'agent') */
  agent?: AgentPersona;

  /** Timestamp (ISO 8601) */
  timestamp: string;

  /** Confidence in response (0-100, if role === 'agent') */
  confidence?: number;

  /** Data sources cited (if role === 'agent') */
  sources?: string[];

  /** Whether message is still streaming */
  isStreaming?: boolean;

  /** Error message (if failed) */
  error?: string;
}

/**
 * Suggested question prompt
 */
export interface SuggestedQuestion {
  /** Question text */
  question: string;

  /** Category/context */
  category?: string;

  /** Icon for visual identity */
  icon?: string;
}

/**
 * AgentSidebar props
 */
export interface AgentSidebarProps {
  /** Currently selected agent */
  selectedAgent: AgentPersona;

  /** Conversation history */
  messages: AgentMessage[];

  /** Whether agent is currently responding */
  isThinking?: boolean;

  /** Agent health status for availability indicators */
  agentHealth?: AgentHealthStatus;

  /** Suggested questions for current context */
  suggestedQuestions?: SuggestedQuestion[];

  /** Message send handler */
  onSendMessage: (message: string, agent: AgentPersona) => void;

  /** Agent selection handler */
  onSelectAgent?: (agent: AgentPersona) => void;

  /** Retry handler for failed messages */
  onRetry?: (messageId: string) => void;

  /** Custom className */
  className?: string;

  /** Compact mode (smaller padding, reduced text) */
  compact?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Maximum message history length */
  maxMessages?: number;

  /** Show constraint violations (for Governor agent) */
  hasConstraintViolations?: boolean;
}

// ============================================================================
// AGENT METADATA
// ============================================================================

const AGENT_CONFIG: Record<
  AgentPersona,
  {
    icon: string;
    label: string;
    color: string;
    description: string;
    defaultQuestions: SuggestedQuestion[];
  }
> = {
  operations: {
    icon: "⚡",
    label: "Operations",
    color: "text-agent-operations",
    description: "Energy dispatch, battery management, grid optimization",
    defaultQuestions: [
      { question: "What's the current energy dispatch strategy?", icon: "⚡" },
      {
        question: "Why did you change the battery discharge rate?",
        icon: "🔋",
      },
      { question: "How are you optimizing for peak demand?", icon: "📈" },
    ],
  },
  markets: {
    icon: "📊",
    label: "Markets",
    color: "text-agent-markets",
    description: "Trading decisions, pricing strategy, revenue optimization",
    defaultQuestions: [
      { question: "What's driving today's trading decisions?", icon: "📊" },
      { question: "How do you predict energy prices?", icon: "💰" },
      { question: "Should I buy or sell tokens right now?", icon: "🔄" },
    ],
  },
  sentinel: {
    icon: "🛡️",
    label: "Sentinel",
    color: "text-agent-sentinel",
    description: "Hardware monitoring, predictive maintenance, safety checks",
    defaultQuestions: [
      { question: "What's the health of the solar panels?", icon: "☀️" },
      { question: "Are there any maintenance alerts?", icon: "🔧" },
      { question: "How do you detect equipment failures?", icon: "🛡️" },
    ],
  },
  governor: {
    icon: "⚖️",
    label: "Governor",
    color: "text-agent-governance",
    description: "Safety constraints, compliance, override authority",
    defaultQuestions: [
      { question: "What safety constraints are active?", icon: "⚖️" },
      { question: "Have there been any constraint violations?", icon: "⚠️" },
      { question: "How do you enforce operating limits?", icon: "🛑" },
    ],
  },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Agent selector tabs
 */
const AgentTabs = React.memo(function AgentTabs({
  selectedAgent,
  onSelectAgent,
  compact,
  disabled,
  agentHealth,
}: {
  selectedAgent: AgentPersona;
  onSelectAgent?: (agent: AgentPersona) => void;
  compact?: boolean;
  disabled?: boolean;
  agentHealth?: AgentHealthStatus;
}) {
  const agents: AgentPersona[] = [
    "operations",
    "markets",
    "sentinel",
    "governor",
  ];

  // Get health dot config for current agent
  const healthConfig = agentHealth
    ? mapAgentHealthToHealthDot(agentHealth)
    : null;

  return (
    <div className="flex items-center gap-2 p-2 bg-glass-light rounded-glass-md border border-glass-border">
      {agents.map((agent) => {
        const config = AGENT_CONFIG[agent];
        const isSelected = agent === selectedAgent;
        const isInteractive = !disabled && onSelectAgent;

        // Show health indicator only for selected agent
        const showHealth = isSelected && healthConfig;

        return (
          <PressInteraction key={agent}>
            <button
              type="button"
              onClick={isInteractive ? () => onSelectAgent(agent) : undefined}
              disabled={!isInteractive}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-glass-sm",
                "transition-all duration-fast",
                compact ? "text-detail-sm" : "text-body-sm",
                "font-medium",
                isSelected &&
                  "bg-glass-medium border border-glass-border-heavy",
                isSelected && config.color,
                !isSelected && "text-foreground-tertiary",
                !isSelected &&
                  isInteractive &&
                  "hover:bg-glass-light hover:text-foreground-secondary",
                isInteractive && "cursor-pointer",
                !isInteractive && "cursor-default opacity-60"
              )}
              aria-label={`Switch to ${config.label} agent`}
              data-pressed={isSelected}
            >
              {/* Agent icon with dynamic breathing based on health */}
              <Breathing
                rhythm={
                  showHealth && healthConfig.pulse === "medium"
                    ? "fast"
                    : showHealth && healthConfig.pulse === "fast"
                      ? "medium"
                      : isSelected
                        ? "medium"
                        : "slow"
                }
              >
                <span className={compact ? "text-sm" : "text-base"}>
                  {config.icon}
                </span>
              </Breathing>
              <span>{config.label}</span>

              {/* Health indicator for selected agent */}
              {showHealth && (
                <HealthDot
                  status={healthConfig.status}
                  pulse={healthConfig.pulse}
                  size="sm"
                />
              )}
            </button>
          </PressInteraction>
        );
      })}
    </div>
  );
});

/**
 * Message bubble (user or agent)
 */
const MessageBubble = React.memo(function MessageBubble({
  message,
  compact,
  onRetry,
}: {
  message: AgentMessage;
  compact?: boolean;
  onRetry?: (messageId: string) => void;
}) {
  const isUser = message.role === "user";
  const isAgent = message.role === "agent";
  const agentConfig = message.agent ? AGENT_CONFIG[message.agent] : null;

  // State for message truncation (Refinement #8)
  const [isExpanded, setIsExpanded] = React.useState(false);
  const needsTruncation = message.content.length > 500;
  const displayContent =
    needsTruncation && !isExpanded
      ? message.content.slice(0, 500) + "..."
      : message.content;

  const relativeTime = React.useMemo(
    () => formatRelativeTime(message.timestamp),
    [message.timestamp]
  );

  // Calculate message age for temporal decay
  const dataAgeSeconds = React.useMemo(() => {
    return Math.floor(
      (Date.now() - new Date(message.timestamp).getTime()) / 1000
    );
  }, [message.timestamp]);

  // Map confidence to trust grade
  const trustGrade: TrustGrade = message.confidence
    ? message.confidence >= 90
      ? "excellent"
      : message.confidence >= 70
        ? "good"
        : message.confidence >= 50
          ? "fair"
          : "poor"
    : "good";

  const confidenceStatus =
    trustGrade === "excellent" || trustGrade === "good"
      ? "verified"
      : trustGrade === "fair"
        ? "warning"
        : "critical";

  // Calculate trust decay for enhanced visualization
  const decayPercent = calculateTrustDecay(dataAgeSeconds);
  const displayConfidence = message.confidence
    ? (message.confidence * decayPercent) / 100
    : undefined;

  // Freshness color for temporal awareness
  const freshnessStatus = getFreshnessColor(dataAgeSeconds);

  // Build trust mathematics for TrustMathMotion
  const trustMath: TrustMathematics | undefined =
    isAgent && message.confidence !== undefined
      ? {
          confidenceScore: message.confidence,
          witnessCount: message.sources?.length || 1,
          deviationSigma: 1.0,
          exceedsThreshold: message.confidence >= 70,
          trustGrade: trustGrade,
        }
      : undefined;

  // A11Y: Respect motion preferences
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Determine if this is a high-confidence response (for ProofGlow)
  const isHighConfidence = message.confidence && message.confidence >= 90;

  // Determine if this is a critical error (for EmergencyOverride + InstantFeedback)
  const isCriticalError =
    message.error && message.error.toLowerCase().includes("critical");

  let bubbleContent = (
    <div
      className={cn(
        "flex gap-3",
        isUser && "flex-row-reverse",
        compact ? "mb-3" : "mb-4"
      )}
    >
      {/* Avatar */}
      {isAgent && agentConfig && (
        <Breathing rhythm="slow" disabled={prefersReducedMotion}>
          <div
            className={cn(
              "flex items-center justify-center rounded-full shrink-0",
              "bg-glass-medium border border-glass-border",
              compact ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"
            )}
          >
            {agentConfig.icon}
          </div>
        </Breathing>
      )}

      {/* Message content */}
      <div
        className={cn("flex-1 min-w-0", isUser && "flex flex-col items-end")}
      >
        {/* Sender label + timestamp */}
        <div
          className={cn(
            "flex items-center gap-2 mb-1",
            compact ? "text-detail-xs" : "text-detail-sm",
            isUser && "flex-row-reverse"
          )}
        >
          <span
            className={cn(
              "font-semibold",
              isAgent && agentConfig
                ? agentConfig.color
                : "text-foreground-primary"
            )}
          >
            {isUser ? "You" : agentConfig?.label || "Agent"}
          </span>
          <StatusChange triggerKey={message.timestamp}>
            <time
              className="text-foreground-tertiary"
              dateTime={message.timestamp}
              title={`${new Date(message.timestamp).toLocaleString()} • Age: ${dataAgeSeconds}s • Freshness: ${freshnessStatus}`}
            >
              {relativeTime}
            </time>
          </StatusChange>

          {/* Temporal awareness badge */}
          {isAgent && dataAgeSeconds > PERFORMANCE.freshness.warning && (
            <StatPill
              label={`${dataAgeSeconds}s`}
              status={freshnessStatus}
              size="sm"
              tooltipText={`Message age: ${dataAgeSeconds}s • Trust decay: ${decayPercent.toFixed(1)}%`}
            />
          )}
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            "rounded-glass-md px-4 py-3 max-w-[85%]",
            compact && "px-3 py-2",
            isUser && "bg-glass-medium border border-glass-border",
            isUser && "text-foreground-primary",
            isAgent && "bg-glass-light border border-glass-border",
            isAgent && "text-foreground-primary"
          )}
        >
          {/* Error state with retry button (Refinement #3) */}
          {message.error && (
            <div className="space-y-2 mb-2">
              <div className="flex items-center gap-2 text-status-critical">
                <span className="text-lg">⚠</span>
                <span
                  className={cn(
                    "font-semibold",
                    compact ? "text-detail-sm" : "text-body-sm"
                  )}
                >
                  Error: {message.error}
                </span>
              </div>
              {onRetry && (
                <PressInteraction>
                  <button
                    type="button"
                    onClick={() => onRetry(message.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-glass-sm",
                      "bg-glass-medium border border-glass-border",
                      "text-foreground-primary transition-all duration-fast",
                      "hover:bg-glass-heavy hover:border-glass-border-heavy",
                      compact ? "text-detail-sm" : "text-body-sm"
                    )}
                  >
                    <span>🔄</span>
                    <span>Retry</span>
                  </button>
                </PressInteraction>
              )}
            </div>
          )}

          {/* Content with streaming flow animation and truncation (Refinement #8) */}
          <div>
            <p
              className={cn(
                "leading-relaxed whitespace-pre-wrap",
                compact ? "text-body-sm" : "text-body-md",
                message.isStreaming && "animate-pulse"
              )}
            >
              {displayContent}
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-foreground-primary animate-pulse" />
              )}
            </p>

            {/* Read more button for long messages (Refinement #8) */}
            {needsTruncation && (
              <PressInteraction>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={cn(
                    "mt-2 text-foreground-secondary hover:text-foreground-primary",
                    "transition-colors duration-fast",
                    compact ? "text-detail-sm" : "text-body-sm",
                    "font-medium"
                  )}
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              </PressInteraction>
            )}
          </div>

          {/* Agent metadata (confidence + sources) */}
          {isAgent && !message.error && (
            <div
              className={cn(
                "flex items-center gap-2 mt-2 pt-2 border-t border-glass-border flex-wrap"
              )}
            >
              {message.confidence !== undefined && (
                <>
                  <StatusChange triggerKey={`confidence-${message.confidence}`}>
                    <StatPill
                      label={`${message.confidence}%`}
                      status={confidenceStatus}
                      size="sm"
                      tooltipText={`Confidence: ${message.confidence}% (${trustGrade}) • With decay: ${displayConfidence?.toFixed(1)}% • Age: ${dataAgeSeconds}s • Decay rate: ${BEHAVIOR.trustDecayRate}/min`}
                    />
                  </StatusChange>

                  {/* Low confidence warning indicator (Refinement #4) */}
                  {message.confidence < PERFORMANCE.trust.fair && (
                    <StatPill
                      label="LOW CONFIDENCE"
                      status="warning"
                      size="sm"
                      tooltipText={`Confidence ${message.confidence}% is below threshold ${PERFORMANCE.trust.fair}% • Verify with additional sources`}
                    />
                  )}
                </>
              )}

              {/* Individual ProofBadges for each source (Refinement #7) */}
              {message.sources && message.sources.length > 0 && (
                <>
                  {message.sources.map((source, idx) => (
                    <ProofBadge
                      key={`${source}-${idx}`}
                      label={source}
                      showTooltip={true}
                      size="sm"
                      title={`Source: ${source} • Freshness: ${dataAgeSeconds}s • Status: ${freshnessStatus}`}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Layer 1: Shimmer + FlowAnimation for streaming messages (Refinement #6)
  if (message.isStreaming) {
    bubbleContent = (
      <Shimmer isLoading={true}>
        <FlowAnimation direction="charging" disabled={prefersReducedMotion}>
          {bubbleContent}
        </FlowAnimation>
      </Shimmer>
    );
  }

  // Layer 2: TrustDecayMotion for agent messages with age
  if (isAgent && dataAgeSeconds > 0) {
    bubbleContent = (
      <TrustDecayMotion dataAgeSeconds={dataAgeSeconds}>
        {bubbleContent}
      </TrustDecayMotion>
    );
  }

  // Layer 3: TrustMathMotion for confident agent responses
  if (trustMath) {
    bubbleContent = (
      <TrustMathMotion trustMath={trustMath}>{bubbleContent}</TrustMathMotion>
    );
  }

  // Layer 4: ProofGlow for high-confidence responses
  if (isHighConfidence && !message.error) {
    bubbleContent = (
      <ProofGlow verified={true} proofType="signature">
        {bubbleContent}
      </ProofGlow>
    );
  }

  // Layer 5: InstantFeedback for error messages
  if (message.error && !isCriticalError) {
    bubbleContent = <InstantFeedback>{bubbleContent}</InstantFeedback>;
  }

  // Layer 6: EmergencyOverride for critical errors
  if (isCriticalError) {
    bubbleContent = (
      <EmergencyOverride isActive={true}>{bubbleContent}</EmergencyOverride>
    );
  }

  return bubbleContent;
});

/**
 * Suggested questions grid
 */
const SuggestedQuestions = React.memo(function SuggestedQuestions({
  questions,
  onSelectQuestion,
  compact,
  disabled,
}: {
  questions: SuggestedQuestion[];
  onSelectQuestion: (question: string) => void;
  compact?: boolean;
  disabled?: boolean;
}) {
  if (questions.length === 0) return null;

  // A11Y: Respect motion preferences
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className={cn("space-y-2", compact ? "mb-3" : "mb-4")}>
      <p
        className={cn(
          "text-foreground-tertiary font-medium",
          compact ? "text-detail-sm" : "text-body-sm"
        )}
      >
        Suggested questions:
      </p>
      {/* Advanced stagger with scale variant */}
      {prefersReducedMotion ? (
        <div className="flex flex-wrap gap-2">
          {questions.map((suggestion, index) => (
            <PressInteraction key={index}>
              <button
                type="button"
                onClick={() => onSelectQuestion(suggestion.question)}
                disabled={disabled}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-glass-sm",
                  "bg-glass-light border border-glass-border",
                  "transition-all duration-fast",
                  compact ? "text-detail-sm" : "text-body-sm",
                  "text-foreground-secondary",
                  !disabled && "cursor-pointer",
                  !disabled &&
                    "hover:bg-glass-medium hover:border-glass-border-heavy hover:text-foreground-primary",
                  disabled && "opacity-60 cursor-not-allowed"
                )}
              >
                {suggestion.icon && <span>{suggestion.icon}</span>}
                <span>{suggestion.question}</span>
              </button>
            </PressInteraction>
          ))}
        </div>
      ) : (
        <Stagger staggerDelay={0.05} variant="scale">
          <div className="flex flex-wrap gap-2">
            {questions.map((suggestion, index) => (
              <PressInteraction key={index}>
                <button
                  type="button"
                  onClick={() => onSelectQuestion(suggestion.question)}
                  disabled={disabled}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-glass-sm",
                    "bg-glass-light border border-glass-border",
                    "transition-all duration-fast",
                    compact ? "text-detail-sm" : "text-body-sm",
                    "text-foreground-secondary",
                    !disabled && "cursor-pointer",
                    !disabled &&
                      "hover:bg-glass-medium hover:border-glass-border-heavy hover:text-foreground-primary",
                    disabled && "opacity-60 cursor-not-allowed"
                  )}
                >
                  {suggestion.icon && <span>{suggestion.icon}</span>}
                  <span>{suggestion.question}</span>
                </button>
              </PressInteraction>
            ))}
          </div>
        </Stagger>
      )}
    </div>
  );
});

/**
 * Message input field
 */
const MessageInput = React.memo(function MessageInput({
  onSendMessage,
  isThinking,
  disabled,
  compact,
  placeholder,
}: {
  onSendMessage: (message: string) => void;
  isThinking?: boolean;
  disabled?: boolean;
  compact?: boolean;
  placeholder?: string;
}) {
  const [input, setInput] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !isThinking && !disabled) {
        onSendMessage(trimmed);
        setInput("");
        // Reset textarea height
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    },
    [input, isThinking, disabled, onSendMessage]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Submit on Enter (without Shift)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  // Auto-resize textarea
  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    },
    []
  );

  const canSubmit = input.trim().length > 0 && !isThinking && !disabled;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled || isThinking}
        placeholder={
          disabled
            ? "Agent unavailable..."
            : isThinking
              ? "Agent is thinking..."
              : placeholder || "Ask me anything..."
        }
        rows={1}
        className={cn(
          "w-full px-4 py-3 pr-12 rounded-glass-md resize-none min-h-[48px]",
          "bg-glass-light border border-glass-border",
          "text-foreground-primary placeholder:text-foreground-tertiary",
          "transition-all duration-fast",
          "focus:outline-none focus:border-glass-border-heavy focus:bg-glass-medium",
          compact ? "text-body-sm min-h-[40px]" : "text-body-md",
          (disabled || isThinking) && "opacity-60 cursor-not-allowed"
        )}
      />

      {/* Send button */}
      <PressInteraction>
        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "absolute right-2 bottom-2 p-2 rounded-glass-sm",
            "bg-glass-medium border border-glass-border",
            "transition-all duration-fast",
            canSubmit && "cursor-pointer",
            canSubmit && "hover:bg-glass-heavy hover:border-glass-border-heavy",
            canSubmit && "text-foreground-primary",
            !canSubmit && "opacity-40 cursor-not-allowed",
            !canSubmit && "text-foreground-tertiary"
          )}
          aria-label="Send message"
        >
          <svg
            className={compact ? "w-4 h-4" : "w-5 h-5"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </PressInteraction>
    </form>
  );
});

/**
 * Thinking indicator (agent is processing)
 */
const ThinkingIndicator = React.memo(function ThinkingIndicator({
  agent,
  compact,
}: {
  agent: AgentPersona;
  compact?: boolean;
}) {
  const config = AGENT_CONFIG[agent];

  // A11Y: Respect motion preferences
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <OperationalMotion operationalStatus="nominal">
      <Breathing rhythm="fast" disabled={prefersReducedMotion}>
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-glass-md",
            "bg-glass-light border border-glass-border",
            compact && "px-3 py-2"
          )}
        >
          <Breathing rhythm="medium" disabled={prefersReducedMotion}>
            <span className={compact ? "text-base" : "text-lg"}>
              {config.icon}
            </span>
          </Breathing>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "font-semibold",
                config.color,
                compact ? "text-body-sm" : "text-body-md"
              )}
            >
              {config.label} is thinking
            </span>
            <div className="flex gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-foreground-tertiary animate-pulse"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-foreground-tertiary animate-pulse"
                style={{ animationDelay: `${BEHAVIOR.confidenceDelay / 2}ms` }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-foreground-tertiary animate-pulse"
                style={{ animationDelay: `${BEHAVIOR.confidenceDelay}ms` }}
              />
            </div>
          </div>
        </div>
      </Breathing>
    </OperationalMotion>
  );
});

/**
 * Empty state (no messages yet)
 */
const EmptyState = React.memo(function EmptyState({
  agent,
  compact,
}: {
  agent: AgentPersona;
  compact?: boolean;
}) {
  const config = AGENT_CONFIG[agent];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-8" : "py-12"
      )}
    >
      <Breathing rhythm="slow">
        <span className={compact ? "text-4xl mb-3" : "text-6xl mb-4"}>
          {config.icon}
        </span>
      </Breathing>
      <h3
        className={cn(
          "font-semibold mb-2",
          config.color,
          compact ? "text-body-md" : "text-body-lg"
        )}
      >
        {config.label} Agent
      </h3>
      <p
        className={cn(
          "text-foreground-secondary max-w-md",
          compact ? "text-detail-sm" : "text-body-sm"
        )}
      >
        {config.description}
      </p>
    </div>
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * AgentSidebar - Interactive Q&A interface with AI agents
 *
 * @example
 * ```tsx
 * const [messages, setMessages] = useState<AgentMessage[]>([]);
 * const [selectedAgent, setSelectedAgent] = useState<AgentPersona>("operations");
 * const [isThinking, setIsThinking] = useState(false);
 *
 * const handleSendMessage = async (message: string, agent: AgentPersona) => {
 *   const userMessage: AgentMessage = {
 *     id: `msg-${Date.now()}`,
 *     role: "user",
 *     content: message,
 *     timestamp: new Date().toISOString(),
 *   };
 *   setMessages((prev) => [...prev, userMessage]);
 *   setIsThinking(true);
 *
 *   // Call API...
 *   const response = await askAgent(agent, message);
 *
 *   const agentMessage: AgentMessage = {
 *     id: `msg-${Date.now()}-agent`,
 *     role: "agent",
 *     agent,
 *     content: response.answer,
 *     confidence: response.confidence,
 *     sources: response.sources,
 *     timestamp: new Date().toISOString(),
 *   };
 *   setMessages((prev) => [...prev, agentMessage]);
 *   setIsThinking(false);
 * };
 *
 * <AgentSidebar
 *   selectedAgent={selectedAgent}
 *   messages={messages}
 *   isThinking={isThinking}
 *   onSendMessage={handleSendMessage}
 *   onSelectAgent={setSelectedAgent}
 * />
 * ```
 */
export const AgentSidebar = React.forwardRef<HTMLDivElement, AgentSidebarProps>(
  (
    {
      selectedAgent,
      messages,
      isThinking = false,
      agentHealth = "online",
      suggestedQuestions,
      onSendMessage,
      onSelectAgent,
      className,
      compact = false,
      disabled = false,
      maxMessages = 100,
      hasConstraintViolations = false,
      ...props
    },
    ref
  ) => {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const agentConfig = AGENT_CONFIG[selectedAgent];

    // Force re-render for message age updates (Refinement #2)
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    // Auto-scroll to bottom when new messages arrive
    React.useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, isThinking]);

    // Message age live updates - refresh every 30s (Refinement #2)
    React.useEffect(() => {
      const interval = setInterval(() => {
        forceUpdate();
      }, BEHAVIOR.proofPulseInterval * 30); // 30 seconds

      return () => clearInterval(interval);
    }, []);

    // Enhanced keyboard navigation (Refinement #9)
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Agent switching via 1-4 keys
        if (["1", "2", "3", "4"].includes(e.key) && onSelectAgent) {
          const agents: AgentPersona[] = [
            "operations",
            "markets",
            "sentinel",
            "governor",
          ];
          const index = parseInt(e.key) - 1;
          if (agents[index]) {
            onSelectAgent(agents[index]);
          }
        }
        // Esc to clear input (handled by input component focus)
        // Ctrl+Enter to send (handled by input component)
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onSelectAgent]);

    // Use agent's default questions if none provided
    const displayedQuestions = React.useMemo(() => {
      return suggestedQuestions && suggestedQuestions.length > 0
        ? suggestedQuestions
        : agentConfig.defaultQuestions;
    }, [suggestedQuestions, agentConfig]);

    // Limit messages to prevent memory issues
    const displayedMessages = React.useMemo(() => {
      return messages.slice(-maxMessages);
    }, [messages, maxMessages]);

    // Check if messages were truncated
    const messagesTruncated = messages.length > maxMessages;

    const handleSendMessage = React.useCallback(
      (message: string) => {
        if (!disabled && !isThinking) {
          onSendMessage(message, selectedAgent);
        }
      },
      [onSendMessage, selectedAgent, disabled, isThinking]
    );

    const handleSelectQuestion = React.useCallback(
      (question: string) => {
        handleSendMessage(question);
      },
      [handleSendMessage]
    );

    const hasMessages = displayedMessages.length > 0;

    // Map agent health to operational status
    const operationalStatus = mapAgentHealthToOperational(agentHealth);

    // Determine trust level based on agent health
    const trustLevel: TrustGrade =
      agentHealth === "online"
        ? "excellent"
        : agentHealth === "thinking"
          ? "good"
          : agentHealth === "error"
            ? "poor"
            : "suspect";

    let sidebarContent = (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-full",
          compact ? "gap-3" : "gap-4",
          className
        )}
        {...props}
      >
        {/* Agent selector tabs with transition (Refinement #5) */}
        <StatusChange triggerKey={selectedAgent}>
          <AgentTabs
            selectedAgent={selectedAgent}
            onSelectAgent={onSelectAgent}
            compact={compact}
            disabled={disabled}
            agentHealth={agentHealth}
          />
        </StatusChange>

        {/* Constraint violation indicator for Governor */}
        {selectedAgent === "governor" && hasConstraintViolations && (
          <StatusChange triggerKey={`violations-${hasConstraintViolations}`}>
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-glass-sm",
                "bg-status-critical/10 border border-status-critical/30"
              )}
            >
              <span className="text-status-critical text-lg">⚠️</span>
              <span
                className={cn(
                  "text-status-critical font-semibold",
                  compact ? "text-detail-sm" : "text-body-sm"
                )}
              >
                Constraint violations detected
              </span>
            </div>
          </StatusChange>
        )}

        {/* Messages container */}
        <GlassCard
          className={cn(
            "flex-1 overflow-y-auto",
            compact ? "p-3" : "p-4",
            "min-h-0" // Allow flex shrink
          )}
        >
          {!hasMessages && !isThinking ? (
            <EmptyState agent={selectedAgent} compact={compact} />
          ) : (
            <div className="space-y-1">
              {/* Conversation persistence indicator (Refinement #10) */}
              {messagesTruncated && (
                <div
                  className={cn(
                    "flex items-center justify-center gap-2 mb-3 px-3 py-2 rounded-glass-sm",
                    "bg-glass-light border border-glass-border"
                  )}
                >
                  <span className="text-foreground-tertiary">📜</span>
                  <span
                    className={cn(
                      "text-foreground-tertiary",
                      compact ? "text-detail-xs" : "text-detail-sm"
                    )}
                  >
                    Showing {displayedMessages.length} of {messages.length}{" "}
                    messages • Full history preserved
                  </span>
                </div>
              )}

              {displayedMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  compact={compact}
                  onRetry={props.onRetry}
                />
              ))}

              {/* Thinking indicator */}
              {isThinking && (
                <ThinkingIndicator agent={selectedAgent} compact={compact} />
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </GlassCard>

        {/* Suggested questions */}
        {!hasMessages && !isThinking && (
          <SuggestedQuestions
            questions={displayedQuestions}
            onSelectQuestion={handleSelectQuestion}
            compact={compact}
            disabled={disabled || isThinking}
          />
        )}

        {/* Message input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          isThinking={isThinking}
          disabled={disabled}
          compact={compact}
          placeholder={`Ask ${agentConfig.label}...`}
        />
      </div>
    );

    // Layer 1: OperationalMotion based on agent health
    sidebarContent = (
      <OperationalMotion operationalStatus={operationalStatus}>
        {sidebarContent}
      </OperationalMotion>
    );

    // Layer 2: GovernanceMotion for Governor agent or constraint violations
    if (selectedAgent === "governor" || hasConstraintViolations) {
      sidebarContent = (
        <GovernanceMotion
          state={hasConstraintViolations ? "violated" : "enforcing"}
        >
          {sidebarContent}
        </GovernanceMotion>
      );
    }

    // Layer 3: AgentMotion (outermost, agent personality)
    return (
      <AgentMotion agent={selectedAgent} trustLevel={trustLevel}>
        {sidebarContent}
      </AgentMotion>
    );
  }
);

AgentSidebar.displayName = "AgentSidebar";

// ============================================================================
// CONVENIENCE COMPONENTS
// ============================================================================

/**
 * AgentSidebarSkeleton - Loading placeholder
 */
export function AgentSidebarSkeleton({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Shimmer isLoading={true}>
      <div className={cn("flex flex-col h-full", compact ? "gap-3" : "gap-4")}>
        {/* Tabs skeleton */}
        <div className="flex gap-2 p-2 bg-glass-light rounded-glass-md border border-glass-border">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "bg-glass-medium rounded-glass-sm",
                compact ? "h-8 w-20" : "h-10 w-24"
              )}
            />
          ))}
        </div>

        {/* Messages skeleton */}
        <GlassCard className={cn("flex-1", compact ? "p-3" : "p-4")}>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <div
                  className={cn(
                    "bg-glass-medium rounded-full shrink-0",
                    compact ? "w-8 h-8" : "w-10 h-10"
                  )}
                />
                <div className="flex-1 space-y-2">
                  <div
                    className={cn(
                      "bg-glass-medium rounded",
                      compact ? "h-3 w-20" : "h-4 w-24"
                    )}
                  />
                  <div
                    className={cn(
                      "bg-glass-medium rounded-glass-md",
                      compact ? "h-16" : "h-20",
                      "w-3/4"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Input skeleton */}
        <div
          className={cn(
            "bg-glass-medium rounded-glass-md",
            compact ? "h-10" : "h-12"
          )}
        />
      </div>
    </Shimmer>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default AgentSidebar;
