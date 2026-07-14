# AIX Product Page — Full Text Content
`/app/platform/aix/page.tsx` and all rendered components, top to bottom

---

## Hero

**Eyebrow label:** AIX

**H1:** The control plane for enterprise AI.

**CTA buttons:**
- Book a Demo →
- Explore the platform

**Body copy (right column):**
Route, govern, and meter every AI request across your models, clouds, GPUs, and private endpoints. The cost decision gets made before the request goes out, not in a spreadsheet after the bill lands.

*Optimizing the future of enterprise AI consumption.*

### Hero mockup (tabbed video-preview placeholder)
Tabs (auto-advancing, with icon + label + copy underneath):

- **Routing** — Every request scored live on cost, latency, and quality. The best-fit route wins, with a fallback attached.
- **Governance** — Policy, access, residency, and provider trust enforced before a request runs.
- **Cost Attribution** — Every run lands against a team, feature, and tenant. Automatically.
- **Audit Trail** — Every routing decision logged with the constraints, the candidates, and why one won.

Mock placeholder text shown per active tab: "[Tab label] preview" / "Video coming soon"

Mobile carousel nav buttons: "Previous tab" / "Next tab" (aria-labels only, not visible text)

---

## Stats bar

- **40–90%** — cost reduction on production workloads
- **<15ms** — routing overhead per request
- **96.8%** — lower cost vs a hardcoded Claude Sonnet setup
- **28.5%** — faster than that baseline

---

## AI compute is becoming too expensive to hardcode.

**H2:** AI compute is becoming too expensive to hardcode.

Most teams pick a model once, wire it into the app, and move on. Six months later a cheaper model handles 70% of those requests just as well, and nobody notices.

A hardcoded choice doesn't update when prices drop. It doesn't reroute when a provider slows down. That gap is where the budget quietly goes.

### OrbitCore diagram (AIX brand cube with orbiting labeled pills)
Center wordmark: AIX

Orbiting pill labels:
- Model selection
- Provider scoring
- Cost controls
- Residency rules
- Latency routing
- Compliance log

### Before / After AIX comparison cards

**Before AIX** — *Hardcoded, static*

| Attribute | Before |
|---|---|
| Model | One, chosen once |
| Provider | Fixed |
| Region | Fixed |
| Routing | None — every request goes the same place |
| Cost | An assumption, not a measurement |

**After AIX** — *Dynamic, per request*

| Attribute | After |
|---|---|
| Model | Best fit, per request |
| Provider | Scored live, with a fallback |
| Region | Chosen by residency rule |
| Routing | Cost, latency, quality, and compliance |
| Cost | Attributed, capped, and on the record |

---

## How AIX controls every AI request.

**H2:** How AIX controls every AI request.

AIX sits between your application and every AI provider you use. On each request it scores the available routes against the rules your team set, then returns the best one with a fallback and a full decision log.

*A gateway runs the rule you wrote. AIX works out whether that rule is still right.*

### Step tab-bar (auto-advancing, 6 steps)

**Connect** — *any provider*
Add your provider API keys and endpoints. Minutes per provider, no application change.
(detail chips: OpenAI · Anthropic · Google / Bedrock · Azure · self-hosted / No app rewrite)

**Govern** — *before it runs*
Set the constraints: latency ceiling, budget cap, allowed providers, residency, quality floor.
(detail chips: Budget caps / Residency + provider allow-lists / Quality floor)

**Score** — *every route live*
Each route is evaluated live on cost, latency distribution, and quality fit.
(detail chips: Cost per token / Latency distribution / Quality fit)

**Route** — *to the best fit*
Policy filters the scored routes; the best-fit wins and a fallback stands ready.
(detail chips: Best-fit wins / Fallback attached / <15ms overhead)

**Measure** — *every dollar*
Cost per request, per feature, and per tenant, tracked as it happens.
(detail chips: Per request / Per feature / Per tenant)

**Audit** — *every decision*
Every decision logged: constraints active, routes considered, and why one won.
(detail chips: Constraints active / Routes considered / Why one won)

### Product dashboard mock shown beneath the steps (mock/example data)

Top bar: "cloudverse" / "Logs" / "Workspace" / "Organisation"

Sidebar nav groups:
- **Observability:** Analytics, Logs (active), Exports
- **AI Gateway:** Configs, Virtual Keys, Guardrails
- **Prompt Engineering:** Playground, Prompts, Prompt Partials

