import Link from "next/link";
import { ArrowRight } from "@solar-icons/react";

const GUIDES = [
  {
    eyebrow: "Insight",
    title: "AI is becoming the new cloud bill",
    body: "Why AI spend outran the tools built to govern cloud, and what an AI-native FinOps layer does differently.",
    href: "/resources",
  },
  {
    eyebrow: "Case Study",
    title: "From invisible spend to accountable architecture",
    body: "How one digital organization gained visibility across 129 applications and Rp8.77B in multi-cloud spend.",
    href: "/resources",
  },
  {
    eyebrow: "Guide",
    title: "Cloud governance solved infrastructure chaos. What solves AI chaos?",
    body: "The case for routing, unit economics, and governance built for models and agents, not borrowed from infrastructure.",
    href: "/resources",
  },
];

export function GuidesResources() {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className="flex items-end justify-between mb-10 gap-6">
          <h2 className="cv-h2 text-cv-ink max-w-sm">Latest guides and resources</h2>
          <Link
            href="/resources"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#1664C0] dark:text-[#7CB8F8] hover:opacity-80 transition-opacity shrink-0"
          >
            View all <ArrowRight weight="Linear" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUIDES.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="group flex flex-col rounded-2xl border border-cv-line/40 bg-cv-card dark:bg-black p-6 hover:border-cv-line/70 transition-colors"
            >
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-4">
                {g.eyebrow}
              </span>
              <h3 className="text-base font-semibold text-cv-ink leading-snug flex-1">
                {g.title}
              </h3>
              <p className="mt-3 text-sm text-cv-ink/55 leading-relaxed">
                {g.body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#1664C0] dark:text-[#7CB8F8] group-hover:gap-2 transition-all">
                Learn More <ArrowRight weight="Linear" size={12} />
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-6 flex sm:hidden justify-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#1664C0] dark:text-[#7CB8F8]"
          >
            View all resources <ArrowRight weight="Linear" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
