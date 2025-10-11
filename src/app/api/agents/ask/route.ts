/**
 * API Route: /api/agents/ask
 *
 * AI agent Q&A endpoint - Natural language queries with persona-specific responses.
 * Simulates conversational AI with confidence scores and source attribution.
 *
 * Enhanced with:
 * - Dynamic confidence scoring based on question-answer domain matching
 * - Multi-source validation with trust mathematics
 * - Agent health status and operational awareness
 * - Streaming simulation for long responses
 * - Low-confidence scenarios for ambiguous questions
 * - Agent coordination context for multi-domain queries
 * - Constraint violation detection
 * - Temporal freshness and trust decay
 *
 * POST Body:
 * {
 *   "agent": "operations" | "markets" | "sentinel" | "governor",
 *   "question": "What's the current energy dispatch strategy?",
 *   "conversationId": "optional-conversation-id"
 * }
 *
 * @see PRD Section 8.2 - Agent Q&A API
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generateMockAgentMessage,
  generateMockTrustMathematics,
  generateMockAgentHealth,
  calculateMockTrustDecay,
} from "@/lib/mock";
import type { AgentPersona, OperationalStatus } from "@/lib/types";
import { PERFORMANCE } from "@/lib/constants";

export const dynamic = "force-dynamic";

// ============================================================================
// CONVERSATION MEMORY & CACHING (Refinement #26 - Response Caching)
// ============================================================================

/**
 * In-memory conversation cache (simulates context awareness)
 */
const conversationCache = new Map<
  string,
  {
    questions: Array<{
      question: string;
      responseKey: string;
      timestamp: number;
      count: number;
    }>;
    lastActivity: number;
  }
>();

/**
 * Check if question was asked before in conversation (Refinement #26, #32)
 */
function findCachedQuestion(
  conversationId: string,
  question: string
): { isCached: boolean; isRepeat: boolean; count: number } {
  const conversation = conversationCache.get(conversationId);
  if (!conversation) {
    return { isCached: false, isRepeat: false, count: 0 };
  }

  const normalizedQuestion = question.toLowerCase().trim();
  const cached = conversation.questions.find(
    (q) => q.question.toLowerCase().trim() === normalizedQuestion
  );

  if (cached) {
    // Check if repeated within 5 minutes
    const isRecent = Date.now() - cached.timestamp < 5 * 60 * 1000;
    return {
      isCached: true,
      isRepeat: isRecent,
      count: cached.count,
    };
  }

  return { isCached: false, isRepeat: false, count: 0 };
}

/**
 * Update conversation cache (Refinement #39 - Question history tracking)
 */
function updateConversationCache(
  conversationId: string,
  question: string,
  responseKey: string
): void {
  const normalizedQuestion = question.toLowerCase().trim();

  let conversation = conversationCache.get(conversationId);
  if (!conversation) {
    conversation = { questions: [], lastActivity: Date.now() };
    conversationCache.set(conversationId, conversation);
  }

  const existing = conversation.questions.find(
    (q) => q.question === normalizedQuestion
  );

  if (existing) {
    existing.count++;
    existing.timestamp = Date.now();
  } else {
    conversation.questions.push({
      question: normalizedQuestion,
      responseKey,
      timestamp: Date.now(),
      count: 1,
    });
  }

  conversation.lastActivity = Date.now();

  // Cleanup old conversations (older than 1 hour)
  for (const [id, conv] of conversationCache.entries()) {
    if (Date.now() - conv.lastActivity > 3600000) {
      conversationCache.delete(id);
    }
  }
}

// ============================================================================
// QUESTION ANALYSIS UTILITIES
// ============================================================================

/**
 * Question intent classification (Enhancement #24)
 */
type QuestionIntent =
  | "status_query" // "What's the current...?"
  | "explanation_request" // "Why did you...?"
  | "prediction_query" // "What will happen...?"
  | "comparison_query" // "Which is better...?"
  | "troubleshooting" // "What's wrong with...?"
  | "configuration_query"; // "How is X configured...?"

/**
 * Question complexity scoring (Enhancement #11)
 */
type QuestionComplexity = "simple" | "moderate" | "complex";

/**
 * Question sentiment (Refinement #31 - Sentiment analysis)
 */
type QuestionSentiment = "urgent" | "neutral" | "exploratory";

/**
 * Constraint severity (Refinement #35 - Constraint categorization)
 */
type ConstraintSeverity = "critical" | "high" | "medium" | "low";
type ConstraintType = "safety" | "operational" | "regulatory";

/**
 * Classify question intent (Enhancement #24)
 */
function classifyQuestionIntent(question: string): QuestionIntent {
  const lower = question.toLowerCase();

  if (
    lower.startsWith("what") &&
    (lower.includes("current") || lower.includes("now"))
  ) {
    return "status_query";
  }
  if (lower.startsWith("why") || lower.includes("explain")) {
    return "explanation_request";
  }
  if (
    lower.startsWith("will") ||
    lower.includes("predict") ||
    lower.includes("forecast")
  ) {
    return "prediction_query";
  }
  if (
    lower.includes("vs") ||
    lower.includes("versus") ||
    lower.includes("compare")
  ) {
    return "comparison_query";
  }
  if (
    lower.includes("wrong") ||
    lower.includes("error") ||
    lower.includes("problem")
  ) {
    return "troubleshooting";
  }
  if (lower.includes("how") && lower.includes("configure")) {
    return "configuration_query";
  }

  return "status_query"; // Default
}

/**
 * Calculate question complexity (Enhancement #11)
 */
function calculateQuestionComplexity(question: string): QuestionComplexity {
  const wordCount = question.split(/\s+/).length;
  const hasMultipleClauses =
    (question.match(/,|and|or|but/gi) || []).length > 1;
  const hasTechnicalTerms =
    /SOC|discharge|efficiency|optimization|algorithm|forecast/i.test(question);

  if (wordCount > 20 || (hasMultipleClauses && hasTechnicalTerms)) {
    return "complex";
  }
  if (wordCount > 10 || hasMultipleClauses || hasTechnicalTerms) {
    return "moderate";
  }
  return "simple";
}

/**
 * Check if question is ambiguous (Enhancement #6)
 */
function isAmbiguousQuestion(question: string): boolean {
  const ambiguousPatterns = [
    /\b(it|that|this|something|anything)\b/i,
    /\b(maybe|perhaps|might|could)\b/i,
    /\?.*\?/, // Multiple question marks
  ];

  const wordCount = question.split(/\s+/).length;
  const hasAmbiguousPattern = ambiguousPatterns.some((pattern) =>
    pattern.test(question)
  );

  return wordCount < 5 || hasAmbiguousPattern;
}

/**
 * Analyze question sentiment (Refinement #31 - Sentiment analysis)
 */
function analyzeQuestionSentiment(question: string): QuestionSentiment {
  const lower = question.toLowerCase();

  // Urgent indicators
  const urgentPatterns = [
    /urgent|emergency|immediately|asap|critical|now|quickly|help/i,
    /\!+/, // Exclamation marks
    /why.*(fail|error|wrong|problem|broken)/i,
  ];

  if (urgentPatterns.some((pattern) => pattern.test(lower))) {
    return "urgent";
  }

  // Exploratory indicators
  const exploratoryPatterns = [
    /could|would|might|perhaps|maybe|curious|wonder|interest/i,
    /what if|how about|tell me more|learn/i,
  ];

  if (exploratoryPatterns.some((pattern) => pattern.test(lower))) {
    return "exploratory";
  }

  return "neutral";
}

