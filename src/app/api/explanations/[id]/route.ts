/**
 * API Route: /api/explanations/[id]
 *
 * Comprehensive AI Decision Explanation System
 * Returns multi-depth explanations for specific AI decisions with complete provenance,
 * constraint validation, impact analysis, and decision relationship mapping.
 *
 * Features (50 enhancements across 12 categories):
 *
 * CORE EXPLAINABILITY (8):
 * 1. Multi-Depth Explanations - Beginner/Intermediate/Expert with analogies and technical details
 * 2. Reasoning Chain Visualization - Step-by-step logic with supporting data and timeline
 * 3. Confidence Breakdown - Overall + factor-by-factor confidence with uncertainty bounds
 * 4. Alternative Actions Analysis - All options considered with rejection reasoning
 * 5. Counterfactual Scenarios - "What if" analysis with outcome deltas
 * 6. Decision Prerequisites - Required conditions checklist with criticality levels
 * 7. Assumption Transparency - Explicit assumptions with sensitivity analysis
 * 8. Mathematical/Algorithmic Details - Model types, optimization, formulas, hyperparameters
 *
 * DATA & TRUST PROVENANCE (5):
 * 9. Multi-Source Data Provenance - Complete lineage with trust scores per step
 * 10. Freshness & Staleness Tracking - Data age with decay calculation and warnings
 * 11. Trust Mathematics - Consensus strength, outlier detection, quality scores
 * 12. Data Validation Chain - All validation checks with pass/fail status
 * 13. zkProof Integration - Proof hashes, verification status, audit trails
 *
 * CONSTRAINTS & COMPLIANCE (4):
 * 14. Constraint Validation Details - All constraints with satisfaction status and margins
 * 15. Regulatory Compliance Mapping - Applicable regulations with evidence links
 * 16. Safety Bounds Verification - Thresholds, override conditions, fail-safes
 * 17. Policy Adherence - Governance policies, token holder alignment, risk rules
 *
 * IMPACT & OUTCOMES (5):
 * 18. Multi-Stakeholder Impact Analysis - Revenue, stability, environmental, workload impacts
 * 19. Financial Impact Projection - Revenue/cost breakdown, ROI, risk-adjusted returns
 * 20. Environmental Impact - CO2 avoided, renewable %, sustainability metrics
 * 21. Outcome Tracking - Predicted vs actual with variance and accuracy scoring
 * 22. Decision Quality Score - Historical quality, success rate, lessons learned
 *
 * AGENT CONTEXT (4):
 * 23. Agent State Snapshot - Cognitive load, queue depth, resource utilization at decision time
 * 24. Multi-Agent Coordination - Involved agents, consensus, voting, coordination timeline
 * 25. Agent Authority Validation - Autonomous scope check, approval requirements, escalation
 * 26. Learning Context - Performance trends, adaptation history, improvement over time
 *
 * DECISION RELATIONSHIPS (4):
 * 27. Decision Chain Linking - Upstream triggers, downstream impacts, propagation tree
 * 28. Related Decisions - Similar past decisions with outcomes and patterns
 * 29. Dependency Graph - Prerequisites, dependent decisions, timing constraints
 * 30. Reversal & Rollback - Reversibility, complexity, history, approval requirements
 *
 * ADVANCED ANALYSIS & COMPARISON (5):
 * 31. Historical Decision Comparison - Accuracy/performance deltas vs similar past decisions
 * 32. Decision Performance Trending - 30/60/90 day trends with regression detection
 * 33. Comparative Baselines - Industry standard, theoretical optimal, peer asset comparisons
 * 34. Pattern Recognition - Recurring patterns, seasonal variations, correlations, anomalies
 * 35. Risk-Adjusted Performance - Sharpe ratio, worst/best case scenarios, expected value
 *
 * VISUALIZATION & PRESENTATION (4):
 * 36. Decision Tree Visualization - Nodes/branches with optimal path highlighting
 * 37. Timeline Chart Data - Milestones, coordination events, outcome realization
 * 38. Flow Diagram Generation - Data/decision/impact flow with transformation points
 * 39. Interactive Drill-Down - Progressive disclosure, complexity management, field selection
 *
 * CONFIDENCE & CALIBRATION (3):
 * 40. Model Confidence Calibration - Calibration curves, over/underconfidence analysis
 * 41. Uncertainty Quantification - Epistemic/aleatoric split, confidence intervals, Monte Carlo
 * 42. Consensus Strength Analysis - Agreement distribution, dissent, veto potential, stability
 *
 * REAL-TIME & MONITORING (3):
 * 43. Real-Time Decision Status - Execution phase, progress %, bottlenecks, live metrics
 * 44. Decision Velocity Context - Timing analysis, queue pressure, optimal window detection
 * 45. Alert & Warning History - Alerts considered, dismissed warnings, near-miss incidents
 *
 * AUDIT & COMPLIANCE (3):
 * 46. Immutable Audit Trail - Cryptographic signatures, blockchain anchor, tamper-proof verification
 * 47. Explanation Versioning - Version history, diffs, amendments, evolution tracking
 * 48. Compliance Evidence Links - Regulatory docs, certifications, audit reports, attestations
 *
 * ADVANCED FEATURES (2):
 * 49. Decision Replay Capability - Environment snapshot, deterministic reproduction, validation
 * 50. Explanation Quality Assessment - Completeness, clarity metrics, stakeholder comprehension
 *
 * Query Parameters:
 * - depth: "beginner" | "intermediate" | "expert" (default: "intermediate")
 * - format: "minimal" | "standard" | "full" | "timeline" (default: "standard")
 * - includeProvenance: boolean (default: true)
 * - includeImpact: boolean (default: true)
 * - includeRelationships: boolean (default: true)
 * - includeOutcomes: boolean (default: true)
 * - fields: comma-separated field names for partial selection (optional)
 *
 * @see PRD Section 8.2 - Explanation API
 */

import { NextRequest, NextResponse } from "next/server";
import { generateMockExplanation } from "@/lib/mock";
import type { AgentPersona } from "@/lib/types";

export const dynamic = "force-dynamic";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type ExplanationDepth = "beginner" | "intermediate" | "expert";
type ExplanationFormat = "minimal" | "standard" | "full" | "timeline";
type ConfidenceFactor =
  | "data_quality"
  | "model_accuracy"
  | "context"
  | "historical";
type CriticalityLevel = "required" | "recommended" | "optional";
type ValidationStatus = "passed" | "failed" | "warning" | "skipped";
type ComplianceStatus =
  | "compliant"
  | "non_compliant"
  | "partial"
  | "not_applicable";
type ImpactType = "positive" | "negative" | "neutral";
type StakeholderType =
  | "token_holder"
  | "grid_operator"
  | "community"
  | "operator";
type DecisionOutcome = "success" | "partial_success" | "failure" | "pending";
type RollbackComplexity =
  | "trivial"
  | "simple"
  | "complex"
  | "expert"
  | "impossible";
type RelationshipType =
  | "triggers"
  | "triggered_by"
  | "coordinates_with"
  | "depends_on"
  | "blocks";

// Phase 2 Enhancement Types (20 additional features)
type TrendDirection = "improving" | "stable" | "declining" | "volatile";
type DecisionPace = "rushed" | "normal" | "delayed" | "optimal";
type UncertaintyType = "epistemic" | "aleatoric" | "model" | "data";
type CalibrationQuality =
  | "excellent"
  | "good"
  | "fair"
  | "poor"
  | "uncalibrated";
type VisualizationType = "tree" | "timeline" | "flow" | "hierarchy";
type ExecutionPhase =
  | "planning"
  | "executing"
  | "validating"
  | "completed"
  | "failed";
type AuditLevel = "basic" | "standard" | "comprehensive" | "forensic";

// ============================================================================
// INTERFACE DEFINITIONS (30 original + 20 new = 50 total enhancements)
// ============================================================================

// Core Explainability (Enhancements #1-8)

interface MultiDepthExplanation {
  beginner: {
    summary: string;
    keyPoints: string[];
    analogy?: string;
    visualAid?: string; // Description of visual representation
  };
  intermediate: {
    summary: string;
    detailedContext: string[];
    dataPoints: Record<string, unknown>;
    assumptions: string[];
    tradeoffs: string[];
  };
  expert: {
    summary: string;
    technicalDetails: string[];
    algorithmicApproach: string;
    mathematicalModel?: string;
    codeReferences?: string[];
    uncertainties: string[];
    limitationsAndCaveats: string[];
  };
}

interface ReasoningStep {
  stepNumber: number;
  reasoning: string;
  supportingData: Record<string, unknown>;
  dataSource: string;
  confidence: number; // 0-100
  timestamp: string;
  visualRepresentation?: {
    type: "flowchart" | "timeline" | "decision_tree" | "graph";
    data: Record<string, unknown>;
  };
}

interface ReasoningChain {
  totalSteps: number;
  steps: ReasoningStep[];
  overallLogic: string;
  criticalPaths: string[]; // Which steps were most important
  timeline: {
    startTime: string;
    endTime: string;
    durationMs: number;
  };
}

interface ConfidenceFactor_Detail {
  factorType: ConfidenceFactor;
  weight: number; // 0-100, percentage contribution
  confidence: number; // 0-100
  reasoning: string;
  supportingEvidence: string[];
}

interface ConfidenceBreakdown {
  overallConfidence: number; // 0-100
  factors: ConfidenceFactor_Detail[];
  uncertaintyBounds: {
    lower: number;
    upper: number;
    confidenceInterval: number; // e.g., 95
  };
  sensitivityAnalysis: string[];
  calibrationScore: number; // How well-calibrated is this confidence historically
}

interface AlternativeAction {
  actionId: string;
  description: string;
  pros: string[];
  cons: string[];
  estimatedOutcome: {
    metric: string;
    value: number;
    unit: string;
  }[];
  rejectionReason: string;
  rejectionConfidence: number; // 0-100, how strongly rejected
  wouldReconsiderIf: string[];
  comparisonToSelected: {
    betterIn: string[];
    worseIn: string[];
  };
}

interface AlternativeActionsAnalysis {
  totalAlternativesConsidered: number;
  alternatives: AlternativeAction[];
  selectionRationale: string;
  diversityScore: number; // 0-100, how diverse the options were
}

interface CounterfactualScenario {
  scenarioId: string;
  description: string; // "What if we had..."
  changedParameters: Record<
    string,
    { actual: unknown; counterfactual: unknown }
  >;
  predictedOutcome: Record<string, number>;
  actualOutcome?: Record<string, number>; // If decision already executed
  delta: Record<string, number>;
  probability: number; // 0-100, likelihood this would have occurred
  keyDifferences: string[];
  lessonsLearned?: string[];
}

interface Prerequisite {
  condition: string;
  currentValue: unknown;
  requiredValue: unknown;
  satisfied: boolean;
  criticality: CriticalityLevel;
  marginToLimit?: number; // How close to threshold
  warning?: string;
}

interface DecisionPrerequisites {
  allRequiredMet: boolean;
  allRecommendedMet: boolean;
  prerequisites: Prerequisite[];
  nearMisses: string[]; // Conditions that almost failed
  safetyMargins: Record<string, number>;
}

interface Assumption {
  assumptionId: string;
  description: string;
  validationStatus: ValidationStatus;
  validationEvidence?: string;
  sensitivity: number; // 0-100, how sensitive decision is to this assumption
  ifInvalid: string; // What happens if assumption is wrong
  confidence: number; // 0-100, confidence assumption is correct
}

interface AssumptionTransparency {
  totalAssumptions: number;
  assumptions: Assumption[];
  criticalAssumptions: string[]; // Most important ones
  assumptionRiskScore: number; // 0-100, overall risk from assumptions
}

interface MathematicalDetails {
  modelType: string; // "LSTM", "ARIMA", "Linear Programming", etc.
  optimizationApproach: string;
  objectiveFunction?: string;
  constraints?: string[];
  hyperparameters: Record<string, unknown>;
  formulaRepresentation?: string; // LaTeX or plain text
  computationalComplexity: string; // e.g., "O(n log n)"
  convergenceCriteria?: string;
  iterationsRequired?: number;
}

// Data & Trust Provenance (Enhancements #9-13)

interface ProvenanceStep {
  step: "ingestion" | "processing" | "validation" | "analysis" | "decision";
  timestamp: string;
  actor: string; // System component or agent
  action: string;
  inputSources: string[];
  transformations: string[];
  validations: string[];
  trustScore: number; // 0-100
  inputHash?: string;
  outputHash?: string;
}

interface DataProvenance {
  dataPoint: string;
  originalSource: string;
  provenanceChain: ProvenanceStep[];
  totalLatencyMs: number;
  integrityVerified: boolean;
  auditTrailUrl?: string;
}

interface MultiSourceProvenance {
  dataSources: DataProvenance[];
  sourceDiversity: number; // 0-100, how diverse the sources
  crossValidation: {
    agreementScore: number; // 0-100
    outliers: string[];
    consensusMethod: string;
  };
}

interface DataFreshness {
  dataPoint: string;
  captureTime: string;
  processingTime: string;
  decisionTime: string;
  ageAtDecisionMs: number;
  freshnessScore: number; // 0-100, with decay function
  stalenessWarning: boolean;
  acceptableFreshnessThresholdMs: number;
}

interface FreshnessTracking {
  overallFreshnessScore: number; // 0-100
  dataFreshness: DataFreshness[];
  staleDataWarnings: string[];
  freshnessDecayFunction: string; // e.g., "exponential(lambda=0.001)"
}

interface TrustMetric {
  source: string;
  trustScore: number; // 0-100
  consensusStrength: number; // 0-100, agreement with other sources
  outlierDetected: boolean;
  outlierSeverity?: number; // 0-100 if outlier
  dataQualityScore: number; // 0-100
  historicalReliability: number; // 0-100
}

interface TrustMathematics {
  overallTrustScore: number; // 0-100
  sources: TrustMetric[];
  consensusAlgorithm: string; // "weighted_average", "median", "bayesian"
  outlierHandling: string;
  trustThreshold: number; // Minimum trust required
  trustSufficient: boolean;
}

interface ValidationCheck {
  checkType: string; // "range_check", "consistency_check", "schema_validation"
  description: string;
  status: ValidationStatus;
  details?: string;
  timestamp: string;
}

interface DataValidationChain {
  totalChecks: number;
  checksPerformed: ValidationCheck[];
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  validationScore: number; // 0-100
  criticalFailures: string[];
}

