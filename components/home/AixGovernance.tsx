"use client";

import Link from "next/link";
import { IconArrowRight, IconShield, IconLock } from "@tabler/icons-react";

function MockRBACVisual() {
  return (
    <div className="mt-6 space-y-2 font-mono text-xs">
      {[
        { team: "Finance", role: "FinOps Admin", color: "#1664C0" },
        { team: "Engineering", role: "DevX Viewer", color: "#0E9E7A" },
        { team: "Data", role: "DataX Editor", color: "#D97706" },
      ].map((r) => (
        <div key={r.team} className="flex items-center justify-between rounded-lg border border-cv-line bg-cv-ink/[0.04] px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: r.color }}>
              {r.team[0]}
            </div>
            <span className="text-cv-ink/70">{r.team}</span>
          </div>
          <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: `${r.color}22`, color: r.color }}>{r.role}</span>
        </div>
      ))}
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/10 px-3 py-2">
        <IconShield size={12} stroke={1} className="text-[#1664C0] dark:text-[#7CB8F8]" />
        <span className="text-[#1664C0] dark:text-[#7CB8F8]">Role-Based Access Control active</span>
      </div>
    </div>
  );
}

function MockCostVisual() {
  const bars = [65, 40, 80, 55, 90, 45, 70];
  return (
    <div className="mt-6 rounded-xl border border-cv-line bg-cv-ink/[0.04] p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-cv-muted">Tokens Used</div>
          <div className="text-2xl font-bold text-cv-ink font-mono">34.5M</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-cv-muted">Latency</div>
          <div className="text-lg font-bold text-cv-ink font-mono">313ms</div>
        </div>
      </div>
      <div className="flex items-end gap-1 h-14">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 4 ? "#1664C0" : "#1664C040" }} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-cv-ink/[0.06] px-3 py-2 text-xs">
        <span className="text-cv-muted">Budget limit</span>
        <span className="font-semibold text-[#1664C0] dark:text-[#7CB8F8]">$50k / mo</span>
      </div>
    </div>
  );
}

function MockPIIVisual() {
  return (
    <div className="mt-6 space-y-2 text-xs font-mono">
      <div className="rounded-lg border border-cv-line bg-cv-ink/[0.04] p-3 space-y-1.5">
        <div className="text-cv-muted">Incoming request</div>
        <div className="text-cv-ink/70">My card ends in <span className="rounded bg-red-500/20 px-1 text-red-400 line-through">4521</span> and CVV <span className="rounded bg-red-500/20 px-1 text-red-400 line-through">392</span></div>
      </div>
      <div className="flex items-center justify-center gap-1 text-cv-muted py-1">
        <IconLock size={10} stroke={1} />
        <span>PII redacted before LLM</span>
      </div>
      <div className="rounded-lg border border-[#0E9E7A]/30 bg-[#0E9E7A]/10 p-3 space-y-1.5">
        <div className="text-[#4ADE80]">Sanitized request</div>
        <div className="text-cv-ink/70">My card ends in <span className="rounded bg-[#0E9E7A]/20 px-1 text-[#4ADE80]">[CARD]</span> and CVV <span className="rounded bg-[#0E9E7A]/20 px-1 text-[#4ADE80]">[CVV]</span></div>
      </div>
    </div>
  );
}

function MockAuditVisual() {
  const logs = [
    { user: "A. Patel", action: "Prompt created", time: "10:33 AM" },
    { user: "R. Singh", action: "Budget updated", time: "10:21 AM" },
    { user: "M. Lee", action: "Route override", time: "09:47 AM" },
    { user: "J. Kim", action: "Policy applied", time: "09:12 AM" },
  ];
  return (
    <div className="mt-6 rounded-xl border border-cv-line bg-cv-ink/[0.04] overflow-hidden">
      <div className="border-b border-cv-line px-4 py-2.5 text-xs font-semibold text-cv-ink/50 uppercase tracking-wider">Audit Logs</div>
      {logs.map((l) => (
        <div key={l.user} className="flex items-center justify-between border-b border-cv-line/50 px-4 py-2.5 text-xs last:border-0">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cv-ink/10 text-[10px] font-bold text-cv-muted">{l.user[0]}</div>
            <span className="text-cv-ink/70">{l.user}</span>
          </div>
          <span className="text-cv-muted">{l.action}</span>
          <span className="text-cv-muted/60">{l.time}</span>
        </div>
      ))}
    </div>
  );
}

