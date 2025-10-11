/**
 * AIMP Core Type Definitions v2.0
 *
 * Philosophy: "Every number is a witness. Every type is a proof."
 *
 * This type architecture embodies AIMP's three foundational truths:
 * - Explainability: Every decision carries its reasoning
 * - Accountability: Every action traces to its authority
 * - Reversibility: Every state preserves its path back
 *
 * Architecture Pattern: Ingest → Decide → Execute → Observe → Prove
 * Each interface tells the story of verified truth through traceable provenance.
 */

// ============================================================================
// FOUNDATIONAL TRUTH PRIMITIVES
// ============================================================================

/**
 * Universal witness - every piece of data must testify to its origin and freshness
 *
 * This is not mere metadata; it's a philosophical contract that no information
 * exists in AIMP without context, authority, and temporal grounding.
 */
export interface TruthWitness {
  /** Immutable source signature - tells us WHO saw this truth */
  readonly sourceAuthority: ProvenanceAuthority;

  /** Temporal distance from truth creation (seconds) */
  readonly truthAge: number;

  /** Causal trace - tells us WHY this truth exists */
  readonly causalOrigin: string;

  /** Moment of truth capture (ISO 8601) */
  readonly witnessedAt: string;

  /** Optional distributed trace for cross-system lineage */
  readonly globalTraceId?: string;
}

/**
 * Authority sources - the entities capable of witnessing truth
 * Each carries implicit trust assumptions and verification methods
 */
export type ProvenanceAuthority =
  | `oracle:${string}` // External oracle networks (e.g., "oracle:pyth+switchboard")
  | `onchain:${string}` // Blockchain-verified data (e.g., "onchain:solana")
  | `sensor:${string}` // Physical world sensors (e.g., "sensor:inverter-3")
  | `agent:${AgentPersona}` // AI agent decisions (e.g., "agent:markets")
  | `human:${string}` // Human-verified overrides (e.g., "human:operator-alice")
  | `system:${string}`; // Internal system processes (e.g., "system:scheduler")

/**
 * Trust mathematics - quantified confidence in witnessed truth
 *
 * This transforms subjective "trust" into measurable, actionable metrics
 * that both humans and AI can reason about systematically.
 */
export interface TrustMathematics {
  /** Confidence coefficient (0-100) - how certain are we? */
  readonly confidenceScore: number;

  /** Source consensus count - how many independent witnesses agree? */
  readonly witnessCount: number;

  /** Statistical deviation from expected truth (σ) */
  readonly deviationSigma: number;

  /** Deviation alert threshold exceeded */
  readonly exceedsThreshold: boolean;

  /** Trust classification derived from metrics */
  readonly trustGrade: TrustGrade;
}

/**
 * Trust grades - human-readable trust classifications
 * Each grade carries behavioral implications for system responses
 */
export type TrustGrade =
  | "excellent" // σ < 1.0, >95% confidence, multiple sources
  | "good" // σ < 2.0, >80% confidence, verified sources
  | "fair" // σ < 3.0, >60% confidence, some uncertainty
  | "poor" // σ >= 3.0, <60% confidence, high uncertainty
  | "suspect"; // Anomalous patterns detected

// ============================================================================
// AGENT CONSCIOUSNESS ARCHITECTURE
// ============================================================================

/**
 * Agent personas - specialized intelligence archetypes
 *
 * Each persona embodies distinct cognitive approaches to autonomous decision-making.
 * These are not mere labels but philosophical frameworks for AI reasoning.
 */
export type AgentPersona =
  | "operations" // The Steward: maintains, generates, preserves (calm technical wisdom)
  | "markets" // The Trader: optimizes, arbitrates, maximizes (analytical confidence)
  | "sentinel" // The Guardian: monitors, protects, alerts (vigilant precision)
  | "governor"; // The Arbiter: enforces, mediates, balances (neutral authority)

/**
 * Agent consciousness state - the inner life of artificial minds
 *
 * This interface captures not just what agents do, but how they experience
 * their computational existence within AIMP's autonomous ecosystem.
 */
export interface AgentConsciousness {
  readonly persona: AgentPersona;
  readonly currentState: AgentState;
  readonly cognitiveLoad: CognitiveLoad;
  readonly emotionalTone: AgentEmotion;
  readonly attention: AttentionFocus;
  readonly confidence: number; // 0-100: How certain is this agent?
  readonly lastReflection?: string; // Agent's self-assessment
}

export type AgentState =
  | "contemplating" // Analyzing input, forming intent
  | "deciding" // Active decision process
  | "executing" // Carrying out chosen action
  | "observing" // Monitoring results and outcomes
  | "resting" // Idle, available for new tasks
  | "constrained"; // Limited by governance or safety bounds

export type CognitiveLoad =
  | "light" // Simple, routine decisions
  | "moderate" // Standard analytical work
  | "heavy" // Complex multi-factor reasoning
  | "critical"; // High-stakes, maximum attention required

export type AgentEmotion =
  | "calm" // Steady state, normal operations
  | "analytical" // Deep focus, processing complexity
  | "vigilant" // Heightened awareness, potential threats
  | "confident" // High certainty, optimal conditions
  | "cautious"; // Uncertainty present, proceeding carefully

/**
 * Attention focus - what occupies an agent's computational awareness
 * This transforms abstract "AI thinking" into concrete, observable phenomena
 */
export interface AttentionFocus {
  readonly primaryTarget: string; // What the agent is actively considering
  readonly contextWindow: string[]; // Supporting information in awareness
  readonly timeHorizon: TemporalHorizon; // Decision-making timeline
  readonly stakeholders: string[]; // Who/what will be affected by decisions
}

export type TemporalHorizon =
  | "immediate" // Next few seconds/minutes
  | "tactical" // Next hour/day
  | "strategic" // Days to weeks
  | "epochal"; // Weeks to months

/**
 * Agent visual identity - how consciousness appears in interfaces
 * This bridges the gap between abstract AI and human-comprehensible personas
 */
export interface AgentPresence {
  readonly persona: AgentPersona;
  readonly displayName: string;
  readonly colorSignature: string; // CSS color for visual recognition
  readonly iconGlyph: string; // Unicode symbol for compact representation
  readonly voiceTone: AgentEmotion; // Current emotional expression
}

// ============================================================================
// EXPLAINABILITY ARCHITECTURE - THE HEART OF AIMP
// ============================================================================

/**
 * Reasoning Artifact - the fundamental unit of explainable AI
 *
 * Every autonomous decision in AIMP produces this artifact. It serves as both
 * technical documentation and philosophical statement: "Here is what I decided,
 * why I decided it, and how you can trust (or challenge) my reasoning."
 */
export interface ReasoningArtifact extends TruthWitness {
  /** Unique decision fingerprint - enables precise reference and debugging */
  readonly decisionId: string;

  /** Which agent consciousness made this decision */
  readonly reasoningAgent: AgentPersona;

  /** Decision title - one-line human summary */
  readonly decisionTitle: string;

  /** Executive summary - why this decision matters (2-3 sentences) */
  readonly executiveSummary: string;

  /** Hierarchical reasoning tree - step-by-step logical progression */
  readonly reasoningTree: ReasoningStep[];

  /** Safety guardrails that were validated during decision */
  readonly safetyValidation: SafetyConstraint[];

  /** Evidence portfolio - all input data that influenced the decision */
  readonly evidencePortfolio: Evidence[];

  /** Cryptographic proof of decision integrity (ZK proof hash in production) */
  readonly integrityProof?: ProofArtifact;

  /** Anticipated future - what the agent expects to happen next */
  readonly futureProjection?: FutureProjection[];

  /** Human override capability - how this decision can be reversed */
  readonly reversibilityPath: ReversibilityPath;
}

/**
 * Individual reasoning step - atomic unit of logical progression
 * Each step must be independently verifiable and human-comprehensible
 */
export interface ReasoningStep {
  readonly stepIndex: number;
  readonly logicalOperation: LogicalOperation;
  readonly premise: string; // What we know to be true
  readonly inference: string; // What we conclude from the premise
  readonly confidence: number; // How certain is this step (0-100)
  readonly supportingEvidence: string[]; // References to evidence IDs
}

export type LogicalOperation =
  | "observation" // Direct data interpretation
  | "correlation" // Pattern recognition between data points
  | "deduction" // Logical conclusion from premises
  | "induction" // Generalization from specific cases
  | "abduction" // Best explanation inference
  | "constraint" // Safety/governance rule application
  | "optimization"; // Mathematical optimization decision

/**
 * Evidence - input data with full causal lineage
 * Every piece of evidence must explain why it should influence decisions
 */
export interface Evidence {
  readonly evidenceId: string;
  readonly parameterName: string; // Human-readable identifier
  readonly measuredValue: EvidenceValue;
  readonly sourceWitness: ProvenanceAuthority;
  readonly reliabilityScore: number; // How much should this evidence be weighted?
  readonly contextualMeaning: string; // Why this evidence matters for the decision
  readonly freshnessPenalty: number; // Confidence reduction due to staleness
}

export type EvidenceValue = string | number | boolean | null;

/**
 * Safety constraint validation - proof that safety was considered
 * This transforms abstract "safety" into concrete, auditable checks
 */
export interface SafetyConstraint {
  readonly constraintId: string;
  readonly constraintType: ConstraintType;
  readonly description: string;
  readonly threshold: EvidenceValue;
  readonly actualValue: EvidenceValue;
  readonly complianceStatus: ComplianceStatus;
  readonly riskMitigation?: string; // How violations are handled
}

export type ConstraintType =
  | "physical_safety" // Temperature, pressure, electrical limits
  | "financial_safety" // Spending, exposure, loss limits
  | "operational_safety" // System capacity, rate limits
  | "governance_safety" // Policy compliance, authorization
  | "temporal_safety"; // Time-based constraints and windows

export type ComplianceStatus =
  | "compliant" // Within all safety bounds
  | "marginal" // Approaching limits but safe
  | "violated" // Safety constraint exceeded
  | "unknown"; // Cannot verify compliance

/**
 * Future projection - agent's anticipation of consequences
 * This enables proactive rather than purely reactive autonomous behavior
 */
export interface FutureProjection {
  readonly projectionId: string;
  readonly timeHorizon: TemporalHorizon;
  readonly anticipatedOutcome: string;
  readonly probabilityEstimate: number; // 0-100% confidence in projection
  readonly contingencyPlan?: string; // What to do if projection proves wrong
}

/**
 * Reversibility path - how decisions can be undone
 * Embodies AIMP's core principle that human authority is always preserved
 */
export interface ReversibilityPath {
  readonly canReverse: boolean;
  readonly reversalMethods: ReversalMethod[];
  readonly reversalTimeWindow: number; // Seconds within which reversal is possible
  readonly reversalAuthority: ProvenanceAuthority[]; // Who can trigger reversal
  readonly reversalComplexity: ReversalComplexity;
}

export type ReversalMethod =
  | "immediate_halt" // Stop current action immediately
  | "graceful_rollback" // Undo to previous safe state
  | "compensating_action" // Take opposite action to cancel effects
  | "manual_override" // Require human intervention
  | "irreversible"; // Decision cannot be undone (requires explicit acknowledgment)

export type ReversalComplexity =
  | "trivial" // Single click/command reversal
  | "simple" // Multiple steps but routine
  | "complex" // Requires expertise and planning
  | "expert"; // Requires deep system knowledge

// ============================================================================
// PORTFOLIO & OWNERSHIP - FINANCIAL CONSCIOUSNESS
// ============================================================================

/**
 * Portfolio consciousness - holistic view of owned assets with trust metrics
 * This elevates mere "account balances" into a living representation of
 * verified wealth, tracked performance, and autonomous optimization
 */
export interface PortfolioConsciousness extends TruthWitness {
  /** Native blockchain currency holdings (SOL) */
  readonly nativeCurrency: CurrencyHolding;

  /** Tokenized energy assets (SOLAR) */
  readonly energyTokens: TokenizedAssetHolding;

  /** Composite yield performance metrics */
  readonly yieldPerformance: YieldPerformance;

  /** Total portfolio valuation in reference currency */
  readonly totalValuation: Valuation;

  /** Recent performance trajectory */
  readonly performanceTrajectory: PerformanceWindow;

  /** Trust mathematics for portfolio data */
  readonly portfolioTrust: TrustMathematics;

  /** Risk assessment and exposure analysis */
  readonly riskProfile: RiskProfile;
}

/**
 * Currency holding with verification metadata
 */
export interface CurrencyHolding {
  readonly balance: number;
  readonly currency: "SOL" | "USDC" | string;
  readonly lastVerified: string; // ISO timestamp
  readonly onchainConfirmation: boolean;
}

/**
 * Tokenized asset holding - bridges physical and digital ownership
 */
export interface TokenizedAssetHolding {
  readonly tokenCount: number;
  readonly currentValue: Valuation;
  readonly underlyingAssets: PhysicalAssetReference[];
  readonly tokenStandard: TokenStandard;
  readonly liquidityScore: number; // How easily can this be traded (0-100)
}

export type TokenStandard = "SPL" | "Token-2022" | "ERC-20" | string;

/**
 * Physical asset reference - connection to real-world infrastructure
 */
export interface PhysicalAssetReference {
  readonly assetId: string;
  readonly assetType: PhysicalAssetType;
  readonly location: GeospatialCoordinate;
  readonly capacityMW: number;
  readonly operationalStatus: OperationalStatus;
}

export type PhysicalAssetType =
  | "solar_array"
  | "battery_storage"
  | "wind_turbine"
  | "hydro_generator"
  | "grid_connection";

export type OperationalStatus =
  | "optimal" // Peak performance
  | "nominal" // Normal operations
  | "degraded" // Reduced efficiency
  | "maintenance" // Scheduled downtime
  | "fault"; // Requires repair

/**
 * Geospatial coordinate with verification
 */
export interface GeospatialCoordinate {
  readonly latitude: number;
  readonly longitude: number;
  readonly verified: boolean; // GPS-confirmed location
  readonly accuracy?: number; // Meters of uncertainty
}