interface ZkProofArtifact {
  proofHash: string;
  proofType: string; // "decision_integrity", "data_provenance", "computation_correctness"
  verificationStatus: "verified" | "unverified" | "failed" | "pending";
  verificationTimestamp?: string;
  verifierPublicKey?: string;
  auditTrailUrl?: string;
  proofGenerationTime: string;
}

interface ZkProofIntegration {
  proofAvailable: boolean;
  proofs: ZkProofArtifact[];
  overallVerificationStatus: "verified" | "unverified" | "partial" | "failed";
  trustEnhancement: number; // 0-100, how much proofs increase trust
}

// Constraints & Compliance (Enhancements #14-17)

interface ConstraintCheck {
  constraintType: string; // "thermal", "voltage", "SOC", "regulatory"
  description: string;
  limit: number;
  actualValue: number;
  satisfied: boolean;
  marginToLimit: number; // Percentage margin
  criticalityLevel: CriticalityLevel;
  unit: string;
}

interface ConstraintValidationDetails {
  totalConstraints: number;
  constraintsChecked: ConstraintCheck[];
  allSatisfied: boolean;
  criticalViolations: string[];
  warnings: string[];
  safetyMarginScore: number; // 0-100
}

interface RegulatoryRequirement {
  regulation: string; // "IEEE 1547", "UL 1741", "IEC 62109"
  requirementDescription: string;
  complianceStatus: ComplianceStatus;
  evidenceLink?: string;
  lastAuditDate: string;
  nextAuditDue?: string;
}

interface RegulatoryCompliance {
  applicableRegulations: string[];
  requirements: RegulatoryRequirement[];
  overallComplianceScore: number; // 0-100
  nonCompliantItems: string[];
  certifications: string[];
  complianceOfficer?: string;
}

interface SafetyBound {
  boundType: string; // "temperature_max", "voltage_min", "frequency_deviation"
  threshold: number;
  actualValue: number;
  validated: boolean;
  emergencyOverrideCondition?: string;
  failSafeTriggered: boolean;
  unit: string;
}

interface SafetyVerification {
  allBoundsSatisfied: boolean;
  safetyBounds: SafetyBound[];
  emergencyOverridesAvailable: string[];
  failSafeMechanisms: string[];
  safetyScore: number; // 0-100
}

interface PolicyCheck {
  policyId: string;
  policyDescription: string;
  adherenceStatus: "adhered" | "violated" | "partial";
  details: string;
  tokenHolderAlignment: number; // 0-100, how well aligned with token holder interests
}

interface PolicyAdherence {
  governancePolicies: PolicyCheck[];
  tokenHolderInterestScore: number; // 0-100
  riskManagementRules: string[];
  policyViolations: string[];
  overallAdherenceScore: number; // 0-100
}

// Impact & Outcomes (Enhancements #18-22)

interface StakeholderImpact {
  stakeholderType: StakeholderType;
  estimatedCount: number;
  impactType: ImpactType;
  impactMagnitude: number; // 0-100
  specificImpacts: {
    metric: string;
    value: number;
    unit: string;
    description: string;
  }[];
}

interface MultiStakeholderImpact {
  totalStakeholders: number;
  impactByStakeholder: StakeholderImpact[];
  netBenefitScore: number; // -100 to +100
  conflictingInterests: string[];
  mitigation: string[];
}

interface FinancialImpact {
  revenueImpact: number; // USD
  costImpact: number; // USD
  netImpact: number; // USD
  breakdown: {
    category: string;
    amount: number;
    description: string;
  }[];
  roi: number; // Percentage
  riskAdjustedReturn: number; // USD
  paybackPeriodDays?: number;
}

interface EnvironmentalImpact {
  co2AvoidedKg: number;
  renewableEnergyPercentage: number;
  sustainabilityScore: number; // 0-100
  equivalentMetrics: {
    treesPlanted: number;
    milesDrivenAvoided: number;
    homesPoweredDays: number;
  };
  carbonCredits?: number;
}

interface OutcomeComparison {
  metric: string;
  predicted: number;
  actual: number;
  variance: number; // Percentage
  accuracyScore: number; // 0-100
  unit: string;
}

interface OutcomeTracking {
  decisionExecuted: boolean;
  executionTimestamp?: string;
  predictedOutcomes: Record<string, number>;
  actualOutcomes?: Record<string, number>;
  comparisons: OutcomeComparison[];
  overallAccuracyScore: number; // 0-100
  rootCauseOfVariance?: string[];
  correctionsMade?: string[];
}

interface DecisionQualityMetrics {
  qualityScore: number; // 0-100
  historicalSuccessRate: number; // 0-100
  similarDecisionsAnalyzed: number;
  averageOutcomeQuality: number; // 0-100
  lessonsLearned: string[];
  improvementTrend: "improving" | "stable" | "declining";
  bestPractices: string[];
}

// Agent Context (Enhancements #23-26)

interface AgentStateSnapshot {
  agentPersona: AgentPersona;
  snapshotTimestamp: string;
  cognitiveLoad: number; // 0-100
  activeDecisions: number;
  queueDepth: number;
  resourceUtilization: {
    cpu: number; // 0-100%
    memory: number; // 0-100%
    processingLatencyMs: number;
  };
  attentionFocus: string[];
  stressLevel: number; // 0-100
}

interface AgentVote {
  agentPersona: AgentPersona;
  vote: "approve" | "reject" | "abstain";
  confidence: number; // 0-100
  reasoning: string;
  votingPower?: number;
}

interface MultiAgentCoordination {
  coordinationRequired: boolean;
  involvedAgents: AgentPersona[];
  coordinationMethod: "consensus" | "voting" | "hierarchy" | "market";
  votes?: AgentVote[];
  consensusReached: boolean;
  consensusStrength: number; // 0-100
  dissent?: string[];
  coordinationTimeline: {
    initiatedAt: string;
    completedAt: string;
    durationMs: number;
  };
}

interface AgentAuthorityCheck {
  withinAutonomousScope: boolean;
  approvalRequired: boolean;
  approvalObtained?: boolean;
  approvalAuthority?: string;
  escalationPath: string[];
  authorityLimits: {
    energyKw?: number;
    financialUsd?: number;
    timeframeMinutes?: number;
  };
  overrideAvailable: boolean;
}

interface PerformanceTrend {
  metric: string;
  initialValue: number;
  currentValue: number;
  improvement: number; // Percentage
  trend: "improving" | "stable" | "declining";
}

interface LearningContext {
  decisionType: string;
  performanceTrends: PerformanceTrend[];
  adaptationHistory: {
    timestamp: string;
    change: string;
    trigger: string;
    outcomeImpact: number; // +/- improvement
  }[];
  learningVelocity: number; // 0-100
  modelVersions: string[];
  currentModelVersion: string;
}

// Decision Relationships (Enhancements #27-30)

interface DecisionRelationship {
  relatedDecisionId: string;
  relationshipType: RelationshipType;
  description: string;
  strength: number; // 0-100
  timestamp: string;
}

interface DecisionChainLink {
  step: number;
  decisionId: string;
  domain: "energy" | "financial" | "operational" | "governance";
  description: string;
  agentPersona: AgentPersona;
  timestamp: string;
  impactMagnitude: number; // 0-100
}

interface DecisionChainLinking {
  chainId: string;
  upstreamTriggers: DecisionRelationship[];
  downstreamImpacts: DecisionRelationship[];
  propagationTree: DecisionChainLink[];
  chainComplete: boolean;
  totalChainDurationMs: number;
}

interface RelatedDecision {
  decisionId: string;
  description: string;
  similarity: number; // 0-100
  outcome: DecisionOutcome;
  outcomeQuality: number; // 0-100
  timestamp: string;
  lessonsApplicable: string[];
}

interface RelatedDecisionsAnalysis {
  patternMatched: string;
  similarDecisions: RelatedDecision[];
  historicalContext: string;
  successPatterns: string[];
  failurePatterns: string[];
  applicableLessons: string[];
}

interface DependencyNode {
  nodeId: string;
  nodeType: "prerequisite" | "dependent" | "concurrent";
  description: string;
  status: "completed" | "in_progress" | "waiting" | "failed";
  criticalPath: boolean;
  estimatedCompletionTime?: string;
}

interface DependencyGraph {
  prerequisitesCompleted: boolean;
  prerequisites: DependencyNode[];
  dependentDecisions: DependencyNode[];
  concurrentDecisions: DependencyNode[];
  criticalPath: string[];
  timingConstraints: {
    mustStartBy?: string;
    mustCompleteBy?: string;
    estimatedDuration: number; // ms
  };
}

interface ReversalRecord {
  reversalId: string;
  reversalTimestamp: string;
  reversalReason: string;
  reversalAuthority: string;
  impactOfReversal: string;
}

interface RollbackAnalysis {
  canBeReversed: boolean;
  complexity: RollbackComplexity;
  estimatedTimeMinutes: number;
  requiredActions: string[];
  risks: string[];
  dependencies: string[];
  approvalRequired: boolean;
  approvalAuthority?: string;
  reversalHistory: ReversalRecord[];
  automaticRollbackAvailable: boolean;
}

// ============================================================================
// PHASE 2 ENHANCEMENT INTERFACES (20 additional features)
// ============================================================================

// Advanced Analysis & Comparison (Enhancements #31-35)

interface HistoricalDecisionComparison {
  comparisonId: string;
  currentDecision: {
    id: string;
    accuracy: number; // 0-100
    performance: number; // 0-100
    outcome: DecisionOutcome;
  };
  similarPastDecisions: {
    id: string;
    timestamp: string;
    accuracy: number;
    performance: number;
    outcome: DecisionOutcome;
    similarityScore: number; // 0-100
  }[];
  accuracyDelta: number; // Current vs avg past
  performanceDelta: number; // Current vs avg past
  outcomeVariance: number; // Statistical variance in outcomes
  keyDifferences: string[];
  improvementAreas: string[];
}

interface DecisionPerformanceTrending {
  decisionType: string;
  trends: {
    period: "30d" | "60d" | "90d";
    direction: TrendDirection;
    dataPoints: { timestamp: string; performance: number }[];
    improvementRate: number; // % per period
    regressionDetected: boolean;
    regressionDetails?: string;
  }[];
  performanceMetrics: {
    avgPerformance30d: number;
    avgPerformance60d: number;
    avgPerformance90d: number;
    bestPerformance: { timestamp: string; score: number };
    worstPerformance: { timestamp: string; score: number };
  };
  qualityRegression: {
    detected: boolean;
    severity?: "minor" | "moderate" | "severe";
    affectedMetrics?: string[];
    rootCause?: string;
  };
}

interface ComparativeBaselines {
  industryStandard: {
    metric: string;
    industryAverage: number;
    currentValue: number;
    percentileDelta: number;
    ranking: string; // e.g., "Top 15%"
  }[];
  theoreticalOptimal: {
    metric: string;
    theoreticalMax: number;
    currentValue: number;
    efficiencyPercentage: number; // % of theoretical max
    gap: number;
  }[];
  peerAssets: {
    metric: string;
    peerAverage: number;
    peerBest: number;
    currentValue: number;
    percentileRank: number; // 0-100
  }[];
  overallPerformanceRank: {
    vsIndustry: number; // percentile
    vsTheoretical: number; // % of optimal
    vsPeers: number; // percentile
  };
}

interface PatternRecognitionAnalysis {
  recurringPatterns: {
    patternId: string;
    patternDescription: string;
    occurrenceCount: number;
    lastOccurrence: string;
    typicalOutcome: DecisionOutcome;
    confidence: number; // 0-100
  }[];
  seasonalVariations: {
    season: "spring" | "summer" | "fall" | "winter";
    performanceModifier: number; // +/- percentage
    reasoning: string;
  }[];
  correlations: {
    externalFactor: string; // e.g., "grid_price", "weather"
    correlationStrength: number; // -1 to 1
    significance: "high" | "moderate" | "low";
    description: string;
  }[];
  anomalousBehavior: {
    detected: boolean;
    description?: string;
    deviation?: number; // sigma from normal
  };
}

interface RiskAdjustedPerformance {
  riskMetrics: {
    volatility: number; // Standard deviation
    downsideRisk: number; // Semi-deviation
    maxDrawdown: number; // Worst peak-to-trough
  };
  sharpeRatio: number; // Risk-adjusted return
  sortinoRatio: number; // Downside risk-adjusted return
  worstCase: {
    scenario: string;
    probability: number; // 0-100
    impact: number; // Financial or operational
    mitigation: string[];
  };
  bestCase: {
    scenario: string;
    probability: number;
    impact: number;
    enablers: string[];
  };
  expectedValue: number; // Probability-weighted outcome
  riskScore: number; // 0-100, higher = riskier
}

// Visualization & Presentation (Enhancements #36-39)

interface DecisionTreeVisualization {
  rootNode: {
    nodeId: string;
    question: string;
    type: "root";
  };
  branches: {
    nodeId: string;
    parentId: string;
    condition: string;
    probability: number; // 0-1
    isPruned: boolean;
    isOptimal: boolean;
    decision?: string;
    children: string[]; // Child node IDs
  }[];
  optimalPath: string[]; // Node IDs in optimal path
  prunedPaths: {
    nodeIds: string[];
    pruneReason: string;
  }[];
  visualizationData: {
    nodes: { id: string; label: string; x?: number; y?: number }[];
    edges: {
      from: string;
      to: string;
      label: string;
      weight: number;
    }[];
  };
}

interface TimelineChartData {
  milestones: {
    timestamp: string;
    event: string;
    type: "decision" | "coordination" | "outcome" | "validation";
    importance: "critical" | "high" | "medium" | "low";
    description: string;
  }[];
  coordinationEvents: {
    timestamp: string;
    involvedAgents: string[];
    eventType: string;
    duration: number; // milliseconds
  }[];
  outcomeRealization: {
    predicted: { timestamp: string; value: number };
    actual: { timestamp: string; value: number };
    variance: number;
  }[];
  phases: {
    phase: ExecutionPhase;
    startTime: string;
    endTime: string;
    duration: number;
  }[];
}

interface FlowDiagramGeneration {
  dataFlow: {
    nodes: {
      id: string;
      label: string;
      type: "source" | "process" | "decision" | "output";
    }[];
    edges: {
      from: string;
      to: string;
      dataType: string;
      transformation?: string;
    }[];
  };
  decisionFlow: {
    nodes: {
      id: string;
      label: string;
      type: "input" | "analysis" | "decision" | "action";
    }[];
    edges: {
      from: string;
      to: string;
      condition?: string;
    }[];
  };
  impactPropagation: {
    nodes: {
      id: string;
      domain: string; // e.g., "energy", "financial"
      impactMagnitude: number; // 0-100
    }[];
    edges: {
      from: string;
      to: string;
      propagationDelay: number; // milliseconds
      attenuationFactor: number; // 0-1
    }[];
  };
}

