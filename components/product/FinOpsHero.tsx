import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/lib/solar-icons";
import { DEMO_URL } from "@/lib/links";
import { PageHero } from "@/components/PageHero";

export function FinOpsHero({ children }: { children?: ReactNode }) {
  return (
    <PageHero
      eyebrow="CloudVerse Technology Spend"
      accent="blue"
      title="Every technology dollar. Explained, owned, and optimized."
      subtitle="Manage cloud, AI, data-platform, and SaaS spend through one intelligent control plane. CloudVerse connects billing, usage, contracts, and ownership into one data model, no disconnected cost-management tools."
      actions={
        <>
          <Link href={DEMO_URL} className="cv-btn-primary">
            <span>Book a demo</span>
            <ArrowRight weight="Linear" size={16} />
          </Link>
          <Link href="/contact" className="cv-btn-ghost">Request a technology spend assessment</Link>
          <Link
            href="/efficiency-snapshot"
            className="basis-full inline-flex items-center justify-center gap-1 text-sm text-cv-blue dark:text-cv-blue-light hover:text-cv-blue-bright hover:underline underline-offset-2 transition-colors"
            data-testid="link-efficiency-snapshot"
          >
            Upload any cloud invoice. Get an actionable savings report in 30 seconds <ArrowRight weight="Linear" size={13} />
          </Link>
        </>
      }
    >
      {children}
    </PageHero>
  );
}
