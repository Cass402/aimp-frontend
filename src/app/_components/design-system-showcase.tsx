/**
 * Design System Showcase
 * Demonstrates the complete power of your globals.css design tokens
 */

export function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-(--foundation-neural) p-(--space-32)">
      {/* Neural breathing background */}
      <div className="fixed inset-0 bg-gradient-to-br from-(--trust-primary)/10 to-(--intelligence-primary)/5 animate-(--animate-neural-breathing) pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-(--space-32)">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-(--text-primary) text-(--font-size-4xl) font-weight-(--font-weight-bold) mb-(--space-16)">
            🎨 Design System Showcase
          </h1>
          <p className="text-(--text-secondary) text-(--font-size-lg)">
            All your amazing globals.css tokens, now accessible as Tailwind
            utilities!
          </p>
        </header>

        {/* Glass Cards Grid */}
        <section>
          <h2 className="text-(--text-primary) text-(--font-size-2xl) font-weight-(--font-weight-semibold) mb-(--space-20)">
            Glass Morphism Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-(--space-24)">
            {/* Trust Card */}
            <div className="bg-(--glass-surface-primary) backdrop-blur-(--blur-glass) border border-(--glass-border-soft) rounded-(--radius-xl) p-(--space-24) shadow-(--glow-trust-primary) transition-all duration-(--duration-normal) hover:shadow-(--glow-prosperity-primary) hover:border-(--glass-border-highlight)">
              <div className="flex items-center gap-(--space-12) mb-(--space-16)">
                <div className="w-(--space-12) h-(--space-12) bg-(--trust-primary) rounded-(--radius-full) animate-(--animate-trust-pulse)" />
                <h3 className="text-(--trust-primary) text-(--font-size-xl) font-weight-(--font-weight-semibold)">
                  Trust System
                </h3>
              </div>
              <p className="text-(--text-secondary) text-(--font-size-base) mb-(--space-12)">
                Glass morphism with trust glow
              </p>
              <div className="text-(--trust-secondary) text-(--font-size-sm)">
                98% Trust Score
              </div>
            </div>

            {/* Intelligence Card */}
            <div className="bg-(--glass-surface-elevated) border border-(--glass-border-strong) rounded-(--radius-xl) p-(--space-24) shadow-(--shadow-neural-strong) animate-(--animate-ai-pulse)">
              <div className="flex items-center gap-(--space-12) mb-(--space-16)">
                <div className="w-(--space-12) h-(--space-12) bg-(--intelligence-primary) rounded-(--radius-full) shadow-(--glow-intelligence-primary)" />
                <h3 className="text-(--intelligence-primary) text-(--font-size-xl) font-weight-(--font-weight-semibold)">
                  AI Intelligence
                </h3>
              </div>
              <p className="text-(--text-secondary) text-(--font-size-base) mb-(--space-12)">
                Neural network active
              </p>
              <div className="inline-flex items-center gap-(--space-8) bg-(--intelligence-accent)/20 px-(--space-12) py-(--space-6) rounded-(--radius-full)">
                <span className="text-(--intelligence-primary) text-(--font-size-sm) font-weight-(--font-weight-medium)">
                  Learning Mode
                </span>
              </div>
            </div>

            {/* Prosperity Card */}
            <div className="bg-(--glass-surface-primary) backdrop-blur-(--blur-glass-strong) border border-(--glass-border-highlight) rounded-(--radius-xl) p-(--space-24) shadow-(--glow-prosperity-primary) animate-(--animate-prosperity-grow)">
              <div className="flex items-center gap-(--space-12) mb-(--space-16)">
                <div className="w-(--space-12) h-(--space-12) bg-(--prosperity-energy) rounded-(--radius-full) animate-(--animate-neural-float)" />
                <h3 className="text-(--prosperity-primary) text-(--font-size-xl) font-weight-(--font-weight-semibold)">
                  Prosperity
                </h3>
              </div>
              <div className="text-(--prosperity-primary) text-(--font-size-3xl) font-weight-(--font-weight-bold) mb-(--space-8)">
                +12.5%
              </div>
              <p className="text-(--text-secondary) text-(--font-size-sm)">
                Annual Percentage Yield
              </p>
            </div>
          </div>
        </section>

        {/* Status Pills */}
        <section>
          <h2 className="text-(--text-primary) text-(--font-size-2xl) font-weight-(--font-weight-semibold) mb-(--space-20)">
            Semantic Status Pills
          </h2>
          <div className="flex flex-wrap gap-(--space-16)">
            <div className="inline-flex items-center gap-(--space-8) bg-(--prosperity-primary) text-white px-(--space-16) py-(--space-8) rounded-(--radius-full) shadow-(--glow-prosperity-primary)">
              <div className="w-(--space-6) h-(--space-6) bg-white rounded-(--radius-full) animate-(--animate-trust-pulse)" />
              <span className="text-(--font-size-sm) font-weight-(--font-weight-medium)">
                Operational
              </span>
            </div>

            <div className="inline-flex items-center gap-(--space-8) bg-(--intelligence-primary) text-white px-(--space-16) py-(--space-8) rounded-(--radius-full) shadow-(--glow-intelligence-primary) animate-(--animate-ai-learning)">
              <span className="text-(--font-size-sm) font-weight-(--font-weight-medium)">
                AI Active
              </span>
            </div>

            <div className="inline-flex items-center gap-(--space-8) bg-(--caution-primary) text-white px-(--space-16) py-(--space-8) rounded-(--radius-full)">
              <span className="text-(--font-size-sm) font-weight-(--font-weight-medium)">
                ⚠️ Caution
              </span>
            </div>

            <div className="inline-flex items-center gap-(--space-8) bg-(--critical-primary) text-white px-(--space-16) py-(--space-8) rounded-(--radius-full)">
              <span className="text-(--font-size-sm) font-weight-(--font-weight-medium)">
                🚨 Critical
              </span>
            </div>
          </div>
        </section>

        {/* Animation Showcase */}
        <section>
          <h2 className="text-(--text-primary) text-(--font-size-2xl) font-weight-(--font-weight-semibold) mb-(--space-20)">
            Animation System
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-(--space-16)">
            <div className="bg-(--glass-surface-elevated) border border-(--glass-border-soft) rounded-(--radius-lg) p-(--space-20) text-center animate-(--animate-neural-float)">
              <div className="text-(--font-size-sm) text-(--text-secondary) mb-(--space-8)">
                Neural Float
              </div>
              <div className="text-(--font-size-2xl)">🎈</div>
            </div>

            <div className="bg-(--glass-surface-elevated) border border-(--glass-border-soft) rounded-(--radius-lg) p-(--space-20) text-center animate-(--animate-ai-pulse)">
              <div className="text-(--font-size-sm) text-(--text-secondary) mb-(--space-8)">
                AI Pulse
              </div>
              <div className="text-(--font-size-2xl)">🧠</div>
            </div>

            <div className="bg-(--glass-surface-elevated) border border-(--glass-border-soft) rounded-(--radius-lg) p-(--space-20) text-center animate-(--animate-trust-pulse)">
              <div className="text-(--font-size-sm) text-(--text-secondary) mb-(--space-8)">
                Trust Pulse
              </div>
              <div className="text-(--font-size-2xl)">🛡️</div>
            </div>

            <div className="bg-(--glass-surface-elevated) border border-(--glass-border-soft) rounded-(--radius-lg) p-(--space-20) text-center animate-(--animate-intelligence-glow)">
              <div className="text-(--font-size-sm) text-(--text-secondary) mb-(--space-8)">
                Intelligence Glow
              </div>
              <div className="text-(--font-size-2xl)">✨</div>
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section>
          <h2 className="text-(--text-primary) text-(--font-size-2xl) font-weight-(--font-weight-semibold) mb-(--space-20)">
            Typography System
          </h2>
          <div className="bg-(--glass-surface-elevated) border border-(--glass-border-soft) rounded-(--radius-xl) p-(--space-32) space-y-(--space-16)">
            <div className="text-(--text-primary) text-(--font-size-4xl) font-weight-(--font-weight-bold)">
              4XL Bold Headline
            </div>
            <div className="text-(--text-primary) text-(--font-size-3xl) font-weight-(--font-weight-semibold)">
              3XL Semibold Subheadline
            </div>
            <div className="text-(--text-primary) text-(--font-size-2xl) font-weight-(--font-weight-medium)">
              2XL Medium Section Title
            </div>
            <div className="text-(--text-secondary) text-(--font-size-lg)">
              Large body text for readability
            </div>
            <div className="text-(--text-secondary) text-(--font-size-base)">
              Base body text (14px) for most content
            </div>
            <div className="text-(--text-tertiary) text-(--font-size-sm)">
              Small supporting text
            </div>
            <div className="text-(--text-muted) text-(--font-size-xs)">
              Extra small metadata
            </div>
          </div>
        </section>

        {/* Border Radius Examples */}
        <section>
          <h2 className="text-(--text-primary) text-(--font-size-2xl) font-weight-(--font-weight-semibold) mb-(--space-20)">
            Border Radius Scale
          </h2>
          <div className="flex flex-wrap gap-(--space-16)">
            <div className="bg-(--trust-primary) text-white px-(--space-20) py-(--space-12) rounded-(--radius-sm)">
              Small (6px)
            </div>
            <div className="bg-(--trust-primary) text-white px-(--space-20) py-(--space-12) rounded-(--radius-base)">
              Base (8px)
            </div>
            <div className="bg-(--trust-primary) text-white px-(--space-20) py-(--space-12) rounded-(--radius-md)">
              Medium (10px)
            </div>
            <div className="bg-(--trust-primary) text-white px-(--space-20) py-(--space-12) rounded-(--radius-lg)">
              Large (12px)
            </div>
            <div className="bg-(--trust-primary) text-white px-(--space-20) py-(--space-12) rounded-(--radius-xl)">
              XL (16px)
            </div>
            <div className="bg-(--trust-primary) text-white px-(--space-20) py-(--space-12) rounded-(--radius-2xl)">
              2XL (20px)
            </div>
            <div className="bg-(--trust-primary) text-white px-(--space-20) py-(--space-12) rounded-(--radius-full)">
              Full (Pill)
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