interface InteractiveDrillDown {
  sections: {
    sectionId: string;
    title: string;
    summaryLevel: "collapsed" | "summary" | "detailed" | "expert";
    hasChildren: boolean;
    childSections: string[]; // Section IDs
    dataFields: string[]; // Which fields are in this section
    expansionLevels: {
      level: number;
      visibleFields: string[];
      description: string;
    }[];
  }[];
  progressiveDisclosure: {
    defaultView: string[]; // Field names visible by default
    level1Expansion: string[]; // Additional fields at level 1
    level2Expansion: string[]; // Additional fields at level 2
    fullView: string[]; // All fields
  };
  componentComplexity: {
    component: string;
    simplificationAvailable: boolean;
    detailLevels: ("beginner" | "intermediate" | "expert")[];
  }[];
}

// Confidence & Calibration (Enhancements #40-42)

interface ModelConfidenceCalibration {
  calibrationCurve: {
    predictedConfidence: number; // 0-100
    observedAccuracy: number; // 0-100
    sampleSize: number;
  }[];
  calibrationScore: number; // 0-100, 100 = perfectly calibrated
  overconfidenceAnalysis: {
    isOverconfident: boolean;
    averageOverconfidence: number; // percentage points
    affectedRanges: { min: number; max: number }[];
  };
  underconfidenceAnalysis: {
    isUnderconfident: boolean;
    averageUnderconfidence: number;
    affectedRanges: { min: number; max: number }[];
  };
  calibrationQuality: CalibrationQuality;
  recommendedAdjustment: number; // +/- to apply to confidence
}

interface UncertaintyQuantification {
  epistemicUncertainty: {
    value: number; // 0-100
    sources: string[];
    reducible: boolean;
    reductionStrategy?: string;
  };
  aleatoricUncertainty: {
    value: number; // 0-100
    sources: string[];
    irreducible: boolean;
  };
  confidenceIntervals: {
    metric: string;
    pointEstimate: number;
    ci_68: { lower: number; upper: number }; // 1 sigma
    ci_95: { lower: number; upper: number }; // 2 sigma
    ci_99: { lower: number; upper: number }; // 3 sigma
  }[];
  monteCarloResults: {
    simulations: number;
    outcomes: {
      percentile_5: number;
      percentile_25: number;
      percentile_50: number;
      percentile_75: number;
      percentile_95: number;
    };
    probabilityDistribution: {
      value: number;
      probability: number;
    }[];
  };
}

interface ConsensusStrengthAnalysis {
  agreementDistribution: {
    agentPersona: string;
    voteWeight: number; // 0-1
    agreement:
      | "strong_agree"
      | "agree"
      | "neutral"
      | "disagree"
      | "strong_disagree";
    confidence: number; // 0-100
  }[];
  dissentAnalysis: {
    dissentingAgents: string[];
    dissentReasons: string[];
    dissentSeverity: "minor" | "moderate" | "major";
    dissentResolution: string;
  };
  vetoPotential: {
    vetoAvailable: boolean;
    vetoAuthority?: string;
    vetoLikelihood: number; // 0-100
    vetoConsequences?: string[];
  };
  consensusStability: {
    stable: boolean;
    stabilityScore: number; // 0-100
    volatilityFactors: string[];
  };
  overallConsensusStrength: number; // 0-100
}

// Real-Time & Monitoring (Enhancements #43-45)

interface RealTimeDecisionStatus {
  executionPhase: ExecutionPhase;
  progressPercentage: number; // 0-100
  estimatedCompletion: string; // ISO timestamp
  elapsedTime: number; // milliseconds
  remainingTime: number; // milliseconds
  bottlenecks: {
    component: string;
    delayImpact: number; // milliseconds
    reason: string;
    mitigation?: string;
  }[];
  liveMetrics: {
    metric: string;
    currentValue: number;
    targetValue: number;
    status: "on_track" | "at_risk" | "delayed";
  }[];
  lastUpdate: string;
}

interface DecisionVelocityContext {
  timingAnalysis: {
    timeToDecision: number; // milliseconds
    historicalAverage: number;
    percentileDelta: number; // vs historical
    classification: DecisionPace;
  };
  queuePressure: {
    queueDepth: number;
    queuedTime: number; // milliseconds
    priorityLevel: "low" | "normal" | "high" | "critical";
    pressureScore: number; // 0-100
  };
  decisionRush: {
    isRushed: boolean;
    rushFactor: number; // 1.0 = normal, >1.0 = rushed
    qualityImpact?: string;
  };
  optimalWindow: {
    withinOptimalWindow: boolean;
    windowStart: string;
    windowEnd: string;
    timing: "early" | "optimal" | "late";
  };
}

interface AlertWarningHistory {
  alertsConsidered: {
    alertId: string;
    timestamp: string;
    alertType: "threshold" | "trend" | "anomaly" | "safety";
    severity: "info" | "warning" | "critical";
    message: string;
    actionTaken: string;
  }[];
  dismissedWarnings: {
    warningId: string;
    timestamp: string;
    warningType: string;
    severity: string;
    message: string;
    dismissalReason: string;
    dismissedBy: string; // Agent or human
    consequenceAssessment: string;
  }[];
  nearMissIncidents: {
    incidentId: string;
    timestamp: string;
    thresholdType: string;
    actualValue: number;
    thresholdValue: number;
    marginToViolation: number; // How close
    preventiveMeasures: string[];
  }[];
  warningResponseTime: {
    avgResponseTimeMs: number;
    fastestResponseMs: number;
    slowestResponseMs: number;
  };
}

// Audit & Compliance (Enhancements #46-48)

interface ImmutableAuditTrail {
  auditLevel: AuditLevel;
  entries: {
    entryId: string;
    timestamp: string;
    actor: string;
    action: string;
    dataSnapshot: Record<string, unknown>;
    cryptographicSignature: string;
    previousEntryHash: string;
    currentEntryHash: string;
  }[];
  blockchainAnchor?: {
    blockHeight: number;
    txHash: string;
    network: string;
    confirmations: number;
  };
  tamperProof: {
    verified: boolean;
    integrityChecks: number;
    lastVerification: string;
  };
  completenessScore: number; // 0-100
  auditableEvents: number;
  recordedEvents: number;
}

interface ExplanationVersioning {
  versions: {
    versionNumber: number;
    timestamp: string;
    phase: ExecutionPhase;
    explanationSnapshot: Record<string, unknown>;
    changes: string[];
    changeReason: string;
  }[];
  versionDiff: {
    from: number;
    to: number;
    addedFields: string[];
    removedFields: string[];
    modifiedFields: {
      field: string;
      oldValue: unknown;
      newValue: unknown;
    }[];
  }[];
  amendmentHistory: {
    amendmentId: string;
    timestamp: string;
    amendedBy: string;
    amendmentReason: string;
    affectedSections: string[];
    approvalRequired: boolean;
  }[];
  currentVersion: number;
  evolutionComplete: boolean;
}

interface ComplianceEvidenceLinks {
  regulatoryDocuments: {
    regulation: string;
    documentTitle: string;
    section: string;
    url: string;
    relevance: "direct" | "supporting" | "reference";
  }[];
  certificationReferences: {
    certification: string;
    certNumber: string;
    issuedBy: string;
    validUntil: string;
    evidenceUrl: string;
  }[];
  auditReportExcerpts: {
    auditId: string;
    auditDate: string;
    auditor: string;
    finding: string;
    complianceStatus: ComplianceStatus;
    excerptText: string;
    reportUrl: string;
  }[];
  attestations: {
    attestationType: string;
    attestedBy: string;
    timestamp: string;
    statement: string;
    digitalSignature: string;
  }[];
}

// Advanced Features (Enhancements #49-50)

interface DecisionReplayCapability {
  replayable: boolean;
  environmentSnapshot: {
    timestamp: string;
    agentStates: Record<string, unknown>;
    systemState: Record<string, unknown>;
    externalInputs: Record<string, unknown>;
    randomSeed?: number; // For deterministic replay
  };
  replayWithDifferentInputs: {
    supported: boolean;
    modifiableInputs: string[];
    inputValidation: {
      input: string;
      constraints: string[];
      validRange: { min: number; max: number };
    }[];
  };
  deterministicReproduction: {
    guaranteed: boolean;
    reproductionAccuracy: number; // 0-100%
    nonDeterministicElements: string[];
  };
  replayValidation: {
    validationPossible: boolean;
    validationMethod: string;
    expectedOutcome: unknown;
  };
}

interface ExplanationQualityAssessment {
  completenessScore: number; // 0-100
  completenessBreakdown: {
    category: string;
    included: boolean;
    importance: "critical" | "high" | "medium" | "low";
    missingElements: string[];
  }[];
  clarityMetrics: {
    readabilityScore: number; // 0-100
    technicalAccuracy: number; // 0-100
    jargonDensity: number; // 0-100, lower is better
    sentenceComplexity: number; // 0-100, lower is better
  };
  technicalAccuracyValidation: {
    validated: boolean;
    validationMethod: string;
    accuracyScore: number; // 0-100
    inaccuracies: string[];
  };
  stakeholderComprehension: {
    stakeholderType: StakeholderType;
    estimatedComprehension: number; // 0-100
    recommendedDepth: ExplanationDepth;
    vocabularyAlignment: number; // 0-100
  }[];
  overallQualityScore: number; // 0-100
}

// Master Explanation Interface (Updated with Phase 2)

interface ComprehensiveExplanation {
  decisionId: string;
  agentPersona: AgentPersona;
  decisionType: string;
  timestamp: string;
  summary: string;

  // Core Explainability (1-8)
  multiDepthExplanation: MultiDepthExplanation; // #1
  reasoningChain: ReasoningChain; // #2
  confidenceBreakdown: ConfidenceBreakdown; // #3
  alternativeActions: AlternativeActionsAnalysis; // #4
  counterfactualScenarios: CounterfactualScenario[]; // #5
  prerequisites: DecisionPrerequisites; // #6
  assumptions: AssumptionTransparency; // #7
  mathematicalDetails: MathematicalDetails; // #8

  // Data & Trust Provenance (9-13)
  dataProvenance: MultiSourceProvenance; // #9
  freshnessTracking: FreshnessTracking; // #10
  trustMathematics: TrustMathematics; // #11
  validationChain: DataValidationChain; // #12
  zkProof: ZkProofIntegration; // #13

  // Constraints & Compliance (14-17)
  constraintValidation: ConstraintValidationDetails; // #14
  regulatoryCompliance: RegulatoryCompliance; // #15
  safetyVerification: SafetyVerification; // #16
  policyAdherence: PolicyAdherence; // #17

  // Impact & Outcomes (18-22)
  stakeholderImpact: MultiStakeholderImpact; // #18
  financialImpact: FinancialImpact; // #19
  environmentalImpact: EnvironmentalImpact; // #20
  outcomeTracking: OutcomeTracking; // #21
  qualityMetrics: DecisionQualityMetrics; // #22

  // Agent Context (23-26)
  agentState: AgentStateSnapshot; // #23
  multiAgentCoordination: MultiAgentCoordination; // #24
  authorityValidation: AgentAuthorityCheck; // #25
  learningContext: LearningContext; // #26

  // Decision Relationships (27-30)
  decisionChain: DecisionChainLinking; // #27
  relatedDecisions: RelatedDecisionsAnalysis; // #28
  dependencyGraph: DependencyGraph; // #29
  rollbackAnalysis: RollbackAnalysis; // #30

  // ========== PHASE 2 ENHANCEMENTS (20 additional features) ==========

  // Advanced Analysis & Comparison (31-35)
  historicalComparison: HistoricalDecisionComparison; // #31
  performanceTrending: DecisionPerformanceTrending; // #32
  comparativeBaselines: ComparativeBaselines; // #33
  patternRecognition: PatternRecognitionAnalysis; // #34
  riskAdjustedPerformance: RiskAdjustedPerformance; // #35

  // Visualization & Presentation (36-39)
  decisionTreeViz: DecisionTreeVisualization; // #36
  timelineChart: TimelineChartData; // #37
  flowDiagrams: FlowDiagramGeneration; // #38
  interactiveDrillDown: InteractiveDrillDown; // #39

  // Confidence & Calibration (40-42)
  confidenceCalibration: ModelConfidenceCalibration; // #40
  uncertaintyQuantification: UncertaintyQuantification; // #41
  consensusStrength: ConsensusStrengthAnalysis; // #42

  // Real-Time & Monitoring (43-45)
  realtimeStatus: RealTimeDecisionStatus; // #43
  velocityContext: DecisionVelocityContext; // #44
  alertHistory: AlertWarningHistory; // #45

  // Audit & Compliance (46-48)
  auditTrail: ImmutableAuditTrail; // #46
  versionHistory: ExplanationVersioning; // #47
  complianceEvidence: ComplianceEvidenceLinks; // #48

  // Advanced Features (49-50)
  replayCapability: DecisionReplayCapability; // #49
  qualityAssessment: ExplanationQualityAssessment; // #50

  // Metadata
  generationTimestamp: string;
  processingTimeMs: number;
  dataSourcesCount: number;
  trustScore: number; // Overall 0-100
}

// ============================================================================
// UTILITY FUNCTIONS (30 original + 20 new = 50 total enhancements)
// ============================================================================

/**
 * Enhancement #1: Generate multi-depth explanations
 */
