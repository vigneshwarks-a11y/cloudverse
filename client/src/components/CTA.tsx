import { Section } from "./Section";
import { Button } from "./Button";
import { Link } from "wouter";
import { track } from "@/lib/track";
import { DEMO_URL } from "@/lib/links";

export function CTA() {
  return (
    <Section padding="primary" className="text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="cv-h2">See CloudVerse™ on your data.</h2>
        <p className="cv-body text-cv-muted">
          Book a demo and we'll walk through your spend structure, allocation needs, and the fastest path to measurable savings.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={DEMO_URL} onClick={() => track("cta_demo", { location: "bottom_cta" })}>
            <Button size="lg" className="w-full sm:w-auto">Book a demo</Button>
          </Link>
          <Link href="/contact" onClick={() => track("cta_contact", { location: "bottom_cta" })}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">Contact sales</Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
