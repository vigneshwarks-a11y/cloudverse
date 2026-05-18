export type Resource = {
  slug: string;
  title: string;
  excerpt: string;
  tag: "Guide" | "Report" | "Customer story" | "Whitepaper";
  readTime: string;
  date: string;
  body: string;
};

export const RESOURCES: Resource[] = [
  {
    slug: "berkshire-738k-annualised-savings",
    title: "How Berkshire Hathaway HomeServices recovered $738,983 in annualised cloud savings",
    excerpt: "A multi-cloud Azure + AWS estate produced significant variance without a shared allocation model. Here is what the team did in the first 30 days.",
    tag: "Customer story",
    readTime: "8 min read",
    date: "Apr 2026",
    body: `A growing multi-cloud estate split across Azure and AWS produced significant monthly variance without a shared allocation model. The FinOps team needed a control plane that finance could trust and engineering would actually use.

**The first 24 hours.** CloudVerse connected both accounts read-only. By the end of day one, an unmissable backlog had surfaced: commitment gaps on Azure Reserved Instances, stranded App Service Plan capacity, and a long tail of untagged spend with no clear owner.

**The first 30 days.** $101,736 in monthly identified savings, $61,582 realised, $738,984 annualised. Allocation reconciled to finance reporting on the first close after rollout.

**What unlocked it.** A single allocation model expressed once and applied consistently across both clouds — no spreadsheet reconciliation, no per-cloud workaround. Every recommendation came with explicit payback proof, which made approvals trivial.`,
  },
  {
    slug: "ai-cost-economics-2026",
    title: "Compute economics for the AI era — 2026 outlook",
    excerpt: "GPU, inference, and training spend is reshaping the FinOps practice. Here is the framework we are seeing leaders adopt.",
    tag: "Report",
    readTime: "12 min read",
    date: "Mar 2026",
    body: `The 2026 cloud bill is no longer 80% storage and compute. Inference, training, and GPU pool spend are now line items finance leaders see weekly. The teams getting this right are doing four things in parallel.

**1. Treat AI as cloud, not a side budget.** GPU hours, token spend, and inference cost belong in the same allocation model as VM and storage spend. Two reports is one too many.

**2. Make the routing decision auditable.** Every inference request should leave a trail — which provider, what cost, what latency, why this route. Without it, savings claims are unfalsifiable.

**3. Enforce policy at request time.** Region, compliance, latency, budget — guardrails belong in the code path, not in a post-hoc dashboard.

**4. Attribute back to product economics.** Cost per request, per customer, per workload. Anything else is FinOps theatre.`,
  },
  {
    slug: "pr-cost-checks-shift-left",
    title: "Shift-left cost: a practical guide to PR-level cost checks",
    excerpt: "Every infrastructure PR should come with a cost diff. Here is how to roll it out without slowing engineering down.",
    tag: "Guide",
    readTime: "9 min read",
    date: "Feb 2026",
    body: `Cost regressions are easier to prevent than to chase. The discipline is familiar — same shape as security or quality gates — and it works best when it lives where engineers already work: the pull request.

**Phase 1 — advisory.** Comment-only on every PR. Tunes the noise floor and earns trust. Two weeks.

**Phase 2 — guardrails.** A small set of required policies on cost-impacting paths. Region allowlist. Instance family allowlist. Monthly cost ceiling per pool. Two weeks.

**Phase 3 — policy as code.** Move guardrails into the repo. PR review for cost policy is now indistinguishable from PR review for anything else. Ongoing.

**The payback.** One customer prevented a single $2.9k/month regression in a PR that would have shipped on a Friday afternoon. The check ran in 14 seconds.`,
  },
  {
    slug: "warehouse-query-economics",
    title: "Why warehouse cost intelligence is not a dashboard",
    excerpt: "Snowflake and BigQuery dashboards explain spend; they do not change it. Here is what a control plane looks like.",
    tag: "Whitepaper",
    readTime: "11 min read",
    date: "Jan 2026",
    body: `Most warehouse cost tools answer "what happened." That is necessary but not sufficient. The actual job is "what should change, by whom, and what does it pay back."

**Attribution down to the query.** Every query tied to the user, role, dashboard, model, or scheduled job that issued it.

**Pattern detection with rewrite proof.** Repeated expensive patterns surfaced with a specific fix and a quantified payback.

**Safe automation.** One-click fixes that respect ownership, scheduling, and downstream contracts. Read-only by default.

**The real test.** Can a data engineer see the $117 recurring query and fix it the same afternoon, without escalating to a platform team? If yes, you have a control plane. If no, you have a dashboard.`,
  },
  {
    slug: "finops-allocation-models",
    title: "Allocation models that engineering actually trusts",
    excerpt: "A field guide to the four allocation patterns we see at scale — and when each one breaks down.",
    tag: "Guide",
    readTime: "7 min read",
    date: "Dec 2025",
    body: `Allocation is where most FinOps programs lose engineering trust. The fix is rarely "more tags." It is usually "be explicit about the model."

**Pattern 1 — tag-driven.** Cleanest in single-cloud, weakest with shared services. Works when tag hygiene is enforced upstream.

**Pattern 2 — account or subscription based.** Strong audit trail, weak granularity. Common in regulated industries.

**Pattern 3 — namespace / cluster based.** Best for Kubernetes-heavy estates. Falls down without a clean shared-services split.

**Pattern 4 — hybrid.** The right answer for most estates over $1M/month. Tag-primary, account-secondary, with explicit shared-service rules.

The model matters less than the discipline. Pick one, write it down, and reconcile it to finance every month.`,
  },
];

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