function generateMultiDepthExplanation(
  decisionType: string,
  agent: AgentPersona
): MultiDepthExplanation {
  return {
    beginner: {
      summary: `The ${agent} agent decided to ${decisionType.replace(/_/g, " ")} to optimize the solar farm operation.`,
      keyPoints: [
        "The system automatically analyzed current conditions",
        `${agent === "operations" ? "Energy flow" : agent === "markets" ? "Market prices" : "Safety checks"} were monitored`,
        "The best action was selected from multiple options",
        "This decision helps maximize revenue while staying safe",
      ],
      analogy:
        agent === "operations"
          ? "Think of it like a smart thermostat: it continuously checks temperature and adjusts to keep you comfortable while saving energy."
          : "Think of it like a skilled trader: it watches market conditions and makes profitable moves at the right time.",
      visualAid: "Timeline showing: Monitor → Analyze → Decide → Execute",
    },
    intermediate: {
      summary: `${agent} agent executed ${decisionType} after analyzing real-time energy metrics, price forecasts, and safety constraints.`,
      detailedContext: [
        `Decision triggered by ${agent === "operations" ? "load demand change" : agent === "markets" ? "price threshold breach" : "safety monitoring"}`,
        "Real-time data from 5 sensors validated and cross-checked",
        "Predicted outcome: +$12.50 revenue, 95% efficiency",
        "All safety constraints satisfied with 15% margin",
        "Alternative actions considered: 2 options rejected due to lower ROI",
      ],
      dataPoints: {
        batterySOC: 78,
        gridPrice: 0.18,
        solarGeneration: 65,
        confidence: 92,
      },
      assumptions: [
        "Weather forecast accuracy: 85%",
        "Grid price stability for next 2 hours",
        "Battery degradation within normal limits",
      ],
      tradeoffs: [
        "Slightly higher battery cycling vs increased revenue",
        "Immediate action vs waiting for potential better prices",
      ],
    },
    expert: {
      summary: `Hybrid optimization using receding horizon MPC with LSTM forecast integration and multi-objective cost function.`,
      technicalDetails: [
        "Model: Receding Horizon Model Predictive Control (MPC) with 24h prediction window",
        "Forecasting: LSTM neural network (60%) + ARIMA (40%) ensemble",
        "Optimization: Mixed-Integer Linear Programming (MILP) via CPLEX solver",
        "Objective: max(revenue - degradation_cost - grid_fees) subject to constraints",
        "Update frequency: Re-optimize every 5 minutes with rolling horizon",
      ],
      algorithmicApproach:
        "Dynamic programming with value iteration, state space discretization (SOC: 20-100%, 1% steps), action space: [-50kW, +50kW, 5kW steps]",
      mathematicalModel:
        "max Σ(t=0 to T) [P(t)·price(t)·Δt - α·|P(t)|·degradation - β·losses(P(t))] s.t. SOC_min ≤ SOC(t) ≤ SOC_max, |P(t)| ≤ P_max, grid constraints",
      codeReferences: [
        "src/agents/operations/mpc_controller.ts:145",
        "src/models/battery/degradation_model.ts:78",
      ],
      uncertainties: [
        "Weather forecast RMSE: ±12%",
        "Load forecast RMSE: ±8%",
        "Price forecast RMSE: ±15%",
        "Battery capacity fade: 2-3% annually",
      ],
      limitationsAndCaveats: [
        "Does not model extreme weather events (>3 sigma)",
        "Simplified thermal dynamics (1D heat transfer)",
        "Grid curtailment events may override optimization",
        "Model assumes rational market behavior",
      ],
    },
  };
}

/**
 * Enhancement #2: Generate reasoning chain
 */
function generateReasoningChain(
  decisionType: string,
  agent: AgentPersona
): ReasoningChain {
  const now = Date.now();
  const steps: ReasoningStep[] = [
    {
      stepNumber: 1,
      reasoning:
        "Detected triggering condition: grid price elevated to $0.18/kWh (50% above average)",
      supportingData: {
        currentPrice: 0.18,
        averagePrice: 0.12,
        priceThreshold: 0.15,
      },
      dataSource: "grid_price_oracle:pyth+switchboard",
      confidence: 95,
      timestamp: new Date(now - 5000).toISOString(),
    },
    {
      stepNumber: 2,
      reasoning:
        "Validated battery state: SOC at 78%, sufficient for 2-hour discharge at 50kW",
      supportingData: {
        currentSOC: 78,
        minSOC: 20,
        dischargeCapacityKw: 50,
        estimatedDurationHours: 2.3,
      },
      dataSource: "battery_bms:direct_telemetry",
      confidence: 98,
      timestamp: new Date(now - 4500).toISOString(),
    },
    {
      stepNumber: 3,
      reasoning:
        "Forecasted demand: peak load in 30 minutes at 125kW, solar declining",
      supportingData: {
        forecastedPeakKw: 125,
        currentLoadKw: 95,
        solarGenerationKw: 65,
        solarDeclineRate: -8,
      },
      dataSource: "forecast_engine:lstm_ensemble",
      confidence: 87,
      timestamp: new Date(now - 4000).toISOString(),
    },
    {
      stepNumber: 4,
      reasoning:
        "Checked all safety constraints: temperature, voltage, frequency within bounds",
      supportingData: {
        batteryTempC: 28,
        gridVoltageV: 418,
        gridFrequencyHz: 60.02,
        allConstraintsSatisfied: true,
      },
      dataSource: "safety_monitor:realtime",
      confidence: 100,
      timestamp: new Date(now - 3500).toISOString(),
    },
    {
      stepNumber: 5,
      reasoning:
        "Evaluated alternatives: wait for higher price (rejected - may not occur), partial discharge (rejected - underutilizes)",
      supportingData: {
        alternativesConsidered: 2,
        selectedConfidence: 92,
        revenueOptimal: true,
      },
      dataSource: "decision_engine:optimization",
      confidence: 92,
      timestamp: new Date(now - 3000).toISOString(),
    },
    {
      stepNumber: 6,
      reasoning:
        "Selected action: discharge 50kW to grid for 2 hours, estimated revenue +$18.00",
      supportingData: {
        dischargeRateKw: 50,
        durationHours: 2,
        estimatedRevenueUsd: 18.0,
        efficiencyPercent: 93,
      },
      dataSource: "decision_engine:final_selection",
      confidence: 91,
      timestamp: new Date(now - 2500).toISOString(),
    },
  ];

  return {
    totalSteps: steps.length,
    steps,
    overallLogic:
      "Price-triggered opportunistic discharge with multi-constraint validation and alternative evaluation",
    criticalPaths: [
      "Step 1: Price trigger",
      "Step 4: Safety validation",
      "Step 6: Final selection",
    ],
    timeline: {
      startTime: steps[0].timestamp,
      endTime: steps[steps.length - 1].timestamp,
      durationMs: 2500,
    },
  };
}

/**
 * Enhancement #3: Generate confidence breakdown
 */
function generateConfidenceBreakdown(): ConfidenceBreakdown {
  const factors: ConfidenceFactor_Detail[] = [
    {
      factorType: "data_quality",
      weight: 30,
      confidence: 95,
      reasoning:
        "All 5 sensors operational, cross-validated, no outliers detected",
      supportingEvidence: [
        "Sensor calibration: 100% up to date",
        "Data gaps: 0% in last 24h",
        "Outlier rate: 0.2% (within normal)",
      ],
    },
    {
      factorType: "model_accuracy",
      weight: 35,
      confidence: 87,
      reasoning:
        "LSTM+ARIMA ensemble with 88% historical accuracy on similar conditions",
      supportingEvidence: [
        "Forecast RMSE: 8.5% on validation set",
        "Model trained on 3 years of data",
        "Recent performance: 91% accuracy last week",
      ],
    },
    {
      factorType: "context",
      weight: 20,
      confidence: 92,
      reasoning: "Current conditions match training distribution, no anomalies",
      supportingEvidence: [
        "Weather: typical for season",
        "Grid stability: normal",
        "No special events or disruptions",
      ],
    },
    {
      factorType: "historical",
      weight: 15,
      confidence: 89,
      reasoning: "Similar decisions historically successful 89% of the time",
      supportingEvidence: [
        "127 similar decisions analyzed",
        "Average outcome quality: 87/100",
        "Consistent pattern across seasons",
      ],
    },
  ];

  const weightedConfidence = factors.reduce(
    (sum, f) => sum + (f.confidence * f.weight) / 100,
    0
  );

  return {
    overallConfidence: Math.round(weightedConfidence),
    factors,
    uncertaintyBounds: {
      lower: Math.round(weightedConfidence - 8),
      upper: Math.round(weightedConfidence + 5),
      confidenceInterval: 95,
    },
    sensitivityAnalysis: [
      "Model accuracy most critical: 10% change → 3.5% confidence impact",
      "Data quality highly stable: minimal variance",
      "Historical patterns provide robust baseline",
    ],
    calibrationScore: 91,
  };
}

/**
 * Enhancement #4: Generate alternative actions analysis
 */
function generateAlternativeActions(
  decisionType: string
): AlternativeActionsAnalysis {
  const alternatives: AlternativeAction[] = [
    {
      actionId: "alt_wait_for_spike",
      description: "Wait 1 hour for potential price spike to $0.22/kWh",
      pros: [
        "Potentially 22% higher revenue if spike occurs",
        "Battery has capacity to wait",
        "Lower cycling stress on battery",
      ],
      cons: [
        "Price spike probability only 35%",
        "May miss current good price window",
        "Opportunity cost of inaction",
      ],
      estimatedOutcome: [
        { metric: "revenue", value: 22.0, unit: "USD" },
        { metric: "probability", value: 35, unit: "%" },
        { metric: "risk", value: 65, unit: "risk_score" },
      ],
      rejectionReason:
        "High uncertainty (65% chance spike doesn't occur) with significant opportunity cost",
      rejectionConfidence: 78,
      wouldReconsiderIf: [
        "Price forecast shows >80% probability of spike",
        "Current price drops below $0.15/kWh",
        "Battery SOC exceeds 95% (urgency to discharge)",
      ],
      comparisonToSelected: {
        betterIn: ["potential_max_revenue"],
        worseIn: ["certainty", "opportunity_cost", "timing"],
      },
    },
    {
      actionId: "alt_partial_discharge",
      description:
        "Discharge only 25kW instead of 50kW (conservative approach)",
      pros: [
        "Lower battery stress, slower degradation",
        "Maintains larger reserve for emergencies",
        "Reduced grid impact",
      ],
      cons: [
        "50% lower revenue ($9 vs $18)",
        "Underutilizes available capacity",
        "Same overhead for half the benefit",
      ],
      estimatedOutcome: [
        { metric: "revenue", value: 9.0, unit: "USD" },
        { metric: "efficiency", value: 94, unit: "%" },
        { metric: "battery_stress", value: 30, unit: "stress_score" },
      ],
      rejectionReason:
        "Overly conservative given battery health (92% SOH) and comfortable safety margins",
      rejectionConfidence: 72,
      wouldReconsiderIf: [
        "Battery SOH drops below 85%",
        "Forecast shows high demand uncertainty",
        "Grid stability warnings issued",
      ],
      comparisonToSelected: {
        betterIn: ["battery_longevity", "reserve_capacity"],
        worseIn: ["revenue", "capacity_utilization", "efficiency"],
      },
    },
  ];

  return {
    totalAlternativesConsidered: alternatives.length,
    alternatives,
    selectionRationale:
      "Selected option balances revenue maximization with acceptable risk while maintaining safety margins. Confidence-weighted expected value highest among all options.",
    diversityScore: 75,
  };
}

/**
 * Enhancement #5: Generate counterfactual scenarios
 */
function generateCounterfactualScenarios(): CounterfactualScenario[] {
  return [
    {
      scenarioId: "cf_discharge_earlier",
      description:
        "What if we had started discharging 1 hour earlier at $0.16/kWh?",
      changedParameters: {
        startTime: { actual: "17:00", counterfactual: "16:00" },
        initialPrice: { actual: 0.18, counterfactual: 0.16 },
      },
      predictedOutcome: {
        revenueUsd: 16.5,
        efficiencyPercent: 93.5,
        batterySOCEnd: 58,
      },
      delta: {
        revenueUsd: -1.5,
        efficiencyPercent: 0.5,
        batterySOCEnd: -2,
      },
      probability: 80,
      keyDifferences: [
        "Lower price but longer discharge window",
        "Would have captured rising price trend",
        "Slightly better efficiency due to lower grid load",
      ],
      lessonsLearned: [
        "Current decision timing was near-optimal",
        "Price trend prediction accuracy validated",
      ],
    },
    {
      scenarioId: "cf_no_action",
      description: "What if we had not discharged at all (do nothing)?",
      changedParameters: {
        action: { actual: "discharge_50kw", counterfactual: "no_action" },
      },
      predictedOutcome: {
        revenueUsd: 0,
        efficiencyPercent: 0,
        batterySOCEnd: 78,
      },
      delta: {
        revenueUsd: -18.0,
        efficiencyPercent: -93,
        batterySOCEnd: 18,
      },
      probability: 100,
      keyDifferences: [
        "Zero revenue from arbitrage opportunity",
        "Battery remains charged but unused",
        "Missed high-price window completely",
      ],
    },
  ];
}

/**
 * Enhancement #6: Generate decision prerequisites
 */
function generateDecisionPrerequisites(): DecisionPrerequisites {
  const prerequisites: Prerequisite[] = [
    {
      condition: "Battery SOC above minimum threshold",
      currentValue: 78,
      requiredValue: 20,
      satisfied: true,
      criticality: "required",
      marginToLimit: 290,
    },
    {
      condition: "Grid voltage within acceptable range",
      currentValue: 418,
      requiredValue: "400-440V",
      satisfied: true,
      criticality: "required",
      marginToLimit: 5,
    },
    {
      condition: "Grid frequency synchronized",
      currentValue: 60.02,
      requiredValue: "59.9-60.1 Hz",
      satisfied: true,
      criticality: "required",
      marginToLimit: 40,
    },
    {
      condition: "Battery temperature within safe range",
      currentValue: 28,
      requiredValue: "10-40°C",
      satisfied: true,
      criticality: "required",
      marginToLimit: 40,
    },
    {
      condition: "Price above profitability threshold",
      currentValue: 0.18,
      requiredValue: ">0.12",
      satisfied: true,
      criticality: "recommended",
      marginToLimit: 50,
    },
    {
      condition: "Weather forecast confidence adequate",
      currentValue: 85,
      requiredValue: ">70%",
      satisfied: true,
      criticality: "recommended",
      marginToLimit: 21,
    },
  ];

  return {
    allRequiredMet: prerequisites
      .filter((p) => p.criticality === "required")
      .every((p) => p.satisfied),
    allRecommendedMet: prerequisites
      .filter((p) => p.criticality === "recommended")
      .every((p) => p.satisfied),
    prerequisites,
    nearMisses: [],
    safetyMargins: {
      voltage: 5,
      frequency: 40,
      temperature: 40,
      soc: 290,
    },
  };
}

/**
 * Enhancement #7: Generate assumption transparency
 */
