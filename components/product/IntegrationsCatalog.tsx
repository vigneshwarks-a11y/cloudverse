"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Cloud,
  Database,
  Cpu,
  Server,
  ServerSquare,
  Key,
  Ticket,
  ChatRound,
  ChartSquare,
  Widget,
  Magnifer,
  AltArrowDown,
  type IconProps,
} from "@solar-icons/react";

/* Full integrations directory: searchable + filterable by module, category,
   and status. Client component (interactive filtering). Card + control styling
   uses the cv-* design tokens so it stays theme-aware; module accent colours
   match the platform brand hues (AIX violet, DevX blue, DataX pink). */

type ModuleTag = "AIX" | "DevX" | "DataX";
type Status = "Available" | "Coming soon";
type Category =
  | "Cloud" | "Data" | "AI" | "Kubernetes" | "Infrastructure"
  | "Identity" | "Ticketing" | "Collaboration" | "Observability" | "SaaS";

type Integration = {
  name: string;
  desc: string;
  status: Status;
  category: Category;
  modules: ModuleTag[];
  src?: string;
  invert?: boolean;
};

const MODULE_COLOR: Record<ModuleTag, string> = {
  AIX: "#6954D4",
  DevX: "#2278E0",
  DataX: "#DB4A8B",
};

const CAT_ICON: Record<Category, ComponentType<IconProps>> = {
  Cloud: Cloud,
  Data: Database,
  AI: Cpu,
  Kubernetes: Server,
  Infrastructure: ServerSquare,
  Identity: Key,
  Ticketing: Ticket,
  Collaboration: ChatRound,
  Observability: ChartSquare,
  SaaS: Widget,
};

