# Copilot Instructions

- **Context first:** Read `PRD.md` before implementing features; it defines flows (Connect → Buy → Explainability) and data contracts for every route (`/dashboard`, `/assets/solar`, `/invest`, digital twin, etc.).
- **Tech stack:** Next.js 15 App Router with React 19 + RSC, Tailwind CSS v4, Motion, Lightweight Charts, and D3 modules. Prefer server components for primary data surfaces; keep client components minimal and justified.
- **Structure:** Screens live under `src/app`. Co-locate UI primitives in feature folders (e.g., `src/app/(dashboard)/_components/GlassCard.tsx`) and share atoms via a future `src/components` directory. Keep styles in Tailwind via `globals.css` tokens.
- **Data flow:** All fetches must declare caching (`cache`, `next.revalidate`) per PRD performance budgets. Mock data should follow the schemas listed in `PRD.md` (`Explanation`, `/api/assets/solar/*` shapes) until real endpoints exist.
- **State management:** Use TanStack Query v5 for server state and Zustand v5 for UI state (toggles, modals). Only introduce Zustand stores inside `src/stores` with typed selectors; prefer React Query hooks in `src/lib/query` wrappers.
- **Explainability components:** Centralize the spec-driven pieces (`ExplanationModal`, agent personas, constraint lists) so every decision card pulls from the same renderers; mirror the persona voices (operations, maintenance, markets) described in the PRD.
- **UI language:** Glassmorphic cards, risk-first layouts, provenance badges, and status pills are mandatory. Animate purposefully with `motion` (200–600ms transitions) and keep alerts color-coded (`#34C759`, `#FFD60A`, `#FF453A`).
- **Digital twin:** Implement the `/assets/solar/explore` view with SVG/Canvas flow lines, keyboard navigation, and emergency override controls exactly as specced; offload heavy sims to workers via `comlink` when needed.
- **Wallet + Solana:** Use the wallet adapter packages from `package.json` for connect flows. Respect the constraint logic from the PRD (`AIAgentConstraints`, proof hashes) when mocking tx receipts; always decode programs and PDAs for receipts.
- **Internationalization:** Use `next-intl` locale routing hooks when adding strings. Default copy should support quick extraction into translation files.
- **Feature flags:** Honour `NEXT_PUBLIC_USE_MOCKS` to swap between mock data and live services. Add guardrails around any irreversible transaction paths.
- **Observability:** Wire `@sentry/nextjs`, `@vercel/analytics`, and Web Vitals in root layouts. Tag interactions (Explain, Override, Buy) per PRD tracking expectations.
- **Testing:** Use `npm run test` (Vitest) for units, `npm run test:e2e` (Playwright) for flows (connect wallet, buy, explanation modal, digital twin, override). Accessibility checks should include `vitest-axe` on modal components.
- **Build targets:** Node 20.x–22.x. Run `npm run lint`, `npm run typecheck`, and `npm run build` before submitting PRs; Tailwind v4 requires its PostCSS plugin already configured in `postcss.config.mjs`.
- **Performance budget:** Initial JS < 200 KB, 60 fps animations, dashboards refresh < 500 ms; use streaming RSC payloads and suspense-friendly loaders where possible.
- **Documentation:** Update `PRD.md` snapshots or add inline `@note` comments when diverging from spec so the design narrative stays aligned.
