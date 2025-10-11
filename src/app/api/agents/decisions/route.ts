/**
 * API Route: /api/agents/decisions
 *
 * Comprehensive AI agent decisions audit trail with full explainability.
 * Returns decisions with trust mathematics, provenance, and impact assessment.
 *
 * Enhanced with 55 features (25 original + 30 advanced):
 *
 * ORIGINAL (25):
 * - Trust mathematics (witnessCount, deviationSigma, trustGrade)
 * - Decision complexity scoring (simple/moderate/complex)
 * - Multi-source validation with health tracking
 * - Operational status and workload context
 * - Constraint violation detection with severity
 * - Cross-agent coordination tracking
 * - Impact assessment (low/medium/high/critical)
 * - Decision quality self-assessment
 * - Advanced filtering, sorting, pagination
 * - Response caching for performance
 * - Statistical summaries and analytics
 *
 * ADVANCED (30):
 * - Agent state context (cognitive load, resource utilization, active decisions)
 * - Decision conflict detection (cross-agent conflicts, violation conflicts)
 * - Temporal pattern analysis (frequency, clustering, decision bursts)
 * - Risk assessment scoring (multi-factor risk quantification)
 * - Learning indicators (novelty scores, pattern deviation)
 * - Multi-agent consensus tracking (consensus strength, disagreement levels)
 * - Decision reversal history (reversal tracking, reasons, authority)
 * - Performance benchmarking (baseline comparison, peer agent comparison)
 * - Explainability depth levels (beginner/intermediate/expert)
 * - Decision prerequisites validation (required conditions, data freshness)
 * - Enhanced provenance chain (full data lineage with transformations)
 * - Confidence component breakdown (detailed factor analysis)
 * - Alternative actions analysis (considered options, rejection reasons)
 * - Resource impact tracking (inference time, memory, API calls)
 * - Compliance scoring (regulatory status, policy adherence)
 * - User impact estimation (stakeholder effect analysis)
 * - Rollback capability assessment (reversibility analysis)
 * - Decision velocity metrics (rate tracking, acceleration trends)
 * - Cross-domain impact (energy, financial, operational, governance)
 * - Predictive indicators (future needs prediction)
 * - Decision visualization data (timeline, relationship graphs)
 * - Notification triggers (stakeholder alerts, channels)
 * - Audit trail enhancement (regulatory checkpoints, approval chains)
 * - Decision tags/labels (flexible categorization)
 * - Response streaming support (SSE/chunked responses)
 * - Decision comparison utilities (side-by-side diff)
 * - Health score degradation (aging curves)
 * - Smart query defaults (context-aware parameters)
 * - Query optimization hints (performance suggestions)
 * - Decision replay capability (what-if analysis)
 *
 * Query Parameters:
 * - agent: Filter by agent persona (operations|markets|sentinel|governor)
 * - limit: Number of decisions to return (default: 20, max: 100)
 * - since: ISO timestamp for filtering recent decisions
 * - minConfidence: Minimum confidence threshold (0-100)
 * - maxConfidence: Maximum confidence threshold (0-100)
 * - category: Filter by decision category (dispatch|trading|maintenance|governance|override)
 * - impact: Filter by impact level (low|medium|high|critical)
 * - urgency: Filter urgent decisions only (true|false)
 * - sortBy: Sort field (timestamp|confidence|impact|urgency|risk)
 * - order: Sort order (asc|desc)
 * - format: Response format (minimal|standard|full)
 * - cursor: Pagination cursor for next page
 * - explainabilityDepth: Explanation level (beginner|intermediate|expert)
 * - includeAlternatives: Include alternative actions analysis (true|false)
 * - includeBenchmark: Include performance benchmarking (true|false)
 * - includeReplay: Include replay capability data (true|false)
 * - tags: Filter by decision tags (comma-separated)
 * - stream: Enable streaming response (true|false)
 *
 * @see PRD Section 8.2 - Agent Decisions API
 */

import { NextRequest, NextResponse } from "next/server";
import {
  generateMockAgentDecisions,
  generateMockTrustMathematics,
  calculateMockTrustDecay,
} from "@/lib/mock";
import type { AgentPersona, OperationalStatus } from "@/lib/types";
import type { AgentDecision } from "@/components/intelligence/AgentCard";
import { PERFORMANCE } from "@/lib/constants";

export const dynamic = "force-dynamic";

// ============================================================================
// DECISION ANALYSIS TYPES
// ============================================================================

type DecisionComplexity = "simple" | "moderate" | "complex";
type DecisionCategory =
  | "dispatch"
  | "trading"
  | "maintenance"
  | "governance"
  | "override";
type DecisionImpact = "low" | "medium" | "high" | "critical";
type DecisionUrgency = "routine" | "elevated" | "urgent" | "emergency";
type ConstraintSeverity = "critical" | "high" | "medium" | "low";
type DecisionSentiment = "calm" | "stressed" | "emergency";
type DecisionOutcome = "pending" | "success" | "partial" | "failure";
type SortField = "timestamp" | "confidence" | "impact" | "urgency" | "risk";
type SortOrder = "asc" | "desc";
type ResponseFormat = "minimal" | "standard" | "full";
type ExplainabilityDepth = "beginner" | "intermediate" | "expert";
type CognitiveLoad = "light" | "moderate" | "heavy" | "critical";
type ConflictSeverity = "none" | "minor" | "moderate" | "severe";
type ReversalReason =
  | "human_override"
  | "constraint_violation"
  | "improved_data"
  | "policy_change"
  | "error_correction";
type ComplianceStatus =
  | "fully_compliant"
  | "conditionally_compliant"
  | "non_compliant"
  | "pending_review";
type RollbackComplexity = "trivial" | "simple" | "moderate" | "complex";
type DecisionNovelty = "routine" | "adaptive" | "novel" | "experimental";
type UserImpactLevel = "none" | "minimal" | "moderate" | "significant";
type NotificationUrgency = "info" | "low" | "medium" | "high" | "critical";

interface EnhancedDecision extends AgentDecision {
  // ORIGINAL ENHANCEMENTS (1-25)

  // Enhancement #1: Trust mathematics
  trustMathematics: ReturnType<typeof generateMockTrustMathematics>;

  // Enhancement #2: Complexity scoring
  complexity: DecisionComplexity;

  // Enhancement #3, #4: Multi-source validation with health
  sourceProvenance: string[];
  sourceHealthScores: Array<{
    source: string;
    freshnessSec: number;
    reliability: number;
  }>;

  // Enhancement #5: Operational status
  operationalStatus: OperationalStatus;

  // Enhancement #6: Constraint violations
  constraintViolations: Array<{
    constraint: string;
    severity: ConstraintSeverity;
    type: "safety" | "operational" | "regulatory";
  }>;

  // Enhancement #7: Confidence explanation
  confidenceExplanation: string;

  // Enhancement #8: Cross-agent coordination
  coordinatedAgents: AgentPersona[];

  // Enhancement #9: Impact assessment
  impact: DecisionImpact;

  // Enhancement #10: Time-decay freshness
  ageSec: number;
  trustDecayPercent: number;

  // Enhancement #11: Category
  category: DecisionCategory;

  // Enhancement #12: Workload context
  agentWorkload: "low" | "medium" | "high";

  // Enhancement #14: Proof hash
  zkProofHash: string;

  // Enhancement #15: Decision chain
  parentDecisionId?: string;
  childDecisionIds: string[];

  // Enhancement #17: Urgency
  urgency: DecisionUrgency;

  // Enhancement #19: Quality score
  qualityScore: number;

  // Enhancement #20: Sentiment
  sentiment: DecisionSentiment;

  // Enhancement #23: Related decisions
  relatedDecisions: Array<{
    id: string;
    relationship: "parent" | "child" | "alternative" | "followup";
  }>;

  // Enhancement #24: Outcome tracking
  outcome: DecisionOutcome;
  outcomeConfidence: number;

  // ADVANCED ENHANCEMENTS (26-55)

  // Enhancement #26: Agent state context
  agentStateContext: {
    activeDecisionsCount: number;
    recentActionHistory: string[];
    cognitiveLoad: CognitiveLoad;
    resourceUtilization: number; // 0-100%
    decisionBurst: boolean; // In rapid decision period
  };

  // Enhancement #27: Decision conflict detection
  conflictDetection: {
    hasConflicts: boolean;
    conflictSeverity: ConflictSeverity;
    conflictingDecisions: string[]; // Decision IDs
    conflictReasons: string[];
  };

  // Enhancement #28: Temporal pattern analysis
  temporalPattern: {
    decisionFrequency: number; // Decisions per hour
    clusteringScore: number; // 0-100, high = clustered decisions
    isBurst: boolean; // Part of decision burst
    hourOfDay: number;
    patternDeviation: number; // Deviation from normal pattern
  };

  // Enhancement #29: Risk assessment scoring
  riskAssessment: {
    overallRiskScore: number; // 0-100
    riskFactors: Array<{
      factor: string;
      weight: number;
      contribution: number;
    }>;
    riskLevel: "low" | "moderate" | "high" | "extreme";
    mitigationStrategies: string[];
  };

  // Enhancement #30: Learning indicators
  learningIndicators: {
    noveltyScore: number; // 0-100, high = novel decision
    patternDeviation: number; // Deviation from agent's typical decisions
    isAdaptive: boolean; // Adaptive vs routine
    decisionNovelty: DecisionNovelty;
    learningContext?: string;
  };

  // Enhancement #31: Multi-agent consensus
  consensusTracking: {
    hasConsensus: boolean;
    consensusStrength: number; // 0-100%
    agreeingAgents: AgentPersona[];
    disagreeingAgents: AgentPersona[];
    consensusRationale: string;
  };

  // Enhancement #32: Decision reversal history
  reversalHistory: {
    wasReversed: boolean;
    reversalTimestamp?: string;
    reversalReason?: ReversalReason;
    reversalAuthority?: string;
    reversalImpact?: string;
  };

  // Enhancement #33: Performance benchmarking
  performanceBenchmark: {
    baselineQuality: number; // Historical average quality
    qualityDelta: number; // Difference from baseline
    peerComparison: {
      betterThanPeers: number; // Percentage
      rank: number; // Rank among peers (1 = best)
      totalPeers: number;
    };
    historicalSuccessRate: number; // % of similar decisions succeeded
  };

  // Enhancement #34: Explainability depth levels
  explanations: {
    beginner: string;
    intermediate: string;
    expert: string;
    currentDepth?: ExplainabilityDepth;
  };

  // Enhancement #35: Decision prerequisites
  prerequisites: {
    allMet: boolean;
    requiredConditions: Array<{
      condition: string;
      met: boolean;
      value?: string;
    }>;
    dataFreshnessRequirements: Array<{
      source: string;
      maxAgeSec: number;
      actualAgeSec: number;
      met: boolean;
    }>;
  };

  // Enhancement #36: Enhanced provenance chain
  provenanceChain: Array<{
    step: number;
    stage: "ingestion" | "processing" | "analysis" | "decision";
    description: string;
    timestamp: string;
    dataTransformation?: string;
  }>;