const INTEGRATIONS: Integration[] = [
  { name: "AWS", desc: "Billing and usage ingestion with allocation dimensions.", status: "Available", category: "Cloud", modules: ["AIX", "DevX", "DataX"], src: "/icons/aws.svg" },
  { name: "Microsoft Azure", desc: "Billing, subscriptions, and cost dimensions across tenants.", status: "Available", category: "Cloud", modules: ["AIX", "DevX", "DataX"], src: "/icons/azure.svg" },
  { name: "Google Cloud", desc: "Billing and usage via BigQuery-backed exports and APIs.", status: "Available", category: "Cloud", modules: ["AIX", "DevX", "DataX"], src: "/icons/googlecloud.svg" },
  { name: "Oracle Cloud Infrastructure", desc: "Billing and usage across tenancy compartments.", status: "Available", category: "Cloud", modules: ["AIX", "DevX", "DataX"], src: "/icons/oracle.svg" },
  { name: "Alibaba Cloud", desc: "Billing and usage ingestion for multi-cloud visibility.", status: "Available", category: "Cloud", modules: ["AIX", "DevX", "DataX"], src: "/icons/alibabacloud.svg" },
  { name: "Huawei Cloud", desc: "Billing and usage ingestion for enterprise reporting.", status: "Available", category: "Cloud", modules: ["AIX", "DevX", "DataX"] },
  { name: "Tencent Cloud", desc: "Billing and usage ingestion across accounts and regions.", status: "Available", category: "Cloud", modules: ["AIX", "DevX", "DataX"], src: "/icons/tencentcloud.svg" },
  { name: "Databricks", desc: "Workspace usage and compute costs for analytics spend.", status: "Available", category: "Data", modules: ["DataX"] },
  { name: "Snowflake", desc: "Warehouse consumption and credits for data spend.", status: "Coming soon", category: "Data", modules: ["DataX"], src: "/icons/snowflake.svg" },
  { name: "OpenAI", desc: "API usage, token consumption, and cost signals.", status: "Available", category: "AI", modules: ["AIX"], src: "/icons/openai.svg", invert: true },
  { name: "Kubernetes", desc: "Cluster usage and workload attribution via agent.", status: "Available", category: "Kubernetes", modules: ["DevX"], src: "/icons/kubernetes.svg" },
  { name: "OpenShift", desc: "Cluster and namespace attribution for enterprise platforms.", status: "Available", category: "Kubernetes", modules: ["DevX"] },
  { name: "vCenter", desc: "Virtual infrastructure inventory and usage attribution.", status: "Available", category: "Infrastructure", modules: ["DevX"], src: "/icons/vmware.svg" },
  { name: "OAuth: Microsoft", desc: "SSO via Microsoft OAuth for secure login.", status: "Available", category: "Identity", modules: ["DevX"] },
  { name: "OAuth: Google", desc: "SSO via Google OAuth for secure login.", status: "Available", category: "Identity", modules: ["DevX"] },
  { name: "Microsoft Entra ID", desc: "Directory sync for identity-based allocation and access control.", status: "Available", category: "Identity", modules: ["DevX"] },
  { name: "Jira", desc: "Tickets and ownership context for allocation and ops.", status: "Available", category: "Ticketing", modules: ["DevX"] },
  { name: "ServiceNow", desc: "ITSM and ownership context for accountability and workflow.", status: "Available", category: "Ticketing", modules: ["DevX"] },
  { name: "Slack", desc: "Alerts and notifications delivery for anomalies and automation.", status: "Available", category: "Collaboration", modules: ["DevX"] },
  { name: "Microsoft Teams", desc: "Notifications and approvals for automation workflows.", status: "Available", category: "Collaboration", modules: ["DevX"] },
  { name: "Cloud Monitoring", desc: "Signals from major cloud monitoring suites.", status: "Available", category: "Observability", modules: ["DevX"] },
  { name: "Top SaaS (Top 10)", desc: "Key SaaS spend and usage normalization.", status: "Coming soon", category: "SaaS", modules: ["DevX"] },
  { name: "Anthropic", desc: "Claude API usage and cost attribution for model economics.", status: "Coming soon", category: "AI", modules: ["AIX"], src: "/icons/anthropic.svg", invert: true },
  { name: "Azure OpenAI", desc: "Managed OpenAI deployment cost and usage signals.", status: "Coming soon", category: "AI", modules: ["AIX"], src: "/icons/azure.svg" },
  { name: "AWS Bedrock", desc: "Foundation model invocation costs and usage attribution.", status: "Coming soon", category: "AI", modules: ["AIX"], src: "/icons/aws.svg" },
  { name: "Google Vertex AI", desc: "Vertex AI model and pipeline cost attribution.", status: "Coming soon", category: "AI", modules: ["AIX"], src: "/icons/gemini.svg" },
  { name: "GitHub", desc: "PR-level economic gates and infrastructure change detection.", status: "Coming soon", category: "SaaS", modules: ["DevX"] },
  { name: "GitLab", desc: "Merge request gates and pipeline cost attribution.", status: "Coming soon", category: "SaaS", modules: ["DevX"] },
  { name: "Azure DevOps", desc: "Pipeline and repo integration for shift-left economics.", status: "Coming soon", category: "SaaS", modules: ["DevX"], src: "/icons/azure.svg" },
  { name: "Terraform", desc: "Infrastructure-as-code cost estimation and drift detection.", status: "Coming soon", category: "Infrastructure", modules: ["DevX"] },
  { name: "BigQuery", desc: "Query-level cost enforcement and workload economics.", status: "Coming soon", category: "Data", modules: ["DataX"], src: "/icons/googlecloud.svg" },
  { name: "Amazon Redshift", desc: "Cluster workload economics and query cost enforcement.", status: "Coming soon", category: "Data", modules: ["DataX"], src: "/icons/aws.svg" },
  { name: "Azure Synapse / Fabric", desc: "Data platform workload economics and capacity management.", status: "Coming soon", category: "Data", modules: ["DataX"], src: "/icons/azure.svg" },
];

const MODULE_FILTERS = ["All", "AIX", "DevX", "DataX"] as const;
const CATEGORY_FILTERS = ["All", "Cloud", "Data", "AI", "Kubernetes", "Infrastructure", "Identity", "Ticketing", "Collaboration", "Observability", "SaaS"] as const;
const STATUS_FILTERS = ["All", "Available", "Coming soon"] as const;

