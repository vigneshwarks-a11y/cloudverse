"use client";

/* Wraps every route with the marketing site's chrome (Nav, GSAP
   ScrollSmoother, the global closing CTA band, Footer) — except /keystatic.
   The Keystatic admin UI is a separate app embedded at that route, not a
   marketing page: it has its own header/sidebar, and ScrollSmoother
   transforming #smooth-content would break its own fixed/sticky elements
   (see lib/gsap.ts). Client component (needs usePathname) so the decision
   can't be made in the server-only root layout. */

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";
import GlobalClosingCta from "@/components/GlobalClosingCta";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Matches /keystatic-login too — "startsWith" is intentional, not a typo.
  const isAdmin = pathname?.startsWith("/keystatic");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Nav />
      <SmoothScroll>
        <main>{children}</main>
        <GlobalClosingCta />
        <Footer />
      </SmoothScroll>
    </>
  );
}

export default SiteChrome;