Logs table columns: "Timestamp" / "Trace ID"
Example log rows (mock):
- Apr 30, 03:36:58 AM — 9c89c525-fdf8-4fce-bb94-fd2814
- Apr 30, 03:36:56 AM — 634ff4bf-04b9-4c60-b69f-9363c6
- Apr 30, 03:36:47 AM — 5923890b-f23a-4819-8e29-38243b
- Apr 30, 03:36:37 AM — 0824d426-126e-44c6-b56a-53554
- Apr 30, 03:36:37 AM — ea263144-5b42-4baa-8372-654731
- Apr 30, 03:36:32 AM — 0a10de63-b1ec-44d5-9a8a-9e6625
- Apr 30, 03:35:37 AM — f33833de-cc9d-4ae6-8c96-84f0e0
- Apr 30, 03:34:59 AM — 4b05bc4d-40e2-4ba4-a50c-9bd2d1
- Apr 30, 03:33:47 AM — 1e3e916b-720e-4aa0-99ca-ec0927

Search box placeholder: "Search Filter"

Detail panel (mock/example):
- "Trace ID" — 9480ca99-d906…f8a91
- Tabs: "Request Details" / "Guardrails & Feedback" (active)
- "Timeline" section with example spans:
  - Crew.kickoff — 1.51 s
  - Crew Created — 0.31 ms
  - Task.execute_sync — 1.1 s
  - Task Created — 0.04 ms
  - Agent.execute_… — 1.1 s
  - Completions.c… — 1.08 s
  - Task.execut… — 399.97 ms
  - Task Created — 0.11 ms
  - Agent.ex… — 396.66 ms
- Meta fields (example): traceId, spanId, spanName ("Task Created"), startTime, endTime, _source ("opentelemetry") with example values
- "Response (0 tokens)" with example JSON:
```json
{
  "status": 200,
  "headers": { "Content-Type": "application/json" },
  "body": {},
  "responseTime": 0.1129,
  "lastUsedOptionJsonPath": ""
}
```
- "Feedback" with a 5-star rating icon row

---

## The cost of not routing.

**H2:** The cost of not routing.

Every hardcoded endpoint spends money without making a decision. The same work, on the right model, often costs a fraction, at the same or better quality.

### ROI comparison

**Left card label:** At scale (monthly)

| Monthly volume | Hardcoded spend | With AIX | Monthly saving |
|---|---|---|---|
| 1M requests | $2,980 | $298 | $2,682 |
| 5M requests | $14,900 | $1,490 | $13,410 |
| 10M requests | $29,800 | $2,980 | $26,820 |
| 50M requests | $149,000 | $14,900 | $134,100 |

*Assumption: 40–90% reduction applied at an 89% average. Your mix will differ; the audit measures yours.*

**Right cards:**

"Without AIX" (neutral card)
- Model — Claude Sonnet
- Latency — 5,537 ms
- Cost / request — $0.00298

"With AIX" (blue highlighted card)
- Model — GPT-4o-mini
- Latency — 3,962 ms (chip: -28.5%)
- Cost / request — $0.00010 (chip: -96.8%)

Result banner: **96.8% lower cost** · **28.5% faster**
Same task, same-or-better quality.

---

## Built for enterprise AI governance.

**H2:** Built for enterprise AI governance.

Every routing decision AIX makes is recorded, auditable, and explainable. Governance is on by default, not bolted on.

### Governance feature grid (6 cards)

**1. Multi-tenant isolation**
Workloads, policies, and cost kept fully separate.
Mock table — columns: Workspace / Policy / GPU alloc. / Cost cap
Tabs: Acme AI, Beta Labs, Core Eng
- Acme AI — Strict-Prod — 42% — $4.2k / mo
- Beta Labs — Flexible — 31% — $3.1k / mo
- Core Eng — Residency-EU — 27% — $2.7k / mo

**2. Data residency controls**
Route by region to meet sovereignty rules.
Mock table — columns: Region / Status / Approved providers
- eu-west-1 — Enforced — Azure EU · Mistral
- us-east-1 — Enforced — OpenAI · Anthropic
- ap-south-1 — Restricted — Pending approval

**3. PII handling rules**
Detection enforced before provider selection.
Mock table — columns: Field / Rule / Sample
- Email — Mask — a•••@•••.io
- SSN — Block — •••-••-••••
- Full name — Tokenize — [REDACTED]
- Card no. — Block — •••• •••• 4•2

**4. Budget caps**
Hard ceilings applied before a request goes out.
Mock meters:
- Research — $8.2k / $10k (82%)
- Platform — $4.1k / $6k (68%)
- Data Eng — $2.7k / $5k (54%)