/**
 * Detect non-English language (Refinement #38 - Multi-language detection)
 */
function isNonEnglish(question: string): boolean {
  // Simple heuristic: check for common non-English characters and patterns
  const nonEnglishPatterns = [
    /[\u4E00-\u9FFF]/, // Chinese
    /[\u3040-\u309F\u30A0-\u30FF]/, // Japanese
    /[\u0400-\u04FF]/, // Cyrillic
    /[\u0600-\u06FF]/, // Arabic
    /[\u0590-\u05FF]/, // Hebrew
    /[àâäæçéèêëïîôùûüÿœ]/i, // French diacritics
    /[áéíóúñü]/i, // Spanish diacritics
  ];

  return nonEnglishPatterns.some((pattern) => pattern.test(question));
}

/**
 * Check if question involves multiple agent domains (Enhancement #10)
 */
function involvesMultipleDomains(question: string): {
  isMultiDomain: boolean;
  domains: AgentPersona[];
} {
  const lower = question.toLowerCase();
  const domains: AgentPersona[] = [];

  if (
    lower.includes("dispatch") ||
    lower.includes("battery") ||
    lower.includes("energy")
  ) {
    domains.push("operations");
  }
  if (
    lower.includes("trad") ||
    lower.includes("price") ||
    lower.includes("market")
  ) {
    domains.push("markets");
  }
  if (
    lower.includes("health") ||
    lower.includes("maintenance") ||
    lower.includes("sensor")
  ) {
    domains.push("sentinel");
  }
  if (
    lower.includes("constraint") ||
    lower.includes("safety") ||
    lower.includes("compliance")
  ) {
    domains.push("governor");
  }

  return {
    isMultiDomain: domains.length > 1,
    domains,
  };
}

/**
 * Calculate domain match score (Enhancement #1)
 */
function calculateDomainMatchScore(
  agent: AgentPersona,
  question: string,
  responseKey: string
): number {
  const lower = question.toLowerCase();

  // Agent expertise domains
  const expertiseDomains: Record<AgentPersona, string[]> = {
    operations: ["dispatch", "battery", "energy", "grid", "inverter", "soc"],
    markets: ["trad", "price", "liquid", "token", "swap", "portfolio"],
    sentinel: ["health", "maintenance", "sensor", "panel", "alert", "detect"],
    governor: ["constraint", "safety", "violation", "enforce", "compliance"],
  };

  const agentKeywords = expertiseDomains[agent];
  const matchCount = agentKeywords.filter((keyword) =>
    lower.includes(keyword)
  ).length;

  // Base score from keyword matches
  let score = Math.min(matchCount * 15, 60);

  // Bonus for exact response match (not default)
  if (responseKey !== "default") {
    score += 20;
  }

  // Penalty for out-of-domain questions
  const { isMultiDomain, domains } = involvesMultipleDomains(question);
  if (isMultiDomain && !domains.includes(agent)) {
    score -= 30;
  }

  return Math.max(30, Math.min(95, score)); // Clamp to 30-95
}

/**
 * Determine which agent to refer question to (Refinement #27 - Cross-agent references)
 */
function shouldReferToOtherAgent(
  agent: AgentPersona,
  question: string,
  multiDomainInfo: { isMultiDomain: boolean; domains: AgentPersona[] }
): { shouldRefer: boolean; referToAgent: AgentPersona | null } {
  // Don't refer for multi-domain questions (they're handled with coordination)
  if (multiDomainInfo.isMultiDomain) {
    return { shouldRefer: false, referToAgent: null };
  }

  const lower = question.toLowerCase();

  // Check if question is clearly out of domain
  const domainMismatch: Record<
    AgentPersona,
    { keywords: string[]; referTo: AgentPersona }[]
  > = {
    operations: [
      {
        keywords: ["price", "trade", "token", "market", "liquidity"],
        referTo: "markets",
      },
      {
        keywords: ["panel", "sensor", "maintenance", "diagnostic"],
        referTo: "sentinel",
      },
      {
        keywords: ["violation", "compliance", "governance", "override"],
        referTo: "governor",
      },
    ],
    markets: [
      {
        keywords: ["battery", "dispatch", "grid", "inverter"],
        referTo: "operations",
      },
      { keywords: ["sensor", "failure", "maintenance"], referTo: "sentinel" },
      { keywords: ["constraint", "safety", "regulation"], referTo: "governor" },
    ],
    sentinel: [
      { keywords: ["trade", "price", "swap", "portfolio"], referTo: "markets" },
      { keywords: ["dispatch", "energy", "optimize"], referTo: "operations" },
      {
        keywords: ["violation", "enforcement", "compliance"],
        referTo: "governor",
      },
    ],
    governor: [
      { keywords: ["market", "trade", "liquidity"], referTo: "markets" },
      {
        keywords: ["dispatch", "battery", "generation"],
        referTo: "operations",
      },
      { keywords: ["diagnostic", "sensor", "repair"], referTo: "sentinel" },
    ],
  };

  const mismatches = domainMismatch[agent];
  for (const mismatch of mismatches) {
    const matchCount = mismatch.keywords.filter((kw) =>
      lower.includes(kw)
    ).length;
    if (matchCount >= 2) {
      return { shouldRefer: true, referToAgent: mismatch.referTo };
    }
  }

  return { shouldRefer: false, referToAgent: null };
}

/**
 * Simulate agent workload (Refinement #34 - Agent workload simulation)
 */
function calculateAgentWorkload(agent: AgentPersona): {
  workload: "low" | "medium" | "high";
  confidencePenalty: number;
} {
  // Time-based workload (peak hours = higher load)
  const hour = new Date().getHours();
  const isPeakHours = hour >= 16 && hour <= 20;

  // Random workload simulation
  const workloadScore = Math.random() * 100;

  let workload: "low" | "medium" | "high";
  let confidencePenalty: number;

  if (isPeakHours) {
    // Peak hours: higher chance of high workload
    if (workloadScore < 30) {
      workload = "high";
      confidencePenalty = -15;
    } else if (workloadScore < 70) {
      workload = "medium";
      confidencePenalty = -8;
    } else {
      workload = "low";
      confidencePenalty = 0;
    }
  } else {
    // Off-peak hours: lower chance of high workload
    if (workloadScore < 10) {
      workload = "high";
      confidencePenalty = -10;
    } else if (workloadScore < 40) {
      workload = "medium";
      confidencePenalty = -5;
    } else {
      workload = "low";
      confidencePenalty = 0;
    }
  }

  return { workload, confidencePenalty };
}

/**
 * Get agent-specific data sources (Enhancement #2)
 */
