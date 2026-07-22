/* "Why CloudVerse over Flexera / IBM Apptio" — one platform vs a portfolio of
   acquired products, with the five concrete differences. Matches the platform
   design language: cv-* tokens, pill chip, check-marked list. Server component. */

import { CheckCircle } from "@/lib/solar-icons";

const POINTS = [
  "No re-procurement to add a domain, it's already wired in.",
  "No re-onboarding, one data model across cloud, AI, data, and SaaS.",
  "No vendor sprawl, one contract, one support relationship.",
  "Pricing scales with spend under management, not a flat percentage tax on every dollar.",
  "30-day time to first measured savings, vs. multi-quarter enterprise rollouts.",
];

export function WhyCloudVerse() {
  return (
    <section className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-why-cloudverse">
      <div className="cv-container">
        <div>
          <div className="max-w-5xl text-left">
            <h2 className="cv-h2 max-w-3xl text-cv-ink">One platform, not a portfolio.</h2>
            <p className="mt-5 cv-body-lg text-cv-ink/70">
              Flexera and IBM Apptio both grew by acquiring separate products (Cloud Cost Optimization,
              Cloud Commitment Management, Kubecost, Turbonomic) and bundling them under one brand, with
              no native AI spend layer. CloudVerse runs Cloud, AI, Data, and SaaS spend on one enterprise
              license, one data model, shared infrastructure from day one.
            </p>
          </div>

          <ul className="mx-auto mt-12 max-w-2xl space-y-4">
            {POINTS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl border border-cv-line/60 bg-cv-surface p-4 dark:border-white/10 dark:bg-[#0D0D0D]"
              >
                <CheckCircle weight="Bold" size={18} className="mt-0.5 shrink-0 text-cv-teal" />
                <span className="text-[15px] leading-relaxed text-cv-ink/80">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WhyCloudVerse;
