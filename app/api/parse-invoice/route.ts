import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const maxDuration = 60;

export interface SavingsOpportunity {
  service: string;
  currentSpend: number;
  estimatedSavingsPercent: number;
  estimatedSavingsAmount: number;
  action: string;
}

export interface InvoiceAnalysisResult {
  score: number;
  currency: string;
  totalSpend: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  providerDetected: string;
  lineItemCount: number;
  topAccountIdentifier?: string;
  topServices: { name: string; spend: number; percent: number }[];
  topRegions: { name: string; spend: number; percent: number }[];
  topLineItems: { displayName: string; service: string; quantity?: number; unit?: string; cost: number }[];
  computeSpendPercent: number;
  onDemandPercent: number;
  optimizationPotentialMin: number;
  optimizationPotentialMax: number;
  savingsOpportunities: SavingsOpportunity[];
  insights: string[];
}

function toNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function clampPercent(v: unknown): number {
  return Math.max(0, Math.min(100, toNumber(v)));
}

function buildPrompt(fileContent: string, fileName: string) {
  return `You are an expert cloud infrastructure economics advisor. Your job is NOT to read back the invoice; it is to analyze spending patterns and identify WHERE and HOW the customer can save money.

File name: ${fileName}

Invoice content:
${fileContent.substring(0, 50000)}

YOUR PRIMARY TASK:
1. Extract invoice metadata (provider, total spend, billing period, currency)
2. Identify top services by spend
3. For each top service, estimate a specific savings opportunity (savings %, amount, action)
4. Generate 3-5 actionable RECOMMENDATIONS (not summaries)

Good insight: "EC2 instances appear to be on-demand; switching to 1-year Reserved Instances could save ~30% on compute"
Bad insight: "EC2 accounts for 24% of total spend"

EXTRACTION RULES:
- Currency: 3-letter ISO code (USD, EUR, SGD, etc.)
- topServices: aggregate by service { name, spend, percent }
- Percent fields: 0-100 relative to totalSpend
- Round monetary values to 2 decimal places

EFFICIENCY SCORE (0-100):
- 90+: excellent commitment coverage, right-sized resources
- 70-89: good but room for optimization
- 50-69: significant savings available
- <50: urgent optimization needed

Return ONLY this JSON object (no markdown, no explanations):
{
  "score": 0, "currency": "USD", "totalSpend": 0,
  "billingPeriodStart": "YYYY-MM-DD", "billingPeriodEnd": "YYYY-MM-DD",
  "providerDetected": "Other", "lineItemCount": 0, "topAccountIdentifier": null,
  "topServices": [{"name": "", "spend": 0, "percent": 0}],
  "topRegions": [{"name": "", "spend": 0, "percent": 0}],
  "topLineItems": [{"displayName": "", "service": "", "quantity": 0, "unit": "", "cost": 0}],
  "computeSpendPercent": 0, "onDemandPercent": 0,
  "optimizationPotentialMin": 0, "optimizationPotentialMax": 0,
  "savingsOpportunities": [{"service": "", "currentSpend": 0, "estimatedSavingsPercent": 0, "estimatedSavingsAmount": 0, "action": ""}],
  "insights": []
}`;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const text = await file.text();
    if (!text.trim()) {
      return NextResponse.json({ error: "File appears empty" }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: buildPrompt(text, file.name) }],
      response_format: { type: "json_object" },
      max_tokens: 4096,
      temperature: 0.2,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json({ error: "Empty response from model" }, { status: 502 });
    }

    const parsed = JSON.parse(raw);
    const totalSpend = Math.max(0, toNumber(parsed.totalSpend));
    const today = new Date().toISOString().split("T")[0];

    const topServices = (parsed.topServices || []).slice(0, 5).map((s: any) => {
      const spend = Math.max(0, toNumber(s.spend ?? s.cost));
      const inferred = totalSpend > 0 ? (spend / totalSpend) * 100 : 0;
      return {
        name: String(s.name || s.service || "Unknown"),
        spend: Number(spend.toFixed(2)),
        percent: Number(clampPercent(s.percent ?? inferred).toFixed(2)),
      };
    });

    const topRegions = (parsed.topRegions || []).slice(0, 3).map((r: any) => {
      const spend = Math.max(0, toNumber(r.spend ?? r.cost));
      const inferred = totalSpend > 0 ? (spend / totalSpend) * 100 : 0;
      return {
        name: String(r.name || r.region || "Unknown"),
        spend: Number(spend.toFixed(2)),
        percent: Number(clampPercent(r.percent ?? inferred).toFixed(2)),
      };
    });

    const topLineItems = (parsed.topLineItems || []).slice(0, 5).map((i: any) => ({
      displayName: String(i.displayName || i.name || "Unknown"),
      service: String(i.service || "Unknown"),
      quantity: Math.max(0, toNumber(i.quantity)),
      unit: String(i.unit || ""),
      cost: Number(Math.max(0, toNumber(i.cost ?? i.spend)).toFixed(2)),
    }));

    const savingsOpportunities = (parsed.savingsOpportunities || []).slice(0, 5).map((o: any) => {
      const currentSpend = Math.max(0, toNumber(o.currentSpend));
      const pct = clampPercent(o.estimatedSavingsPercent);
      const amount =
        Math.max(0, toNumber(o.estimatedSavingsAmount)) ||
        Number(((currentSpend * pct) / 100).toFixed(2));
      return {
        service: String(o.service || "Unknown"),
        currentSpend: Number(currentSpend.toFixed(2)),
        estimatedSavingsPercent: Number(pct.toFixed(2)),
        estimatedSavingsAmount: amount,
        action: String(o.action || ""),
      };
    });

    const insights = (parsed.insights || [])
      .map((x: any) => String(x || "").trim())
      .filter(Boolean)
      .slice(0, 5);

    const result: InvoiceAnalysisResult = {
      score: Math.round(clampPercent(parsed.score)),
      currency: String(parsed.currency || "USD"),
      totalSpend: Number(totalSpend.toFixed(2)),
      billingPeriodStart: String(parsed.billingPeriodStart || today),
      billingPeriodEnd: String(parsed.billingPeriodEnd || today),
      providerDetected: String(parsed.providerDetected || "Other"),
      lineItemCount: Math.max(0, Math.round(toNumber(parsed.lineItemCount))),
      topAccountIdentifier: parsed.topAccountIdentifier ? String(parsed.topAccountIdentifier) : undefined,
      topServices,
      topRegions,
      topLineItems,
      computeSpendPercent: Number(clampPercent(parsed.computeSpendPercent).toFixed(2)),
      onDemandPercent: Number(clampPercent(parsed.onDemandPercent).toFixed(2)),
      optimizationPotentialMin: Number(clampPercent(parsed.optimizationPotentialMin).toFixed(2)),
      optimizationPotentialMax: Number(clampPercent(parsed.optimizationPotentialMax).toFixed(2)),
      savingsOpportunities,
      insights,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[parse-invoice] error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed to analyze invoice: ${message}` }, { status: 500 });
  }
}
