/**
 * Mock Data Infrastructure
 *
 * Comprehensive mock data generators for AIMP frontend development.
 * Enables standalone operation without backend dependencies.
 *
 * Design Principles:
 * - **Realistic**: Data patterns match production scenarios with AIMP constants
 * - **Deterministic**: Seeded randomness for reproducible demos
 * - **Type-safe**: All responses match established schemas
 * - **Temporal**: Time-based decay and freshness simulation using BEHAVIOR constants
 * - **Agent-aware**: Persona-specific decision patterns
 * - **Trust-aware**: Trust mathematics and decay calculations
 *
 * Usage:
 * - Development: Full offline functionality
 * - Demos: Consistent, impressive data
 * - Testing: Predictable scenarios with realistic thresholds
 * - Previews: No backend required
 *
 * @see PRD Section 8 - API Contracts
 */

import type {
  AgentPersona,
  TrustMathematics,
  TrustGrade,
  OperationalStatus,
  FlowDirection,
} from "@/lib/types/core";
import type { AgentDecision } from "@/components/intelligence/AgentCard";
import type {
  AgentMessage,
  SuggestedQuestion,
  AgentHealthStatus,
} from "@/components/intelligence/AgentSidebar";
import type {
  SolanaTransaction,
  ProgramInstruction,
  TransactionStatus,
} from "@/components/intelligence/TxReceipt";
import type { HealthStatus } from "@/components/primitives/HealthDot";
import { PERFORMANCE, BEHAVIOR } from "@/lib/constants";

// ============================================================================
// SEEDED RANDOM UTILITIES
// ============================================================================

/**
 * Seeded pseudo-random number generator (Mulberry32)
 * Ensures deterministic results for demos
 */
function createSeededRandom(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const seededRandom = createSeededRandom(42); // "Answer to everything"

function randomInt(min: number, max: number): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return seededRandom() * (max - min) + min;
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(seededRandom() * array.length)];
}

function randomBoolean(probability = 0.5): boolean {
  return seededRandom() < probability;
}

// ============================================================================
// AIMP-SPECIFIC UTILITIES (Refinements #2, #3, #4)
// ============================================================================

/**
 * Calculate trust grade from confidence using PERFORMANCE thresholds
 * (Refinement #3: TrustGrade from thresholds)
 */
function calculateTrustGrade(confidence: number): TrustGrade {
  if (confidence >= PERFORMANCE.trust.excellent) return "excellent";
  if (confidence >= PERFORMANCE.trust.good) return "good";
  if (confidence >= PERFORMANCE.trust.fair) return "fair";
  if (confidence >= PERFORMANCE.trust.poor) return "poor";
  return "suspect";
}

/**
 * Calculate trust decay percentage based on data age in seconds
 * (Refinement #4: Temporal decay calculation)
 */
function calculateTrustDecay(dataAgeSeconds: number): number {
  const ageMinutes = dataAgeSeconds / 60;
  return Math.pow(BEHAVIOR.trustDecayRate, ageMinutes) * 100;
}

/**
 * Generate full TrustMathematics object for motion testing
 * (Refinement #2: Trust mathematics generation)
 */
function generateTrustMathematics(
  confidence: number,
  sources: string[]
): TrustMathematics {
  const trustGrade = calculateTrustGrade(confidence);
  const witnessCount = sources.length;
  const deviationSigma =
    confidence >= 90 ? randomFloat(0.5, 1.0) : randomFloat(1.0, 2.5);

  return {
    confidenceScore: confidence,
    witnessCount,
    deviationSigma,
    exceedsThreshold: confidence >= PERFORMANCE.trust.good,
    trustGrade,
  };
}

/**
 * Map confidence and health to OperationalStatus
 * (Refinement #5: OperationalStatus types)
 */
function calculateOperationalStatus(
  confidence: number,
  hasError: boolean = false,
  inMaintenance: boolean = false
): OperationalStatus {
  if (inMaintenance) return "maintenance";
  if (hasError) return "fault";
  if (confidence >= PERFORMANCE.trust.excellent) return "optimal";
  if (confidence >= PERFORMANCE.trust.good) return "nominal";
  return "degraded";
}

/**
 * Generate realistic AgentHealthStatus
 * (Refinement #6: AgentHealthStatus generation)
 */
function generateAgentHealth(
  confidence: number,
  isThinking: boolean = false,
  hasError: boolean = false
): AgentHealthStatus {
  if (hasError) return "error";
  if (isThinking) return "thinking";
  if (confidence < PERFORMANCE.trust.fair) return "offline";
  return "online";
}

/**
 * Generate realistic data age using PERFORMANCE.freshness thresholds
 * (Refinement #1: PERFORMANCE constants integration)
 */
function generateRealisticDataAge(): number {
  const options = [
    PERFORMANCE.freshness.critical - randomInt(1, 5), // Fresh: 5-9s
    PERFORMANCE.freshness.critical + randomInt(5, 20), // Recent: 15-30s
    PERFORMANCE.freshness.warning + randomInt(10, 60), // Warning: 70-120s
    PERFORMANCE.freshness.stale + randomInt(30, 120), // Stale: 330-420s
  ];
  return randomChoice(options);
}