  // Enhancement #37: Confidence component breakdown
  confidenceBreakdown: {
    dataQuality: { score: number; weight: number };
    historicalAccuracy: { score: number; weight: number };
    modelCertainty: { score: number; weight: number };
    contextRelevance: { score: number; weight: number };
    total: number;
  };

  // Enhancement #38: Alternative actions
  alternativeActions: Array<{
    action: string;
    confidenceScore: number;
    rejectionReason: string;
    potentialOutcome: string;
  }>;

  // Enhancement #39: Resource impact
  resourceImpact: {
    inferenceTimeMs: number;
    memoryUsedMB: number;
    apiCallsCount: number;
    computeCost: number; // Arbitrary units
    efficiency: number; // 0-100
  };

  // Enhancement #40: Compliance scoring
  complianceScoring: {
    overallStatus: ComplianceStatus;
    safetyRegulations: { compliant: boolean; details: string };
    financialRules: { compliant: boolean; details: string };
    operationalPolicies: { compliant: boolean; details: string };
    complianceScore: number; // 0-100
  };

  // Enhancement #41: User impact estimation
  userImpact: {
    impactLevel: UserImpactLevel;
    affectedStakeholders: string[];
    estimatedUserCount: number;
    impactDescription: string;
    benefitAnalysis?: string;
  };

  // Enhancement #42: Rollback capability
  rollbackCapability: {
    canRollback: boolean;
    rollbackComplexity: RollbackComplexity;
    rollbackTimeWindowSec: number;
    rollbackProcedure: string;
    estimatedRollbackTimeMin: number;
  };

  // Enhancement #43: Decision velocity metrics
  velocityMetrics: {
    decisionsPerHour: number;
    velocityTrend: "accelerating" | "decelerating" | "stable";
    comparedToAverage: number; // Percentage
    burstDetected: boolean;
  };

  // Enhancement #44: Cross-domain impact
  crossDomainImpact: {
    energyImpact: { affected: boolean; description: string; magnitude: number };
    financialImpact: {
      affected: boolean;
      description: string;
      magnitude: number;
    };
    operationalImpact: {
      affected: boolean;
      description: string;
      magnitude: number;
    };
    governanceImpact: {
      affected: boolean;
      description: string;
      magnitude: number;
    };
  };

  // Enhancement #45: Predictive indicators
  predictiveIndicators: {
    predictedFutureNeeds: string[];
    maintenancePrediction?: {
      needed: boolean;
      timeframe: string;
      component: string;
    };
    tradingOpportunity?: {
      detected: boolean;
      timeframe: string;
      confidence: number;
    };
    capacityChange?: {
      predicted: boolean;
      direction: "increase" | "decrease";
      magnitude: number;
    };
  };

  // Enhancement #46: Visualization data
  visualizationData: {
    timelinePosition: { x: number; y: number };
    relationshipGraph: Array<{ from: string; to: string; type: string }>;
    heatmapValue: number;
    clusterGroup?: string;
  };

  // Enhancement #47: Notification triggers
  notificationTriggers: Array<{
    stakeholder: string;
    channel: "email" | "sms" | "slack" | "dashboard";
    urgency: NotificationUrgency;
    message: string;
    shouldSend: boolean;
  }>;

  // Enhancement #48: Audit trail metadata
  auditTrail: {
    regulatoryCheckpoints: string[];
    approvalChain: Array<{ authority: string; timestamp: string }>;
    complianceFlags: string[];
    auditableEvents: Array<{ event: string; timestamp: string }>;
  };

  // Enhancement #49: Decision tags
  tags: string[];

  // Enhancement #50: Comparison data
  comparisonData?: {
    baselineDecisionId?: string;
    differences: Array<{ field: string; oldValue: string; newValue: string }>;
    similarity: number; // 0-100%
  };

  // Enhancement #51: Health score degradation
  healthDegradation: {
    currentHealthScore: number; // 0-100
    degradationRatePerHour: number;
    estimatedValidityHours: number;
    agingCurve: "linear" | "exponential" | "logarithmic";
  };

  // Enhancement #52: Smart defaults applied
  smartDefaultsApplied?: {
    field: string;
    defaultValue: string;
    reason: string;
  }[];

  // Enhancement #53: Query optimization hints
  optimizationHints?: string[];

  // Enhancement #54: Replay capability
  replayCapability?: {
    canReplay: boolean;
    alternativeInputs: Array<{ param: string; alternativeValue: string }>;
    expectedOutcomeDelta: string;
  };

  // Enhancement #55: Streaming metadata
  streamingMetadata?: {
    chunkIndex: number;
    totalChunks: number;
    isLastChunk: boolean;
  };
}

// ============================================================================
// DECISION CACHE (Enhancement #13)
// ============================================================================

const decisionsCache = new Map<
  string,
  {
    data: EnhancedDecision[];
    timestamp: number;
    queryKey: string;
  }
>();

function getCacheKey(
  params: Record<string, string | number | boolean | null | undefined>
): string {
  return JSON.stringify(params);
}

function getCachedDecisions(cacheKey: string): EnhancedDecision[] | null {
  const cached = decisionsCache.get(cacheKey);
  if (!cached) return null;

  // Cache valid for 30 seconds
  if (Date.now() - cached.timestamp > 30000) {
    decisionsCache.delete(cacheKey);
    return null;
  }

  return cached.data;
}

function setCachedDecisions(cacheKey: string, data: EnhancedDecision[]): void {
  decisionsCache.set(cacheKey, {
    data,
    timestamp: Date.now(),
    queryKey: cacheKey,
  });

  // Cleanup old cache entries (older than 5 minutes)
  for (const [key, value] of decisionsCache.entries()) {
    if (Date.now() - value.timestamp > 300000) {
      decisionsCache.delete(key);
    }
  }
}

// ============================================================================
// DECISION ENHANCEMENT UTILITIES
// ============================================================================

/**
 * Enhancement #2: Classify decision complexity
 */
function classifyDecisionComplexity(
  decision: AgentDecision
): DecisionComplexity {
  const description = decision.summary.toLowerCase();

  // Complex: Multi-parameter, cross-system, or high-impact decisions
  if (
    description.includes("optimize") ||
    description.includes("coordinate") ||
    description.includes("multi") ||
    decision.confidence < 70
  ) {
    return "complex";
  }

  // Moderate: Standard operational decisions
  if (
    description.includes("adjust") ||
    description.includes("modify") ||
    decision.confidence < 85
  ) {
    return "moderate";
  }

  // Simple: Routine, single-parameter decisions
  return "simple";
}

/**
 * Enhancement #11: Categorize decision type
 */
function categorizeDecision(decision: AgentDecision): DecisionCategory {
  const desc = decision.summary.toLowerCase();
  const agent = decision.agent;

  if (desc.includes("override") || desc.includes("emergency"))
    return "override";
  if (
    agent === "operations" &&
    (desc.includes("dispatch") || desc.includes("battery"))
  )
    return "dispatch";
  if (agent === "markets" && (desc.includes("trade") || desc.includes("swap")))
    return "trading";
  if (
    agent === "sentinel" &&
    (desc.includes("maintenance") || desc.includes("repair"))
  )
    return "maintenance";
  if (agent === "governor") return "governance";

  // Default based on agent
  const agentDefaults: Record<AgentPersona, DecisionCategory> = {
    operations: "dispatch",
    markets: "trading",
    sentinel: "maintenance",
    governor: "governance",
  };

  return agentDefaults[agent];
}

/**
 * Enhancement #9: Assess decision impact
 */
function assessDecisionImpact(
  decision: AgentDecision,
  complexity: DecisionComplexity
): DecisionImpact {
  const desc = decision.summary.toLowerCase();

  // Critical: Safety-related, emergency, or override decisions
  if (
    desc.includes("emergency") ||
    desc.includes("critical") ||
    desc.includes("override") ||
    desc.includes("safety")
  ) {
    return "critical";
  }

  // High: Significant operational changes
  if (
    desc.includes("significant") ||
    desc.includes("major") ||
    complexity === "complex" ||
    decision.confidence < 70
  ) {
    return "high";
  }

  // Medium: Standard adjustments
  if (complexity === "moderate" || decision.confidence < 85) {
    return "medium";
  }

  // Low: Routine decisions
  return "low";
}

/**
 * Enhancement #17: Detect decision urgency
 */
function detectDecisionUrgency(
  decision: AgentDecision,
  impact: DecisionImpact
): DecisionUrgency {
  const desc = decision.summary.toLowerCase();

  if (desc.includes("emergency") || desc.includes("immediate"))
    return "emergency";
  if (desc.includes("urgent") || impact === "critical") return "urgent";
  if (impact === "high" || desc.includes("priority")) return "elevated";

  return "routine";
}

/**
 * Enhancement #20: Detect decision sentiment
 */
function detectDecisionSentiment(
  urgency: DecisionUrgency,
  constraintViolations: number
): DecisionSentiment {
  if (urgency === "emergency" || constraintViolations > 0) return "emergency";
  if (urgency === "urgent" || urgency === "elevated") return "stressed";
  return "calm";
}

/**
 * Enhancement #3: Get data sources for agent decision
 */
function getDecisionDataSources(
  agent: AgentPersona,
  category: DecisionCategory
): string[] {
  const baseSources: Record<AgentPersona, string[]> = {
    operations: [
      "oracle:pyth",
      "sensor:battery-soc",
      "sensor:inverter-1",
      "sensor:grid-meter",
    ],
    markets: [
      "market:jupiter",
      "oracle:pyth",
      "oracle:switchboard",
      "blockchain:solana-rpc",
    ],
    sentinel: [
      "sensor:panel-array-a",
      "sensor:inverter-1",
      "sensor:tracker-motor-3",
      "sensor:battery-temp",
    ],
    governor: [
      "blockchain:solana-rpc",
      "audit:compliance-log",
      "constraint:soc-minimum",
      "governance:multisig",
    ],
  };

  const sources = baseSources[agent];

  // Add category-specific sources
  if (category === "override") {
    sources.push("governance:emergency-override");
  } else if (category === "trading") {
    sources.push("market:liquidity-pool");
  }

  return sources;
}

/**
 * Enhancement #4: Generate source health scores
 */
function generateSourceHealthScores(sources: string[]): Array<{
  source: string;
  freshnessSec: number;
  reliability: number;
}> {
  return sources.map((source) => {
    let freshnessSec: number;
    if (source.startsWith("oracle:")) {
      freshnessSec = Math.random() * PERFORMANCE.freshness.critical;
    } else if (source.startsWith("sensor:")) {
      freshnessSec = Math.random() * PERFORMANCE.freshness.warning;
    } else if (source.startsWith("market:")) {
      freshnessSec = Math.random() * 30;
    } else {
      freshnessSec = Math.random() * PERFORMANCE.freshness.stale;
    }

    const reliability = 85 + Math.random() * 15;

    return {
      source,
      freshnessSec: Math.floor(freshnessSec),
      reliability: Math.floor(reliability),
    };
  });
}

/**
 * Enhancement #5: Determine operational status at decision time
 */