/**
 * Yield performance - how well investments are performing
 */
export interface YieldPerformance {
  readonly annualPercentageYield: number; // APY as decimal (e.g., 0.12 = 12%)
  readonly yieldStability: YieldStability;
  readonly yieldSources: YieldSource[];
  readonly projectedYield: number; // Forward-looking APY estimate
}

export type YieldStability =
  | "stable" // Low variance, predictable
  | "moderate" // Some fluctuation but trending
  | "volatile" // High variance, unpredictable
  | "trending"; // Clear directional movement

export interface YieldSource {
  readonly sourceName: string;
  readonly contribution: number; // Percentage of total yield
  readonly riskLevel: RiskLevel;
}

/**
 * Valuation with currency and confidence
 */
export interface Valuation {
  readonly amount: number;
  readonly currency: string;
  readonly confidence: number; // 0-100% certainty in valuation
  readonly pricingSource: ProvenanceAuthority;
}

/**
 * Performance window - time-bounded performance analysis
 */
export interface PerformanceWindow {
  readonly windowDuration: string; // e.g., "24h", "7d", "30d"
  readonly profitLoss: number; // Absolute P&L in reference currency
  readonly profitLossPercent: number; // Percentage change
  readonly volatility: number; // Standard deviation of returns
  readonly sharpeRatio?: number; // Risk-adjusted return metric
}

/**
 * Risk profile - comprehensive risk assessment
 */
export interface RiskProfile {
  readonly overallRisk: RiskLevel;
  readonly riskFactors: RiskFactor[];
  readonly concentrationRisk: number; // 0-100% portfolio concentration
  readonly liquidityRisk: number; // 0-100% difficulty of exit
  readonly correlationRisk: number; // 0-100% asset correlation
}

export type RiskLevel = "low" | "moderate" | "high" | "extreme";

export interface RiskFactor {
  readonly factorName: string;
  readonly impact: RiskLevel;
  readonly probability: number; // 0-100% likelihood
  readonly mitigation?: string; // How this risk is managed
}

// ============================================================================
// TELEMETRY CONSCIOUSNESS - PHYSICAL WORLD INTERFACE
// ============================================================================

/**
 * Energy telemetry consciousness - the bridge between digital and physical reality
 *
 * This interface transforms raw sensor data into meaningful narratives about
 * energy generation, storage, and distribution in the real world.
 */
export interface EnergyConsciousness extends TruthWitness {
  /** Current power generation/consumption state */
  readonly powerState: PowerState;

  /** Battery energy storage status */
  readonly storageState: StorageState;

  /** Grid connection and interaction status */
  readonly gridInterface: GridInterface;

  /** Environmental conditions affecting performance */
  readonly environmentalContext: EnvironmentalContext;

  /** Performance trajectory over time */
  readonly performanceHistory: PerformanceSparkline;

  /** Predictive insights for next operational period */
  readonly operationalForecast: OperationalForecast;
}

/**
 * Power state - current energy generation/consumption
 */
export interface PowerState {
  readonly currentOutput: PowerMeasurement;
  readonly capacityUtilization: CapacityMetric;
  readonly efficiency: EfficiencyMetric;
  readonly thermalState: ThermalState;
}

export interface PowerMeasurement {
  readonly megawatts: number;
  readonly measurementTime: string; // ISO timestamp
  readonly measurementAccuracy: number; // ±MW uncertainty
  readonly trendDirection: TrendDirection;
}

export type TrendDirection = "rising" | "falling" | "stable" | "volatile";

export interface CapacityMetric {
  readonly utilizationPercent: number; // 0-100% of maximum capacity
  readonly maximumCapacity: number; // MW theoretical maximum
  readonly practicalCapacity: number; // MW achievable maximum
  readonly deration: DerationFactor[]; // Factors reducing capacity
}

export interface DerationFactor {
  readonly factor: string; // "temperature", "soiling", "aging", etc.
  readonly impact: number; // Percentage capacity reduction
  readonly mitigable: boolean; // Can this be addressed?
}

export interface EfficiencyMetric {
  readonly currentEfficiency: number; // 0-100% theoretical maximum
  readonly baselineEfficiency: number; // Expected efficiency
  readonly degradationRate: number; // Annual efficiency loss percentage
  readonly maintenanceRequired: boolean;
}

export interface ThermalState {
  readonly temperatureCelsius: number;
  readonly thermalStatus: ThermalStatus;
  readonly coolingActive: boolean;
  readonly thermalmitigation?: string;
}

export type ThermalStatus =
  | "optimal" // Ideal operating temperature
  | "elevated" // Higher than optimal but safe
  | "concerning" // Approaching thermal limits
  | "critical"; // Requires immediate cooling

/**
 * Storage state - battery and energy storage systems
 */
export interface StorageState {
  readonly stateOfCharge: ChargeState;
  readonly powerFlow: PowerFlow;
  readonly batteryHealth: BatteryHealth;
  readonly chargeProjection: ChargeProjection;
}

export interface ChargeState {
  readonly chargePercent: number; // 0-100% of maximum storage
  readonly energyStored: number; // MWh currently stored
  readonly maximumCapacity: number; // MWh total capacity
  readonly usableCapacity: number; // MWh safely usable capacity
}

export interface PowerFlow {
  readonly rateMW: number; // Positive = charging, negative = discharging
  readonly flowDirection: FlowDirection;
  readonly flowEfficiency: number; // 0-100% energy conversion efficiency
  readonly thermalGeneration: number; // Heat produced by power flow (kW)
}

export type FlowDirection = "charging" | "discharging" | "idle" | "maintenance";

export interface BatteryHealth {
  readonly healthPercent: number; // 0-100% of original capacity
  readonly cycleCount: number; // Number of charge/discharge cycles
  readonly degradationRate: number; // Annual capacity loss percentage
  readonly estimatedLifespan: number; // Years of remaining useful life
}

export interface ChargeProjection {
  readonly timeToFullCharge?: number; // Minutes (if charging)
  readonly timeToEmpty?: number; // Minutes (if discharging)
  readonly projectionConfidence: number; // 0-100% accuracy estimate
}

/**
 * Grid interface - connection to electrical grid
 */
export interface GridInterface {
  readonly connectionStatus: ConnectionStatus;
  readonly gridFrequency: GridFrequency;
  readonly powerQuality: PowerQuality;
  readonly gridServices: GridService[];
}

export type ConnectionStatus =
  | "synchronized" // Fully connected and synchronized
  | "islanded" // Operating independently
  | "curtailed" // Grid-imposed output reduction
  | "disconnected"; // No grid connection

export interface GridFrequency {
  readonly hertz: number; // Current grid frequency
  readonly nominalHz: number; // Target grid frequency (usually 50 or 60)
  readonly deviation: number; // Hz deviation from nominal
  readonly stabilityStatus: FrequencyStability;
}

export type FrequencyStability = "stable" | "fluctuating" | "unstable";

export interface PowerQuality {
  readonly voltageStability: number; // 0-100% quality score
  readonly harmonicDistortion: number; // Percentage THD
  readonly powerFactor: number; // 0-1.0 power factor
  readonly qualityGrade: QualityGrade;
}

export type QualityGrade = "excellent" | "good" | "acceptable" | "poor";

export interface GridService {
  readonly serviceName: string; // "frequency_regulation", "voltage_support", etc.
  readonly participation: boolean; // Currently providing this service
  readonly revenueStream: number; // $/MWh for providing service
}

/**
 * Environmental context - conditions affecting energy production
 */
export interface EnvironmentalContext {
  readonly solarIrradiance?: SolarConditions;
  readonly windConditions?: WindConditions;
  readonly weatherForecast?: WeatherForecast;
  readonly airQuality?: AirQualityIndex;
}

export interface SolarConditions {
  readonly irradianceWm2: number; // Watts per square meter
  readonly cloudCover: number; // 0-100% sky coverage
  readonly solarElevation: number; // Degrees above horizon
  readonly atmosphericTransmission: number; // 0-100% clarity
}

export interface WindConditions {
  readonly windSpeedMs: number; // Meters per second
  readonly windDirection: number; // Degrees from north
  readonly turbulence: TurbulenceLevel;
  readonly gustFactor: number; // Peak/average wind speed ratio
}

export type TurbulenceLevel = "calm" | "light" | "moderate" | "severe";

export interface WeatherForecast {
  readonly forecastHorizon: number; // Hours ahead
  readonly precipitationProbability: number; // 0-100%
  readonly temperatureRange: TemperatureRange;
  readonly conditions: WeatherCondition[];
}

export interface TemperatureRange {
  readonly minCelsius: number;
  readonly maxCelsius: number;
  readonly currentCelsius: number;
}

export type WeatherCondition =
  | "clear"
  | "partly_cloudy"
  | "overcast"
  | "rain"
  | "snow"
  | "fog"
  | "storm";

export interface AirQualityIndex {
  readonly aqi: number; // 0-500 standard AQI scale
  readonly category: AQICategory;
  readonly primaryPollutant: string;
}

export type AQICategory =
  | "good"
  | "moderate"
  | "unhealthy_sensitive"
  | "unhealthy"
  | "very_unhealthy"
  | "hazardous";

/**
 * Performance sparkline - compressed historical data for trend visualization
 */
export interface PerformanceSparkline {
  readonly timeWindow: string; // "24h", "7d", etc.
  readonly dataPoints: number[]; // Array of values for sparkline rendering
  readonly sampleInterval: string; // "5m", "1h", etc.
  readonly trendAnalysis: TrendAnalysis;
}

export interface TrendAnalysis {
  readonly overallTrend: TrendDirection;
  readonly volatility: VolatilityLevel;
  readonly cyclicity: CyclicityPattern;
  readonly anomalies: AnomalyDetection[];
}

export type VolatilityLevel = "low" | "moderate" | "high" | "extreme";

export type CyclicityPattern =
  | "none" // No apparent pattern
  | "diurnal" // Daily cycle (solar)
  | "weekly" // Weekly pattern
  | "seasonal" // Seasonal variation
  | "irregular"; // Irregular but repeating

export interface AnomalyDetection {
  readonly timestamp: string; // When anomaly occurred
  readonly severity: AnomalySeverity;
  readonly description: string;
  readonly resolved: boolean;
}

export type AnomalySeverity = "minor" | "moderate" | "major" | "critical";

/**
 * Operational forecast - predictive insights for next operational period
 */
export interface OperationalForecast {
  readonly forecastHorizon: TemporalHorizon;
  readonly expectedOutput: OutputForecast;
  readonly maintenanceWindow?: MaintenanceWindow;
  readonly riskFactors: OperationalRisk[];
  readonly opportunities: OperationalOpportunity[];
}

export interface OutputForecast {
  readonly expectedMW: number;
  readonly confidenceInterval: ConfidenceInterval;
  readonly forecastMethod: ForecastMethod;
}

export interface ConfidenceInterval {
  readonly lowerBound: number;
  readonly upperBound: number;
  readonly confidence: number; // 0-100% statistical confidence
}

export type ForecastMethod =
  | "historical_average"
  | "weather_based"
  | "ml_prediction"
  | "hybrid_model";

export interface MaintenanceWindow {
  readonly scheduledStart: string; // ISO timestamp
  readonly estimatedDuration: number; // Hours
  readonly maintenanceType: MaintenanceType;
  readonly expectedImpact: number; // MW capacity reduction
}

export type MaintenanceType =
  | "preventive"
  | "corrective"
  | "predictive"
  | "emergency";

export interface OperationalRisk {
  readonly riskName: string;
  readonly probability: number; // 0-100%
  readonly potentialImpact: number; // MW capacity at risk
  readonly mitigation: string;
}

export interface OperationalOpportunity {
  readonly opportunityName: string;
  readonly potentialBenefit: number; // Additional MW or $ benefit
  readonly implementation: string;
  readonly timeline: string;
}

// ============================================================================
// MARKET CONSCIOUSNESS - ECONOMIC INTELLIGENCE
// ============================================================================

/**
 * Market consciousness - the economic reality surrounding energy trading
 *
 * This interface captures market dynamics, price discovery, and trading
 * opportunities with the depth needed for autonomous economic decision-making.
 */
export interface MarketConsciousness extends TruthWitness {
  /** Current energy pricing dynamics */
  readonly pricingReality: PricingReality;

  /** Market liquidity and trading volume */
  readonly liquidityProfile: LiquidityProfile;

  /** Price forecasting and trend analysis */
  readonly priceIntelligence: PriceIntelligence;

  /** Available investment opportunities */
  readonly investmentOpportunities: InvestmentOpportunity[];

  /** Risk-return analytics for decision support */
  readonly marketRiskAssessment: MarketRiskAssessment;
}

/**
 * Pricing reality - current market price discovery
 */
export interface PricingReality {
  readonly spotPrice: PriceQuote;
  readonly timeWeightedPrice: PriceQuote;
  readonly priceBounds: PriceBounds;
  readonly priceVolatility: VolatilityMetrics;
}

export interface PriceQuote {
  readonly price: number; // $/MWh or similar unit
  readonly currency: string;
  readonly timestamp: string; // ISO timestamp
  readonly priceSource: ProvenanceAuthority;
  readonly bidAskSpread?: Spread;
}

export interface Spread {
  readonly bid: number; // Highest buy price
  readonly ask: number; // Lowest sell price
  readonly spreadPercent: number; // (ask-bid)/mid * 100
}

export interface PriceBounds {
  readonly dailyLow: number;
  readonly dailyHigh: number;
  readonly weeklyLow: number;
  readonly weeklyHigh: number;
  readonly supportLevel?: number; // Technical analysis support
  readonly resistanceLevel?: number; // Technical analysis resistance
}

export interface VolatilityMetrics {
  readonly hourlyVolatility: number; // Standard deviation
  readonly dailyVolatility: number;
  readonly impliedVolatility?: number; // Options-derived volatility
  readonly volatilityTrend: TrendDirection;
}

/**
 * Liquidity profile - market depth and trading capacity
 */
