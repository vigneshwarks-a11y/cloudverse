"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { IconMenu2, IconX, IconChevronDown, IconChevronRight, IconCpu, IconChartBar, IconGitPullRequest, IconDatabase, IconUsers, IconRobot, IconStack, IconLayoutGrid, IconBuilding } from "@tabler/icons-react";
import { NAV, DEMO_URL, SIGNIN_URL } from "@/lib/links";
import { ModeToggle } from "./ModeToggle";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  aix: <IconCpu size={22} stroke={1} />,
  finops: <IconChartBar size={22} stroke={1} />,
  devx: <IconGitPullRequest size={22} stroke={1} />,
  datax: <IconDatabase size={22} stroke={1} />,
};

const SOLUTION_ICONS: Record<string, React.ReactNode> = {
  "finops-teams": <IconChartBar size={22} stroke={1} />,
  "ai-eng": <IconRobot size={22} stroke={1} />,
  "platform-eng": <IconStack size={22} stroke={1} />,
  "data-teams": <IconDatabase size={22} stroke={1} />,
  "enterprise": <IconBuilding size={22} stroke={1} />,
};

export function Nav() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-cv-surface"
      data-testid="site-nav"
    >
      <div className="cv-container flex items-center justify-between h-[56px]">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" data-testid="link-logo">
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
                  <IconChevronRight size={14} stroke={1} className="shrink-0 text-cv-muted opacity-0 group-hover:opacity-100 transition-opacity" />
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
          {open ? <IconX size={22} stroke={1} /> : <IconMenu2 size={22} stroke={1} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-cv-surface border-t border-cv-line">
          <div className="cv-container py-4 flex flex-col gap-1">
            <div className="text-xs uppercase tracking-wider text-cv-muted px-3 mt-2 mb-1">Platform</div>
            {NAV.platform.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-cv-ink/70 hover:text-cv-ink text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <div className="text-xs uppercase tracking-wider text-cv-muted px-3 mt-3 mb-1">Solutions</div>
            {NAV.solutions.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-cv-ink/70 hover:text-cv-ink text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <div className="h-px bg-cv-ink/[0.06] my-3" />
            {NAV.primary.map((it) => (
              <Link key={it.href} href={it.href} className="px-3 py-2 text-cv-ink/70 hover:text-cv-ink text-sm" onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            ))}
            <Link
              href={DEMO_URL}
              className="mt-3 cv-btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              Book a demo
            </Link>
            <Link
              href={SIGNIN_URL}
              className="mt-2 cv-btn-ghost !text-cv-ink !border-cv-line hover:!bg-cv-ink/10 w-full"
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
          open ? "text-cv-ink" : "text-cv-ink/70 hover:text-cv-ink"
        }`}
        data-testid={`nav-trigger-${label.toLowerCase()}`}
      >
        {label}
        <IconChevronDown size={13} stroke={1} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
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