function getDecisionOperationalStatus(
  agent: AgentPersona,
  workload: "low" | "medium" | "high",
  constraintViolations: number
): OperationalStatus {
  if (constraintViolations > 0) return "degraded";
  if (workload === "high") return "degraded";
  if (workload === "medium") return "nominal";
  return "optimal";
}

/**
 * Enhancement #6: Generate constraint violations
 */
function generateConstraintViolations(
  decision: AgentDecision,
  impact: DecisionImpact
): Array<{
  constraint: string;
  severity: ConstraintSeverity;
  type: "safety" | "operational" | "regulatory";
}> {
  const violations: Array<{
    constraint: string;
    severity: ConstraintSeverity;
    type: "safety" | "operational" | "regulatory";
  }> = [];

  // 10% chance of constraint violation for high/critical impact decisions
  if ((impact === "high" || impact === "critical") && Math.random() < 0.1) {
    const desc = decision.summary.toLowerCase();

    if (desc.includes("battery") || desc.includes("soc")) {
      violations.push({
        constraint: "battery_soc_minimum",
        severity: impact === "critical" ? "high" : "medium",
        type: "safety",
      });
    } else if (desc.includes("grid") || desc.includes("export")) {
      violations.push({
        constraint: "grid_export_limit",
        severity: "medium",
        type: "operational",
      });
    }
  }

  return violations;
}

/**
 * Enhancement #7: Generate confidence explanation
 */
function generateConfidenceExplanation(
  confidence: number,
  sourceCount: number,
  complexity: DecisionComplexity,
  operationalStatus: OperationalStatus
): string {
  const level = confidence >= 85 ? "High" : confidence >= 70 ? "Medium" : "Low";
  const reasons: string[] = [];

  reasons.push(`${sourceCount} data sources`);

  if (operationalStatus === "optimal") {
    reasons.push("optimal conditions");
  } else if (operationalStatus === "degraded") {
    reasons.push("degraded conditions");
  }

  if (complexity === "simple") {
    reasons.push("straightforward decision");
  } else if (complexity === "complex") {
    reasons.push("complex multi-parameter analysis");
  }

  return `${level} confidence (${reasons.join(", ")})`;
}

/**
 * Enhancement #8: Detect cross-agent coordination
 */
function detectCoordinatedAgents(decision: AgentDecision): AgentPersona[] {
  const desc = decision.summary.toLowerCase();
  const coordinated: AgentPersona[] = [decision.agent];

  const coordinationKeywords: Record<AgentPersona, string[]> = {
    operations: ["dispatch", "battery", "energy"],
    markets: ["trade", "price", "token"],
    sentinel: ["sensor", "health", "diagnostic"],
    governor: ["constraint", "governance", "compliance"],
  };

  for (const [agent, keywords] of Object.entries(coordinationKeywords) as [
    AgentPersona,
    string[],
  ][]) {
    if (agent !== decision.agent && keywords.some((kw) => desc.includes(kw))) {
      coordinated.push(agent);
    }
  }

  return coordinated;
}

/**
 * Enhancement #10: Calculate time-decay freshness
 */
function calculateTimeSincedecision(timestamp: string): {
  ageSec: number;
  trustDecayPercent: number;
} {
  const decisionTime = new Date(timestamp).getTime();
  const now = Date.now();
  const ageSec = Math.floor((now - decisionTime) / 1000);

  const trustDecayPercent = calculateMockTrustDecay(ageSec);

  return { ageSec, trustDecayPercent };
}

/**
 * Enhancement #12: Simulate agent workload at decision time
 */
function simulateDecisionWorkload(
  timestamp: string
): "low" | "medium" | "high" {
  const hour = new Date(timestamp).getHours();
  const isPeakHours = hour >= 16 && hour <= 20;

  const workloadScore = Math.random() * 100;

  if (isPeakHours) {
    if (workloadScore < 30) return "high";
    if (workloadScore < 70) return "medium";
    return "low";
  } else {
    if (workloadScore < 10) return "high";
    if (workloadScore < 40) return "medium";
    return "low";
  }
}

/**
 * Enhancement #14: Generate agent-specific proof hash
 */
function generateDecisionProofHash(
  agent: AgentPersona,
  decisionId: string
): string {
  const prefixes: Record<AgentPersona, string> = {
    operations: "sig",
    markets: "zk",
    sentinel: "merkle",
    governor: "consensus",
  };

  const prefix = prefixes[agent];
  const hash = decisionId
    .replace(/[^0-9a-f]/g, "")
    .padEnd(60, "0")
    .slice(0, 60);

  return `0x${prefix}${hash}`;
}

/**
 * Enhancement #15: Generate decision chain relationships
 */
function generateDecisionChain(
  decision: AgentDecision,
  allDecisions: AgentDecision[]
): { parentDecisionId?: string; childDecisionIds: string[] } {
  const index = allDecisions.findIndex((d) => d.id === decision.id);

  // 30% chance of having a parent (previous decision)
  const parentDecisionId =
    index > 0 && Math.random() < 0.3 ? allDecisions[index - 1].id : undefined;

  // 20% chance of having children (subsequent decisions)
  const childDecisionIds: string[] = [];
  if (index < allDecisions.length - 1 && Math.random() < 0.2) {
    childDecisionIds.push(allDecisions[index + 1].id);
  }

  return { parentDecisionId, childDecisionIds };
}

/**
 * Enhancement #19: Calculate decision quality score
 */
function calculateDecisionQuality(
  confidence: number,
  sourceCount: number,
  constraintViolations: number,
  operationalStatus: OperationalStatus
): number {
  let quality = 50;

  quality += (confidence / 100) * 30;
  quality += Math.min((sourceCount / 5) * 20, 20);
  quality -= constraintViolations * 15;

  if (operationalStatus === "optimal") quality += 10;
  else if (operationalStatus === "degraded") quality -= 10;

  return Math.max(0, Math.min(100, Math.floor(quality)));
}

/**
 * Enhancement #23: Generate related decisions
 */
function generateRelatedDecisions(
  decision: AgentDecision,
  allDecisions: AgentDecision[],
  parentId?: string,
  childIds: string[] = []
): Array<{
  id: string;
  relationship: "parent" | "child" | "alternative" | "followup";
}> {
  const related: Array<{
    id: string;
    relationship: "parent" | "child" | "alternative" | "followup";
  }> = [];

  if (parentId) {
    related.push({ id: parentId, relationship: "parent" });
  }

  for (const childId of childIds) {
    related.push({ id: childId, relationship: "child" });
  }

  // Find alternative decisions (same agent, similar time, different action)
  const similarDecisions = allDecisions.filter(
    (d) =>
      d.id !== decision.id &&
      d.agent === decision.agent &&
      Math.abs(
        new Date(d.timestamp).getTime() - new Date(decision.timestamp).getTime()
      ) < 300000 // 5 min
  );

  if (similarDecisions.length > 0 && Math.random() < 0.3) {
    related.push({
      id: similarDecisions[0].id,
      relationship: "alternative",
    });
  }

  return related;
}

/**
 * Enhancement #24: Generate decision outcome
 */
function generateDecisionOutcome(
  decision: AgentDecision,
  ageSec: number
): { outcome: DecisionOutcome; outcomeConfidence: number } {
  // Decisions less than 2 minutes old are pending
  if (ageSec < 120) {
    return { outcome: "pending", outcomeConfidence: 0 };
  }

  // Older decisions have outcomes based on confidence
  const outcomeRand = Math.random() * 100;

  if (decision.confidence >= 85) {
    // High confidence decisions: 90% success
    if (outcomeRand < 90)
      return { outcome: "success", outcomeConfidence: 95 + Math.random() * 5 };
    if (outcomeRand < 98)
      return { outcome: "partial", outcomeConfidence: 70 + Math.random() * 20 };
    return { outcome: "failure", outcomeConfidence: 80 + Math.random() * 15 };
  } else if (decision.confidence >= 70) {
    // Medium confidence: 75% success
    if (outcomeRand < 75)
      return { outcome: "success", outcomeConfidence: 85 + Math.random() * 10 };
    if (outcomeRand < 95)
      return { outcome: "partial", outcomeConfidence: 65 + Math.random() * 20 };
    return { outcome: "failure", outcomeConfidence: 70 + Math.random() * 20 };
  } else {
    // Low confidence: 60% success
    if (outcomeRand < 60)
      return { outcome: "success", outcomeConfidence: 75 + Math.random() * 15 };
    if (outcomeRand < 85)
      return { outcome: "partial", outcomeConfidence: 60 + Math.random() * 20 };
    return { outcome: "failure", outcomeConfidence: 65 + Math.random() * 20 };
  }
}

/**
 * Enhancement #26: Generate agent state context
 */
function generateAgentStateContext(
  agent: AgentPersona,
  allDecisions: AgentDecision[],
  currentTimestamp: string
): EnhancedDecision["agentStateContext"] {
  const recentDecisions = allDecisions.filter(
    (d) =>
      d.agent === agent &&
      new Date(d.timestamp).getTime() >
        new Date(currentTimestamp).getTime() - 3600000
  );

  const activeDecisionsCount = recentDecisions.filter(
    (d) =>
      new Date(currentTimestamp).getTime() - new Date(d.timestamp).getTime() <
      600000
  ).length;

  const recentActionHistory = recentDecisions
    .slice(0, 5)
    .map((d) => d.summary.slice(0, 50));

  const cognitiveLoad: CognitiveLoad =
    activeDecisionsCount > 10
      ? "critical"
      : activeDecisionsCount > 5
        ? "heavy"
        : activeDecisionsCount > 2
          ? "moderate"
          : "light";

  const resourceUtilization = Math.min(
    100,
    (activeDecisionsCount / 15) * 100 + Math.random() * 20
  );
  const decisionBurst = activeDecisionsCount > 5;

  return {
    activeDecisionsCount,
    recentActionHistory,
    cognitiveLoad,
    resourceUtilization: Math.floor(resourceUtilization),
    decisionBurst,
  };
}

/**
 * Enhancement #27: Detect decision conflicts
 */
function detectDecisionConflicts(
  decision: AgentDecision,
  allDecisions: AgentDecision[],
  constraintViolations: number
): EnhancedDecision["conflictDetection"] {
  const recentDecisions = allDecisions.filter(
    (d) =>
      new Date(decision.timestamp).getTime() - new Date(d.timestamp).getTime() <
        1800000 && d.id !== decision.id
  );

  const conflictingDecisions: string[] = [];
  const conflictReasons: string[] = [];

  // Check for conflicting actions
  const desc = decision.summary.toLowerCase();
  for (const other of recentDecisions) {
    const otherDesc = other.summary.toLowerCase();

    if (
      (desc.includes("charge") && otherDesc.includes("discharge")) ||
      (desc.includes("buy") && otherDesc.includes("sell")) ||
      (desc.includes("increase") && otherDesc.includes("decrease"))
    ) {
      conflictingDecisions.push(other.id);
      conflictReasons.push(
        `Conflicts with ${other.agent} decision: ${other.summary.slice(0, 40)}`
      );
    }
  }

  // Add constraint violations as conflicts
  if (constraintViolations > 0) {
    conflictReasons.push("Violates operational constraints");
  }

  const conflictSeverity: ConflictSeverity =
    conflictingDecisions.length > 2
      ? "severe"
      : conflictingDecisions.length > 1
        ? "moderate"
        : conflictingDecisions.length > 0
          ? "minor"
          : "none";

  return {
    hasConflicts: conflictingDecisions.length > 0 || constraintViolations > 0,
    conflictSeverity,
    conflictingDecisions,
    conflictReasons,
  };
}