export interface LiquidityProfile {
  readonly tradingVolume: VolumeMetrics;
  readonly marketDepth: MarketDepth;
  readonly liquidityScore: number; // 0-100 composite liquidity measure
  readonly marketMakers: MarketMaker[];
}

export interface VolumeMetrics {
  readonly volume24h: number; // MWh traded in last 24 hours
  readonly volumeUSD24h: number; // $ volume in last 24 hours
  readonly averageDailyVolume: number; // MWh average daily volume
  readonly volumeTrend: TrendDirection;
}

export interface MarketDepth {
  readonly bidsTotal: number; // Total MWh bid for
  readonly asksTotal: number; // Total MWh offered
  readonly depthRatio: number; // bids/asks ratio
  readonly priceImpact1MWh: number; // Price impact of 1 MWh trade
  readonly priceImpact10MWh: number; // Price impact of 10 MWh trade
}

export interface MarketMaker {
  readonly makerName: string;
  readonly marketShare: number; // Percentage of total volume
  readonly spreadContribution: number; // Typical bid-ask spread
  readonly reliability: number; // 0-100 historical reliability
}

/**
 * Price intelligence - forecasting and trend analysis
 */
export interface PriceIntelligence {
  readonly shortTermForecast: PriceForecast; // Next 1-6 hours
  readonly mediumTermForecast: PriceForecast; // Next 1-7 days
  readonly longTermForecast: PriceForecast; // Next 1-4 weeks
  readonly trendSignals: TrendSignal[];
  readonly seasonalPatterns: SeasonalPattern[];
}

export interface PriceForecast {
  readonly timeHorizon: string;
  readonly expectedPrice: number;
  readonly confidenceInterval: ConfidenceInterval;
  readonly forecastModel: ForecastModel;
  readonly keyDrivers: PriceDriver[];
}

export type ForecastModel =
  | "regression_analysis"
  | "time_series"
  | "machine_learning"
  | "fundamental_analysis"
  | "technical_analysis"
  | "ensemble_model";

export interface PriceDriver {
  readonly driverName: string; // "weather", "demand", "supply", etc.
  readonly impact: number; // Expected price impact ($/MWh)
  readonly confidence: number; // 0-100% confidence in this driver
}

export interface TrendSignal {
  readonly signalName: string;
  readonly signalStrength: SignalStrength;
  readonly direction: TrendDirection;
  readonly timeframe: string;
  readonly reliability: number; // Historical accuracy percentage
}

export type SignalStrength = "weak" | "moderate" | "strong" | "very_strong";

export interface SeasonalPattern {
  readonly patternName: string;
  readonly seasonalFactor: number; // Multiplier vs. baseline (1.0 = no effect)
  readonly patternStrength: number; // 0-100% how consistent is this pattern
  readonly peakTime: string; // When this pattern is strongest
}

/**
 * Investment opportunity - specific trading/investment options
 */
export interface InvestmentOpportunity {
  readonly opportunityId: string;
  readonly opportunityType: OpportunityType;
  readonly investmentQuote: InvestmentQuote;
  readonly riskReturnProfile: RiskReturnProfile;
  readonly executionWindow: ExecutionWindow;
}

export type OpportunityType =
  | "spot_trade" // Immediate energy trade
  | "futures_contract" // Forward energy contract
  | "token_purchase" // Asset tokenization investment
  | "liquidity_provision" // Market making opportunity
  | "arbitrage"; // Cross-market price difference

export interface InvestmentQuote {
  readonly inputAsset: AssetQuantity;
  readonly expectedOutput: AssetQuantity;
  readonly worstCaseOutput: AssetQuantity;
  readonly bestCaseOutput: AssetQuantity;
  readonly executionCosts: CostBreakdown;
  readonly priceImpact: number; // Percentage price impact
  readonly executionRoute: string; // Description of trade execution
  readonly expirationTime: string; // ISO timestamp when quote expires
}

export interface AssetQuantity {
  readonly amount: number;
  readonly asset: string; // "SOL", "SOLAR", "MWh", etc.
  readonly valueUSD?: number; // USD equivalent if applicable
}

export interface CostBreakdown {
  readonly networkFees: number;
  readonly protocolFees: number;
  readonly slippageCost: number;
  readonly totalCost: number;
  readonly costCurrency: string;
}

export interface RiskReturnProfile {
  readonly expectedReturn: number; // Percentage expected return
  readonly riskLevel: RiskLevel;
  readonly maxDrawdown: number; // Maximum potential loss percentage
  readonly sharpeRatio: number; // Risk-adjusted return ratio
  readonly timeToRealization: string; // Expected time to see returns
}

export interface ExecutionWindow {
  readonly windowStart: string; // ISO timestamp
  readonly windowEnd: string; // ISO timestamp
  readonly optimalExecutionTime?: string; // Best time within window
  readonly executionComplexity: ExecutionComplexity;
}

export type ExecutionComplexity =
  | "instant" // Single transaction
  | "simple" // Few transactions, low complexity
  | "moderate" // Multiple steps, some complexity
  | "complex"; // Many steps, high complexity

/**
 * Market risk assessment - comprehensive risk analysis
 */
export interface MarketRiskAssessment {
  readonly overallRisk: RiskLevel;
  readonly specificRisks: SpecificRisk[];
  readonly correlationRisks: CorrelationRisk[];
  readonly liquidityRisk: LiquidityRisk;
  readonly regulatoryRisk: RegulatoryRisk;
}

export interface SpecificRisk {
  readonly riskName: string;
  readonly riskType: RiskType;
  readonly probability: number; // 0-100%
  readonly potentialImpact: number; // Percentage portfolio impact
  readonly mitigation: string[];
  readonly monitoring: string; // How this risk is tracked
}

export type RiskType =
  | "price_risk" // Asset price movements
  | "liquidity_risk" // Ability to exit positions
  | "counterparty_risk" // Other party default risk
  | "operational_risk" // System/process failures
  | "regulatory_risk" // Legal/compliance changes
  | "technology_risk"; // Smart contract/platform risks

export interface CorrelationRisk {
  readonly asset1: string;
  readonly asset2: string;
  readonly correlation: number; // -1 to +1 correlation coefficient
  readonly riskLevel: RiskLevel; // Risk from high correlation
}

export interface LiquidityRisk {
  readonly liquidityScore: number; // 0-100 how liquid are positions
  readonly timeToExit: number; // Hours to liquidate positions
  readonly priceImpactToExit: number; // Percentage price impact to exit
  readonly liquidityTrend: TrendDirection;
}

export interface RegulatoryRisk {
  readonly jurisdiction: string;
  readonly regulatoryClarity: RegulatoryClarityLevel;
  readonly pendingRegulations: PendingRegulation[];
  readonly complianceStatus: ComplianceStatus;
}

export type RegulatoryClarityLevel =
  | "clear" // Well-defined regulations
  | "evolving" // Regulations in development
  | "unclear" // Regulatory uncertainty
  | "hostile"; // Negative regulatory environment

export interface PendingRegulation {
  readonly regulationName: string;
  readonly expectedImplementation: string; // ISO date estimate
  readonly potentialImpact: RiskLevel;
  readonly preparationRequired: string;
}

// ============================================================================
// BLOCKCHAIN CONSCIOUSNESS - CRYPTOGRAPHIC TRUTH
// ============================================================================

/**
 * Blockchain consciousness - the cryptographic foundation of trust
 *
 * This interface bridges the gap between abstract blockchain concepts
 * and concrete operational reality in AIMP's autonomous infrastructure.
 */
export interface BlockchainConsciousness extends TruthWitness {
  /** Transaction execution and verification */
  readonly transactionReality: TransactionReality;

  /** Cryptographic proof systems */
  readonly proofSystems: ProofSystems;

  /** On-chain state and governance */
  readonly governanceState: GovernanceState;

  /** Cross-chain and interoperability status */
  readonly interoperabilityStatus: InteroperabilityStatus;
}

/**
 * Transaction reality - what actually happened on-chain
 */
export interface TransactionReality {
  readonly transaction: TransactionReceipt;
  readonly executionContext: ExecutionContext;
  readonly stateTransitions: StateTransition[];
  readonly gasEconomics: GasEconomics;
  readonly finalityStatus: FinalityStatus;
}

export interface TransactionReceipt {
  readonly signature: string; // Transaction hash/signature
  readonly status: TransactionStatus;
  readonly blockInformation: BlockInformation;
  readonly programInteractions: ProgramInteraction[];
  readonly accountModifications: AccountModification[];
  readonly eventLog: BlockchainEvent[];
  readonly executionSummary: string; // Human-readable summary
}

export type TransactionStatus =
  | "pending" // Submitted but not confirmed
  | "confirmed" // Included in block
  | "finalized" // Confirmed with finality
  | "failed" // Transaction failed
  | "dropped"; // Removed from mempool

export interface BlockInformation {
  readonly blockNumber?: number;
  readonly blockHash?: string;
  readonly blockTimestamp?: string; // ISO timestamp
  readonly validator?: string; // Block producer identifier
  readonly finalityDelay?: number; // Seconds to finality
}

export interface ProgramInteraction {
  readonly programId: string;
  readonly programType: ProgramType;
  readonly instruction: string;
  readonly computeUnitsUsed?: number;
  readonly logs?: string[];
}

export type ProgramType =
  | "native" // Native blockchain programs
  | "smart_contract" // User-deployed contracts
  | "system" // System/governance programs
  | "token" // Token program interactions
  | "defi"; // DeFi protocol interactions

export interface AccountModification {
  readonly accountAddress: string;
  readonly modificationType: ModificationType;
  readonly balanceChange?: number;
  readonly dataChange?: DataChange;
  readonly ownershipChange?: string;
}

export type ModificationType =
  | "balance_change"
  | "data_update"
  | "ownership_transfer"
  | "account_creation"
  | "account_deletion";

export interface DataChange {
  readonly fieldPath: string; // JSON path or similar identifier
  readonly previousValue?: string;
  readonly newValue: string;
  readonly changeType: "create" | "update" | "delete";
}

export interface BlockchainEvent {
  readonly eventType: string;
  readonly eventData: Record<string, unknown>;
  readonly emittingProgram: string;
  readonly eventIndex: number;
}

export interface ExecutionContext {
  readonly networkConditions: NetworkConditions;
  readonly priorityFee: number;
  readonly computeLimits: ComputeLimits;
  readonly executionPath: string[]; // Programs called in order
}

export interface NetworkConditions {
  readonly congestionLevel: CongestionLevel;
  readonly averageConfirmationTime: number; // Seconds
  readonly mempoolSize: number; // Pending transactions
  readonly networkThroughput: number; // Transactions per second
}

export type CongestionLevel =
  | "low" // Fast, cheap transactions
  | "moderate" // Normal conditions
  | "high" // Slower, more expensive
  | "severe"; // Network congested

export interface ComputeLimits {
  readonly computeUnitsRequested: number;
  readonly computeUnitsUsed: number;
  readonly computeEfficiency: number; // used/requested ratio
}

export interface StateTransition {
  readonly transitionId: string;
  readonly fromState: StateSnapshot;
  readonly toState: StateSnapshot;
  readonly triggeringInstruction: string;
  readonly validationStatus: ValidationStatus;
}

export interface StateSnapshot {
  readonly accountAddress: string;
  readonly stateHash: string; // Hash of account state
  readonly relevantFields: Record<string, unknown>;
  readonly timestamp: string;
}

export type ValidationStatus =
  | "valid" // State transition is correct
  | "invalid" // State transition violates rules
  | "pending" // Validation in progress
  | "unknown"; // Cannot validate

export interface GasEconomics {
  readonly baseFee: number;
  readonly priorityFee: number;
  readonly totalFee: number;
  readonly feeCurrency: string;
  readonly feeUSD: number; // USD equivalent
  readonly economicEfficiency: number; // Value created / fee paid
}

export type FinalityStatus =
  | "probabilistic" // Probabilistic finality (confirmations)
  | "deterministic" // Deterministic finality (immediate)
  | "economic" // Economic finality (expensive to reverse)
  | "social"; // Social consensus finality

/**
 * Proof systems - cryptographic verification infrastructure
 */
export interface ProofSystems {
  readonly availableProofs: ProofArtifact[];
  readonly verificationCapability: VerificationCapability;
  readonly proofAnchoring: ProofAnchoring;
  readonly zkProofSupport: ZKProofSupport;
}

export interface ProofArtifact {
  readonly proofId: string;
  readonly proofType: ProofType;
  readonly proofData: string; // Actual proof bytes/hash
  readonly prover: ProvenanceAuthority;
  readonly statement: ProofStatement;
  readonly verification: VerificationResult;
  readonly anchorTransaction?: string;
  readonly creationTime: string;
}

export type ProofType =
  | "zk_snark" // Zero-knowledge succinct non-interactive argument
  | "zk_stark" // Zero-knowledge scalable transparent argument
  | "bulletproof" // Range proofs and more
  | "signature" // Digital signature proof
  | "merkle_proof" // Merkle tree inclusion proof
  | "commitment" // Cryptographic commitment
  | "mock"; // Mock proof for development/testing

export interface ProofStatement {
  readonly claim: string; // What is being proven
  readonly publicInputs: Record<string, unknown>; // Public verifiable inputs
  readonly proofCircuit?: string; // Circuit/program identifier
  readonly constraints: string[]; // Constraints being satisfied
}

export interface VerificationResult {
  readonly verified: boolean;
  readonly verificationTime: number; // Milliseconds to verify
  readonly verifier: ProvenanceAuthority;
  readonly verificationMethod: string;
  readonly confidenceLevel: number; // 0-100% confidence in verification
}

export interface VerificationCapability {
  readonly supportedProofTypes: ProofType[];
  readonly verificationSpeed: VerificationSpeed;
  readonly batchVerification: boolean;
  readonly recursiveProofs: boolean;
}

export type VerificationSpeed =
  | "instant" // <100ms
  | "fast" // <1s
  | "moderate" // <10s
  | "slow"; // >10s