/**
 * Determine if error is critical (for EmergencyOverride vs InstantFeedback)
 * (Refinement #7: Enhanced error categorization)
 */
function isCriticalError(errorMessage: string): boolean {
  const criticalKeywords = [
    "critical",
    "safety",
    "emergency",
    "exceeded",
    "blocked",
  ];
  return criticalKeywords.some((keyword) =>
    errorMessage.toLowerCase().includes(keyword)
  );
}

/**
 * Calculate flow direction based on grid activity and battery state
 * (Refinement #17: Flow direction for energy - HIGH VALUE)
 */
function calculateFlowDirection(
  gridExportKw: number,
  batterySOC: number
): FlowDirection {
  const gridThreshold = 0.5; // kW threshold for idle detection

  // Maintenance: Very low or very high SOC
  if (batterySOC < 10 || batterySOC > 95) {
    return "maintenance";
  }

  // Charging: Importing from grid (negative export) and battery not full
  if (gridExportKw < -gridThreshold && batterySOC < 95) {
    return "charging";
  }

  // Discharging: Exporting to grid (positive) and battery not empty
  if (gridExportKw > gridThreshold && batterySOC > 10) {
    return "discharging";
  }

  // Idle: Minimal grid activity
  return "idle";
}

/**
 * Generate component health state for HealthDot visualization
 * (Refinement #18: Component health granularity - HIGH VALUE)
 */
function generateComponentHealth(
  metricValue: number,
  optimalMin: number,
  optimalMax: number,
  degradedMin: number,
  degradedMax: number
): HealthStatus {
  if (metricValue === 0 || metricValue < degradedMin) {
    return "offline";
  }
  if (metricValue < degradedMax) {
    return "critical";
  }
  if (metricValue < optimalMin || metricValue > optimalMax) {
    return "degraded";
  }
  return "healthy";
}

/**
 * Generate agent-specific proof type
 * (Refinement #16: Proof type logic - HIGH VALUE)
 *
 * Proof Type Semantics:
 * - Operations: Signature-based (fast, state attestation)
 * - Markets: Zero-knowledge (privacy, trade validation)
 * - Sentinel: Merkle proofs (audit trails, sensor aggregation)
 * - Governor: Consensus proofs (multi-sig, governance)
 */
function generateAgentProofType(agent: AgentPersona): string {
  const proofPrefixes: Record<AgentPersona, string> = {
    operations: "sig", // Signature-based for state attestations
    markets: "zk", // Zero-knowledge for trade privacy
    sentinel: "merkle", // Merkle trees for sensor aggregation
    governor: "consensus", // Multi-party consensus for governance
  };

  const prefix = proofPrefixes[agent];
  const hash = Array.from({ length: 60 }, () =>
    randomInt(0, 15).toString(16)
  ).join("");

  return `0x${prefix}${hash}`;
}

// ============================================================================
// MOCK DATA GENERATORS
// ============================================================================

/**
 * Generate mock agent decision
 * (Refinement #20: Agent coordination scenarios - MEDIUM VALUE)
 */