function getAgentDataSources(agent: AgentPersona): string[] {
  const sources: Record<AgentPersona, string[]> = {
    operations: ["oracle:pyth", "sensor:battery-soc", "sensor:inverter-1"],
    markets: ["market:jupiter", "oracle:pyth", "oracle:switchboard"],
    sentinel: [
      "sensor:panel-array-a",
      "sensor:inverter-1",
      "sensor:tracker-motor-3",
    ],
    governor: [
      "blockchain:solana-rpc",
      "audit:compliance-log",
      "constraint:soc-minimum",
    ],
  };

  return sources[agent];
}

/**
 * Track individual source health (Refinement #33 - Data source health tracking)
 */
function getSourceHealthScores(
  sources: string[]
): Array<{ source: string; freshnessSec: number; reliability: number }> {
  return sources.map((source) => {
    // Simulate different freshness for different source types
    let freshnessSec: number;
    if (source.startsWith("oracle:")) {
      freshnessSec = Math.random() * PERFORMANCE.freshness.critical; // 0-10s
    } else if (source.startsWith("sensor:")) {
      freshnessSec = Math.random() * PERFORMANCE.freshness.warning; // 0-60s
    } else if (source.startsWith("market:")) {
      freshnessSec = Math.random() * 30; // 0-30s
    } else {
      freshnessSec = Math.random() * PERFORMANCE.freshness.stale; // 0-300s
    }

    // Reliability score (85-100%)
    const reliability = 85 + Math.random() * 15;

    return {
      source,
      freshnessSec: Math.floor(freshnessSec),
      reliability: Math.floor(reliability),
    };
  });
}

/**
 * Generate realistic data age (Enhancement #9)
 */
function generateDataAge(): number {
  const ages = [
    Math.random() * PERFORMANCE.freshness.critical, // 0-10s
    PERFORMANCE.freshness.critical + Math.random() * 20, // 10-30s
    PERFORMANCE.freshness.warning + Math.random() * 60, // 60-120s
  ];
  return Math.floor(ages[Math.floor(Math.random() * ages.length)]);
}

/**
 * Detect constraint-related questions (Enhancement #13, Refinement #35)
 */
function hasConstraintViolationContext(question: string): {
  hasViolation: boolean;
  severity: ConstraintSeverity;
  type: ConstraintType;
} {
  const lower = question.toLowerCase();
  const hasViolation =
    lower.includes("violation") ||
    lower.includes("exceed") ||
    lower.includes("breach") ||
    lower.includes("below minimum") ||
    lower.includes("above maximum");

  if (!hasViolation) {
    return { hasViolation: false, severity: "low", type: "operational" };
  }

  // Determine severity (Refinement #35)
  let severity: ConstraintSeverity = "medium";
  if (
    lower.includes("critical") ||
    lower.includes("emergency") ||
    lower.includes("safety")
  ) {
    severity = "critical";
  } else if (
    lower.includes("significant") ||
    lower.includes("major") ||
    lower.includes("urgent")
  ) {
    severity = "high";
  } else if (lower.includes("minor") || lower.includes("warning")) {
    severity = "low";
  }

  // Determine type
  let type: ConstraintType = "operational";
  if (
    lower.includes("safety") ||
    lower.includes("thermal") ||
    lower.includes("temperature")
  ) {
    type = "safety";
  } else if (
    lower.includes("compliance") ||
    lower.includes("regulatory") ||
    lower.includes("legal")
  ) {
    type = "regulatory";
  }

  return { hasViolation, severity, type };
}

/**
 * Check if agent is in maintenance (Enhancement #14)
 */
function isAgentInMaintenance(agent: AgentPersona): boolean {
  // Sentinel has 20% chance of being in maintenance
  return agent === "sentinel" && Math.random() < 0.2;
}

/**
 * Generate agent-specific proof hash (Enhancement #15)
 */
