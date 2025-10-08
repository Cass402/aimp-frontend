import Link from "next/link";
import { TrustAnchor } from "./trust-anchor";
import { AuditTrail } from "./audit-trail";
import { Provenance } from "./provenance";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

// Trust cues with enhanced explainability and provenance
const trustCues = [
  {
    id: "constraints",
    title: "Constraints Active",
    detail: "Max dispatch 2.5MW • Proof hash logged",
    explanation:
      "AI operations are mathematically bounded by cryptographic constraints. Every decision is verified against safety limits before execution.",
    metrics: {
      activeConstraints: 7,
      violationRate: 0.0,
      lastAuditPassed: "2h ago",
    },
    provenanceHash: "0x9a7f2e...",
    confidence: 99,
    category: "safety",
  },
  {
    id: "human-override",
    title: "Human Override",
    detail: "Emergency stop reachable in <200ms",
    explanation:
      "Human operators maintain ultimate authority. Emergency controls bypass all AI systems with cryptographic guarantees and immediate blockchain logging.",
    metrics: {
      responseTime: "< 180ms",
      lastTested: "6h ago",
      successRate: "100%",
    },
    provenanceHash: "0x4c8b1d...",
    confidence: 100,
    category: "governance",
  },
  {
    id: "audit-trail",
    title: "Audit Trail",
    detail: "On-chain receipts + telemetry snapshots",
    explanation:
      "Every decision creates an immutable record. Full transaction history, reasoning data, and system snapshots are cryptographically signed and stored.",
    metrics: {
      decisionsLogged: 1247,
      integrityChecks: "Passed",
      storageRedundancy: "3x",
    },
    provenanceHash: "0x7e3d5a...",
    confidence: 98,
    category: "transparency",
  },
];

// Footer navigation with trust-first categorization
const footerLinks = [
  {
    category: "Transparency",
    links: [
      { href: "/privacy", label: "Privacy Charter", priority: "high" },
      { href: "/terms", label: "Terms of Service", priority: "medium" },
      {
        href: "/explainability",
        label: "Explainability Charter",
        priority: "high",
      },
    ],
  },
  {
    category: "Governance",
    links: [
      { href: "/governance", label: "Human Oversight", priority: "high" },
      { href: "/safety", label: "Safety Framework", priority: "high" },
      { href: "/emergency", label: "Emergency Procedures", priority: "medium" },
    ],
  },
  {
    category: "Technical",
    links: [
      { href: "/api", label: "API Documentation", priority: "low" },
      { href: "/status", label: "System Status", priority: "medium" },
      { href: "/audit", label: "Audit Reports", priority: "high" },
    ],
  },
];

