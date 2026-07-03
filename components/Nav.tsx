"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { AltArrowDown, AltArrowRight, Buildings, Chart, Code2, Cpu, Database, HamburgerMenu, Layers, UsersGroupRounded, Widget2 } from "@solar-icons/react";
import { X } from "lucide-react";
import { NAV, DEMO_URL, SIGNIN_URL } from "@/lib/links";
import { ModeToggle } from "./ModeToggle";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  aix: <Cpu weight="Linear" size={22} />,
  finops: <Chart weight="Linear" size={22} />,
  devx: <Code2 weight="Linear" size={22} />,
  datax: <Database weight="Linear" size={22} />,
};

const SOLUTION_ICONS: Record<string, React.ReactNode> = {
  "finops-teams": <Chart weight="Linear" size={22} />,
  "ai-eng": <Cpu weight="Linear" size={22} />,
  "platform-eng": <Layers weight="Linear" size={22} />,
  "data-teams": <Database weight="Linear" size={22} />,
  "enterprise": <Buildings weight="Linear" size={22} />,
};

export function Nav() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-cv-surface"
      data-testid="site-nav"
    >
      <div className="cv-container flex items-center justify-between h-[56px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" data-testid="link-logo" onClick={() => setOpen(false)}>
          <Image
            src="/cv-logo.png"
            alt="cloudverse"
            width={45}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <DropTrigger label="Platform" value="platform" openDrop={openDrop} setOpenDrop={setOpenDrop}>
            <div className="p-2 w-[280px] grid grid-cols-1 gap-1">
              {NAV.platform.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-cv-ink/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-blue/60"
                  data-testid={`nav-link-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${it.color}30 0%, ${it.color}12 100%)`,
                      border: `1px solid ${it.color}30`,
                      color: it.color,
                    }}
                  >
                    {PLATFORM_ICONS[it.icon]}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-sm font-semibold text-cv-ink leading-snug tracking-wide">{it.label}</div>
                    <div className="text-cv-muted text-xs mt-0.5 leading-snug tracking-wide">{it.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </DropTrigger>

          <DropTrigger label="Solutions" value="solutions" openDrop={openDrop} setOpenDrop={setOpenDrop}>
            <div className="p-2 w-[280px] grid grid-cols-1 gap-1">
              {NAV.solutions.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-cv-ink/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cv-blue/60"
                  data-testid={`nav-link-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cv-line bg-cv-ink/[0.06] text-cv-ink/70">
                    {SOLUTION_ICONS[it.icon]}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-sm font-semibold text-cv-ink leading-snug tracking-wide">{it.label}</div>
                    <div className="text-cv-muted text-xs mt-0.5 leading-snug tracking-wide">{it.desc}</div>
                  </div>
                  <AltArrowRight weight="Linear" size={14} className="shrink-0 text-cv-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </DropTrigger>

          {NAV.primary.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="px-3 py-2 text-sm text-cv-ink/70 hover:text-cv-ink transition-colors"
              data-testid={`nav-link-${it.label.toLowerCase()}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          <ModeToggle />

          <Link
            href={DEMO_URL}
            className="cv-btn-primary"
            data-testid="link-get-demo"
          >
            Book a demo
          </Link>
          <Link
            href={SIGNIN_URL}
            className="cv-btn-ghost !text-cv-ink !border-cv-line hover:!bg-cv-ink/10"
            data-testid="link-sign-in"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-cv-ink/80 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <HamburgerMenu weight="Linear" size={22} />}
        </button>
      </div>

      {/* Mobile menu — full-screen overlay panel */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[56px] z-40 bg-cv-surface overflow-y-auto">
          <div className="cv-container py-3 flex flex-col">
            <MobileSection label="Platform" defaultOpen>
              {NAV.platform.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="flex items-start gap-3 py-3.5 min-h-[44px] hover:bg-cv-ink/[0.04] rounded-xl px-2 -mx-2 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                    style={{ borderColor: `${it.color}40`, color: it.color, background: `${it.color}12` }}
                  >
                    {PLATFORM_ICONS[it.icon]}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="text-[15px] font-semibold text-cv-ink leading-snug">{it.label}</div>
                    <div className="text-cv-muted text-sm mt-0.5 leading-snug">{it.desc}</div>
                  </div>
                </Link>
              ))}
            </MobileSection>

            <MobileSection label="Solutions">
              {NAV.solutions.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="flex items-start gap-3 py-3.5 min-h-[44px] hover:bg-cv-ink/[0.04] rounded-xl px-2 -mx-2 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cv-line bg-cv-ink/[0.06] text-cv-ink/70">
                    {SOLUTION_ICONS[it.icon]}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="text-[15px] font-semibold text-cv-ink leading-snug">{it.label}</div>
                    <div className="text-cv-muted text-sm mt-0.5 leading-snug">{it.desc}</div>
                  </div>
                </Link>
              ))}
            </MobileSection>

            {NAV.primary.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="flex items-center justify-between py-4 border-b border-cv-line text-cv-ink text-[15px] font-medium"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 mt-6 mb-4">
              <Link href={DEMO_URL} className="cv-btn-primary w-full" onClick={() => setOpen(false)}>
                Book a demo
              </Link>
              <Link
                href={SIGNIN_URL}
                className="cv-btn-ghost !text-cv-ink !border-cv-line hover:!bg-cv-ink/10 w-full"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileSection({
  label,
  defaultOpen = false,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-cv-line py-1">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3 text-cv-ink text-[15px] font-medium"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <AltArrowDown weight="Linear" size={16} className={`text-cv-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="flex flex-col pb-2">{children}</div>}
    </div>
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
          open ? "text-cv-ink" : "text-cv-ink/70 hover:text-cv-ink"
        }`}
        data-testid={`nav-trigger-${label.toLowerCase()}`}
      >
        {label}
        <AltArrowDown weight="Linear" size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute top-full left-0 pt-2 transition-all duration-200 ease-out ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="bg-cv-surface border border-cv-line rounded-xl shadow-2xl">{children}</div>
      </div>
    </div>
  );
}
