import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPoint, VideoFrame } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Events & Webinars — CloudVerse",
  description: "Live workshops, webinars, and conferences where CloudVerse is speaking on cloud, AI, and data economics.",
  alternates: { canonical: "/events" },
};

type Event = { date: string; title: string; venue: string; mode: "in-person" | "virtual"; href?: string; tag: string };

const UPCOMING: Event[] = [
  { date: "Jun 18, 2026", title: "FinOps for the AI era — workshop", venue: "Virtual · 60 min",       mode: "virtual",   tag: "Webinar" },
  { date: "Jul 09, 2026", title: "Allocation models that engineering trusts", venue: "Virtual · 45 min", mode: "virtual",  tag: "Webinar" },
  { date: "Aug 21, 2026", title: "AIX deep dive: routing & guardrails",       venue: "Virtual · 45 min", mode: "virtual",  tag: "Webinar" },
  { date: "Sep 17, 2026", title: "GCP Cloud Summit · San Francisco",          venue: "Moscone West",     mode: "in-person", tag: "Conference" },
];

const PAST: Event[] = [
  { date: "Apr 30, 2026", title: "FinOps X — booth + lightning talk", venue: "San Diego", mode: "in-person", tag: "Conference" },
  { date: "Mar 12, 2026", title: "Predicting warehouse spikes with DataX", venue: "Virtual", mode: "virtual", tag: "Webinar" },
  { date: "Feb 06, 2026", title: "AWS re:Invent recap — what AI workloads cost in 2026", venue: "Virtual", mode: "virtual", tag: "Webinar" },
];

function Card({ e }: { e: Event }) {
  const Icon = e.mode === "virtual" ? VideoFrame : MapPoint;
  return (
    <div className="rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6 hover:bg-cv-ink/[0.04] transition-colors">
      <div className="flex flex-wrap items-center gap-3 text-xs text-cv-ink/55 mb-3">
        <span className="inline-flex items-center gap-1.5">
          <Calendar weight="Linear" size={12} /> {e.date}
        </span>
        <span className="w-1 h-1 rounded-full bg-cv-ink/30" />
        <span className="inline-flex items-center gap-1.5">
          <Icon size={12} weight="Linear" /> {e.venue}
        </span>
        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full bg-cv-blue/10 border border-cv-blue/30 text-[10px] uppercase tracking-wider">
          {e.tag}
        </span>
      </div>
      <div className="font-display font-semibold text-cv-ink text-lg">{e.title}</div>
      <Link
        href={e.href || DEMO_URL}
        className="mt-4 inline-flex items-center gap-1.5 text-sm text-cv-blue-light font-medium"
      >
        Register <ArrowRight weight="Linear" size={14} />
      </Link>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <section className="cv-hero-bg pt-[240px] pb-12 lg:pt-[240px] lg:pb-16 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">Events</div>
          <h1 className="cv-h1 text-cv-ink max-w-3xl">Where to Meet Us, Learn Live, and Ask Hard Questions.</h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-2xl">
            Workshops, deep dives, and conferences across cloud, AI, and data economics. Practitioner-led.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="cv-label mb-3">Upcoming</div>
          <h2 className="cv-h2 text-cv-ink mb-8">Live and in person.</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {UPCOMING.map((e) => <Card key={e.title} e={e} />)}
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="cv-label mb-3">On demand</div>
          <h2 className="cv-h2 text-cv-ink mb-8">Recent recordings.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAST.map((e) => <Card key={e.title} e={e} />)}
          </div>
        </div>
      </section>

      <CTABand heading="Want us to come speak at your event?" sub="Drop us a line — we love practitioner audiences." />
    </>
  );
}
