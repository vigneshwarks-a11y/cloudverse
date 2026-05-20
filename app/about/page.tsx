import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "About CloudVerse",
  description: "We build the compute economics platform for the AI era — multi-cloud, AI, infrastructure, and warehouse spend on one control plane.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { title: "Practitioner-first",  body: "Our product team is built from former platform engineers, FinOps practitioners, and infrastructure operators — not from outside-in consultants." },
  { title: "Proof over claims",   body: "Every recommendation we surface comes with explicit payback. Every routing decision leaves an auditable trail." },
  { title: "Read-only by default",body: "We connect to your environment in a posture you can defend in a security review. Automation is opt-in and policy-bound." },
  { title: "One model, many clouds", body: "Multi-cloud, AI, infrastructure, and warehouse spend belong on the same allocation model — not in four separate reports." },
];

export default function Page() {
  return (
    <>
      <section className="cv-hero-bg pt-[140px] pb-16 lg:pt-[160px] lg:pb-20 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">About</div>
          <h1 className="cv-h1 text-cv-ink max-w-4xl">
            We build the compute economics platform <span className="text-cv-blue-light">for the AI era.</span>
          </h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-2xl">
            CloudVerse is the control plane for multi-cloud, AI, infrastructure, and warehouse economics — used by enterprise finance, engineering, and platform teams to govern the decisions that shape the bill.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface">
        <div className="cv-container max-w-3xl">
          <div className="cv-label mb-3">Our story</div>
          <h2 className="cv-h2 text-cv-ink mb-6">Built from operating a multi-cloud estate at scale.</h2>
          <div className="space-y-5 text-cv-ink/80 text-[17px] leading-relaxed">
            <p>
              CloudVerse started where most cost-governance products do not — inside the operations of a multi-cloud enterprise estate, where allocation broke down at every BU boundary and where engineering teams could not explain a 30% month-over-month swing.
            </p>
            <p>
              The first version of the product was a single FinOps allocation model that worked across AWS, Azure, and GCP simultaneously. The second added the optimization and anomaly engine. Then came AIX as GPU and inference spend started reshaping the bill. Then DevX, because cost regressions are easier to prevent than to chase. Then DataX, because warehouse spend deserved the same discipline.
            </p>
            <p>
              Today CloudVerse runs as one control plane across four product surfaces — one allocation model, one governance posture, one audit trail. That is the product. The rest is implementation detail.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">Values</div>
            <h2 className="cv-h2 text-cv-ink">How we work.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6">
                <div className="font-display font-semibold text-cv-ink text-lg">{v.title}</div>
                <p className="text-cv-ink/70 text-sm mt-2 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand heading="Want to work with us?" sub="We're hiring practitioners across product, engineering, and customer teams." />
    </>
  );
}
