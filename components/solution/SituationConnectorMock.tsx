/* "The situation" connector mock — a reusable two-field-card visual joined by
   a relationship pill, in the same floating-card treatment as
   FinopsClusterMock (bg-white dark:bg-black + CardLightEdge). Each
   /solutions/* page passes its own labels/values/picker items so the visual
   reflects that page's actual "the situation" narrative instead of a single
   generic mock reused everywhere. Grid layout (not flex + absolute) keeps the
   connector pill in its own column so it can never overlap card content
   regardless of card height. cv-* tokens, theme-aware. Server component. */

import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import { AltArrowDown } from "@/lib/solar-icons";

const CARD =
  "relative overflow-hidden rounded-2xl border border-cv-line bg-white p-6 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-black dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] lg:p-7";

function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
        style={{
          padding: "1.5px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,218,255,0.13), transparent 70%)", filter: "blur(26px)" }}
      />
    </>
  );
}

function FieldLabel({ children }: { children: string }) {
  return (
    <div className="relative z-[2] text-sm text-cv-ink/60">
      {children} <span className="text-cv-blue dark:text-cv-blue-light">*</span>
    </div>
  );
}

export type SituationPickItem = {
  label: string;
  Icon: ComponentType<IconProps>;
  bg: string;
  active?: boolean;
};

export function SituationConnectorMock({
  leftHeading,
  leftValue,
  attributeHeading,
  attributeValue,
  connectorLabel,
  rightHeading,
  rightSearchPlaceholder = "Search…",
  items,
}: {
  leftHeading: string;
  leftValue: string;
  attributeHeading: string;
  attributeValue: string;
  connectorLabel: string;
  rightHeading: string;
  rightSearchPlaceholder?: string;
  items: SituationPickItem[];
}) {
  return (
    // Full-bleed within the container: the two cards pin to the outer edges
    // and the connector flex-grows to fill everything between them, so there
    // is no dead margin on wide screens. Stacks vertically below lg.
    <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-0">
      {/* Left card — the object + attribute this situation is about.
          flex-1 + min-w-0 lets it grow to fill its half yet shrink to fit, so
          the row never overflows the container; max-w caps it on wide screens. */}
      <div className={`${CARD} w-full max-w-md lg:min-w-0 lg:max-w-md lg:flex-1`}>
        <CardLightEdge />
        <FieldLabel>{leftHeading}</FieldLabel>
        <div className="relative z-[2] mt-2.5 flex items-center justify-between rounded-xl border border-cv-line/70 px-4 py-3.5 text-lg text-cv-muted dark:border-white/10">
          {leftValue}
          <AltArrowDown weight="Linear" size={18} className="shrink-0 text-cv-muted" />
        </div>
        <div className="relative z-[2] mt-6">
          <FieldLabel>{attributeHeading}</FieldLabel>
        </div>
        <div className="relative z-[2] mt-2.5 rounded-xl border border-cv-line/70 px-4 py-3.5 text-lg font-medium text-cv-ink dark:border-white/10">
          {attributeValue}
        </div>
      </div>

      {/* Connector — relationship pill; the flanking lines flex-grow to span
          the full gap and butt right up against both cards (no padding gap),
          so the two cards read as genuinely wired together. */}
      <div className="z-[2] flex w-full items-center justify-center py-2 lg:w-auto lg:flex-1">
        <span aria-hidden className="hidden h-px flex-1 bg-cv-line dark:bg-white/15 lg:block" />
        <div className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-cv-line bg-white px-6 py-3.5 text-lg font-medium text-cv-ink shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-[#101014]">
          {connectorLabel}
          <AltArrowDown weight="Linear" size={18} className="text-cv-muted" />
        </div>
        <span aria-hidden className="hidden h-px flex-1 bg-cv-line dark:bg-white/15 lg:block" />
      </div>

      {/* Right card — the thing this situation resolves (or fails to) into */}
      <div className={`${CARD} w-full max-w-md lg:min-w-0 lg:max-w-md lg:flex-1`}>
        <CardLightEdge />
        <FieldLabel>{rightHeading}</FieldLabel>
        <div className="relative z-[2] mt-2.5 overflow-hidden rounded-xl border border-cv-line/70 dark:border-white/10">
          <div className="border-b border-cv-line/70 px-4 py-3.5 text-lg text-cv-muted dark:border-white/10">{rightSearchPlaceholder}</div>
          <div className="py-1.5">
            {items.map(({ label, Icon, bg, active }) => (
              <div
                key={label}
                className={`mx-1.5 flex items-center gap-3 rounded-lg px-3 py-3 ${active ? "bg-cv-ink/[0.05] dark:bg-white/[0.06]" : ""}`}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ background: bg }}
                >
                  <Icon weight="Bold" size={18} />
                </span>
                <span className="text-lg font-medium text-cv-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SituationConnectorMock;