export function generateMockAgentDecision(
  agent: AgentPersona,
  options?: {
    timestamp?: Date;
    isActive?: boolean;
    forceViolation?: boolean;
  }
): AgentDecision {
  const timestamp = options?.timestamp || new Date();
  const isActive = options?.isActive ?? randomBoolean(0.3);
  const hasViolation = options?.forceViolation ?? randomBoolean(0.1);

  // Refinement #20: Agent coordination scenarios (20% chance)
  const hasCoordination = randomBoolean(0.2);

  const summaries: Record<AgentPersona, string[]> = {
    operations: [
      "Increased battery discharge rate to meet peak demand surge",
      "Optimized solar panel tilt angle for maximum afternoon capture",
      "Initiated grid sell-back during high wholesale pricing window",
      "Reduced inverter load to prevent thermal stress during heatwave",
      "Activated demand response protocol for grid stabilization event",
    ],
    markets: [
      "Executed token sale at optimal liquidity depth on Jupiter",
      "Adjusted pricing strategy based on competitor analysis",
      "Hedged energy exposure through futures contracts",
      "Increased reserve holdings ahead of volatility forecast",
      "Rebalanced portfolio to optimize yield vs risk ratio",
    ],
    sentinel: [
      "Detected early-stage degradation in Panel Array B efficiency",
      "Scheduled preventive maintenance for inverter cooling system",
      "Identified anomalous vibration pattern in tracker motor 3",
      "Confirmed all safety interlocks operational after storm event",
      "Updated firmware on 12 IoT sensors to patch security vulnerability",
    ],
    governor: [
      "Enforced maximum discharge constraint during low SOC period",
      "Approved emergency override request with full audit trail",
      "Blocked risky trade execution exceeding volatility threshold",
      "Validated compliance with grid interconnection agreement",
      "Triggered safety shutdown due to temperature exceedance",
    ],
  };

  // Multi-agent coordination patterns
  const coordinationPatterns: Record<AgentPersona, string[]> = {
    operations: [
      "Coordinated with Markets agent to optimize battery discharge timing for peak pricing",
      "Synchronized with Sentinel agent on panel maintenance scheduling to minimize revenue impact",
      "Collaborated with Governor agent to balance energy dispatch within safety constraints",
    ],
    markets: [
      "Coordinated with Operations agent for synchronized sell timing during high generation",
      "Aligned with Governor agent on risk-adjusted position sizing for volatility management",
      "Synchronized with Operations agent on battery charge scheduling for arbitrage opportunities",
    ],
    sentinel: [
      "Escalated critical battery temperature alert to Governor agent for safety enforcement",
      "Coordinated with Operations agent to schedule maintenance during low-generation forecast",
      "Collaborated with Governor agent on firmware update approval for security compliance",
    ],
    governor: [
      "Enforced discharge limits in coordination with Operations agent during low SOC event",
      "Approved Markets agent trade execution after multi-sig consensus validation",
      "Coordinated with Sentinel agent on emergency shutdown protocol during sensor anomaly",
    ],
  };

  // Refinement #11: Low-confidence scenarios using PERFORMANCE.trust.fair threshold
  const confidence = hasViolation
    ? randomInt(PERFORMANCE.trust.poor, PERFORMANCE.trust.fair - 5) // 30-45%
    : randomBoolean(0.15)
      ? randomInt(PERFORMANCE.trust.fair, PERFORMANCE.trust.good - 5) // 50-65% (low confidence)
      : randomInt(PERFORMANCE.trust.good, 98); // 70-98% (normal)

  const impact = hasViolation
    ? "critical"
    : confidence >= PERFORMANCE.trust.excellent
      ? randomChoice(["low", "medium", "high"])
      : confidence >= PERFORMANCE.trust.good
        ? randomChoice(["medium", "high"])
        : "high";

  const inMaintenance = agent === "sentinel" ? randomBoolean(0.2) : false;

  // Select base summary, optionally add coordination context
  let summary = randomChoice(summaries[agent]);
  if (hasCoordination) {
    summary = randomChoice(coordinationPatterns[agent]);
  }

  return {
    id: `decision-${agent}-${timestamp.getTime()}`,
    agent,
    summary,
    confidence,
    timestamp: timestamp.toISOString(),
    impact: impact as "low" | "medium" | "high" | "critical",
    isActive,
    constraintsCount: randomInt(3, 8),
    inputsCount: randomInt(5, 15),
    hasConstraintViolations: hasViolation,
    isInMaintenance: inMaintenance,
  };
}

/**
 * Generate mock agent message for Q&A
 */
export function generateMockAgentMessage(
  role: "user" | "agent",
  agent: AgentPersona,
  content: string,
  options?: {
    timestamp?: Date;
    confidence?: number;
    sources?: string[];
    isStreaming?: boolean;
    error?: string;
  }
): AgentMessage {
  const timestamp = options?.timestamp || new Date();

  if (role === "user") {
    return {
      id: `msg-user-${timestamp.getTime()}`,
      role: "user",
      content,
      timestamp: timestamp.toISOString(),
    };
  }

  // Refinement #11: Low-confidence scenarios - 20% chance of low confidence
  const confidence =
    options?.confidence ??
    (randomBoolean(0.2)
      ? randomInt(PERFORMANCE.trust.poor, PERFORMANCE.trust.fair - 5) // 30-45%
      : randomInt(PERFORMANCE.trust.good, 98)); // 70-98%

  // Refinement #12: Enhanced source provenance - realistic source patterns
  const sourcesByAgent: Record<AgentPersona, string[][]> = {
    operations: [
      ["oracle:pyth", "sensor:battery-soc", "sensor:inverter-1"],
      ["sensor:panel-array-a", "sensor:panel-array-b", "weather:noaa"],
      ["oracle:switchboard", "sensor:grid-meter", "forecast:demand"],
    ],
    markets: [
      ["market:jupiter", "oracle:pyth", "oracle:switchboard"],
      ["market:serum", "market:orca", "blockchain:solana-rpc"],
      ["oracle:chainlink", "market:raydium"],
    ],
    sentinel: [
      ["sensor:panel-array-a", "sensor:inverter-1", "sensor:tracker-motor-3"],
      ["weather:noaa", "sensor:temperature", "sensor:vibration"],
      ["sensor:battery-health", "iot:gateway-1", "iot:gateway-2"],
    ],
    governor: [
      ["blockchain:solana-rpc", "audit:compliance-log", "audit:safety-log"],
      [
        "governance:multisig",
        "constraint:soc-minimum",
        "constraint:discharge-limit",
      ],
      ["audit:violation-log", "governance:vote-record"],
    ],
  };

  const sources = options?.sources || randomChoice(sourcesByAgent[agent]);

  // Refinement #8: Streaming state simulation with BEHAVIOR.confidenceDelay timing
  const isStreaming = options?.isStreaming ?? randomBoolean(0.1);

  return {
    id: `msg-agent-${timestamp.getTime()}`,
    role: "agent",
    agent,
    content,
    confidence,
    sources,
    timestamp: timestamp.toISOString(),
    isStreaming,
    error: options?.error,
  };
}

