import { Button } from "@/components/Button";
import { track } from "@/lib/track";
import { Link } from "wouter";
import { DEMO_URL } from "@/lib/links";

interface FinalCTAProps {
  title?: string;
  description?: string;
  location: string;
}

export function FinalCTA({ 
  title = "See CloudVerse on your data.", 
  description = "We'll map your spend structure and the fastest path to measurable savings.",
  location
}: FinalCTAProps) {
  return (
    <section className="py-8 sm:py-10 lg:py-12 border-t border-cv-line dark:border-white/10">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20">
        <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.03] p-10 sm:p-12 lg:p-16 flex flex-col items-center text-center">
          <div className="max-w-2xl flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cv-ink mb-4">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-cv-muted mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={DEMO_URL} onClick={() => track("cta_demo", { location })}>
                <Button size="lg" className="w-full sm:w-auto">
                  Book a demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
