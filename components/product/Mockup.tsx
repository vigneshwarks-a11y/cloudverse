// Pattern 4 — Two-column split: copy + product mockup

import { BrowserFrame } from "@/components/product/FeatureShowcase";

export function SplitMockup({
  color,
  label,
  heading,
  body,
  stat,
  mockTitle,
  mockBody,
  reverse,
}: {
  color: string;
  label: string;
  heading: string;
  body: string | React.ReactNode;
  stat?: { value: string; label: string };
  mockTitle: string;
  mockBody: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <div className="cv-label mb-3" style={{ color }}>{label}</div>
            <h2 className="cv-h2 text-white">{heading}</h2>
            <div className="cv-body-lg mt-5 text-white/75">{body}</div>
            {stat && (
              <div className="mt-7 inline-block rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="font-display font-semibold text-white text-2xl tabular-nums" style={{ color }}>
                  {stat.value}
                </div>
                <div className="text-white/55 text-[11px] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            )}
          </div>
          <BrowserFrame title={mockTitle} color={color}>
            {mockBody}
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}