function generateAgentProofHash(agent: AgentPersona): string {
  const prefixes: Record<AgentPersona, string> = {
    operations: "sig", // Signature-based
    markets: "zk", // Zero-knowledge
    sentinel: "merkle", // Merkle proofs
    governor: "consensus", // Consensus proofs
  };

  const prefix = prefixes[agent];
  const hash = Array.from({ length: 60 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

  return `0x${prefix}${hash}`;
}

/**
 * Generate confidence explanation (Refinement #28 - Confidence transparency)
 */
function generateConfidenceExplanation(
  domainMatchScore: number,
  isAmbiguous: boolean,
  complexity: QuestionComplexity,
  isCached: boolean,
  workloadPenalty: number
): string {
  if (isCached) {
    return "High confidence (cached response from recent question)";
  }

  if (isAmbiguous) {
    return "Low confidence (question lacks specificity or context)";
  }

  const reasons: string[] = [];

  if (domainMatchScore >= 80) {
    reasons.push("strong domain match");
  } else if (domainMatchScore >= 60) {
    reasons.push("moderate domain match");
  } else {
    reasons.push("weak domain match");
  }

  if (complexity === "simple") {
    reasons.push("straightforward query");
  } else if (complexity === "complex") {
    reasons.push("complex multi-part question");
  }

  if (workloadPenalty < -10) {
    reasons.push("high agent workload");
  }

  const confidenceLevel =
    domainMatchScore >= 75 ? "High" : domainMatchScore >= 55 ? "Medium" : "Low";

  return `${confidenceLevel} confidence (${reasons.join(", ")})`;
}

/**
 * Generate error recovery suggestions (Refinement #30 - Error recovery)
 */
function generateErrorRecoverySuggestion(
  agent: AgentPersona,
  error: string
): string {
  const baseActions = [
    "Try rephrasing your question with more specific details",
    "Verify the conversation context and try again",
    "Check if you're asking the right agent for this question",
  ];

  if (error.includes("safety")) {
    return `Safety-critical query requires human verification. Next steps: 1) Contact system administrator, 2) Review safety protocols, 3) Wait for human approval before proceeding.`;
  }

  if (error.includes("synchronization")) {
    return `Data synchronization issue detected. Suggested action: Wait 10-15 seconds for systems to sync, then retry your question. If problem persists, check system status at /api/health.`;
  }

  const agentSpecific: Record<AgentPersona, string> = {
    operations:
      "For operational queries, ensure you're asking about current dispatch, battery management, or grid operations.",
    markets:
      "For market queries, specify whether you're asking about trading, pricing, or liquidity analysis.",
    sentinel:
      "For hardware queries, specify which system (panels, inverters, sensors) you're asking about.",
    governor:
      "For governance queries, specify whether you're asking about constraints, violations, or enforcement.",
  };

  return `${baseActions[Math.floor(Math.random() * baseActions.length)]}. ${agentSpecific[agent]}`;
}

/**
 * Calculate response quality score (Refinement #40 - Response quality self-assessment)
 */
function calculateResponseQuality(
  confidence: number,
  domainMatchScore: number,
  sourceCount: number,
  hasViolation: boolean,
  isAmbiguous: boolean
): number {
  let quality = 50; // Base score

  // Confidence contributes 30%
  quality += (confidence / 100) * 30;

  // Domain match contributes 25%
  quality += (domainMatchScore / 100) * 25;

  // Source count contributes 15%
  quality += Math.min((sourceCount / 5) * 15, 15);

  // Penalties
  if (isAmbiguous) quality -= 20;
  if (hasViolation) quality += 10; // Constraint awareness is good

  return Math.max(0, Math.min(100, Math.floor(quality)));
}

/**
 * Vary response phrasing for repeats (Refinement #32 - Response variation)
 */
function varyResponseForRepeat(
  responseText: string,
  repeatCount: number
): string {
  if (repeatCount === 0) return responseText;

  const variations = [
    `As I mentioned before, ${responseText.charAt(0).toLowerCase()}${responseText.slice(1)}`,
    `To reiterate: ${responseText}`,
    `Following up on your earlier question: ${responseText}`,
    `Just to confirm what I said previously: ${responseText}`,
  ];

  return variations[Math.min(repeatCount - 1, variations.length - 1)];
}

/**
 * Simulate API delay based on complexity (Enhancement #25, Refinement #36 - Smarter timing)
 */
async function simulateDelay(
  complexity: QuestionComplexity,
  isCached: boolean
): Promise<void> {
  // Refinement #36: Faster responses for cached queries
  if (isCached) {
    await new Promise((resolve) =>
      setTimeout(resolve, 50 + Math.random() * 100)
    ); // 50-150ms
    return;
  }

  const delays = {
    simple: 100 + Math.random() * 200, // 100-300ms
    moderate: 300 + Math.random() * 400, // 300-700ms
    complex: 600 + Math.random() * 600, // 600-1200ms
  };

  await new Promise((resolve) => setTimeout(resolve, delays[complexity]));
}

/**
 * Check for rate limiting (Enhancement #18)
 */
function shouldRateLimit(): boolean {
  // 2% chance of rate limiting for testing
  return Math.random() < 0.02;
}

// ============================================================================
// RESPONSE TEMPLATES (Enhanced with placeholders - Enhancement #19, #20, #22)
// ============================================================================

/**
 * Cross-agent reference responses (Refinement #27)
 */
const AGENT_REFERRAL_RESPONSES: Record<
  AgentPersona,
  Partial<Record<AgentPersona, string>>
> = {
  operations: {
    markets:
      "That question is better suited for the Markets agent, who specializes in trading strategy and token economics. I can give you a brief overview, but for detailed market analysis, I recommend asking the Markets agent directly.",
    sentinel:
      "For hardware diagnostics and sensor data, the Sentinel agent has comprehensive monitoring capabilities. While I can see high-level health metrics, Sentinel can provide detailed diagnostic analysis.",
    governor:
      "Questions about governance, compliance, and safety constraints are handled by the Governor agent. I operate within those constraints, but Governor can explain the regulatory framework in detail.",
  },
  markets: {
    operations:
      "That's more in the Operations agent's domain—they manage energy dispatch and battery optimization. I focus on market dynamics and trading. Consider asking Operations for detailed grid management questions.",
    sentinel:
      "Hardware health and maintenance scheduling are managed by the Sentinel agent. While market conditions affect our operational decisions, Sentinel has the detailed diagnostic data you're looking for.",
    governor:
      "Governance and regulatory compliance questions should be directed to the Governor agent, who enforces safety constraints and manages multi-sig approvals.",
  },
  sentinel: {
    operations:
      "Energy dispatch strategy questions are best answered by the Operations agent. While I monitor hardware health that affects operations, the actual dispatch optimization is their specialty.",
    markets:
      "For trading decisions and market analysis, the Markets agent is your best resource. I monitor hardware performance, but Markets handles all token economics and liquidity questions.",
    governor:
      "Safety constraint enforcement and governance procedures are managed by the Governor agent. I can report violations, but Governor enforces the rules and manages overrides.",
  },
  governor: {
    operations:
      "Operational questions about energy dispatch and battery management should go to the Operations agent. I enforce the constraints, but Operations makes the tactical decisions within those bounds.",
    markets:
      "Market strategy and trading execution questions are best directed to the Markets agent. I ensure trades comply with risk limits, but Markets determines the actual trading strategy.",
    sentinel:
      "For hardware diagnostics and maintenance details, the Sentinel agent is your go-to resource. I track constraint violations, but Sentinel monitors the physical infrastructure.",
  },
};

/**
 * Response templates with dynamic placeholders and persona voice consistency
 */
const AGENT_RESPONSES: Record<
  AgentPersona,
  Record<string, { text: string; confidence: "high" | "medium" | "low" }>
> = {
  operations: {
    default: {
      text: "I'm currently managing energy dispatch to optimize revenue while maintaining safety margins. Battery SOC is at {{batterySOC}}%, and we're exporting {{gridExport}}kW to the grid during this peak pricing window. All systems operating nominally.",
      confidence: "high",
    },
    dispatch: {
      text: "Current dispatch strategy prioritizes battery discharge during peak demand hours (4-8 PM) when grid prices are 30-40% above baseline. We're targeting {{targetPower}}kW output while maintaining {{minSOC}}% SOC reserve for grid stability events. This approach consistently delivers {{revenueGain}}% revenue improvement over baseline dispatch rules.",
      confidence: "high",
    },
    battery: {
      text: "Battery discharge rate was adjusted from {{prevRate}}kW to {{currentRate}}kW based on predictive modeling showing a 15-minute demand surge. This maximizes revenue capture while staying within thermal safety margins (current temp: {{inverterTemp}}°C, limit: 65°C). The decision integrates real-time grid demand forecasts and battery state-of-charge monitoring.",
      confidence: "high",
    },
    optimization: {
      text: "Peak demand optimization uses ensemble forecasting combining weather patterns, historical load curves, and real-time grid signals. Current strategy yields {{revenueGain}}% higher revenue compared to baseline dispatch rules. The model processes data from {{sensorCount}} sensors with {{updateFreq}}-second refresh intervals, enabling rapid adaptation to grid conditions.",
      confidence: "medium",
    },
    // Multi-domain coordination responses (Enhancement #10)
    coordination_markets: {
      text: "I'm coordinating with the Markets agent to optimize battery discharge timing for peak pricing. Current strategy: discharge {{dischargeRate}}kW during {{timeWindow}} when token prices are {{priceIncrease}}% above baseline. This cross-agent collaboration ensures we maximize both grid revenue and token value.",
      confidence: "high",
    },
    coordination_governor: {
      text: "Working with the Governor agent to balance energy dispatch within safety constraints. Current SOC at {{batterySOC}}% provides {{safetyMargin}}% margin above the {{minSOC}}% minimum threshold. All discharge operations require governance approval to maintain regulatory compliance.",
      confidence: "high",
    },
    // Low-confidence responses (Enhancement #6, #22)
    ambiguous: {
      text: "I'm not entirely certain about the specific context of your question. Could you clarify whether you're asking about current energy dispatch strategy, battery management, or grid export optimization? I can provide more accurate information with additional context.",
      confidence: "low",
    },
  },
  markets: {
    default: {
      text: "Trading decisions today are driven by strong SOLAR token momentum (+{{priceChange}}% over 24h) and favorable liquidity on Jupiter DEX. Portfolio is currently {{solarPercent}}% SOLAR, {{usdcPercent}}% USDC, with rebalancing threshold at 70/30. Market conditions are optimal for continued accumulation.",
      confidence: "high",
    },
    trading: {
      text: "Today's trading activity: {{tradeCount}} executed swaps totaling {{usdcAmount}} USDC → {{solarAmount}} SOLAR tokens at average rate of {{avgRate}} USDC per token. Jupiter aggregator provided {{rateBenefit}}% better execution vs Serum direct. All trades executed within {{slippage}}% slippage tolerance.",
      confidence: "high",
    },
    prediction: {
      text: "Price prediction uses ensemble models: LSTM for time-series trends (weight: 40%), order book depth analysis (30%), and correlated asset movements (30%). Current 6-hour forecast: {{confidence}}% confidence for continued uptrend to ${{priceRangeLow}}-{{priceRangeHigh}} range. Model accuracy over past 30 days: {{accuracy}}%.",
      confidence: "medium",
    },
    liquidity: {
      text: "Current liquidity situation is {{liquidityState}}: Jupiter SOLAR/USDC pool depth at ${{jupiterDepth}}K, Serum at ${{serumDepth}}K. Slippage for {{tradeSize}}K trade estimated at {{slippage}}%. Recommend trades under ${{maxTrade}}K for optimal execution. Liquidity has {{liquidityTrend}} {{trendPercent}}% over past 24 hours.",
      confidence: "high",
    },
    // Multi-domain coordination
    coordination_operations: {
      text: "Coordinating with Operations agent for synchronized sell timing during high generation periods. Current solar output at {{generation}}kW creates optimal arbitrage window. Planning {{tokenAmount}} SOLAR token sale when battery discharge reaches {{targetSOC}}% SOC.",
      confidence: "high",
    },
    ambiguous: {
      text: "Your question touches on several market aspects. Are you interested in current trading activity, price predictions, liquidity analysis, or portfolio rebalancing strategy? I can provide detailed insights once I understand your specific focus area.",
      confidence: "low",
    },
  },
  sentinel: {
    default: {
      text: "Hardware health is {{healthStatus}} across all systems. Panel Array A: {{arrayAHealth}}% efficiency, Array B: {{arrayBHealth}}% ({{degradationNote}}). Inverter 1 {{inverterStatus}}, {{alertCount}} alerts. {{sensorCount}} sensors reporting within normal parameters.",
      confidence: "high",
    },
    health: {
      text: "Solar panel health assessment: Array A performing at {{arrayAHealth}}% of rated capacity ({{arrayAGrade}}), Array B at {{arrayBHealth}}% with {{degradationRate}}% efficiency drop over past 30 days. Degradation consistent with normal aging patterns, no immediate action required. Thermal imaging shows uniform heat distribution across {{panelCount}} panels.",
      confidence: "high",
    },
    maintenance: {
      text: "Current maintenance status: {{alertCount}} pending alerts - Inverter 1 cooling fan showing {{vibrationIncrease}}% vibration increase (preventive maintenance window in {{maintenanceWindow}}h), Panel B junction box sector 3 hotspot detected ({{severity}}, scheduled inspection). All critical systems operational.",
      confidence: "medium",
    },
    detection: {
      text: "Equipment failure detection uses statistical process control with adaptive thresholds. System monitors {{sensorCount}} sensors every {{interval}} seconds, comparing against historical baselines adjusted for weather and load conditions. Anomaly detection sensitivity: {{tpRate}}% true positive rate, {{fpRate}}% false positive rate.",
      confidence: "high",
    },
    coordination_governor: {
      text: "Escalated critical battery temperature alert to Governor agent for safety enforcement. Current reading: {{batteryTemp}}°C (threshold: {{tempThreshold}}°C). Coordinating automatic shutdown protocols while maintaining grid stability commitments.",
      confidence: "high",
    },
    // Maintenance mode response (Enhancement #14)
    in_maintenance: {
      text: "Currently in scheduled maintenance mode. Hardware diagnostics running across {{systemCount}} subsystems. Estimated completion: {{timeRemaining}} minutes. Critical monitoring continues with reduced polling frequency. All safety systems remain fully operational.",
      confidence: "medium",
    },
    ambiguous: {
      text: "I need more specifics to provide accurate diagnostics. Are you asking about solar panel health, inverter status, sensor network integrity, or maintenance schedules? Each subsystem requires different diagnostic approaches.",
      confidence: "low",
    },
  },
  governor: {
    default: {
      text: "Governance status: All {{constraintCount}} active safety constraints within compliance bounds. {{violationCount}} violations in past 24 hours. Current parameters: SOC min {{minSOC}}%, discharge max {{maxDischarge}}kW, grid export max {{maxExport}}kW. Override authority: {{sigRequired}} of {{sigTotal}} multi-sig required.",
      confidence: "high",
    },
    constraints: {
      text: "Active safety constraints: (1) Battery SOC ≥{{minSOC}}% (current: {{currentSOC}}%), (2) Discharge rate ≤{{maxDischarge}}kW (current: {{currentDischarge}}kW), (3) Grid export ≤{{maxExport}}kW (current: {{currentExport}}kW), (4) Inverter temp ≤{{maxTemp}}°C (current: {{currentTemp}}°C), (5) Panel efficiency ≥{{minEfficiency}}% (current: {{currentEfficiency}}%), (6-8) Grid interconnection SLA parameters.",
      confidence: "high",
    },
    violations: {
      text: "Constraint violation history: {{violationCount}} event(s) in past 24 hours. Most recent: {{violationTime}} - Battery SOC briefly dropped to {{violationSOC}}% (below {{minSOC}}% minimum) during unexpected demand spike. Operations agent throttled automatically, SOC recovered to {{recoverySOC}}% within {{recoveryTime}} minutes. Full incident logged to immutable audit trail with transaction hash {{txHash}}.",
      confidence: "high",
    },
    enforcement: {
      text: "Operating limit enforcement uses hierarchical control: Soft limits trigger warnings ({{softThreshold}}% threshold), hard limits block actions ({{hardThreshold}}% threshold), emergency limits initiate automatic shutdowns ({{emergencyThreshold}}% threshold). All decisions require governance PDA approval via multi-sig consensus ({{sigRequired}}/{{sigTotal}}).",
      confidence: "high",
    },
    coordination_operations: {
      text: "Enforcing discharge limits in coordination with Operations agent during low SOC event. Current SOC at {{currentSOC}}% requires throttling to maintain {{minSOC}}% safety threshold. Override request pending multi-sig approval ({{currentSigs}}/{{sigRequired}} signatures received).",
      confidence: "high",
    },
    ambiguous: {
      text: "Governance queries require specific context. Are you asking about active constraint parameters, violation history, enforcement mechanisms, or override procedures? Each area has distinct compliance and audit requirements.",
      confidence: "low",
    },
  },
};

/**
 * Persona-specific error messages (Refinement #37)
 */
const AGENT_ERROR_MESSAGES: Record<
  AgentPersona,
  { technical: string; general: string }
> = {
  operations: {
    technical:
      "Data pipeline disruption detected. Energy flow calculations temporarily unavailable. Fallback to manual dispatch protocols.",
    general:
      "I'm experiencing difficulty accessing real-time operational data. Let me know if you need critical dispatch information, and I'll escalate to manual review.",
  },
  markets: {
    technical:
      "Market data feed latency exceeded acceptable thresholds. Price oracle synchronization in progress. Trading recommendations temporarily suspended.",
    general:
      "Market data is currently out of sync. I can provide general strategy insights, but real-time trading decisions require fresh data. Please retry in 30-60 seconds.",
  },
  sentinel: {
    technical:
      "Sensor network communication fault. Hardware telemetry collection interrupted. Diagnostics running on {{systemCount}} subsystems.",
    general:
      "I'm having trouble reaching some sensor systems. Critical monitoring continues, but detailed diagnostics are limited right now. Please specify if this is urgent.",
  },
  governor: {
    technical:
      "Governance consensus protocol timeout. Multi-sig verification pending. Constraint enforcement remains active via failsafe mechanisms.",
    general:
      "I'm experiencing delays in governance data validation. Safety constraints remain enforced, but detailed violation history may be incomplete. Critical queries will be escalated.",
  },
};

// ============================================================================
// EXPANDED KEYWORD MATCHING (Enhancement #16)
// ============================================================================

/**
 * Enhanced keyword matching with synonyms and context
 */
function matchQuestionToResponse(
  agent: AgentPersona,
  question: string,
  multiDomainInfo: { isMultiDomain: boolean; domains: AgentPersona[] }
): string {
  const lower = question.toLowerCase();

  // Check for multi-domain coordination first (Enhancement #10)
  if (multiDomainInfo.isMultiDomain) {
    const otherDomains = multiDomainInfo.domains.filter((d) => d !== agent);
    if (otherDomains.length > 0) {
      const coordinationKey = `coordination_${otherDomains[0]}`;
      if (
        AGENT_RESPONSES[agent][
          coordinationKey as keyof (typeof AGENT_RESPONSES)[typeof agent]
        ]
      ) {
        return coordinationKey;
      }
    }
  }

  // Check for ambiguous questions (Enhancement #6)
  if (isAmbiguousQuestion(question)) {
    return "ambiguous";
  }

  // Maintenance mode (Enhancement #14)
  if (agent === "sentinel" && isAgentInMaintenance(agent)) {
    return "in_maintenance";
  }

  // Expanded keyword matching with synonyms
  const keywordPatterns: Record<string, RegExp[]> = {
    dispatch: [/dispatch|strategy|plan|schedul/i],
    battery: [/battery|discharge|charg|soc|state.of.charge/i],
    optimization: [/optimi[sz]|peak|efficienc|improv/i],
    trading: [/trad|swap|execut|buy|sell|transaction/i],
    prediction: [/predict|forecast|expect|will.*happen|future/i],
    liquidity: [/liquid|depth|pool|slippage/i],
    health: [/health|status|condition|performance/i],
    maintenance: [/maintenance|repair|alert|servic/i],
    detection: [/detect|identif|recogni|diagnos|failure/i],
    constraints: [/constraint|limit|threshold|parameter|active/i],
    violations: [/violation|breach|exceed|fail.*comply/i],
    enforcement: [/enforce|control|govern|regulat/i],
  };

  for (const [key, patterns] of Object.entries(keywordPatterns)) {
    if (patterns.some((pattern) => pattern.test(lower))) {
      if (
        AGENT_RESPONSES[agent][
          key as keyof (typeof AGENT_RESPONSES)[typeof agent]
        ]
      ) {
        return key;
      }
    }
  }

  return "default";
}

// ============================================================================
// PLACEHOLDER SUBSTITUTION (Enhancement #19, #21)
// ============================================================================

/**
 * Generate dynamic placeholder values based on time of day and agent
 */
function generatePlaceholderValues(
  agent: AgentPersona
): Record<string, string> {
  const hour = new Date().getHours();
  const isPeakHours = hour >= 16 && hour <= 20; // 4-8 PM

  // Time-aware base values (Enhancement #21)
  const batterySOC = isPeakHours
    ? (65 + Math.random() * 20).toFixed(0)
    : (75 + Math.random() * 15).toFixed(0);
  const gridExport = isPeakHours
    ? (40 + Math.random() * 30).toFixed(0)
    : (20 + Math.random() * 20).toFixed(0);
  const generation = isPeakHours
    ? (150 + Math.random() * 50).toFixed(0)
    : hour >= 7 && hour <= 19
      ? (100 + Math.random() * 80).toFixed(0)
      : (5 + Math.random() * 15).toFixed(0);

  return {
    // Common values
    batterySOC,
    gridExport,
    generation,
    minSOC: "20",
    targetPower: "180",
    revenueGain: (10 + Math.random() * 8).toFixed(1),
    sensorCount: "47",
    updateFreq: "10",

    // Operations-specific
    prevRate: "120",
    currentRate: "180",
    inverterTemp: (48 + Math.random() * 10).toFixed(0),
    dischargeRate: (140 + Math.random() * 40).toFixed(0),
    timeWindow: isPeakHours ? "4-8 PM" : "off-peak hours",
    priceIncrease: (25 + Math.random() * 20).toFixed(0),
    safetyMargin: (((parseFloat(batterySOC) - 20) / 20) * 100).toFixed(0),

    // Markets-specific
    priceChange: (5 + Math.random() * 6).toFixed(1),
    solarPercent: (60 + Math.random() * 15).toFixed(0),
    usdcPercent: (25 + Math.random() * 15).toFixed(0),
    tradeCount: (2 + Math.floor(Math.random() * 4)).toString(),
    usdcAmount: (1000 + Math.random() * 1000).toFixed(0),
    solarAmount: (240 + Math.random() * 200).toFixed(0),
    avgRate: (3.8 + Math.random() * 0.8).toFixed(2),
    rateBenefit: (1.5 + Math.random() * 2).toFixed(1),
    slippage: (0.5 + Math.random() * 1).toFixed(1),
    confidence: (80 + Math.random() * 15).toFixed(0),
    priceRangeLow: (4.2 + Math.random() * 0.5).toFixed(2),
    priceRangeHigh: (4.6 + Math.random() * 0.5).toFixed(2),
    accuracy: (82 + Math.random() * 12).toFixed(0),
    liquidityState: Math.random() > 0.3 ? "favorable" : "adequate",
    jupiterDepth: (750 + Math.random() * 300).toFixed(0),
    serumDepth: (350 + Math.random() * 200).toFixed(0),
    tradeSize: "10",
    maxTrade: "25",
    liquidityTrend: Math.random() > 0.5 ? "increased" : "decreased",
    trendPercent: (3 + Math.random() * 8).toFixed(1),
    tokenAmount: (300 + Math.random() * 200).toFixed(0),
    targetSOC: (70 + Math.random() * 15).toFixed(0),

    // Sentinel-specific
    healthStatus: Math.random() > 0.2 ? "nominal" : "degraded",
    arrayAHealth: (96 + Math.random() * 3).toFixed(0),
    arrayBHealth: (90 + Math.random() * 4).toFixed(0),
    degradationNote:
      Math.random() > 0.5 ? "slight degradation noted" : "within normal range",
    inverterStatus: Math.random() > 0.15 ? "operational" : "maintenance mode",
    alertCount: Math.floor(Math.random() * 3).toString(),
    arrayAGrade: "excellent",
    degradationRate: (1.0 + Math.random() * 0.5).toFixed(1),
    panelCount: "240",
    vibrationIncrease: (12 + Math.random() * 8).toFixed(0),
    maintenanceWindow: (36 + Math.random() * 24).toFixed(0),
    severity: Math.random() > 0.3 ? "non-critical" : "moderate",
    interval: "10",
    tpRate: (93 + Math.random() * 5).toFixed(0),
    fpRate: (1.5 + Math.random() * 1.5).toFixed(1),
    batteryTemp: (58 + Math.random() * 8).toFixed(0),
    tempThreshold: "65",
    systemCount: "12",
    timeRemaining: (8 + Math.random() * 15).toFixed(0),

    // Governor-specific
    constraintCount: "8",
    violationCount: Math.floor(Math.random() * 2).toString(),
    maxDischarge: "50",
    maxExport: "150",
    sigRequired: "3",
    sigTotal: "5",
    currentSOC: batterySOC,
    currentDischarge: (35 + Math.random() * 20).toFixed(0),
    currentExport: gridExport,
    maxTemp: "65",
    currentTemp: (48 + Math.random() * 10).toFixed(0),
    minEfficiency: "85",
    currentEfficiency: (92 + Math.random() * 6).toFixed(0),
    violationTime: new Date(
      Date.now() - Math.random() * 86400000
    ).toLocaleString("en-US", { timeZone: "UTC", hour12: false }),
    violationSOC: (16 + Math.random() * 3).toFixed(0),
    recoverySOC: (21 + Math.random() * 3).toFixed(0),
    recoveryTime: (4 + Math.random() * 3).toFixed(0),
    txHash: `0x${Math.random().toString(16).substr(2, 12)}...`,
    softThreshold: "80",
    hardThreshold: "95",
    emergencyThreshold: "100",
    currentSigs: Math.floor(Math.random() * 3).toString(),
  };
}

/**
 * Substitute placeholders in response text
 */
function substitutePlaceholders(
  text: string,
  values: Record<string, string>
): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key] || match;
  });
}

