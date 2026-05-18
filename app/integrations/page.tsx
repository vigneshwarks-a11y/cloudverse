import type { Metadata } from "next";
import { IntegrationsExplorer } from "@/components/integrations/IntegrationsExplorer";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Integrations — CloudVerse",
  description: "Browse 100+ integrations across cloud, AI, data, infrastructure, identity, and observability. Click any integration for setup docs and requirements.",
  alternates: { canonical: "/integrations" },
};

const ENTERPRISE = [
  { title: "Read-only by default",   body: "Every connection uses scoped, least-privilege access. Nothing writes back unless you opt in." },
  { title: "Auditable and controlled", body: "Every sync and action is logged for review by security and FinOps teams." },
  { title: "Multiple ingestion modes", body: "API, billing exports, and agents — whichever pattern your platform supports." },
];

export default function Page() {
  return (
    <>
      <section className="cv-hero-bg pt-[140px] pb-12 lg:pt-[160px] lg:pb-14 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">Integrations</div>
          <h1 className="cv-h1 text-white max-w-3xl">
            Connects to the stack <span className="text-cv-blue-light">your teams already use.</span>
          </h1>
          <p className="cv-body-lg mt-6 text-white/75 max-w-2xl">
            Click any integration for its setup guide, ingestion scope, and time-to-value. Read-only by default.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface" id="explorer">
        <div className="cv-container">
          <IntegrationsExplorer />
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="cv-label mb-3">Enterprise</div>
          <h2 className="cv-h2 text-white mb-10">Built for enterprise access patterns.</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {ENTERPRISE.map((c) => (
              <div key={c.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="font-display font-semibold text-white text-lg">{c.title}</div>
                <p className="text-white/65 text-sm mt-2 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Need a connector that isn't listed?" sub="Tell us what you use — we'll prioritize it with you." />
    </>
  );
}
