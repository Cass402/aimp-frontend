# AIMP Frontend — The Autonomous Infrastructure Interface

## _(Solar Farm Tokenization Demo: Colosseum Hackathon MVP — Next.js 15 / React 19 Edition)_

> **Tagline:** _“Own the Sun. Trust the Machine. Watch It Work.”_

**Promise:** Own, observe, and understand the world’s infrastructure — autonomously.

**Movement:** AIMP is the world’s first interface for AI-managed real-world assets. From solar farms to water grids and transport nodes, it turns **AI operation**, **blockchain ownership**, and **investor explainability** into one transparent surface.

---

## What’s New in This Revision (facts-first)

- **Frameworks:** **Next.js 15 (App Router, RSC)** + **React 19** across the stack.
- **Animation:** **Motion** (`motion`) for 60fps UI micro-interactions and transitions.
- **Charts:** **Lightweight Charts v5** + focused **D3 modules** (`array`, `scale`, `shape`, `time-format`) for energy + price visualizations.
- **State:** **TanStack Query v5** (server state) + **Zustand v5** (UI state) + **Rx** patterns where streaming is needed via Web Workers (**Comlink**).
- **Solana Integration:** **@solana/web3.js v1.98**, Wallet Adapter (Phantom, Solflare, Ledger, Coinbase), **helius-sdk** for decoded tx & priority-fee insights, **@jup-ag/api** for buy flow.
- **PWA:** **Workbox 7** (offline portfolio, background sync for queued actions).
- **Observability:** **Sentry** (`@sentry/nextjs`) + `instrumentation.ts` spans; **@vercel/analytics** + Web Vitals.
- **Forms & Safety:** **Zod** + **react-hook-form** + resolvers for typed edges.
- **i18n:** **next-intl** with locale routing.
- **Tooling:** Playwright (E2E inc. wallet), Vitest, axe, Tailwind 4, Prettier, ESLint 9.
- **Feature flags:** `NEXT_PUBLIC_USE_MOCKS` ensures preview builds run on mock API + simulator until on-chain wiring is toggled.

> The MVP demonstrates a **minimal vertical slice** of AIMP’s full vision: autonomous ops for one solar farm (**ingest → decide → execute → observe**) with **explainability**, **hard safety constraints**, and **on-chain authority**. Longer-term, the same interface scales to **EV charging, batteries, water, telecom, data centers** and more, per the AIMP agent taxonomy and protocol scope.

---

## Product Narrative

### Vision — Infrastructure Without Friction

AIMP turns complexity into calm: the frontend is the transparent surface where users own, observe, and understand autonomous infrastructure without wrestling with underlying protocols. Glassmorphic layers, explainable tooltips, and provenance badges keep the story grounded in **calm precision** while reinforcing that every metric is backed by data the user can audit.

### Vision — “The OS for Autonomous Infrastructure”

AIMP is the first interface where **AI agents** operate tokenized, real-world infrastructure under **cryptographic authority**, with **human-readable explanations** and **auditable proofs**. Users can invest fractionally, watch the asset operate in real time, and understand **why** each action was taken. The frontend’s job: make that power **effortless, beautiful, and trustworthy**.

### Narrative — The Autonomous Infrastructure Era

For the first time, physical infrastructure can be:

1. **Tokenized** — fractionalized into digital ownership via blockchain.
2. **Operated by AI Agents** — optimizing efficiency, safety, and yield autonomously.
3. **Audited in Real-Time** — through explainable decisions and immutable on-chain trails.

AIMP becomes the user’s **portal into that new world** — the layer where humans meet autonomous assets, and every AI action carries the “why” directly in the interface.

### Why Trust First

In critical infra + finance, trust must be earned in the **first 3 seconds**: show **ownership clarity**, **safety status**, **human override**, and **on-chain provenance**. The UI therefore leads with **risk-first panels**, **decision explanations**, **emergency stop affordances**, and **verifiable tx context**. (Safety + governance guardrails and ZK-verifiable decisions are foundational in AIMP.)

