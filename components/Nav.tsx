"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Star } from "lucide-react";
import { NAV, DEMO_URL, SIGNIN_URL } from "@/lib/links";

const GITHUB_URL = "https://github.com/cloudverse-ai";
const GITHUB_STARS = "2.4k";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a] border-b border-white/[0.08]"
      data-testid="site-nav"
    >
      <div className="cv-container flex items-center justify-between h-[56px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" data-testid="link-logo">
          <Image
            src="/cv-logo.png"
            alt="CloudVerse"
            width={45}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <DropTrigger label="Platform" value="platform" openDrop={openDrop} setOpenDrop={setOpenDrop}>
            <div className="p-2 w-[320px]">
              {NAV.platform.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`flex items-start gap-3 p-3 rounded-md mb-1 last:mb-0 ${
                    (it as typeof it & { featured?: boolean }).featured
                      ? "border border-[#6954D4]/30 bg-[#6954D4]/10 hover:bg-[#6954D4]/15"
                      : "hover:bg-white/5"
                  }`}
                  data-testid={`nav-link-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: it.color }} />
                  <div>
                    <div className={`text-sm font-medium ${(it as typeof it & { featured?: boolean }).featured ? "text-[#A99CE8]" : "text-white"}`}>{it.label}</div>
                    <div className="text-white/50 text-xs mt-0.5">{it.desc}</div>
                  </div>
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-white/10">
                <Link href="/platform" className="block px-3 py-2 text-xs text-white/40 hover:text-white/80">
                  See the whole platform →
                </Link>
              </div>
            </div>
          </DropTrigger>

          <DropTrigger label="Solutions" value="solutions" openDrop={openDrop} setOpenDrop={setOpenDrop}>
            <div className="grid gap-1 p-2 w-[220px]">
              {NAV.solutions.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="block px-3 py-2 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/5"
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
              className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors"
              data-testid={`nav-link-${it.label.toLowerCase()}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* GitHub star badge */}
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 text-white/70 fill-current" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="text-xs font-medium text-white/70">{GITHUB_STARS}</span>
            <Star size={10} className="text-white/40" />
          </Link>

          <Link
            href={DEMO_URL}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-md text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors"
            data-testid="link-get-demo"
          >
            Book a demo
          </Link>
          <Link
            href={SIGNIN_URL}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-md text-sm font-medium border border-white/25 text-white hover:bg-white/[0.06] transition-colors"
            data-testid="link-sign-in"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white/80 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-white/[0.08]">
          <div className="cv-container py-4 flex flex-col gap-1">
            <div className="text-xs uppercase tracking-wider text-white/30 px-3 mt-2 mb-1">Platform</div>
            {NAV.platform.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-white/70 hover:text-white text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <div className="text-xs uppercase tracking-wider text-white/30 px-3 mt-3 mb-1">Solutions</div>
            {NAV.solutions.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-white/70 hover:text-white text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <div className="h-px bg-white/[0.08] my-3" />
            {NAV.primary.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-white/70 hover:text-white text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <Link
              href={DEMO_URL}
              className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-white text-black"
              onClick={() => setOpen(false)}
            >
              Book a demo
            </Link>
            <Link
              href={SIGNIN_URL}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium border border-white/25 text-white"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function DropTrigger({
  label,
  value,
  openDrop,
  setOpenDrop,
  children,
}: {
  label: string;
  value: string;
  openDrop: string | null;
  setOpenDrop: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactNode;
}) {
  const open = openDrop === value;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = () => {
    cancelClose();
    setOpenDrop(value);
  };

  const handleLeave = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenDrop((cur) => (cur === value ? null : cur));
    }, 120);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={`px-3 py-2 text-sm inline-flex items-center gap-1 transition-colors ${
          open ? "text-white" : "text-white/70 hover:text-white"
        }`}
        data-testid={`nav-trigger-${label.toLowerCase()}`}
      >
        {label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute top-full left-0 pt-2 transition-all duration-200 ease-out ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="bg-[#111111] border border-white/[0.1] rounded-lg shadow-2xl">{children}</div>
      </div>
    </div>
  );
}
