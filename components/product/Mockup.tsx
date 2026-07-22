// Pattern 4 Two-column split: copy + product mockup

import { BrowserFrame } from "@/components/product/FeatureShowcase";

export function SplitMockup({
  color,
  label,
  heading,
  body,
  stat,
  mockTitle,
  mockBody,
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
        <div className="flex flex-col items-start gap-10">
          <div className="max-w-2xl text-left">
            <div className="cv-label mb-3" style={{ color }}>{label}</div>
            <h2 className="cv-h2 text-cv-ink">{heading}</h2>
            <div className="cv-body-lg mt-5 text-cv-ink/75">{body}</div>
            {stat && (
              <div className="mt-7 inline-block rounded-lg border border-cv-line/10 bg-cv-ink/[0.04] px-5 py-4">
                <div className="font-display font-semibold text-cv-ink text-2xl tabular-nums" style={{ color }}>
                  {stat.value}
                </div>
                <div className="text-cv-ink/55 text-[11px] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            )}
          </div>
          <div className="mx-auto w-full max-w-3xl">
            <BrowserFrame title={mockTitle} color={color}>
              {mockBody}
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
