import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/Button";

export default function ThankYou() {
  useEffect(() => {
    document.title = "Thank You CloudVerse™";
  }, []);

  return (
    // <BaseLayout>
    <section className="flex flex-col h-screen justify-center overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20 relative justify-center items-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-cv-ink leading-tight mb-4">
            Thank you
          </h1>
          <p className="text-base sm:text-lg text-cv-muted leading-relaxed mb-8">
            Your submission is received.Our team will review your information and get back to you shortly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 cursor-pointer">
            <Link href="/" asChild>
              <Button size="lg">Go to homepage</Button>
            </Link>
           </div>
        </div>
      </div>
    </section>
    // </BaseLayout>
  );
}
