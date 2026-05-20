import Link from "next/link";
import { NAV, DEMO_URL } from "@/lib/links";

export function Footer() {
  return (
    <footer className="bg-cv-surface2 border-t border-cv-line pt-14 pb-8" data-testid="site-footer">
      <div className="cv-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <div className="font-display font-bold text-cv-ink text-lg">
              CloudVerse<sup className="text-[10px] ml-0.5">™</sup>
            </div>
            <p className="text-cv-muted text-sm mt-3 max-w-xs">
              The compute economics platform for the AI era. Cloud, AI, data, and engineering spend — governed in one place.
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
              { label: "Events", href: "/events" },
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        <div className="mt-14 pt-6 border-t border-cv-line flex flex-col sm:flex-row justify-between gap-3 text-xs text-cv-muted">
          <div>© {new Date().getFullYear()} CloudVerse, Inc. All rights reserved.</div>
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
