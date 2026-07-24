"use client";

import { usePathname } from "next/navigation";
import ClosingCtaBand from "@/components/ClosingCtaBand";

// Routes that render their own conversion surface (or are the conversion
// destination), so the global closing band is suppressed to avoid a duplicate.
const HIDE_ON = ["/integrations", "/connect", "/contact"];

type BandCopy = {
  heading: string;
  subtext: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

// Per-route closing-band copy. Any route not listed falls back to the default band.
const CUSTOM: Record<string, BandCopy> = {
  // Homepage (Agentry root) closes on its own agent-governance CTA.
  "/": {
    heading: "See what's already running that you don't know about.",
    subtext: "Most teams find at least one ungoverned agent in the first onboarding call.",
    primaryLabel: "Book a demo",
    secondaryLabel: "Start a 3-week private pilot",
    secondaryHref: "/connect",
  },
  // The Technology Spend platform page closes on its own spend CTA.
  "/platform/finops": {
    heading: "See it on your technology bill: cloud, AI, data, and SaaS.",
    subtext: "Most teams find their first concrete savings opportunity within the first onboarding call.",
    primaryLabel: "Book a demo",
    secondaryLabel: "Request a technology spend assessment",
    secondaryHref: "/contact",
  },
  "/solutions/ai-engineering": {
    heading: "Put a number on your AI spend you can defend.",
    subtext: "Connect read-only in about 30 minutes. Most teams find a badly mispriced route in the first call.",
    primaryLabel: "Book a demo",
    secondaryLabel: "Talk to our AI team",
    secondaryHref: "/contact",
  },
  "/solutions/enterprise": {
    heading: "Govern cloud, AI, and data from one place.",
    subtext: "One reconciled total, with chargeback that holds across business units. See it on your own estate.",
    primaryLabel: "Book a demo",
    secondaryLabel: "Talk to our enterprise team",
    secondaryHref: "/contact",
  },
  "/solutions/finops-teams": {
    heading: "The invoice arrives on time. The explanation should too.",
    subtext: "Variance traced to drivers in hours, allocation that runs itself, forecasts finance can defend.",
    primaryLabel: "Book a demo",
    secondaryLabel: "Request a spend assessment",
    secondaryHref: "/contact",
  },
  "/solutions/platform-eng": {
    heading: "Catch the cost in the pull request, not the invoice.",
    subtext: "Cost impact on every infra, code, and AI change before it ships. Velocity stays.",
    primaryLabel: "Book a demo",
    secondaryLabel: "Talk to our platform team",
    secondaryHref: "/contact",
  },
  "/solutions/data-teams": {
    heading: "Make shared warehouse spend allocable.",
    subtext: "Trace every query and pipeline to a team, including the data spend your AI workloads now drive.",
    primaryLabel: "Book a demo",
    secondaryLabel: "Talk to our data team",
    secondaryHref: "/contact",
  },
};

export default function GlobalClosingCta() {
  const pathname = usePathname();
  if (pathname && HIDE_ON.includes(pathname)) return null;
  const copy = pathname ? CUSTOM[pathname] : undefined;
  return <ClosingCtaBand {...(copy ?? {})} />;
}