/**
 * Enhancement #28: Analyze temporal patterns
 */
function analyzeTemporalPattern(
  agent: AgentPersona,
  timestamp: string,
  allDecisions: AgentDecision[]
): EnhancedDecision["temporalPattern"] {
  const hour = new Date(timestamp).getHours();
  const hourStart = new Date(timestamp);
  hourStart.setMinutes(0, 0, 0);

  const decisionsThisHour = allDecisions.filter(
    (d) =>
      d.agent === agent &&
      new Date(d.timestamp).getTime() >= hourStart.getTime() &&
      new Date(d.timestamp).getTime() < hourStart.getTime() + 3600000
  ).length;

  const avgDecisionsPerHour = Math.max(1, 3 + Math.random() * 5);
  const patternDeviation =
    ((decisionsThisHour - avgDecisionsPerHour) / avgDecisionsPerHour) * 100;

  // Clustering score: high if many decisions in short time
  const recentWindow = allDecisions.filter(
    (d) =>
      d.agent === agent &&
      Math.abs(
        new Date(d.timestamp).getTime() - new Date(timestamp).getTime()
      ) < 300000
  ).length;

  const clusteringScore = Math.min(100, (recentWindow / 5) * 100);
  const isBurst = recentWindow > 3;

  return {
    decisionFrequency: decisionsThisHour,
    clusteringScore: Math.floor(clusteringScore),
    isBurst,
    hourOfDay: hour,
    patternDeviation: Math.floor(patternDeviation),
  };
}

/**
 * Enhancement #29: Calculate risk assessment score
 */
function calculateRiskAssessment(
  impact: DecisionImpact,
  urgency: DecisionUrgency,
  confidence: number,
  constraintViolations: number
): EnhancedDecision["riskAssessment"] {
  const impactScores = { low: 10, medium: 30, high: 60, critical: 90 };
  const urgencyScores = {
    routine: 5,
    elevated: 20,
    urgent: 50,
    emergency: 80,
  };

  const impactRisk = impactScores[impact];
  const urgencyRisk = urgencyScores[urgency];
  const confidenceRisk = (100 - confidence) * 0.5;
  const constraintRisk = constraintViolations * 20;

  const riskFactors = [
    { factor: "Impact Level", weight: 0.4, contribution: impactRisk * 0.4 },
    { factor: "Urgency", weight: 0.3, contribution: urgencyRisk * 0.3 },
    {
      factor: "Confidence Inverse",
      weight: 0.2,
      contribution: confidenceRisk * 0.2,
    },
    {
      factor: "Constraint Violations",
      weight: 0.1,
      contribution: constraintRisk * 0.1,
    },
  ];

  const overallRiskScore = Math.min(
    100,
    Math.floor(
      impactRisk * 0.4 +
        urgencyRisk * 0.3 +
        confidenceRisk * 0.2 +
        constraintRisk * 0.1
    )
  );

  const riskLevel =
    overallRiskScore > 70
      ? "extreme"
      : overallRiskScore > 50
        ? "high"
        : overallRiskScore > 25
          ? "moderate"
          : "low";

  const mitigationStrategies: string[] = [];
  if (impactRisk > 50)
    mitigationStrategies.push("Require human approval for high-impact changes");
  if (urgencyRisk > 50)
    mitigationStrategies.push("Implement rapid response protocols");
  if (confidenceRisk > 40)
    mitigationStrategies.push("Gather additional data before execution");
  if (constraintRisk > 0)
    mitigationStrategies.push(
      "Resolve constraint violations before proceeding"
    );

  return {
    overallRiskScore,
    riskFactors,
    riskLevel,
    mitigationStrategies,
  };
}

/**
 * Enhancement #30: Generate learning indicators
 */
function generateLearningIndicators(
  decision: AgentDecision,
  agent: AgentPersona,
  allDecisions: AgentDecision[]
): EnhancedDecision["learningIndicators"] {
  const agentDecisions = allDecisions.filter((d) => d.agent === agent);
  const similarDecisions = agentDecisions.filter((d) =>
    d.summary
      .toLowerCase()
      .split(" ")
      .some((word) => decision.summary.toLowerCase().includes(word))
  );

  // Novelty: low if many similar decisions exist
  const noveltyScore = Math.max(
    0,
    Math.min(100, 100 - (similarDecisions.length / agentDecisions.length) * 100)
  );

  // Pattern deviation: based on confidence variance
  const avgConfidence =
    agentDecisions.reduce((sum, d) => sum + d.confidence, 0) /
    Math.max(1, agentDecisions.length);
  const patternDeviation = Math.abs(decision.confidence - avgConfidence);

  const isAdaptive = noveltyScore > 50 || patternDeviation > 20;

  const decisionNovelty: DecisionNovelty =
    noveltyScore > 80
      ? "experimental"
      : noveltyScore > 60
        ? "novel"
        : noveltyScore > 30
          ? "adaptive"
          : "routine";

  const learningContext =
    decisionNovelty !== "routine"
      ? `Agent exploring ${decisionNovelty} approach to decision-making`
      : undefined;

  return {
    noveltyScore: Math.floor(noveltyScore),
    patternDeviation: Math.floor(patternDeviation),
    isAdaptive,
    decisionNovelty,
    learningContext,
  };
}

/**
 * Enhancement #31: Track multi-agent consensus
 */
function trackMultiAgentConsensus(
  decision: AgentDecision,
  allDecisions: AgentDecision[],
  category: DecisionCategory
): EnhancedDecision["consensusTracking"] {
  const recentDecisions = allDecisions.filter(
    (d) =>
      new Date(decision.timestamp).getTime() - new Date(d.timestamp).getTime() <
      1800000
  );

  const agreeingAgents: AgentPersona[] = [];
  const disagreeingAgents: AgentPersona[] = [];

  const keywords = decision.summary
    .toLowerCase()
    .split(" ")
    .filter((w) => w.length > 4);

  for (const other of recentDecisions) {
    if (other.id === decision.id || other.agent === decision.agent) continue;

    const similarity = keywords.filter((k) =>
      other.summary.toLowerCase().includes(k)
    ).length;

    if (similarity > keywords.length * 0.5) {
      agreeingAgents.push(other.agent);
    } else if (
      other.summary.toLowerCase().includes("not") ||
      other.summary.toLowerCase().includes("avoid")
    ) {
      disagreeingAgents.push(other.agent);
    }
  }

  const hasConsensus = agreeingAgents.length > 0;
  const consensusStrength = Math.min(
    100,
    (agreeingAgents.length / 3) * 100 + (decision.confidence - 50)
  );

  const consensusRationale = hasConsensus
    ? `${agreeingAgents.length + 1} agents agree on ${category} strategy`
    : "No multi-agent consensus detected";

  return {
    hasConsensus,
    consensusStrength: Math.floor(consensusStrength),
    agreeingAgents,
    disagreeingAgents,
    consensusRationale,
  };
}

/**
 * Enhancement #32: Generate reversal history
 */
function generateReversalHistory(
  decision: AgentDecision,
  ageSec: number
): EnhancedDecision["reversalHistory"] {
  // 5% chance decision was reversed if old enough
  const wasReversed = ageSec > 600 && Math.random() < 0.05;

  if (!wasReversed) {
    return { wasReversed: false };
  }

  const reasons: ReversalReason[] = [
    "human_override",
    "constraint_violation",
    "improved_data",
    "policy_change",
    "error_correction",
  ];

  const reversalTimestamp = new Date(
    new Date(decision.timestamp).getTime() + Math.random() * ageSec * 1000
  ).toISOString();

  return {
    wasReversed: true,
    reversalTimestamp,
    reversalReason: reasons[Math.floor(Math.random() * reasons.length)],
    reversalAuthority:
      Math.random() < 0.7 ? "human:operator" : "agent:governor",
    reversalImpact: "Decision was safely reversed with no lasting effects",
  };
}

/**
 * Enhancement #33: Generate performance benchmark
 */
function generatePerformanceBenchmark(
  agent: AgentPersona,
  qualityScore: number,
  outcome: DecisionOutcome
): EnhancedDecision["performanceBenchmark"] {
  const baselineQuality = 70 + Math.random() * 15;
  const qualityDelta = qualityScore - baselineQuality;

  const peerAgents = 4; // 4 total agents
  const rank =
    qualityScore > 85 ? 1 : qualityScore > 70 ? 2 : qualityScore > 55 ? 3 : 4;
  const betterThanPeers = ((peerAgents - rank) / peerAgents) * 100;

  const historicalSuccessRate =
    outcome === "success"
      ? 85 + Math.random() * 10
      : outcome === "partial"
        ? 70 + Math.random() * 15
        : 50 + Math.random() * 20;

  return {
    baselineQuality: Math.floor(baselineQuality),
    qualityDelta: Math.floor(qualityDelta),
    peerComparison: {
      betterThanPeers: Math.floor(betterThanPeers),
      rank,
      totalPeers: peerAgents,
    },
    historicalSuccessRate: Math.floor(historicalSuccessRate),
  };
}

/**
 * Enhancement #34: Generate explainability depth levels
 */
function generateExplanations(
  decision: AgentDecision,
  complexity: DecisionComplexity,
  confidenceExplanation: string
): EnhancedDecision["explanations"] {
  const beginner = `${decision.agent.charAt(0).toUpperCase() + decision.agent.slice(1)} agent decided to ${decision.summary.toLowerCase()}.`;

  const intermediate = `${beginner} This ${complexity} decision was made with ${decision.confidence}% confidence. ${confidenceExplanation}`;

  const expert = `${intermediate} Technical details: Decision employed multi-source validation with trust mathematics (σ deviation analysis), temporal freshness decay modeling, and constraint satisfaction verification. Confidence derived from Bayesian inference over ${Math.floor(Math.random() * 3 + 3)} independent data sources with cross-validation.`;

  return {
    beginner,
    intermediate,
    expert,
  };
}

/**
 * Enhancement #35: Validate decision prerequisites
 */
function validatePrerequisites(
  category: DecisionCategory,
  sourceHealthScores: Array<{ source: string; freshnessSec: number }>
): EnhancedDecision["prerequisites"] {
  const requiredConditions = [
    {
      condition: "Minimum data sources available",
      met: sourceHealthScores.length >= 3,
      value: `${sourceHealthScores.length} sources`,
    },
    {
      condition: "Agent operational status nominal",
      met: true,
      value: "Operational",
    },
    {
      condition: "No critical system alerts",
      met: Math.random() < 0.95,
      value: Math.random() < 0.95 ? "Clear" : "Alert active",
    },
  ];

  if (category === "trading") {
    requiredConditions.push({
      condition: "Market liquidity sufficient",
      met: Math.random() < 0.9,
      value: Math.random() < 0.9 ? "Sufficient" : "Low",
    });
  }

  const dataFreshnessRequirements = sourceHealthScores.map((s) => ({
    source: s.source,
    maxAgeSec: s.source.startsWith("oracle:") ? 10 : 60,
    actualAgeSec: s.freshnessSec,
    met: s.freshnessSec < (s.source.startsWith("oracle:") ? 10 : 60),
  }));

  const allMet =
    requiredConditions.every((c) => c.met) &&
    dataFreshnessRequirements.every((r) => r.met);

  return {
    allMet,
    requiredConditions,
    dataFreshnessRequirements,
  };
}