function ItemIcon({ item }: { item: Integration }) {
  if (item.src) {
    return <img src={item.src} alt="" className={`h-6 w-6 shrink-0 object-contain${item.invert ? " dark:invert" : ""}`} />;
  }
  const Icon = CAT_ICON[item.category];
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-cv-ink/70">
      <Icon weight="Bold" size={20} />
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "Available") {
    return (
      <span className="shrink-0 rounded-md px-2 py-0.5 text-xs font-medium text-[#0E9E7A] ring-1 ring-[#0E9E7A]/25 dark:text-[#34D399]" style={{ background: "rgba(14,158,122,0.12)" }}>
        Available
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-md bg-cv-ink/[0.05] px-2 py-0.5 text-xs font-medium text-cv-muted ring-1 ring-cv-line dark:bg-white/[0.06]">
      Coming soon
    </span>
  );
}

function ModuleBadge({ m }: { m: ModuleTag }) {
  const c = MODULE_COLOR[m];
  return (
    <span className="rounded-md border px-1.5 py-0.5 text-[11px] font-semibold" style={{ color: c, borderColor: `${c}55`, background: `${c}1a` }}>
      {m}
    </span>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-cv-ink px-4 py-1.5 text-sm font-medium text-cv-surface"
          : "rounded-full border border-cv-line px-4 py-1.5 text-sm text-cv-ink/75 transition-colors hover:border-cv-ink/40 hover:text-cv-ink"
      }
    >
      {children}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cv-muted">{children}</div>;
}

export default function IntegrationsCatalog() {
  const [query, setQuery] = useState("");
  const [module, setModule] = useState<(typeof MODULE_FILTERS)[number]>("All");
  const [category, setCategory] = useState<(typeof CATEGORY_FILTERS)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTEGRATIONS.filter((it) => {
      if (q && !`${it.name} ${it.desc}`.toLowerCase().includes(q)) return false;
      if (module !== "All" && !it.modules.includes(module)) return false;
      if (category !== "All" && it.category !== category) return false;
      if (status !== "All" && it.status !== status) return false;
      return true;
    });
  }, [query, module, category, status]);

  return (
    <div>
      {/* search */}
      <div className="relative">
        <Magnifer
          weight="Linear"
          size={20}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cv-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search integrations..."
          className="w-full rounded-full border border-cv-line bg-cv-surface2 pl-14 pr-6 py-3.5 text-cv-ink outline-none transition-colors placeholder:text-cv-muted focus:border-cv-blue/50 dark:bg-white/[0.03]"
        />
      </div>

      {/* filters */}
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <div className="shrink-0">
          <FieldLabel>Module</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {MODULE_FILTERS.map((m) => (
              <Pill key={m} active={module === m} onClick={() => setModule(m)}>{m}</Pill>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <FieldLabel>Category</FieldLabel>
          <div className="relative lg:w-52">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as (typeof CATEGORY_FILTERS)[number])}
              className="w-full cursor-pointer appearance-none rounded-full border border-cv-line bg-cv-surface2 pl-4 pr-10 py-2 text-sm text-cv-ink outline-none transition-colors hover:border-cv-ink/40 focus:border-cv-blue/50 dark:bg-white/[0.03]"
            >
              {CATEGORY_FILTERS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <AltArrowDown
              weight="Linear"
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cv-muted"
            />
          </div>
        </div>

        <div className="shrink-0">
          <FieldLabel>Status</FieldLabel>
          <div className="relative lg:w-44">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as (typeof STATUS_FILTERS)[number])}
              className="w-full cursor-pointer appearance-none rounded-full border border-cv-line bg-cv-surface2 pl-4 pr-10 py-2 text-sm text-cv-ink outline-none transition-colors hover:border-cv-ink/40 focus:border-cv-blue/50 dark:bg-white/[0.03]"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <AltArrowDown
              weight="Linear"
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cv-muted"
            />
          </div>
        </div>
      </div>

      {/* grid */}
      {results.length === 0 ? (
        <p className="mt-14 text-center text-cv-muted">No integrations match your filters.</p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((it) => (
            <div
              key={it.name}
              className="flex flex-col rounded-xl border border-cv-line/60 bg-cv-surface p-5 dark:border-white/[0.08] dark:bg-[#0D0D0D]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <ItemIcon item={it} />
                  <h3 className="font-display text-[15px] font-semibold leading-tight text-cv-ink">{it.name}</h3>
                </div>
                <StatusBadge status={it.status} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cv-muted">{it.desc}</p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                <span className="text-xs text-cv-muted">{it.category}</span>
                {it.modules.map((m) => (
                  <ModuleBadge key={m} m={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