// ============================================================================
// MAIN API HANDLER (Enhanced with all 25 improvements)
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Enhancement #18: Rate limiting simulation
    if (shouldRateLimit()) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again in 60 seconds.",
          retryAfter: 60,
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": "100",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await request.json();
    const { agent, question, conversationId } = body;

    // Validate agent
    if (
      !agent ||
      !["operations", "markets", "sentinel", "governor"].includes(agent)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid agent. Must be one of: operations, markets, sentinel, governor",
        },
        { status: 400 }
      );
    }

    // Validate question
    if (
      !question ||
      typeof question !== "string" ||
      question.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Question is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Refinement #38: Multi-language detection
    if (isNonEnglish(question)) {
      return NextResponse.json(
        {
          error: "Language not supported",
          message:
            "This agent responds in English only. Please translate your question to English and try again.",
          suggestedAction:
            "Use a translation service to convert your question to English",
        },
        { status: 400 }
      );
    }

    // Refinement #26, #32, #39: Check conversation cache
    const cacheInfo = findCachedQuestion(
      conversationId || `conv-${Date.now()}`,
      question
    );

    // Enhancement #11: Question complexity scoring
    const complexity = calculateQuestionComplexity(question);

    // Refinement #36: Smarter timing with cache awareness
    await simulateDelay(complexity, cacheInfo.isCached);

    // Enhancement #24: Classify question intent
    const intent = classifyQuestionIntent(question);

    // Refinement #31: Sentiment analysis
    const sentiment = analyzeQuestionSentiment(question);

    // Enhancement #10: Detect multi-domain questions
    const multiDomainInfo = involvesMultipleDomains(question);

    // Refinement #27: Check for cross-agent referrals
    const referralInfo = shouldReferToOtherAgent(
      agent as AgentPersona,
      question,
      multiDomainInfo
    );

    // If should refer to another agent, provide referral response
    if (referralInfo.shouldRefer && referralInfo.referToAgent) {
      const referralMessage =
        AGENT_REFERRAL_RESPONSES[agent as AgentPersona][
          referralInfo.referToAgent
        ] ||
        `For that type of question, I recommend consulting the ${referralInfo.referToAgent.charAt(0).toUpperCase() + referralInfo.referToAgent.slice(1)} agent, who has specialized expertise in that area.`;

      return NextResponse.json(
        {
          data: generateMockAgentMessage(
            "agent",
            agent as AgentPersona,
            referralMessage,
            {
              timestamp: new Date(),
              confidence: 70,
              sources: getAgentDataSources(agent as AgentPersona),
              isStreaming: false,
            }
          ),
          conversationId: conversationId || `conv-${Date.now()}`,
          metadata: {
            shouldReferTo: referralInfo.referToAgent,
            referralReason: "Question outside primary expertise domain",
            sourceProvenance: [`referral:${referralInfo.referToAgent}`],
            freshnessSec: 0,
            traceId: `trace-${Date.now()}`,
          },
        },
        {
          headers: {
            "Cache-Control": "no-store",
            "X-Data-Source": "referral",
            "X-Refer-To": referralInfo.referToAgent,
          },
        }
      );
    }

    // Enhancement #16: Enhanced keyword matching
    const responseKey = matchQuestionToResponse(
      agent as AgentPersona,
      question,
      multiDomainInfo
    );

    // Get response template
    const responseTemplate =
      AGENT_RESPONSES[agent as AgentPersona][
        responseKey as keyof (typeof AGENT_RESPONSES)[AgentPersona]
      ] || AGENT_RESPONSES[agent as AgentPersona].default;

    // Enhancement #19: Substitute dynamic placeholders
    const placeholderValues = generatePlaceholderValues(agent as AgentPersona);
    let responseText = substitutePlaceholders(
      responseTemplate.text,
      placeholderValues
    );

    // Refinement #32: Vary response for repeat questions
    if (cacheInfo.isRepeat && cacheInfo.count > 1) {
      responseText = varyResponseForRepeat(responseText, cacheInfo.count);
    }

    // Enhancement #1: Dynamic confidence scoring
    const domainMatchScore = calculateDomainMatchScore(
      agent as AgentPersona,
      question,
      responseKey
    );

    // Refinement #34: Agent workload simulation
    const workloadInfo = calculateAgentWorkload(agent as AgentPersona);

    // Enhancement #6: Low-confidence scenarios
    const isAmbiguous = isAmbiguousQuestion(question);
    const baseConfidence = isAmbiguous
      ? 30 + Math.random() * 15 // 30-45% for ambiguous
      : cacheInfo.isCached
        ? 85 + Math.random() * 10 // 85-95% for cached
        : responseTemplate.confidence === "high"
          ? domainMatchScore
          : responseTemplate.confidence === "medium"
            ? Math.min(domainMatchScore - 10, 75)
            : Math.min(domainMatchScore - 20, 60);

    // Enhancement #11: Complexity adjustment
    const complexityAdjustment =
      complexity === "simple" ? 5 : complexity === "moderate" ? 0 : -5;

    // Enhancement #17: Conversation history bonus
    const historyBonus =
      conversationId && conversationId.startsWith("conv-") ? 3 : 0;

    // Refinement #34: Workload penalty
    const workloadPenalty = workloadInfo.confidencePenalty;

    const finalConfidence = Math.max(
      30,
      Math.min(
        95,
        baseConfidence + complexityAdjustment + historyBonus + workloadPenalty
      )
    );

    // Refinement #28: Confidence explanation
    const confidenceExplanation = generateConfidenceExplanation(
      domainMatchScore,
      isAmbiguous,
      complexity,
      cacheInfo.isCached,
      workloadPenalty
    );

    // Enhancement #2: Multi-source data attribution
    const dataSources = getAgentDataSources(agent as AgentPersona);

    // Refinement #33: Individual source health scores
    const sourceHealthScores = getSourceHealthScores(dataSources);

    // Enhancement #8: Multi-source validation (more sources = higher confidence)
    const sourceCount = multiDomainInfo.isMultiDomain
      ? dataSources.length + 1
      : dataSources.length;

    // Enhancement #9: Temporal freshness
    const dataAge = generateDataAge();
    const trustDecay = calculateMockTrustDecay(dataAge);

    // Enhancement #3: Trust mathematics integration
    const trustMath = generateMockTrustMathematics(
      finalConfidence,
      dataSources
    );

    // Enhancement #5: Agent health status (with workload awareness)
    const agentHealth = generateMockAgentHealth(agent as AgentPersona, {
      forceThinking:
        complexity === "complex" || workloadInfo.workload === "high",
      forceLowConfidence: isAmbiguous,
    });

    // Enhancement #14: Maintenance mode awareness
    const inMaintenance = isAgentInMaintenance(agent as AgentPersona);

    // Refinement #28: Operational status
    const operationalStatus: OperationalStatus = inMaintenance
      ? "maintenance"
      : agentHealth === "offline"
        ? "fault"
        : agentHealth === "error"
          ? "degraded"
          : workloadInfo.workload === "high"
            ? "degraded"
            : workloadInfo.workload === "medium"
              ? "nominal"
              : "optimal";

    // Enhancement #4: Streaming simulation for long responses
    const isStreaming = responseText.length > 500 && Math.random() < 0.3;

    // Refinement #35: Enhanced constraint violation detection with severity
    const constraintInfo = hasConstraintViolationContext(question);

    // Enhancement #15: Agent-specific proof hash
    const proofHash = generateAgentProofHash(agent as AgentPersona);

    // Enhancement #7 + Refinement #37: Error simulation with persona-specific messages
    let errorResponse = undefined;
    let errorRecovery = undefined;
    if (Math.random() < 0.03) {
      // 3% error rate
      const isCritical =
        question.toLowerCase().includes("safety") ||
        question.toLowerCase().includes("emergency");

      // Refinement #37: Use persona-specific error messages
      const errorMessages = AGENT_ERROR_MESSAGES[agent as AgentPersona];
      errorResponse = isCritical
        ? "Critical safety query requires human verification"
        : errorMessages.general;

      // Refinement #30: Error recovery suggestions
      errorRecovery = generateErrorRecoverySuggestion(
        agent as AgentPersona,
        errorResponse
      );
    }

    // Refinement #40: Response quality self-assessment
    const responseQuality = calculateResponseQuality(
      finalConfidence,
      domainMatchScore,
      sourceCount,
      constraintInfo.hasViolation,
      isAmbiguous
    );

    // Refinement #39: Update conversation cache
    updateConversationCache(
      conversationId || `conv-${Date.now()}`,
      question,
      responseKey
    );

    // Generate response message with all enhancements
    const response = generateMockAgentMessage(
      "agent",
      agent as AgentPersona,
      responseText,
      {
        timestamp: new Date(),
        confidence: finalConfidence,
        sources: dataSources,
        isStreaming,
        error: errorResponse,
      }
    );

    // Enhancement #23: Provenance as array
    const provenanceArray = multiDomainInfo.isMultiDomain
      ? [...dataSources, `coordination:${multiDomainInfo.domains.join("+")}`]
      : dataSources;

    // Refinement #39: Question history tracking
    const conversation = conversationCache.get(
      conversationId || `conv-${Date.now()}`
    );
    const questionHistory = conversation
      ? {
          questionCount: conversation.questions.length,
          topicFrequency: conversation.questions
            .map((q) => q.responseKey)
            .reduce(
              (acc, key) => {
                acc[key] = (acc[key] || 0) + 1;
                return acc;
              },
              {} as Record<string, number>
            ),
        }
      : null;

    return NextResponse.json(
      {
        data: response,
        conversationId: conversationId || `conv-${Date.now()}`,
        // Enhanced metadata with all 40 refinements
        metadata: {
          // Enhancement #23: Array of sources
          sourceProvenance: provenanceArray,
          // Enhancement #9 + Refinement #33: Freshness tracking with source health
          freshnessSec: dataAge,
          trustDecayPercent: trustDecay.toFixed(1),
          sourceHealthScores, // Refinement #33
          // Enhancement #3: Trust mathematics
          trustMathematics: trustMath,
          // Enhancement #5 + Refinement #28: Agent health + operational status
          agentHealth,
          operationalStatus, // Refinement #28
          // Enhancement #24 + Refinement #31: Question intent + sentiment
          questionIntent: intent,
          questionSentiment: sentiment, // Refinement #31
          // Enhancement #11 + Refinement #34: Complexity + workload
          questionComplexity: complexity,
          agentWorkload: workloadInfo.workload, // Refinement #34
          // Refinement #35: Enhanced constraint violations with severity
          hasConstraintViolations: constraintInfo.hasViolation,
          constraintSeverity: constraintInfo.hasViolation
            ? constraintInfo.severity
            : null,
          constraintType: constraintInfo.hasViolation
            ? constraintInfo.type
            : null,
          // Enhancement #14: Maintenance
          isInMaintenance: inMaintenance,
          // Enhancement #15: Proof hash
          zkProofHash: proofHash,
          // Enhancement #10: Multi-domain coordination
          isMultiDomainQuery: multiDomainInfo.isMultiDomain,
          involvedDomains: multiDomainInfo.domains,
          // Enhancement #8: Source validation
          sourceCount,
          // Enhancement #1: Domain match score
          domainMatchScore: domainMatchScore.toFixed(1),
          // Refinement #26: Cache awareness
          isCachedResponse: cacheInfo.isCached,
          repeatCount: cacheInfo.count,
          // Refinement #28: Confidence explanation
          confidenceExplanation, // Refinement #28
          // Refinement #30: Error recovery
          errorRecoverySuggestion: errorRecovery, // Refinement #30
          // Refinement #40: Response quality self-assessment
          responseQualityScore: responseQuality, // Refinement #40
          // Refinement #39: Question history tracking
          questionHistory: questionHistory || {
            questionCount: 1,
            topicFrequency: { [responseKey]: 1 },
          },
          traceId: `trace-${Date.now()}`,
        },
      },
      {
        headers: {
          "Cache-Control": cacheInfo.isCached
            ? "private, max-age=300"
            : "no-store", // Refinement #36
          "X-Data-Source": "mock",
          "X-Agent-Health": agentHealth,
          "X-Operational-Status": operationalStatus, // Refinement #28
          "X-Trust-Grade": trustMath.trustGrade,
          "X-Cached": cacheInfo.isCached ? "true" : "false", // Refinement #26
          "X-Workload": workloadInfo.workload, // Refinement #34
        },
      }
    );
  } catch (error) {
    console.error("Agent Q&A API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process agent query",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