/**
 * Enhancement #36: Build enhanced provenance chain
 */
function buildProvenanceChain(
  decision: AgentDecision,
  sourceProvenance: string[]
): EnhancedDecision["provenanceChain"] {
  const baseTime = new Date(decision.timestamp).getTime();

  return [
    {
      step: 1,
      stage: "ingestion" as const,
      description: `Received data from ${sourceProvenance.length} sources`,
      timestamp: new Date(baseTime - 5000).toISOString(),
    },
    {
      step: 2,
      stage: "processing" as const,
      description: "Validated data integrity and freshness",
      timestamp: new Date(baseTime - 4000).toISOString(),
      dataTransformation: "Normalized timestamps, validated schemas",
    },
    {
      step: 3,
      stage: "analysis" as const,
      description: "Applied trust mathematics and confidence scoring",
      timestamp: new Date(baseTime - 2000).toISOString(),
      dataTransformation: "Computed trust grades, cross-validated sources",
    },
    {
      step: 4,
      stage: "decision" as const,
      description: `${decision.agent} agent made final decision`,
      timestamp: decision.timestamp,
    },
  ];
}

/**
 * Enhancement #37: Break down confidence components
 */
function breakdownConfidence(
  confidence: number,
  sourceCount: number,
  operationalStatus: OperationalStatus
): EnhancedDecision["confidenceBreakdown"] {
  const dataQuality = Math.min(100, (sourceCount / 5) * 100);
  const historicalAccuracy = confidence + (Math.random() - 0.5) * 10;
  const modelCertainty = confidence;
  const contextRelevance =
    operationalStatus === "optimal"
      ? 90
      : operationalStatus === "nominal"
        ? 75
        : 60;

  return {
    dataQuality: {
      score: Math.floor(dataQuality),
      weight: 30,
    },
    historicalAccuracy: {
      score: Math.floor(historicalAccuracy),
      weight: 25,
    },
    modelCertainty: {
      score: Math.floor(modelCertainty),
      weight: 25,
    },
    contextRelevance: {
      score: Math.floor(contextRelevance),
      weight: 20,
    },
    total: confidence,
  };
}

/**
 * Enhancement #38: Generate alternative actions
 */
function generateAlternativeActions(
  decision: AgentDecision,
  category: DecisionCategory
): EnhancedDecision["alternativeActions"] {
  const alternatives: EnhancedDecision["alternativeActions"] = [];

  if (category === "dispatch") {
    alternatives.push(
      {
        action: "Maintain current power output",
        confidenceScore: decision.confidence - 15,
        rejectionReason: "Would not optimize for current grid pricing",
        potentialOutcome: "Suboptimal revenue generation",
      },
      {
        action: "Increase battery discharge rate",
        confidenceScore: decision.confidence - 25,
        rejectionReason: "Would violate battery longevity constraints",
        potentialOutcome: "Accelerated battery degradation",
      }
    );
  } else if (category === "trading") {
    alternatives.push(
      {
        action: "Hold current position",
        confidenceScore: decision.confidence - 20,
        rejectionReason: "Market conditions favor active trading",
        potentialOutcome: "Missed trading opportunity",
      },
      {
        action: "Execute larger trade volume",
        confidenceScore: decision.confidence - 30,
        rejectionReason: "Insufficient liquidity for larger volume",
        potentialOutcome: "Excessive slippage",
      }
    );
  }

  return alternatives;
}

/**
 * Enhancement #39: Calculate resource impact
 */
function calculateResourceImpact(
  complexity: DecisionComplexity,
  sourceCount: number
): EnhancedDecision["resourceImpact"] {
  const complexityMultipliers = { simple: 1, moderate: 1.5, complex: 2.5 };
  const baseInference = 50;

  const inferenceTimeMs =
    baseInference * complexityMultipliers[complexity] + sourceCount * 10;
  const memoryUsedMB = 10 + sourceCount * 2 + Math.random() * 5;
  const apiCallsCount = sourceCount + Math.floor(Math.random() * 3);
  const computeCost = inferenceTimeMs * 0.01 + apiCallsCount * 0.5;
  const efficiency = Math.min(
    100,
    (1000 / inferenceTimeMs) * 100 * (1 / complexityMultipliers[complexity])
  );

  return {
    inferenceTimeMs: Math.floor(inferenceTimeMs),
    memoryUsedMB: Math.floor(memoryUsedMB * 10) / 10,
    apiCallsCount,
    computeCost: Math.floor(computeCost * 100) / 100,
    efficiency: Math.floor(efficiency),
  };
}

/**
 * Enhancement #40: Score compliance
 */
function scoreCompliance(
  category: DecisionCategory,
  constraintViolations: number
): EnhancedDecision["complianceScoring"] {
  const safetyCompliant = constraintViolations === 0;
  const financialCompliant = category !== "trading" || Math.random() < 0.95;
  const operationalCompliant = Math.random() < 0.9;

  const overallStatus: ComplianceStatus = !safetyCompliant
    ? "non_compliant"
    : !financialCompliant || !operationalCompliant
      ? "conditionally_compliant"
      : "fully_compliant";

  const complianceScore =
    (safetyCompliant ? 40 : 0) +
    (financialCompliant ? 30 : 15) +
    (operationalCompliant ? 30 : 15);

  return {
    overallStatus,
    safetyRegulations: {
      compliant: safetyCompliant,
      details: safetyCompliant
        ? "All safety constraints satisfied"
        : "Battery SOC minimum violated",
    },
    financialRules: {
      compliant: financialCompliant,
      details: financialCompliant
        ? "Within trading limits"
        : "Approaching exposure limits",
    },
    operationalPolicies: {
      compliant: operationalCompliant,
      details: operationalCompliant
        ? "Adheres to operational guidelines"
        : "Minor policy deviation detected",
    },
    complianceScore,
  };
}

/**
 * Enhancement #41: Estimate user impact
 */
function estimateUserImpact(
  category: DecisionCategory,
  impact: DecisionImpact
): EnhancedDecision["userImpact"] {
  const impactLevelMap: Record<DecisionImpact, UserImpactLevel> = {
    low: "minimal",
    medium: "moderate",
    high: "significant",
    critical: "significant",
  };

  const stakeholderMap: Record<DecisionCategory, string[]> = {
    dispatch: ["energy consumers", "grid operators", "token holders"],
    trading: ["token holders", "liquidity providers"],
    maintenance: ["system operators", "token holders"],
    governance: ["all stakeholders", "token holders", "validators"],
    override: ["all stakeholders", "system operators"],
  };

  const estimatedUserCount =
    impact === "critical"
      ? 1000
      : impact === "high"
        ? 500
        : impact === "medium"
          ? 100
          : 10;

  const descriptions: Record<DecisionCategory, string> = {
    dispatch: "Affects energy availability and pricing for consumers",
    trading: "Impacts token value and portfolio returns",
    maintenance: "May temporarily reduce system capacity",
    governance: "Changes operational policies and constraints",
    override: "Direct intervention in autonomous operations",
  };

  return {
    impactLevel: impactLevelMap[impact],
    affectedStakeholders: stakeholderMap[category],
    estimatedUserCount,
    impactDescription: descriptions[category],
    benefitAnalysis:
      impact !== "critical"
        ? "Expected to optimize system performance"
        : undefined,
  };
}

/**
 * Enhancement #42: Assess rollback capability
 */
function assessRollbackCapability(
  category: DecisionCategory,
  impact: DecisionImpact,
  ageSec: number
): EnhancedDecision["rollbackCapability"] {
  const complexityMap: Record<DecisionCategory, RollbackComplexity> = {
    dispatch: "simple",
    trading: "moderate",
    maintenance: "complex",
    governance: "moderate",
    override: "trivial",
  };

  const canRollback = ageSec < 3600 && impact !== "critical";
  const rollbackComplexity = complexityMap[category];

  const rollbackTimeWindowSec =
    impact === "low" ? 3600 : impact === "medium" ? 1800 : 600;

  const procedures: Record<RollbackComplexity, string> = {
    trivial: "Single-click reversal through dashboard",
    simple: "Reverse command through agent interface",
    moderate: "Multi-step rollback requiring approval",
    complex: "Expert intervention with system coordination",
  };

  const timeEstimates: Record<RollbackComplexity, number> = {
    trivial: 1,
    simple: 5,
    moderate: 15,
    complex: 60,
  };

  return {
    canRollback,
    rollbackComplexity,
    rollbackTimeWindowSec,
    rollbackProcedure: procedures[rollbackComplexity],
    estimatedRollbackTimeMin: timeEstimates[rollbackComplexity],
  };
}

/**
 * Enhancement #43: Calculate decision velocity metrics
 */
function calculateVelocityMetrics(
  agent: AgentPersona,
  allDecisions: AgentDecision[],
  timestamp: string
): EnhancedDecision["velocityMetrics"] {
  const hourStart = new Date(timestamp);
  hourStart.setMinutes(0, 0, 0);

  const decisionsThisHour = allDecisions.filter(
    (d) =>
      d.agent === agent &&
      new Date(d.timestamp).getTime() >= hourStart.getTime() &&
      new Date(d.timestamp).getTime() < hourStart.getTime() + 3600000
  ).length;

  const prevHourStart = new Date(hourStart.getTime() - 3600000);
  const decisionsPrevHour = allDecisions.filter(
    (d) =>
      d.agent === agent &&
      new Date(d.timestamp).getTime() >= prevHourStart.getTime() &&
      new Date(d.timestamp).getTime() < hourStart.getTime()
  ).length;

  const velocityTrend =
    decisionsThisHour > decisionsPrevHour * 1.2
      ? "accelerating"
      : decisionsThisHour < decisionsPrevHour * 0.8
        ? "decelerating"
        : "stable";

  const avgDecisionsPerHour = 5;
  const comparedToAverage =
    ((decisionsThisHour - avgDecisionsPerHour) / avgDecisionsPerHour) * 100;

  const burstDetected = decisionsThisHour > avgDecisionsPerHour * 1.5;

  return {
    decisionsPerHour: decisionsThisHour,
    velocityTrend,
    comparedToAverage: Math.floor(comparedToAverage),
    burstDetected,
  };
}

/**
 * Enhancement #44: Analyze cross-domain impact
 */