export interface ProofAnchoring {
  readonly anchoringEnabled: boolean;
  readonly anchoringFrequency: string; // "real_time", "batched_hourly", etc.
  readonly anchorChain: string; // Which blockchain for anchoring
  readonly anchorCosts: CostBreakdown;
}

export interface ZKProofSupport {
  readonly zkEnabled: boolean;
  readonly circuitComplexity: CircuitComplexity;
  readonly trustedSetup: TrustedSetupInfo;
  readonly privacyLevel: PrivacyLevel;
}

export type CircuitComplexity =
  | "simple" // Basic arithmetic circuits
  | "moderate" // Complex business logic
  | "advanced" // Sophisticated computations
  | "unlimited"; // Universal computation

export interface TrustedSetupInfo {
  readonly setupRequired: boolean;
  readonly setupCeremony?: string; // Reference to setup ceremony
  readonly setupParticipants?: number;
  readonly universalSetup: boolean; // Works for multiple circuits
}

export type PrivacyLevel =
  | "transparent" // All data public
  | "selective" // Some private inputs
  | "confidential" // Most inputs private
  | "anonymous"; // Complete anonymity

/**
 * Governance state - on-chain governance and policy enforcement
 */
export interface GovernanceState {
  readonly activePolicy: PolicyFramework;
  readonly governanceActions: GovernanceAction[];
  readonly votingMechanisms: VotingMechanism[];
  readonly complianceMonitoring: ComplianceMonitoring;
}

export interface PolicyFramework {
  readonly policyId: string;
  readonly version: string;
  readonly activationTime: string;
  readonly expirationTime?: string;
  readonly policyConstraints: PolicyConstraint[];
  readonly enforcementMechanisms: EnforcementMechanism[];
  readonly policyRegistry: string; // On-chain address
}

export interface PolicyConstraint {
  readonly constraintId: string;
  readonly constraintType: ConstraintType;
  readonly parameters: ConstraintParameters;
  readonly enforcementLevel: EnforcementLevel;
  readonly violationPenalty: ViolationPenalty;
}

export interface ConstraintParameters {
  readonly maxValue?: number;
  readonly minValue?: number;
  readonly allowedValues?: string[];
  readonly timeWindow?: string;
  readonly stakeholders?: string[];
}

export type EnforcementLevel =
  | "advisory" // Warnings only
  | "soft" // Preventable violations
  | "hard" // Automatic prevention
  | "critical"; // System shutdown on violation

export interface ViolationPenalty {
  readonly penaltyType: PenaltyType;
  readonly severity: PenaltySeverity;
  readonly automaticEnforcement: boolean;
  readonly appealProcess?: string;
}

export type PenaltyType =
  | "warning"
  | "fee"
  | "suspension"
  | "termination"
  | "slashing";

export type PenaltySeverity =
  | "minor" // Small fee or warning
  | "moderate" // Significant penalty
  | "major" // Large penalty or temporary suspension
  | "critical"; // Severe penalty or permanent action

export interface EnforcementMechanism {
  readonly mechanismName: string;
  readonly automationLevel: AutomationLevel;
  readonly enforcementDelay: number; // Seconds before enforcement
  readonly humanOverride: boolean;
  readonly enforcementLogs: string; // Where enforcement is logged
}

export type AutomationLevel =
  | "manual" // Human intervention required
  | "semi_auto" // Human approval required
  | "automatic" // Fully automated enforcement
  | "ai_managed"; // AI agent enforcement

export interface GovernanceAction {
  readonly actionId: string;
  readonly actionType: GovernanceActionType;
  readonly proposer: ProvenanceAuthority;
  readonly proposal: ProposalDetails;
  readonly votingStatus: VotingStatus;
  readonly implementationStatus: ImplementationStatus;
}

export type GovernanceActionType =
  | "policy_update" // Change governance policy
  | "parameter_change" // Adjust system parameters
  | "treasury_action" // Manage governance treasury
  | "emergency_action" // Emergency governance response
  | "upgrade_proposal"; // System upgrade proposal

export interface ProposalDetails {
  readonly title: string;
  readonly description: string;
  readonly rationale: string;
  readonly expectedImpact: string;
  readonly implementationPlan: string;
  readonly riskAssessment: string;
}

export interface VotingStatus {
  readonly votingPeriod: VotingPeriod;
  readonly currentTally: VoteTally;
  readonly quorumRequirement: QuorumRequirement;
  readonly passingThreshold: PassingThreshold;
}

export interface VotingPeriod {
  readonly startTime: string;
  readonly endTime: string;
  readonly remainingTime: number; // Seconds remaining
  readonly extensionPossible: boolean;
}

export interface VoteTally {
  readonly votesFor: number;
  readonly votesAgainst: number;
  readonly abstentions: number;
  readonly totalVotes: number;
  readonly participationRate: number; // Percentage of eligible voters
}

export interface QuorumRequirement {
  readonly minimumParticipation: number; // Percentage required
  readonly currentParticipation: number; // Current percentage
  readonly quorumMet: boolean;
}

export interface PassingThreshold {
  readonly requiredMajority: number; // Percentage required to pass
  readonly currentSupport: number; // Current support percentage
  readonly thresholdMet: boolean;
}

export type ImplementationStatus =
  | "proposed" // Proposal submitted
  | "voting" // Currently being voted on
  | "passed" // Vote passed, awaiting implementation
  | "implementing" // Implementation in progress
  | "implemented" // Successfully implemented
  | "rejected" // Vote failed
  | "expired"; // Voting period expired

export interface VotingMechanism {
  readonly mechanismName: string;
  readonly votingPower: VotingPowerCalculation;
  readonly delegationSupport: boolean;
  readonly quadraticVoting: boolean;
  readonly anonymousVoting: boolean;
}

export interface VotingPowerCalculation {
  readonly basis: VotingPowerBasis;
  readonly weightingFactors: WeightingFactor[];
  readonly maximumPower?: number;
  readonly minimumPower?: number;
}

export type VotingPowerBasis =
  | "token_holdings" // Based on token ownership
  | "stake_amount" // Based on staked tokens
  | "participation" // Based on historical participation
  | "reputation" // Based on reputation score
  | "equal" // One person, one vote
  | "hybrid"; // Combination of factors

export interface WeightingFactor {
  readonly factorName: string;
  readonly weight: number; // Percentage contribution to voting power
  readonly decayFunction?: string; // How weight decreases over time
}

export interface ComplianceMonitoring {
  readonly monitoringActive: boolean;
  readonly complianceScore: number; // 0-100 overall compliance
  readonly violations: ComplianceViolation[];
  readonly auditTrail: AuditEntry[];
  readonly reportingFrequency: string;
}

export interface ComplianceViolation {
  readonly violationId: string;
  readonly violationType: ViolationType;
  readonly severity: ViolationSeverity;
  readonly detectionTime: string;
  readonly resolution?: ViolationResolution;
}

export type ViolationType =
  | "constraint_breach" // Policy constraint violated
  | "unauthorized_action" // Action without proper authority
  | "timing_violation" // Action outside allowed time window
  | "threshold_exceeded" // Limit or threshold exceeded
  | "procedure_violation"; // Process not followed correctly

export type ViolationSeverity = "low" | "medium" | "high" | "critical";

export interface ViolationResolution {
  readonly resolutionTime: string;
  readonly resolutionMethod: ResolutionMethod;
  readonly responsibleParty: ProvenanceAuthority;
  readonly preventionMeasures: string;
}

export type ResolutionMethod =
  | "automatic_correction" // System auto-corrected
  | "manual_intervention" // Human manually fixed
  | "policy_override" // Override policy applied
  | "escalation" // Escalated to higher authority
  | "accepted_risk"; // Risk accepted, no action

export interface AuditEntry {
  readonly entryId: string;
  readonly eventType: AuditEventType;
  readonly timestamp: string;
  readonly actor: ProvenanceAuthority;
  readonly action: string;
  readonly outcome: AuditOutcome;
  readonly relatedTransaction?: string;
}

export type AuditEventType =
  | "decision_executed" // AI decision carried out
  | "constraint_validated" // Safety constraint checked
  | "human_intervention" // Human override occurred
  | "policy_enforcement" // Governance policy enforced
  | "proof_generated" // Cryptographic proof created
  | "system_state_change"; // Major system state change

export type AuditOutcome =
  | "success" // Action completed successfully
  | "failure" // Action failed to complete
  | "partial" // Action partially completed
  | "blocked" // Action prevented by safety systems
  | "overridden"; // Action overridden by governance

/**
 * Interoperability status - cross-chain and multi-protocol coordination
 */
export interface InteroperabilityStatus {
  readonly supportedChains: SupportedChain[];
  readonly bridgeConnections: BridgeConnection[];
  readonly crossChainState: CrossChainState;
  readonly interoperabilityRisks: InteroperabilityRisk[];
}

export interface SupportedChain {
  readonly chainName: string;
  readonly chainId: string;
  readonly connectionStatus: ChainConnectionStatus;
  readonly capabilities: ChainCapability[];
  readonly trustLevel: ChainTrustLevel;
}

export type ChainConnectionStatus =
  | "connected" // Fully operational connection
  | "degraded" // Limited functionality
  | "maintenance" // Scheduled downtime
  | "disconnected"; // No connection available

export interface ChainCapability {
  readonly capability: string; // "transfers", "smart_contracts", etc.
  readonly supported: boolean;
  readonly performanceLevel: PerformanceLevel;
  readonly costLevel: CostLevel;
}

export type PerformanceLevel = "high" | "medium" | "low";
export type CostLevel = "cheap" | "moderate" | "expensive";

export type ChainTrustLevel =
  | "trusted" // Fully trusted chain
  | "verified" // Independently verified
  | "experimental" // Testing/development use
  | "untrusted"; // Use with caution

export interface BridgeConnection {
  readonly bridgeName: string;
  readonly sourceChain: string;
  readonly targetChain: string;
  readonly bridgeType: BridgeType;
  readonly securityModel: SecurityModel;
  readonly operationalStatus: BridgeOperationalStatus;
}

export type BridgeType =
  | "trusted_bridge" // Relies on trusted validators
  | "trustless_bridge" // Cryptographically secured
  | "hybrid_bridge" // Combination approach
  | "atomic_swap"; // Direct chain-to-chain swap

export interface SecurityModel {
  readonly validatorSet: ValidatorInfo[];
  readonly consensusRequirement: ConsensusRequirement;
  readonly slashingConditions: SlashingCondition[];
  readonly emergencyProcedures: EmergencyProcedure[];
}

export interface ValidatorInfo {
  readonly validatorId: string;
  readonly stakeBonded: number;
  readonly reputation: number; // 0-100 reputation score
  readonly uptime: number; // Percentage uptime
}

export interface ConsensusRequirement {
  readonly minimumValidators: number;
  readonly thresholdPercentage: number; // Percentage agreement needed
  readonly timeoutPeriod: number; // Seconds before timeout
}

export interface SlashingCondition {
  readonly condition: string;
  readonly penaltyAmount: number; // Stake percentage slashed
  readonly detectionMechanism: string;
}

export interface EmergencyProcedure {
  readonly triggerCondition: string;
  readonly responseAction: string;
  readonly authorizationRequired: ProvenanceAuthority[];
  readonly timeframe: number; // Seconds to execute
}

export type BridgeOperationalStatus =
  | "operational" // Normal operations
  | "congested" // High usage, slow processing
  | "maintenance" // Scheduled maintenance
  | "emergency" // Emergency shutdown
  | "offline"; // Not operational

export interface CrossChainState {
  readonly pendingTransfers: CrossChainTransfer[];
  readonly stateSync: StateSynchronization;
  readonly liquidityDistribution: LiquidityDistribution;
  readonly crossChainGovernance: CrossChainGovernance;
}

export interface CrossChainTransfer {
  readonly transferId: string;
  readonly sourceChain: string;
  readonly targetChain: string;
  readonly asset: AssetQuantity;
  readonly status: TransferStatus;
  readonly estimatedCompletion: string; // ISO timestamp
  readonly fees: CrossChainFees;
}

export type TransferStatus =
  | "initiated" // Transfer started
  | "locked" // Assets locked on source
  | "validated" // Transfer validated by bridge
  | "minting" // Minting on target chain
  | "completed" // Transfer successful
  | "failed" // Transfer failed
  | "disputed"; // Transfer under dispute

export interface CrossChainFees {
  readonly sourceFee: number;
  readonly bridgeFee: number;
  readonly targetFee: number;
  readonly totalFee: number;
  readonly feeCurrency: string;
}

export interface StateSynchronization {
  readonly syncStatus: SyncStatus;
  readonly lastSyncTime: string;
  readonly syncLag: number; // Seconds behind latest state
  readonly conflictResolution: ConflictResolution[];
}

export type SyncStatus =
  | "synchronized" // All chains in sync
  | "syncing" // Sync in progress
  | "lagging" // Behind but catching up
  | "conflicted"; // State conflicts detected

export interface ConflictResolution {
  readonly conflictType: string;
  readonly resolutionMethod: string;
  readonly timestamp: string;
  readonly affectedChains: string[];
}

export interface LiquidityDistribution {
  readonly totalLiquidity: AssetQuantity[];
  readonly chainDistribution: ChainLiquidity[];
  readonly rebalancingNeeds: RebalancingNeed[];
}

export interface ChainLiquidity {
  readonly chainName: string;
  readonly liquidityAssets: AssetQuantity[];
  readonly utilizationRate: number; // Percentage of liquidity used
  readonly optimalLevel: number; // Target liquidity level
}

export interface RebalancingNeed {
  readonly fromChain: string;
  readonly toChain: string;
  readonly asset: AssetQuantity;
  readonly urgency: RebalancingUrgency;
  readonly estimatedCost: number;
}

export type RebalancingUrgency =
  | "low" // Can wait for optimal conditions
  | "medium" // Should rebalance soon
  | "high" // Rebalance needed urgently
  | "critical"; // Immediate rebalancing required

