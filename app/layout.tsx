import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import GlobalClosingCta from "@/components/GlobalClosingCta";
import { ThemeProvider } from "@/components/ThemeProvider";

// Self-hosted OFFICIAL Inter (variable) from rsms.me. The Google Fonts build
// (next/font/google) strips the cvXX/ssXX character-variant features, so the
// site-wide font-feature-settings (single-story 'a' via cv11, etc.) only take
// effect with this full build. Variable file covers weights 100–900.
const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/InterVariable-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cloudverse.ai";

const DEFAULT_TITLE = "CloudVerse: Compute Economics Platform";
const DEFAULT_DESCRIPTION =
  "Cloud, AI, data, and engineering spend governed in one place. $738,983 in annualised savings at Berkshire Hathaway. Real-time cost decisions across every compute surface.";
const OG_IMAGE = "/og/default.png";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | CloudVerse",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ["cloud cost optimization", "FinOps platform", "AI cost governance", "compute economics", "cloud spend management", "unit economics"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    siteName: "CloudVerse",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CloudVerse: Compute Economics Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cloudverse",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Nav />
          <main>{children}</main>
          <GlobalClosingCta />
          <Footer />
        </ThemeProvider>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "CloudVerse",
                url: SITE_URL,
                logo: `${SITE_URL}/og/default.png`,
                description: DEFAULT_DESCRIPTION,
                sameAs: ["https://www.linkedin.com/company/cloudverse-ai"],
                contactPoint: [{
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "hello@cloudverse.ai",
                  availableLanguage: ["English"],
                }],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "CloudVerse",
                url: SITE_URL,
                potentialAction: {
                  "@type": "SearchAction",
                  target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/resources?q={search_term_string}` },
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
        {/* GTM placeholder - set NEXT_PUBLIC_GTM_ID to enable */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}
      </body>
    </html>
  );
}
