"use client";

import { usePathname } from "next/navigation";
import ClosingCtaBand from "@/components/ClosingCtaBand";

// Routes that render their own customised ClosingCtaBand, so the global
// default one must be suppressed to avoid two stacked closing bands.
const HIDE_ON = ["/integrations"];

export default function GlobalClosingCta() {
  const pathname = usePathname();
  if (pathname && HIDE_ON.includes(pathname)) return null;
  return <ClosingCtaBand />;
}