function generateAssumptionTransparency(): AssumptionTransparency {
  const assumptions: Assumption[] = [
    {
      assumptionId: "asm_weather_accuracy",
      description: "Weather forecast accuracy remains at historical 85% level",
      validationStatus: "passed",
      validationEvidence: "Recent forecasts: 87% accurate over last 7 days",
      sensitivity: 40,
      ifInvalid: "Revenue prediction error could increase to ±20%",
      confidence: 87,
    },
    {
      assumptionId: "asm_grid_stability",
      description: "Grid maintains current stable operating conditions",
      validationStatus: "passed",
      validationEvidence:
        "No grid alerts, voltage/frequency within 2% of nominal",
      sensitivity: 65,
      ifInvalid: "May need emergency disconnect, lose discharge opportunity",
      confidence: 95,
    },
    {
      assumptionId: "asm_battery_degradation",
      description: "Battery degradation rate remains linear at 2.5% annually",
      validationStatus: "passed",
      validationEvidence:
        "SOH tracking shows 2.3% degradation YoY, within model",
      sensitivity: 25,
      ifInvalid: "Long-term cost calculations off by up to 15%",
      confidence: 91,
    },
    {
      assumptionId: "asm_price_stability",
      description: "Grid price remains stable for next 2 hours (±10%)",
      validationStatus: "warning",
      validationEvidence: "Historical volatility shows ±15% possible",
      sensitivity: 55,
      ifInvalid: "Revenue could vary by ±$2.70",
      confidence: 78,
    },
  ];

  return {
    totalAssumptions: assumptions.length,
    assumptions,
    criticalAssumptions: ["asm_grid_stability", "asm_price_stability"],
    assumptionRiskScore: 22,
  };
}

/**
 * Enhancement #8: Generate mathematical details
 */
function generateMathematicalDetails(): MathematicalDetails {
  return {
    modelType:
      "Hybrid: LSTM Neural Network (forecasting) + MILP (optimization)",
    optimizationApproach: "Receding Horizon Model Predictive Control (MPC)",
    objectiveFunction:
      "max Σ(t=0 to T) [P(t)·price(t)·Δt - α·degradation(P(t)) - β·losses(P(t))]",
    constraints: [
      "SOC(t+1) = SOC(t) + η·P(t)·Δt/C_rated",
      "SOC_min ≤ SOC(t) ≤ SOC_max",
      "|P(t)| ≤ P_max",
      "|dP/dt| ≤ ramp_rate_max",
      "V_grid ∈ [V_min, V_max]",
      "f_grid ∈ [f_min, f_max]",
    ],
    hyperparameters: {
      lstm_layers: 3,
      lstm_units: 128,
      dropout: 0.2,
      learning_rate: 0.001,
      forecast_horizon: 24,
      control_horizon: 6,
      update_interval: 300,
    },
    formulaRepresentation:
      "degradation(P) = k₁·|P| + k₂·P² (quadratic cycle wear), losses(P) = R·P² + c₀ (resistive + constant)",
    computationalComplexity:
      "O(n·m·log(m)) where n=control_horizon, m=state_space_size",
    convergenceCriteria: "Dual gap < 1e-6 or iteration limit 1000",
    iterationsRequired: 47,
  };
}

// Continue with remaining utility functions in next part...

/**
 * Enhancements #9-13: Data & Trust Provenance
 */
function generateDataProvenance(): MultiSourceProvenance {
  const now = Date.now();
  return {
    dataSources: [
      {
        dataPoint: "grid_price",
        originalSource: "pyth_oracle",
        provenanceChain: [
          {
            step: "ingestion",
            timestamp: new Date(now - 2000).toISOString(),
            actor: "oracle_aggregator",
            action: "Fetch price from Pyth network",
            inputSources: ["pyth", "switchboard"],
            transformations: [],
            validations: ["price_range_check"],
            trustScore: 95,
            outputHash: "0x42a7f3...",
          },
          {
            step: "validation",
            timestamp: new Date(now - 1800).toISOString(),
            actor: "validation_engine",
            action: "Cross-validate with Switchboard",
            inputSources: ["pyth", "switchboard"],
            transformations: ["weighted_average"],
            validations: ["outlier_detection", "consensus_check"],
            trustScore: 97,
            inputHash: "0x42a7f3...",
            outputHash: "0x8b3c9a...",
          },
          {
            step: "decision",
            timestamp: new Date(now - 1500).toISOString(),
            actor: "markets_agent",
            action: "Use validated price in optimization",
            inputSources: ["validated_price_feed"],
            transformations: [],
            validations: [],
            trustScore: 97,
            inputHash: "0x8b3c9a...",
          },
        ],
        totalLatencyMs: 500,
        integrityVerified: true,
        auditTrailUrl: "/audit/provenance/grid_price_20241010_170000",
      },
    ],
    sourceDiversity: 85,
    crossValidation: {
      agreementScore: 98,
      outliers: [],
      consensusMethod: "weighted_median",
    },
  };
}

function generateFreshnessTracking(): FreshnessTracking {
  const now = Date.now();
  return {
    overallFreshnessScore: 94,
    dataFreshness: [
      {
        dataPoint: "battery_soc",
        captureTime: new Date(now - 1000).toISOString(),
        processingTime: new Date(now - 800).toISOString(),
        decisionTime: new Date(now - 500).toISOString(),
        ageAtDecisionMs: 500,
        freshnessScore: 99,
        stalenessWarning: false,
        acceptableFreshnessThresholdMs: 5000,
      },
      {
        dataPoint: "grid_price",
        captureTime: new Date(now - 2000).toISOString(),
        processingTime: new Date(now - 1800).toISOString(),
        decisionTime: new Date(now - 500).toISOString(),
        ageAtDecisionMs: 1500,
        freshnessScore: 95,
        stalenessWarning: false,
        acceptableFreshnessThresholdMs: 10000,
      },
    ],
    staleDataWarnings: [],
    freshnessDecayFunction: "exponential(lambda=0.0002)",
  };
}

function generateTrustMathematics(): TrustMathematics {
  return {
    overallTrustScore: 96,
    sources: [
      {
        source: "battery_bms_telemetry",
        trustScore: 98,
        consensusStrength: 100,
        outlierDetected: false,
        dataQualityScore: 99,
        historicalReliability: 97,
      },
      {
        source: "grid_price_oracle",
        trustScore: 97,
        consensusStrength: 98,
        outlierDetected: false,
        dataQualityScore: 96,
        historicalReliability: 95,
      },
    ],
    consensusAlgorithm: "weighted_median_with_outlier_rejection",
    outlierHandling: "winsorize_at_2_sigma",
    trustThreshold: 85,
    trustSufficient: true,
  };
}

function generateDataValidation(): DataValidationChain {
  const checks: ValidationCheck[] = [
    {
      checkType: "range_check",
      description: "Battery SOC within 0-100%",
      status: "passed",
      details: "SOC=78%, within [0,100]",
      timestamp: new Date().toISOString(),
    },
    {
      checkType: "consistency_check",
      description: "Energy balance validation",
      status: "passed",
      details: "Generation + Grid = Consumption + Battery, variance < 2%",
      timestamp: new Date().toISOString(),
    },
    {
      checkType: "rate_check",
      description: "Price change rate within expected bounds",
      status: "passed",
      details: "ΔPrice = +$0.02/min, within [-0.05, +0.05]",
      timestamp: new Date().toISOString(),
    },
  ];

  return {
    totalChecks: checks.length,
    checksPerformed: checks,
    passedChecks: checks.filter((c) => c.status === "passed").length,
    failedChecks: 0,
    warningChecks: 0,
    validationScore: 100,
    criticalFailures: [],
  };
}

function generateZkProof(): ZkProofIntegration {
  return {
    proofAvailable: true,
    proofs: [
      {
        proofHash: "0xd4e2a7b8c3f9...",
        proofType: "decision_integrity",
        verificationStatus: "verified",
        verificationTimestamp: new Date().toISOString(),
        verifierPublicKey: "0x8f3c9a2b7d4e...",
        auditTrailUrl: "/audit/zkproof/decision_20241010_170000",
        proofGenerationTime: new Date(Date.now() - 10000).toISOString(),
      },
    ],
    overallVerificationStatus: "verified",
    trustEnhancement: 15,
  };
}

/**
 * Enhancements #14-17: Constraints & Compliance
 */
function generateConstraintValidation(): ConstraintValidationDetails {
  const constraints: ConstraintCheck[] = [
    {
      constraintType: "thermal",
      description: "Battery temperature maximum",
      limit: 40,
      actualValue: 28,
      satisfied: true,
      marginToLimit: 30,
      criticalityLevel: "required",
      unit: "°C",
    },
    {
      constraintType: "voltage",
      description: "Grid voltage range",
      limit: 440,
      actualValue: 418,
      satisfied: true,
      marginToLimit: 5,
      criticalityLevel: "required",
      unit: "V",
    },
    {
      constraintType: "SOC",
      description: "Battery SOC minimum",
      limit: 20,
      actualValue: 78,
      satisfied: true,
      marginToLimit: 290,
      criticalityLevel: "required",
      unit: "%",
    },
  ];

  return {
    totalConstraints: constraints.length,
    constraintsChecked: constraints,
    allSatisfied: true,
    criticalViolations: [],
    warnings: [],
    safetyMarginScore: 92,
  };
}

function generateRegulatoryCompliance(): RegulatoryCompliance {
  return {
    applicableRegulations: ["IEEE 1547", "UL 1741", "IEC 62109"],
    requirements: [
      {
        regulation: "IEEE 1547",
        requirementDescription:
          "Grid interconnection and voltage/frequency ride-through",
        complianceStatus: "compliant",
        evidenceLink: "/compliance/ieee1547/report_2024Q3.pdf",
        lastAuditDate: "2024-09-15",
        nextAuditDue: "2024-12-15",
      },
      {
        regulation: "UL 1741",
        requirementDescription: "Inverter safety and anti-islanding",
        complianceStatus: "compliant",
        evidenceLink: "/compliance/ul1741/certification.pdf",
        lastAuditDate: "2024-08-20",
      },
    ],
    overallComplianceScore: 100,
    nonCompliantItems: [],
    certifications: ["UL 1741", "IEEE 1547", "IEC 62109"],
    complianceOfficer: "Safety Agent",
  };
}

function generateSafetyVerification(): SafetyVerification {
  const bounds: SafetyBound[] = [
    {
      boundType: "temperature_max",
      threshold: 40,
      actualValue: 28,
      validated: true,
      emergencyOverrideCondition: "Immediate shutdown if T > 45°C",
      failSafeTriggered: false,
      unit: "°C",
    },
    {
      boundType: "voltage_min",
      threshold: 400,
      actualValue: 418,
      validated: true,
      emergencyOverrideCondition: "Disconnect if V < 380V",
      failSafeTriggered: false,
      unit: "V",
    },
  ];

  return {
    allBoundsSatisfied: true,
    safetyBounds: bounds,
    emergencyOverridesAvailable: [
      "thermal_shutdown",
      "grid_disconnect",
      "manual_override",
    ],
    failSafeMechanisms: [
      "hardware_interlock",
      "software_watchdog",
      "redundant_sensors",
    ],
    safetyScore: 98,
  };
}

function generatePolicyAdherence(): PolicyAdherence {
  return {
    governancePolicies: [
      {
        policyId: "pol_revenue_max",
        policyDescription: "Maximize token holder revenue within safety bounds",
        adherenceStatus: "adhered",
        details:
          "Decision optimizes revenue while maintaining 15% safety margin",
        tokenHolderAlignment: 95,
      },
      {
        policyId: "pol_sustainability",
        policyDescription:
          "Prioritize renewable energy and minimize grid dependence",
        adherenceStatus: "adhered",
        details: "Using stored solar energy, 0% grid import",
        tokenHolderAlignment: 92,
      },
    ],
    tokenHolderInterestScore: 94,
    riskManagementRules: [
      "maintain_20%_SOC_reserve",
      "verify_grid_stability",
      "validate_price_forecasts",
    ],
    policyViolations: [],
    overallAdherenceScore: 96,
  };
}

/**
 * Enhancements #18-22: Impact & Outcomes
 */
function generateStakeholderImpact(): MultiStakeholderImpact {
  const impacts: StakeholderImpact[] = [
    {
      stakeholderType: "token_holder",
      estimatedCount: 347,
      impactType: "positive",
      impactMagnitude: 85,
      specificImpacts: [
        {
          metric: "revenue_per_token",
          value: 0.052,
          unit: "USD",
          description: "Increased distribution from arbitrage",
        },
        {
          metric: "asset_value",
          value: 1.2,
          unit: "%",
          description: "Demonstrated autonomous revenue generation",
        },
      ],
    },
    {
      stakeholderType: "grid_operator",
      estimatedCount: 1,
      impactType: "positive",
      impactMagnitude: 65,
      specificImpacts: [
        {
          metric: "grid_support_kw",
          value: 50,
          unit: "kW",
          description: "Demand reduction during peak",
        },
      ],
    },
  ];

  return {
    totalStakeholders: 348,
    impactByStakeholder: impacts,
    netBenefitScore: 82,
    conflictingInterests: [],
    mitigation: [],
  };
}

function generateFinancialImpact(): FinancialImpact {
  return {
    revenueImpact: 18.0,
    costImpact: -0.45,
    netImpact: 17.55,
    breakdown: [
      {
        category: "grid_export_revenue",
        amount: 18.0,
        description: "50kW × 2h × $0.18/kWh",
      },
      {
        category: "battery_degradation",
        amount: -0.35,
        description: "Cycle wear cost",
      },
      {
        category: "grid_fees",
        amount: -0.1,
        description: "Interconnection fees",
      },
    ],
    roi: 3800,
    riskAdjustedReturn: 16.2,
    paybackPeriodDays: 0.01,
  };
}

function generateEnvironmentalImpact(): EnvironmentalImpact {
  return {
    co2AvoidedKg: 45,
    renewableEnergyPercentage: 100,
    sustainabilityScore: 95,
    equivalentMetrics: {
      treesPlanted: 2,
      milesDrivenAvoided: 112,
      homesPoweredDays: 1.5,
    },
    carbonCredits: 0.045,
  };
}

function generateOutcomeTracking(): OutcomeTracking {
  return {
    decisionExecuted: true,
    executionTimestamp: new Date(Date.now() - 3600000).toISOString(),
    predictedOutcomes: {
      revenueUsd: 18.0,
      efficiencyPercent: 93,
      batterySOCEnd: 60,
      gridExportKwh: 100,
    },
    actualOutcomes: {
      revenueUsd: 17.8,
      efficiencyPercent: 91.5,
      batterySOCEnd: 61,
      gridExportKwh: 98.5,
    },
    comparisons: [
      {
        metric: "revenue",
        predicted: 18.0,
        actual: 17.8,
        variance: -1.1,
        accuracyScore: 98.9,
        unit: "USD",
      },
      {
        metric: "efficiency",
        predicted: 93,
        actual: 91.5,
        variance: -1.6,
        accuracyScore: 98.4,
        unit: "%",
      },
    ],
    overallAccuracyScore: 97,
    rootCauseOfVariance: [
      "Grid price slightly lower in hour 2",
      "Inverter efficiency 1% below model",
    ],
    correctionsMade: [
      "Updated inverter efficiency model",
      "Refined price forecast calibration",
    ],
  };
}

