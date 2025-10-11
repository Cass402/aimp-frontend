/**
 * API Route: /api/energy
 *
 * Comprehensive Energy Intelligence System with AI Agent Integration
 * Returns real-time energy generation, consumption, and battery metrics with deep analysis,
 * AI agent decision tracking, and explainability at multiple depth levels.
 * High-frequency updates (1-5 second freshness).
 *
 * Features (57 enhancements across 3 phases):
 *
 * PHASE 1 - HIGH VALUE (12):
 * 1. Real-time Flow Analysis - Energy direction tracking, magnitude, efficiency, losses
 * 2. Battery Health Tracking - SOH, degradation rate, cycle count, temperature effects
 * 3. Grid Interaction Metrics - Frequency stability, voltage quality, power factor
 * 4. Temporal Pattern Analysis - Diurnal cycles, seasonal variations, demand patterns
 * 5. Constraint-Aware Optimization - Safety bounds validation, thermal/voltage limits
 * 6. Forecast Integration - Next hour/day predictions with confidence intervals
 * 7. Performance Benchmarking - vs historical baselines, capacity factor, efficiency
 * 8. Anomaly Detection - Pattern deviation, fault detection, early warnings
 * 9. Trust Mathematics - Source provenance, freshness decay, multi-source validation
 * 10. Cross-Domain Impact - Energy→Financial, Energy→Operational, Energy→Governance
 * 11. Energy Balance Validation - Conservation checks, losses breakdown
 * 12. Predictive Maintenance - Component health, failure prediction, service windows
 *
 * PHASE 1 - MEDIUM VALUE (10):
 * 13. Historical Comparison - vs yesterday/last week/year, trend analysis
 * 14. Efficiency Metrics - Round-trip battery, inverter, system losses
 * 15. Revenue Attribution - Energy value by source, time-of-use pricing
 * 16. Weather Integration - Solar irradiance, temperature effects, forecast accuracy
 * 17. Load Profiling - Demand categorization, load factor, diversity factor
 * 18. Battery Optimization - Optimal scheduling, depth-of-discharge management
 * 19. Grid Services - Frequency regulation, demand response, ancillary services
 * 20. Carbon Accounting - CO2 avoided, renewable percentage, sustainability
 * 21. Alert Generation - Threshold alerts, trend warnings, predictive alerts
 * 22. Data Quality Monitoring - Sensor health, data gaps, outlier detection
 *
 * PHASE 1 - POLISH (10):
 * 23. Visualization Data Prep - Time series, flow diagrams, battery curves
 * 24. Query Flexibility - Time range, metric selection, aggregation levels
 * 25. Response Formats - Minimal/Standard/Full, time-series optimized
 * 26. Caching Strategy - Smart caching, invalidation on anomalies
 * 27. Aggregation Options - Sum, avg, min, max, percentiles over windows
 * 28. Comparison Utilities - Side-by-side periods, baseline comparison
 * 29. Export Readiness - CSV, regulatory reporting, audit trail formats
 * 30. Smart Defaults - Auto time range, relevant metrics, context-aware
 * 31. Optimization Hints - Query performance suggestions, freshness recommendations
 * 32. Streaming Support - Real-time updates, chunked historical data
 *
 * PHASE 10 - AGENT INTEGRATION (8):
 * 33. Agent Decision Linking - Link energy actions to Operations/Markets agent decisions
 * 34. Agent State Context - Cognitive load, resource utilization during decisions
 * 35. Multi-Agent Coordination - Markets + Operations coordination tracking
 * 36. Agent Consensus Tracking - Agreement levels on energy strategies
 * 37. Decision Explanations - Full reasoning chains for energy dispatch
 * 38. Agent Workload Metrics - Decision frequency, processing time per agent
 * 39. Agent Learning Context - Strategy adaptation based on outcomes
 * 40. Agent Authority Scope - Autonomous decision boundaries per agent
 *
 * PHASE 10 - ADVANCED EXPLAINABILITY (5):
 * 41. Explainability Depth Levels - Beginner/Intermediate/Expert explanations
 * 42. Confidence Breakdown - Factor-by-factor forecast confidence
 * 43. Alternative Actions Analysis - Rejected strategies with reasoning
 * 44. Decision Prerequisites - Required condition validation
 * 45. Counterfactual Analysis - "What if" scenario modeling
 *
 * PHASE 10 - OPERATIONAL INTELLIGENCE (5):
 * 46. Decision Quality Scoring - 0-100 score based on outcomes
 * 47. Outcome Tracking - Predicted vs actual comparison
 * 48. Decision Chain Linking - Energy → Financial → Operational → Governance
 * 49. Decision Velocity Metrics - Rate tracking, burst detection
 * 50. Reversal History - Override tracking with authority
 *
 * PHASE 10 - ADVANCED TRUST & PROVENANCE (4):
 * 51. 4-Step Provenance Chain - Ingestion → Processing → Analysis → Decision
 * 52. Compliance Scoring - Multi-domain (safety/financial/operational/governance)
 * 53. User Impact Estimation - Stakeholder analysis, benefit quantification
 * 54. Rollback Capability - Reversibility assessment
 *
 * PHASE 10 - QUERY & PERFORMANCE (3):
 * 55. Query Optimization Profiling - Pattern tracking, optimization suggestions
 * 56. Response Compression - gzip/brotli with ratio metadata
 * 57. Partial Field Selection - GraphQL-style field filtering
 *
 * Query Parameters:
 * - timeRange: "1h" | "6h" | "24h" | "7d" | "30d" (default: "24h")
 * - metrics: "all" | "generation" | "consumption" | "battery" | "grid" (default: "all")
 * - aggregation: "raw" | "1m" | "5m" | "15m" | "1h" | "1d" (default: "raw")
 * - format: "minimal" | "standard" | "full" | "timeseries" (default: "standard")
 * - includeForecasts: boolean (default: true)
 * - includeHistory: boolean (default: true)
 * - includeAlerts: boolean (default: true)
 * - includeOptimization: boolean (default: true)
 * - baselineComparison: "none" | "yesterday" | "lastWeek" | "lastYear" (default: "none")
 * - exportFormat: "json" | "csv" | "regulatory" (default: "json")
 * - stream: boolean (default: false)
 * - explainabilityDepth: "beginner" | "intermediate" | "expert" (default: "intermediate") [Phase 10]
 * - includeAgentContext: boolean (default: true) [Phase 10]
 * - includeOutcomes: boolean (default: true) [Phase 10]
 * - includeChains: boolean (default: true) [Phase 10]
 * - fields: comma-separated field names for partial selection (optional) [Phase 10]
 *
 * @see PRD Section 8.2 - Energy Metrics API
 */

import { NextResponse } from "next/server";
import {
  generateMockEnergyMetrics,
  generateMockTrustMathematics,
  calculateMockTrustDecay,
} from "@/lib/mock";
import type {
  OperationalStatus,
  FlowDirection,
  TrustMathematics,
} from "@/lib/types";

export const dynamic = "force-dynamic"; // Real-time data

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type TimeRange = "1h" | "6h" | "24h" | "7d" | "30d";
type MetricScope = "all" | "generation" | "consumption" | "battery" | "grid";
type AggregationLevel = "raw" | "1m" | "5m" | "15m" | "1h" | "1d";
type ResponseFormat = "minimal" | "standard" | "full" | "timeseries";
type BaselineComparison = "none" | "yesterday" | "lastWeek" | "lastYear";
type ExportFormat = "json" | "csv" | "regulatory";
type FlowType =
  | "generation_to_battery"
  | "generation_to_consumption"
  | "generation_to_grid"
  | "battery_to_consumption"
  | "battery_to_grid"
  | "grid_to_consumption"
  | "grid_to_battery";
type AnomalySeverity = "minor" | "moderate" | "major" | "critical";
type AlertUrgency = "info" | "low" | "medium" | "high" | "critical";
type ComponentType =
  | "solar_panel"
  | "inverter"
  | "battery"
  | "meter"
  | "transformer";
type HealthGrade = "excellent" | "good" | "fair" | "poor" | "critical";
type LoadCategory = "baseload" | "peak" | "intermittent" | "reactive";
type WeatherCondition =
  | "clear"
  | "partly_cloudy"
  | "overcast"
  | "rain"
  | "snow"
  | "storm";
type GridServiceType =
  | "frequency_regulation"
  | "voltage_support"
  | "demand_response"
  | "reactive_power";
type MaintenanceType = "preventive" | "corrective" | "predictive" | "emergency";
type ComparisonMetric =
  | "generation"
  | "consumption"
  | "efficiency"
  | "revenue"
  | "emissions";

// Phase 10 Enhancement Types (25 additional features)
type ExplainabilityDepth = "beginner" | "intermediate" | "expert";
type DecisionQualityScore = number; // 0-100
type RollbackComplexity = "trivial" | "simple" | "complex" | "expert";
type CompressionType = "none" | "gzip" | "brotli";
type AgentPersonaType = "operations" | "markets" | "maintenance" | "governance";
type ConfidenceFactor = "weather" | "historical" | "model" | "context";
type DecisionOutcome = "success" | "partial_success" | "failure" | "pending";
type ComplianceDomain = "safety" | "financial" | "operational" | "governance";

interface EnhancedEnergyMetrics {
  // Core Metrics (existing)
  timestamp: string;
  dataAge: number;

  // Enhancement #1: Real-time Flow Analysis
  flowAnalysis: FlowAnalysis;

  // Enhancement #2: Battery Health Tracking
  batteryHealth: BatteryHealthMetrics;

  // Enhancement #3: Grid Interaction Metrics
  gridInteraction: GridInteractionMetrics;

  // Enhancement #4: Temporal Pattern Analysis
  temporalPatterns: TemporalPatternAnalysis;

  // Enhancement #5: Constraint-Aware Optimization
  constraintValidation: ConstraintValidation;

  // Enhancement #6: Forecast Integration
  forecasts: ForecastData;

  // Enhancement #7: Performance Benchmarking
  performanceBenchmark: PerformanceBenchmark;

  // Enhancement #8: Anomaly Detection
  anomalies: AnomalyDetection;

  // Enhancement #9: Trust Mathematics
  trustMetrics: TrustMetrics;

  // Enhancement #10: Cross-Domain Impact
  crossDomainImpact: CrossDomainImpact;

  // Enhancement #11: Energy Balance Validation
  energyBalance: EnergyBalanceValidation;

  // Enhancement #12: Predictive Maintenance
  predictiveMaintenance: PredictiveMaintenance;

  // Enhancement #13: Historical Comparison
  historicalComparison: HistoricalComparison;

  // Enhancement #14: Efficiency Metrics
  efficiencyMetrics: EfficiencyMetrics;

  // Enhancement #15: Revenue Attribution
  revenueAttribution: RevenueAttribution;

  // Enhancement #16: Weather Integration
  weatherIntegration: WeatherIntegration;

  // Enhancement #17: Load Profiling
  loadProfile: LoadProfile;

  // Enhancement #18: Battery Optimization
  batteryOptimization: BatteryOptimization;

  // Enhancement #19: Grid Services
  gridServices: GridServices;

  // Enhancement #20: Carbon Accounting
  carbonAccounting: CarbonAccounting;

  // Enhancement #21: Alert Generation
  alerts: AlertGeneration[];

  // Enhancement #22: Data Quality Monitoring
  dataQuality: DataQualityMonitoring;

  // Enhancement #23: Visualization Data Prep
  visualizationData: VisualizationDataPrep;

  // Metadata
  queryMetadata: QueryMetadata;
  optimizationHints: string[];
  smartDefaults: SmartDefault[];

  // ========== PHASE 10 ENHANCEMENTS (25 additional features) ==========

  // Agent Integration (Enhancements #33-40)
  agentDecisionLinks: AgentDecisionLink[]; // #33: Agent Decision Linking
  agentStates: AgentStateContext[]; // #34: Agent State Context
  multiAgentCoordination: MultiAgentCoordination[]; // #35: Multi-Agent Coordination
  agentConsensus: AgentConsensus[]; // #36: Agent Consensus Tracking
  decisionExplanations: DecisionExplanation[]; // #37: Decision Explanations
  agentWorkload: AgentWorkloadMetrics[]; // #38: Agent Workload Metrics
  learningContext: LearningContext[]; // #39: Agent Learning Context
  agentAuthority: AgentAuthority[]; // #40: Agent Authority Scope

  // Advanced Explainability (Enhancements #41-45)
  explainabilityLevels: ExplainabilityLevels; // #41: Explainability Depth Levels
  confidenceBreakdown: ConfidenceBreakdown; // #42: Confidence Breakdown
  alternativeActions: AlternativeAction[]; // #43: Alternative Actions Analysis
  decisionPrerequisites: DecisionPrerequisites[]; // #44: Decision Prerequisites
  counterfactualAnalyses: CounterfactualAnalysis[]; // #45: Counterfactual Analysis

  // Operational Intelligence (Enhancements #46-50)
  decisionQuality: DecisionQuality[]; // #46: Decision Quality Scoring
  outcomeTracking: OutcomeTracking[]; // #47: Outcome Tracking
  decisionChains: DecisionChain[]; // #48: Decision Chain Linking
  decisionVelocity: DecisionVelocity; // #49: Decision Velocity Metrics
  reversalHistory: ReversalHistory[]; // #50: Reversal History

  // Advanced Trust & Provenance (Enhancements #51-54)
  provenanceChains: ProvenanceChain[]; // #51: 4-Step Provenance Chain
  complianceScoring: ComplianceScoring; // #52: Compliance Scoring
  userImpactEstimation: UserImpactEstimation[]; // #53: User Impact Estimation
  rollbackCapability: RollbackCapability[]; // #54: Rollback Capability

  // Query & Performance (Enhancements #55-57)
  queryProfile: QueryProfile; // #55: Query Optimization Profiling
  responseCompression: ResponseCompression; // #56: Response Compression
  fieldSelection: FieldSelection; // #57: Partial Field Selection
}

interface FlowAnalysis {
  flows: EnergyFlow[];
  totalGeneration: number; // kW
  totalConsumption: number; // kW
  netGridFlow: number; // kW (positive = export, negative = import)
  systemEfficiency: number; // 0-100%
  totalLosses: number; // kW
  lossesBreakdown: LossComponent[];
  flowDirection: FlowDirection;
  primaryFlowType: FlowType;
}

interface EnergyFlow {
  flowType: FlowType;
  magnitude: number; // kW
  efficiency: number; // 0-100%
  losses: number; // kW
}

