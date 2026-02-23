import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/Button";

export default function SubscribeThankYou() {
  useEffect(() => {
    document.title = "Subscribed - CloudVerse™";
  }, []);

  return (
    <section className="flex flex-col h-screen justify-center overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20 relative justify-center items-center">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-cv-ink leading-tight mb-4">
            Thanks for subscribing
          </h1>
          <p className="text-base sm:text-lg text-cv-muted leading-relaxed mb-8">
            You're on the list. We'll send the latest guides and infrastructure economics insights straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 cursor-pointer">
            <Link href="/resources" asChild>
              <Button size="lg">Browse resources</Button>
            </Link>
            <Link href="/" asChild>
              <Button variant="secondary" size="lg">Go to homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
