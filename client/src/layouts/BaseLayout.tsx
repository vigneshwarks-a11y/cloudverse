import { ReactNode, useEffect } from "react";
import { SiteNav } from "../components/SiteNav";
import { Footer } from "../components/Footer";
import { useLocation } from "wouter";
import { track } from "@/lib/track";

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

export function BaseLayout({ children, className }: BaseLayoutProps) {
  const [location] = useLocation();

  useEffect(() => {
    track("page_view", { path: location });
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <SiteNav />
      <main className="mt-[12px] mb-[12px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
