import type { Metadata } from "next";
import { SignUpHero } from "@/components/SignUpHero";

export const metadata: Metadata = {
  title: "Get Started with CloudVerse",
  description: "Connect your first cloud account in under 30 minutes. Read-only by default. Free tier available for Torb.",
  alternates: { canonical: "/sign-up" },
  openGraph: {
    title: "Get Started with CloudVerse",
    description: "Connect your first cloud account in under 30 minutes. Read-only by default. Free tier available for Torb.",
    url: "/sign-up",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Get Started with CloudVerse" }],
  },
  twitter: { card: "summary_large_image", title: "Get Started with CloudVerse", description: "Connect your first cloud account in under 30 minutes. Read-only by default." },
};

export default function Page() {
  return <SignUpHero />;
}
