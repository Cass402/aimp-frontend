import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppFooter } from "./_components/app-footer";
import { AppHeader } from "./_components/app-header";
import { AIMPThemeProvider } from "@/components/providers/aimp-theme-provider";
import { LayoutAnimationWrapper } from "./_components/layout-animation-wrapper";
import { EnhancedBackgroundSystem } from "./_components/enhanced-background-system";
import "./globals.css";

// Optimized font loading with display: swap and subset optimization
// These provide fallback fonts; globals.css uses FKGroteskNeue as primary
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
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#32808d",
      },
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

// Main layout with enhanced background system for calm autonomy
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-base text-primary bg-foundation-void antialiased"
        suppressHydrationWarning
      >
        {/* Theme init script (prevents FOUC) - must be first in body */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('aimp-theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.colorScheme = theme;
              })();
            `,
          }}
        />

        {/* Enhanced Multi-Layer Background System */}
        <EnhancedBackgroundSystem />

        {/* Theme Provider with Neural Context */}
        <AIMPThemeProvider>
          {/* Header with enhanced glass morphism - OUTSIDE animation wrapper for true fixed positioning */}
          <AppHeader />

          {/* Animation Wrapper with Calm Motion */}
          <LayoutAnimationWrapper>
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                         bg-trust-primary text-white px-4 py-2 rounded-md 
                         focus:z-50 focus:outline-none focus:ring-2 focus:ring-trust-secondary"
            >
              Skip to main content
            </a>

            {/* Main layout structure with glass layers */}
            <div className="relative min-h-screen">
              {/* Main content area with contextual background response */}
              <main
                id="main-content"
                className="relative z-10 pt-20"
                role="main"
                aria-label="Main content"
              >
                {children}
              </main>

              {/* Footer with subtle glass integration */}
              <AppFooter />
            </div>

            {/* AI Presence Indicators */}
            <div
              className="fixed bottom-6 right-6 z-40 pointer-events-none"
              aria-hidden="true"
            >
              <div className="ai-pulse-indicator opacity-60" />
            </div>
          </LayoutAnimationWrapper>
        </AIMPThemeProvider>

        {/* Progressive enhancement script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced background progressive loading
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  document.body.classList.add('enhanced-bg-ready');
                });
              } else {
                setTimeout(() => {
                  document.body.classList.add('enhanced-bg-ready');
                }, 100);
              }
              
              // Reduced motion handling
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.classList.add('reduce-motion');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