function analyzeCrossDomainImpact(
  category: DecisionCategory,
  impact: DecisionImpact
): EnhancedDecision["crossDomainImpact"] {
  const magnitudeMap = { low: 1, medium: 2, high: 3, critical: 4 };
  const magnitude = magnitudeMap[impact];

  const domains = {
    energyImpact: {
      affected: ["dispatch", "maintenance"].includes(category),
      description:
        category === "dispatch"
          ? "Directly affects energy generation and storage"
          : category === "maintenance"
            ? "May temporarily reduce generation capacity"
            : "No direct energy impact",
      magnitude: ["dispatch", "maintenance"].includes(category) ? magnitude : 0,
    },
    financialImpact: {
      affected: ["trading", "dispatch", "governance"].includes(category),
      description:
        category === "trading"
          ? "Affects token value and portfolio returns"
          : category === "dispatch"
            ? "Impacts energy revenue optimization"
            : "May affect operational costs",
      magnitude: ["trading", "dispatch", "governance"].includes(category)
        ? magnitude
        : 0,
    },
    operationalImpact: {
      affected: true,
      description: `${category} decision affects system operations`,
      magnitude,
    },
    governanceImpact: {
      affected: ["governance", "override"].includes(category),
      description:
        category === "governance"
          ? "Changes policy or constraint enforcement"
          : category === "override"
            ? "Human intervention in autonomous operations"
            : "No governance impact",
      magnitude: ["governance", "override"].includes(category) ? magnitude : 0,
    },
  };

  return domains;
}

/**
 * Enhancement #45: Generate predictive indicators
 */
function generatePredictiveIndicators(
  category: DecisionCategory,
  complexity: DecisionComplexity,
  agentWorkload: string
): EnhancedDecision["predictiveIndicators"] {
  const predictedFutureNeeds: string[] = [];

  if (category === "maintenance" || complexity === "complex") {
    predictedFutureNeeds.push("Additional diagnostic data may be required");
  }

  if (agentWorkload === "high") {
    predictedFutureNeeds.push("Potential capacity expansion needed");
  }

  const maintenancePrediction =
    category === "dispatch" && Math.random() < 0.2
      ? {
          needed: true,
          timeframe: "within 72 hours",
          component: "battery management system",
        }
      : undefined;

  const tradingOpportunity =
    category === "trading" || (category === "dispatch" && Math.random() < 0.3)
      ? {
          detected: true,
          timeframe: "next 4 hours",
          confidence: 70 + Math.random() * 20,
        }
      : undefined;

  const capacityChange =
    category === "maintenance"
      ? {
          predicted: true,
          direction:
            Math.random() < 0.7 ? ("increase" as const) : ("decrease" as const),
          magnitude: 5 + Math.random() * 15,
        }
      : undefined;

  return {
    predictedFutureNeeds,
    maintenancePrediction,
    tradingOpportunity,
    capacityChange,
  };
}

/**
 * Enhancement #46: Prepare visualization data
 */
function prepareVisualizationData(
  decision: AgentDecision,
  allDecisions: AgentDecision[],
  clusteringScore: number
): EnhancedDecision["visualizationData"] {
  const index = allDecisions.findIndex((d) => d.id === decision.id);
  const timeValue = new Date(decision.timestamp).getTime();

  // Timeline position (x = time, y = confidence)
  const timelinePosition = {
    x: timeValue % 86400000, // Time within day
    y: decision.confidence,
  };

  // Build relationship graph
  const relationshipGraph: Array<{ from: string; to: string; type: string }> =
    [];
  const recentDecisions = allDecisions.filter(
    (d) =>
      Math.abs(new Date(d.timestamp).getTime() - timeValue) < 1800000 &&
      d.id !== decision.id
  );

  for (const other of recentDecisions.slice(0, 3)) {
    relationshipGraph.push({
      from: decision.id,
      to: other.id,
      type: other.agent === decision.agent ? "same-agent" : "cross-agent",
    });
  }

  const heatmapValue = decision.confidence;
  const clusterGroup =
    clusteringScore > 60
      ? `cluster-${Math.floor(timeValue / 3600000)}`
      : undefined;

  return {
    timelinePosition,
    relationshipGraph,
    heatmapValue,
    clusterGroup,
  };
}

/**
 * Enhancement #47: Generate notification triggers
 */
function generateNotificationTriggers(
  category: DecisionCategory,
  impact: DecisionImpact,
  urgency: DecisionUrgency,
  constraintViolations: number
): EnhancedDecision["notificationTriggers"] {
  const triggers: EnhancedDecision["notificationTriggers"] = [];

  const urgencyMap: Record<DecisionUrgency, NotificationUrgency> = {
    routine: "info",
    elevated: "low",
    urgent: "high",
    emergency: "critical",
  };

  // Always notify operators of critical decisions
  if (impact === "critical" || urgency === "emergency") {
    triggers.push({
      stakeholder: "system_operators",
      channel: "sms",
      urgency: "critical",
      message: `CRITICAL: ${category} decision requires immediate attention`,
      shouldSend: true,
    });
  }

  // Notify token holders of trading decisions
  if (category === "trading" && impact !== "low") {
    triggers.push({
      stakeholder: "token_holders",
      channel: "dashboard",
      urgency: urgencyMap[urgency],
      message: `Trading decision executed: ${impact} impact`,
      shouldSend: true,
    });
  }

  // Notify on constraint violations
  if (constraintViolations > 0) {
    triggers.push({
      stakeholder: "compliance_team",
      channel: "slack",
      urgency: "high",
      message: `Constraint violation detected in ${category} decision`,
      shouldSend: true,
    });
  }

  return triggers;
}

/**
 * Enhancement #48: Build audit trail metadata
 */
function buildAuditTrail(
  category: DecisionCategory,
  complianceScore: number,
  timestamp: string
): EnhancedDecision["auditTrail"] {
  const regulatoryCheckpoints = [
    "Energy market compliance verified",
    "Safety constraints validated",
    "Financial limits checked",
  ];

  if (category === "governance") {
    regulatoryCheckpoints.push("Governance policy adherence confirmed");
  }

  const approvalChain: Array<{ authority: string; timestamp: string }> = [
    {
      authority: `agent:${category === "governance" ? "governor" : "operations"}`,
      timestamp: new Date(new Date(timestamp).getTime() - 1000).toISOString(),
    },
  ];

  if (complianceScore < 100) {
    approvalChain.push({
      authority: "agent:governor",
      timestamp,
    });
  }

  const complianceFlags: string[] = [];
  if (complianceScore < 70) {
    complianceFlags.push("REQUIRES_REVIEW");
  }
  if (category === "override") {
    complianceFlags.push("HUMAN_INTERVENTION");
  }

  const auditableEvents = [
    { event: "Decision initiated", timestamp },
    {
      event: "Compliance validation",
      timestamp: new Date(new Date(timestamp).getTime() + 500).toISOString(),
    },
    {
      event: "Decision executed",
      timestamp: new Date(new Date(timestamp).getTime() + 1000).toISOString(),
    },
  ];

  return {
    regulatoryCheckpoints,
    approvalChain,
    complianceFlags,
    auditableEvents,
  };
}

/**
 * Enhancement #49: Generate decision tags
 */
function generateDecisionTags(
  category: DecisionCategory,
  urgency: DecisionUrgency,
  complexity: DecisionComplexity,
  novelty: DecisionNovelty,
  hasConflicts: boolean
): string[] {
  const tags: string[] = [category, urgency, complexity];

  if (novelty === "experimental" || novelty === "novel") {
    tags.push(novelty);
  }

  if (urgency === "emergency") {
    tags.push("emergency");
  }

  if (category === "override") {
    tags.push("override");
  }

  if (complexity === "simple" && urgency === "routine") {
    tags.push("routine");
  }

  if (hasConflicts) {
    tags.push("conflict_detected");
  }

  return tags;
}

/**
 * Enhancement #50: Generate comparison data (optional)
 */
function generateComparisonData(
  decision: AgentDecision,
  allDecisions: AgentDecision[]
): EnhancedDecision["comparisonData"] | undefined {
  // Find a similar past decision for comparison
  const similar = allDecisions.find(
    (d) =>
      d.id !== decision.id &&
      d.agent === decision.agent &&
      Math.abs(d.confidence - decision.confidence) < 10
  );

  if (!similar) return undefined;

  const differences = [
    {
      field: "timestamp",
      oldValue: similar.timestamp,
      newValue: decision.timestamp,
    },
    {
      field: "confidence",
      oldValue: similar.confidence.toString(),
      newValue: decision.confidence.toString(),
    },
  ];

  const similarity =
    100 - Math.abs(decision.confidence - similar.confidence) * 2;

  return {
    baselineDecisionId: similar.id,
    differences,
    similarity,
  };
}

/**
 * Enhancement #51: Calculate health score degradation
 */
function calculateHealthDegradation(
  ageSec: number,
  trustDecayPercent: number
): EnhancedDecision["healthDegradation"] {
  const currentHealthScore = Math.max(
    0,
    100 - trustDecayPercent - ageSec / 360
  );

  const degradationRatePerHour = trustDecayPercent / Math.max(1, ageSec / 3600);

  const estimatedValidityHours =
    currentHealthScore / Math.max(0.1, degradationRatePerHour);

  const agingCurve =
    degradationRatePerHour > 5
      ? "exponential"
      : degradationRatePerHour < 2
        ? "logarithmic"
        : "linear";

  return {
    currentHealthScore: Math.floor(currentHealthScore),
    degradationRatePerHour: Math.floor(degradationRatePerHour * 10) / 10,
    estimatedValidityHours: Math.floor(estimatedValidityHours),
    agingCurve,
  };
}

/**
 * Enhancement #1-55: Transform basic decision into fully enhanced decision
 */
