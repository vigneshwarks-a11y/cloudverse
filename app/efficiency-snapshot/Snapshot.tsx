"use client";

import { InvoiceEfficiency } from "@/components/home/InvoiceEfficiency";
import { CTABand } from "@/components/CTABand";

export default function Snapshot() {
  return (
    <>
      <section className="cv-hero-bg pt-[120px] sm:pt-[160px] pb-12 lg:pt-[240px] lg:pb-14 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4" style={{ color: "#7CB8F8" }}>Efficiency snapshot</div>
          <h1 className="cv-h1 text-cv-ink max-w-3xl">
            Upload a cloud invoice. Get an <span className="text-cv-blue-light">actionable savings report</span> in 30 seconds.
          </h1>
          <p className="cv-body-lg mt-6 text-cv-ink/75 max-w-2xl">
            Drop in any AWS, Azure, GCP, Snowflake, or Databricks invoice (CSV or TXT). We surface your top savings opportunities. not just a chart of what you spent.
          </p>
        </div>
      </section>

      <InvoiceEfficiency />

      <CTABand heading="Want this same analysis on live cloud data?" sub="Connect your account read-only. we'll surface the full picture in under 30 minutes." />
    </>
  );
}