---

## Strategic Differentiation

### Core Differentiation

1. **Explainable Autonomy:** Every AI decision is paired with a human-readable rationale so users never face a black box.
2. **Trust-First Interface:** Glass cards, provenance badges, and clear status affordances ensure every metric can be traced back to source data or on-chain proof.
3. **Visual Intelligence:** Energy flows, token performance, and agent actions surface as living narratives — motion that signals state, not decoration.
4. **Zero-Friction Ownership:** Wallet connect, token purchase, revenue distribution, and dashboards sit side by side for a single-tap ownership loop.
5. **Multi-Agent Personality:** Investors meet the Operations, Maintenance, and Markets agents — each with a distinct voice that humanizes the autonomy.

### What AIMP Does (and shows in the UI)

1. **Constrained Autonomy:** Every AI action is checked against **hard constraints** and **authority bounds** before on-chain execution, with **explanations** surfaced to the user.
2. **ZK-Backed Explainability:** Critical decisions can include a **proof hash** + attestations, letting the UI present “what we did” and “how we proved it” without revealing private model internals.
3. **Oracle Manipulation Defense:** Price/irradiance inputs come from a **multi-source oracle shim** (weighted median + deviation guards) with freshness windows; UI shows data provenance and confidence.
4. **Emergency Controls + Audit:** **Human veto** and **safe stop** are explicit controls with **tamper-evident logs** and replayable evidence.

### What AIMP Won’t Do

- No hypey earnings without risk context; **loss and limits** are always shown first.
- No dark patterns; no coercive gamification; no clutter — **7±2 primary actions** max per screen.
- No opaque automation — every automated step is **explainable** or **inspectable**.

---

## Success Metrics

### Trust & Safety (primary)

- **Safety incidents / million decisions** (target < 1); **constraint violation** rate (target < 0.1%).
- **Emergency override latency** P95 < 200 ms UI feedback; on-chain pause acknowledged with tx link.
- **Explainability coverage:** ≥ 95% of surfaced decisions include an explanation payload + provenance.

### Product

- **Onboarding completion** (> 90% connect → dashboard render < 5 s).
- **Buy-flow completion** (> 80% on mocks).
- **Decision comprehension:** ≥ 70% of users report “I understand why” in in-app survey.

### Technical

- Page TTI < 3 s on 3G; 60 fps motion; initial JS < 200 KB; dashboard refresh P95 < 500 ms.
- Error rate < 0.1%, uptime > 99.9%, trace coverage > 80%.

### Protocol Proof (MVP)

- “Register asset → authorize agent → execute decision → distribute revenue” minimal path demonstrated with **real tx objects** (mocknet/local validator acceptable for demo).

### Emotional

- 90% of test users describe the UI as _“calming”_ or _“trustworthy.”_
- 70% recall at least one AI persona by name after the demo session.

---

## Behavioral UX: Research-Backed Explainability & Confidence

### Emotional States We Design For

- **Trust:** “I see where my money goes.”
- **Curiosity:** “How does the AI make this decision?”
- **Empowerment:** “I can own and understand complex infrastructure.”
- **Progress:** “My assets grow, and I learn with them.”

### Psychological Anchors

- **Explainability before Action:** Every decision surfaces “why” via tooltip, modal, or agent voice.
- **Calm Transparency:** Motion and light guide attention without overwhelming the user.
- **Temporal Context:** Key metrics highlight what changed in the last hour to connect users to momentum.
- **Predictive Trust:** Micro-animations suggest foresight (“AI preparing next action…”) to signal readiness.

### Engagement Patterns

- **Micro-Insights:** 3–5 bullet summaries on dashboards keep cognition light.
- **Cause/Effect Feedback:** Every interaction triggers visible state change or response.
- **Gamified Mastery:** Subtle streak indicators (“3 safe ops days”) reinforce reliability.
- **Persona-Led Explainability:** Agents speak with domain-specific tone, turning logs into a relatable conversation.