interface LossComponent {
  component: string;
  lossesKW: number;
  lossPercentage: number;
}

interface BatteryHealthMetrics {
  stateOfHealth: number; // 0-100% of original capacity
  stateOfCharge: number; // 0-100% current charge
  cycleCount: number;
  degradationRate: number; // % per year
  capacityFadeMWh: number;
  temperatureCelsius: number;
  temperatureImpact: number; // % efficiency impact
  estimatedLifespanYears: number;
  healthGrade: HealthGrade;
  optimalSOCRange: { min: number; max: number };
  currentSOCStatus:
    | "critical_low"
    | "low"
    | "optimal"
    | "high"
    | "critical_high";
}

interface GridInteractionMetrics {
  frequencyHz: number;
  frequencyDeviation: number; // Hz from nominal (60 or 50)
  frequencyStability: "stable" | "fluctuating" | "unstable";
  voltageStability: number; // 0-100% quality score
  powerFactor: number; // 0-1.0
  harmonicDistortion: number; // % THD
  reactivePower: number; // kVAR
  gridSyncStatus: "synchronized" | "islanded" | "curtailed" | "disconnected";
  qualityGrade: "excellent" | "good" | "acceptable" | "poor";
}

interface TemporalPatternAnalysis {
  currentPhase:
    | "night"
    | "dawn"
    | "morning"
    | "midday"
    | "afternoon"
    | "evening"
    | "dusk";
  diurnalCurve: DiurnalPoint[];
  weeklyPattern: WeeklyPattern;
  seasonalFactor: number; // Multiplier vs baseline
  demandPredictability: number; // 0-100% how predictable
  clusteringScore: number; // 0-100% pattern clustering strength
  patternDeviation: number; // Sigma from expected pattern
}

interface DiurnalPoint {
  hour: number;
  expectedGeneration: number; // kW
  expectedConsumption: number; // kW
}

interface WeeklyPattern {
  dayOfWeek: number; // 0=Sunday
  weekdayFactor: number; // Multiplier vs average
  isWeekend: boolean;
}

interface ConstraintValidation {
  allConstraintsMet: boolean;
  violations: ConstraintViolation[];
  safetyStatus: "safe" | "warning" | "critical";
  thermalLimits: ThermalConstraints;
  voltageLimits: VoltageConstraints;
  rateLimits: RateLimits;
  regulatoryCompliance: RegulatoryCompliance;
}

interface ConstraintViolation {
  constraintType: string;
  threshold: number;
  actualValue: number;
  severity: "minor" | "moderate" | "major" | "critical";
  action: string;
}

interface ThermalConstraints {
  maxTempCelsius: number;
  currentTempCelsius: number;
  margin: number; // Celsius to limit
  status: "optimal" | "elevated" | "warning" | "critical";
}

interface VoltageConstraints {
  minVoltage: number;
  maxVoltage: number;
  currentVoltage: number;
  status: "within_bounds" | "near_limit" | "violated";
}

interface RateLimits {
  maxChargeRateKW: number;
  maxDischargeRateKW: number;
  currentRateKW: number;
  utilizationPercent: number;
}

interface RegulatoryCompliance {
  compliant: boolean;
  standards: string[];
  certifications: string[];
  lastAudit: string;
}

interface ForecastData {
  nextHour: ForecastPeriod;
  next24Hours: ForecastPeriod;
  nextWeek: ForecastPeriod;
  weatherAdjusted: boolean;
  forecastModel: "historical" | "weather_based" | "ml_prediction" | "hybrid";
  confidenceScore: number; // 0-100%
}

interface ForecastPeriod {
  timeHorizon: string;
  expectedGeneration: number; // kW average
  expectedConsumption: number; // kW average
  confidenceInterval: { lower: number; upper: number };
  keyDrivers: string[];
}

interface PerformanceBenchmark {
  vsHistoricalBaseline: BaselineComparisonData;
  vsPeerAssets: PeerComparison;
  capacityFactor: number; // 0-100%
  availability: number; // 0-100% uptime
  performanceRatio: number; // 0-100% actual vs theoretical
  efficiencyTrend: "improving" | "stable" | "declining";
  rankingPercentile: number; // 0-100 (100 = best)
}

interface BaselineComparisonData {
  metric: string;
  current: number;
  baseline: number;
  delta: number;
  deltaPercent: number;
}

interface PeerComparison {
  peerCount: number;
  averagePerformance: number;
  topPerformerGap: number; // % below top
  bottomPerformerGap: number; // % above bottom
}

interface AnomalyDetection {
  anomaliesDetected: boolean;
  anomalies: Anomaly[];
  patternDeviationSigma: number;
  faultsPredicted: FaultPrediction[];
  earlyWarnings: EarlyWarning[];
}

interface Anomaly {
  anomalyId: string;
  timestamp: string;
  type:
    | "generation"
    | "consumption"
    | "battery"
    | "grid"
    | "temperature"
    | "efficiency";
  severity: AnomalySeverity;
  description: string;
  expectedValue: number;
  actualValue: number;
  deviationSigma: number;
  resolved: boolean;
}

interface FaultPrediction {
  component: ComponentType;
  faultType: string;
  probability: number; // 0-100%
  estimatedTimeToFailure: number; // Hours
  recommendedAction: string;
}

interface EarlyWarning {
  warningType: string;
  urgency: AlertUrgency;
  message: string;
  threshold: number;
  currentValue: number;
  timeToThreshold: number; // Hours
}

interface TrustMetrics {
  overallTrust: TrustMathematics;
  sourceBreakdown: SourceTrust[];
  freshnessDecay: number; // 0-100% trust remaining
  multiSourceValidation: boolean;
  consensusStrength: number; // 0-100% agreement between sources
  dataProvenance: DataProvenance[];
}

interface SourceTrust {
  source: string;
  trustScore: number; // 0-100
  lastUpdate: string;
  reliability: number; // 0-100% historical accuracy
}

interface DataProvenance {
  dataPoint: string;
  sources: string[];
  consensusLevel: number; // 0-100%
  collectionMethod: string;
}

interface CrossDomainImpact {
  energyToFinancial: DomainImpact;
  energyToOperational: DomainImpact;
  energyToGovernance: DomainImpact;
  overallImpactScore: number; // 0-100
}

interface DomainImpact {
  affected: boolean;
  impactDescription: string;
  magnitude: "none" | "minimal" | "moderate" | "significant" | "critical";
  specificMetrics: Record<string, number>;
}

interface EnergyBalanceValidation {
  conservationMet: boolean;
  totalInput: number; // kW
  totalOutput: number; // kW
  accountedLosses: number; // kW
  unaccountedVariance: number; // kW
  balanceAccuracy: number; // 0-100%
  reconciliationStatus: "perfect" | "acceptable" | "discrepancy" | "critical";
}

interface PredictiveMaintenance {
  maintenanceNeeded: boolean;
  components: ComponentHealth[];
  optimalServiceWindow: ServiceWindow | null;
  estimatedDowntime: number; // Hours
  costEstimate: number; // USD
  urgency: "routine" | "soon" | "urgent" | "emergency";
}

interface ComponentHealth {
  component: ComponentType;
  healthScore: number; // 0-100
  healthGrade: HealthGrade;
  failureProbability30Days: number; // 0-100%
  expectedLifespanDays: number;
  lastMaintenance: string;
  nextRecommendedMaintenance: string;
}

interface ServiceWindow {
  startTime: string;
  endTime: string;
  reason: string;
  maintenanceType: MaintenanceType;
}

interface HistoricalComparison {
  comparisonPeriod: BaselineComparison;
  metrics: BaselineComparisonData[];
  trendAnalysis: TrendAnalysis;
  seasonalityAdjusted: boolean;
}

interface TrendAnalysis {
  direction: "improving" | "stable" | "declining";
  strength: number; // 0-100% how strong the trend
  volatility: "low" | "moderate" | "high";
  cyclicity: "none" | "daily" | "weekly" | "monthly" | "seasonal";
}

interface EfficiencyMetrics {
  batteryRoundTripEfficiency: number; // 0-100%
  inverterEfficiency: number; // 0-100%
  systemLosses: number; // % of total generation
  capacityUtilization: number; // 0-100%
  lossesBreakdown: {
    conversion: number; // kW
    transmission: number; // kW
    storage: number; // kW
    thermal: number; // kW
  };
}

interface RevenueAttribution {
  totalRevenue24h: number; // USD
  revenueBySource: RevenueSource[];
  timeOfUsePricing: TimeOfUseImpact;
  tradingRevenue: number; // USD from energy trading
  gridServicesRevenue: number; // USD from grid services
}

interface RevenueSource {
  source: "solar" | "battery" | "grid";
  energyMWh: number;
  revenueUSD: number;
  averagePricePerMWh: number;
}

interface TimeOfUseImpact {
  peakHoursRevenue: number;
  offPeakRevenue: number;
  shoulderRevenue: number;
  optimizationOpportunity: number; // USD potential gain
}

interface WeatherIntegration {
  current: CurrentWeather;
  solarCorrelation: number; // 0-100% correlation strength
  temperatureImpact: number; // % efficiency impact
  forecastAccuracy: number; // 0-100% recent accuracy
  weatherAdjustedForecast: boolean;
}

interface CurrentWeather {
  condition: WeatherCondition;
  solarIrradianceWm2: number;
  temperatureCelsius: number;
  cloudCoverPercent: number;
  windSpeedMs: number;
}

interface LoadProfile {
  currentLoad: number; // kW
  loadCategories: LoadCategoryData[];
  loadFactor: number; // Average/Peak ratio
  diversityFactor: number;
  peakDemand24h: number; // kW
  baseload: number; // kW minimum continuous
}

interface LoadCategoryData {
  category: LoadCategory;
  loadKW: number;
  percentage: number;
}

interface BatteryOptimization {
  optimalChargeSchedule: ChargeSchedule[];
  currentDepthOfDischarge: number; // 0-100%
  recommendedDOD: number; // 0-100% for longevity
  cyclingStrategy: "conservative" | "balanced" | "aggressive";
  arbitrageOpportunity: number; // USD potential profit
}

interface ChargeSchedule {
  startTime: string;
  endTime: string;
  targetSOC: number;
  reason: string;
  expectedCostSavings: number; // USD
}

interface GridServices {
  servicesActive: GridServiceData[];
  frequencyRegulationCapacity: number; // kW available
  demandResponseCapability: number; // kW available
  ancillaryServicesRevenue: number; // USD per day
  participationStatus: "active" | "standby" | "inactive";
}

interface GridServiceData {
  serviceType: GridServiceType;
  active: boolean;
  capacityProvided: number; // kW
  revenuePerMWh: number; // USD
}

interface CarbonAccounting {
  co2AvoidedKg: number; // Last 24h
  renewablePercentage: number; // 0-100%
  gridCarbonIntensity: number; // kg CO2 per MWh
  sustainabilityScore: number; // 0-100
  equivalentMetrics: {
    treesPlanted: number;
    milesDriven: number;
    homesPowered: number;
  };
}

interface AlertGeneration {
  alertId: string;
  alertType: "threshold" | "trend" | "predictive" | "anomaly";
  urgency: AlertUrgency;
  message: string;
  timestamp: string;
  stakeholder: string[];
  actionable: boolean;
  recommendedAction?: string;
  acknowledged: boolean;
}

interface DataQualityMonitoring {
  overallQuality: number; // 0-100 score
  sensorHealth: SensorHealth[];
  dataGaps: DataGap[];
  outliers: OutlierDetection[];
  validationStatus: "validated" | "partial" | "unvalidated";
}

interface SensorHealth {
  sensorId: string;
  sensorType: ComponentType;
  healthStatus: "healthy" | "degraded" | "faulty" | "offline";
  lastCalibration: string;
  accuracy: number; // 0-100%
}

interface DataGap {
  startTime: string;
  endTime: string;
  durationMinutes: number;
  affectedMetrics: string[];
  filled: boolean;
  fillMethod?: "interpolation" | "forward_fill" | "model_estimate";
}

interface OutlierDetection {
  timestamp: string;
  metric: string;
  value: number;
  expectedRange: { min: number; max: number };
  deviationSigma: number;
  validated: boolean;
}

interface VisualizationDataPrep {
  timeSeries: TimeSeriesData[];
  flowDiagram: FlowDiagramData;
  batteryCurve: BatteryCurveData[];
  gridInteractionPlot: GridInteractionPoint[];
  heatmap: HeatmapData;
}

interface TimeSeriesData {
  timestamp: string;
  generation: number;
  consumption: number;
  batterySOC: number;
  gridFlow: number;
}

interface FlowDiagramData {
  nodes: { id: string; label: string; value: number }[];
  edges: { from: string; to: string; value: number }[];
}

interface BatteryCurveData {
  timestamp: string;
  soc: number;
  power: number; // Positive = charging
  temperature: number;
}

interface GridInteractionPoint {
  timestamp: string;
  frequency: number;
  voltage: number;
  powerFactor: number;
}

interface HeatmapData {
  hourOfDay: number;
  dayOfWeek: number;
  value: number; // Generation or consumption
  metric: "generation" | "consumption" | "efficiency";
}

interface QueryMetadata {
  timeRange: TimeRange;
  metrics: MetricScope;
  aggregation: AggregationLevel;
  format: ResponseFormat;
  includeForecasts: boolean;
  includeHistory: boolean;
  includeAlerts: boolean;
  includeOptimization: boolean;
  baselineComparison: BaselineComparison;
  exportFormat: ExportFormat;
  processingTimeMs: number;
  dataPointsReturned: number;
}

interface SmartDefault {
  parameter: string;
  defaultValue: string | boolean;
  reason: string;
}

// ============================================================================
// PHASE 10 ENHANCEMENT INTERFACES (25 additional features)
// ============================================================================

// Agent Integration (Enhancements #33-40)
interface AgentDecisionLink {
  decisionId: string;
  agentPersona: AgentPersonaType;
  triggeredAction: string;
  timestamp: string;
  energyImpactKw: number;
  confidenceScore: number; // 0-100
  reasoning: string[];
}

interface AgentStateContext {
  agentPersona: AgentPersonaType;
  cognitiveLoad: number; // 0-100, higher = more taxed
  activeDecisions: number;
  queueDepth: number;
  resourceUtilization: {
    cpu: number; // 0-100%
    memory: number; // 0-100%
    processingLatencyMs: number;
  };
  attentionFocus: string[]; // What the agent is prioritizing
}

