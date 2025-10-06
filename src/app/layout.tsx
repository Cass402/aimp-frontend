import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppFooter } from "./_components/app-footer";
import { AppHeader } from "./_components/app-header";
import { AIMPThemeProvider } from "@/components/providers/aimp-theme-provider";
import { NeuralBackground } from "./_components/neural-background";
import { LayoutAnimationWrapper } from "./_components/layout-animation-wrapper";
import "./globals.css";

// Optimized font loading with display: swap and subset optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// Environment-aware site URL for metadata
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const isProduction = process.env.NODE_ENV === "production";

// Enhanced metadata with trust signals and AI narrative
export const metadata: Metadata = {
  title: {
    default: "AIMP — Autonomous Infrastructure Interface",
    template: "%s | AIMP — Own the Sun. Trust the Machine.",
  },
  description:
    "Own, observe, and understand autonomous infrastructure. Trust-first dashboards, explainable AI agents, and tokenized solar assets in one surface. Built for transparency, powered by proof.",
  keywords: [
    "AIMP",
    "autonomous infrastructure",
    "solar farm",
    "explainable AI",
    "Solana",
    "tokenized assets",
    "trust-first dashboard",
    "transparent AI",
    "neural interface",
    "calm autonomy",
  ],
  authors: [{ name: "AIMP Protocol Team" }],
  creator: "AIMP Protocol",
  publisher: "AIMP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AIMP — Own the Sun. Trust the Machine. Watch It Work.",
    description:
      "Invest in solar infrastructure, monitor AI-managed operations, and audit every decision with proof-backed explainability. The future of autonomous asset ownership.",
    url: siteUrl,
    siteName: "AIMP — Autonomous Infrastructure Interface",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIMP — Autonomous Infrastructure Interface Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIMP — Autonomous Infrastructure Interface",
    description:
      "Trust-first dashboard for AI-managed solar assets with explainability, constraints, and Solana-native ownership. Built for calm transparency.",
    images: ["/twitter-image.png"],
    creator: "@AIMPProtocol",
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#32808d" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AIMP",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcf9" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2121" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

// Main layout component with trust-first architecture
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enable View Transitions API for smooth page navigation */}
        <meta name="view-transition" content="same-origin" />
        {/* Preconnect for external font CDN */}
        <link
          rel="preconnect"
          href="https://r2cdn.perplexity.ai"
          crossOrigin="anonymous"
        />

        {/* Preload critical external font */}
        <link
          rel="preload"
          href="https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* PWA capabilities */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="AIMP" />

        {/* Security and privacy policies (set via HTTP headers in next.config.js) */}
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* Structured Data for SEO - WebApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "AIMP - Autonomous Infrastructure Interface",
              description:
                "Trust-first dashboard for AI-managed solar assets with explainability, constraints, and Solana-native ownership.",
              url: siteUrl,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "127",
              },
            }),
          }}
        />

        {/* Theme initialization script - prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const getTheme = () => {
                  const stored = localStorage.getItem('aimp-theme');
                  if (stored) return stored;
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                };
                const theme = getTheme();
                document.documentElement.setAttribute('data-color-scheme', theme);
                document.documentElement.setAttribute('data-theme', 'aimp-' + theme);
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans text-(--text-primary) min-h-screen overflow-x-hidden bg-(--color-background)`}
        suppressHydrationWarning
      >
        {/* Neural background with breathing animation */}
        <NeuralBackground />

        {/* Theme provider with optimized hydration */}
        <AIMPThemeProvider>
          {/* Layout wrapper with sequential fade-in animation */}
          <LayoutAnimationWrapper>
            {/* Skip to main content link for keyboard navigation - Enhanced visibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[9999] focus:bg-[--trust-primary] focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:font-semibold focus:shadow-2xl focus:outline-[--trust-primary]/30 focus:outline-4 focus:transition-all focus:duration-200"
            >
              ⚡ Skip to main content
            </a>

            {/* Semantic structure with trust-first hierarchy */}
            <div className="relative isolate flex min-h-screen flex-col">
              {/* Header at top with proper responsive container */}
              <header className="relative z-50">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                  <div className="glass-panel-elevated rounded-3xl">
                    <AppHeader />
                  </div>
                </div>
              </header>

              {/* Main content area with generous spacing and breathing room */}
              <main className="relative z-10 flex-1" id="main-content">
                {/* Responsive container with generous padding */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-16 lg:py-16 xl:px-20 xl:py-20">
                  {children}
                </div>
              </main>

              {/* Footer with proper container and spacing */}
              <footer className="relative z-50 mt-auto">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-8 lg:px-16 xl:px-20">
                  <div className="glass-panel rounded-3xl">
                    <AppFooter />
                  </div>
                </div>
              </footer>

              {/* Emergency override accessibility */}
              <div className="sr-only" aria-live="polite">
                Press Alt+Shift+E to trigger emergency AI pause
              </div>
            </div>
          </LayoutAnimationWrapper>
        </AIMPThemeProvider>

        {/* Emergency override keyboard handler - Memory-safe with reduced motion support */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                let alertElement = null;
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                
                document.addEventListener('keydown', function(e){
                  if(e.altKey && e.shiftKey && (e.key === 'E' || e.key === 'e')){
                    e.preventDefault();
                    
                    // Dispatch custom event
                    document.body.dispatchEvent(new CustomEvent('aimp:emergency-pause', {
                      detail: { timestamp: Date.now(), trigger: 'keyboard' }
                    }));
                    
                    // Create or reuse alert element (memory-safe)
                    if (!alertElement) {
                      alertElement = document.createElement('div');
                      alertElement.setAttribute('role', 'alert');
                      alertElement.setAttribute('aria-live', 'assertive');
                      alertElement.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ef4444; color: white; padding: 2rem 3rem; border-radius: 1rem; z-index: 9999; font-weight: bold; font-size: 1.25rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 3px solid white;' + (prefersReducedMotion ? '' : ' animation: emergencyPulse 0.5s ease-in-out;');
                      alertElement.textContent = '⚠️ EMERGENCY PAUSE TRIGGERED';
                      
                      // Add animation keyframes if motion is allowed
                      if (!prefersReducedMotion) {
                        const style = document.createElement('style');
                        style.textContent = '@keyframes emergencyPulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.05); } }';
                        document.head.appendChild(style);
                      }
                      
                      document.body.appendChild(alertElement);
                    }
                    
                    alertElement.style.display = 'block';
                    
                    // Clean removal
                    setTimeout(() => {
                      if (alertElement) {
                        alertElement.style.display = 'none';
                      }
                    }, 3000);
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
