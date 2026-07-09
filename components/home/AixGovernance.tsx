"use client";

import Link from "next/link";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Shield } from "@solar-icons/react";

/* ------------------------------------------------------------------ *
 * Shared motion helpers / mask presets (design-token recoloured)
 * ------------------------------------------------------------------ */

// Gentle fade on just the bottom edge of a visual, so it softly dissolves
// into the card surface without running off it.
const EDGE_FADE = {
  WebkitMaskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
  maskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
} as const;

/* ------------------------------------------------------------------ *
 * Block 1 — Govern AI before the spend happens (3D role-card stack)
 * ------------------------------------------------------------------ */

// Policy decision applied to a request BEFORE it runs.
type PolicyStatus = "Allowed" | "Blocked" | "Flagged";

function statusColor(s: PolicyStatus) {
  return s === "Allowed" ? "#0E9E7A" : s === "Blocked" ? "#EF4444" : "#D97706";
}

// Status glyph: check / cross / warning.
function StatusIcon({ status }: { status: PolicyStatus }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {status === "Allowed" && <path d="M5 13l4 4L19 7" />}
      {status === "Blocked" && <path d="M6 6l12 12M18 6L6 18" />}
      {status === "Flagged" && <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a1 1 0 0 0 .9 1.5h18.6a1 1 0 0 0 .9-1.5L13.7 3.9a1 1 0 0 0-1.7 0z" />}
    </svg>
  );
}

// Rounded square status badge, tinted by decision.
function StatusBadge({ status }: { status: PolicyStatus }) {
  const c = statusColor(status);
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border"
      style={{ borderColor: `${c}66`, color: c, background: `${c}1A` }}
    >
      <StatusIcon status={status} />
    </span>
  );
}

// Decision pill on the trailing edge of each row.
function StatusPill({ status }: { status: PolicyStatus }) {
  const c = statusColor(status);
  return (
    <span
      className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ color: c, background: `${c}1A` }}
    >
      {status}
    </span>
  );
}

// Expanded detail rows for the focused entry (illustrative governance data).
const POLICY_DETAILS: [string, string][] = [
  ["policy_id", "pg-prod-guardrails"],
  ["decision", "Allowed before run"],
  ["data_residency", "eu-west-1"],
  ["access_role", "FinOps Admin"],
  ["checks", "PII redaction, budget-limit"],
  ["gate_latency", "42ms"],
];

const POLICY_ROWS: { status: PolicyStatus; route: string; date: string; expanded: boolean }[] = [
  { status: "Allowed", route: "gpt-4o · Prompt run", date: "March 9th, 2025", expanded: true },
  { status: "Blocked", route: "claude-3 · Agent call", date: "March 3rd, 2025", expanded: false },
  { status: "Allowed", route: "gpt-4o-mini · Batch", date: "March 9th, 2025", expanded: false },
  { status: "Flagged", route: "llama-3 · Fine-tune", date: "March 3rd, 2025", expanded: false },
];

