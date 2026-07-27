import type { Metadata } from "next";
import { ConnectHero } from "@/components/ConnectHero";

export const metadata: Metadata = {
  title: "Book a Demo: CloudVerse",
  description:
    "Connect your first cloud account in under 30 minutes. Most teams have their first non-obvious finding the same day.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Book a CloudVerse Demo",
    description: "Connect your first cloud account in under 30 minutes. Most teams find something non-obvious the same day.",
    url: "/connect",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Book a CloudVerse Demo" }],
  },
  twitter: { card: "summary_large_image", title: "Book a CloudVerse Demo", description: "Connect your first cloud account in under 30 minutes. Non-obvious findings the same day." },
};

export default function ConnectPage() {
  return <ConnectHero />;
}
