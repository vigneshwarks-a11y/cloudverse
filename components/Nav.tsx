"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, DEMO_URL } from "@/lib/links";
import { ModeToggle } from "./ModeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-cv-surface/85 backdrop-blur-md border-b border-cv-line"
          : "bg-cv-surface/60 backdrop-blur-sm"
      }`}
      data-testid="site-nav"
    >
      <div className="cv-container flex items-center justify-between h-[60px]">
        <Link href="/" className="font-display font-bold text-cv-ink text-lg tracking-tight" data-testid="link-logo">
          CloudVerse<sup className="text-[10px] ml-0.5">™</sup>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenDrop(null)}>
          <DropTrigger label="Platform" open={openDrop === "platform"} onHover={() => setOpenDrop("platform")}>
            <div className="grid gap-1 p-2 w-[300px]">
              {NAV.platform.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="flex items-start gap-3 p-3 rounded-md hover:bg-cv-ink/5"
                  data-testid={`nav-link-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: it.color }} />
                  <div>
                    <div className="text-cv-ink text-sm font-medium">{it.label}</div>
                    <div className="text-cv-muted text-xs">{it.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </DropTrigger>

          <DropTrigger label="Solutions" open={openDrop === "solutions"} onHover={() => setOpenDrop("solutions")}>
            <div className="grid gap-1 p-2 w-[240px]">
              {NAV.solutions.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="block px-3 py-2 rounded-md text-sm text-cv-ink/80 hover:text-cv-ink hover:bg-cv-ink/5"
                  data-testid={`nav-link-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </DropTrigger>

          {NAV.primary.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="px-3 py-2 text-sm text-cv-ink/80 hover:text-cv-ink transition-colors"
              data-testid={`nav-link-${it.label.toLowerCase()}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ModeToggle />
          <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-get-demo">
            Get a Demo
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <ModeToggle />
          <button
            className="text-cv-ink p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-cv-surface border-t border-cv-line">
          <div className="cv-container py-4 flex flex-col gap-1">
            <div className="text-xs uppercase tracking-wider text-cv-muted px-3 mt-2 mb-1">Platform</div>
            {NAV.platform.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-cv-ink/85 hover:text-cv-ink text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <div className="text-xs uppercase tracking-wider text-cv-muted px-3 mt-3 mb-1">Solutions</div>
            {NAV.solutions.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-cv-ink/85 hover:text-cv-ink text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <div className="h-px bg-cv-line my-3" />
            {NAV.primary.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-cv-ink/85 hover:text-cv-ink text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <Link href={DEMO_URL} className="cv-btn-primary mt-3 w-full" onClick={() => setOpen(false)}>
              Get a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function DropTrigger({ label, open, onHover, children }: { label: string; open: boolean; onHover: () => void; children: React.ReactNode }) {
  return (
    <div className="relative" onMouseEnter={onHover}>
      <button
        className="px-3 py-2 text-sm text-cv-ink/80 hover:text-cv-ink inline-flex items-center gap-1"
        data-testid={`nav-trigger-${label.toLowerCase()}`}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-cv-surface border border-cv-line rounded-lg shadow-2xl">
          {children}
        </div>
      )}
    </div>
  );
}