### Nudge Hierarchy (infra-fintech flavor)

1. **Safety First:** Show **status = Normal/Alert**, constraints active, next checks.
2. **Risk Awareness:** Before buys/dispatches, progressive disclosure of worst-case + limits.
3. **Micro-Learning:** Bite-sized XAI popovers (“Why charge now?” with inputs + bounds).
4. **Goal Reinforcement:** Weekly “performance vs. baseline” cards with risk-adjusted returns (Sharpe) sourced from agent metrics.

### Anti-Patterns

Avoid pressure countdowns, misleading progress, flashy returns without risk bounds, and chatty bots that can’t cite data.

---

## Personas → Voice & Explainability

| Persona                  | Description                                                   | Tone                           |
| ------------------------ | ------------------------------------------------------------- | ------------------------------ |
| **Investor**             | Retail or institutional user holding SOLAR tokens             | Confident, financially focused |
| **Operations Agent**     | AI narrator explaining dispatch, derate, and safety decisions | Technical, concise             |
| **Maintenance Agent**    | AI reporting faults, maintenance schedules, and fixes         | Supportive, action oriented    |
| **Energy Markets Agent** | AI describing grid trades, price bands, and hedges            | Analytical, data driven        |

Each persona animates a different slice of the explainability system, giving every decision a recognizable voice while staying anchored to the **agent taxonomy** in AIMP.

---

## Core Pages & Components (MVP Scope)

### 1) Landing / Onboarding (`/`)

- **Hero:** Title + subtitle; “Connect Wallet” CTA (Phantom-style simulated modal; prefilled demo account).
- **Feature Highlights (3 cards):** “Autonomous,” “Transparent,” “Real Yield.”
- **Flow:** Connect → GET `/api/user/session` (mock) → **redirect `/dashboard`**.

**Trust cues:** footer shows “AI authority constrained, human override available, audit trail on-chain” with link to **learn more** modal (ZK hash explainer + safety invariants).

---

### 2) Dashboard (`/dashboard`)

- **Portfolio Summary:** SOL balance, **SOLAR** holdings, current APY.
- **AI Insight Glass Cards:** latest decisions (with **Explain** action).
- **Holdings Table:** Asset, units, current value, 24h PnL.
- **CTA:** “Invest in Solar Farm” → `/invest`.

**Explainability:** Clicking **Explain** opens `ExplanationModal` showing **reason**, **constraints checked**, **inputs used** (oracle provenance + freshness), **next actions**, and, when available, **zkProofHash**.

---

### 3) Invest / Buy (`/invest`)

- **Market Overview:** price, 24h change, supply in circulation.
- **Form:** input **SOL** amount → quote **SOLAR** via Jupiter (mocked quote in preview).
- **Confirm:** “worst-case received,” fee, tx simulation note.
- **Receipt:** tx hash + updated balance → route `/assets/solar`.

**Risk-first:** always show **worst-case** before **best-case**; decode tx with **program IDs** and “who can spend” explainer (AI authority via PDA).

---

### 4) Asset Detail — Solar Farm Essentials (`/assets/solar`)