function generateQualityMetrics(): DecisionQualityMetrics {
  return {
    qualityScore: 91,
    historicalSuccessRate: 89,
    similarDecisionsAnalyzed: 127,
    averageOutcomeQuality: 87,
    lessonsLearned: [
      "Price-triggered discharges successful 89% of time",
      "Optimal timing window: 30-45 min after trigger",
      "Safety margins always maintained",
    ],
    improvementTrend: "improving",
    bestPractices: [
      "Validate all constraints before execution",
      "Cross-check price with multiple oracles",
      "Maintain minimum 15% safety margins",
    ],
  };
}

/**
 * Enhancements #23-26: Agent Context
 */
function generateAgentState(agent: AgentPersona): AgentStateSnapshot {
  return {
    agentPersona: agent,
    snapshotTimestamp: new Date().toISOString(),
    cognitiveLoad: 45 + Math.random() * 30,
    activeDecisions: Math.floor(Math.random() * 5) + 1,
    queueDepth: Math.floor(Math.random() * 8),
    resourceUtilization: {
      cpu: 35 + Math.random() * 40,
      memory: 40 + Math.random() * 35,
      processingLatencyMs: 80 + Math.random() * 120,
    },
    attentionFocus:
      agent === "operations"
        ? ["battery_optimization", "load_balancing", "grid_interaction"]
        : agent === "markets"
          ? [
              "price_forecasting",
              "arbitrage_opportunities",
              "revenue_optimization",
            ]
          : ["safety_monitoring", "compliance_checking"],
    stressLevel: 25 + Math.random() * 20,
  };
}

function generateMultiAgentCoordination(
  agent: AgentPersona
): MultiAgentCoordination {
  return {
    coordinationRequired: agent === "operations",
    involvedAgents:
      agent === "operations" ? ["operations", "markets"] : [agent],
    coordinationMethod: "consensus",
    votes:
      agent === "operations"
        ? [
            {
              agentPersona: "operations",
              vote: "approve",
              confidence: 92,
              reasoning: "Optimal for load balancing and grid stability",
            },
            {
              agentPersona: "markets",
              vote: "approve",
              confidence: 88,
              reasoning: "Revenue maximizing opportunity at elevated prices",
            },
          ]
        : undefined,
    consensusReached: true,
    consensusStrength: 90,
    dissent: [],
    coordinationTimeline: {
      initiatedAt: new Date(Date.now() - 3000).toISOString(),
      completedAt: new Date(Date.now() - 2500).toISOString(),
      durationMs: 500,
    },
  };
}

function generateAuthorityValidation(agent: AgentPersona): AgentAuthorityCheck {
  return {
    withinAutonomousScope: true,
    approvalRequired: false,
    escalationPath: ["governance_agent", "human_operator"],
    authorityLimits: {
      energyKw: agent === "operations" ? 50 : 20,
      financialUsd: agent === "markets" ? 1000 : 100,
      timeframeMinutes: 120,
    },
    overrideAvailable: true,
  };
}

function generateLearningContext(): LearningContext {
  return {
    decisionType: "battery_discharge_arbitrage",
    performanceTrends: [
      {
        metric: "accuracy",
        initialValue: 78,
        currentValue: 91,
        improvement: 16.7,
        trend: "improving",
      },
      {
        metric: "revenue_optimization",
        initialValue: 82,
        currentValue: 89,
        improvement: 8.5,
        trend: "improving",
      },
    ],
    adaptationHistory: [
      {
        timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
        change: "Increased price threshold from $0.15 to $0.16/kWh",
        trigger: "Analysis showed missed opportunities at $0.155-0.16 range",
        outcomeImpact: 7.5,
      },
    ],
    learningVelocity: 78,
    modelVersions: ["v1.0", "v1.2", "v2.0", "v2.1"],
    currentModelVersion: "v2.1",
  };
}

/**
 * Enhancements #27-30: Decision Relationships
 */
function generateDecisionChain(decisionId: string): DecisionChainLinking {
  return {
    chainId: `chain_${Date.now()}`,
    upstreamTriggers: [
      {
        relatedDecisionId: `decision_markets_${Date.now() - 10000}`,
        relationshipType: "triggered_by",
        description: "Markets agent detected high price opportunity",
        strength: 85,
        timestamp: new Date(Date.now() - 10000).toISOString(),
      },
    ],
    downstreamImpacts: [
      {
        relatedDecisionId: `decision_governance_${Date.now() + 5000}`,
        relationshipType: "triggers",
        description: "Governance validation of revenue distribution",
        strength: 75,
        timestamp: new Date(Date.now() + 5000).toISOString(),
      },
    ],
    propagationTree: [
      {
        step: 1,
        decisionId: `decision_markets_${Date.now() - 10000}`,
        domain: "financial",
        description: "Detected arbitrage opportunity",
        agentPersona: "markets",
        timestamp: new Date(Date.now() - 10000).toISOString(),
        impactMagnitude: 80,
      },
      {
        step: 2,
        decisionId: decisionId,
        domain: "energy",
        description: "Execute battery discharge",
        agentPersona: "operations",
        timestamp: new Date(Date.now() - 5000).toISOString(),
        impactMagnitude: 95,
      },
    ],
    chainComplete: false,
    totalChainDurationMs: 5000,
  };
}

function generateRelatedDecisions(): RelatedDecisionsAnalysis {
  return {
    patternMatched: "price_triggered_discharge_during_peak_demand",
    similarDecisions: [
      {
        decisionId: "decision_operations_1728432000",
        description: "Battery discharge at $0.19/kWh",
        similarity: 92,
        outcome: "success",
        outcomeQuality: 94,
        timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
        lessonsApplicable: ["Timing was optimal", "Safety margins validated"],
      },
      {
        decisionId: "decision_operations_1728345600",
        description: "Battery discharge at $0.17/kWh",
        similarity: 87,
        outcome: "partial_success",
        outcomeQuality: 78,
        timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
        lessonsApplicable: ["Price forecast less accurate", "Still profitable"],
      },
    ],
    historicalContext:
      "Price-triggered discharge pattern, 127 occurrences in last 90 days",
    successPatterns: ["Price > $0.16/kWh", "SOC > 70%", "Peak demand window"],
    failurePatterns: ["Grid instability", "Forecast error > 20%"],
    applicableLessons: [
      "Maintain 15% safety margin",
      "Validate grid conditions",
      "Cross-check price with multiple sources",
    ],
  };
}

function generateDependencyGraph(): DependencyGraph {
  return {
    prerequisitesCompleted: true,
    prerequisites: [
      {
        nodeId: "prereq_grid_sync",
        nodeType: "prerequisite",
        description: "Grid synchronization established",
        status: "completed",
        criticalPath: true,
      },
      {
        nodeId: "prereq_safety_check",
        nodeType: "prerequisite",
        description: "All safety checks passed",
        status: "completed",
        criticalPath: true,
      },
    ],
    dependentDecisions: [
      {
        nodeId: "dep_revenue_dist",
        nodeType: "dependent",
        description: "Revenue distribution to token holders",
        status: "waiting",
        criticalPath: false,
        estimatedCompletionTime: new Date(Date.now() + 3600000).toISOString(),
      },
    ],
    concurrentDecisions: [],
    criticalPath: ["prereq_grid_sync", "current_decision", "dep_revenue_dist"],
    timingConstraints: {
      mustCompleteBy: new Date(Date.now() + 7200000).toISOString(),
      estimatedDuration: 120000,
    },
  };
}

function generateRollbackAnalysis(): RollbackAnalysis {
  return {
    canBeReversed: true,
    complexity: "simple",
    estimatedTimeMinutes: 5,
    requiredActions: [
      "Stop battery discharge command",
      "Return battery to standby mode",
      "Re-synchronize with grid if needed",
    ],
    risks: [
      "Brief grid export interruption (~30 seconds)",
      "Revenue loss from incomplete discharge",
    ],
    dependencies: ["battery_management_system", "grid_inverter"],
    approvalRequired: false,
    reversalHistory: [],
    automaticRollbackAvailable: true,
  };
}

// ============================================================================
// PHASE 2 UTILITY FUNCTIONS (20 additional enhancements)
// ============================================================================

/**
 * Enhancement #31: Generate historical decision comparison
 */
function generateHistoricalComparison(): HistoricalDecisionComparison {
  return {
    comparisonId: `comparison_${Date.now()}`,
    currentDecision: {
      id: `decision_${Date.now()}`,
      accuracy: 92,
      performance: 88,
      outcome: "success",
    },
    similarPastDecisions: [
      {
        id: `decision_${Date.now() - 86400000}`,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        accuracy: 89,
        performance: 85,
        outcome: "success",
        similarityScore: 95,
      },
      {
        id: `decision_${Date.now() - 172800000}`,
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        accuracy: 87,
        performance: 83,
        outcome: "partial_success",
        similarityScore: 88,
      },
    ],
    accuracyDelta: 3.5,
    performanceDelta: 4.2,
    outcomeVariance: 2.1,
    keyDifferences: [
      "Current decision uses improved weather correlation model",
      "Battery state was 5% higher than historical average",
      "Grid pricing conditions were more favorable",
    ],
    improvementAreas: [
      "Continue refining weather prediction integration",
      "Monitor battery degradation more closely",
    ],
  };
}

/**
 * Enhancement #32: Generate performance trending
 */
function generatePerformanceTrending(): DecisionPerformanceTrending {
  return {
    decisionType: "battery_discharge_optimization",
    trends: [
      {
        period: "30d",
        direction: "improving",
        dataPoints: Array.from({ length: 30 }, (_, i) => ({
          timestamp: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
          performance: 75 + i * 0.4 + Math.random() * 3,
        })),
        improvementRate: 2.3,
        regressionDetected: false,
      },
      {
        period: "60d",
        direction: "improving",
        dataPoints: Array.from({ length: 60 }, (_, i) => ({
          timestamp: new Date(Date.now() - (59 - i) * 86400000).toISOString(),
          performance: 70 + i * 0.25 + Math.random() * 3,
        })),
        improvementRate: 1.8,
        regressionDetected: false,
      },
    ],
    performanceMetrics: {
      avgPerformance30d: 87,
      avgPerformance60d: 85,
      avgPerformance90d: 83,
      bestPerformance: {
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        score: 94,
      },
      worstPerformance: {
        timestamp: new Date(Date.now() - 60 * 86400000).toISOString(),
        score: 72,
      },
    },
    qualityRegression: {
      detected: false,
    },
  };
}

/**
 * Enhancement #33: Generate comparative baselines
 */
function generateComparativeBaselines(): ComparativeBaselines {
  return {
    industryStandard: [
      {
        metric: "Decision Accuracy",
        industryAverage: 82,
        currentValue: 92,
        percentileDelta: 10,
        ranking: "Top 12%",
      },
      {
        metric: "Response Time",
        industryAverage: 250,
        currentValue: 180,
        percentileDelta: -28,
        ranking: "Top 8%",
      },
    ],
    theoreticalOptimal: [
      {
        metric: "Energy Efficiency",
        theoreticalMax: 98,
        currentValue: 93,
        efficiencyPercentage: 94.9,
        gap: 5,
      },
      {
        metric: "Revenue Optimization",
        theoreticalMax: 100,
        currentValue: 88,
        efficiencyPercentage: 88.0,
        gap: 12,
      },
    ],
    peerAssets: [
      {
        metric: "Overall Performance",
        peerAverage: 84,
        peerBest: 91,
        currentValue: 89,
        percentileRank: 78,
      },
    ],
    overallPerformanceRank: {
      vsIndustry: 88,
      vsTheoretical: 91,
      vsPeers: 78,
    },
  };
}

/**
 * Enhancement #34: Generate pattern recognition
 */
function generatePatternRecognition(): PatternRecognitionAnalysis {
  return {
    recurringPatterns: [
      {
        patternId: "pattern_peak_discharge",
        patternDescription: "Battery discharge during evening peak (5-8pm)",
        occurrenceCount: 87,
        lastOccurrence: new Date(Date.now() - 86400000).toISOString(),
        typicalOutcome: "success",
        confidence: 94,
      },
      {
        patternId: "pattern_price_arbitrage",
        patternDescription:
          "Grid arbitrage when price differential > $0.06/kWh",
        occurrenceCount: 54,
        lastOccurrence: new Date(Date.now() - 172800000).toISOString(),
        typicalOutcome: "success",
        confidence: 91,
      },
    ],
    seasonalVariations: [
      {
        season: "summer",
        performanceModifier: 8,
        reasoning: "Higher solar generation and peak demand alignment",
      },
      {
        season: "winter",
        performanceModifier: -5,
        reasoning: "Lower solar output and heating load patterns",
      },
    ],
    correlations: [
      {
        externalFactor: "grid_price",
        correlationStrength: 0.87,
        significance: "high",
        description: "Strong positive correlation with grid pricing signals",
      },
      {
        externalFactor: "weather_forecast_accuracy",
        correlationStrength: 0.72,
        significance: "high",
        description:
          "Decision quality improves with better weather predictions",
      },
    ],
    anomalousBehavior: {
      detected: false,
    },
  };
}

/**
 * Enhancement #35: Generate risk-adjusted performance
 */
function generateRiskAdjustedPerformance(): RiskAdjustedPerformance {
  return {
    riskMetrics: {
      volatility: 4.2,
      downsideRisk: 2.8,
      maxDrawdown: 8.5,
    },
    sharpeRatio: 2.15,
    sortinoRatio: 3.42,
    worstCase: {
      scenario: "Grid price spike reversal + battery degradation",
      probability: 12,
      impact: -850,
      mitigation: [
        "Maintain 25% SOC reserve",
        "Enable dynamic price threshold adjustment",
      ],
    },
    bestCase: {
      scenario: "Sustained high prices + optimal weather",
      probability: 18,
      impact: 2200,
      enablers: ["Extended price differential window", "High solar generation"],
    },
    expectedValue: 920,
    riskScore: 28,
  };
}

/**
 * Enhancement #36: Generate decision tree visualization
 */
