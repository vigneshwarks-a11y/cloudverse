import { CheckCircle, CloseCircle } from "@solar-icons/react";

export function BulletGrid({ items, tone }: { items: string[]; tone: "negative" | "positive" }) {
  if (tone === "negative") {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((b) => (
          <li key={b} className="flex items-start gap-3 rounded-2xl border border-cv-line/40 bg-cv-surface dark:bg-[#0D0D0D] p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EF4444]/10 text-[#EF4444] dark:text-[#F87171]">
              <CloseCircle weight="Linear" size={16} />
            </span>
            <span className="text-sm leading-relaxed text-cv-ink/85">{b}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((b) => {
        const [lead, ...rest] = b.split(": ");
        return (
          <li key={b} className="flex items-start gap-3 rounded-2xl border border-cv-line/40 bg-cv-surface2 dark:bg-[#0D0D0D] p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cv-teal/12 text-cv-teal">
              <CheckCircle weight="Linear" size={16} />
            </span>
            <span className="text-sm leading-relaxed text-cv-ink/85">
              <span className="font-semibold text-cv-ink">{lead}. </span>
              {rest.join(": ")}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