- **Header:** name, location, token price, ROI.
- **Charts & Cards:**
  - **Price Chart (24h)**
  - **Energy Production:** current MW, capacity %, sparkline
  - **Energy Sales:** MW to grid, % of total
  - **Battery Status:** SoC %, charge rate, time to full
  - **Planned Actions:** next 3 AI actions (“Charge 2–4pm,” “Maintenance inverter #3,” “Sell 1.2MW at 18:30”).

- **Explainability:** each card has a **“Why?”** tooltip — opens agent persona view (Operations, Maintenance, Markets) with **constraints evidence** (e.g., thermal limit, price band, safety invariant).

---

### 5) Interactive Explore — Digital Twin (`/assets/solar/explore`)

**Layout:**

- **Energy Flow Panel:** center node “Solar Farm Core”; **red line → grid export**, **green line → battery charge** with animated flow and numeric overlays (MW, %).
- **Zoom Level (one depth):**
  - **Panel Grid (20–50):** green/amber/red dots; hover = voltage/efficiency; click = **Maintenance Agent** tooltip with cause + fix ETA.
  - **Battery Bank:** units with charge bars + targets; click shows charge plan (Markets + Storage rationale).

- **Right Summary:** status (Normal/Alert), recent events (maintenance, dispatch, overrides), persona avatars quick filters.
- **Accessibility:** keyboard navigation between nodes; tooltips reachable via focus.

**Motion:** 300–600ms ease in/out, subtle pulse on active lines, 60fps target. No heavy 3D; responsive **SVG/Canvas**. (Performance budget enforced.)

**Safety:** top-right **Emergency Override** button (guarded confirm) → enters **Paused** state with red status banner + on-chain pause event reference.

---

### Global Elements

- **Top Nav:** Dashboard, Invest, Assets, “Meet the Agents.”
- **Agent Helper Widget:** floating button → persona sidebar (scripted Q&A; “What changed in the last hour?”).
- **Quick Action:** Dedicated CTA surfaces “What changed in the last hour?” and queries `/api/explanations/recent` for rapid deltas.
- **Status Pill:** shows **Safety: Normal / Alert**, **Oracle: Healthy / Degraded**, **AI Authority: Enabled / Paused**.

---

## Data Contracts (Frontend Expectations)

> Use **mock fixtures** until integration is toggled. All timestamps in user timezone; return **provenance + freshness** on oracle-derived fields.

- `GET /api/portfolio` → `{ sol: number, solar: { units: number, valueUsd: number }, apy: number }`
- `GET /api/portfolio/assets` → Array of `{ id, name, units, valueUsd, pnl24h }`
- `GET /api/explanations/latest` → Array of `Explanation` (see schema below)
- `GET /api/assets/solar/summary` → `{ name, location, tokenPrice, roi }`
- `GET /api/assets/solar/price-history?period=24h` → `[ { t: ISO, p: number } ]`
- `GET /api/assets/solar/energy` → `{ mw, capacityPct, spark: [number], sourceProvenance, freshnessSec }`
- `GET /api/assets/solar/sales` → `{ mwToGrid, pctOfTotal, twap, sourceProvenance, freshnessSec }`
- `GET /api/assets/solar/batteries` → `{ units: [{ id, socPct, rateKw, ttfMin, targetPct }] }`
- `GET /api/explanations/upcoming` → `{ actions: [{ title, startAt, reason, constraints }] }`
- `GET /api/assets/solar/panels` → `{ grid: [{ id, status, voltage, eff, issue? }] }`
- `GET /api/explanations/panel/{id}` → `{ status, cause, fixEta, constraints }`
- `GET /api/explanations/energy-sale` → `{ priceNow, twap, rationale, constraints, oracle: { sources, deviation, freshness } }`

**Explanation schema (shared):**

```ts
type Explanation = {
  id: string;
  persona: "operations" | "maintenance" | "markets";
  title: string; // “Charging batteries (2–4pm)”
  summary: string; // one-liner
  reasoning: string[]; // bullets
  constraints: string[]; // “Max discharge 2MW”, “SOC 80% cap”
  inputs: {
    // oracle & telemetry inputs + provenance
    key: string;
    value: string | number;
    source: string;
    freshnessSec: number;
  }[];
  zkProofHash?: string; // mock proof ref
  nextActions?: string[];
  timestamp: string; // ISO
};
```

---

## Minimal Blockchain Flows (MVP)

> Implement the **anchor programs** & wiring necessary for the following **happy path**; re-use mocks for expensive edges:

1. **Register Asset** → **Tokenize** → **Associate AI Agent** (PDA)
2. **Authorize Agent** with **constraints** (max tx value, daily spend, op list)
3. **Execute Decision** (derate/dispatch) **→ log proof hash** (mock)
4. **Distribute Revenue** (pro-rata holder split)

Show tx objects + decoded program IDs in the UI receipts. These flows align with AIMP’s **Asset Registry**, **AI Authority**, and **Revenue Distribution** programs and constraints patterns.

---

## Safety & Governance (UI Hooks)

- **Hard Safety Invariants:** surfaced in **Constraints** tooltips + decision modals.
- **Emergency Override UI:** prominent button with confirm; state banner + audit log entry; “resume” gated by policy.
- **Audit Trail:** downloadable CSV/JSON from **Recent Events**; each item carries **decision hash**, **oracle snapshot**, and (mock) **zkProofHash**.

---

## Design System & Visual Language

### UX Signature — The Explainable Interface

Glass, light, and proof define the AIMP surface. Every layer feels like tempered glass with grounded shadows, while motion provides “proof of life” that the AI is attentive. Interfaces lean into calm precision — transparency earns trust and physics-based easing keeps autonomy approachable.

### Core Visual Identity

- **Background:** Deep graphite glass (`#0E0E0E`) with layered translucency for depth.
- **Accents:** **Green #34C759 (healthy)**, **Yellow #FFD60A (caution)**, **Red #FF453A (alert)**.
- **Typography:** Inter / SF Pro with tight numeric tables; monospaced columns for financial figures.
- **Motion:** 200–300 ms hover feedback, 400–600 ms panel transitions, 1.2 s looping gradients for flow lines — always purposeful, never ornamental.

### Accessibility & Motion Guardrails

- **Calibrated Contrast:** WCAG 2.2 AA minimum with pattern redundancy for alerts.
- **Focus Integrity:** Focus states never hide under glass layers; minimum target sizes maintained.
- **Performance:** Motion tuned for 60 fps, with heavier sims offloaded to workers.

**Component primitives:** `GlassCard`, `StatPill`, `ActionBar`, `FlowLine`, `HealthDot`, `AgentTooltip`, `ExplanationModal`, `AgentSidebar`, `TxReceipt`.

---

## Key Frontend Components (spec + examples)

### Trust-First Buy Panel

```tsx
<BuySolarPanel
  quote={{ price: 1.02, slippageBps: 50, worstCaseOut: 195 }}
  fees={{ networkUsd: 0.03 }}
  executionProbability={0.97}
  risk={{ warnings: [], limits: ["Max tx $1,000 (AI)", "Daily spend $5,000"] }}
  txPreview={{
    programs: ["AssetRegistry", "RevenueDistribution"],
    pdas: ["AIAuthPDA"],
  }}
  onConfirm={placeOrder}
/>
```

### Energy Flow Card

```tsx
<EnergyFlow
  generationMw={4.2}
  toGridMw={2.8}
  toBatteryMw={1.4}
  pctToGrid={67}
  pctToBattery={33}
  status="normal" // normal | alert
  onExplainGrid={() => openExplain("energy-sale")}
  onExplainBattery={() => openExplain("battery-plan")}
/>
```

### Explainability Modal

```tsx
<ExplanationModal explanation={explain} />
```

---

## Technical Requirements — The Stack (pinned)

> The app **must** adhere to this `package.json` set (Node ≥20 <23). Use **explicit caching** for all `fetch` in Next 15.

**Core:** Next.js 15, React 19, TypeScript, Tailwind 4, Motion, Lightweight Charts, D3 modules.
**State:** TanStack Query v5, Zustand v5, Comlink Workers (sim/analytics; consider `simple-statistics`).
**Solana:** @solana/web3.js v1.98; wallet adapters (Phantom, Solflare, Ledger, Coinbase, Backpack); helius-sdk; @jup-ag/api; compute budget + system libs.
**Auth/Storage:** Supabase JS (if needed for demo persistence).
**i18n:** next-intl.
**PWA:** Workbox (core, routing, strategies, precaching, window).
**Analytics/Observability:** @vercel/analytics, Web Vitals, Sentry (`@sentry/nextjs`).
**Testing:** Playwright, Vitest, Testing Library, axe, Lighthouse budgets.
**Tooling:** ESLint 9, Prettier, Husky, lint-staged, Tailwind plugins.

> The protocol side that the UI references (AI agent constraints, oracle design, CPI guardrails, governance safe-guards) maps directly to AIMP’s **program suite** and security architecture. Keep program IDs and tx decoding human-readable in the UI.

---

## Runtime Architecture (Ingest → Decide → Execute → Observe)

- **Perception & Telemetry:** Sensor simulator (solar irradiance, MW output), anomaly hooks; **Kalman + rules** only for MVP. UI consumes `/energy`, `/sales`, `/batteries` endpoints.
- **Decision Engine:** rule engine + LP fallback; **explanation payloads** contain constraints, inputs, and next actions; **zkProofHash (mock)** included for critical ops.
- **Safety:** invariants checked pre-execute; **override UI** pauses execution; log audit events.
- **Blockchain Path:** tx composer → **AI Authority PDA** signing → **Revenue Distribution** → receipts in UI.

---

## Oracle & Market Data

**Oracle shim:** multi-source average with deviation guard + freshness windows; **TWAP** for prices; irradiance from simulator joined with weather feed (mock). UI always shows **provenance + freshness** and flags deviation spikes.

---

## Monitoring & Observability

- **Live Dashboard:** safety incidents, decision latency, revenue/share, override events.
- **Sentry:** traces for `connect → buy → asset → explore`; tag persona interactions; capture slow renders.
- **Analytics:** PostHog or @vercel/analytics funnels for **Explain** button, **Override**, **Buy**.

---

## Accessibility & QA

- **WCAG 2.2 AA** with automated **axe** checks + manual AT passes for buy flow and override.
- **Playwright E2E:** wallet connect, buy simulation, explanation modal open, digital twin drilldown, emergency override path, receipts decode.
- **Vitest:** units for data mappers, number formatting, state machines.

---

## Performance Budgets

- **Load < 2s on 3G; TTI < 3s; initial JS < 200KB**.
- **60fps** animations (no heavy 3D); worker offload for sims/aggregations.
- **Fetch caching:** explicit `revalidate` + `fetchCache` per route; partial hydration for heavy panels.

---

## CI/CD & DevEx

- **Checks:** `typecheck`, `lint`, `test`, `axe`, `playwright`.
- **Preview deploys:** `NEXT_PUBLIC_USE_MOCKS=1` for Netlify/Vercel previews.
- **Feature flags:** UI labels (**Live / Preview / Roadmap**) driven by a single source config.

---

## Week-by-Week Execution (Aligned to MVP Plan)

### Week 1 — Scope & Scaffolds

- Lock MVP scope; repo + routes + skeletons; synthetic data generator.
- **Wireframes + data contracts** finalized; persona → UI mapping.
- Output: MVP charter (metrics), telemetry generator, REST mocks.

### Week 2 — Core Loop

- Implement **ingest → decision → ledger path**; CLI demo flow; safety tests.
- Explanations contract + modal; dashboard glass cards.
- Output: working flow with logged Solana tx (local validator accepted), Explain on cards.

### Week 3 — Safety & Trust

- Emergency override UI; audit trail; **zkProofHash** logging; token mint stub.
- Digital twin (one-level zoom); **Agent sidebar** scripted Q&A.
- Output: dashboard + twin demo; override script + receipts.

### Week 4 — Polish & Pitch

- Observability polish; QA harness; screenshot states for deck.
- Demo script: **Connect → Buy → Metrics update → Asset drill → Trigger maintenance → Override + Explain**.
- Output: Grafana-style board (or in-app metrics), video capture fallback.

---

## “Demo Mode” Script (UI States)

1. User connects wallet → prefilled session → `/dashboard` loads in < 3s.
2. Hits **Invest** → buys 200 **SOLAR**; sees worst-case + tx decode → success.
3. Redirect to **Asset Detail**; cards animate in with updated holdings.
4. **Interactive Explore:** shows normal status; a scripted maintenance event flips a panel to **red** → tooltip explains fault + ETA.
5. **Planned Actions:** “Charge 2–4pm”; **Explain** reveals price bands, SOC limits, and a proof hash.
6. **Emergency Override:** press → state flips to **Paused**; audit entry appears with tx link.
7. Resume → status returns **Normal**.

---

## Security & Governance Talking Points (for judges)

- **AI within bounds:** decisions validated against **AIAgentConstraints** (max tx value, whitelisted ops, risk bands).
- **Oracle defense:** multi-source, outlier detection, freshness windows; deviation alarms visible in UI.
- **ZK story:** decisions can be accompanied by **proof hashes**; UI shows integrity without exposing models.
- **Governance & overrides:** time-locked changes, emergency pause; human veto is **first-class UI**.

---

## Scalability Roadmap (beyond MVP)

The same UI scaffolding and explainability system scales to **EV charging, battery storage, water systems, data centers**, etc., mapped to AIMP’s **multi-agent coordination**, **BFT consensus**, and **enterprise registry**. The digital twin patterns generalize to any infrastructure graph.

---

## Appendices

### A. Minimal Vertical Slice — Section Mapping

- **Narrative & Compliance Backbone:** AI-run SPV, metrics, and compliance checks → deck copy sourced from **AI Agent Framework §1.1–1.4, §8.2** and **System Architecture pointers** (mapped in explainer modal content).
- **Perception & Telemetry:** simulator + anomaly flags; use **Kalman + rules** only.
- **Decision Engine:** constraints + LP fallback; **emit explanations** per spec.
- **Safety & Governance:** invariants, override UI, audit trail.
- **Blockchain Core:** registry → authorize agent → execute → distribute, PDAs wired; **mock zk-proof hash**.
- **Tokenomics Slice:** AST mint config + staking stub for agent accountability (UI badges only in MVP).
- **Oracle & Market Data:** TWAP + sanity checks + freshness; provenance always shown.
- **Execution Pipeline:** sequencing narrative, CPI wrapper, commit-reveal story (hash shown in receipts).
- **Monitoring:** dashboard metrics: safety incidents, decision latency, revenue.
- **CI/CD & QA:** lint + unit + integration scenario; chaos placeholder.
- **Deployment Skeleton:** docker-compose/k8s-lite; local validator/mock; one-command launch.

### B. Example: Explanation Payload (Battery Charge Decision)

```json
{
  "id": "exp-7f2",
  "persona": "markets",
  "title": "Charging batteries from 14:00–16:00",
  "summary": "Charging now due to low price band and high irradiance forecast.",
  "reasoning": [
    "Spot price < $32/MWh and 24h TWAP $36/MWh",
    "SOC 41% < target 70%",
    "Forecast irradiance rising next 90min"
  ],
  "constraints": [
    "Max charge rate 1.5MW",
    "SOC hard cap 80%",
    "Daily cycle ≤ 1.2 equivalent cycles"
  ],
  "inputs": [
    {
      "key": "price.now",
      "value": 31.7,
      "source": "oracle:pyth+switchboard",
      "freshnessSec": 12
    },
    {
      "key": "twap.24h",
      "value": 36.2,
      "source": "oracle:pyth",
      "freshnessSec": 18
    },
    { "key": "soc", "value": 41, "source": "telemetry", "freshnessSec": 2 },
    {
      "key": "irradiance.forecast90m",
      "value": 0.82,
      "source": "sim",
      "freshnessSec": 6
    }
  ],
  "zkProofHash": "0x42…ab",
  "timestamp": "2025-10-05T10:22:14Z"
}
```

### C. Dev Notes for Designers/Engineers

- **Always lead with status + risk.** Then show upside.
- **Every decision should be explainable** within 2 clicks.
- **Never hide the override.** The button is visible and clear even in Normal state.
- **Keep motion purposeful.** Use it to reveal hierarchy and cause—never decoration.
- **Use provenance badges** on any metric sourced from oracles.

---