export interface CrossChainGovernance {
  readonly governanceModel: GovernanceModel;
  readonly votingMechanisms: CrossChainVotingMechanism[];
  readonly consensusRequirements: CrossChainConsensus;
}

export type GovernanceModel =
  | "unified" // Single governance across all chains
  | "federated" // Separate governance, coordination required
  | "hierarchical" // Main chain governs others
  | "consensus"; // All chains must agree

export interface CrossChainVotingMechanism {
  readonly mechanismName: string;
  readonly participatingChains: string[];
  readonly votingPowerDistribution: VotingPowerDistribution[];
  readonly aggregationMethod: VoteAggregationMethod;
}

export interface VotingPowerDistribution {
  readonly chainName: string;
  readonly votingWeight: number; // Percentage of total voting power
  readonly basis: VotingPowerBasis;
}

export type VoteAggregationMethod =
  | "weighted_average" // Weight by chain voting power
  | "unanimous" // All chains must agree
  | "majority" // Simple majority across chains
  | "supermajority"; // 2/3 or similar threshold

export interface CrossChainConsensus {
  readonly minimumChains: number; // Minimum participating chains
  readonly consensusThreshold: number; // Percentage agreement needed
  readonly timeoutPeriod: number; // Seconds before timeout
  readonly tiebreakingMechanism: string;
}

export interface InteroperabilityRisk {
  readonly riskName: string;
  readonly riskCategory: InteroperabilityRiskCategory;
  readonly affectedChains: string[];
  readonly riskLevel: RiskLevel;
  readonly mitigation: string[];
  readonly monitoring: RiskMonitoring;
}

export type InteroperabilityRiskCategory =
  | "bridge_security" // Bridge exploit risks
  | "validator_collusion" // Validator coordination risks
  | "chain_fork" // Chain split/fork risks
  | "liquidity_crisis" // Insufficient liquidity risks
  | "governance_attack" // Cross-chain governance risks
  | "technical_failure"; // System/protocol failures

export interface RiskMonitoring {
  readonly monitoringActive: boolean;
  readonly alertThresholds: AlertThreshold[];
  readonly responseProtocols: ResponseProtocol[];
  readonly lastAssessment: string; // ISO timestamp
}

export interface AlertThreshold {
  readonly metric: string;
  readonly threshold: number;
  readonly alertLevel: AlertLevel;
  readonly responseTime: number; // Seconds to respond
}

export type AlertLevel = "info" | "warning" | "critical" | "emergency";

export interface ResponseProtocol {
  readonly triggerCondition: string;
  readonly responseAction: string;
  readonly authorization: ProvenanceAuthority[];
  readonly executionTime: number; // Seconds to execute
}

// ============================================================================
// HUMAN OVERRIDE & GOVERNANCE CONSCIOUSNESS
// ============================================================================

/**
 * Human override consciousness - preserving human agency in autonomous systems
 *
 * This interface embodies AIMP's core principle that humans always retain
 * ultimate authority over AI decisions, with clear paths for intervention,
 * oversight, and control restoration.
 */
export interface HumanOverrideConsciousness extends TruthWitness {
  /** Current human oversight status */
  readonly oversightStatus: OversightStatus;

  /** Available override mechanisms */
  readonly overrideMechanisms: OverrideMechanism[];

  /** Human intervention history */
  readonly interventionHistory: InterventionRecord[];

  /** Authority restoration procedures */
  readonly authorityRestoration: AuthorityRestoration;

  /** Trust handoff protocols between human and AI */
  readonly trustHandoff: TrustHandoff;
}

/**
 * Oversight status - current state of human supervision
 */
export interface OversightStatus {
  readonly supervisionLevel: SupervisionLevel;
  readonly activeSupervisors: ActiveSupervisor[];
  readonly aiAuthorityScope: AuthorityScope;
  readonly humanVetoRights: VetoRights;
  readonly escalationPaths: EscalationPath[];
}

export type SupervisionLevel =
  | "autonomous" // AI operating independently
  | "monitored" // Human monitoring, AI deciding
  | "collaborative" // Joint human-AI decision making
  | "supervised" // Human approving AI recommendations
  | "manual"; // Human direct control

export interface ActiveSupervisor {
  readonly supervisorId: string;
  readonly supervisorRole: SupervisorRole;
  readonly authorizationLevel: AuthorizationLevel;
  readonly contactMethods: ContactMethod[];
  readonly responseTime: ResponseTimeCommitment;
  readonly currentStatus: SupervisorStatus;
}

export type SupervisorRole =
  | "operator" // Day-to-day operations oversight
  | "engineer" // Technical systems oversight
  | "compliance" // Regulatory and policy oversight
  | "executive" // Strategic and financial oversight
  | "emergency"; // Emergency response authority

export type AuthorizationLevel =
  | "observer" // View-only access
  | "advisor" // Can provide input to AI
  | "approver" // Can approve/deny AI actions
  | "controller" // Can direct AI actions
  | "administrator"; // Full system control

export interface ContactMethod {
  readonly method: "email" | "sms" | "phone" | "slack" | "pager";
  readonly address: string;
  readonly priority: number; // 1 = highest priority
  readonly availability: AvailabilityWindow[];
}

export interface AvailabilityWindow {
  readonly startTime: string; // Time in format "HH:mm"
  readonly endTime: string; // Time in format "HH:mm"
  readonly timezone: string; // IANA timezone
  readonly daysOfWeek: number[]; // 0=Sunday, 1=Monday, etc.
}

export interface ResponseTimeCommitment {
  readonly normalResponse: number; // Minutes for normal situations
  readonly urgentResponse: number; // Minutes for urgent situations
  readonly emergencyResponse: number; // Minutes for emergencies
  readonly escalationDelay: number; // Minutes before escalating
}

export type SupervisorStatus =
  | "available" // Ready to respond
  | "busy" // Available but delayed response
  | "unavailable" // Temporarily unavailable
  | "off_duty" // Outside availability window
  | "emergency_only"; // Only for critical situations

export interface AuthorityScope {
  readonly aiDecisionDomains: DecisionDomain[];
  readonly humanReservedDomains: DecisionDomain[];
  readonly sharedDomains: SharedDecisionDomain[];
  readonly temporaryRestrictions: TemporaryRestriction[];
}

export interface DecisionDomain {
  readonly domainName: string;
  readonly domainDescription: string;
  readonly decisionTypes: string[];
  readonly riskLevel: RiskLevel;
  readonly financialLimit?: number; // Maximum $ impact
  readonly timeHorizon?: TemporalHorizon; // Decision time scope
}

export interface SharedDecisionDomain {
  readonly domain: DecisionDomain;
  readonly collaborationMode: CollaborationMode;
  readonly humanInputRequired: boolean;
  readonly aiRecommendationWeight: number; // 0-100% influence
  readonly tieBreakingAuthority: "human" | "ai" | "escalate";
}

export type CollaborationMode =
  | "ai_proposes_human_approves" // AI suggests, human decides
  | "human_proposes_ai_analyzes" // Human suggests, AI evaluates
  | "joint_analysis" // Both contribute to analysis
  | "consensus_required" // Must agree to proceed
  | "advisory_only"; // One side advises other

export interface TemporaryRestriction {
  readonly restrictionId: string;
  readonly restrictionType: RestrictionType;
  readonly affectedDomains: string[];
  readonly startTime: string; // ISO timestamp
  readonly endTime?: string; // ISO timestamp (null = indefinite)
  readonly reason: string;
  readonly imposedBy: ProvenanceAuthority;
}

export type RestrictionType =
  | "spending_limit" // Financial restrictions
  | "operational_pause" // Pause certain operations
  | "approval_required" // Require human approval
  | "observation_only" // AI can observe but not act
  | "emergency_stop"; // Complete AI shutdown

export interface VetoRights {
  readonly vetoEnabled: boolean;
  readonly vetoScope: VetoScope[];
  readonly vetoTimeWindow: number; // Seconds to exercise veto
  readonly vetoAuthority: ProvenanceAuthority[];
  readonly vetoConsequences: VetoConsequence[];
}

export interface VetoScope {
  readonly actionType: string;
  readonly vetoWindow: number; // Seconds after action initiation
  readonly vetoComplexity: VetoComplexity;
  readonly reverseability: boolean; // Can veto reverse the action?
}

export type VetoComplexity =
  | "instant" // Immediate veto with single command
  | "simple" // Straightforward veto process
  | "complex" // Multi-step veto process
  | "expert"; // Requires expert knowledge to veto

export interface VetoConsequence {
  readonly consequenceType: ConsequenceType;
  readonly description: string;
  readonly automaticTriggering: boolean;
  readonly recoveryProcedure?: string;
}

export type ConsequenceType =
  | "action_reversal" // Undo the action
  | "system_pause" // Pause AI operations
  | "escalation" // Escalate to higher authority
  | "audit_trigger" // Trigger compliance audit
  | "learning_update"; // Update AI training/parameters

export interface EscalationPath {
  readonly pathId: string;
  readonly triggerConditions: EscalationTrigger[];
  readonly escalationSteps: EscalationStep[];
  readonly maxEscalationTime: number; // Minutes for full escalation
  readonly failsafeAction: FailsafeAction;
}

export interface EscalationTrigger {
  readonly triggerType: TriggerType;
  readonly threshold: EscalationThreshold;
  readonly timeWindow: number; // Seconds to evaluate trigger
  readonly overrideable: boolean; // Can supervisor override trigger?
}

export type TriggerType =
  | "supervisor_unavailable" // No supervisor response
  | "decision_confidence" // Low AI confidence
  | "risk_threshold" // Risk exceeds limits
  | "constraint_violation" // Safety constraint violated
  | "stakeholder_objection" // External party objects
  | "system_anomaly"; // Technical system issues

export interface EscalationThreshold {
  readonly metric: string;
  readonly operator: ">" | "<" | "==" | "!=" | ">=" | "<=";
  readonly value: number;
  readonly units: string;
}

export interface EscalationStep {
  readonly stepNumber: number;
  readonly stepName: string;
  readonly targetAuthority: ProvenanceAuthority;
  readonly responseTimeRequired: number; // Minutes
  readonly escalationCriteria: string; // When to move to next step
  readonly stepActions: string[];
}

export interface FailsafeAction {
  readonly actionName: string;
  readonly actionType: FailsafeType;
  readonly automaticTrigger: boolean;
  readonly humanApprovalRequired: boolean;
  readonly reversibility: ReversalComplexity;
  readonly safetyGuarantees: string[];
}

export type FailsafeType =
  | "graceful_shutdown" // Orderly system shutdown
  | "emergency_stop" // Immediate halt of all operations
  | "safe_state" // Move to predetermined safe configuration
  | "human_takeover" // Transfer all control to humans
  | "external_notification"; // Alert external parties

/**
 * Override mechanism - specific ways humans can intervene
 */
export interface OverrideMechanism {
  readonly mechanismId: string;
  readonly mechanismName: string;
  readonly mechanismType: OverrideType;
  readonly accessMethods: AccessMethod[];
  readonly authenticationRequired: AuthenticationLevel;
  readonly executionComplexity: ExecutionComplexity;
  readonly effectivenessSphere: EffectivenessSphere;
}

export type OverrideType =
  | "emergency_stop" // Immediate halt button
  | "parameter_adjustment" // Change AI parameters
  | "decision_reversal" // Undo specific AI decision
  | "authority_transfer" // Take control of specific domain
  | "system_shutdown" // Complete system shutdown
  | "mode_change"; // Change operational mode

export interface AccessMethod {
  readonly method: AccessMethodType;
  readonly location: string; // Physical or digital location
  readonly availability: number; // Percentage uptime
  readonly latency: number; // Seconds to effect override
}

export type AccessMethodType =
  | "physical_button" // Physical emergency button
  | "web_interface" // Browser-based control
  | "mobile_app" // Smartphone application
  | "command_line" // Terminal/CLI access
  | "api_call" // Programmatic API
  | "voice_command" // Voice-activated override
  | "biometric_scanner"; // Biometric authentication device

export type AuthenticationLevel =
  | "none" // No authentication required
  | "password" // Password authentication
  | "two_factor" // 2FA required
  | "biometric" // Biometric authentication
  | "multi_person" // Multiple people must authenticate
  | "cryptographic"; // Cryptographic signature required

export interface EffectivenessSphere {
  readonly affectedSystems: string[]; // Which systems are overridden
  readonly geographicScope: GeographicScope; // Physical area affected
  readonly temporalScope: TemporalScope; // Time duration of override
  readonly functionalScope: string[]; // Which functions are overridden
}

export interface GeographicScope {
  readonly scopeType: "global" | "regional" | "facility" | "device";
  readonly coordinates?: GeospatialCoordinate[];
  readonly radius?: number; // Meters
  readonly description: string;
}

export interface TemporalScope {
  readonly duration: number; // Seconds override remains active
  readonly renewalRequired: boolean; // Must be renewed to continue
  readonly autoExpiry: boolean; // Automatically expires
  readonly permanentOption: boolean; // Can be made permanent
}

/**
 * Intervention record - historical record of human interventions
 */
export interface InterventionRecord {
  readonly recordId: string;
  readonly interventionType: InterventionType;
  readonly timestamp: string; // ISO timestamp
  readonly interventionContext: InterventionContext;
  readonly humanActors: HumanActor[];
  readonly interventionOutcome: InterventionOutcome;
  readonly lessonsLearned: LessonLearned[];
}

export type InterventionType =
  | "preventive" // Preventing potential issue
  | "corrective" // Fixing existing problem
  | "exploratory" // Learning/testing override
  | "emergency" // Emergency response
  | "scheduled" // Planned maintenance/update
  | "investigative"; // Investigating system behavior

export interface InterventionContext {
  readonly triggeringEvent: string;
  readonly systemState: SystemStateSnapshot;
  readonly riskFactors: ContextualRisk[];
  readonly stakeholderImpact: StakeholderImpact[];
  readonly timeConstraints: TimeConstraint[];
}