**5. Org / team policy scopes**
Different teams run under different constraint sets.
Mock tree — "Organization" root:
- Platform Eng — Strict-Prod — "Prod routes only, no fallback"
- Research — Flexible — "Full model access, sandboxed"
- Data Team — Residency-EU — "EU providers only"

**6. Full execution trace logs**
Every decision timed, scored, and logged.
Mock waterfall stages:
- Intake — 8ms
- Constraint eval — 11ms
- Route scoring — 16ms
- Selection — 6ms
- Dispatch — 10ms
Footer note: "Trace committed to audit log"

---

## No black boxes.

### Left: decision-trace JSON card
Window chrome label: "JSON"

Example trace JSON (mock):
```json
{
  "requestId": "req_a1b2c3",
  "constraints": {
    "budget_cap": "$0.0005",
    "region": "EU",
    "latency_max": 4000
  },
  "routesEvaluated": 4,
  "selectedRoute": "GPT-4o-mini (Together AI, eu-west)",
  "reason": "Lowest cost within latency and region constraints",
  "result": {
    "cost": "$0.00010/req",
    "latency": "3,962ms",
    "fallback": "Mistral-Large (eu-central)"
  }
}
```

### Right: headline + copy

**H2:** No black boxes.

Every routing decision includes an evidence summary: the constraints active, the routes evaluated, the one selected, and why. If you can't explain a decision, you can't govern it.

SOC2 and ISO-aligned architecture. Audit trails, access controls, and policy enforcement structured to support compliance documentation. Specific certification status confirmed during your evaluation.

---

## Four problems AIX fixes.

**H2:** Four problems AIX fixes.

The routing problems teams actually hit in production — and how AIX resolves each one at decision time.

*(Carousel controls: "Previous" / "Next" — aria-labels only)*

### Card 1 — Multi-provider cost arbitrage
Requests are profiled by task complexity and routed to the cheapest model that holds quality — the same 15M calls drop from ~$44.7k to ~$12.6k a month.
Link: Learn More →

Mock panel — "Routing decision"
- Cost bars (example): opus $0.00298, gpt-4o $0.00250, mistral $0.00030, 4o-mini $0.00010 (chosen)
- "Routed → gpt-4o-mini" — "Cheapest route that holds quality" — pill: "96.8% saved"

### Card 2 — Compliance-bound routing
Residency rules configured per org and region, enforced before routing, so no unapproved provider ever slips into production.
Link: Learn More →

Mock panel — "Policy evaluations" (example log rows)
- gpt-4o · eu-west-1 prompt — March 9th, 2025 — pill: Allowed
  - policy_id: pg-prod-guardrails
  - decision: Allowed before run
  - data_residency: eu-west-1
  - access_role: FinOps Admin
  - checks: PII redaction, budget-limit
  - gate_latency: 42ms
- claude-3 · us-east agent call — March 3rd, 2025 — pill: Blocked
- llama-3 · ap-south fine-tune — March 3rd, 2025 — pill: Flagged

### Card 3 — GPU cost control for AI agents
Per-agent budget caps applied at the routing layer take monthly spend variance from 3× down to under 15%.
Link: Learn More →

Mock panel — "Agent budgets" (example)
- support-agent — $124/$200 — pill: On track
- research-agent — $176/$200 — pill: Near cap
- ops-agent — $90/$200 — pill: On track
- Footer: "Monthly spend variance" — "3× → <15%"

### Card 4 — Multi-model product infrastructure
Each feature is its own workload with its own constraint profile, so the team responds to model-market shifts in hours, not a sprint.
Link: Learn More →

Mock panel — "Workloads" (2×2 tiles, example)
- search — latency-first — → GPT-4o-mini — switched 3h ago
- summarize — quality-first — → Claude — switched 1d ago
- classify — cost-first — → Gemini — switched 2h ago
- extract — latency-first — → Mistral — switched 6h ago

---

## Connect once. Route everywhere.

**H2:** Connect once. Route everywhere.

Add your providers once. AIX handles routing, fallback, and cost tracking across all of them. No code changes when you add a new provider.

**H3 (label):** Supported model providers

### Provider marquee (two scrolling rows of logo tiles)
OpenAI, Anthropic, Google Gemini, Mistral AI, Cohere, Llama, Ollama, Groq, DeepSeek, HuggingFace

---

## Structured data (not visible)
A `BreadcrumbJsonLd` component renders breadcrumb schema (Home → Platform → AIX) — this is JSON-LD metadata, not rendered visible text, so it is noted here for completeness only and not included as body copy.
