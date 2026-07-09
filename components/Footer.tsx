import Link from "next/link";
import { NAV, DEMO_URL } from "@/lib/links";
import { PixelMosaic } from "@/components/PixelMosaic";

// Spreads the mosaic across the top band - densest at the top-left, fading
// down and toward the right (box-relative so it scales with the footer height).
const FOOTER_MOSAIC_MASK =
  "radial-gradient(125% 145% at 0% 0%, #000 0%, #000 16%, rgba(0,0,0,0.55) 40%, transparent 66%)";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cv-surface border-t border-cv-line pt-14 pb-8" data-testid="site-footer">
      {/* Pixel-mosaic texture - top-left accent, matching the closing CTA band */}
      <PixelMosaic
        patternId="cv-footer-mosaic"
        lightColor="#4C67D4"
        darkColor="#182566"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30 dark:opacity-100"
        style={{ WebkitMaskImage: FOOTER_MOSAIC_MASK, maskImage: FOOTER_MOSAIC_MASK }}
      />

      <div className="cv-container relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <div className="font-display font-bold text-cv-ink text-lg">
              CloudVerse<sup className="text-[10px] ml-0.5">™</sup>
            </div>
            <p className="text-cv-muted text-sm mt-3 max-w-xs">
              The compute economics platform for the AI era. Cloud, AI, data, and engineering spend governed in one place.
            </p>
            <Link href={DEMO_URL} className="cv-btn-primary mt-5">
              Get a Demo
            </Link>
          </div>

          <FooterCol title="Platform" items={NAV.platform.map((p) => ({ label: p.label, href: p.href }))} />
          <FooterCol title="Solutions" items={NAV.solutions} />
          <FooterCol
            title="Company"
            items={[
              { label: "About", href: "/about" },
              { label: "Resources", href: "/resources" },
              { label: "Integrations", href: "/integrations" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        <div className="mt-14 pt-6 border-t border-cv-line flex flex-col sm:flex-row justify-between gap-3 text-xs text-cv-muted">
          <div>© {new Date().getFullYear()} cloudverse, Inc. All rights reserved.</div>
          <div className="flex gap-5">
            <Link href="/legal/privacy" className="hover:text-cv-ink">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-cv-ink">Terms</Link>
            <Link href="/legal/security" className="hover:text-cv-ink">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div>
      <div className="text-cv-ink text-xs uppercase tracking-[0.14em] font-semibold mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="text-sm text-cv-muted hover:text-cv-ink">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