/**
 * Generate mock Solana transaction
 */
export function generateMockTransaction(
  agent: AgentPersona,
  options?: {
    status?: TransactionStatus;
    timestamp?: Date;
    isEmergencyOverride?: boolean;
  }
): SolanaTransaction {
  const timestamp = options?.timestamp || new Date();
  const status =
    options?.status ||
    randomChoice(["success", "success", "success", "pending", "failed"]);
  const isEmergencyOverride =
    options?.isEmergencyOverride ?? randomBoolean(0.05);

  const summaries: Record<AgentPersona, string[]> = {
    operations: [
      "Updated energy dispatch schedule for next 6 hours",
      "Modified battery state-of-charge target parameters",
      "Registered new inverter configuration on-chain",
    ],
    markets: [
      "Executed token swap: 1000 USDC → 245 SOLAR tokens",
      "Deposited 500 SOLAR tokens into liquidity pool",
      "Claimed 12.5 SOLAR in staking rewards",
    ],
    sentinel: [
      "Logged maintenance event for Panel Array B",
      "Updated hardware health attestation on registry",
      "Verified IoT sensor calibration signatures",
    ],
    governor: [
      "Enforced emergency shutdown via governance PDA",
      "Approved constraint override with multi-sig",
      "Logged safety violation to immutable audit trail",
    ],
  };

  const programInstructions = generateMockProgramInstructions(
    agent,
    1 + randomInt(0, 3)
  );

  const signature = generateMockSignature();
  const slot = 123456789 + randomInt(0, 10000);
  const fee = randomInt(5000, 15000); // lamports

  // Refinement #7: Enhanced error categorization
  const error = status === "failed" ? generateMockError() : undefined;
  const isCritical = error ? isCriticalError(error) : false;

  // Refinement #9: Multi-witness proofs - emergency overrides have more witnesses
  const witnessCount = isEmergencyOverride
    ? randomInt(3, 5)
    : isCritical
      ? randomInt(2, 3)
      : 1;

  return {
    signature,
    status,
    blockTime: timestamp.toISOString(),
    slot,
    agent,
    summary: randomChoice(summaries[agent]),
    instructions: programInstructions,
    fee,
    error,
    explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
    isEmergencyOverride,
    witnessCount,
    hasConstraintViolation: status === "failed" ? randomBoolean(0.7) : false,
    isAgentInMaintenance: agent === "sentinel" ? randomBoolean(0.2) : false,
    // Refinement #16: Agent-specific proof types
    zkProofHash: randomBoolean(0.8) ? generateAgentProofType(agent) : undefined,
  };
}

/**
 * Generate mock program instructions
 */
function generateMockProgramInstructions(
  agent: AgentPersona,
  count: number
): ProgramInstruction[] {
  const programsByAgent: Record<
    AgentPersona,
    Array<{ name: string; instruction: string }>
  > = {
    operations: [
      { name: "AssetRegistry", instruction: "UpdateEnergyDispatch" },
      { name: "BatteryController", instruction: "SetStateOfCharge" },
      { name: "GridInterface", instruction: "RegisterSellback" },
    ],
    markets: [
      { name: "JupiterAggregator", instruction: "Swap" },
      { name: "RevenueDistribution", instruction: "ClaimYield" },
      { name: "LiquidityPool", instruction: "AddLiquidity" },
    ],
    sentinel: [
      { name: "MaintenanceLog", instruction: "RecordEvent" },
      { name: "HealthAttestation", instruction: "UpdateStatus" },
      { name: "SensorCalibration", instruction: "VerifySignature" },
    ],
    governor: [
      { name: "SafetyConstraints", instruction: "EnforceLimit" },
      { name: "GovernancePDA", instruction: "ApproveOverride" },
      { name: "AuditTrail", instruction: "LogViolation" },
    ],
  };

  const programs = programsByAgent[agent];
  const instructions: ProgramInstruction[] = [];

  for (let i = 0; i < count; i++) {
    const program = randomChoice(programs);
    instructions.push({
      programName: program.name,
      programId: generateMockProgramId(program.name),
      instruction: program.instruction,
      args: {
        amount: randomInt(100, 10000),
        timestamp: Date.now(),
        authority: generateMockPublicKey(),
      },
      accounts: Array.from({ length: randomInt(2, 5) }, () =>
        generateMockPublicKey()
      ),
    });
  }

  return instructions;
}

/**
 * Generate mock Solana signature (base58)
 */
function generateMockSignature(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let sig = "";
  for (let i = 0; i < 88; i++) {
    sig += chars[randomInt(0, chars.length - 1)];
  }
  return sig;
}

/**
 * Generate mock Solana public key (base58)
 */
function generateMockPublicKey(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let key = "";
  for (let i = 0; i < 44; i++) {
    key += chars[randomInt(0, chars.length - 1)];
  }
  return key;
}