function PolicyRow({ status, route, date, expanded }: (typeof POLICY_ROWS)[number]) {
  return (
    <div className="rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] px-3 py-3 dark:border-white/[0.07] dark:bg-white/[0.02]">
      <div className="flex items-center gap-3">
        <StatusBadge status={status} />
        <div className="min-w-0">
          <div className="truncate text-sm text-cv-ink/90">{route}</div>
          <div className="text-[11px] text-cv-muted">{date}</div>
        </div>
        <StatusPill status={status} />
      </div>
      {expanded && (
        <div className="mt-3 grid grid-cols-[minmax(120px,auto)_1fr] gap-x-6 gap-y-1.5 border-t border-cv-line/60 pt-3 text-xs dark:border-white/5">
          {POLICY_DETAILS.map(([k, v]) => (
            <Fragment key={k}>
              <span className="truncate text-cv-muted">{k}:</span>
              <span className="font-mono text-cv-ink/80">{v}</span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

// Policy-evaluation panel: requests scored against policy BEFORE they run —
// Allowed / Blocked / Flagged — with the most recent decision expanded to
// show which checks, residency, and role were enforced.
function MockRBACVisual() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = rm ? true : inView;

  return (
    <div ref={ref} className="mt-6">
      <div className="relative overflow-hidden rounded-2xl border border-cv-line bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-black">
        <CardLightEdge />
        <div className="px-1 pb-3 text-base font-semibold text-cv-ink">Policy Evaluations</div>
        <div className="space-y-2.5">
          {POLICY_ROWS.map((r, i) => (
            <motion.div
              key={i}
              initial={rm ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: rm ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <PolicyRow {...r} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 2 — Every decision logged and traceable (tokens / latency)
 * ------------------------------------------------------------------ */

// Shared light-edge treatment: gradient top-bright stroke + ambient top-left glow.
function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[14px]"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,218,255,0.13), transparent 70%)", filter: "blur(26px)" }}
      />
    </>
  );
}

const TOKEN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const GREEN_BARS = [62, 70, 80, 66, 92, 74];
const ORANGE_BARS = [52, 34, 44, 30, 22, 26];

function TrendUp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h6v6" />
    </svg>
  );
}

function MockCostVisual() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = rm ? true : inView;

  const linePath =
    "M0,78 C18,78 26,58 44,58 C62,58 66,86 86,74 C104,63 108,40 132,44 C150,47 156,34 178,40 C196,45 198,92 214,70 C226,54 232,100 246,74 C262,64 280,70 300,66";
  const areaPath = `${linePath} L300,120 L0,120 Z`;

  return (
    <div ref={ref} className="relative mt-6 h-[430px]">
      {/* CARD 1 — Tokens Used (back, upper-left) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 w-[82%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-4 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
      >
        <CardLightEdge />

        {/* header sub-panel */}
        <div className="rounded-xl border border-cv-line dark:border-white/10 bg-cv-ink/[0.03] dark:bg-white/[0.02] px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-cv-muted">Tokens Used</div>
              <div className="mt-0.5 text-3xl font-bold text-cv-ink">34.5M</div>
            </div>
            <div className="space-y-1.5 text-right text-[11px] font-medium">
              <div className="flex items-center justify-end gap-1 text-cv-muted">
                Request Token Used: <span className="text-[#34D399]">85.91%</span>
                <TrendUp className="h-3 w-3 text-[#34D399]" />
              </div>
              <div className="flex items-center justify-end gap-1 text-cv-muted">
                Response Token Used: <span className="text-[#FF9736]">63.24%</span>
                <TrendUp className="h-3 w-3 text-[#FF9736]" />
              </div>
            </div>
          </div>
        </div>

        {/* dual-bar chart */}
        <div className="mt-5 flex h-[150px] items-end gap-3 px-1">
          {TOKEN_MONTHS.map((m, i) => (
            <div key={m} className="flex h-full flex-1 items-end justify-center gap-1.5">
              <motion.div
                className="w-2.5 rounded-full"
                style={{ background: "linear-gradient(to top, #2FBE86, #8CF3C8)", boxShadow: "0 0 8px rgba(52,211,153,0.55)" }}
                initial={rm ? false : { height: 0 }}
                animate={show ? { height: `${GREEN_BARS[i]}%` } : {}}
                transition={{ duration: 0.6, delay: rm ? 0 : 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="w-2.5 rounded-full"
                style={{ background: "linear-gradient(to top, #E07E28, #FFC58A)", boxShadow: "0 0 8px rgba(255,151,54,0.55)" }}
                initial={rm ? false : { height: 0 }}
                animate={show ? { height: `${ORANGE_BARS[i]}%` } : {}}
                transition={{ duration: 0.6, delay: rm ? 0 : 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-3 px-1">
          {TOKEN_MONTHS.map((m) => (
            <span key={m} className="flex-1 text-center text-[10px] text-cv-muted">
              {m}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CARD 3 — Cost budget (front, lower-left) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: rm ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 z-10 w-[42%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
      >
        <CardLightEdge />
        <div className="text-sm font-semibold text-cv-ink">Set Your Cost Budget</div>
        <div className="mt-3 text-[11px] text-cv-muted">Budget limit</div>
        <div className="mt-1 flex items-center justify-between rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/10 px-3 py-2">
          <span className="font-mono text-lg font-semibold text-[#7CB8F8]">$50k</span>
          <span className="text-[11px] text-cv-muted">/ mo</span>
        </div>
      </motion.div>

      {/* CARD 2 — Latency (front, lower-right) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: rm ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-3 right-0 z-20 w-[60%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-4 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75)]"
      >
        <CardLightEdge />

        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-cv-muted">Latency</div>
            <div className="mt-0.5 text-3xl font-bold text-cv-ink">313.69ms</div>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-cv-line dark:border-white/15 bg-cv-ink/[0.05] dark:bg-white/[0.04] px-2.5 py-1 text-xs text-cv-ink/80">
            Mean
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* line chart */}
        <div className="mt-4">
          <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="h-[150px] w-full" aria-hidden>
            <defs>
              <linearGradient id="latFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B7CF6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#8B7CF6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[24, 48, 72, 96].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="300"
                y2={y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="2 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <motion.path
              d={areaPath}
              fill="url(#latFill)"
              initial={rm ? false : { opacity: 0 }}
              animate={show ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: rm ? 0 : 0.5 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="#A78BFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={rm ? false : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: rm ? 0 : 0.35, ease: "easeInOut" }}
            />
          </svg>
          <div className="mt-1 flex justify-between px-1 text-[10px] text-cv-muted">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 3 — Keep it secure with PII redaction (guardrail + chat mockup)
 * ------------------------------------------------------------------ */

function ChatAvatar({ variant }: { variant: "agent" | "client" }) {
  return (
    <span
      className="h-5 w-5 shrink-0 rounded-full ring-1 ring-white/10"
      style={{
        background:
          variant === "agent"
            ? "linear-gradient(135deg,#4D9AEF,#6954D4)"
            : "linear-gradient(135deg,#F59E0B,#EC4899)",
      }}
      aria-hidden
    />
  );
}

function MockPIIVisual() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = rm ? true : inView;
  const cyan = "#22D3EE";

  return (
    <div ref={ref} className="relative mt-6 h-[480px] overflow-hidden">
      {/* CARD 1 — PII Redaction Guardrail settings (back, upper-left) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 w-[80%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-5 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1664C0]/15">
              <Shield weight="Bold" size={13} className="text-[#1664C0] dark:text-[#7CB8F8]" />
            </div>
            <span className="text-sm font-semibold text-cv-ink">PII Redaction Guardrail</span>
          </div>
          <SSOToggle on color="#0E9E7A" showCheck />
        </div>

        <p className="mt-4 text-xs leading-relaxed text-cv-muted">
          Detects and redacts sensitive data in requests before they reach the model.
        </p>

        <div className="mt-6 space-y-5 text-xs text-cv-ink/70">
          <div>PII Categories:</div>
          <div>Timeout (in Milliseconds):</div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-cv-line/60 dark:border-white/5 pt-4">
          <span className="text-xs text-cv-ink/70">Enable Redact PII</span>
          <SSOToggle on color="#0E9E7A" showCheck />
        </div>

        <CardLightEdge />
      </motion.div>

      {/* CARD 2 — Secure Conversation chat (front, lower-right) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: rm ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-[120px] z-20 w-[66%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75)]"
      >
        {/* gradient banner */}
        <div
          className="px-4 py-3 text-center text-sm font-bold text-white"
          style={{ background: "linear-gradient(115deg,#0B3B78 0%,#1664C0 52%,#3B8AE8 100%)" }}
        >
          Secure Conversation
        </div>

        <div className="space-y-3 p-4">
          {/* agent */}
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <ChatAvatar variant="agent" />
              <span className="text-[11px] italic text-cv-muted">Agent</span>
            </div>
            <div className="w-fit rounded-lg bg-cv-ink/[0.06] dark:bg-white/[0.06] px-3 py-2 text-xs text-cv-ink/80">
              Card last 4 digits and CVV?
            </div>
          </div>

          {/* client — highlighted redaction container */}
          <div
            className="rounded-lg border p-2.5"
            style={{ borderColor: "rgba(34,211,238,0.4)", background: "rgba(34,211,238,0.06)" }}
          >
            <div className="mb-2 flex items-center justify-end gap-1.5">
              <span className="text-[11px] italic text-cv-muted">Client</span>
              <ChatAvatar variant="client" />
            </div>
            <div className="flex flex-wrap items-center gap-2 rounded-md bg-white dark:bg-black/40 px-2 py-1.5 font-mono">
              <span
                className="inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                style={{ color: cyan, background: "rgba(34,211,238,0.12)" }}
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.7a2 2 0 002.8 2.8" />
                  <path d="M9.4 5.2A9.6 9.6 0 0112 5c5 0 9 4.5 9 7a12.4 12.4 0 01-2.2 3M6.1 6.2A12.7 12.7 0 003 12c0 2.5 4 7 9 7a9.7 9.7 0 003.3-.6" />
                </svg>
                Auto Redact
              </span>
              <span className="text-[11px] text-cv-ink/70">
                My card ends in{" "}
                <span className="rounded bg-[#0E9E7A]/20 px-1 text-[#4ADE80]">[CARD]</span> and CVV{" "}
                <span className="rounded bg-[#0E9E7A]/20 px-1 text-[#4ADE80]">[CVV]</span>
              </span>
            </div>
          </div>

          {/* agent */}
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <ChatAvatar variant="agent" />
              <span className="text-[11px] italic text-cv-muted">Agent</span>
            </div>
            <div className="w-fit rounded-lg bg-cv-ink/[0.06] dark:bg-white/[0.06] px-3 py-2 text-xs text-cv-ink/80">
              Got it. Checking now!
            </div>
          </div>
        </div>

        <CardLightEdge />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 4 — Stay in control with full visibility (audit feed)
 * ------------------------------------------------------------------ */

// Small circular initials avatar, tinted per user — used across the audit rows.
function LogAvatar({ initials, color, size = 24 }: { initials: string; color: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-1 ring-white/10"
      style={{
        height: size,
        width: size,
        fontSize: size <= 22 ? 8 : 9,
        background: `linear-gradient(135deg, color-mix(in srgb, ${color} 45%, white), ${color})`,
      }}
    >
      {initials}
    </span>
  );
}

// Small rounded letter tile (e.g. "R", "C") that prefixes detail rows in Card 2.
function LetterTile({ letter }: { letter: string }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-cv-ink/[0.06] dark:bg-white/[0.06] text-[10px] font-semibold text-cv-muted ring-1 ring-white/10">
      {letter}
    </span>
  );
}

const AUDIT_ROWS = [
  { initials: "AP", color: "#1664C0", name: "A. Patel", action: "Prompt created", date: "Feb 15", time: "10:33 AM" },
  { initials: "RS", color: "#6954D4", name: "R. Singh", action: "Budget updated", date: "Feb 15", time: "10:21 AM" },
  { initials: "ML", color: "#0E9E7A", name: "M. Lee", action: "Route override", date: "Feb 14", time: "09:47 AM" },
  { initials: "JK", color: "#D97706", name: "J. Kim", action: "Policy applied", date: "Feb 14", time: "09:12 AM" },
];
// The featured entry the highlight chip + detail card represent.
const FEATURED = AUDIT_ROWS[0];
// rows recede toward the bottom of the list
const AUDIT_FADE = [1, 0.75, 0.5, 0.3];

const DETAIL_ROWS = [
  { label: "Workspace", value: "ws-prod-main" },
  { label: "Action", value: FEATURED.action },
  { label: "Resource", value: "/v2/virtual-keys/3e40d", tile: "R" },
  { label: "Resource Type", value: "virtual-keys", tile: "R" },
  { label: "Client IP", value: "2406:7400:9a:2153:c9", tile: "C" },
  { label: "Country", value: "Canada", tile: "C" },
];

function MockAuditVisual() {
  const rm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const show = rm ? true : inView;

  return (
    <div ref={ref} className="relative mt-6 h-[500px]">
      {/* CARD 1 — Audit Logs list (back, upper-left) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 10 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 w-[82%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-4 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
      >
        <CardLightEdge />

        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#D97706]/20 text-[#F59E0B]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
                <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-cv-ink">Audit Logs</span>
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-cv-line dark:border-white/10 text-cv-muted">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </div>

        {/* search filter (decorative) */}
        <div className="mt-4 flex items-center rounded-lg border border-cv-line dark:border-white/10 bg-cv-ink/[0.04] dark:bg-white/[0.03] px-3 py-2 text-xs text-cv-muted">
          Search Filter
        </div>

        {/* log rows */}
        <div className="mt-2">
          {AUDIT_ROWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={rm ? false : { opacity: 0, y: 6 }}
              animate={show ? { opacity: AUDIT_FADE[i] ?? 0.2, y: 0 } : {}}
              transition={{ duration: 0.4, delay: rm ? 0 : 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[minmax(96px,auto)_1fr_auto] items-center gap-3 border-b border-cv-line/60 dark:border-white/5 py-3 text-xs last:border-0"
            >
              <span className="text-cv-ink/70">
                {r.date} · {r.time}
              </span>
              <div className="flex items-center gap-2">
                <LogAvatar initials={r.initials} color={r.color} />
                <span className="truncate text-cv-ink/80">{r.name}</span>
              </div>
              <span className="text-cv-muted">{r.action}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CARD 2 — log entry detail (front, lower-right) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 12 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: rm ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-[150px] z-20 w-[64%] overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-4 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75)]"
        style={EDGE_FADE}
      >
        <CardLightEdge />

        {/* header — id pill + external link */}
        <div className="flex items-center gap-2 rounded-lg border border-cv-line dark:border-white/10 bg-cv-ink/[0.04] dark:bg-white/[0.03] px-3 py-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-cv-muted" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <path d="M17.5 14v3.5M17.5 21v0M14 17.5h3.5M21 17.5v0" />
          </svg>
          <span className="flex-1 truncate font-mono text-xs text-cv-ink/80">pp-prompt-00f123</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-cv-muted" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
        </div>

        {/* detail rows */}
        <div className="mt-4 space-y-3.5 text-xs">
          {/* user row (avatar) */}
          <div className="grid grid-cols-[110px_1fr] items-center gap-3">
            <span className="text-cv-muted">User:</span>
            <div className="flex items-center gap-2">
              <LogAvatar initials={FEATURED.initials} color={FEATURED.color} size={22} />
              <span className="text-cv-ink/80">{FEATURED.name}</span>
            </div>
          </div>

          {DETAIL_ROWS.map((d) => (
            <div key={d.label} className="grid grid-cols-[110px_1fr] items-center gap-3">
              <span className="flex items-center gap-2 text-cv-muted">
                {d.tile && <LetterTile letter={d.tile} />}
                {d.label}:
              </span>
              <span className="truncate font-mono text-cv-ink/80">{d.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FLOATING HIGHLIGHT CHIP — the active/selected entry (lower-left) */}
      <motion.div
        initial={rm ? false : { opacity: 0, y: 12, scale: 0.96 }}
        animate={show ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: rm ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[70px] left-0 z-30 flex w-[58%] items-center gap-3 overflow-hidden rounded-[14px] bg-white dark:bg-[#111] px-4 py-3 text-xs shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8)]"
      >
        <CardLightEdge />

        {/* pulsing active dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
          {!rm && (
            <motion.span
              className="absolute inset-0 rounded-full bg-[#2278E0]"
              animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span className="relative h-2.5 w-2.5 rounded-full bg-[#2278E0] shadow-[0_0_8px_rgba(34,120,224,0.9)]" />
        </span>
        <span className="text-cv-ink">
          {FEATURED.date} · {FEATURED.time}
        </span>
        <LogAvatar initials={FEATURED.initials} color={FEATURED.color} size={22} />
        <span className="truncate text-cv-ink/80">{FEATURED.name}</span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Block 5 — Single sign-on, scoped from day one (cursor-driven tabs)
 * ------------------------------------------------------------------ */

function SSOToggle({
  on,
  color,
  showCheck,
}: {
  on: boolean;
  color: string;
  showCheck?: boolean;
}) {
  return (
    <div
      className={[
        "flex h-4 w-7 shrink-0 items-center rounded-full px-0.5",
        on ? "justify-end" : "justify-start",
      ].join(" ")}
      style={{ background: on ? color : "rgba(255,255,255,0.12)" }}
    >
      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-white">
        {on && showCheck && (
          <svg
            viewBox="0 0 24 24"
            className="h-2 w-2"
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
}

function MockSSOVisual() {
  const rm = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const inView = useInView(wrapRef, { margin: "-20px" });
  const show = rm ? true : inView;

  const [active, setActive] = useState(0);
  const [ptr, setPtr] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // loop the "click" between tabs while in view (frozen for reduced-motion)
  useEffect(() => {
    if (rm || !inView) return;
    const id = setInterval(() => setActive((t) => (t === 0 ? 1 : 0)), 2200);
    return () => clearInterval(id);
  }, [rm, inView]);

  // measure the active tab so the pointer lands on it precisely
  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current?.getBoundingClientRect();
      const tab = tabRefs[active].current?.getBoundingClientRect();
      if (wrap && tab) {
        setPtr({
          x: tab.left - wrap.left + tab.width * 0.5,
          y: tab.top - wrap.top + tab.height * 0.72,
        });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const ring = "0 0 0 1px #2278E0, 0 0 0 4px rgba(34,120,224,0.25)";
  const teal = "#0E9E7A";

  return (
    // outer shell — no mask here so the floating popover can overflow freely
    <div className="relative mt-6">
      <div ref={cardRef} className="relative min-h-[360px]">
        {/* main configuration card */}
        <div
          ref={wrapRef}
          className="relative space-y-3 overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-4 font-mono text-xs"
        >
          {/* light-edge treatment (matches the tokens/latency cards) */}
          <CardLightEdge />
          {/* header: title + quick actions + avatar */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-cv-ink">SSO Configuration</span>
            <div className="flex items-center gap-2.5 text-cv-muted">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="9" cy="8" r="3" />
                <path d="M3 20c0-3 3-5 6-5s6 2 6 5M18 9v4M20 11h-4" />
              </svg>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6" />
              </svg>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="8" cy="15" r="3.5" />
                <path d="M10.5 12.5L20 3M16 7l2 2M14 9l2 2" />
              </svg>
              <div
                className="h-6 w-6 rounded-full"
                style={{ background: "linear-gradient(135deg,#D97706,#6954D4)" }}
                aria-hidden
              />
            </div>
          </div>

          {/* animated cursor */}
          {!rm && (
            <motion.div
              className="pointer-events-none absolute z-30"
              style={{ top: 0, left: 0 }}
              animate={{ x: ptr.x, y: ptr.y }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
            >
              <motion.div
                key={active}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 0.35, times: [0, 0.5, 1] }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 drop-shadow-md" aria-hidden>
                  <path d="M5 3l14 8-6 1.6L10 19 5 3z" fill="#fff" stroke="#0b0b0b" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {/* tabs (segmented) */}
          <div className="inline-flex rounded-lg bg-cv-ink/[0.06] p-0.5">
            {[{ label: "OpenID Connect" }, { label: "SAML" }].map((t, i) => {
              const on = active === i;
              return (
                <button
                  key={t.label}
                  ref={tabRefs[i]}
                  type="button"
                  onClick={() => setActive(i)}
                  className={[
                    "rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors",
                    on ? "bg-[#2278E0] text-white" : "text-cv-muted",
                  ].join(" ")}
                  style={on ? { boxShadow: ring } : undefined}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* domain fields */}
          <div className="space-y-2">
            <div>
              <div className="mb-1 text-cv-muted">Domain Name</div>
              <div className="truncate rounded border border-cv-line bg-cv-ink/[0.06] px-3 py-1.5 text-cv-ink/60">
                https://portal.cloudverse.ai/auth/fdfdcre32…
              </div>
            </div>
            <div>
              <div className="mb-1 text-cv-muted">Domain Name</div>
              <div className="truncate rounded border border-cv-line bg-cv-ink/[0.06] px-3 py-1.5 text-cv-ink/60">
                d92e3f47-6cba-41b9-a15f-4fdc7e9e53
              </div>
            </div>
          </div>

          {/* allowed domains table */}
          <div>
            <div className="mb-1 text-cv-muted">Allowed Domains</div>
            <div className="overflow-hidden rounded border border-cv-line">
              <div className="grid grid-cols-[minmax(96px,auto)_auto_auto_1fr] gap-4 border-b border-cv-line bg-cv-ink/[0.03] px-3 py-1.5 text-[10px] text-cv-muted">
                <span>Domain Name</span>
                <span>Enable SSO</span>
                <span>Auto Join</span>
                <span>Link</span>
              </div>
              <div className="grid grid-cols-[minmax(96px,auto)_auto_auto_1fr] items-center gap-4 px-3 py-2 text-cv-ink/60">
                <span className="truncate">@yourcompany.com</span>
                <SSOToggle on color={teal} showCheck />
                <SSOToggle on color={teal} showCheck />
                <span className="truncate text-cv-muted">Join link</span>
              </div>
            </div>
          </div>

          {/* SCIM provisioning (bleeds off the bottom) */}
          <div className="flex items-center justify-between rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/10 px-3 py-2">
            <span className="text-[#1664C0] dark:text-[#7CB8F8]">SCIM Provisioning</span>
            <SSOToggle on color="#2278E0" />
          </div>
        </div>

        {/* floating "Add Domain" popover, overlapping the lower-right */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 14, scale: 0.96 }}
          animate={show ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: rm ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[150px] -right-6 z-20 w-56 space-y-3 overflow-hidden rounded-[14px] border border-cv-line dark:border-white/10 bg-white dark:bg-black p-3.5 font-mono text-xs shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55)]"
        >
          {/* light-edge treatment (matches the tokens/latency cards) */}
          <CardLightEdge />
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#D97706]/20 text-[#D97706]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-cv-ink">Add Domain</span>
          </div>
          <div>
            <div className="mb-1 text-[10px] text-cv-muted">Domain Name</div>
            <div className="truncate rounded border border-cv-line bg-cv-ink/[0.06] px-2.5 py-1.5 text-cv-ink/70">
              info@yourcompany.ai
            </div>
          </div>
          <div>
            <div className="mb-1 text-[10px] text-cv-muted">Verification Email ID (Optional)</div>
            <div className="truncate rounded border border-cv-line bg-cv-ink/[0.06] px-2.5 py-1.5 text-cv-ink/70">
              test@yourcompany.ai
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/10 px-2.5 py-2">
            <SSOToggle on color="#2278E0" />
            <span className="text-cv-ink">Auto Join</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Section (layout / copy unchanged)
 * ------------------------------------------------------------------ */

const TOP_FEATURES = [
  {
    title: "Govern AI before the spend happens",
    body: "Policy, access controls, data residency, and vendor oversight sit in one place and apply before a request runs. Not a separate exception process bolted on at month-end.",
    Visual: MockRBACVisual,
  },
  {
    title: "Every decision logged and traceable",
    body: "Every model call, agent run, and workflow is on the record: who owned it, what it used, what it cost, what it returned. The same account finance, security, and the board can all read.",
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

const CELL = "bg-cv-surface dark:bg-[#0D0D0D] p-6 lg:p-8 flex flex-col";

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
              Policy, access controls, and full audit trails enforced before a single token leaves. Not a month-end reconciliation — governance that runs live, at the point of every decision.
            </p>
          </div>
        </div>

        {/* Outer border container */}
        <div className="border border-cv-line/30 divide-y divide-cv-line/30">

          {/* Row 1 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-cv-line/30">
            {TOP_FEATURES.map(({ title, body, Visual }) => (
              <div key={title} className={CELL}>
                <h3 className="text-base font-semibold text-cv-ink">{title}</h3>
                <p className="mt-2 text-sm text-cv-ink/55 leading-relaxed">{body}</p>
                <Link href="/platform/aix" className="mt-3 inline-flex items-center gap-1 text-xs text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors font-medium">
                  Learn More <ArrowRight weight="Linear" size={12} />
                </Link>
                <div className="mt-auto"><Visual /></div>
              </div>
            ))}
          </div>

          {/* Quote strip warm left border accent */}
          <div className="bg-cv-surface p-8 lg:p-10">
            <blockquote className="text-lg lg:text-xl leading-relaxed text-cv-ink/80 max-w-4xl">
              "Before CloudVerse we could see the bill. We couldn&apos;t say who owned it, which applications drove it, or whether the architecture under it was worth the cost."
            </blockquote>
            <div className="mt-6">
              <div className="font-semibold text-cv-ink text-sm">Head of FinOps</div>
              <div className="text-cv-muted text-sm">Large Southeast Asian digital &amp; telecommunications group</div>
            </div>
          </div>

          {/* Row 2 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-cv-line/30">
            {BOTTOM_FEATURES.map(({ title, body, Visual }) => (
              <div key={title} className={CELL}>
                <h3 className="text-base font-semibold text-cv-ink">{title}</h3>
                <p className="mt-2 text-sm text-cv-ink/55 leading-relaxed">{body}</p>
                <Link href="/platform/aix" className="mt-3 inline-flex items-center gap-1 text-xs text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors font-medium">
                  Learn More <ArrowRight weight="Linear" size={12} />
                </Link>
                <div className="mt-auto"><Visual /></div>
              </div>
            ))}
          </div>

          {/* Bottom full-width split card 40/60 */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] divide-y md:divide-y-0 md:divide-x divide-cv-line/30">
            {/* Left ~40%: logo + warm glow + testimonial */}
            <div className="relative flex flex-col justify-between bg-cv-surface p-8 lg:p-10 overflow-hidden min-h-[320px]">
              {/* Blue glow — both modes */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 90% 70% at 20% 80%, rgba(22,100,192,0.30) 0%, rgba(22,100,192,0.12) 50%, transparent 75%)" }}
                aria-hidden
              />
              <div className="relative inline-flex items-center gap-2.5">
                <img src="/cv-logo.png" alt="" aria-hidden className="h-8 w-auto" />
                <span className="text-cv-ink font-semibold text-sm tracking-wide">cloudverse</span>
              </div>
              <div className="relative mt-auto pt-10">
                <p className="text-cv-ink/70 text-sm leading-relaxed">
                  "The teams responsible for governance were reconciling provider invoices by hand and arriving at numbers finance and engineering both questioned. That&apos;s gone now."
                </p>
                <div className="mt-4">
                  <div className="font-semibold text-cv-ink text-sm">FinOps Lead</div>
                  <div className="text-cv-muted text-xs">Multi-cloud digital services group (AWS, Huawei, Google Cloud, Cloudflare)</div>
                </div>
              </div>
            </div>

            {/* Right ~60%: SSO feature */}
            <div className="bg-cv-surface flex flex-col p-8 lg:p-10">
              <h3 className="text-base font-semibold text-cv-ink">Single sign-on, scoped from day one</h3>
              <p className="mt-2 text-sm text-cv-ink/55 leading-relaxed">Onboard teams instantly and have CloudVerse follow your access rules from the start. Read-only by default. Automation is opt-in and logged.</p>
              <Link href="/platform/aix" className="mt-3 inline-flex items-center gap-1 text-xs text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors font-medium">
                Learn More <ArrowRight weight="Linear" size={12} />
              </Link>
              <div className="mt-auto"><MockSSOVisual /></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