function MockSSOVisual() {
  return (
    <div className="mt-6 rounded-xl border border-cv-line bg-cv-ink/[0.04] p-4 text-xs font-mono space-y-3">
      <div className="font-semibold text-cv-ink text-sm">SSO Configuration</div>
      <div className="flex gap-2">
        <span className="rounded px-2 py-1 text-[11px] font-medium text-[#1664C0] dark:text-[#7CB8F8]" style={{ background: "#1664C026" }}>OpenID Connect</span>
        <span className="rounded px-2 py-1 text-[11px] font-medium bg-cv-ink/[0.06] text-cv-muted">SAML</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="text-cv-muted mb-1">Domain Name</div>
          <div className="rounded border border-cv-line bg-cv-ink/[0.06] px-3 py-1.5 text-cv-ink/60 truncate">https://portal.cloudverse.ai/auth/sso</div>
        </div>
        <div>
          <div className="text-cv-muted mb-1">Allowed Domains</div>
          <div className="rounded border border-cv-line bg-cv-ink/[0.06] px-3 py-1.5 text-cv-ink/60">@yourcompany.com</div>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/10 px-3 py-2">
        <span className="text-[#1664C0] dark:text-[#7CB8F8]">Auto Join</span>
        <div className="h-4 w-8 rounded-full bg-[#1664C0] flex items-center justify-end pr-0.5">
          <div className="h-3 w-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

const TOP_FEATURES = [
  {
    title: "Collaborate while staying secure",
    body: "Manage your resources with a clear hierarchy to ensure seamless collaboration with Role-Based Access Control (RBAC).",
    Visual: MockRBACVisual,
  },
  {
    title: "Cut costs, not corners",
    body: "Monitor performance and costs in real time. Set budget limits and optimize model allocation to reduce AI expenses.",
    Visual: MockCostVisual,
  },
];

const BOTTOM_FEATURES = [
  {
    title: "Keep it secure with PII redaction",
    body: "cloudverse automatically redacts sensitive data from your requests before they are sent to the LLM.",
    Visual: MockPIIVisual,
  },
  {
    title: "Stay in control with full visibility",
    body: "Track every action with detailed activity logs across any resource, making it easy to monitor and investigate incidents.",
    Visual: MockAuditVisual,
  },
];

const CELL = "bg-cv-card p-6 lg:p-8 flex flex-col";

export function AixGovernance() {
  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">

        {/* Section header */}
        <div className="mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-5">
            Enterprise Control
          </span>
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
            <h2 className="cv-h2 text-cv-ink flex-1">
              Take the driver's seat<br className="hidden lg:block" /> with AI Governance
            </h2>
            <p className="mt-4 lg:mt-1 text-cv-ink/60 leading-relaxed lg:max-w-sm xl:max-w-md shrink-0">
              cloudverse gives every team a production-ready platform to manage, observe, and govern AI spend with full audit trails, budget controls, and access policies enforced before a single token leaves.
            </p>
          </div>
        </div>

        {/* Outer border container */}
        <div className="border border-cv-line divide-y divide-cv-line">

          {/* Row 1 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-cv-line">
            {TOP_FEATURES.map(({ title, body, Visual }) => (
              <div key={title} className={CELL}>
                <h3 className="text-base font-semibold text-cv-ink">{title}</h3>
                <p className="mt-2 text-sm text-cv-ink/55 leading-relaxed">{body}</p>
                <Link href="/platform/aix" className="mt-3 inline-flex items-center gap-1 text-xs text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors font-medium">
                  Learn More <IconArrowRight size={12} stroke={1} />
                </Link>
                <div className="mt-auto"><Visual /></div>
              </div>
            ))}
          </div>

          {/* Quote strip warm left border accent */}
          <div className="bg-cv-card p-8 lg:p-10">
            <blockquote className="text-lg lg:text-xl leading-relaxed text-cv-ink/80 max-w-4xl">
              "We're looking at what our engineers are doing, monitoring model usage and cost characteristics. cloudverse centralises governance so we can isolate workloads, enforce logging rules, and scale AI reliably across every client engagement."
            </blockquote>
            <div className="mt-6">
              <div className="font-semibold text-cv-ink text-sm">Enterprise Customer</div>
              <div className="text-cv-muted text-sm">VP of AI Data Platforms Strategy, <span className="text-[#D64C2C]">Perficient</span></div>
            </div>
          </div>

          {/* Row 2 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-cv-line">
            {BOTTOM_FEATURES.map(({ title, body, Visual }) => (
              <div key={title} className={CELL}>
                <h3 className="text-base font-semibold text-cv-ink">{title}</h3>
                <p className="mt-2 text-sm text-cv-ink/55 leading-relaxed">{body}</p>
                <Link href="/platform/aix" className="mt-3 inline-flex items-center gap-1 text-xs text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors font-medium">
                  Learn More <IconArrowRight size={12} stroke={1} />
                </Link>
                <div className="mt-auto"><Visual /></div>
              </div>
            ))}
          </div>

          {/* Bottom full-width split card 40/60 */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] divide-y md:divide-y-0 md:divide-x divide-cv-line">
            {/* Left ~40%: logo + warm glow + testimonial */}
            <div className="relative flex flex-col justify-between bg-cv-card p-8 lg:p-10 overflow-hidden min-h-[320px]">
              {/* Dark mode: warm red glow */}
              <div
                className="pointer-events-none absolute inset-0 hidden dark:block"
                style={{ background: "radial-gradient(ellipse 90% 70% at 20% 80%, rgba(180,40,20,0.35) 0%, rgba(100,20,10,0.15) 50%, transparent 75%)" }}
                aria-hidden
              />
              {/* Light mode: soft blue tint instead */}
              <div
                className="pointer-events-none absolute inset-0 block dark:hidden"
                style={{ background: "radial-gradient(ellipse 90% 70% at 20% 80%, rgba(22,100,192,0.10) 0%, rgba(22,100,192,0.04) 50%, transparent 75%)" }}
                aria-hidden
              />
              <div className="relative inline-flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-[#1664C0] flex items-center justify-center text-white text-xs font-bold">CV</div>
                <span className="text-cv-ink font-semibold text-sm tracking-wide">cloudverse</span>
              </div>
              <div className="relative mt-auto pt-10">
                <p className="text-cv-ink/70 text-sm leading-relaxed">
                  "One of the things I really appreciate about cloudverse is how quickly it helps you scale reliably. It centralizes governance and includes built-in observability and metrics, which makes monitoring and optimization much easier."
                </p>
                <div className="mt-4">
                  <div className="font-semibold text-cv-ink text-sm">Enterprise Leader</div>
                  <div className="text-cv-muted text-xs">Director of R&D to AI</div>
                </div>
              </div>
            </div>

            {/* Right ~60%: SSO feature */}
            <div className="bg-cv-card flex flex-col p-8 lg:p-10">
              <h3 className="text-base font-semibold text-cv-ink">Single Sign-On</h3>
              <p className="mt-2 text-sm text-cv-ink/55 leading-relaxed">Onboard your teams instantly and have cloudverse follow your governance rules from day 0.</p>
              <Link href="/platform/aix" className="mt-3 inline-flex items-center gap-1 text-xs text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors font-medium">
                Learn More <IconArrowRight size={12} stroke={1} />
              </Link>
              <div className="mt-auto"><MockSSOVisual /></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