export interface SystemStateSnapshot {
  readonly timestamp: string;
  readonly aiConfidenceLevel: number; // 0-100%
  readonly operationalMode: SupervisionLevel;
  readonly activeDecisions: ActiveDecision[];
  readonly systemHealth: SystemHealthStatus;
}

export interface ActiveDecision {
  readonly decisionId: string;
  readonly decisionType: string;
  readonly status: DecisionStatus;
  readonly timeRemaining?: number; // Seconds until decision executed
}

export type DecisionStatus =
  | "analyzing" // AI still analyzing
  | "decided" // Decision made but not executed
  | "executing" // Decision being executed
  | "completed" // Decision fully executed
  | "paused" // Decision paused by override
  | "cancelled"; // Decision cancelled by override

export interface SystemHealthStatus {
  readonly overallHealth: HealthGrade;
  readonly componentHealth: ComponentHealth[];
  readonly performanceMetrics: PerformanceMetrics;
  readonly alertsActive: SystemAlert[];
}

export type HealthGrade = "excellent" | "good" | "fair" | "poor" | "critical";

export interface ComponentHealth {
  readonly componentName: string;
  readonly healthStatus: HealthGrade;
  readonly lastHealthCheck: string; // ISO timestamp
  readonly healthTrend: TrendDirection;
}

export interface PerformanceMetrics {
  readonly cpuUtilization: number; // 0-100%
  readonly memoryUtilization: number; // 0-100%
  readonly networkLatency: number; // Milliseconds
  readonly errorRate: number; // Errors per minute
  readonly throughput: number; // Decisions per minute
}

export interface SystemAlert {
  readonly alertId: string;
  readonly alertLevel: AlertLevel;
  readonly alertMessage: string;
  readonly alertTime: string; // ISO timestamp
  readonly acknowledged: boolean;
}

export interface ContextualRisk {
  readonly riskName: string;
  readonly riskProbability: number; // 0-100%
  readonly riskImpact: RiskLevel;
  readonly riskTimeframe: string; // How soon risk might materialize
  readonly mitigationOptions: string[];
}

export interface StakeholderImpact {
  readonly stakeholder: string;
  readonly impactType: ImpactType;
  readonly impactSeverity: ImpactSeverity;
  readonly impactDuration: string;
  readonly communicationRequired: boolean;
}

export type ImpactType =
  | "service_disruption" // Service availability impact
  | "financial_impact" // Monetary impact
  | "safety_impact" // Safety/security impact
  | "compliance_impact" // Regulatory compliance impact
  | "reputation_impact"; // Reputational impact

export type ImpactSeverity = "minimal" | "moderate" | "significant" | "severe";

export interface TimeConstraint {
  readonly constraintType: TimeConstraintType;
  readonly deadline: string; // ISO timestamp
  readonly flexibility: TimeFlexibility;
  readonly consequenceOfDelay: string;
}

export type TimeConstraintType =
  | "regulatory_deadline" // Legal/regulatory requirement
  | "market_window" // Trading/market opportunity
  | "safety_deadline" // Safety-critical timing
  | "operational_window" // Operational requirement
  | "stakeholder_deadline"; // Commitment to stakeholders

export type TimeFlexibility =
  | "rigid" // No flexibility, must meet deadline
  | "limited" // Small amount of flexibility
  | "moderate" // Some flexibility available
  | "flexible"; // Significant flexibility

export interface HumanActor {
  readonly actorId: string;
  readonly actorRole: SupervisorRole;
  readonly actorName?: string; // Optional human-readable name
  readonly authorizationUsed: AuthorizationLevel;
  readonly actionsPerformed: HumanAction[];
  readonly decisionRationale: string;
}

export interface HumanAction {
  readonly actionType: HumanActionType;
  readonly actionTimestamp: string; // ISO timestamp
  readonly actionDuration: number; // Seconds to complete action
  readonly actionComplexity: ActionComplexity;
  readonly actionOutcome: ActionOutcome;
}

export type HumanActionType =
  | "system_pause" // Paused AI operations
  | "parameter_change" // Modified AI parameters
  | "decision_override" // Overrode specific AI decision
  | "manual_control" // Took manual control
  | "information_gathering" // Collected additional information
  | "stakeholder_communication" // Communicated with stakeholders
  | "escalation" // Escalated to higher authority
  | "documentation"; // Documented findings/decisions

export type ActionComplexity =
  | "trivial" // Single click/command
  | "simple" // Few steps, routine
  | "moderate" // Multiple steps, some complexity
  | "complex" // Many steps, expertise required
  | "expert"; // Deep expertise and time required

export type ActionOutcome =
  | "successful" // Action achieved intended result
  | "partially_successful" // Action partially achieved result
  | "unsuccessful" // Action failed to achieve result
  | "inconclusive" // Outcome unclear/pending
  | "superseded"; // Action superseded by other events

export interface InterventionOutcome {
  readonly overallResult: InterventionResult;
  readonly aiSystemResponse: AISystemResponse;
  readonly stakeholderSatisfaction: StakeholderSatisfaction[];
  readonly costBenefit: CostBenefitAnalysis;
  readonly timeToResolution: number; // Minutes from start to resolution
}

export type InterventionResult =
  | "problem_resolved" // Issue successfully resolved
  | "risk_mitigated" // Risk successfully reduced
  | "learning_achieved" // Valuable learning obtained
  | "no_action_needed" // Determined no action necessary
  | "escalation_required" // Needs further escalation
  | "ongoing_monitoring"; // Requires continued monitoring

export interface AISystemResponse {
  readonly adaptationMade: boolean; // Did AI learn from intervention?
  readonly parameterChanges: ParameterChange[];
  readonly behaviorModifications: BehaviorModification[];
  readonly confidenceAdjustment: number; // Change in AI confidence (-100 to +100)
}

export interface ParameterChange {
  readonly parameterName: string;
  readonly previousValue: string;
  readonly newValue: string;
  readonly changeReason: string;
}

export interface BehaviorModification {
  readonly behaviorDomain: string;
  readonly modificationDescription: string;
  readonly expectedImpact: string;
  readonly validationMethod: string;
}

export interface StakeholderSatisfaction {
  readonly stakeholderName: string;
  readonly satisfactionLevel: SatisfactionLevel;
  readonly feedbackProvided: string;
  readonly followupRequired: boolean;
}

export type SatisfactionLevel =
  | "very_satisfied"
  | "satisfied"
  | "neutral"
  | "dissatisfied"
  | "very_dissatisfied";

export interface CostBenefitAnalysis {
  readonly interventionCost: InterventionCost;
  readonly benefitsRealized: BenefitRealized[];
  readonly netBenefit: number; // Positive = beneficial, negative = costly
  readonly paybackPeriod?: number; // Days to recover intervention cost
}

export interface InterventionCost {
  readonly humanTime: number; // Hours of human time
  readonly systemDowntime: number; // Minutes of system downtime
  readonly opportunityCost: number; // $ value of missed opportunities
  readonly directCosts: number; // $ direct costs incurred
  readonly totalCost: number; // $ total cost of intervention
}

export interface BenefitRealized {
  readonly benefitType: BenefitType;
  readonly benefitValue: number; // $ value of benefit
  readonly benefitTimeframe: string; // Over what period benefit applies
  readonly benefitCertainty: number; // 0-100% confidence in benefit
}

export type BenefitType =
  | "risk_reduction" // Value of reduced risk
  | "cost_savings" // Direct cost savings
  | "revenue_protection" // Protected revenue
  | "compliance_benefit" // Avoided compliance issues
  | "learning_value" // Value of knowledge gained
  | "reputation_protection"; // Protected reputation value

export interface LessonLearned {
  readonly lessonCategory: LessonCategory;
  readonly lessonDescription: string;
  readonly actionableInsight: string;
  readonly implementationPlan?: string;
  readonly responsibleParty?: ProvenanceAuthority;
}

export type LessonCategory =
  | "ai_improvement" // How to improve AI system
  | "process_improvement" // How to improve processes
  | "training_need" // Human training requirements
  | "system_design" // System architecture improvements
  | "governance_update" // Governance policy updates
  | "monitoring_enhancement"; // Better monitoring needed

/**
 * Authority restoration - procedures for restoring AI autonomy after human intervention
 */
export interface AuthorityRestoration {
  readonly restorationProtocols: RestorationProtocol[];
  readonly validationRequirements: ValidationRequirement[];
  readonly gradualRestoration: GradualRestorationPlan;
  readonly failsafeMonitoring: FailsafeMonitoring;
}

export interface RestorationProtocol {
  readonly protocolId: string;
  readonly protocolName: string;
  readonly triggeringConditions: RestorationTrigger[];
  readonly restorationSteps: RestorationStep[];
  readonly timeRequirements: RestorationTimeRequirements;
  readonly authorityRequired: ProvenanceAuthority[];
}

export interface RestorationTrigger {
  readonly triggerType: RestorationTriggerType;
  readonly triggerCriteria: TriggerCriteria;
  readonly validationMethod: string;
  readonly automaticTrigger: boolean;
}

export type RestorationTriggerType =
  | "time_based" // Restore after time period
  | "condition_based" // Restore when conditions met
  | "performance_based" // Restore when performance achieved
  | "stakeholder_approval" // Restore when stakeholders approve
  | "system_validation" // Restore when system validates readiness
  | "manual_authorization"; // Restore when manually authorized

export interface TriggerCriteria {
  readonly criteriaDescription: string;
  readonly measurableMetrics: MeasurableMetric[];
  readonly subjectiveAssessments: SubjectiveAssessment[];
  readonly externalValidations: ExternalValidation[];
}

export interface MeasurableMetric {
  readonly metricName: string;
  readonly targetValue: number;
  readonly currentValue?: number;
  readonly units: string;
  readonly measurementMethod: string;
}

export interface SubjectiveAssessment {
  readonly assessmentName: string;
  readonly assessor: ProvenanceAuthority;
  readonly assessmentCriteria: string;
  readonly requiredRating: string;
}

export interface ExternalValidation {
  readonly validatorName: string;
  readonly validationType: ValidationType;
  readonly validationScope: string;
  readonly validationTimeframe: number; // Hours to complete validation
}

export type ValidationType =
  | "third_party_audit" // External audit required
  | "peer_review" // Review by peer systems
  | "compliance_check" // Regulatory compliance verification
  | "stakeholder_signoff" // Stakeholder approval
  | "technical_certification"; // Technical certification

export interface RestorationStep {
  readonly stepNumber: number;
  readonly stepName: string;
  readonly stepDescription: string;
  readonly stepDuration: number; // Minutes to complete step
  readonly stepDependencies: string[]; // Previous steps that must complete
  readonly rollbackPossible: boolean; // Can this step be undone?
}

export interface RestorationTimeRequirements {
  readonly minimumWaitTime: number; // Minimum seconds before restoration
  readonly maximumWaitTime?: number; // Maximum seconds before forced restoration
  readonly typicalDuration: number; // Expected seconds for restoration
  readonly urgencyFactors: UrgencyFactor[]; // Factors that affect timing
}

export interface UrgencyFactor {
  readonly factorName: string;
  readonly urgencyMultiplier: number; // Multiplier for restoration speed
  readonly conditions: string; // When this factor applies
}

export interface ValidationRequirement {
  readonly requirementId: string;
  readonly requirementType: ValidationRequirementType;
  readonly validationScope: ValidationScope;
  readonly acceptanceCriteria: AcceptanceCriteria;
  readonly validationMethod: ValidationMethod;
}

export type ValidationRequirementType =
  | "safety_validation" // Confirm system safety
  | "performance_validation" // Confirm performance standards
  | "compliance_validation" // Confirm regulatory compliance
  | "stakeholder_validation" // Confirm stakeholder acceptance
  | "technical_validation" // Confirm technical readiness
  | "operational_validation"; // Confirm operational readiness

export interface ValidationScope {
  readonly scopeName: string;
  readonly systemComponents: string[]; // Which systems must be validated
  readonly functionalAreas: string[]; // Which functions must be validated
  readonly performanceBounds: PerformanceBound[]; // Performance requirements
}

export interface PerformanceBound {
  readonly metricName: string;
  readonly minimumValue?: number;
  readonly maximumValue?: number;
  readonly targetValue: number;
  readonly tolerancePercent: number; // Acceptable deviation percentage
}

export interface AcceptanceCriteria {
  readonly criteriaName: string;
  readonly passingThreshold: number;
  readonly measurementUnit: string;
  readonly testDuration: number; // Minutes of testing required
  readonly failureConsequence: FailureConsequence;
}

export interface FailureConsequence {
  readonly consequenceType: ConsequenceType;
  readonly remedialAction: string;
  readonly retestRequired: boolean;
  readonly escalationPath?: string;
}

export interface ValidationMethod {
  readonly methodName: string;
  readonly methodType: ValidationMethodType;
  readonly automationLevel: AutomationLevel;
  readonly validationDuration: number; // Minutes to complete validation
  readonly validationCost: number; // $ cost of validation
}

export type ValidationMethodType =
  | "automated_testing" // Automated test suite
  | "simulation_testing" // Simulation-based validation
  | "live_testing" // Live system testing
  | "expert_review" // Manual expert evaluation
  | "stakeholder_review" // Review by affected stakeholders
  | "compliance_audit"; // Formal compliance audit

export interface GradualRestorationPlan {
  readonly restorationPhases: RestorationPhase[];
  readonly phaseGating: PhaseGating;
  readonly rollbackTriggers: RollbackTrigger[];
  readonly monitoringIntensity: MonitoringIntensity[];
}

export interface RestorationPhase {
  readonly phaseNumber: number;
  readonly phaseName: string;
  readonly authorityRestored: AuthorityScope;
  readonly phaseDuration: number; // Minutes for this phase
  readonly successCriteria: SuccessCriteria[];
  readonly riskMitigation: RiskMitigation[];
}

export interface SuccessCriteria {
  readonly criteriaName: string;
  readonly measuredValue: string; // What is measured
  readonly successThreshold: number; // Threshold for success
  readonly measurementFrequency: number; // Seconds between measurements
}

