/* "AI compute is becoming too expensive to hardcode" — a lead-in section that
   sets up the Before/After Agentry comparison that follows. Two-column: heading
   left, supporting copy right (SectionHeading), matching the home lead-in
   rhythm. cv-* tokens, theme-aware. Server component. */

import { SectionHeading } from "@/components/SectionHeading";

export function HardcodeCost() {
  return (
    <section className="pt-16 sm:pt-20 lg:pt-28 pb-0 bg-cv-surface2 dark:bg-black" data-testid="section-hardcode-cost">
      <div className="cv-container">
        <SectionHeading eyebrow="The problem" title="AI agents are multiplying faster than they can be governed.">
          40% of enterprise applications will embed task-specific AI agents in 2026, up from under 5%
          in 2025 (Gartner). Every ungoverned agent is unbudgeted spend, an unauditable decision path,
          and an unmonitored data flow, invisible to you until the invoice lands or the incident
          does.
        </SectionHeading>
      </div>
    </section>
  );
}

export default HardcodeCost;