interface MultiAgentCoordination {
  coordinationId: string;
  involvedAgents: AgentPersonaType[];
  coordinationType:
    | "energy_arbitrage"
    | "load_balancing"
    | "emergency_response"
    | "optimization";
  initiatedBy: AgentPersonaType;
  consensusReached: boolean;
  coordinationStartTime: string;
  coordinationEndTime: string;
  energyAction: string;
  estimatedBenefit: number; // USD
}

interface AgentConsensus {
  topic: string; // e.g., "battery_charge_schedule_2024-10-10"
  proposedStrategy: string;
  agentVotes: {
    agentPersona: AgentPersonaType;
    vote: "approve" | "reject" | "abstain";
    confidence: number; // 0-100
    reasoning: string;
  }[];
  consensusStrength: number; // 0-100, based on vote agreement
  finalDecision: "approved" | "rejected" | "pending";
  timestamp: string;
}

interface DecisionExplanation {
  decisionId: string;
  decisionType: string; // e.g., "battery_discharge", "grid_export"
  agentPersona: AgentPersonaType;
  summary: string;
  reasoningChain: {
    step: number;
    reasoning: string;
    supportingData: Record<string, unknown>;
  }[];
  constraints: string[];
  alternatives: string[]; // Other options considered
  selectedRationale: string;
  confidenceScore: number; // 0-100
}

interface AgentWorkloadMetrics {
  agentPersona: AgentPersonaType;
  timeRange: string; // e.g., "last_1h"
  totalDecisions: number;
  energyRelatedDecisions: number;
  avgProcessingTimeMs: number;
  peakProcessingTimeMs: number;
  decisionsPerHour: number;
  errorRate: number; // 0-100%
  currentQueueDepth: number;
}

interface LearningContext {
  agentPersona: AgentPersonaType;
  strategyType: string; // e.g., "battery_optimization", "grid_arbitrage"
  initialPerformance: number; // 0-100 score
  currentPerformance: number; // 0-100 score
  improvementRate: number; // % improvement per week
  adaptationsMade: {
    timestamp: string;
    change: string;
    trigger: string; // What caused the adaptation
    outcomeImpact: number; // +/- performance delta
  }[];
  learningVelocity: number; // Rate of adaptation, 0-100
}

interface AgentAuthority {
  agentPersona: AgentPersonaType;
  autonomousDecisions: string[]; // Actions agent can take without approval
  requiresApproval: string[]; // Actions needing human/governance approval
  energyLimits: {
    maxDischargeKw: number;
    maxChargeKw: number;
    maxGridExportKw: number;
    maxGridImportKw: number;
  };
  financialLimits: {
    maxTransactionUsd: number;
    dailyLimitUsd: number;
  };
  overrideAuthority: boolean; // Can this agent override other agents?
  escalationPath: string[];
}

// Advanced Explainability (Enhancements #41-45)
interface ExplainabilityLevels {
  beginner: {
    summary: string;
    keyPoints: string[];
    analogy?: string;
  };
  intermediate: {
    summary: string;
    detailedContext: string[];
    dataPoints: Record<string, unknown>;
    assumptions: string[];
  };
  expert: {
    summary: string;
    technicalDetails: string[];
    algorithmicApproach: string;
    mathematicalModel?: string;
    uncertainties: string[];
    limitationsAndCaveats: string[];
  };
}

interface ConfidenceBreakdown {
  totalConfidence: number; // 0-100
  factors: {
    factorType: ConfidenceFactor;
    weight: number; // 0-100, percentage contribution
    confidence: number; // 0-100, confidence in this factor
    reasoning: string;
  }[];
  uncertaintyBound: {
    lower: number;
    upper: number;
  };
  sensitivityAnalysis: string[]; // Which factors most impact confidence
}

interface AlternativeAction {
  actionId: string;
  actionDescription: string;
  estimatedOutcome: {
    energyKwh: number;
    revenueUsd: number;
    efficiency: number;
    riskLevel: number; // 0-100
  };
  rejectionReason: string;
  rejectionScore: number; // 0-100, how strongly rejected
  wouldReconsiderIf: string[]; // Conditions under which this becomes viable
}

interface DecisionPrerequisites {
  decisionType: string;
  requiredConditions: {
    condition: string;
    currentValue: unknown;
    requiredValue: unknown;
    satisfied: boolean;
    criticality: "required" | "recommended" | "optional";
  }[];
  allRequiredMet: boolean;
  recommendedMet: number; // Percentage of recommended conditions met
  warnings: string[];
}

interface CounterfactualAnalysis {
  scenario: string; // e.g., "What if we charged at 2am instead of 3am?"
  actualOutcome: {
    energyKwh: number;
    costUsd: number;
    efficiency: number;
  };
  counterfactualOutcome: {
    energyKwh: number;
    costUsd: number;
    efficiency: number;
  };
  delta: {
    energyKwhDiff: number;
    costUsdDiff: number;
    efficiencyDiff: number;
  };
  probability: number; // 0-100, likelihood counterfactual would have occurred
  keyDifferences: string[];
}

// Operational Intelligence (Enhancements #46-50)
interface DecisionQuality {
  decisionId: string;
  decisionType: string;
  timestamp: string;
  qualityScore: DecisionQualityScore; // 0-100
  scoringFactors: {
    accuracyScore: number; // How close to predicted outcome
    efficiencyScore: number; // Resource utilization
    timeliness: number; // Was it made at right time
    riskManagement: number; // How well risks were managed
    complianceScore: number; // Regulatory adherence
  };
  outcomeStatus: DecisionOutcome;
  lessonsLearned: string[];
}

interface OutcomeTracking {
  decisionId: string;
  predicted: {
    generationKwh: number;
    consumptionKwh: number;
    revenueUsd: number;
    efficiency: number;
    batterySOCEnd: number;
  };
  actual: {
    generationKwh: number;
    consumptionKwh: number;
    revenueUsd: number;
    efficiency: number;
    batterySOCEnd: number;
  };
  variance: {
    generationError: number; // %
    consumptionError: number; // %
    revenueError: number; // %
    efficiencyError: number; // %
    batterySOCError: number; // %
  };
  rootCauseAnalysis: string[];
  correctionsMade: string[];
}

interface DecisionChain {
  chainId: string;
  trigger: {
    domain: "energy" | "financial" | "operational" | "governance";
    event: string;
    timestamp: string;
  };
  propagation: {
    step: number;
    domain: "energy" | "financial" | "operational" | "governance";
    decision: string;
    agentPersona: AgentPersonaType;
    timestamp: string;
    impactMagnitude: number; // 0-100
  }[];
  totalImpact: {
    energyKwh: number;
    financialUsd: number;
    operationalChanges: number; // Count of operational adjustments
    governanceActions: number; // Count of governance responses
  };
  chainComplete: boolean;
  chainDurationMs: number;
}

interface DecisionVelocity {
  timeRange: string;
  decisionsPerHour: number;
  decisionsPerMinute: number;
  burstDetected: boolean;
  burstThreshold: number; // Decisions/min that triggers burst
  trend: "increasing" | "stable" | "decreasing";
  peakVelocityTime: string;
  peakVelocityValue: number;
  averageGapBetweenDecisionsMs: number;
}

interface ReversalHistory {
  reversalId: string;
  originalDecisionId: string;
  originalDecision: string;
  reversalReason:
    | "human_override"
    | "constraint_violation"
    | "better_information"
    | "emergency";
  reversalAuthority: "human_operator" | "governance_agent" | "safety_system";
  reversalTimestamp: string;
  timeSinceOriginalMs: number;
  impactOfReversal: {
    energyKwh: number;
    costUsd: number;
    operationalDisruption: number; // 0-100
  };
  correctiveActions: string[];
}

// Advanced Trust & Provenance (Enhancements #51-54)
interface ProvenanceChain {
  dataPoint: string;
  chain: {
    step: "ingestion" | "processing" | "analysis" | "decision";
    timestamp: string;
    actor: string; // System component or agent
    action: string;
    inputHash?: string;
    outputHash?: string;
    transformations: string[];
    validations: string[];
  }[];
  totalLatencyMs: number;
  integrityVerified: boolean;
  auditTrail: string;
}

interface ComplianceScoring {
  overallScore: number; // 0-100
  domainScores: {
    domain: ComplianceDomain;
    score: number; // 0-100
    requirements: {
      requirement: string;
      status: "compliant" | "non_compliant" | "partial";
      evidence: string;
    }[];
    lastAudit: string;
  }[];
  violations: {
    domain: ComplianceDomain;
    violation: string;
    severity: "low" | "medium" | "high" | "critical";
    timestamp: string;
    remediation: string;
  }[];
  certifications: string[];
}

interface UserImpactEstimation {
  impactId: string;
  energyChange: string; // Description of change
  affectedStakeholders: {
    stakeholderType:
      | "token_holder"
      | "operator"
      | "grid_operator"
      | "community";
    estimatedCount: number;
    impactType: "positive" | "negative" | "neutral";
    impactMagnitude: number; // 0-100
  }[];
  benefits: {
    stakeholderType: string;
    benefitType: string; // "cost_savings", "revenue_increase", "reliability"
    quantifiedValue: number; // USD or kWh
    qualitativeDescription: string;
  }[];
  risks: {
    riskType: string;
    probability: number; // 0-100
    impact: number; // 0-100
    mitigation: string;
  }[];
  netBenefit: number; // Aggregate benefit score, -100 to +100
}

interface RollbackCapability {
  decisionId: string;
  canRollback: boolean;
  complexity: RollbackComplexity;
  estimatedTimeMinutes: number;
  requiredActions: string[];
  risks: string[];
  dependencies: string[]; // Other systems affected
  dataRecovery: {
    possible: boolean;
    method: string;
    dataLoss: "none" | "minimal" | "moderate" | "significant";
  };
  approvalRequired: boolean;
}

// Query & Performance (Enhancements #55-57)
interface QueryProfile {
  querySignature: string; // Hash of query parameters
  executionCount: number;
  avgExecutionTimeMs: number;
  lastExecuted: string;
  optimizationSuggestions: string[];
  commonPatterns: string[];
  performanceRating: "excellent" | "good" | "acceptable" | "poor";
}

interface ResponseCompression {
  compressionType: CompressionType;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  compressionRatio: number; // 0-1, lower is better compression
  compressionTimeMs: number;
  supported: boolean;
}

interface FieldSelection {
  requestedFields: string[];
  availableFields: string[];
  excludedFields: string[];
  estimatedSizeReduction: number; // Percentage
}

/**
 * Enhancement #1: Generate real-time flow analysis
 */
function generateFlowAnalysis(
  baseMetrics: Record<string, unknown>
): FlowAnalysis {
  const generation = (baseMetrics.generationKw as number) || 0;
  const consumption = (baseMetrics.consumptionKw as number) || 0;
  const batteryPower = (baseMetrics.batteryPowerKw as number) || 0;
  const gridFlow = generation + batteryPower - consumption;

  const flows: EnergyFlow[] = [];

  // Generation flows
  if (generation > 0) {
    if (batteryPower > 0) {
      flows.push({
        flowType: "generation_to_battery",
        magnitude: Math.min(generation, batteryPower),
        efficiency: 95,
        losses: Math.min(generation, batteryPower) * 0.05,
      });
    }
    if (consumption > 0) {
      flows.push({
        flowType: "generation_to_consumption",
        magnitude: Math.min(generation, consumption),
        efficiency: 98,
        losses: Math.min(generation, consumption) * 0.02,
      });
    }
    if (gridFlow > 0) {
      flows.push({
        flowType: "generation_to_grid",
        magnitude: gridFlow,
        efficiency: 97,
        losses: gridFlow * 0.03,
      });
    }
  }

  // Battery flows
  if (batteryPower < 0) {
    flows.push({
      flowType: "battery_to_consumption",
      magnitude: Math.abs(batteryPower),
      efficiency: 92,
      losses: Math.abs(batteryPower) * 0.08,
    });
  }

  // Grid flows
  if (gridFlow < 0) {
    flows.push({
      flowType: "grid_to_consumption",
      magnitude: Math.abs(gridFlow),
      efficiency: 99,
      losses: Math.abs(gridFlow) * 0.01,
    });
  }

  const totalLosses = flows.reduce((sum, f) => sum + f.losses, 0);
  const systemEfficiency = ((generation - totalLosses) / generation) * 100;

  return {
    flows,
    totalGeneration: generation,
    totalConsumption: consumption,
    netGridFlow: gridFlow,
    systemEfficiency: Math.max(0, Math.min(100, systemEfficiency)),
    totalLosses,
    lossesBreakdown: [
      {
        component: "Inverter",
        lossesKW: totalLosses * 0.4,
        lossPercentage: 40,
      },
      {
        component: "Battery",
        lossesKW: totalLosses * 0.35,
        lossPercentage: 35,
      },
      {
        component: "Transmission",
        lossesKW: totalLosses * 0.15,
        lossPercentage: 15,
      },
      {
        component: "Transformer",
        lossesKW: totalLosses * 0.1,
        lossPercentage: 10,
      },
    ],
    flowDirection:
      batteryPower > 0 ? "charging" : batteryPower < 0 ? "discharging" : "idle",
    primaryFlowType: flows[0]?.flowType || "generation_to_consumption",
  };
}

/**
 * Enhancement #2: Generate battery health metrics
 */
function generateBatteryHealthMetrics(
  baseMetrics: Record<string, unknown>
): BatteryHealthMetrics {
  const soc = (baseMetrics.batterySOC as number) || 75;
  const cycles = (baseMetrics.batteryCycles as number) || 1250;
  const temp = (baseMetrics.batteryTempCelsius as number) || 25;

  const soh = Math.max(70, 100 - cycles / 30); // Degrades with cycles
  const degradationRate = 1.5 + (cycles / 1000) * 0.5; // % per year
  const tempImpact = temp > 35 ? (temp - 35) * 0.5 : 0; // % efficiency loss per °C above 35
  const lifespan = (soh - 70) / degradationRate; // Years until 70% capacity

  let socStatus: "critical_low" | "low" | "optimal" | "high" | "critical_high";
  if (soc < 20) socStatus = "critical_low";
  else if (soc < 30) socStatus = "low";
  else if (soc > 95) socStatus = "critical_high";
  else if (soc > 85) socStatus = "high";
  else socStatus = "optimal";

  let healthGrade: HealthGrade;
  if (soh >= 95) healthGrade = "excellent";
  else if (soh >= 85) healthGrade = "good";
  else if (soh >= 75) healthGrade = "fair";
  else if (soh >= 65) healthGrade = "poor";
  else healthGrade = "critical";

  return {
    stateOfHealth: soh,
    stateOfCharge: soc,
    cycleCount: cycles,
    degradationRate,
    capacityFadeMWh: (100 - soh) * 0.05, // Assume 5 MWh original capacity
    temperatureCelsius: temp,
    temperatureImpact: tempImpact,
    estimatedLifespanYears: lifespan,
    healthGrade,
    optimalSOCRange: { min: 20, max: 85 },
    currentSOCStatus: socStatus,
  };
}