function generateDecisionTreeViz(): DecisionTreeVisualization {
  return {
    rootNode: {
      nodeId: "root",
      question: "Should battery discharge now?",
      type: "root",
    },
    branches: [
      {
        nodeId: "branch_soc_check",
        parentId: "root",
        condition: "SOC > 20%?",
        probability: 0.95,
        isPruned: false,
        isOptimal: true,
        children: ["branch_price_check"],
      },
      {
        nodeId: "branch_price_check",
        parentId: "branch_soc_check",
        condition: "Grid price > $0.15/kWh?",
        probability: 0.78,
        isPruned: false,
        isOptimal: true,
        decision: "Discharge 50kW",
        children: [],
      },
      {
        nodeId: "branch_low_soc",
        parentId: "root",
        condition: "SOC <= 20%",
        probability: 0.05,
        isPruned: true,
        isOptimal: false,
        children: [],
      },
    ],
    optimalPath: ["root", "branch_soc_check", "branch_price_check"],
    prunedPaths: [
      {
        nodeIds: ["root", "branch_low_soc"],
        pruneReason: "SOC below minimum threshold",
      },
    ],
    visualizationData: {
      nodes: [
        { id: "root", label: "Start", x: 0, y: 0 },
        { id: "branch_soc_check", label: "SOC Check", x: 100, y: 50 },
        { id: "branch_price_check", label: "Price Check", x: 200, y: 50 },
      ],
      edges: [
        { from: "root", to: "branch_soc_check", label: "Yes", weight: 0.95 },
        {
          from: "branch_soc_check",
          to: "branch_price_check",
          label: "Yes",
          weight: 0.78,
        },
      ],
    },
  };
}

/**
 * Enhancement #37: Generate timeline chart data
 */
function generateTimelineChart(): TimelineChartData {
  const now = Date.now();
  return {
    milestones: [
      {
        timestamp: new Date(now - 7200000).toISOString(),
        event: "Decision initiated",
        type: "decision",
        importance: "critical",
        description: "Operations agent began discharge analysis",
      },
      {
        timestamp: new Date(now - 6800000).toISOString(),
        event: "Multi-agent consensus reached",
        type: "coordination",
        importance: "high",
        description: "Operations and Markets agents agreed on strategy",
      },
      {
        timestamp: new Date(now - 6400000).toISOString(),
        event: "Safety validation passed",
        type: "validation",
        importance: "critical",
        description: "All safety constraints verified",
      },
      {
        timestamp: new Date(now - 3600000).toISOString(),
        event: "Outcome realized",
        type: "outcome",
        importance: "high",
        description: "Discharge completed, revenue $9.20",
      },
    ],
    coordinationEvents: [
      {
        timestamp: new Date(now - 6800000).toISOString(),
        involvedAgents: ["operations", "markets"],
        eventType: "strategy_alignment",
        duration: 400000,
      },
    ],
    outcomeRealization: [
      {
        predicted: {
          timestamp: new Date(now - 7200000).toISOString(),
          value: 9.0,
        },
        actual: {
          timestamp: new Date(now - 3600000).toISOString(),
          value: 9.2,
        },
        variance: 2.2,
      },
    ],
    phases: [
      {
        phase: "planning",
        startTime: new Date(now - 7200000).toISOString(),
        endTime: new Date(now - 6800000).toISOString(),
        duration: 400000,
      },
      {
        phase: "executing",
        startTime: new Date(now - 6800000).toISOString(),
        endTime: new Date(now - 3600000).toISOString(),
        duration: 3200000,
      },
      {
        phase: "completed",
        startTime: new Date(now - 3600000).toISOString(),
        endTime: new Date(now).toISOString(),
        duration: 3600000,
      },
    ],
  };
}

/**
 * Enhancement #38: Generate flow diagrams
 */
function generateFlowDiagrams(): FlowDiagramGeneration {
  return {
    dataFlow: {
      nodes: [
        { id: "sensor_data", label: "Sensor Data", type: "source" },
        { id: "validation", label: "Validation", type: "process" },
        { id: "analysis", label: "Analysis Engine", type: "decision" },
        { id: "decision", label: "Decision Output", type: "output" },
      ],
      edges: [
        {
          from: "sensor_data",
          to: "validation",
          dataType: "raw_metrics",
          transformation: "quality_check",
        },
        { from: "validation", to: "analysis", dataType: "validated_data" },
        { from: "analysis", to: "decision", dataType: "decision_params" },
      ],
    },
    decisionFlow: {
      nodes: [
        { id: "trigger", label: "Price Signal", type: "input" },
        { id: "assess", label: "Opportunity Assessment", type: "analysis" },
        { id: "decide", label: "Go/No-Go Decision", type: "decision" },
        { id: "execute", label: "Battery Discharge", type: "action" },
      ],
      edges: [
        { from: "trigger", to: "assess" },
        { from: "assess", to: "decide", condition: "ROI > threshold" },
        { from: "decide", to: "execute", condition: "approved" },
      ],
    },
    impactPropagation: {
      nodes: [
        { id: "energy", domain: "energy", impactMagnitude: 85 },
        { id: "financial", domain: "financial", impactMagnitude: 75 },
        { id: "operational", domain: "operational", impactMagnitude: 45 },
      ],
      edges: [
        {
          from: "energy",
          to: "financial",
          propagationDelay: 1000,
          attenuationFactor: 0.88,
        },
        {
          from: "financial",
          to: "operational",
          propagationDelay: 5000,
          attenuationFactor: 0.6,
        },
      ],
    },
  };
}

/**
 * Enhancement #39: Generate interactive drill-down structure
 */
function generateDrillDownStructure(): InteractiveDrillDown {
  return {
    sections: [
      {
        sectionId: "core_explanation",
        title: "Core Explanation",
        summaryLevel: "summary",
        hasChildren: true,
        childSections: ["reasoning", "confidence"],
        dataFields: ["summary", "decisionType", "timestamp"],
        expansionLevels: [
          {
            level: 0,
            visibleFields: ["summary"],
            description: "One-line summary",
          },
          {
            level: 1,
            visibleFields: ["summary", "decisionType", "timestamp"],
            description: "Basic context",
          },
        ],
      },
      {
        sectionId: "technical_details",
        title: "Technical Details",
        summaryLevel: "expert",
        hasChildren: false,
        childSections: [],
        dataFields: ["mathematicalDetails", "confidenceBreakdown"],
        expansionLevels: [
          { level: 0, visibleFields: [], description: "Hidden by default" },
          {
            level: 1,
            visibleFields: ["mathematicalDetails"],
            description: "Expert view",
          },
        ],
      },
    ],
    progressiveDisclosure: {
      defaultView: ["summary", "decisionType", "confidence"],
      level1Expansion: ["reasoning", "alternatives", "prerequisites"],
      level2Expansion: ["provenance", "compliance", "impact"],
      fullView: ["all fields including technical and audit"],
    },
    componentComplexity: [
      {
        component: "confidenceBreakdown",
        simplificationAvailable: true,
        detailLevels: ["beginner", "intermediate", "expert"],
      },
    ],
  };
}

/**
 * Enhancement #40: Generate confidence calibration
 */
function generateConfidenceCalibration(): ModelConfidenceCalibration {
  return {
    calibrationCurve: [
      { predictedConfidence: 90, observedAccuracy: 88, sampleSize: 45 },
      { predictedConfidence: 80, observedAccuracy: 82, sampleSize: 78 },
      { predictedConfidence: 70, observedAccuracy: 73, sampleSize: 92 },
    ],
    calibrationScore: 94,
    overconfidenceAnalysis: {
      isOverconfident: true,
      averageOverconfidence: 2.1,
      affectedRanges: [{ min: 85, max: 95 }],
    },
    underconfidenceAnalysis: {
      isUnderconfident: false,
      averageUnderconfidence: 0,
      affectedRanges: [],
    },
    calibrationQuality: "excellent",
    recommendedAdjustment: -2,
  };
}

/**
 * Enhancement #41: Generate uncertainty quantification
 */
function generateUncertaintyQuantification(): UncertaintyQuantification {
  return {
    epistemicUncertainty: {
      value: 15,
      sources: ["Model approximations", "Limited historical data"],
      reducible: true,
      reductionStrategy:
        "Collect more training data, refine model architecture",
    },
    aleatoricUncertainty: {
      value: 8,
      sources: ["Weather randomness", "Grid price volatility"],
      irreducible: true,
    },
    confidenceIntervals: [
      {
        metric: "Revenue Prediction",
        pointEstimate: 9.2,
        ci_68: { lower: 8.8, upper: 9.6 },
        ci_95: { lower: 8.3, upper: 10.1 },
        ci_99: { lower: 7.9, upper: 10.5 },
      },
    ],
    monteCarloResults: {
      simulations: 10000,
      outcomes: {
        percentile_5: 7.8,
        percentile_25: 8.6,
        percentile_50: 9.2,
        percentile_75: 9.8,
        percentile_95: 10.6,
      },
      probabilityDistribution: [
        { value: 8.0, probability: 0.05 },
        { value: 9.0, probability: 0.35 },
        { value: 9.2, probability: 0.4 },
        { value: 10.0, probability: 0.15 },
        { value: 11.0, probability: 0.05 },
      ],
    },
  };
}

/**
 * Enhancement #42: Generate consensus strength analysis
 */
function generateConsensusStrength(): ConsensusStrengthAnalysis {
  return {
    agreementDistribution: [
      {
        agentPersona: "operations",
        voteWeight: 0.4,
        agreement: "strong_agree",
        confidence: 95,
      },
      {
        agentPersona: "markets",
        voteWeight: 0.3,
        agreement: "agree",
        confidence: 88,
      },
      {
        agentPersona: "governance",
        voteWeight: 0.3,
        agreement: "agree",
        confidence: 90,
      },
    ],
    dissentAnalysis: {
      dissentingAgents: [],
      dissentReasons: [],
      dissentSeverity: "minor",
      dissentResolution: "None - full consensus achieved",
    },
    vetoPotential: {
      vetoAvailable: true,
      vetoAuthority: "governance",
      vetoLikelihood: 5,
      vetoConsequences: ["Decision halted", "Manual review required"],
    },
    consensusStability: {
      stable: true,
      stabilityScore: 92,
      volatilityFactors: [],
    },
    overallConsensusStrength: 91,
  };
}

/**
 * Enhancement #43: Generate real-time status
 */
function generateRealtimeStatus(): RealTimeDecisionStatus {
  return {
    executionPhase: "completed",
    progressPercentage: 100,
    estimatedCompletion: new Date().toISOString(),
    elapsedTime: 3600000,
    remainingTime: 0,
    bottlenecks: [],
    liveMetrics: [
      {
        metric: "Battery Discharge",
        currentValue: 50,
        targetValue: 50,
        status: "on_track",
      },
    ],
    lastUpdate: new Date().toISOString(),
  };
}

/**
 * Enhancement #44: Generate velocity context
 */
function generateVelocityContext(): DecisionVelocityContext {
  return {
    timingAnalysis: {
      timeToDecision: 180000,
      historicalAverage: 240000,
      percentileDelta: -25,
      classification: "optimal",
    },
    queuePressure: {
      queueDepth: 3,
      queuedTime: 45000,
      priorityLevel: "normal",
      pressureScore: 35,
    },
    decisionRush: {
      isRushed: false,
      rushFactor: 0.75,
    },
    optimalWindow: {
      withinOptimalWindow: true,
      windowStart: new Date(Date.now() - 3600000).toISOString(),
      windowEnd: new Date(Date.now() + 3600000).toISOString(),
      timing: "optimal",
    },
  };
}

/**
 * Enhancement #45: Generate alert history
 */
function generateAlertHistory(): AlertWarningHistory {
  return {
    alertsConsidered: [
      {
        alertId: "alert_001",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        alertType: "threshold",
        severity: "info",
        message: "Grid price approaching discharge threshold",
        actionTaken: "Monitored, initiated discharge when threshold crossed",
      },
    ],
    dismissedWarnings: [
      {
        warningId: "warn_002",
        timestamp: new Date(Date.now() - 6800000).toISOString(),
        warningType: "trend",
        severity: "warning",
        message: "Battery temperature trending upward",
        dismissalReason:
          "Still within safe operating range, thermal model predicts stabilization",
        dismissedBy: "operations_agent",
        consequenceAssessment:
          "No adverse effects, temperature stabilized as predicted",
      },
    ],
    nearMissIncidents: [
      {
        incidentId: "nearmiss_001",
        timestamp: new Date(Date.now() - 3700000).toISOString(),
        thresholdType: "SOC_minimum",
        actualValue: 22,
        thresholdValue: 20,
        marginToViolation: 2,
        preventiveMeasures: [
          "Reduced discharge rate",
          "Extended monitoring window",
        ],
      },
    ],
    warningResponseTime: {
      avgResponseTimeMs: 850,
      fastestResponseMs: 320,
      slowestResponseMs: 1800,
    },
  };
}

/**
 * Enhancement #46: Generate immutable audit trail
 */
function generateAuditTrail(): ImmutableAuditTrail {
  return {
    auditLevel: "comprehensive",
    entries: [
      {
        entryId: "audit_001",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        actor: "operations_agent",
        action: "decision_initiated",
        dataSnapshot: { gridPrice: 0.18, batterySOC: 87 },
        cryptographicSignature: "0x8a3f9d2e...",
        previousEntryHash: "0x0000...",
        currentEntryHash: "0x42b7c1a5...",
      },
      {
        entryId: "audit_002",
        timestamp: new Date(Date.now() - 6800000).toISOString(),
        actor: "markets_agent",
        action: "consensus_vote",
        dataSnapshot: { vote: "approve", confidence: 88 },
        cryptographicSignature: "0x2f4a8b9c...",
        previousEntryHash: "0x42b7c1a5...",
        currentEntryHash: "0x9d3e6f2a...",
      },
    ],
    blockchainAnchor: {
      blockHeight: 1250487,
      txHash:
        "0xf7c2d9a8b3e4f1a2c5d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
      network: "solana_devnet",
      confirmations: 42,
    },
    tamperProof: {
      verified: true,
      integrityChecks: 15,
      lastVerification: new Date().toISOString(),
    },
    completenessScore: 98,
    auditableEvents: 12,
    recordedEvents: 12,
  };
}

/**
 * Enhancement #47: Generate version history
 */