// Trust metrics for footer display
const systemMetrics = {
  uptime: "99.97%",
  decisionLatency: "< 150ms",
  constraintViolations: "0 (30d)",
  lastAudit: "Passed - 2024-10-01",
  totalDecisions: "47,283",
  humanOverrides: "2 (testing)",
};

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function FooterSection({ title, children, className }: FooterSectionProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-(--text-tertiary)">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function AppFooter() {
  return (
    <Container size="xl" className="pb-12 pt-10">
      <footer
        className="text-sm text-(--text-secondary)"
        role="contentinfo"
        aria-label="AIMP footer with trust anchors and system information"
      >
        {/* Main Trust Anchors Section */}
        <div
          className={cn(
            "glass-panel glass-panel-elevated rounded-[26px] px-8 py-10",
            "backdrop-blur-medium transition-all duration-300 ease-neural"
          )}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Trust Message */}
            <div className="max-w-md space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
                  Trust Anchors
                </p>
                <Provenance
                  hash="0xf1e9a7..."
                  type="system"
                  className="opacity-60"
                />
              </div>

              <h2 className="text-2xl font-semibold text-(--text-primary) leading-tight">
                Every decision is constrained, explainable, and auditable.
              </h2>

              <p className="text-(--text-secondary) leading-relaxed">
                AIMP operates under cryptographic constraints with full
                transparency. Human oversight is always maintained, and every
                action is recorded immutably.
              </p>

              {/* Live System Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <div className="text-xs text-(--text-tertiary)">
                    System Uptime
                  </div>
                  <div className="font-semibold text-(--prosperity-primary)">
                    {systemMetrics.uptime}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-(--text-tertiary)">
                    Decision Latency
                  </div>
                  <div className="font-semibold text-(--intelligence-primary)">
                    {systemMetrics.decisionLatency}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-(--text-tertiary)">
                    Violations (30d)
                  </div>
                  <div className="font-semibold text-(--prosperity-primary)">
                    {systemMetrics.constraintViolations}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-(--text-tertiary)">
                    Last Audit
                  </div>
                  <div className="font-semibold text-(--text-primary)">
                    Passed
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Cues Grid */}
            <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
              {trustCues.map((cue) => (
                <TrustAnchor
                  key={cue.id}
                  id={cue.id}
                  title={cue.title}
                  detail={cue.detail}
                  explanation={cue.explanation}
                  metrics={cue.metrics}
                  provenanceHash={cue.provenanceHash}
                  confidence={cue.confidence}
                  category={
                    cue.category as "safety" | "governance" | "transparency"
                  }
                  className={cn(
                    "rounded-3xl border border-(--glass-border-soft) bg-(--glass-surface-primary) p-4",
                    "hover:border-(--glass-border-highlight) hover:bg-(--glass-surface-primary)/80",
                    "transition-all duration-200 ease-neural cursor-pointer group",
                    "backdrop-blur-sm hover:backdrop-blur-md"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Audit Trail */}
          <div className="mt-8 pt-6 border-t border-(--glass-border-soft)">
            <AuditTrail
              totalDecisions={systemMetrics.totalDecisions}
              humanOverrides={systemMetrics.humanOverrides}
              lastAudit={systemMetrics.lastAudit}
              className="mb-6"
            />
          </div>
        </div>

        {/* Footer Navigation */}
        <div
          className={cn(
            "mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
            "text-xs uppercase tracking-[0.32em] text-(--text-tertiary)"
          )}
        >
          {/* Brand and System Status */}
          <FooterSection title="System">
            <div className="space-y-2 normal-case tracking-normal">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-(--text-primary)">
                  AIMP Protocol
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-(--prosperity-primary) animate-pulse" />
              </div>
              <p className="text-(--text-secondary) text-xs">
                Autonomous Infrastructure Interface
              </p>
              <div className="pt-2 text-xs text-(--text-tertiary)">
                Build: v0.1.0-beta • Node: Healthy
              </div>
            </div>
          </FooterSection>

          {/* Navigation Links by Category */}
          {footerLinks.map((section) => (
            <FooterSection key={section.category} title={section.category}>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block transition-colors duration-200 hover:text-(--text-primary)",
                      "normal-case tracking-normal",
                      link.priority === "high" &&
                        "font-medium text-(--text-secondary)"
                    )}
                    {...(link.priority === "high" && {
                      "data-priority": "high",
                    })}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </FooterSection>
          ))}
        </div>

        {/* Legal and Compliance Footer */}
        <div
          className={cn(
            "mt-8 pt-6 border-t border-(--glass-border-soft)/50",
            "flex flex-col gap-4 text-xs text-(--text-muted) md:flex-row md:items-center md:justify-between"
          )}
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <span className="font-medium">
              © 2024 AIMP Protocol. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-(--prosperity-primary)" />
                Regulated Infrastructure
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-(--intelligence-primary)" />
                AI Safety Certified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Provenance
              hash="0xa8d4c2..."
              type="legal"
              label="Legal Hash"
              className="text-xs"
            />
            <span className="text-(--text-tertiary)">
              Last Updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Emergency Contact Strip */}
        <div
          className={cn(
            "mt-6 rounded-2xl border border-caution-primary/20 bg-caution-background/30 p-4",
            "backdrop-blur-sm"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-caution-primary animate-pulse" />
              <span className="text-sm font-medium text-caution-primary">
                Emergency Contacts
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-(--text-secondary)">
              <Link
                href="/emergency"
                className="hover:text-(--text-primary) transition-colors duration-200"
              >
                Technical: emergency@aimp.io
              </Link>
              <Link
                href="/safety"
                className="hover:text-(--text-primary) transition-colors duration-200"
              >
                Safety: safety@aimp.io
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
}