/**
 * Enhancement #3: Generate grid interaction metrics
 */
function generateGridInteractionMetrics(): GridInteractionMetrics {
  const baseFreq = 60; // Hz
  const freqDeviation = (Math.random() - 0.5) * 0.1; // ±0.05 Hz
  const currentFreq = baseFreq + freqDeviation;

  const voltageStability = 90 + Math.random() * 10; // 90-100%
  const powerFactor = 0.92 + Math.random() * 0.07; // 0.92-0.99
  const harmonicDistortion = 1.5 + Math.random() * 2; // 1.5-3.5%

  let freqStability: "stable" | "fluctuating" | "unstable";
  if (Math.abs(freqDeviation) < 0.02) freqStability = "stable";
  else if (Math.abs(freqDeviation) < 0.05) freqStability = "fluctuating";
  else freqStability = "unstable";

  let qualityGrade: "excellent" | "good" | "acceptable" | "poor";
  if (voltageStability >= 98 && harmonicDistortion < 2)
    qualityGrade = "excellent";
  else if (voltageStability >= 95 && harmonicDistortion < 3)
    qualityGrade = "good";
  else if (voltageStability >= 90) qualityGrade = "acceptable";
  else qualityGrade = "poor";

  return {
    frequencyHz: currentFreq,
    frequencyDeviation: freqDeviation,
    frequencyStability: freqStability,
    voltageStability,
    powerFactor,
    harmonicDistortion,
    reactivePower: Math.random() * 10, // kVAR
    gridSyncStatus: freqStability === "stable" ? "synchronized" : "curtailed",
    qualityGrade,
  };
}

/**
 * Enhancement #4: Generate temporal pattern analysis
 */
function generateTemporalPatternAnalysis(): TemporalPatternAnalysis {
  const hour = new Date().getHours();

  let phase:
    | "night"
    | "dawn"
    | "morning"
    | "midday"
    | "afternoon"
    | "evening"
    | "dusk";
  if (hour >= 0 && hour < 5) phase = "night";
  else if (hour >= 5 && hour < 7) phase = "dawn";
  else if (hour >= 7 && hour < 11) phase = "morning";
  else if (hour >= 11 && hour < 14) phase = "midday";
  else if (hour >= 14 && hour < 17) phase = "afternoon";
  else if (hour >= 17 && hour < 19) phase = "evening";
  else if (hour >= 19 && hour < 22) phase = "dusk";
  else phase = "night";

  const diurnalCurve: DiurnalPoint[] = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    expectedGeneration:
      h >= 6 && h <= 18 ? 50 + Math.sin(((h - 6) * Math.PI) / 12) * 100 : 0,
    expectedConsumption:
      30 + Math.sin(((h - 6) * Math.PI) / 12) * 20 + (h < 6 || h > 20 ? 20 : 0),
  }));

  const dayOfWeek = new Date().getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  return {
    currentPhase: phase,
    diurnalCurve,
    weeklyPattern: {
      dayOfWeek,
      weekdayFactor: isWeekend ? 0.85 : 1.0, // Less consumption on weekends
      isWeekend,
    },
    seasonalFactor:
      1.0 + Math.sin((new Date().getMonth() * Math.PI) / 6) * 0.15, // ±15% seasonal
    demandPredictability: 75 + Math.random() * 20, // 75-95%
    clusteringScore: 80 + Math.random() * 15, // 80-95%
    patternDeviation: Math.random() * 1.5, // 0-1.5 sigma
  };
}

/**
 * Enhancement #5: Generate constraint validation
 */