/**
 * Generate mock program ID (deterministic per program name)
 */
function generateMockProgramId(programName: string): string {
  // Use program name to seed deterministic ID
  const hash = programName
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash % 1000000;
  const localRandom = createSeededRandom(seed);

  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < 44; i++) {
    id += chars[Math.floor(localRandom() * chars.length)];
  }
  return id;
}

/**
 * Generate mock zkProof hash (generic, for non-agent contexts)
 */
function generateMockProofHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    randomInt(0, 15).toString(16)
  ).join("")}`;
}

/**
 * Generate mock error message
 * (Refinement #7: Enhanced error categorization)
 */
function generateMockError(): string {
  const normalErrors = [
    "Insufficient account balance for transaction",
    "Program execution failed: InvalidAuthority",
    "Network congestion: Transaction timed out",
  ];

  const criticalErrors = [
    "Critical safety limit exceeded, operation blocked",
    "Constraint violation: SOC below minimum threshold",
    "Emergency shutdown triggered by governor",
    "Critical battery temperature threshold exceeded",
  ];

  // 30% chance of critical error
  const errors = randomBoolean(0.3) ? criticalErrors : normalErrors;
  return randomChoice(errors);
}

/**
 * Generate mock portfolio data
 */
export function generateMockPortfolio() {
  return {
    totalValue: randomFloat(50000, 150000),
    tokens: [
      {
        symbol: "SOLAR",
        name: "Solar Energy Token",
        balance: randomFloat(1000, 5000),
        value: randomFloat(2000, 10000),
        change24h: randomFloat(-5, 10),
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: randomFloat(5000, 20000),
        value: randomFloat(5000, 20000),
        change24h: randomFloat(-0.5, 0.5),
      },
    ],
    energyProduced: randomFloat(1000, 3000), // kWh
    revenueGenerated: randomFloat(500, 1500), // USD
    timestamp: new Date().toISOString(),
  };
}

/**
 * Generate mock energy metrics
 * (Refinements #1, #5, #14, #17, #18: PERFORMANCE constants, OperationalStatus,
 *  time-series patterns, flow direction, component health)
 */
export function generateMockEnergyMetrics() {
  const batterySOC = randomFloat(40, 95);
  const hasIssue = batterySOC < PERFORMANCE.trust.fair; // Below 50%
  const inMaintenance = randomBoolean(0.1);

  // Refinement #1: Realistic data age using PERFORMANCE.freshness
  const dataAge = generateRealisticDataAge();

  // Refinement #5: Use proper OperationalStatus enum
  const inverterStatus: OperationalStatus = calculateOperationalStatus(
    batterySOC,
    hasIssue,
    inMaintenance
  );

  // Refinement #14: Time-series patterns with temporal consistency
  const baseGeneration = 125; // Average solar output
  const timeOfDay = new Date().getHours();
  const solarMultiplier =
    timeOfDay >= 10 && timeOfDay <= 16
      ? randomFloat(1.3, 1.6) // Peak hours
      : timeOfDay >= 7 && timeOfDay <= 19
        ? randomFloat(0.8, 1.2) // Daylight
        : randomFloat(0.0, 0.2); // Night/dawn

  const currentGeneration = baseGeneration * solarMultiplier;
  const currentConsumption = randomFloat(30, 150);
  const gridExportKw = currentGeneration - currentConsumption; // Positive = export, negative = import

  // Refinement #17: Flow direction calculation
  const flowDirection = calculateFlowDirection(gridExportKw, batterySOC);

  // Refinement #18: Component health states for HealthDot compatibility
  const panelEfficiency = randomFloat(18, 22);
  const panelHealth = generateComponentHealth(
    panelEfficiency,
    19.5, // optimalMin
    22, // optimalMax
    18.5, // degradedMin
    19.5 // degradedMax
  );

  const batteryHealthPercent = randomFloat(85, 100);
  const batteryHealth = generateComponentHealth(
    batteryHealthPercent,
    92, // optimalMin
    100, // optimalMax
    85, // degradedMin
    92 // degradedMax
  );

  return {
    currentGeneration, // kW
    currentConsumption, // kW
    batterySOC, // percentage
    batteryHealthPercent, // percentage (numeric metric)
    batteryHealth, // HealthDot state
    gridExportKw, // kW (can be negative for import)
    panelEfficiency, // percentage
    panelHealth, // HealthDot state
    inverterStatus, // OperationalStatus
    flowDirection, // charging/discharging/idle/maintenance
    timestamp: new Date().toISOString(),
    dataAge, // seconds - now using realistic thresholds
  };
}

/**
 * Generate suggested questions for agent
 */
export function generateSuggestedQuestions(
  agent: AgentPersona
): SuggestedQuestion[] {
  const questionsByAgent: Record<AgentPersona, SuggestedQuestion[]> = {
    operations: [
      { question: "What's the current energy dispatch strategy?", icon: "⚡" },
      {
        question: "Why did you change the battery discharge rate?",
        icon: "🔋",
      },
      { question: "How are you optimizing for peak demand?", icon: "📈" },
      { question: "What's the grid export schedule for today?", icon: "🔌" },
    ],
    markets: [
      { question: "What's driving today's trading decisions?", icon: "📊" },
      { question: "How do you predict energy prices?", icon: "💰" },
      { question: "Should I buy or sell tokens right now?", icon: "🔄" },
      { question: "What's the current liquidity situation?", icon: "💧" },
    ],
    sentinel: [
      { question: "What's the health of the solar panels?", icon: "☀️" },
      { question: "Are there any maintenance alerts?", icon: "🔧" },
      { question: "How do you detect equipment failures?", icon: "🛡️" },
      { question: "What's the status of the sensor network?", icon: "📡" },
    ],
    governor: [
      { question: "What safety constraints are active?", icon: "⚖️" },
      { question: "Have there been any constraint violations?", icon: "⚠️" },
      { question: "How do you enforce operating limits?", icon: "🛑" },
      { question: "What's the current compliance status?", icon: "✅" },
    ],
  };

  return questionsByAgent[agent];
}

/**
 * Generate mock explanation (full reasoning)
 * (Refinements #1, #19: PERFORMANCE constants for freshness, constraint categorization)
 */
export function generateMockExplanation(
  decisionId: string,
  agent: AgentPersona
) {
  const confidence = randomBoolean(0.15)
    ? randomInt(PERFORMANCE.trust.fair, PERFORMANCE.trust.good) // 50-70%
    : randomInt(PERFORMANCE.trust.good, 98); // 70-98%

  const reasoningByAgent: Record<AgentPersona, string[]> = {
    operations: [
      "Analyzed 15-minute forecast showing 40% demand increase",
      "Battery SOC at 78% provides sufficient discharge capacity",
      "Grid wholesale price 30% above baseline, optimal sell window",
      "Inverter thermal margins within safe operating zone",
    ],
    markets: [
      "Jupiter aggregator showing 2.3% better rate than Serum",
      "Liquidity depth analysis indicates low slippage risk",
      "Token price momentum suggests continued upward trend",
      "Portfolio rebalancing threshold reached (>5% deviation)",
    ],
    sentinel: [
      "Panel B efficiency dropped 1.2% below historical average",
      "Vibration sensor readings show 15% increase over baseline",
      "Thermal imaging detected hotspot in junction box sector 3",
      "Preventive maintenance window available in 48-hour forecast",
    ],
    governor: [
      "Current SOC at 18% violates minimum threshold of 20%",
      "Multi-sig consensus achieved (3 of 5 signers approved)",
      "Proposed action exceeds maximum risk tolerance setting",
      "Grid interconnection agreement mandates 95% uptime SLA",
    ],
  };

  // Refinement #19: Categorized constraints with type and severity
  const constraintsByAgent: Record<
    AgentPersona,
    Array<{
      text: string;
      type: "safety" | "operational" | "regulatory";
      severity: "critical" | "high" | "medium" | "low";
    }>
  > = {
    operations: [
      {
        text: "Battery SOC must remain above 20%",
        type: "safety",
        severity: "critical",
      },
      {
        text: "Inverter temperature must stay below 65°C",
        type: "safety",
        severity: "high",
      },
      {
        text: "Grid export cannot exceed 150kW",
        type: "operational",
        severity: "medium",
      },
    ],
    markets: [
      {
        text: "Maximum single trade size: 10% of portfolio",
        type: "operational",
        severity: "medium",
      },
      {
        text: "Minimum liquidity depth: $50,000",
        type: "operational",
        severity: "high",
      },
      {
        text: "Slippage tolerance: 2.5%",
        type: "operational",
        severity: "low",
      },
    ],
    sentinel: [
      {
        text: "Panel efficiency must exceed 85% of rated capacity",
        type: "operational",
        severity: "medium",
      },
      {
        text: "Vibration levels must stay within ±10% of baseline",
        type: "safety",
        severity: "high",
      },
      {
        text: "All sensors must report within 60-second intervals",
        type: "operational",
        severity: "high",
      },
    ],
    governor: [
      {
        text: "Battery SOC minimum: 20% (hard constraint)",
        type: "safety",
        severity: "critical",
      },
      {
        text: "Maximum discharge rate: 50kW (safety limit)",
        type: "safety",
        severity: "critical",
      },
      {
        text: "Override requires 3 of 5 multi-sig approval",
        type: "regulatory",
        severity: "high",
      },
    ],
  };

  // Refinement #1: Use realistic freshness values from PERFORMANCE.freshness
  const inputFreshness = [
    randomInt(1, PERFORMANCE.freshness.critical), // Very fresh
    randomInt(PERFORMANCE.freshness.critical, PERFORMANCE.freshness.warning), // Recent
    randomInt(PERFORMANCE.freshness.warning, PERFORMANCE.freshness.stale), // Warning range
  ];

  // Extract constraint text for backward compatibility
  const constraintTexts = constraintsByAgent[agent].map((c) => c.text);

  return {
    id: decisionId,
    persona: agent,
    summary: `Decision made with ${confidence}% confidence based on ${randomInt(5, 15)} data sources`,
    reasoning: reasoningByAgent[agent].slice(0, randomInt(3, 4)),
    constraints: constraintTexts,
    constraintDetails: constraintsByAgent[agent], // Full categorized constraints
    inputs: [
      {
        key: "oracle:pyth",
        value: randomFloat(100, 200),
        source: "Pyth Network",
        freshnessSec: inputFreshness[0],
      },
      {
        key: "sensor:battery-soc",
        value: randomFloat(40, 90),
        source: "Battery Management System",
        freshnessSec: inputFreshness[1],
      },
      {
        key: "forecast:demand",
        value: randomFloat(100, 250),
        source: "Weather & Load Prediction",
        freshnessSec: inputFreshness[2],
      },
    ],
    zkProofHash: generateAgentProofType(agent), // Agent-specific proof type
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// BATCH GENERATORS
// ============================================================================

/**
 * Generate batch of agent decisions
 */
export function generateMockAgentDecisions(count: number): AgentDecision[] {
  const agents: AgentPersona[] = [
    "operations",
    "markets",
    "sentinel",
    "governor",
  ];
  const decisions: AgentDecision[] = [];

  for (let i = 0; i < count; i++) {
    const agent = randomChoice(agents);
    const timestamp = new Date(Date.now() - randomInt(0, 7200) * 1000); // Last 2 hours
    decisions.push(generateMockAgentDecision(agent, { timestamp }));
  }

  return decisions.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

/**
 * Generate batch of transactions
 */
export function generateMockTransactions(count: number): SolanaTransaction[] {
  const agents: AgentPersona[] = [
    "operations",
    "markets",
    "sentinel",
    "governor",
  ];
  const transactions: SolanaTransaction[] = [];

  for (let i = 0; i < count; i++) {
    const agent = randomChoice(agents);
    const timestamp = new Date(Date.now() - randomInt(0, 86400) * 1000); // Last 24 hours
    transactions.push(generateMockTransaction(agent, { timestamp }));
  }

  return transactions.sort(
    (a, b) => new Date(b.blockTime).getTime() - new Date(a.blockTime).getTime()
  );
}

/**
 * Generate conversation history
 * (Refinements #10, #15: Message length variation, conversation age progression)
 */
export function generateMockConversation(
  agent: AgentPersona,
  messageCount: number
): AgentMessage[] {
  const messages: AgentMessage[] = [];
  const questions = generateSuggestedQuestions(agent);

  for (let i = 0; i < Math.floor(messageCount / 2); i++) {
    // Refinement #15: Realistic age progression - older messages further back
    const ageMinutes = (messageCount - i * 2) * randomFloat(1, 3); // 1-3 minutes per message pair
    const timestamp = new Date(Date.now() - ageMinutes * 60000);

    // User question
    const question = randomChoice(questions).question;
    messages.push(
      generateMockAgentMessage("user", agent, question, { timestamp })
    );

    // Agent response
    const responses: Record<AgentPersona, string[]> = {
      operations: [
        "I'm currently prioritizing battery discharge to capitalize on peak pricing. Grid demand is 40% above baseline, and our SOC is healthy at 78%. This strategy maximizes revenue while maintaining safety margins.",
        "The discharge rate adjustment was triggered by our predictive model detecting a 15-minute demand surge. By increasing output from 120kW to 180kW, we can meet grid needs while earning premium rates.",
        // Refinement #10: Long messages >500 chars for truncation testing
        "I'm executing a comprehensive optimization strategy across multiple time horizons. For the immediate 15-minute window, I've increased battery discharge from 120kW to 180kW to capture peak pricing (currently 30% above baseline). The decision integrates real-time grid demand forecasts showing a 40% surge, current battery state-of-charge at 78% (well above our 20% safety threshold), and inverter thermal analysis confirming we have headroom in our cooling capacity. This multi-factor approach ensures we maximize revenue while maintaining all safety constraints and preserving long-term equipment health.",
      ],
      markets: [
        "Today's trades are driven by strong momentum in SOLAR token price (+8% over 24h) and favorable liquidity conditions on Jupiter. I'm executing systematic rebalancing to maintain target allocations.",
        "Price prediction uses ensemble models combining order book depth, volatility indices, and correlated asset movements. Current forecast shows 85% confidence for continued uptrend over next 6 hours.",
        // Refinement #10: Long messages >500 chars for truncation testing
        "My trading strategy today integrates multiple signal streams: Jupiter aggregator is showing 2.3% better execution rates than Serum DEX, on-chain order book analysis indicates deep liquidity at current price levels (>$250K within 1% slippage), and our technical indicators show strong upward momentum with SOLAR token appreciating 8% over the past 24 hours. I'm systematically rebalancing the portfolio to maintain our target 60/40 SOLAR/USDC allocation while taking advantage of these favorable conditions. Risk management protocols remain active with maximum single-trade limits at 10% of portfolio value and continuous monitoring of liquidity depth.",
      ],
      sentinel: [
        "Panel Array B is showing 92% health with slight efficiency degradation (1.2% below baseline). This is within normal aging patterns but warrants monitoring. No immediate maintenance required.",
        "I maintain continuous monitoring of 47 sensors across the system, checking for anomalies every 10 seconds. Early detection uses statistical process control with adaptive thresholds based on weather and load.",
        // Refinement #10: Long messages >500 chars for truncation testing
        "My health monitoring system processes data from 47 distributed sensors across the solar farm infrastructure, with measurement intervals of 10 seconds for critical parameters and 60 seconds for secondary metrics. The current assessment shows Panel Array B experiencing slight efficiency degradation at 1.2% below its 6-month rolling average, which falls within the expected aging curve for crystalline silicon modules but has triggered my predictive maintenance algorithms. Vibration analysis on tracker motor 3 shows a 15% increase over baseline, suggesting bearing wear that should be addressed in the next scheduled maintenance window. All safety-critical systems including inverter cooling, electrical isolation monitoring, and emergency shutdown circuits are operating within nominal parameters.",
      ],
      governor: [
        "Currently enforcing 8 active constraints including SOC minimums (20%), discharge rate limits (50kW max), and grid export caps (150kW). All parameters within compliance bounds.",
        "Yes, there was 1 constraint violation in the past 24 hours: Battery SOC briefly dropped to 18% during unexpected demand spike. Operations agent was automatically throttled and SOC recovered within 5 minutes.",
        // Refinement #10: Long messages >500 chars for truncation testing
        "The governance framework maintains continuous enforcement of 8 active operational constraints designed to ensure system safety and regulatory compliance. Critical hard limits include battery state-of-charge minimum at 20% (preventing deep discharge damage), maximum discharge rate of 50kW (thermal safety), and grid export ceiling at 150kW (interconnection agreement). In the past 24 hours, we experienced one brief constraint violation when battery SOC dropped to 18% during an unexpected grid demand spike. My automated response throttled the operations agent's discharge authority, and the system recovered to compliant levels within 5 minutes. This incident has been logged to the immutable audit trail with full telemetry data for regulatory review.",
      ],
    };

    const responseTimestamp = new Date(
      timestamp.getTime() + randomInt(3000, 8000)
    ); // 3-8 seconds later

    // Mix of normal and long responses, with varying confidence levels
    const allResponses = responses[agent];
    const selectedResponse = randomChoice(allResponses);

    messages.push(
      generateMockAgentMessage("agent", agent, selectedResponse, {
        timestamp: responseTimestamp,
        // Some messages will have low confidence due to generateMockAgentMessage logic
      })
    );
  }

  return messages;
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Export utility for generating TrustMathematics objects
 * (Refinement #2: Trust mathematics generation)
 */
export function generateMockTrustMathematics(
  confidence?: number,
  sources?: string[]
): TrustMathematics {
  const actualConfidence = confidence ?? randomInt(PERFORMANCE.trust.good, 98);
  const actualSources = sources ?? ["oracle:pyth", "sensor:battery-soc"];
  return generateTrustMathematics(actualConfidence, actualSources);
}

/**
 * Export utility for generating AgentHealthStatus
 * (Refinement #6: AgentHealthStatus generation)
 */
export function generateMockAgentHealth(
  agent?: AgentPersona,
  options?: {
    forceError?: boolean;
    forceThinking?: boolean;
    forceLowConfidence?: boolean;
  }
): AgentHealthStatus {
  const hasError = options?.forceError ?? randomBoolean(0.1);
  const isThinking = options?.forceThinking ?? randomBoolean(0.15);
  const confidence = options?.forceLowConfidence
    ? randomInt(PERFORMANCE.trust.poor, PERFORMANCE.trust.fair)
    : randomInt(PERFORMANCE.trust.good, 98);

  return generateAgentHealth(confidence, isThinking, hasError);
}

/**
 * Export utility for calculating trust decay
 * (Refinement #4: Temporal decay calculation)
 */
export function calculateMockTrustDecay(dataAgeSeconds: number): number {
  return calculateTrustDecay(dataAgeSeconds);
}

/**
 * Export utility for calculating OperationalStatus
 * (Refinement #5: OperationalStatus types)
 */
export function calculateMockOperationalStatus(
  confidence: number,
  hasError?: boolean,
  inMaintenance?: boolean
): OperationalStatus {
  return calculateOperationalStatus(confidence, hasError, inMaintenance);
}

const mockDataGenerators = {
  generateMockAgentDecision,
  generateMockAgentMessage,
  generateMockTransaction,
  generateMockPortfolio,
  generateMockEnergyMetrics,
  generateSuggestedQuestions,
  generateMockExplanation,
  generateMockAgentDecisions,
  generateMockTransactions,
  generateMockConversation,
  // New utilities for AIMP design system integration
  generateMockTrustMathematics,
  generateMockAgentHealth,
  calculateMockTrustDecay,
  calculateMockOperationalStatus,
};

export default mockDataGenerators;
