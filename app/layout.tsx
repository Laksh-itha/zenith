import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/hooks/useTheme";
import { DecorativeBackground } from "@/components/ui/DecorativeBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { BackToTop } from "@/components/ui/BackToTop";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "600"],
});

const siteUrl = "https://zenith-ai.example.com";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZenithAI",
  url: siteUrl,
  description:
    "ZenithAI builds purpose-specific AI products for businesses and everyday life — analytics, automation, education, and consumer tools.",
  sameAs: [],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZenithAI — Building AI Solutions for Businesses & Everyday Life",
    template: "%s | ZenithAI",
  },
  description:
    "ZenithAI is a family of purpose-built AI products — analytics, automation, education, and consumer tools — designed to feel like a capable teammate.",
  keywords: [
    "AI startup",
    "AI products",
    "business automation",
    "AI analytics",
    "AI for education",
    "ZenithAI",
  ],
  authors: [{ name: "ZenithAI" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "ZenithAI — Building AI Solutions for Businesses & Everyday Life",
    description:
      "A family of purpose-built AI products designed to feel like a capable teammate, not another dashboard.",
    siteName: "ZenithAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenithAI — Building AI Solutions for Businesses & Everyday Life",
    description:
      "A family of purpose-built AI products designed to feel like a capable teammate, not another dashboard.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script prevents a light/dark flash by applying the theme
            class before React hydrates and before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('zenith-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[300] -translate-y-24 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SplashScreen />
          <DecorativeBackground />
          <CustomCursor />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