function generateConstraintValidation(
  batteryMetrics: BatteryHealthMetrics
): ConstraintValidation {
  const violations: ConstraintViolation[] = [];

  // Check temperature
  if (batteryMetrics.temperatureCelsius > 45) {
    violations.push({
      constraintType: "thermal_safety",
      threshold: 45,
      actualValue: batteryMetrics.temperatureCelsius,
      severity: batteryMetrics.temperatureCelsius > 50 ? "critical" : "major",
      action: "Reduce charging rate, activate cooling",
    });
  }

  // Check SOC bounds
  if (batteryMetrics.stateOfCharge < 15) {
    violations.push({
      constraintType: "battery_safety",
      threshold: 15,
      actualValue: batteryMetrics.stateOfCharge,
      severity: "moderate",
      action: "Prevent further discharge",
    });
  }

  const safetyStatus: "safe" | "warning" | "critical" = violations.some(
    (v) => v.severity === "critical"
  )
    ? "critical"
    : violations.some((v) => v.severity === "major")
      ? "warning"
      : "safe";

  return {
    allConstraintsMet: violations.length === 0,
    violations,
    safetyStatus,
    thermalLimits: {
      maxTempCelsius: 50,
      currentTempCelsius: batteryMetrics.temperatureCelsius,
      margin: 50 - batteryMetrics.temperatureCelsius,
      status:
        batteryMetrics.temperatureCelsius > 45
          ? "critical"
          : batteryMetrics.temperatureCelsius > 40
            ? "warning"
            : batteryMetrics.temperatureCelsius > 35
              ? "elevated"
              : "optimal",
    },
    voltageLimits: {
      minVoltage: 350,
      maxVoltage: 480,
      currentVoltage: 420,
      status: "within_bounds",
    },
    rateLimits: {
      maxChargeRateKW: 250,
      maxDischargeRateKW: 200,
      currentRateKW: Math.random() * 150,
      utilizationPercent: ((Math.random() * 150) / 250) * 100,
    },
    regulatoryCompliance: {
      compliant: violations.length === 0,
      standards: ["IEEE 1547", "UL 1741", "IEC 62109"],
      certifications: ["UL Listed", "CE Marked"],
      lastAudit: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };
}

/**
 * Enhancement #6: Generate forecast data
 */
function generateForecastData(): ForecastData {
  const baseGeneration = 120;
  const baseConsumption = 75;

  return {
    nextHour: {
      timeHorizon: "1h",
      expectedGeneration: baseGeneration * (0.9 + Math.random() * 0.2),
      expectedConsumption: baseConsumption * (0.95 + Math.random() * 0.1),
      confidenceInterval: {
        lower: baseGeneration * 0.8,
        upper: baseGeneration * 1.2,
      },
      keyDrivers: ["Solar irradiance forecast", "Historical patterns"],
    },
    next24Hours: {
      timeHorizon: "24h",
      expectedGeneration: baseGeneration * 0.6, // Average over 24h including night
      expectedConsumption: baseConsumption * 1.1,
      confidenceInterval: {
        lower: baseGeneration * 0.4,
        upper: baseGeneration * 0.8,
      },
      keyDrivers: [
        "Weather forecast",
        "Weekly demand pattern",
        "Seasonal adjustments",
      ],
    },
    nextWeek: {
      timeHorizon: "7d",
      expectedGeneration: baseGeneration * 0.55,
      expectedConsumption: baseConsumption * 1.05,
      confidenceInterval: {
        lower: baseGeneration * 0.35,
        upper: baseGeneration * 0.75,
      },
      keyDrivers: [
        "Long-range weather",
        "Seasonal trends",
        "Historical averages",
      ],
    },
    weatherAdjusted: true,
    forecastModel: "hybrid",
    confidenceScore: 75 + Math.random() * 20, // 75-95%
  };
}

/**
 * Enhancement #7: Generate performance benchmarking
 */
function generatePerformanceBenchmark(): PerformanceBenchmark {
  const capacityFactor = 18 + Math.random() * 7; // 18-25% typical for solar

  return {
    vsHistoricalBaseline: {
      metric: "capacity_factor",
      current: capacityFactor,
      baseline: 22,
      delta: capacityFactor - 22,
      deltaPercent: ((capacityFactor - 22) / 22) * 100,
    } as BaselineComparisonData,
    vsPeerAssets: {
      peerCount: 127,
      averagePerformance: 21.5,
      topPerformerGap: ((28 - capacityFactor) / 28) * 100, // % below best
      bottomPerformerGap: ((capacityFactor - 15) / 15) * 100, // % above worst
    },
    capacityFactor,
    availability: 95 + Math.random() * 4.5, // 95-99.5%
    performanceRatio: 75 + Math.random() * 15, // 75-90%
    efficiencyTrend:
      capacityFactor > 22
        ? "improving"
        : capacityFactor < 20
          ? "declining"
          : "stable",
    rankingPercentile: 60 + Math.random() * 30, // 60-90th percentile
  };
}

/**
 * Enhancement #8: Generate anomaly detection
 */
function generateAnomalyDetection(
  baseMetrics: Record<string, unknown>
): AnomalyDetection {
  const hasAnomaly = Math.random() < 0.15; // 15% chance
  const anomalies: Anomaly[] = [];
  const faultsPredicted: FaultPrediction[] = [];
  const earlyWarnings: EarlyWarning[] = [];

  if (hasAnomaly) {
    anomalies.push({
      anomalyId: `anom-${Date.now()}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      type: Math.random() > 0.5 ? "generation" : "efficiency",
      severity: Math.random() > 0.7 ? "major" : "moderate",
      description:
        "Generation output 2.3σ below expected for current conditions",
      expectedValue: 125,
      actualValue: 95,
      deviationSigma: 2.3,
      resolved: Math.random() > 0.3,
    });
  }

  // Predictive faults
  if (Math.random() < 0.1) {
    faultsPredicted.push({
      component: "inverter",
      faultType: "Capacitor degradation detected",
      probability: 35 + Math.random() * 30, // 35-65%
      estimatedTimeToFailure: 720 + Math.random() * 1440, // 30-90 days in hours
      recommendedAction: "Schedule preventive maintenance within 60 days",
    });
  }

  // Early warnings
  const batterySOC = (baseMetrics.batterySOC as number) || 75;
  if (batterySOC < 25) {
    earlyWarnings.push({
      warningType: "Low battery state of charge",
      urgency: batterySOC < 15 ? "high" : "medium",
      message: `Battery SOC at ${batterySOC.toFixed(1)}%, approaching minimum threshold`,
      threshold: 20,
      currentValue: batterySOC,
      timeToThreshold: (batterySOC - 15) / 2, // Hours at current discharge rate
    });
  }

  return {
    anomaliesDetected: anomalies.length > 0,
    anomalies,
    patternDeviationSigma: Math.random() * 1.5,
    faultsPredicted,
    earlyWarnings,
  };
}

/**
 * Enhancement #9: Generate trust metrics
 */
function generateTrustMetrics(dataAge: number): TrustMetrics {
  const sources = [
    "sensor:inverter-1",
    "sensor:meter-main",
    "oracle:weather-api",
  ];
  const freshnessDecay = calculateMockTrustDecay(dataAge);
  const confidence = 85 + Math.random() * 12; // 85-97%

  return {
    overallTrust: generateMockTrustMathematics(confidence, sources),
    sourceBreakdown: sources.map((source) => ({
      source,
      trustScore: 80 + Math.random() * 18, // 80-98
      lastUpdate: new Date(Date.now() - Math.random() * 10000).toISOString(),
      reliability: 92 + Math.random() * 7, // 92-99%
    })),
    freshnessDecay,
    multiSourceValidation: true,
    consensusStrength: 88 + Math.random() * 10, // 88-98%
    dataProvenance: [
      {
        dataPoint: "generation",
        sources: ["sensor:inverter-1", "sensor:meter-main"],
        consensusLevel: 95,
        collectionMethod: "Direct measurement",
      },
      {
        dataPoint: "irradiance",
        sources: ["sensor:pyranometer", "oracle:weather-api"],
        consensusLevel: 88,
        collectionMethod: "Sensor + API correlation",
      },
    ],
  };
}

/**
 * Enhancement #10: Generate cross-domain impact analysis
 */
function generateCrossDomainImpact(
  flowAnalysis: FlowAnalysis
): CrossDomainImpact {
  const revenueImpact =
    flowAnalysis.netGridFlow > 0 ? "significant" : "moderate";
  const operationalImpact =
    flowAnalysis.systemEfficiency < 90 ? "moderate" : "minimal";

  return {
    energyToFinancial: {
      affected: true,
      impactDescription: `${flowAnalysis.netGridFlow > 0 ? "Net export" : "Net import"} of ${Math.abs(flowAnalysis.netGridFlow).toFixed(1)} kW impacts revenue`,
      magnitude: revenueImpact,
      specificMetrics: {
        estimatedRevenue24h: Math.abs(flowAnalysis.netGridFlow) * 0.12 * 24, // $0.12/kWh avg
        pricingOpportunity: flowAnalysis.netGridFlow > 50 ? 15 : 5, // USD potential gain
      },
    },
    energyToOperational: {
      affected: flowAnalysis.systemEfficiency < 95,
      impactDescription: `System efficiency at ${flowAnalysis.systemEfficiency.toFixed(1)}% suggests ${flowAnalysis.totalLosses.toFixed(1)} kW losses`,
      magnitude: operationalImpact,
      specificMetrics: {
        lossesKW: flowAnalysis.totalLosses,
        efficiencyGap: 95 - flowAnalysis.systemEfficiency,
        maintenancePriority: flowAnalysis.systemEfficiency < 90 ? 8 : 3, // 0-10 scale
      },
    },
    energyToGovernance: {
      affected: false,
      impactDescription: "All operations within approved parameters",
      magnitude: "none",
      specificMetrics: {
        complianceScore: 98,
        policyAdherence: 100,
      },
    },
    overallImpactScore: 72 + Math.random() * 20, // 72-92
  };
}

/**
 * Enhancement #11: Generate energy balance validation
 */
function generateEnergyBalanceValidation(
  flowAnalysis: FlowAnalysis
): EnergyBalanceValidation {
  const totalInput = flowAnalysis.totalGeneration;
  const totalOutput =
    flowAnalysis.totalConsumption + Math.abs(flowAnalysis.netGridFlow);
  const accountedLosses = flowAnalysis.totalLosses;
  const unaccountedVariance = totalInput - totalOutput - accountedLosses;
  const balanceAccuracy =
    100 - (Math.abs(unaccountedVariance) / totalInput) * 100;

  let reconciliationStatus:
    | "perfect"
    | "acceptable"
    | "discrepancy"
    | "critical";
  if (balanceAccuracy >= 99) reconciliationStatus = "perfect";
  else if (balanceAccuracy >= 95) reconciliationStatus = "acceptable";
  else if (balanceAccuracy >= 90) reconciliationStatus = "discrepancy";
  else reconciliationStatus = "critical";

  return {
    conservationMet: Math.abs(unaccountedVariance) < totalInput * 0.05,
    totalInput,
    totalOutput,
    accountedLosses,
    unaccountedVariance,
    balanceAccuracy: Math.max(0, balanceAccuracy),
    reconciliationStatus,
  };
}

/**
 * Enhancement #12: Generate predictive maintenance
 */
function generatePredictiveMaintenance(
  batteryMetrics: BatteryHealthMetrics
): PredictiveMaintenance {
  const components: ComponentHealth[] = [
    {
      component: "solar_panel",
      healthScore: 92,
      healthGrade: "excellent",
      failureProbability30Days: 2,
      expectedLifespanDays: 7300, // 20 years
      lastMaintenance: new Date(
        Date.now() - 180 * 24 * 60 * 60 * 1000
      ).toISOString(),
      nextRecommendedMaintenance: new Date(
        Date.now() + 180 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
    {
      component: "inverter",
      healthScore: 85,
      healthGrade: "good",
      failureProbability30Days: 8,
      expectedLifespanDays: 3650, // 10 years
      lastMaintenance: new Date(
        Date.now() - 90 * 24 * 60 * 60 * 1000
      ).toISOString(),
      nextRecommendedMaintenance: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
    {
      component: "battery",
      healthScore: batteryMetrics.stateOfHealth,
      healthGrade: batteryMetrics.healthGrade,
      failureProbability30Days: batteryMetrics.stateOfHealth < 80 ? 15 : 5,
      expectedLifespanDays: batteryMetrics.estimatedLifespanYears * 365,
      lastMaintenance: new Date(
        Date.now() - 60 * 24 * 60 * 60 * 1000
      ).toISOString(),
      nextRecommendedMaintenance: new Date(
        Date.now() + 120 * 24 * 60 * 60 * 1000
      ).toISOString(),
    },
  ];

  const needsMaintenance = components.some(
    (c) => c.failureProbability30Days > 10 || c.healthScore < 75
  );
  let urgency: "routine" | "soon" | "urgent" | "emergency";
  if (components.some((c) => c.healthScore < 70)) urgency = "emergency";
  else if (components.some((c) => c.failureProbability30Days > 20))
    urgency = "urgent";
  else if (components.some((c) => c.failureProbability30Days > 10))
    urgency = "soon";
  else urgency = "routine";

  return {
    maintenanceNeeded: needsMaintenance,
    components,
    optimalServiceWindow: needsMaintenance
      ? {
          startTime: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          endTime: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(),
          reason: "Optimal weather window and low demand period",
          maintenanceType: urgency === "emergency" ? "emergency" : "predictive",
        }
      : null,
    estimatedDowntime: 4 + Math.random() * 4, // 4-8 hours
    costEstimate: 500 + Math.random() * 1500, // $500-2000
    urgency,
  };
}

/**
 * Enhancement #13: Generate historical comparison
 */
function generateHistoricalComparison(
  baselineType: BaselineComparison,
  currentMetrics: {
    generation: number;
    consumption: number;
    efficiency: number;
  }
): HistoricalComparison {
  if (baselineType === "none") {
    return {
      comparisonPeriod: "none",
      metrics: [],
      trendAnalysis: {
        direction: "stable",
        strength: 0,
        volatility: "low",
        cyclicity: "none",
      },
      seasonalityAdjusted: false,
    };
  }

  const baselineMultiplier =
    baselineType === "yesterday"
      ? 0.98
      : baselineType === "lastWeek"
        ? 0.95
        : 0.92;

  return {
    comparisonPeriod: baselineType,
    metrics: [
      {
        metric: "generation",
        current: currentMetrics.generation,
        baseline: currentMetrics.generation * baselineMultiplier,
        delta: currentMetrics.generation * (1 - baselineMultiplier),
        deltaPercent: (1 - baselineMultiplier) * 100,
      },
      {
        metric: "consumption",
        current: currentMetrics.consumption,
        baseline: currentMetrics.consumption * 1.02,
        delta: currentMetrics.consumption * -0.02,
        deltaPercent: -2,
      },
      {
        metric: "efficiency",
        current: currentMetrics.efficiency,
        baseline: currentMetrics.efficiency * 0.99,
        delta: currentMetrics.efficiency * 0.01,
        deltaPercent: 1,
      },
    ],
    trendAnalysis: {
      direction: Math.random() > 0.5 ? "improving" : "stable",
      strength: 60 + Math.random() * 30,
      volatility: "moderate",
      cyclicity: "daily",
    },
    seasonalityAdjusted: true,
  };
}

/**
 * Enhancement #14-22: Generate medium-value enhancements
 */
function generateEfficiencyMetrics(
  flowAnalysis: FlowAnalysis
): EfficiencyMetrics {
  return {
    batteryRoundTripEfficiency: 92 + Math.random() * 4, // 92-96%
    inverterEfficiency: 96 + Math.random() * 2, // 96-98%
    systemLosses:
      (flowAnalysis.totalLosses / flowAnalysis.totalGeneration) * 100,
    capacityUtilization: 65 + Math.random() * 25, // 65-90%
    lossesBreakdown: {
      conversion: flowAnalysis.totalLosses * 0.4,
      transmission: flowAnalysis.totalLosses * 0.15,
      storage: flowAnalysis.totalLosses * 0.35,
      thermal: flowAnalysis.totalLosses * 0.1,
    },
  };
}

function generateRevenueAttribution(
  flowAnalysis: FlowAnalysis
): RevenueAttribution {
  const solarRevenue = flowAnalysis.totalGeneration * 0.12 * 24; // $0.12/kWh
  const batteryRevenue = Math.abs(flowAnalysis.netGridFlow) * 0.15 * 24; // $0.15/kWh arbitrage
  const gridServicesRevenue = 50 + Math.random() * 50; // $50-100/day

  return {
    totalRevenue24h: solarRevenue + batteryRevenue + gridServicesRevenue,
    revenueBySource: [
      {
        source: "solar",
        energyMWh: (flowAnalysis.totalGeneration * 24) / 1000,
        revenueUSD: solarRevenue,
        averagePricePerMWh: 120,
      },
      {
        source: "battery",
        energyMWh: (Math.abs(flowAnalysis.netGridFlow) * 24) / 1000,
        revenueUSD: batteryRevenue,
        averagePricePerMWh: 150,
      },
      {
        source: "grid",
        energyMWh: 0,
        revenueUSD: gridServicesRevenue,
        averagePricePerMWh: 0,
      },
    ],
    timeOfUsePricing: {
      peakHoursRevenue: solarRevenue * 0.6,
      offPeakRevenue: solarRevenue * 0.2,
      shoulderRevenue: solarRevenue * 0.2,
      optimizationOpportunity: 25 + Math.random() * 50, // $25-75 potential
    },
    tradingRevenue: batteryRevenue,
    gridServicesRevenue,
  };
}

function generateWeatherIntegration(): WeatherIntegration {
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour <= 18;

  return {
    current: {
      condition: isDaytime ? "partly_cloudy" : "clear",
      solarIrradianceWm2: isDaytime ? 600 + Math.random() * 400 : 0,
      temperatureCelsius: 20 + Math.random() * 15,
      cloudCoverPercent: Math.random() * 40,
      windSpeedMs: 2 + Math.random() * 8,
    },
    solarCorrelation: 85 + Math.random() * 12, // 85-97%
    temperatureImpact: -0.5 * Math.random(), // -0.5 to 0% per °C above 25
    forecastAccuracy: 78 + Math.random() * 15, // 78-93%
    weatherAdjustedForecast: true,
  };
}

function generateLoadProfile(consumption: number): LoadProfile {
  return {
    currentLoad: consumption,
    loadCategories: [
      { category: "baseload", loadKW: consumption * 0.4, percentage: 40 },
      { category: "peak", loadKW: consumption * 0.35, percentage: 35 },
      { category: "intermittent", loadKW: consumption * 0.2, percentage: 20 },
      { category: "reactive", loadKW: consumption * 0.05, percentage: 5 },
    ],
    loadFactor: 0.65 + Math.random() * 0.2, // 0.65-0.85
    diversityFactor: 1.1 + Math.random() * 0.3,
    peakDemand24h: consumption * 1.5,
    baseload: consumption * 0.4,
  };
}

function generateBatteryOptimization(
  batteryMetrics: BatteryHealthMetrics
): BatteryOptimization {
  const currentDOD = 100 - batteryMetrics.stateOfCharge;

  return {
    optimalChargeSchedule: [
      {
        startTime: new Date(Date.now() + 2 * 3600000).toISOString(),
        endTime: new Date(Date.now() + 5 * 3600000).toISOString(),
        targetSOC: 85,
        reason: "Off-peak pricing + high solar forecast tomorrow",
        expectedCostSavings: 15 + Math.random() * 20,
      },
    ],
    currentDepthOfDischarge: currentDOD,
    recommendedDOD: batteryMetrics.healthGrade === "excellent" ? 80 : 70,
    cyclingStrategy:
      batteryMetrics.stateOfHealth > 90 ? "balanced" : "conservative",
    arbitrageOpportunity: 30 + Math.random() * 40, // $30-70
  };
}

function generateGridServices(): GridServices {
  return {
    servicesActive: [
      {
        serviceType: "frequency_regulation",
        active: true,
        capacityProvided: 50,
        revenuePerMWh: 25,
      },
      {
        serviceType: "voltage_support",
        active: true,
        capacityProvided: 30,
        revenuePerMWh: 15,
      },
      {
        serviceType: "demand_response",
        active: false,
        capacityProvided: 100,
        revenuePerMWh: 50,
      },
      {
        serviceType: "reactive_power",
        active: true,
        capacityProvided: 20,
        revenuePerMWh: 10,
      },
    ],
    frequencyRegulationCapacity: 50,
    demandResponseCapability: 100,
    ancillaryServicesRevenue: 75 + Math.random() * 50, // $75-125/day
    participationStatus: "active",
  };
}

function generateCarbonAccounting(generation: number): CarbonAccounting {
  const co2PerMWh = 0.5; // kg CO2 per MWh for grid average
  const co2Avoided = ((generation * 24) / 1000) * co2PerMWh;

  return {
    co2AvoidedKg: co2Avoided,
    renewablePercentage: 95 + Math.random() * 5, // 95-100%
    gridCarbonIntensity: co2PerMWh,
    sustainabilityScore: 88 + Math.random() * 10, // 88-98
    equivalentMetrics: {
      treesPlanted: co2Avoided / 20, // ~20kg CO2 per tree per year
      milesDriven: co2Avoided / 0.404, // ~0.404 kg CO2 per mile
      homesPowered: (generation * 24) / (30 * 24), // Avg home uses 30 kWh/day
    },
  };
}

function generateAlerts(
  batteryMetrics: BatteryHealthMetrics,
  constraintValidation: ConstraintValidation,
  anomalies: AnomalyDetection
): AlertGeneration[] {
  const alerts: AlertGeneration[] = [];

  // Battery alerts
  if (
    batteryMetrics.currentSOCStatus === "critical_low" ||
    batteryMetrics.currentSOCStatus === "critical_high"
  ) {
    alerts.push({
      alertId: `alert-battery-${Date.now()}`,
      alertType: "threshold",
      urgency: "high",
      message: `Battery SOC ${batteryMetrics.currentSOCStatus === "critical_low" ? "critically low" : "critically high"} at ${batteryMetrics.stateOfCharge.toFixed(1)}%`,
      timestamp: new Date().toISOString(),
      stakeholder: ["operations", "maintenance"],
      actionable: true,
      recommendedAction:
        batteryMetrics.currentSOCStatus === "critical_low"
          ? "Reduce discharge rate or charge battery"
          : "Reduce charge rate",
      acknowledged: false,
    });
  }

  // Constraint violation alerts
  constraintValidation.violations.forEach((violation, idx) => {
    alerts.push({
      alertId: `alert-constraint-${Date.now()}-${idx}`,
      alertType: "threshold",
      urgency:
        violation.severity === "critical"
          ? "critical"
          : violation.severity === "major"
            ? "high"
            : "medium",
      message: `${violation.constraintType} violation: ${violation.actualValue.toFixed(1)} exceeds threshold of ${violation.threshold}`,
      timestamp: new Date().toISOString(),
      stakeholder: ["operations", "governance"],
      actionable: true,
      recommendedAction: violation.action,
      acknowledged: false,
    });
  });

  // Anomaly alerts
  if (anomalies.anomaliesDetected) {
    alerts.push({
      alertId: `alert-anomaly-${Date.now()}`,
      alertType: "anomaly",
      urgency: "medium",
      message: `${anomalies.anomalies.length} anomalies detected in recent operations`,
      timestamp: new Date().toISOString(),
      stakeholder: ["operations", "maintenance"],
      actionable: true,
      recommendedAction: "Review anomaly details and initiate diagnostics",
      acknowledged: false,
    });
  }

  return alerts;
}

function generateDataQualityMonitoring(): DataQualityMonitoring {
  return {
    overallQuality: 92 + Math.random() * 6, // 92-98
    sensorHealth: [
      {
        sensorId: "inverter-1",
        sensorType: "inverter",
        healthStatus: "healthy",
        lastCalibration: new Date(
          Date.now() - 90 * 24 * 60 * 60 * 1000
        ).toISOString(),
        accuracy: 98.5,
      },
      {
        sensorId: "meter-main",
        sensorType: "meter",
        healthStatus: "healthy",
        lastCalibration: new Date(
          Date.now() - 365 * 24 * 60 * 60 * 1000
        ).toISOString(),
        accuracy: 99.2,
      },
      {
        sensorId: "battery-monitor",
        sensorType: "battery",
        healthStatus: "healthy",
        lastCalibration: new Date(
          Date.now() - 180 * 24 * 60 * 60 * 1000
        ).toISOString(),
        accuracy: 97.8,
      },
    ],
    dataGaps: [],
    outliers: [],
    validationStatus: "validated",
  };
}

function generateVisualizationData(
  flowAnalysis: FlowAnalysis,
  batteryMetrics: BatteryHealthMetrics,
  gridMetrics: GridInteractionMetrics
): VisualizationDataPrep {
  // Generate 24 hours of time series data
  const timeSeries: TimeSeriesData[] = Array.from({ length: 24 }, (_, i) => {
    const timestamp = new Date(Date.now() - (23 - i) * 3600000).toISOString();
    const hour = i;
    const solarFactor =
      hour >= 6 && hour <= 18 ? Math.sin(((hour - 6) * Math.PI) / 12) : 0;

    return {
      timestamp,
      generation: 50 + solarFactor * 100,
      consumption: 50 + Math.sin((hour * Math.PI) / 12) * 30,
      batterySOC: 50 + Math.sin((hour * Math.PI) / 6) * 35,
      gridFlow:
        50 + solarFactor * 100 - (50 + Math.sin((hour * Math.PI) / 12) * 30),
    };
  });

  // Battery curve for last 6 hours
  const batteryCurve: BatteryCurveData[] = Array.from(
    { length: 36 },
    (_, i) => ({
      timestamp: new Date(Date.now() - (35 - i) * 600000).toISOString(), // 10-min intervals
      soc: batteryMetrics.stateOfCharge + Math.sin(i / 5) * 10,
      power: Math.sin(i / 3) * 50, // kW charging/discharging
      temperature: batteryMetrics.temperatureCelsius + Math.random() * 2,
    })
  );

  return {
    timeSeries,
    flowDiagram: {
      nodes: [
        {
          id: "solar",
          label: "Solar Array",
          value: flowAnalysis.totalGeneration,
        },
        {
          id: "battery",
          label: "Battery",
          value: batteryMetrics.stateOfCharge,
        },
        {
          id: "consumption",
          label: "Load",
          value: flowAnalysis.totalConsumption,
        },
        {
          id: "grid",
          label: "Grid",
          value: Math.abs(flowAnalysis.netGridFlow),
        },
      ],
      edges: flowAnalysis.flows.map((f) => ({
        from: f.flowType.split("_to_")[0],
        to: f.flowType.split("_to_")[1],
        value: f.magnitude,
      })),
    },
    batteryCurve,
    gridInteractionPlot: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      frequency: gridMetrics.frequencyHz + (Math.random() - 0.5) * 0.05,
      voltage: 420 + Math.sin((i * Math.PI) / 12) * 10,
      powerFactor: gridMetrics.powerFactor + (Math.random() - 0.5) * 0.02,
    })),
    heatmap: {
      hourOfDay: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
      value: flowAnalysis.totalGeneration,
      metric: "generation",
    },
  };
}

// ============================================================================
// PHASE 10 ENHANCEMENT UTILITY FUNCTIONS (25 additional features)
// ============================================================================

/**
 * Enhancement #33: Generate agent decision links
 */
function generateAgentDecisionLinks(): AgentDecisionLink[] {
  const agents: AgentPersonaType[] = ["operations", "markets"];
  return agents.map((agent, i) => ({
    decisionId: `decision_${Date.now()}_${i}`,
    agentPersona: agent,
    triggeredAction:
      agent === "operations"
        ? "battery_discharge_to_grid"
        : "execute_grid_arbitrage",
    timestamp: new Date(Date.now() - i * 1800000).toISOString(),
    energyImpactKw: agent === "operations" ? 45 : 32,
    confidenceScore: 88 + Math.random() * 10,
    reasoning: [
      `Grid price ${agent === "markets" ? "high" : "stable"} at ${88 + Math.random() * 12} USD/MWh`,
      `Battery SOC at ${75 + Math.random() * 15}%, sufficient for discharge`,
      `${agent === "operations" ? "Load demand below forecast" : "Arbitrage opportunity detected"}`,
    ],
  }));
}

/**
 * Enhancement #34: Generate agent state context
 */
function generateAgentStates(): AgentStateContext[] {
  const agents: AgentPersonaType[] = [
    "operations",
    "markets",
    "maintenance",
    "governance",
  ];
  return agents.map((agent) => ({
    agentPersona: agent,
    cognitiveLoad: Math.random() * 100,
    activeDecisions: Math.floor(Math.random() * 5) + 1,
    queueDepth: Math.floor(Math.random() * 10),
    resourceUtilization: {
      cpu: 20 + Math.random() * 60,
      memory: 30 + Math.random() * 50,
      processingLatencyMs: 50 + Math.random() * 150,
    },
    attentionFocus:
      agent === "operations"
        ? ["battery_optimization", "load_balancing"]
        : agent === "markets"
          ? ["price_forecasting", "arbitrage"]
          : agent === "maintenance"
            ? ["component_health", "predictive_alerts"]
            : ["compliance_monitoring", "safety_validation"],
  }));
}

/**
 * Enhancement #35: Generate multi-agent coordination
 */
function generateMultiAgentCoordination(): MultiAgentCoordination[] {
  return [
    {
      coordinationId: `coord_${Date.now()}`,
      involvedAgents: ["operations", "markets"],
      coordinationType: "energy_arbitrage",
      initiatedBy: "markets",
      consensusReached: true,
      coordinationStartTime: new Date(Date.now() - 3600000).toISOString(),
      coordinationEndTime: new Date(Date.now() - 3000000).toISOString(),
      energyAction: "Discharge 50kW to grid during peak pricing",
      estimatedBenefit: 45 + Math.random() * 30,
    },
  ];
}

/**
 * Enhancement #36: Generate agent consensus tracking
 */
function generateAgentConsensus(): AgentConsensus[] {
  return [
    {
      topic: `battery_charge_schedule_${new Date().toISOString().split("T")[0]}`,
      proposedStrategy: "Charge from 2am-5am, discharge 5pm-8pm",
      agentVotes: [
        {
          agentPersona: "operations",
          vote: "approve",
          confidence: 92,
          reasoning:
            "Aligns with load forecasts and grid stability requirements",
        },
        {
          agentPersona: "markets",
          vote: "approve",
          confidence: 88,
          reasoning: "Maximizes arbitrage opportunity with price differential",
        },
        {
          agentPersona: "maintenance",
          vote: "approve",
          confidence: 85,
          reasoning: "Battery health sufficient, within thermal limits",
        },
      ],
      consensusStrength: 88,
      finalDecision: "approved",
      timestamp: new Date().toISOString(),
    },
  ];
}

/**
 * Enhancement #37: Generate decision explanations
 */
function generateDecisionExplanations(): DecisionExplanation[] {
  return [
    {
      decisionId: `decision_${Date.now()}`,
      decisionType: "battery_discharge",
      agentPersona: "operations",
      summary:
        "Discharge battery to meet evening peak demand and capitalize on high grid prices",
      reasoningChain: [
        {
          step: 1,
          reasoning: "Detected evening peak demand approaching (5:00 PM)",
          supportingData: { forecastedLoadKw: 125, currentLoadKw: 98 },
        },
        {
          step: 2,
          reasoning: "Grid price elevated at $0.18/kWh (vs avg $0.12/kWh)",
          supportingData: { gridPriceUsdPerKwh: 0.18, avgPrice: 0.12 },
        },
        {
          step: 3,
          reasoning: "Battery SOC at 87%, sufficient for 2-hour discharge",
          supportingData: { currentSOC: 87, minSOC: 20, dischargeCapacity: 50 },
        },
        {
          step: 4,
          reasoning: "Solar generation declining, grid export optimal",
          supportingData: { solarKw: 12, decliningRate: -8 },
        },
      ],
      constraints: [
        "Maintain SOC above 20%",
        "Discharge rate not to exceed 50kW",
        "Grid voltage within 5% tolerance",
      ],
      alternatives: [
        "Wait for higher price spike (rejected: may not occur)",
        "Partial discharge only (rejected: underutilizes capacity)",
      ],
      selectedRationale:
        "Balanced approach maximizes revenue while maintaining reserve capacity",
      confidenceScore: 91,
    },
  ];
}

/**
 * Enhancement #38: Generate agent workload metrics
 */
function generateAgentWorkloadMetrics(): AgentWorkloadMetrics[] {
  const agents: AgentPersonaType[] = [
    "operations",
    "markets",
    "maintenance",
    "governance",
  ];
  return agents.map((agent) => ({
    agentPersona: agent,
    timeRange: "last_1h",
    totalDecisions: Math.floor(Math.random() * 20) + 10,
    energyRelatedDecisions: Math.floor(Math.random() * 15) + 5,
    avgProcessingTimeMs: 120 + Math.random() * 80,
    peakProcessingTimeMs: 350 + Math.random() * 150,
    decisionsPerHour:
      agent === "operations" ? 18 : agent === "markets" ? 12 : 6,
    errorRate: Math.random() * 2,
    currentQueueDepth: Math.floor(Math.random() * 5),
  }));
}

/**
 * Enhancement #39: Generate learning context
 */
function generateLearningContext(): LearningContext[] {
  return [
    {
      agentPersona: "operations",
      strategyType: "battery_optimization",
      initialPerformance: 72,
      currentPerformance: 89,
      improvementRate: 2.3,
      adaptationsMade: [
        {
          timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
          change: "Adjusted discharge timing to align with peak pricing",
          trigger: "Consistent revenue underperformance vs forecast",
          outcomeImpact: 8.5,
        },
        {
          timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
          change: "Increased SOC reserve buffer during weather uncertainty",
          trigger: "Forecast accuracy declined during storm season",
          outcomeImpact: 5.2,
        },
      ],
      learningVelocity: 78,
    },
  ];
}

/**
 * Enhancement #40: Generate agent authority scope
 */
function generateAgentAuthority(): AgentAuthority[] {
  const agents: AgentPersonaType[] = [
    "operations",
    "markets",
    "maintenance",
    "governance",
  ];
  return agents.map((agent) => ({
    agentPersona: agent,
    autonomousDecisions:
      agent === "operations"
        ? [
            "battery_charge_discharge",
            "load_balancing",
            "minor_grid_interaction",
          ]
        : agent === "markets"
          ? ["small_trades", "price_monitoring", "arbitrage_analysis"]
          : agent === "maintenance"
            ? ["schedule_inspection", "monitor_health", "predictive_alerts"]
            : ["policy_enforcement", "compliance_monitoring"],
    requiresApproval:
      agent === "operations"
        ? ["emergency_shutdown", "major_grid_export", "battery_replacement"]
        : agent === "markets"
          ? ["large_trades_over_1000", "new_trading_strategies"]
          : agent === "maintenance"
            ? ["component_replacement", "emergency_repair"]
            : ["regulation_changes", "safety_overrides"],
    energyLimits: {
      maxDischargeKw: agent === "operations" ? 50 : 20,
      maxChargeKw: agent === "operations" ? 50 : 20,
      maxGridExportKw: agent === "operations" ? 75 : 0,
      maxGridImportKw: agent === "operations" ? 100 : 0,
    },
    financialLimits: {
      maxTransactionUsd: agent === "markets" ? 1000 : 100,
      dailyLimitUsd: agent === "markets" ? 5000 : 500,
    },
    overrideAuthority: agent === "governance",
    escalationPath:
      agent === "governance"
        ? ["human_operator"]
        : ["governance", "human_operator"],
  }));
}

/**
 * Enhancement #41: Generate explainability levels
 */
function generateExplainabilityLevels(): ExplainabilityLevels {
  return {
    beginner: {
      summary:
        "The solar farm is generating clean energy and storing excess in batteries for later use.",
      keyPoints: [
        "Solar panels are producing electricity from sunlight",
        "Extra energy is being saved in batteries",
        "We sell energy to the grid when prices are good",
        "The system is running smoothly and efficiently",
      ],
      analogy:
        "Think of it like a water tank: solar panels fill it during the day, and we use the stored water (energy) when needed.",
    },
    intermediate: {
      summary:
        "Operations Agent is managing battery dispatch to maximize revenue while maintaining grid stability and reserve capacity.",
      detailedContext: [
        "Current solar generation: 78kW, declining as sun sets",
        "Battery at 87% SOC, capacity for 2 hours of peak discharge",
        "Grid price elevated at $0.18/kWh (50% above average)",
        "Evening demand forecast shows peak load in 1 hour",
        "Weather forecast: clear skies tomorrow, expect high solar generation",
      ],
      dataPoints: {
        generationKw: 78,
        batterySOC: 87,
        gridPriceUsdPerKwh: 0.18,
        forecastedPeakKw: 125,
      },
      assumptions: [
        "Grid prices will remain elevated for 2-3 hours",
        "Weather forecast accuracy: 85%",
        "Battery degradation within acceptable limits",
      ],
    },
    expert: {
      summary:
        "Multi-objective optimization balancing revenue maximization, grid services, and asset longevity using hybrid forecasting model.",
      technicalDetails: [
        "Hybrid forecast model: LSTM neural network (60%) + ARIMA time series (40%)",
        "Revenue optimization: Dynamic programming with 15-minute resolution",
        "Constraint satisfaction: Mixed-integer linear programming (MILP)",
        "Battery degradation model: Rainflow cycle counting with temperature compensation",
        "Grid interaction: Droop control with 4% frequency regulation band",
      ],
      algorithmicApproach:
        "Receding horizon control with 24-hour prediction window, re-optimized every 5 minutes based on updated forecasts and grid conditions.",
      mathematicalModel:
        "max Σ(P_discharge * price - P_charge * price - degradation_cost) subject to SOC_min ≤ SOC ≤ SOC_max, |P| ≤ P_max, grid constraints",
      uncertainties: [
        "Weather forecast error: ±12% RMSE",
        "Load forecast error: ±8% RMSE",
        "Price forecast error: ±15% RMSE",
        "Battery capacity fade: 2-3% annually",
      ],
      limitationsAndCaveats: [
        "Model does not account for extreme weather events (>3 sigma)",
        "Grid curtailment events may override optimization",
        "Battery thermal model simplified (1D heat transfer)",
      ],
    },
  };
}

/**
 * Enhancement #42: Generate confidence breakdown
 */
function generateConfidenceBreakdown(): ConfidenceBreakdown {
  return {
    totalConfidence: 87,
    factors: [
      {
        factorType: "weather",
        weight: 30,
        confidence: 92,
        reasoning:
          "Clear weather forecast with 85% historical accuracy for this region",
      },
      {
        factorType: "historical",
        weight: 25,
        confidence: 88,
        reasoning:
          "3 years of historical data shows consistent pattern for this time/season",
      },
      {
        factorType: "model",
        weight: 25,
        confidence: 85,
        reasoning: "Hybrid LSTM+ARIMA model with 12% RMSE on validation set",
      },
      {
        factorType: "context",
        weight: 20,
        confidence: 80,
        reasoning: "Grid conditions stable, no major events forecasted",
      },
    ],
    uncertaintyBound: {
      lower: 75,
      upper: 95,
    },
    sensitivityAnalysis: [
      "Weather factor most critical: 15% change impacts confidence by 4.5 points",
      "Historical data robustness: stable across seasons",
      "Model uncertainty dominates during transition periods (dawn/dusk)",
    ],
  };
}

/**
 * Enhancement #43: Generate alternative actions
 */
function generateAlternativeActions(): AlternativeAction[] {
  return [
    {
      actionId: "alt_1",
      actionDescription: "Wait for higher price spike before discharging",
      estimatedOutcome: {
        energyKwh: 45,
        revenueUsd: 9.5,
        efficiency: 94,
        riskLevel: 65,
      },
      rejectionReason:
        "Price spike may not materialize, opportunity cost too high",
      rejectionScore: 72,
      wouldReconsiderIf: [
        "Price forecast shows >90% probability of spike",
        "SOC exceeds 95% (urgency to discharge)",
      ],
    },
    {
      actionId: "alt_2",
      actionDescription: "Partial discharge (25kW instead of 50kW)",
      estimatedOutcome: {
        energyKwh: 22.5,
        revenueUsd: 4.2,
        efficiency: 95,
        riskLevel: 30,
      },
      rejectionReason:
        "Conservative approach underutilizes capacity and revenue potential",
      rejectionScore: 58,
      wouldReconsiderIf: [
        "Battery health degrades below 85%",
        "High uncertainty in demand forecast",
      ],
    },
  ];
}

/**
 * Enhancement #44: Generate decision prerequisites
 */
function generateDecisionPrerequisites(): DecisionPrerequisites[] {
  return [
    {
      decisionType: "battery_discharge",
      requiredConditions: [
        {
          condition: "Battery SOC above minimum threshold",
          currentValue: 87,
          requiredValue: 20,
          satisfied: true,
          criticality: "required",
        },
        {
          condition: "Grid voltage within tolerance",
          currentValue: 418,
          requiredValue: "400-440V",
          satisfied: true,
          criticality: "required",
        },
        {
          condition: "Battery temperature within safe range",
          currentValue: 28,
          requiredValue: "10-40°C",
          satisfied: true,
          criticality: "required",
        },
        {
          condition: "Grid frequency synchronized",
          currentValue: 60.02,
          requiredValue: "59.9-60.1 Hz",
          satisfied: true,
          criticality: "required",
        },
        {
          condition: "Price above average (for revenue optimization)",
          currentValue: 0.18,
          requiredValue: ">0.12",
          satisfied: true,
          criticality: "recommended",
        },
      ],
      allRequiredMet: true,
      recommendedMet: 100,
      warnings: [],
    },
  ];
}

/**
 * Enhancement #45: Generate counterfactual analyses
 */
function generateCounterfactualAnalyses(): CounterfactualAnalysis[] {
  return [
    {
      scenario: "What if we had charged battery at 2am instead of 3am?",
      actualOutcome: {
        energyKwh: 45,
        costUsd: 4.8,
        efficiency: 93,
      },
      counterfactualOutcome: {
        energyKwh: 45,
        costUsd: 4.2,
        efficiency: 93.5,
      },
      delta: {
        energyKwhDiff: 0,
        costUsdDiff: -0.6,
        efficiencyDiff: 0.5,
      },
      probability: 85,
      keyDifferences: [
        "Grid price $0.02/kWh lower at 2am",
        "Lower grid demand would improve charge efficiency slightly",
        "Minimal impact on overall strategy",
      ],
    },
  ];
}

/**
 * Enhancement #46: Generate decision quality scores
 */
function generateDecisionQuality(): DecisionQuality[] {
  return [
    {
      decisionId: `decision_${Date.now() - 3600000}`,
      decisionType: "battery_discharge",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      qualityScore: 88,
      scoringFactors: {
        accuracyScore: 92,
        efficiencyScore: 87,
        timeliness: 90,
        riskManagement: 85,
        complianceScore: 95,
      },
      outcomeStatus: "success",
      lessonsLearned: [
        "Discharge timing was optimal, captured peak pricing",
        "SOC management effective, maintained 25% reserve",
        "Grid interaction smooth, no voltage/frequency issues",
      ],
    },
  ];
}

/**
 * Enhancement #47: Generate outcome tracking
 */
function generateOutcomeTracking(): OutcomeTracking[] {
  return [
    {
      decisionId: `decision_${Date.now() - 3600000}`,
      predicted: {
        generationKwh: 78,
        consumptionKwh: 45,
        revenueUsd: 8.5,
        efficiency: 93,
        batterySOCEnd: 62,
      },
      actual: {
        generationKwh: 75,
        consumptionKwh: 47,
        revenueUsd: 8.2,
        efficiency: 91.5,
        batterySOCEnd: 60,
      },
      variance: {
        generationError: -3.8,
        consumptionError: 4.4,
        revenueError: -3.5,
        efficiencyError: -1.6,
        batterySOCError: -3.2,
      },
      rootCauseAnalysis: [
        "Generation slightly lower due to cloud cover in final hour",
        "Consumption higher than forecast, likely HVAC demand spike",
        "Overall performance within acceptable variance bounds",
      ],
      correctionsMade: [
        "Updated weather correlation model with recent data",
        "Increased consumption forecast buffer by 5% for this time period",
      ],
    },
  ];
}

/**
 * Enhancement #48: Generate decision chains
 */
function generateDecisionChains(): DecisionChain[] {
  return [
    {
      chainId: `chain_${Date.now()}`,
      trigger: {
        domain: "energy",
        event: "High grid price detected ($0.18/kWh)",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      propagation: [
        {
          step: 1,
          domain: "energy",
          decision: "Initiate battery discharge analysis",
          agentPersona: "operations",
          timestamp: new Date(Date.now() - 7000000).toISOString(),
          impactMagnitude: 75,
        },
        {
          step: 2,
          domain: "financial",
          decision: "Calculate revenue optimization strategy",
          agentPersona: "markets",
          timestamp: new Date(Date.now() - 6800000).toISOString(),
          impactMagnitude: 85,
        },
        {
          step: 3,
          domain: "operational",
          decision: "Validate battery health and grid sync",
          agentPersona: "operations",
          timestamp: new Date(Date.now() - 6600000).toISOString(),
          impactMagnitude: 65,
        },
        {
          step: 4,
          domain: "governance",
          decision: "Approve discharge within safety constraints",
          agentPersona: "governance",
          timestamp: new Date(Date.now() - 6400000).toISOString(),
          impactMagnitude: 55,
        },
      ],
      totalImpact: {
        energyKwh: 50,
        financialUsd: 9.2,
        operationalChanges: 3,
        governanceActions: 1,
      },
      chainComplete: true,
      chainDurationMs: 800000,
    },
  ];
}

/**
 * Enhancement #49: Generate decision velocity metrics
 */
function generateDecisionVelocity(): DecisionVelocity {
  return {
    timeRange: "last_1h",
    decisionsPerHour: 18,
    decisionsPerMinute: 0.3,
    burstDetected: false,
    burstThreshold: 2.0,
    trend: "stable",
    peakVelocityTime: new Date(Date.now() - 1800000).toISOString(),
    peakVelocityValue: 24,
    averageGapBetweenDecisionsMs: 200000,
  };
}

/**
 * Enhancement #50: Generate reversal history
 */
function generateReversalHistory(): ReversalHistory[] {
  return [
    {
      reversalId: `reversal_${Date.now() - 86400000}`,
      originalDecisionId: `decision_${Date.now() - 90000000}`,
      originalDecision: "Export 75kW to grid",
      reversalReason: "constraint_violation",
      reversalAuthority: "safety_system",
      reversalTimestamp: new Date(Date.now() - 86400000).toISOString(),
      timeSinceOriginalMs: 3600000,
      impactOfReversal: {
        energyKwh: -12,
        costUsd: -2.5,
        operationalDisruption: 35,
      },
      correctiveActions: [
        "Reduced export to 50kW to stay within grid voltage tolerance",
        "Updated constraint validation thresholds",
        "Notified grid operator of temporary limit",
      ],
    },
  ];
}

/**
 * Enhancement #51: Generate provenance chains
 */
function generateProvenanceChains(): ProvenanceChain[] {
  const now = Date.now();
  return [
    {
      dataPoint: "solar_generation_kw",
      chain: [
        {
          step: "ingestion",
          timestamp: new Date(now - 1000).toISOString(),
          actor: "inverter_telemetry_system",
          action: "Read AC power output from inverter modbus register",
          inputHash: undefined,
          outputHash: "0x42a7f...",
          transformations: ["raw_register_value_to_watts"],
          validations: ["range_check_0_to_100kw", "rate_of_change_limit"],
        },
        {
          step: "processing",
          timestamp: new Date(now - 800).toISOString(),
          actor: "data_pipeline",
          action: "Aggregate 1-second samples to 1-minute average",
          inputHash: "0x42a7f...",
          outputHash: "0x8b3c9...",
          transformations: ["moving_average_60s", "outlier_removal"],
          validations: ["statistical_consistency", "monotonicity_check"],
        },
        {
          step: "analysis",
          timestamp: new Date(now - 600).toISOString(),
          actor: "analytics_engine",
          action: "Calculate efficiency and compare to forecast",
          inputHash: "0x8b3c9...",
          outputHash: "0xd4e2a...",
          transformations: ["efficiency_calculation", "forecast_comparison"],
          validations: ["confidence_interval_check", "historical_correlation"],
        },
        {
          step: "decision",
          timestamp: new Date(now - 400).toISOString(),
          actor: "operations_agent",
          action: "Use generation data in battery dispatch optimization",
          inputHash: "0xd4e2a...",
          outputHash: "0xf7b8c...",
          transformations: ["optimization_model_input"],
          validations: ["constraint_satisfaction", "safety_bounds"],
        },
      ],
      totalLatencyMs: 600,
      integrityVerified: true,
      auditTrail: "/audit/provenance/solar_generation_20241010_120000",
    },
  ];
}

/**
 * Enhancement #52: Generate compliance scoring
 */
function generateComplianceScoring(): ComplianceScoring {
  return {
    overallScore: 97,
    domainScores: [
      {
        domain: "safety",
        score: 98,
        requirements: [
          {
            requirement: "UL 1741 - Grid interconnection safety",
            status: "compliant",
            evidence: "Anti-islanding tested 2024-09-15, passed",
          },
          {
            requirement: "IEEE 1547 - Voltage and frequency ride-through",
            status: "compliant",
            evidence: "Continuous monitoring shows 100% compliance",
          },
        ],
        lastAudit: "2024-09-15",
      },
      {
        domain: "financial",
        score: 95,
        requirements: [
          {
            requirement: "SEC - Token holder reporting",
            status: "compliant",
            evidence: "Quarterly reports filed on time",
          },
          {
            requirement: "Revenue distribution accuracy",
            status: "compliant",
            evidence: "Audit shows 99.8% accuracy in distributions",
          },
        ],
        lastAudit: "2024-09-01",
      },
      {
        domain: "operational",
        score: 100,
        requirements: [
          {
            requirement: "Uptime SLA (99.5%)",
            status: "compliant",
            evidence: "Current uptime: 99.7% over last 90 days",
          },
          {
            requirement: "Maintenance schedule adherence",
            status: "compliant",
            evidence: "100% of scheduled maintenance completed on time",
          },
        ],
        lastAudit: "2024-10-01",
      },
      {
        domain: "governance",
        score: 97,
        requirements: [
          {
            requirement: "Decision transparency and logging",
            status: "compliant",
            evidence: "100% of agent decisions logged with reasoning",
          },
          {
            requirement: "Human override capability",
            status: "compliant",
            evidence: "Override tested monthly, <2s response time",
          },
        ],
        lastAudit: "2024-10-05",
      },
    ],
    violations: [],
    certifications: ["UL 1741", "IEEE 1547", "IEC 62109", "ISO 50001"],
  };
}

/**
 * Enhancement #53: Generate user impact estimation
 */
function generateUserImpactEstimation(): UserImpactEstimation[] {
  return [
    {
      impactId: `impact_${Date.now()}`,
      energyChange: "Increased battery discharge during peak pricing",
      affectedStakeholders: [
        {
          stakeholderType: "token_holder",
          estimatedCount: 347,
          impactType: "positive",
          impactMagnitude: 75,
        },
        {
          stakeholderType: "operator",
          estimatedCount: 2,
          impactType: "neutral",
          impactMagnitude: 15,
        },
        {
          stakeholderType: "grid_operator",
          estimatedCount: 1,
          impactType: "positive",
          impactMagnitude: 45,
        },
      ],
      benefits: [
        {
          stakeholderType: "token_holder",
          benefitType: "revenue_increase",
          quantifiedValue: 9.2,
          qualitativeDescription:
            "Increased revenue distribution by $0.027 per token for this period",
        },
        {
          stakeholderType: "grid_operator",
          benefitType: "grid_stability",
          quantifiedValue: 50,
          qualitativeDescription:
            "Provided 50kW of grid support during peak demand",
        },
      ],
      risks: [
        {
          riskType: "battery_degradation",
          probability: 25,
          impact: 20,
          mitigation:
            "Cycling within manufacturer specs, <0.01% additional degradation",
        },
      ],
      netBenefit: 82,
    },
  ];
}

/**
 * Enhancement #54: Generate rollback capability
 */
function generateRollbackCapability(): RollbackCapability[] {
  return [
    {
      decisionId: `decision_${Date.now()}`,
      canRollback: true,
      complexity: "simple",
      estimatedTimeMinutes: 5,
      requiredActions: [
        "Stop battery discharge command",
        "Return to standby mode",
        "Re-synchronize with grid",
      ],
      risks: [
        "Brief interruption in grid export (~30 seconds)",
        "Potential revenue loss from stopping discharge early",
      ],
      dependencies: ["battery_management_system", "grid_inverter"],
      dataRecovery: {
        possible: true,
        method: "Resume from last known good state in battery BMS",
        dataLoss: "none",
      },
      approvalRequired: false,
    },
  ];
}

/**
 * Enhancement #55: Generate query profile
 */
function generateQueryProfile(searchParams: URLSearchParams): QueryProfile {
  const signature = Array.from(searchParams.entries())
    .sort()
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  return {
    querySignature: signature || "default",
    executionCount: Math.floor(Math.random() * 100) + 1,
    avgExecutionTimeMs: 45 + Math.random() * 55,
    lastExecuted: new Date().toISOString(),
    optimizationSuggestions: [
      signature.includes("timeRange=7d")
        ? "Consider using aggregation=1h for 7-day queries to reduce data points"
        : "Query is well-optimized",
      !signature.includes("metrics=")
        ? "Specify metrics parameter to reduce payload size"
        : "Metrics filtering applied efficiently",
    ],
    commonPatterns: [
      "24h timeRange with standard format is most common",
      "Forecasts typically included in 80% of queries",
    ],
    performanceRating:
      signature.includes("aggregation") && signature.includes("metrics")
        ? "excellent"
        : "good",
  };
}

/**
 * Enhancement #56: Generate response compression metadata
 */
function generateResponseCompression(
  acceptEncoding: string | null
): ResponseCompression {
  const supportsGzip = acceptEncoding?.includes("gzip") || false;
  const supportsBrotli = acceptEncoding?.includes("br") || false;

  const compressionType: CompressionType = supportsBrotli
    ? "brotli"
    : supportsGzip
      ? "gzip"
      : "none";

  const originalSize = 125000; // Estimated response size
  const compressionRatio =
    compressionType === "brotli"
      ? 0.15
      : compressionType === "gzip"
        ? 0.25
        : 1.0;

  return {
    compressionType,
    originalSizeBytes: originalSize,
    compressedSizeBytes: Math.floor(originalSize * compressionRatio),
    compressionRatio,
    compressionTimeMs: compressionType === "none" ? 0 : 8 + Math.random() * 12,
    supported: compressionType !== "none",
  };
}

/**
 * Enhancement #57: Generate field selection metadata
 */
function generateFieldSelection(fieldsParam: string | null): FieldSelection {
  const allFields = [
    "flowAnalysis",
    "batteryHealth",
    "gridInteraction",
    "temporalPatterns",
    "forecasts",
    "alerts",
    "agentDecisionLinks",
    "explainabilityLevels",
    "decisionQuality",
    "provenanceChains",
    "complianceScoring",
  ];

  const requestedFields = fieldsParam ? fieldsParam.split(",") : allFields;
  const excludedFields = allFields.filter((f) => !requestedFields.includes(f));

  return {
    requestedFields,
    availableFields: allFields,
    excludedFields,
    estimatedSizeReduction: (excludedFields.length / allFields.length) * 100,
  };
}

// Continue in next message due to length...

export async function GET(request: Request) {
  const startTime = Date.now();

  try {
    // Parse query parameters (Enhancement #24: Query Flexibility)
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get("timeRange") as TimeRange) || "24h";
    const metrics = (searchParams.get("metrics") as MetricScope) || "all";
    const aggregation =
      (searchParams.get("aggregation") as AggregationLevel) || "raw";
    const format = (searchParams.get("format") as ResponseFormat) || "standard";
    const includeForecasts = searchParams.get("includeForecasts") !== "false";
    const includeHistory = searchParams.get("includeHistory") !== "false";
    const includeAlerts = searchParams.get("includeAlerts") !== "false";
    const includeOptimization =
      searchParams.get("includeOptimization") !== "false";
    const baselineComparison =
      (searchParams.get("baselineComparison") as BaselineComparison) || "none";
    const exportFormat =
      (searchParams.get("exportFormat") as ExportFormat) || "json";
    const stream = searchParams.get("stream") === "true";

    // Phase 10 New Query Parameters (Enhancements #41, #55, #57)
    const explainabilityDepth =
      (searchParams.get("explainabilityDepth") as ExplainabilityDepth) ||
      "intermediate";
    const includeAgentContext =
      searchParams.get("includeAgentContext") !== "false";
    const includeOutcomes = searchParams.get("includeOutcomes") !== "false";
    const includeChains = searchParams.get("includeChains") !== "false";
    const fields = searchParams.get("fields"); // For field selection
    const acceptEncoding = request.headers.get("accept-encoding"); // For compression

    // Enhancement #30: Smart Defaults
    const smartDefaults: SmartDefault[] = [];
    if (!searchParams.has("timeRange")) {
      smartDefaults.push({
        parameter: "timeRange",
        defaultValue: "24h",
        reason: "24-hour window provides complete daily cycle visibility",
      });
    }
    if (!searchParams.has("includeForecasts")) {
      smartDefaults.push({
        parameter: "includeForecasts",
        defaultValue: true,
        reason: "Forecasts enable proactive energy management",
      });
    }

    // Generate base mock metrics
    const baseMetrics = generateMockEnergyMetrics();

    // Build enhanced metrics with all 32 enhancements
    const enhancedMetrics: EnhancedEnergyMetrics = {
      timestamp: new Date().toISOString(),
      dataAge: baseMetrics.dataAge,

      // Enhancement #1-12 (HIGH VALUE)
      flowAnalysis: generateFlowAnalysis(baseMetrics),
      batteryHealth: generateBatteryHealthMetrics(baseMetrics),
      gridInteraction: generateGridInteractionMetrics(),
      temporalPatterns: generateTemporalPatternAnalysis(),
      constraintValidation: {} as ConstraintValidation, // Will be populated
      forecasts: includeForecasts
        ? generateForecastData()
        : ({} as ForecastData),
      performanceBenchmark: generatePerformanceBenchmark(),
      anomalies: generateAnomalyDetection(baseMetrics),
      trustMetrics: generateTrustMetrics(baseMetrics.dataAge),
      crossDomainImpact: {} as CrossDomainImpact, // Will be populated
      energyBalance: {} as EnergyBalanceValidation, // Will be populated
      predictiveMaintenance: {} as PredictiveMaintenance, // Will be populated

      // Enhancement #13-22 (MEDIUM VALUE) - Placeholders for now
      historicalComparison: {} as HistoricalComparison,
      efficiencyMetrics: {} as EfficiencyMetrics,
      revenueAttribution: {} as RevenueAttribution,
      weatherIntegration: {} as WeatherIntegration,
      loadProfile: {} as LoadProfile,
      batteryOptimization: {} as BatteryOptimization,
      gridServices: {} as GridServices,
      carbonAccounting: {} as CarbonAccounting,
      alerts: [],
      dataQuality: {} as DataQualityMonitoring,

      // Enhancement #23 (POLISH)
      visualizationData: {} as VisualizationDataPrep,

      // Metadata
      queryMetadata: {
        timeRange,
        metrics,
        aggregation,
        format,
        includeForecasts,
        includeHistory,
        includeAlerts,
        includeOptimization,
        baselineComparison,
        exportFormat,
        processingTimeMs: 0, // Will be calculated
        dataPointsReturned: 1,
      },
      optimizationHints: [
        "Consider enabling forecasts for better planning",
        "24h time range recommended for daily pattern analysis",
        stream
          ? "Streaming enabled for real-time updates"
          : "Enable streaming for live data",
      ],
      smartDefaults,

      // ========== PHASE 10 ENHANCEMENTS (25 additional features) ==========
      // Populated below based on conditional flags
      agentDecisionLinks: [],
      agentStates: [],
      multiAgentCoordination: [],
      agentConsensus: [],
      decisionExplanations: [],
      agentWorkload: [],
      learningContext: [],
      agentAuthority: [],
      explainabilityLevels: {} as ExplainabilityLevels,
      confidenceBreakdown: {} as ConfidenceBreakdown,
      alternativeActions: [],
      decisionPrerequisites: [],
      counterfactualAnalyses: [],
      decisionQuality: [],
      outcomeTracking: [],
      decisionChains: [],
      decisionVelocity: {} as DecisionVelocity,
      reversalHistory: [],
      provenanceChains: [],
      complianceScoring: {} as ComplianceScoring,
      userImpactEstimation: [],
      rollbackCapability: [],
      queryProfile: {} as QueryProfile,
      responseCompression: {} as ResponseCompression,
      fieldSelection: {} as FieldSelection,
    };

    // Populate dependent fields (HIGH VALUE)
    enhancedMetrics.constraintValidation = generateConstraintValidation(
      enhancedMetrics.batteryHealth
    );
    enhancedMetrics.crossDomainImpact = generateCrossDomainImpact(
      enhancedMetrics.flowAnalysis
    );
    enhancedMetrics.energyBalance = generateEnergyBalanceValidation(
      enhancedMetrics.flowAnalysis
    );
    enhancedMetrics.predictiveMaintenance = generatePredictiveMaintenance(
      enhancedMetrics.batteryHealth
    );

    // Populate medium-value enhancements (#13-22)
    if (includeHistory) {
      enhancedMetrics.historicalComparison = generateHistoricalComparison(
        baselineComparison,
        {
          generation: enhancedMetrics.flowAnalysis.totalGeneration,
          consumption: enhancedMetrics.flowAnalysis.totalConsumption,
          efficiency: enhancedMetrics.flowAnalysis.systemEfficiency,
        }
      );
    }

    enhancedMetrics.efficiencyMetrics = generateEfficiencyMetrics(
      enhancedMetrics.flowAnalysis
    );
    enhancedMetrics.revenueAttribution = generateRevenueAttribution(
      enhancedMetrics.flowAnalysis
    );
    enhancedMetrics.weatherIntegration = generateWeatherIntegration();
    enhancedMetrics.loadProfile = generateLoadProfile(
      enhancedMetrics.flowAnalysis.totalConsumption
    );

    if (includeOptimization) {
      enhancedMetrics.batteryOptimization = generateBatteryOptimization(
        enhancedMetrics.batteryHealth
      );
    }

    enhancedMetrics.gridServices = generateGridServices();
    enhancedMetrics.carbonAccounting = generateCarbonAccounting(
      enhancedMetrics.flowAnalysis.totalGeneration
    );
    enhancedMetrics.dataQuality = generateDataQualityMonitoring();

    // Generate alerts if requested (#21)
    if (includeAlerts) {
      enhancedMetrics.alerts = generateAlerts(
        enhancedMetrics.batteryHealth,
        enhancedMetrics.constraintValidation,
        enhancedMetrics.anomalies
      );
    }

    // Generate visualization data (#23)
    enhancedMetrics.visualizationData = generateVisualizationData(
      enhancedMetrics.flowAnalysis,
      enhancedMetrics.batteryHealth,
      enhancedMetrics.gridInteraction
    );

    // ========== POPULATE PHASE 10 ENHANCEMENTS (25 additional features) ==========

    // Agent Integration (Enhancements #33-40)
    if (includeAgentContext) {
      enhancedMetrics.agentDecisionLinks = generateAgentDecisionLinks();
      enhancedMetrics.agentStates = generateAgentStates();
      enhancedMetrics.multiAgentCoordination = generateMultiAgentCoordination();
      enhancedMetrics.agentConsensus = generateAgentConsensus();
      enhancedMetrics.decisionExplanations = generateDecisionExplanations();
      enhancedMetrics.agentWorkload = generateAgentWorkloadMetrics();
      enhancedMetrics.learningContext = generateLearningContext();
      enhancedMetrics.agentAuthority = generateAgentAuthority();
    }

    // Advanced Explainability (Enhancements #41-45)
    enhancedMetrics.explainabilityLevels = generateExplainabilityLevels();
    enhancedMetrics.confidenceBreakdown = generateConfidenceBreakdown();
    enhancedMetrics.alternativeActions = generateAlternativeActions();
    enhancedMetrics.decisionPrerequisites = generateDecisionPrerequisites();
    enhancedMetrics.counterfactualAnalyses = generateCounterfactualAnalyses();

    // Operational Intelligence (Enhancements #46-50)
    if (includeOutcomes) {
      enhancedMetrics.decisionQuality = generateDecisionQuality();
      enhancedMetrics.outcomeTracking = generateOutcomeTracking();
    }
    if (includeChains) {
      enhancedMetrics.decisionChains = generateDecisionChains();
    }
    enhancedMetrics.decisionVelocity = generateDecisionVelocity();
    enhancedMetrics.reversalHistory = generateReversalHistory();

    // Advanced Trust & Provenance (Enhancements #51-54)
    enhancedMetrics.provenanceChains = generateProvenanceChains();
    enhancedMetrics.complianceScoring = generateComplianceScoring();
    enhancedMetrics.userImpactEstimation = generateUserImpactEstimation();
    enhancedMetrics.rollbackCapability = generateRollbackCapability();

    // Query & Performance (Enhancements #55-57)
    enhancedMetrics.queryProfile = generateQueryProfile(searchParams);
    enhancedMetrics.responseCompression =
      generateResponseCompression(acceptEncoding);
    enhancedMetrics.fieldSelection = generateFieldSelection(fields);

    const processingTime = Date.now() - startTime;
    enhancedMetrics.queryMetadata.processingTimeMs = processingTime;

    // Format response based on requested format (Enhancement #25)
    let responseData:
      | Partial<EnhancedEnergyMetrics>
      | {
          timestamp: string;
          generation: number;
          consumption: number;
          batterySOC: number;
          gridFlow: number;
        };
    if (format === "minimal") {
      responseData = {
        timestamp: enhancedMetrics.timestamp,
        generation: enhancedMetrics.flowAnalysis.totalGeneration,
        consumption: enhancedMetrics.flowAnalysis.totalConsumption,
        batterySOC: enhancedMetrics.batteryHealth.stateOfCharge,
        gridFlow: enhancedMetrics.flowAnalysis.netGridFlow,
      };
    } else if (format === "full") {
      responseData = enhancedMetrics;
    } else {
      // Standard format - omit some heavy fields
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { visualizationData, ...standardData } = enhancedMetrics;
      responseData = standardData;
    }

    return NextResponse.json(
      {
        data: responseData,
        sourceProvenance: "mock:generator+trust_math",
        freshnessSec: baseMetrics.dataAge,
        traceId: `trace-energy-${Date.now()}`,
        metadata: {
          enhancementsApplied: 57, // 32 original + 25 Phase 10
          processingTimeMs: processingTime,
          format,
          smartDefaultsApplied: smartDefaults.length,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Data-Source": "mock",
          "X-Enhancements": "57", // 32 original + 25 Phase 10
          "X-Processing-Time-Ms": processingTime.toString(),
        },
      }
    );
  } catch (error) {
    console.error("Energy metrics API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch energy metrics",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
