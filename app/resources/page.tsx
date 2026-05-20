import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/lib/resources";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Resources — CloudVerse",
  description: "Customer stories, reports, and practitioner guides on cloud, AI, and warehouse economics.",
  alternates: { canonical: "/resources" },
};

const TAG_COLORS: Record<string, string> = {
  Guide: "#0E9E7A",
  Report: "#1664C0",
  "Customer story": "#D97706",
  Whitepaper: "#6954D4",
};

export default function Page() {
  return (
    <>
      <section className="cv-hero-bg pt-[140px] pb-12 lg:pt-[160px] lg:pb-16 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">Resources</div>
          <h1 className="cv-h1 text-cv-ink max-w-3xl">Practitioner-grade reading on compute economics.</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-2xl">
            Customer stories, reports, and guides written by the people who do this work — not by marketing.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((r) => (
              <Link
                key={r.slug}
                href={`/resources/${r.slug}`}
                className="group rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6 hover:bg-cv-ink/[0.04] transition-colors flex flex-col"
                data-testid={`resource-${r.slug}`}
              >
                <div className="flex items-center gap-3 text-[11px] text-cv-ink/50 mb-4">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider"
                    style={{ borderColor: `${TAG_COLORS[r.tag]}66`, color: TAG_COLORS[r.tag] }}
                  >
                    {r.tag}
                  </span>
                  <span>·</span>
                  <span>{r.readTime}</span>
                </div>
                <div className="font-display font-semibold text-cv-ink text-lg leading-snug">{r.title}</div>
                <p className="text-cv-ink/65 text-sm mt-3 leading-relaxed flex-1">{r.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-cv-blue-light font-medium">
                  Read article <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Have a story worth telling?" sub="We work with practitioners on customer stories, joint research, and guest pieces." />
    </>
  );
}