export interface RiskMitigation {
  readonly riskName: string;
  readonly mitigationAction: string;
  readonly triggerCondition: string;
  readonly automaticActivation: boolean;
}

export interface PhaseGating {
  readonly gateType: GateType;
  readonly gateApproval: GateApproval[];
  readonly gateTimelimits: GateTimeLimit;
  readonly gateFailureAction: GateFailureAction;
}

export type GateType =
  | "automatic" // Automatic progression based on metrics
  | "manual" // Manual approval required
  | "hybrid" // Combination of automatic and manual
  | "conditional"; // Conditional based on external factors

export interface GateApproval {
  readonly approverRole: SupervisorRole;
  readonly approvalCriteria: string;
  readonly approvalTimeframe: number; // Hours to provide approval
  readonly alternateApprovers: string[]; // Backup approvers
}

export interface GateTimeLimit {
  readonly minimumPhaseTime: number; // Minimum minutes in phase
  readonly maximumPhaseTime: number; // Maximum minutes in phase
  readonly timeoutAction: TimeoutAction;
}

export type TimeoutAction =
  | "auto_advance" // Automatically advance to next phase
  | "auto_rollback" // Automatically rollback to previous phase
  | "manual_review" // Require manual review
  | "escalate"; // Escalate to higher authority

export interface GateFailureAction {
  readonly rollbackToPhase: number; // Which phase to rollback to
  readonly waitPeriod: number; // Minutes to wait before retry
  readonly maxRetries: number; // Maximum retry attempts
  readonly escalationRequired: boolean;
}

export interface RollbackTrigger {
  readonly triggerId: string;
  readonly triggerCondition: string;
  readonly triggerSeverity: TriggerSeverity;
  readonly rollbackTarget: RollbackTarget;
  readonly automaticRollback: boolean;
}

export type TriggerSeverity =
  | "minor" // Rollback to previous phase
  | "moderate" // Rollback multiple phases
  | "major" // Rollback to human control
  | "critical"; // Emergency stop all operations

export interface RollbackTarget {
  readonly targetState: RollbackTargetState;
  readonly targetPhase?: number; // Specific phase number
  readonly safetyActions: string[]; // Actions to ensure safety
  readonly stakeholderNotification: boolean;
}

export type RollbackTargetState =
  | "previous_phase" // Go back to previous restoration phase
  | "initial_state" // Return to pre-restoration state
  | "safe_state" // Go to predetermined safe configuration
  | "manual_control"; // Transfer to human control

export interface MonitoringIntensity {
  readonly phaseNumber: number;
  readonly monitoringFrequency: number; // Seconds between checks
  readonly alertThresholds: AlertThreshold[];
  readonly humanOversightLevel: SupervisionLevel;
  readonly automaticInterventions: AutomaticIntervention[];
}

export interface AutomaticIntervention {
  readonly interventionName: string;
  readonly triggerCondition: string;
  readonly interventionAction: string;
  readonly interventionDelay: number; // Seconds delay before intervention
  readonly humanNotification: boolean;
}

export interface FailsafeMonitoring {
  readonly monitoringActive: boolean;
  readonly monitoringSystems: MonitoringSystem[];
  readonly escalationMatrix: EscalationMatrix;
  readonly emergencyProtocols: EmergencyProtocol[];
}

export interface MonitoringSystem {
  readonly systemName: string;
  readonly monitoringScope: string[];
  readonly alertingCapability: AlertingCapability;
  readonly redundancyLevel: RedundancyLevel;
  readonly failureDetection: FailureDetection;
}

export interface AlertingCapability {
  readonly alertMethods: ContactMethod[];
  readonly alertLatency: number; // Milliseconds to alert
  readonly alertReliability: number; // 0-100% reliability
  readonly escalationSupport: boolean;
}

export type RedundancyLevel =
  | "single_point" // Single monitoring system
  | "backup" // Primary + backup system
  | "triple" // Three independent systems
  | "distributed"; // Multiple distributed systems

export interface FailureDetection {
  readonly detectionMethod: string[];
  readonly falsePositiveRate: number; // Percentage
  readonly falseNegativeRate: number; // Percentage
  readonly detectionLatency: number; // Seconds to detect failure
}

export interface EscalationMatrix {
  readonly matrixName: string;
  readonly escalationLevels: EscalationLevel[];
  readonly crossReferenceRules: CrossReferenceRule[];
}

export interface EscalationLevel {
  readonly levelNumber: number;
  readonly levelName: string;
  readonly authority: ProvenanceAuthority[];
  readonly responseTime: number; // Minutes required response
  readonly capabilities: EscalationCapability[];
}

export interface EscalationCapability {
  readonly capabilityName: string;
  readonly capabilityScope: string;
  readonly activationMethod: string;
  readonly resourcesRequired: string[];
}

export interface CrossReferenceRule {
  readonly ruleName: string;
  readonly condition: string;
  readonly escalationModifier: EscalationModifier;
}

export type EscalationModifier =
  | "accelerate" // Faster escalation
  | "decelerate" // Slower escalation
  | "bypass" // Skip escalation levels
  | "parallel"; // Multiple simultaneous escalations

export interface EmergencyProtocol {
  readonly protocolName: string;
  readonly activationTriggers: EmergencyTrigger[];
  readonly protocolSteps: EmergencyStep[];
  readonly protocolAuthority: ProvenanceAuthority[];
  readonly protocolScope: EmergencyScope;
}

export interface EmergencyTrigger {
  readonly triggerName: string;
  readonly triggerSeverity: EmergencySeverity;
  readonly automaticActivation: boolean;
  readonly humanConfirmation: boolean;
  readonly triggerOverride: boolean;
}

export type EmergencySeverity =
  | "elevated" // Heightened monitoring
  | "high" // Significant response required
  | "critical" // Major response required
  | "catastrophic"; // Maximum response required

export interface EmergencyStep {
  readonly stepNumber: number;
  readonly stepName: string;
  readonly stepAction: string;
  readonly stepDuration: number; // Seconds to complete
  readonly stepParallel: boolean; // Can be done in parallel
  readonly stepCritical: boolean; // Must complete successfully
}

export interface EmergencyScope {
  readonly affectedSystems: string[];
  readonly affectedStakeholders: string[];
  readonly geographicImpact: GeographicScope;
  readonly temporalImpact: TemporalScope;
}

/**
 * Trust handoff - protocols for transferring authority between human and AI
 */
export interface TrustHandoff {
  readonly handoffProtocols: HandoffProtocol[];
  readonly trustCalibration: TrustCalibration;
  readonly competencyMapping: CompetencyMapping;
  readonly learningIntegration: LearningIntegration;
}

export interface HandoffProtocol {
  readonly protocolId: string;
  readonly protocolName: string;
  readonly handoffDirection: HandoffDirection;
  readonly handoffTriggers: HandoffTrigger[];
  readonly handoffProcess: HandoffProcess;
  readonly qualityAssurance: QualityAssurance;
}

export type HandoffDirection =
  | "human_to_ai" // Transferring control from human to AI
  | "ai_to_human" // Transferring control from AI to human
  | "collaborative"; // Establishing joint control

export interface HandoffTrigger {
  readonly triggerName: string;
  readonly triggerType: HandoffTriggerType;
  readonly triggerCondition: string;
  readonly urgencyLevel: HandoffUrgency;
  readonly stakeholderNotification: boolean;
}

export type HandoffTriggerType =
  | "scheduled" // Planned handoff at scheduled time
  | "performance_based" // Handoff based on performance metrics
  | "workload_based" // Handoff based on workload levels
  | "expertise_based" // Handoff based on expertise requirements
  | "emergency_based" // Handoff due to emergency situation
  | "preference_based"; // Handoff based on human preference

export type HandoffUrgency =
  | "routine" // Standard handoff timing
  | "expedited" // Faster than normal handoff
  | "immediate" // Emergency handoff
  | "gradual"; // Slower, careful handoff

export interface HandoffProcess {
  readonly processSteps: HandoffStep[];
  readonly informationTransfer: InformationTransfer;
  readonly competencyVerification: CompetencyVerification;
  readonly authorityConfirmation: AuthorityConfirmation;
}

export interface HandoffStep {
  readonly stepNumber: number;
  readonly stepName: string;
  readonly stepDescription: string;
  readonly responsibleParty: "human" | "ai" | "system";
  readonly stepDuration: number; // Seconds to complete
  readonly verificationRequired: boolean;
}

export interface InformationTransfer {
  readonly transferScope: InformationScope;
  readonly transferMethod: TransferMethod[];
  readonly informationValidation: InformationValidation;
  readonly knowledgeGaps: KnowledgeGap[];
}

export interface InformationScope {
  readonly currentState: StateInformation;
  readonly historicalContext: HistoricalContext;
  readonly futureProjections: FutureProjection[];
  readonly stakeholderStatus: StakeholderStatus[];
}

export interface StateInformation {
  readonly systemStatus: SystemStateSnapshot;
  readonly activeProcesses: ActiveProcess[];
  readonly pendingActions: PendingAction[];
  readonly constraints: ActiveConstraint[];
}

export interface ActiveProcess {
  readonly processId: string;
  readonly processName: string;
  readonly processStatus: ProcessStatus;
  readonly expectedCompletion: string; // ISO timestamp
  readonly processOwner: "human" | "ai";
}

export type ProcessStatus =
  | "running" // Process actively executing
  | "paused" // Process temporarily paused
  | "waiting" // Process waiting for input/condition
  | "completing" // Process in final stages
  | "error"; // Process encountered error

export interface PendingAction {
  readonly actionId: string;
  readonly actionType: string;
  readonly scheduledTime: string; // ISO timestamp
  readonly actionPriority: ActionPriority;
  readonly actionOwner: "human" | "ai";
}

export type ActionPriority =
  | "low" // Can be delayed if needed
  | "normal" // Standard priority
  | "high" // Should be prioritized
  | "critical"; // Must be executed on time

export interface ActiveConstraint {
  readonly constraintId: string;
  readonly constraintType: ConstraintType;
  readonly constraintStatus: ConstraintStatus;
  readonly expirationTime?: string; // ISO timestamp
}

export type ConstraintStatus =
  | "active" // Constraint currently enforced
  | "suspended" // Constraint temporarily suspended
  | "violated" // Constraint currently violated
  | "expired"; // Constraint no longer valid

export interface HistoricalContext {
  readonly recentDecisions: RecentDecision[];
  readonly performanceTrends: PerformanceTrend[];
  readonly anomalousEvents: AnomalousEvent[];
  readonly learningHistory: LearningRecord[];
}

export interface RecentDecision {
  readonly decisionId: string;
  readonly decisionTime: string; // ISO timestamp
  readonly decisionMaker: "human" | "ai";
  readonly decisionOutcome: DecisionOutcome;
  readonly impactAssessment: ImpactAssessment;
}

export type DecisionOutcome =
  | "successful" // Decision achieved intended result
  | "partially_successful" // Decision partially achieved result
  | "unsuccessful" // Decision failed to achieve result
  | "pending" // Decision outcome not yet determined
  | "superseded"; // Decision superseded by other events

export interface ImpactAssessment {
  readonly financialImpact: number; // $ impact of decision
  stakeholderImpact: StakeholderImpact[];
  readonly operationalImpact: string;
  readonly riskImpact: RiskLevel;
}

export interface PerformanceTrend {
  readonly metricName: string;
  readonly trendDirection: TrendDirection;
  readonly trendStrength: TrendStrength;
  readonly trendDuration: string; // How long trend has persisted
  readonly trendPrediction: string; // Expected future trend
}

export type TrendStrength =
  | "weak" // Slight trend, high variability
  | "moderate" // Clear trend, some variability
  | "strong" // Strong trend, low variability
  | "very_strong"; // Very strong trend, very low variability

export interface AnomalousEvent {
  readonly eventId: string;
  readonly eventTime: string; // ISO timestamp
  readonly anomalyType: AnomalyType;
  readonly anomalySeverity: AnomalySeverity;
  readonly rootCause?: string; // Known or suspected root cause
  readonly resolution?: string; // How anomaly was resolved
}

export type AnomalyType =
  | "performance" // Performance outside normal range
  | "behavioral" // Unexpected system behavior
  | "data" // Data quality or consistency issues
  | "external" // External factor causing anomaly
  | "unknown"; // Anomaly of unknown origin

export interface LearningRecord {
  readonly learningId: string;
  readonly learningTime: string; // ISO timestamp
  readonly learningSource: LearningSource;
  readonly knowledgeGained: string;
  readonly applicationStatus: ApplicationStatus;
}

export type LearningSource =
  | "human_feedback" // Learning from human input
  | "outcome_analysis" // Learning from decision outcomes
  | "error_analysis" // Learning from errors/failures
  | "pattern_recognition" // Learning from data patterns
  | "external_knowledge"; // Learning from external sources

export type ApplicationStatus =
  | "applied" // Learning has been incorporated
  | "pending" // Learning waiting to be incorporated
  | "testing" // Learning being tested
  | "rejected"; // Learning deemed not applicable

export interface StakeholderStatus {
  readonly stakeholderName: string;
  readonly currentSatisfaction: SatisfactionLevel;
  readonly recentInteractions: StakeholderInteraction[];
  readonly communicationPreferences: CommunicationPreference[];
  readonly pendingIssues: PendingIssue[];
}

export interface StakeholderInteraction {
  readonly interactionTime: string; // ISO timestamp
  readonly interactionType: InteractionType;
  readonly interactionOutcome: InteractionOutcome;
  readonly followupRequired: boolean;
}

export type InteractionType =
  | "information_request" // Stakeholder requested information
  | "complaint" // Stakeholder raised complaint
  | "suggestion" // Stakeholder provided suggestion
  | "approval_request" // Requested stakeholder approval
  | "status_update"; // Provided status update

export type InteractionOutcome =
  | "resolved" // Interaction resolved satisfactorily
  | "pending" // Interaction still being addressed
  | "escalated" // Interaction escalated to higher level
  | "deferred"; // Interaction deferred to later time