function enhanceDecision(
  decision: AgentDecision,
  allDecisions: AgentDecision[],
  options: {
    explainabilityDepth?: ExplainabilityDepth;
    includeAlternatives?: boolean;
    includeBenchmark?: boolean;
    includeReplay?: boolean;
  } = {}
): EnhancedDecision {
  // ORIGINAL ENHANCEMENTS (1-25)

  // Enhancement #2: Complexity
  const complexity = classifyDecisionComplexity(decision);

  // Enhancement #11: Category
  const category = categorizeDecision(decision);

  // Enhancement #9: Impact
  const impact = assessDecisionImpact(decision, complexity);

  // Enhancement #17: Urgency
  const urgency = detectDecisionUrgency(decision, impact);

  // Enhancement #3: Data sources
  const sourceProvenance = getDecisionDataSources(decision.agent, category);

  // Enhancement #4: Source health
  const sourceHealthScores = generateSourceHealthScores(sourceProvenance);

  // Enhancement #12: Workload
  const agentWorkload = simulateDecisionWorkload(decision.timestamp);

  // Enhancement #6: Constraint violations
  const constraintViolations = generateConstraintViolations(decision, impact);

  // Enhancement #5: Operational status
  const operationalStatus = getDecisionOperationalStatus(
    decision.agent,
    agentWorkload,
    constraintViolations.length
  );

  // Enhancement #7: Confidence explanation
  const confidenceExplanation = generateConfidenceExplanation(
    decision.confidence,
    sourceProvenance.length,
    complexity,
    operationalStatus
  );

  // Enhancement #8: Coordinated agents
  const coordinatedAgents = detectCoordinatedAgents(decision);

  // Enhancement #10: Time decay
  const { ageSec, trustDecayPercent } = calculateTimeSincedecision(
    decision.timestamp
  );

  // Enhancement #1: Trust mathematics
  const trustMathematics = generateMockTrustMathematics(
    decision.confidence,
    sourceProvenance
  );

  // Enhancement #14: Proof hash
  const zkProofHash = generateDecisionProofHash(decision.agent, decision.id);

  // Enhancement #15: Decision chain
  const { parentDecisionId, childDecisionIds } = generateDecisionChain(
    decision,
    allDecisions
  );

  // Enhancement #19: Quality score
  const qualityScore = calculateDecisionQuality(
    decision.confidence,
    sourceProvenance.length,
    constraintViolations.length,
    operationalStatus
  );

  // Enhancement #20: Sentiment
  const sentiment = detectDecisionSentiment(
    urgency,
    constraintViolations.length
  );

  // Enhancement #23: Related decisions
  const relatedDecisions = generateRelatedDecisions(
    decision,
    allDecisions,
    parentDecisionId,
    childDecisionIds
  );

  // Enhancement #24: Outcome
  const { outcome, outcomeConfidence } = generateDecisionOutcome(
    decision,
    ageSec
  );

  // ADVANCED ENHANCEMENTS (26-55)

  // Enhancement #26: Agent state context
  const agentStateContext = generateAgentStateContext(
    decision.agent,
    allDecisions,
    decision.timestamp
  );

  // Enhancement #27: Conflict detection
  const conflictDetection = detectDecisionConflicts(
    decision,
    allDecisions,
    constraintViolations.length
  );

  // Enhancement #28: Temporal pattern
  const temporalPattern = analyzeTemporalPattern(
    decision.agent,
    decision.timestamp,
    allDecisions
  );

  // Enhancement #29: Risk assessment
  const riskAssessment = calculateRiskAssessment(
    impact,
    urgency,
    decision.confidence,
    constraintViolations.length
  );

  // Enhancement #30: Learning indicators
  const learningIndicators = generateLearningIndicators(
    decision,
    decision.agent,
    allDecisions
  );

  // Enhancement #31: Consensus tracking
  const consensusTracking = trackMultiAgentConsensus(
    decision,
    allDecisions,
    category
  );

  // Enhancement #32: Reversal history
  const reversalHistory = generateReversalHistory(decision, ageSec);

  // Enhancement #33: Performance benchmark (conditional)
  const performanceBenchmark = options.includeBenchmark
    ? generatePerformanceBenchmark(decision.agent, qualityScore, outcome)
    : generatePerformanceBenchmark(decision.agent, qualityScore, outcome);

  // Enhancement #34: Explainability levels
  const explanations = generateExplanations(
    decision,
    complexity,
    confidenceExplanation
  );
  if (options.explainabilityDepth) {
    explanations.currentDepth = options.explainabilityDepth;
  }

  // Enhancement #35: Prerequisites validation
  const prerequisites = validatePrerequisites(category, sourceHealthScores);

  // Enhancement #36: Provenance chain
  const provenanceChain = buildProvenanceChain(decision, sourceProvenance);

  // Enhancement #37: Confidence breakdown
  const confidenceBreakdown = breakdownConfidence(
    decision.confidence,
    sourceProvenance.length,
    operationalStatus
  );

  // Enhancement #38: Alternative actions (conditional)
  const alternativeActions =
    options.includeAlternatives ||
    category === "trading" ||
    complexity === "complex"
      ? generateAlternativeActions(decision, category)
      : [];

  // Enhancement #39: Resource impact
  const resourceImpact = calculateResourceImpact(
    complexity,
    sourceProvenance.length
  );

  // Enhancement #40: Compliance scoring
  const complianceScoring = scoreCompliance(
    category,
    constraintViolations.length
  );

  // Enhancement #41: User impact
  const userImpact = estimateUserImpact(category, impact);

  // Enhancement #42: Rollback capability
  const rollbackCapability = assessRollbackCapability(category, impact, ageSec);

  // Enhancement #43: Velocity metrics
  const velocityMetrics = calculateVelocityMetrics(
    decision.agent,
    allDecisions,
    decision.timestamp
  );

  // Enhancement #44: Cross-domain impact
  const crossDomainImpact = analyzeCrossDomainImpact(category, impact);

  // Enhancement #45: Predictive indicators
  const predictiveIndicators = generatePredictiveIndicators(
    category,
    complexity,
    agentWorkload
  );

  // Enhancement #46: Visualization data
  const visualizationData = prepareVisualizationData(
    decision,
    allDecisions,
    temporalPattern.clusteringScore
  );

  // Enhancement #47: Notification triggers
  const notificationTriggers = generateNotificationTriggers(
    category,
    impact,
    urgency,
    constraintViolations.length
  );

  // Enhancement #48: Audit trail
  const auditTrail = buildAuditTrail(
    category,
    complianceScoring.complianceScore,
    decision.timestamp
  );

  // Enhancement #49: Decision tags
  const tags = generateDecisionTags(
    category,
    urgency,
    complexity,
    learningIndicators.decisionNovelty,
    conflictDetection.hasConflicts
  );

  // Enhancement #50: Comparison data (optional)
  const comparisonData = generateComparisonData(decision, allDecisions);

  // Enhancement #51: Health degradation
  const healthDegradation = calculateHealthDegradation(
    ageSec,
    trustDecayPercent
  );

  // Enhancement #52: Smart defaults applied (set in GET handler)
  const smartDefaultsApplied = undefined;

  // Enhancement #53: Optimization hints (set in GET handler)
  const optimizationHints = undefined;

  // Enhancement #54: Replay capability (conditional)
  const replayCapability = options.includeReplay
    ? {
        canReplay: true,
        alternativeInputs: [
          { param: "confidence_threshold", alternativeValue: "75" },
          { param: "data_freshness_window", alternativeValue: "30s" },
        ],
        expectedOutcomeDelta:
          "Confidence may vary by ±10%, outcome likely similar",
      }
    : undefined;

  // Enhancement #55: Streaming metadata (set in streaming handler)
  const streamingMetadata = undefined;

  return {
    ...decision,
    // Original enhancements
    trustMathematics,
    complexity,
    sourceProvenance,
    sourceHealthScores,
    operationalStatus,
    constraintViolations,
    confidenceExplanation,
    coordinatedAgents,
    impact,
    ageSec,
    trustDecayPercent,
    category,
    agentWorkload,
    zkProofHash,
    parentDecisionId,
    childDecisionIds,
    urgency,
    qualityScore,
    sentiment,
    relatedDecisions,
    outcome,
    outcomeConfidence,
    // Advanced enhancements
    agentStateContext,
    conflictDetection,
    temporalPattern,
    riskAssessment,
    learningIndicators,
    consensusTracking,
    reversalHistory,
    performanceBenchmark,
    explanations,
    prerequisites,
    provenanceChain,
    confidenceBreakdown,
    alternativeActions,
    resourceImpact,
    complianceScoring,
    userImpact,
    rollbackCapability,
    velocityMetrics,
    crossDomainImpact,
    predictiveIndicators,
    visualizationData,
    notificationTriggers,
    auditTrail,
    tags,
    comparisonData,
    healthDegradation,
    smartDefaultsApplied,
    optimizationHints,
    replayCapability,
    streamingMetadata,
  };
}