function generateVersionHistory(): ExplanationVersioning {
  return {
    versions: [
      {
        versionNumber: 1,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        phase: "planning",
        explanationSnapshot: { summary: "Initial decision analysis" },
        changes: ["Created initial explanation"],
        changeReason: "Decision initiated",
      },
      {
        versionNumber: 2,
        timestamp: new Date(Date.now() - 6400000).toISOString(),
        phase: "executing",
        explanationSnapshot: { summary: "Decision executing with consensus" },
        changes: [
          "Added multi-agent consensus details",
          "Updated confidence scores",
        ],
        changeReason: "Consensus reached, execution began",
      },
      {
        versionNumber: 3,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        phase: "completed",
        explanationSnapshot: { summary: "Decision completed successfully" },
        changes: ["Added outcome data", "Finalized quality metrics"],
        changeReason: "Execution completed",
      },
    ],
    versionDiff: [
      {
        from: 1,
        to: 2,
        addedFields: ["multiAgentCoordination", "confidenceBreakdown"],
        removedFields: [],
        modifiedFields: [
          {
            field: "summary",
            oldValue: "Initial decision analysis",
            newValue: "Decision executing with consensus",
          },
        ],
      },
    ],
    amendmentHistory: [],
    currentVersion: 3,
    evolutionComplete: true,
  };
}

/**
 * Enhancement #48: Generate compliance evidence
 */
function generateComplianceEvidence(): ComplianceEvidenceLinks {
  return {
    regulatoryDocuments: [
      {
        regulation: "IEEE 1547-2018",
        documentTitle:
          "Standard for Interconnection and Interoperability of DER",
        section: "Section 5.2 - Voltage Regulation",
        url: "https://standards.ieee.org/standard/1547-2018.html",
        relevance: "direct",
      },
    ],
    certificationReferences: [
      {
        certification: "UL 1741",
        certNumber: "UL1741-2024-00123",
        issuedBy: "Underwriters Laboratories",
        validUntil: "2025-12-31",
        evidenceUrl: "https://ul.com/certificates/00123",
      },
    ],
    auditReportExcerpts: [
      {
        auditId: "audit_2024_q3",
        auditDate: "2024-09-15",
        auditor: "Third Party Energy Compliance Inc.",
        finding:
          "Battery management system compliant with all safety standards",
        complianceStatus: "compliant",
        excerptText:
          "All battery discharge operations reviewed showed 100% compliance...",
        reportUrl: "https://compliance.example.com/reports/2024_q3",
      },
    ],
    attestations: [
      {
        attestationType: "safety_compliance",
        attestedBy: "chief_safety_officer",
        timestamp: new Date().toISOString(),
        statement:
          "This decision complies with all safety protocols and regulatory requirements",
        digitalSignature: "0x7f2e9a3b...",
      },
    ],
  };
}

/**
 * Enhancement #49: Generate replay capability
 */
function generateReplayCapability(): DecisionReplayCapability {
  return {
    replayable: true,
    environmentSnapshot: {
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      agentStates: {
        operations: { cognitiveLoad: 45, queueDepth: 3 },
        markets: { cognitiveLoad: 38, queueDepth: 2 },
      },
      systemState: {
        batterySOC: 87,
        gridPrice: 0.18,
        solarGeneration: 78,
      },
      externalInputs: {
        weatherForecast: "clear",
        gridDemand: 125,
      },
      randomSeed: 42,
    },
    replayWithDifferentInputs: {
      supported: true,
      modifiableInputs: ["gridPrice", "batterySOC", "solarGeneration"],
      inputValidation: [
        {
          input: "gridPrice",
          constraints: ["Must be positive", "Typically 0.08-0.25 USD/kWh"],
          validRange: { min: 0.05, max: 0.35 },
        },
      ],
    },
    deterministicReproduction: {
      guaranteed: true,
      reproductionAccuracy: 99.8,
      nonDeterministicElements: ["External API latency"],
    },
    replayValidation: {
      validationPossible: true,
      validationMethod: "Hash comparison of decision outputs",
      expectedOutcome: { decision: "discharge", power: 50 },
    },
  };
}

/**
 * Enhancement #50: Generate quality assessment
 */
function generateQualityAssessment(): ExplanationQualityAssessment {
  return {
    completenessScore: 96,
    completenessBreakdown: [
      {
        category: "Core Reasoning",
        included: true,
        importance: "critical",
        missingElements: [],
      },
      {
        category: "Alternative Actions",
        included: true,
        importance: "high",
        missingElements: [],
      },
      {
        category: "Advanced Analytics",
        included: true,
        importance: "medium",
        missingElements: ["Real-time market depth analysis"],
      },
    ],
    clarityMetrics: {
      readabilityScore: 88,
      technicalAccuracy: 95,
      jargonDensity: 25,
      sentenceComplexity: 42,
    },
    technicalAccuracyValidation: {
      validated: true,
      validationMethod: "Cross-reference with system logs and sensor data",
      accuracyScore: 97,
      inaccuracies: [],
    },
    stakeholderComprehension: [
      {
        stakeholderType: "token_holder",
        estimatedComprehension: 85,
        recommendedDepth: "intermediate",
        vocabularyAlignment: 90,
      },
      {
        stakeholderType: "operator",
        estimatedComprehension: 95,
        recommendedDepth: "expert",
        vocabularyAlignment: 98,
      },
    ],
    overallQualityScore: 94,
  };
}

// ============================================================================
// GET HANDLER
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();

  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const depth =
      (searchParams.get("depth") as ExplanationDepth) || "intermediate";
    const format =
      (searchParams.get("format") as ExplanationFormat) || "standard";
    const includeProvenance = searchParams.get("includeProvenance") !== "false";
    const includeImpact = searchParams.get("includeImpact") !== "false";
    const includeRelationships =
      searchParams.get("includeRelationships") !== "false";
    const includeOutcomes = searchParams.get("includeOutcomes") !== "false";
    const fields = searchParams.get("fields"); // For field selection

    // Extract agent from decision ID (format: decision-{agent}-{timestamp})
    const parts = id.split("-");
    const agent = (parts[1] || "operations") as AgentPersona;

    // Validate agent
    if (!["operations", "markets", "sentinel", "governor"].includes(agent)) {
      return NextResponse.json(
        { error: "Invalid decision ID format" },
        { status: 400 }
      );
    }

    // Determine decision type from ID or default
    const decisionType = "battery_discharge_optimization";

    // Build comprehensive explanation with all 30 enhancements
    const comprehensiveExplanation: ComprehensiveExplanation = {
      decisionId: id,
      agentPersona: agent,
      decisionType,
      timestamp: new Date().toISOString(),
      summary: generateMockExplanation(id, agent).summary,

      // Core Explainability (1-8)
      multiDepthExplanation: generateMultiDepthExplanation(decisionType, agent), // #1
      reasoningChain: generateReasoningChain(decisionType, agent), // #2
      confidenceBreakdown: generateConfidenceBreakdown(), // #3
      alternativeActions: generateAlternativeActions(decisionType), // #4
      counterfactualScenarios: generateCounterfactualScenarios(), // #5
      prerequisites: generateDecisionPrerequisites(), // #6
      assumptions: generateAssumptionTransparency(), // #7
      mathematicalDetails: generateMathematicalDetails(), // #8

      // Data & Trust Provenance (9-13)
      dataProvenance: includeProvenance
        ? generateDataProvenance()
        : ({} as MultiSourceProvenance), // #9
      freshnessTracking: includeProvenance
        ? generateFreshnessTracking()
        : ({} as FreshnessTracking), // #10
      trustMathematics: includeProvenance
        ? generateTrustMathematics()
        : ({} as TrustMathematics), // #11
      validationChain: includeProvenance
        ? generateDataValidation()
        : ({} as DataValidationChain), // #12
      zkProof: includeProvenance
        ? generateZkProof()
        : ({} as ZkProofIntegration), // #13

      // Constraints & Compliance (14-17)
      constraintValidation: generateConstraintValidation(), // #14
      regulatoryCompliance: generateRegulatoryCompliance(), // #15
      safetyVerification: generateSafetyVerification(), // #16
      policyAdherence: generatePolicyAdherence(), // #17

      // Impact & Outcomes (18-22)
      stakeholderImpact: includeImpact
        ? generateStakeholderImpact()
        : ({} as MultiStakeholderImpact), // #18
      financialImpact: includeImpact
        ? generateFinancialImpact()
        : ({} as FinancialImpact), // #19
      environmentalImpact: includeImpact
        ? generateEnvironmentalImpact()
        : ({} as EnvironmentalImpact), // #20
      outcomeTracking: includeOutcomes
        ? generateOutcomeTracking()
        : ({} as OutcomeTracking), // #21
      qualityMetrics: includeOutcomes
        ? generateQualityMetrics()
        : ({} as DecisionQualityMetrics), // #22

      // Agent Context (23-26)
      agentState: generateAgentState(agent), // #23
      multiAgentCoordination: generateMultiAgentCoordination(agent), // #24
      authorityValidation: generateAuthorityValidation(agent), // #25
      learningContext: generateLearningContext(), // #26

      // Decision Relationships (27-30)
      decisionChain: includeRelationships
        ? generateDecisionChain(id)
        : ({} as DecisionChainLinking), // #27
      relatedDecisions: includeRelationships
        ? generateRelatedDecisions()
        : ({} as RelatedDecisionsAnalysis), // #28
      dependencyGraph: includeRelationships
        ? generateDependencyGraph()
        : ({} as DependencyGraph), // #29
      rollbackAnalysis: generateRollbackAnalysis(), // #30

      // Advanced Analysis & Comparison (31-35)
      historicalComparison: generateHistoricalComparison(), // #31
      performanceTrending: generatePerformanceTrending(), // #32
      comparativeBaselines: generateComparativeBaselines(), // #33
      patternRecognition: generatePatternRecognition(), // #34
      riskAdjustedPerformance: generateRiskAdjustedPerformance(), // #35

      // Visualization & Presentation (36-39)
      decisionTreeViz: generateDecisionTreeViz(), // #36
      timelineChart: generateTimelineChart(), // #37
      flowDiagrams: generateFlowDiagrams(), // #38
      interactiveDrillDown: generateDrillDownStructure(), // #39

      // Confidence & Calibration (40-42)
      confidenceCalibration: generateConfidenceCalibration(), // #40
      uncertaintyQuantification: generateUncertaintyQuantification(), // #41
      consensusStrength: generateConsensusStrength(), // #42

      // Real-Time & Monitoring (43-45)
      realtimeStatus: generateRealtimeStatus(), // #43
      velocityContext: generateVelocityContext(), // #44
      alertHistory: generateAlertHistory(), // #45

      // Audit & Compliance (46-48)
      auditTrail: generateAuditTrail(), // #46
      versionHistory: generateVersionHistory(), // #47
      complianceEvidence: generateComplianceEvidence(), // #48

      // Advanced Features (49-50)
      replayCapability: generateReplayCapability(), // #49
      qualityAssessment: generateQualityAssessment(), // #50

      // Metadata
      generationTimestamp: new Date().toISOString(),
      processingTimeMs: 0, // Will be calculated
      dataSourcesCount: 15,
      trustScore: 96,
    };

    const processingTime = Date.now() - startTime;
    comprehensiveExplanation.processingTimeMs = processingTime;

    // Format response based on requested format and depth
    let responseData: unknown;

    if (format === "minimal") {
      // Minimal: Just summary and basic info
      responseData = {
        decisionId: id,
        summary: comprehensiveExplanation.summary,
        agentPersona: agent,
        confidence:
          comprehensiveExplanation.confidenceBreakdown.overallConfidence,
        timestamp: comprehensiveExplanation.timestamp,
      };
    } else if (format === "timeline") {
      // Timeline: Focus on reasoning chain and relationships
      responseData = {
        decisionId: id,
        summary: comprehensiveExplanation.summary,
        reasoningChain: comprehensiveExplanation.reasoningChain,
        decisionChain: comprehensiveExplanation.decisionChain,
        timestamp: comprehensiveExplanation.timestamp,
      };
    } else if (format === "full") {
      // Full: Everything
      responseData = comprehensiveExplanation;
    } else {
      // Standard: Core explainability + constraints + impact (omit some heavy fields)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dataProvenance, dependencyGraph, ...standardData } =
        comprehensiveExplanation;

      // Apply depth filter to explanation
      const explanation =
        depth === "beginner"
          ? {
              summary: standardData.multiDepthExplanation.beginner.summary,
              keyPoints: standardData.multiDepthExplanation.beginner.keyPoints,
              analogy: standardData.multiDepthExplanation.beginner.analogy,
            }
          : depth === "expert"
            ? {
                summary: standardData.multiDepthExplanation.expert.summary,
                technicalDetails:
                  standardData.multiDepthExplanation.expert.technicalDetails,
                algorithmicApproach:
                  standardData.multiDepthExplanation.expert.algorithmicApproach,
                mathematicalModel:
                  standardData.multiDepthExplanation.expert.mathematicalModel,
              }
            : {
                summary:
                  standardData.multiDepthExplanation.intermediate.summary,
                detailedContext:
                  standardData.multiDepthExplanation.intermediate
                    .detailedContext,
                dataPoints:
                  standardData.multiDepthExplanation.intermediate.dataPoints,
                assumptions:
                  standardData.multiDepthExplanation.intermediate.assumptions,
              };

      responseData = {
        ...standardData,
        explanation, // Replace multiDepthExplanation with filtered version
        multiDepthExplanation: undefined, // Remove full multi-depth
      };
    }

    // Apply field selection if specified
    if (fields && typeof responseData === "object" && responseData !== null) {
      const fieldList = fields.split(",").map((f) => f.trim());
      const filteredData: Record<string, unknown> = {};
      const dataObj = responseData as Record<string, unknown>;

      fieldList.forEach((field) => {
        if (field in dataObj) {
          filteredData[field] = dataObj[field];
        }
      });

      // Always include basic metadata
      filteredData.decisionId = (
        responseData as { decisionId: string }
      ).decisionId;
      filteredData.timestamp = (
        responseData as { timestamp: string }
      ).timestamp;

      responseData = filteredData;
    }

    return NextResponse.json(
      {
        data: responseData,
        sourceProvenance: "mock:generator+comprehensive_analysis",
        freshnessSec: 0,
        traceId: `trace-explanation-${Date.now()}`,
        metadata: {
          enhancementsApplied: 50,
          processingTimeMs: processingTime,
          depth,
          format,
          fieldsRequested: fields || "all",
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Data-Source": "mock",
          "X-Enhancements": "50",
          "X-Explanation-Depth": depth,
          "X-Processing-Time-Ms": processingTime.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Explanation API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch explanation",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