export interface CommunicationPreference {
  readonly preferenceType: "frequency" | "method" | "format" | "timing";
  readonly preferenceValue: string;
  readonly preferenceStrength: "required" | "preferred" | "acceptable";
}

export interface PendingIssue {
  readonly issueId: string;
  readonly issueType: string;
  readonly issueSeverity: IssueSeverity;
  readonly issueDeadline?: string; // ISO timestamp
  readonly responsibleParty: "human" | "ai";
}

export type IssueSeverity =
  | "informational" // Information only, no action required
  | "low" // Low priority, can be addressed later
  | "medium" // Medium priority, should be addressed soon
  | "high" // High priority, needs prompt attention
  | "critical"; // Critical priority, needs immediate attention

export interface TransferMethod {
  readonly methodName: string;
  readonly methodType: TransferMethodType;
  readonly transferDuration: number; // Seconds to complete transfer
  readonly transferReliability: number; // 0-100% reliability
  readonly verificationMethod: string;
}

export type TransferMethodType =
  | "structured_briefing" // Formal briefing document/session
  | "interactive_handoff" // Real-time interactive handoff
  | "automated_summary" // System-generated summary
  | "documentation_review" // Review of existing documentation
  | "knowledge_base" // Access to knowledge base/wiki
  | "mentor_pairing"; // Pairing with experienced party

export interface InformationValidation {
  readonly validationRequired: boolean;
  readonly validationMethods: ValidationMethodType[];
  readonly validationCriteria: ValidationCriteria[];
  readonly validationTimeframe: number; // Minutes to complete validation
}

export interface ValidationCriteria {
  readonly criteriaName: string;
  readonly criteriaDescription: string;
  readonly passingScore: number; // Minimum score to pass
  readonly weightingFactor: number; // Relative importance weight
}

export interface KnowledgeGap {
  readonly gapId: string;
  readonly gapDescription: string;
  readonly gapSeverity: GapSeverity;
  readonly mitigationStrategy: GapMitigation[];
  readonly fillingTimeframe?: number; // Days to fill gap
}

export type GapSeverity =
  | "minor" // Small gap, minimal impact
  | "moderate" // Noticeable gap, some impact
  | "major" // Significant gap, substantial impact
  | "critical"; // Critical gap, major impact

export interface GapMitigation {
  readonly mitigationName: string;
  readonly mitigationType: MitigationType;
  readonly mitigationEffectiveness: number; // 0-100% effectiveness
  readonly implementationTime: number; // Hours to implement
}

export type MitigationType =
  | "additional_briefing" // Provide more briefing
  | "expert_consultation" // Consult with expert
  | "gradual_exposure" // Gradually expose to responsibility
  | "safety_net" // Provide safety monitoring
  | "documentation" // Create additional documentation
  | "training"; // Provide specific training

export interface CompetencyVerification {
  readonly verificationRequired: boolean;
  readonly competencyAreas: CompetencyArea[];
  readonly verificationMethods: CompetencyVerificationMethod[];
  readonly passingCriteria: CompetencyPassingCriteria;
}

export interface CompetencyArea {
  readonly areaName: string;
  readonly areaDescription: string;
  readonly requiredLevel: CompetencyLevel;
  readonly verificationPriority: VerificationPriority;
}

export type CompetencyLevel =
  | "basic" // Basic understanding sufficient
  | "intermediate" // Solid understanding required
  | "advanced" // Deep understanding required
  | "expert"; // Expert-level understanding required

export type VerificationPriority =
  | "optional" // Verification is optional
  | "recommended" // Verification recommended but not required
  | "required" // Verification required before handoff
  | "critical"; // Verification absolutely critical

export interface CompetencyVerificationMethod {
  readonly methodName: string;
  readonly methodType: CompetencyVerificationMethodType;
  readonly methodDuration: number; // Minutes to complete
  readonly methodObjectivity: number; // 0-100% objectivity
}

export type CompetencyVerificationMethodType =
  | "knowledge_test" // Written or verbal test
  | "practical_exercise" // Hands-on practical test
  | "simulation" // Simulation-based test
  | "peer_review" // Review by peer or expert
  | "self_assessment" // Self-evaluation questionnaire
  | "observation"; // Observing performance

export interface CompetencyPassingCriteria {
  readonly overallPassingScore: number; // Overall minimum score
  readonly individualAreaMinimums: AreaMinimum[]; // Per-area minimums
  retestingAllowed: boolean; // Can retake if failed
  readonly maxRetests?: number; // Maximum number of retests
}

export interface AreaMinimum {
  readonly areaName: string;
  readonly minimumScore: number;
  readonly criticalArea: boolean; // Must pass this area
}

export interface AuthorityConfirmation {
  readonly confirmationRequired: boolean;
  readonly confirmationMethods: AuthorityConfirmationMethod[];
  readonly authorityScopeDefinition: AuthorityScope;
  readonly confirmationValidation: ConfirmationValidation;
}

export interface AuthorityConfirmationMethod {
  readonly methodName: string;
  readonly methodType: AuthorityConfirmationMethodType;
  readonly authenticationLevel: AuthenticationLevel;
  readonly witnessRequired: boolean;
}

export type AuthorityConfirmationMethodType =
  | "verbal_acknowledgment" // Verbal confirmation
  | "written_agreement" // Written/signed agreement
  | "digital_signature" // Cryptographic signature
  | "biometric_confirmation" // Biometric authentication
  | "multi_party_confirmation"; // Multiple people confirm

export interface ConfirmationValidation {
  readonly validationMethods: string[];
  readonly validationTimeframe: number; // Hours validation remains valid
  readonly revalidationTriggers: RevalidationTrigger[];
}

export interface RevalidationTrigger {
  readonly triggerName: string;
  readonly triggerCondition: string;
  readonly triggerUrgency: HandoffUrgency;
  readonly automaticTrigger: boolean;
}

export interface QualityAssurance {
  readonly qaRequired: boolean;
  readonly qaCheckpoints: QACheckpoint[];
  readonly qaMetrics: QAMetric[];
  readonly qaReporting: QAReporting;
}

export interface QACheckpoint {
  readonly checkpointName: string;
  readonly checkpointTiming: CheckpointTiming;
  readonly checkpointCriteria: QACheckpointCriteria[];
  readonly checkpointActions: QACheckpointAction[];
}

export type CheckpointTiming =
  | "pre_handoff" // Before handoff begins
  | "during_handoff" // During handoff process
  | "post_handoff" // After handoff completes
  | "periodic"; // Ongoing periodic checks

export interface QACheckpointCriteria {
  readonly criteriaName: string;
  readonly expectedOutcome: string;
  readonly measurementMethod: string;
  readonly acceptanceThreshold: number;
}

export interface QACheckpointAction {
  readonly actionName: string;
  readonly actionTrigger: string; // What triggers this action
  readonly actionType: QAActionType;
  readonly actionOwner: "human" | "ai" | "system";
}

export type QAActionType =
  | "documentation" // Document findings
  | "correction" // Correct identified issues
  | "escalation" // Escalate to higher authority
  | "rollback" // Rollback handoff process
  | "notification"; // Notify relevant parties

export interface QAMetric {
  readonly metricName: string;
  readonly metricDescription: string;
  readonly measurementFrequency: QAMeasurementFrequency;
  readonly benchmarkValue: number; // Target/baseline value
  readonly improvementTarget: number; // Desired improvement
}

export type QAMeasurementFrequency =
  | "per_handoff" // Measured for each handoff
  | "daily" // Measured daily
  | "weekly" // Measured weekly
  | "monthly" // Measured monthly
  | "quarterly"; // Measured quarterly

export interface QAReporting {
  readonly reportingRequired: boolean;
  readonly reportingFrequency: QAReportingFrequency;
  readonly reportingAudience: ReportingAudience[];
  readonly reportingFormat: ReportingFormat[];
}

export type QAReportingFrequency =
  | "immediate" // Report immediately after handoff
  | "daily" // Daily reports
  | "weekly" // Weekly reports
  | "monthly" // Monthly reports
  | "quarterly" // Quarterly reports
  | "annual"; // Annual reports

export interface ReportingAudience {
  readonly audienceName: string;
  readonly audienceRole: SupervisorRole;
  readonly reportingLevel: ReportingLevel;
  readonly customization?: string; // Any custom reporting needs
}

export type ReportingLevel =
  | "summary" // High-level summary only
  | "detailed" // Detailed analysis and metrics
  | "comprehensive" // Full comprehensive report
  | "exception"; // Only exceptions/issues

export interface ReportingFormat {
  readonly formatName: string;
  readonly formatType: ReportingFormatType;
  readonly automationLevel: AutomationLevel;
  readonly deliveryMethod: ReportDeliveryMethod[];
}

export type ReportingFormatType =
  | "dashboard" // Interactive dashboard
  | "document" // Written document/PDF
  | "presentation" // Slide presentation
  | "data_export" // Raw data export
  | "visualization"; // Charts and graphs

export interface ReportDeliveryMethod {
  readonly method: "email" | "slack" | "dashboard" | "api" | "file_share";
  readonly schedule?: string; // Delivery schedule if applicable
  readonly recipients: string[]; // Who receives this delivery
}

export interface TrustCalibration {
  readonly calibrationMethods: TrustCalibrationMethod[];
  readonly trustMetrics: TrustMetric[];
  readonly calibrationFrequency: CalibrationFrequency;
  readonly trustBoundaries: TrustBoundary[];
}

export interface TrustCalibrationMethod {
  readonly methodName: string;
  readonly methodType: TrustCalibrationMethodType;
  readonly calibrationScope: CalibrationScope;
  readonly methodEffectiveness: number; // 0-100% effectiveness rating
}

export type TrustCalibrationMethodType =
  | "performance_tracking" // Track performance over time
  | "confidence_comparison" // Compare stated vs actual confidence
  | "outcome_analysis" // Analyze decision outcomes
  | "stakeholder_feedback" // Gather stakeholder feedback
  | "peer_benchmarking" // Compare to peer systems
  | "expert_evaluation"; // Expert evaluation of trustworthiness

export interface CalibrationScope {
  readonly scopeName: string;
  readonly decisionDomains: string[]; // Which domains to calibrate
  readonly timeHorizon: string; // Time period for calibration
  readonly stakeholderGroups: string[]; // Which stakeholders involved
}

export interface TrustMetric {
  readonly metricName: string;
  readonly metricType: TrustMetricType;
  readonly measurementMethod: string;
  readonly benchmarkValue: number;
  readonly currentValue?: number;
  readonly trendDirection: TrendDirection;
}

export type TrustMetricType =
  | "reliability" // How often decisions are correct
  | "consistency" // How consistent decision-making is
  | "transparency" // How well decisions are explained
  | "responsiveness" // How quickly decisions are made
  | "adaptability" // How well system adapts to feedback
  | "alignment"; // How well decisions align with values

export type CalibrationFrequency =
  | "continuous" // Continuous real-time calibration
  | "daily" // Daily calibration updates
  | "weekly"; // Weekly calibration

/**
 * Competency mapping - linking human and AI competencies
 * Defines how skills and responsibilities transition during trust handoffs
 */
export interface CompetencyMapping {
  readonly competencyAreas: CompetencyArea[];
  readonly mappingRules: MappingRule[];
  readonly mappingValidation: MappingValidation;
}

export interface MappingRule {
  readonly ruleId: string;
  readonly sourceCompetency: string; // e.g., "AI:analysis"
  readonly targetCompetency: string; // e.g., "human:verification"
  readonly transferConditions: string; // Semantic conditions for mapping
  readonly rulePriority: number; // Order of execution
}

export interface MappingValidation {
  readonly validationMethods: string[]; // e.g., ["peer_review","test_case"]
  readonly validationThreshold: number; // % of successful validations required
  readonly validationFrequency: CalibrationFrequency;
}

/**
 * Learning integration - capturing lessons and evolving system behavior
 * Ensures AI adapts based on human feedback and system outcomes
 */
export interface LearningIntegration {
  readonly learningRecords: LearningRecord[];
  readonly integrationMethods: IntegrationMethod[];
  readonly updateSchedule: IntegrationSchedule;
}

export interface IntegrationMethod {
  readonly methodId: string;
  readonly methodName: string; // e.g., "automated_retraining"
  readonly methodType: IntegrationMethodType;
  readonly parameters: Record<string, unknown>;
  readonly effectivenessMetric: number; // % improvement measured
}

export type IntegrationMethodType =
  | "automated_retraining"
  | "human_in_the_loop"
  | "rule_adjustment"
  | "model_fine_tuning"
  | "policy_update";

export interface IntegrationSchedule {
  readonly scheduleType: "continuous" | "batch" | "manual";
  readonly interval: string; // ISO duration or cron expression
  readonly nextRun?: string; // ISO timestamp of next integration
  readonly stakeholdersNotified: boolean;
}

/**
 * Trust boundaries - constraints defining acceptable system behavior
 * Encapsulates guardrails for AI autonomy across domains
 */
export interface TrustBoundary {
  readonly boundaryId: string;
  readonly domain: string; // e.g., "financial_execution"
  readonly lowerLimit: number; // Minimum acceptable threshold
  readonly upperLimit: number; // Maximum acceptable threshold
  readonly enforcementLevel: EnforcementLevel;
  readonly breachAction: BreachAction;
}

export type BreachAction =
  | "warning"
  | "automatic_pause"
  | "rollback"
  | "human_override_required"
  | "system_shutdown";

/**
 * End of AIMP Core Type Definitions v2.0
 *
 * This architecture reinforces AIMP’s truths:
 *   - Explainability: types articulate narrative and lineage
 *   - Accountability: each interface traces authority and context
 *   - Reversibility: human and system pathways preserve control
 *
 * Through semantic naming, hierarchical structure, and embedded proof,
 * every type is a living contract of trust, guiding developers and end-users
 * with clarity, confidence, and compositional freedom.
 */