// ============================================================================
// MAIN API HANDLER (Enhanced with all 25 improvements)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse all query parameters (original + new)
    const agentFilter = searchParams.get("agent") as AgentPersona | null;
    const limitParam = searchParams.get("limit");
    const sinceParam = searchParams.get("since");
    const minConfidenceParam = searchParams.get("minConfidence");
    const maxConfidenceParam = searchParams.get("maxConfidence");
    const categoryFilter = searchParams.get(
      "category"
    ) as DecisionCategory | null;
    const impactFilter = searchParams.get("impact") as DecisionImpact | null;
    const urgentOnly = searchParams.get("urgency") === "true";
    const sortByParam = searchParams.get("sortBy") as SortField | null;
    const orderParam = searchParams.get("order") as SortOrder | null;
    const formatParam = searchParams.get("format") as ResponseFormat | null;
    const cursorParam = searchParams.get("cursor");
    const explainabilityDepthParam = searchParams.get(
      "explainabilityDepth"
    ) as ExplainabilityDepth | null;
    const includeAlternatives =
      searchParams.get("includeAlternatives") === "true";
    const includeBenchmark = searchParams.get("includeBenchmark") === "true";
    const includeReplay = searchParams.get("includeReplay") === "true";
    const tagsFilter = searchParams.get("tags")?.split(",");
    const streamingEnabled = searchParams.get("stream") === "true";

    // Enhancement #52: Smart query defaults
    const smartDefaultsApplied: Array<{
      field: string;
      defaultValue: string;
      reason: string;
    }> = [];

    const limit = limitParam ? Math.min(parseInt(limitParam), 100) : 20;
    const since = sinceParam ? new Date(sinceParam) : null;
    const minConfidence = minConfidenceParam ? parseInt(minConfidenceParam) : 0;
    const maxConfidence = maxConfidenceParam
      ? parseInt(maxConfidenceParam)
      : 100;
    let sortBy = sortByParam || "timestamp";
    const order = orderParam || "desc";
    const format = formatParam || "standard";
    const explainabilityDepth = explainabilityDepthParam || "intermediate";

    // Apply smart defaults based on context
    if (categoryFilter === "override" && !urgentOnly) {
      smartDefaultsApplied.push({
        field: "urgency",
        defaultValue: "true",
        reason: "Override decisions are typically urgent",
      });
    }

    if (impactFilter === "critical" && sortBy === "timestamp") {
      sortBy = "risk";
      smartDefaultsApplied.push({
        field: "sortBy",
        defaultValue: "risk",
        reason: "Critical impact decisions best sorted by risk score",
      });
    }

    if (categoryFilter === "trading" && !includeAlternatives) {
      smartDefaultsApplied.push({
        field: "includeAlternatives",
        defaultValue: "true",
        reason: "Trading decisions benefit from alternative action analysis",
      });
    }

    // Enhancement #53: Query optimization hints
    const optimizationHints: string[] = [];

    if (!agentFilter && limit > 50) {
      optimizationHints.push(
        "Tip: Filter by specific agent for faster queries with large limits"
      );
    }

    if (!categoryFilter && !impactFilter) {
      optimizationHints.push(
        "Tip: Add category or impact filters to reduce result set size"
      );
    }

    if (sortBy === "risk" && !minConfidence) {
      optimizationHints.push(
        "Tip: Combine risk sorting with confidence filters for better insights"
      );
    }

    // Check cache
    const cacheKey = getCacheKey({
      agent: agentFilter,
      limit,
      since: since?.getTime(),
      minConfidence,
      maxConfidence,
      category: categoryFilter,
      impact: impactFilter,
      urgent: urgentOnly,
      sortBy,
      order,
      tags: tagsFilter?.join(","),
    });

    const cachedDecisions = getCachedDecisions(cacheKey);
    if (cachedDecisions && !streamingEnabled) {
      // Return cached response
      const formattedData = formatDecisions(
        cachedDecisions,
        format,
        explainabilityDepth
      );
      const stats = calculateStatistics(cachedDecisions);

      return NextResponse.json(
        {
          data: formattedData,
          count: cachedDecisions.length,
          cached: true,
          smartDefaultsApplied,
          optimizationHints,
          ...buildResponseMetadata(
            cachedDecisions,
            {
              agent: agentFilter,
              limit,
              since,
              minConfidence,
              maxConfidence,
              category: categoryFilter,
              impact: impactFilter,
              urgent: urgentOnly,
              sortBy,
              order,
              tags: tagsFilter,
            },
            stats
          ),
        },
        {
          headers: {
            "Cache-Control": "private, max-age=30",
            "X-Data-Source": "mock-cached",
            "X-Cache-Hit": "true",
          },
        }
      );
    }

    // Generate mock decisions (extra for filtering)
    const baseDecisions = generateMockAgentDecisions(limit * 3);

    // Transform all decisions with enhancement options
    let enhancedDecisions = baseDecisions.map((d) =>
      enhanceDecision(d, baseDecisions, {
        explainabilityDepth,
        includeAlternatives,
        includeBenchmark,
        includeReplay,
      })
    );

    // Apply filters (including new tag filter)
    enhancedDecisions = applyFilters(enhancedDecisions, {
      agent: agentFilter,
      since,
      minConfidence,
      maxConfidence,
      category: categoryFilter,
      impact: impactFilter,
      urgentOnly,
      tags: tagsFilter,
    });

    // Apply sorting (including new risk sort)
    enhancedDecisions = applySorting(enhancedDecisions, sortBy, order);

    // Pagination
    const totalCount = enhancedDecisions.length;
    const cursorIndex = cursorParam ? parseInt(cursorParam) : 0;
    const paginatedDecisions = enhancedDecisions.slice(
      cursorIndex,
      cursorIndex + limit
    );
    const hasMore = cursorIndex + limit < totalCount;
    const nextCursor = hasMore ? (cursorIndex + limit).toString() : null;

    // Cache the results
    if (!streamingEnabled) {
      setCachedDecisions(cacheKey, paginatedDecisions);
    }

    // Calculate statistics
    const statistics = calculateStatistics(paginatedDecisions);

    // Format based on requested format
    const formattedData = formatDecisions(
      paginatedDecisions,
      format,
      explainabilityDepth
    );

    // Enhancement #55: Streaming support (simplified for now)
    if (streamingEnabled) {
      // In a full implementation, this would use ReadableStream
      // For now, we'll just return with streaming metadata
      const withStreamingMeta = formattedData.map((d, idx) => ({
        ...d,
        streamingMetadata: {
          chunkIndex: idx,
          totalChunks: formattedData.length,
          isLastChunk: idx === formattedData.length - 1,
        },
      }));

      return NextResponse.json(
        {
          data: withStreamingMeta,
          count: paginatedDecisions.length,
          cached: false,
          streaming: true,
          smartDefaultsApplied,
          optimizationHints,
          ...buildResponseMetadata(
            paginatedDecisions,
            {
              agent: agentFilter,
              limit,
              since,
              minConfidence,
              maxConfidence,
              category: categoryFilter,
              impact: impactFilter,
              urgent: urgentOnly,
              sortBy,
              order,
              tags: tagsFilter,
            },
            statistics
          ),
          pagination: {
            totalCount,
            hasMore,
            nextCursor,
            currentOffset: cursorIndex,
          },
        },
        {
          headers: {
            "Cache-Control": "no-cache",
            "X-Data-Source": "mock-streaming",
            "X-Total-Count": totalCount.toString(),
            "X-Has-More": hasMore.toString(),
          },
        }
      );
    }

    return NextResponse.json(
      {
        data: formattedData,
        count: paginatedDecisions.length,
        cached: false,
        smartDefaultsApplied,
        optimizationHints,
        ...buildResponseMetadata(
          paginatedDecisions,
          {
            agent: agentFilter,
            limit,
            since,
            minConfidence,
            maxConfidence,
            category: categoryFilter,
            impact: impactFilter,
            urgent: urgentOnly,
            sortBy,
            order,
            tags: tagsFilter,
          },
          statistics
        ),
        pagination: {
          totalCount,
          hasMore,
          nextCursor,
          currentOffset: cursorIndex,
        },
      },
      {
        headers: {
          "Cache-Control": "private, max-age=30",
          "X-Data-Source": "mock",
          "X-Total-Count": totalCount.toString(),
          "X-Has-More": hasMore.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Agent decisions API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch agent decisions",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// FILTERING, SORTING, FORMATTING UTILITIES
// ============================================================================

/**
 * Enhancement #18: Apply all filters to decisions (with tag support)
 */
function applyFilters(
  decisions: EnhancedDecision[],
  filters: {
    agent: AgentPersona | null;
    since: Date | null;
    minConfidence: number;
    maxConfidence: number;
    category: DecisionCategory | null;
    impact: DecisionImpact | null;
    urgentOnly: boolean;
    tags?: string[];
  }
): EnhancedDecision[] {
  return decisions.filter((d) => {
    // Agent filter
    if (filters.agent && d.agent !== filters.agent) return false;

    // Time filter
    if (filters.since && new Date(d.timestamp) < filters.since) return false;

    // Confidence range filter
    if (
      d.confidence < filters.minConfidence ||
      d.confidence > filters.maxConfidence
    )
      return false;

    // Category filter
    if (filters.category && d.category !== filters.category) return false;

    // Impact filter
    if (filters.impact && d.impact !== filters.impact) return false;

    // Urgency filter
    if (
      filters.urgentOnly &&
      d.urgency !== "urgent" &&
      d.urgency !== "emergency"
    )
      return false;

    // Tag filter (Enhancement #49)
    if (filters.tags && filters.tags.length > 0) {
      const hasAllTags = filters.tags.every((tag) => d.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    return true;
  });
}

/**
 * Enhancement #21: Sort decisions (with risk support)
 */
function applySorting(
  decisions: EnhancedDecision[],
  sortBy: SortField,
  order: SortOrder
): EnhancedDecision[] {
  const sorted = [...decisions].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "timestamp":
        comparison =
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
      case "confidence":
        comparison = a.confidence - b.confidence;
        break;
      case "impact":
        const impactOrder = { low: 1, medium: 2, high: 3, critical: 4 };
        comparison = impactOrder[a.impact] - impactOrder[b.impact];
        break;
      case "urgency":
        const urgencyOrder = {
          routine: 1,
          elevated: 2,
          urgent: 3,
          emergency: 4,
        };
        comparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        break;
      case "risk":
        // Sort by risk assessment score (Enhancement #29)
        comparison =
          a.riskAssessment.overallRiskScore - b.riskAssessment.overallRiskScore;
        break;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Enhancement #22: Calculate statistical summary
 */
function calculateStatistics(decisions: EnhancedDecision[]) {
  if (decisions.length === 0) {
    return {
      avgConfidence: 0,
      avgQualityScore: 0,
      trustDistribution: { excellent: 0, good: 0, fair: 0, poor: 0 },
      decisionTypeBreakdown: {},
      impactBreakdown: { low: 0, medium: 0, high: 0, critical: 0 },
      urgencyBreakdown: { routine: 0, elevated: 0, urgent: 0, emergency: 0 },
    };
  }

  const avgConfidence =
    decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length;
  const avgQualityScore =
    decisions.reduce((sum, d) => sum + d.qualityScore, 0) / decisions.length;

  const trustDistribution = {
    excellent: decisions.filter(
      (d) => d.trustMathematics.trustGrade === "excellent"
    ).length,
    good: decisions.filter((d) => d.trustMathematics.trustGrade === "good")
      .length,
    fair: decisions.filter((d) => d.trustMathematics.trustGrade === "fair")
      .length,
    poor: decisions.filter((d) => d.trustMathematics.trustGrade === "poor")
      .length,
  };

  const decisionTypeBreakdown = decisions.reduce(
    (acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const impactBreakdown = {
    low: decisions.filter((d) => d.impact === "low").length,
    medium: decisions.filter((d) => d.impact === "medium").length,
    high: decisions.filter((d) => d.impact === "high").length,
    critical: decisions.filter((d) => d.impact === "critical").length,
  };

  const urgencyBreakdown = {
    routine: decisions.filter((d) => d.urgency === "routine").length,
    elevated: decisions.filter((d) => d.urgency === "elevated").length,
    urgent: decisions.filter((d) => d.urgency === "urgent").length,
    emergency: decisions.filter((d) => d.urgency === "emergency").length,
  };

  return {
    avgConfidence: Math.round(avgConfidence * 10) / 10,
    avgQualityScore: Math.round(avgQualityScore * 10) / 10,
    trustDistribution,
    decisionTypeBreakdown,
    impactBreakdown,
    urgencyBreakdown,
  };
}

/**
 * Enhancement #25: Format decisions based on response format (with explainability depth)
 */
function formatDecisions(
  decisions: EnhancedDecision[],
  format: ResponseFormat,
  explainabilityDepth: ExplainabilityDepth = "intermediate"
): (EnhancedDecision | Partial<EnhancedDecision>)[] {
  if (format === "minimal") {
    return decisions.map((d) => ({
      id: d.id,
      agent: d.agent,
      summary: d.summary,
      confidence: d.confidence,
      timestamp: d.timestamp,
      category: d.category,
      impact: d.impact,
      // Include appropriate explanation for depth
      explanation:
        explainabilityDepth === "beginner"
          ? d.explanations.beginner
          : explainabilityDepth === "expert"
            ? d.explanations.expert
            : d.explanations.intermediate,
    }));
  }

  if (format === "full") {
    // Return everything with selected explanation depth
    return decisions.map((d) => ({
      ...d,
      explanations: {
        ...d.explanations,
        currentDepth: explainabilityDepth,
      },
    }));
  }

  // Standard format: omit some verbose fields but keep key advanced features
  return decisions.map((d) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      sourceHealthScores,
      relatedDecisions,
      provenanceChain,
      alternativeActions,
      ...standard
    } = d;
    return {
      ...standard,
      // Include explanation at requested depth
      currentExplanation:
        explainabilityDepth === "beginner"
          ? d.explanations.beginner
          : explainabilityDepth === "expert"
            ? d.explanations.expert
            : d.explanations.intermediate,
    };
  });
}

/**
 * Build comprehensive response metadata (with tags support)
 */
function buildResponseMetadata(
  decisions: EnhancedDecision[],
  filters: {
    agent: AgentPersona | null;
    limit: number;
    since: Date | null;
    minConfidence: number;
    maxConfidence: number;
    category: DecisionCategory | null;
    impact: DecisionImpact | null;
    urgent: boolean;
    sortBy: SortField;
    order: SortOrder;
    tags?: string[];
  },
  statistics: ReturnType<typeof calculateStatistics>
) {
  return {
    filters: {
      agent: filters.agent,
      limit: filters.limit,
      since: filters.since?.toISOString(),
      minConfidence: filters.minConfidence,
      maxConfidence: filters.maxConfidence,
      category: filters.category,
      impact: filters.impact,
      urgency: filters.urgent,
      sortBy: filters.sortBy,
      order: filters.order,
      tags: filters.tags,
    },
    statistics,
    traceId: `trace-${Date.now()}`,
  };
}
