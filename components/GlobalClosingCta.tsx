"use client";

import { usePathname } from "next/navigation";
import ClosingCtaBand from "@/components/ClosingCtaBand";

// Routes that render their own customised ClosingCtaBand, so the global
// default one must be suppressed to avoid two stacked closing bands.
const HIDE_ON = ["/integrations"];

export default function GlobalClosingCta() {
  const pathname = usePathname();
  if (pathname && HIDE_ON.includes(pathname)) return null;
  // The homepage (AIX root) closes on its own agent-governance CTA.
  if (pathname === "/") {
    return (
      <ClosingCtaBand
        heading="See what's already running that you don't know about."
        subtext="Most teams find at least one ungoverned agent in the first onboarding call."
        primaryLabel="Book a demo"
        secondaryLabel="Start a 3-week private pilot"
        secondaryHref="/connect"
      />
    );
  }
  // The Technology Spend platform page closes on its own spend CTA.
  if (pathname === "/platform/finops") {
    return (
      <ClosingCtaBand
        heading="See it on your technology bill: cloud, AI, data, and SaaS."
        subtext="Most teams find their first concrete savings opportunity within the first onboarding call."
        primaryLabel="Book a demo"
        secondaryLabel="Request a technology spend assessment"
        secondaryHref="/contact"
      />
    );
  }
  return <ClosingCtaBand />;
}
