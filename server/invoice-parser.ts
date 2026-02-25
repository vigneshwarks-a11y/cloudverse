import { GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

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

type ParsedInvoiceRaw = {
  score?: unknown;
  currency?: unknown;
  totalSpend?: unknown;
  billingPeriodStart?: unknown;
  billingPeriodEnd?: unknown;
  providerDetected?: unknown;
  lineItemCount?: unknown;
  topAccountIdentifier?: unknown;
  computeSpendPercent?: unknown;
  onDemandPercent?: unknown;
  optimizationPotentialMin?: unknown;
  optimizationPotentialMax?: unknown;
  insights?: unknown[];
  topServices?: Array<Partial<{ name: string; service: string; spend: number; cost: number; percent: number }>>;
  topRegions?: Array<Partial<{ name: string; region: string; spend: number; cost: number; percent: number }>>;
  topLineItems?: Array<
    Partial<{
      displayName: string;
      name: string;
      service: string;
      quantity: number;
      unit: string;
      cost: number;
      spend: number;
    }>
  >;
  savingsOpportunities?: Array<Partial<SavingsOpportunity>>;
};

function getGeminiClient(): { model: any } {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  return {
    model: genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    }),
  };
}

// function getOpenAIClient(): OpenAI {
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error("OPENAI_API_KEY not configured");
//   }
//
//   return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// }

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) return fenced[1];

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }

  return text;
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function clampPercent(value: unknown): number {
  const n = toNumber(value);
  return Math.max(0, Math.min(100, n));
}

function normalizeDate(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const s = value.trim();
  if (!s) return fallback;
  return s;
}

export async function parseInvoice(fileContent: string, fileName: string): Promise<InvoiceAnalysisResult> {
  const today = new Date().toISOString().split("T")[0];
  const prompt = `
You are an expert cloud infrastructure economics advisor. Your job is NOT to read back the invoice — it is to analyze spending patterns and identify WHERE and HOW the customer can save money.

File name: ${fileName}

Invoice content:
${fileContent.substring(0, 50000)}

YOUR PRIMARY TASK:
1. Extract the invoice metadata (provider, total spend, billing period, currency)
2. Identify the top services by spend
3. For EACH top service, estimate a specific savings opportunity with:
   - What percentage can be saved on that service
   - The estimated dollar amount that can be saved
   - A specific, actionable recommendation (e.g., "Right-size underutilized EC2 instances", "Switch to Graviton instances", "Use Reserved Instances for steady-state RDS workloads", "Enable S3 Intelligent Tiering")
4. Generate 3-5 actionable insights that are RECOMMENDATIONS, not summaries. Each insight should tell the customer what to DO, not what they spent.

BAD insight examples (do NOT write these):
- "EC2 accounts for 24% of total spend"
- "Total spend for billing period is $4,771"

GOOD insight examples (write these):
- "EC2 instances appear to be on-demand — switching to 1-year Reserved Instances could save ~30% on compute"
- "Load balancer spend is high relative to compute — consider consolidating to fewer ALBs"
- "CloudWatch costs suggest verbose logging — review log retention policies to cut monitoring spend by ~40%"

SAVINGS OPPORTUNITIES:
For each top service, provide a savingsOpportunity with:
- service: the service name
- currentSpend: current spend amount
- estimatedSavingsPercent: realistic savings percentage (be conservative, 10-40% range typically)
- estimatedSavingsAmount: currentSpend * estimatedSavingsPercent / 100
- action: one specific sentence describing what to do

EXTRACTION RULES:
- Currency must be a 3-letter ISO code (USD, EUR, SGD, etc.)
- topServices: aggregate costs grouped by service, include name, spend, percent
- Percent fields must be numbers between 0-100 relative to totalSpend
- Round monetary values to 2 decimal places

EFFICIENCY SCORE (0-100):
- 90+: excellent commitment coverage, right-sized resources
- 70-89: good but room for optimization
- 50-69: significant savings available
- <50: urgent optimization needed

Return ONLY the following JSON structure:

{
  "score": 0,
  "currency": "USD",
  "totalSpend": 0,
  "billingPeriodStart": "YYYY-MM-DD",
  "billingPeriodEnd": "YYYY-MM-DD",
  "providerDetected": "Other",
  "lineItemCount": 0,
  "topAccountIdentifier": null,
  "topServices": [{"name": "", "spend": 0, "percent": 0}],
  "topRegions": [{"name": "", "spend": 0, "percent": 0}],
  "topLineItems": [{"displayName": "", "service": "", "quantity": 0, "unit": "", "cost": 0}],
  "computeSpendPercent": 0,
  "onDemandPercent": 0,
  "optimizationPotentialMin": 0,
  "optimizationPotentialMax": 0,
  "savingsOpportunities": [
    {"service": "", "currentSpend": 0, "estimatedSavingsPercent": 0, "estimatedSavingsAmount": 0, "action": ""}
  ],
  "insights": []
}

Return ONLY valid JSON. No markdown wrapping. No explanations.
`;

  try {
    const { model } = getGeminiClient();
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() as string | undefined;

    // ChatGPT/OpenAI fallback path (kept commented by request):
    // const client = getOpenAIClient();
    // const response = await client.chat.completions.create({
    //   model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    //   messages: [{ role: "user", content: prompt }],
    //   response_format: { type: "json_object" },
    //   max_tokens: 4096,
    //   temperature: 0.2,
    // });
    // const text = response.choices[0]?.message?.content;

    if (!text) {
      throw new Error("No response from Gemini");
    }

    const cleaned = extractJson(text);
    const parsed = JSON.parse(cleaned) as ParsedInvoiceRaw;

    const totalSpend = Math.max(0, toNumber(parsed.totalSpend));

    const topServices = (parsed.topServices || []).slice(0, 5).map((service) => {
      const spend = Math.max(0, toNumber(service.spend ?? service.cost));
      const inferredPercent = totalSpend > 0 ? (spend / totalSpend) * 100 : 0;
      return {
        name: String(service.name || service.service || "Unknown"),
        spend: Number(spend.toFixed(2)),
        percent: Number(clampPercent(service.percent ?? inferredPercent).toFixed(2)),
      };
    });

    const topRegions = (parsed.topRegions || []).slice(0, 3).map((region) => {
      const spend = Math.max(0, toNumber(region.spend ?? region.cost));
      const inferredPercent = totalSpend > 0 ? (spend / totalSpend) * 100 : 0;
      return {
        name: String(region.name || region.region || "Unknown"),
        spend: Number(spend.toFixed(2)),
        percent: Number(clampPercent(region.percent ?? inferredPercent).toFixed(2)),
      };
    });

    const topLineItems = (parsed.topLineItems || []).slice(0, 5).map((item) => ({
      displayName: String(item.displayName || item.name || "Unknown"),
      service: String(item.service || "Unknown"),
      quantity: Math.max(0, toNumber(item.quantity)),
      unit: String(item.unit || ""),
      cost: Number(Math.max(0, toNumber(item.cost ?? item.spend)).toFixed(2)),
    }));

    const savingsOpportunities = (parsed.savingsOpportunities || []).slice(0, 5).map((opportunity) => {
      const currentSpend = Math.max(0, toNumber(opportunity.currentSpend));
      const estimatedSavingsPercent = clampPercent(opportunity.estimatedSavingsPercent);
      const estimatedSavingsAmount =
        Math.max(0, toNumber(opportunity.estimatedSavingsAmount)) ||
        Number(((currentSpend * estimatedSavingsPercent) / 100).toFixed(2));

      return {
        service: String(opportunity.service || "Unknown"),
        currentSpend: Number(currentSpend.toFixed(2)),
        estimatedSavingsPercent: Number(estimatedSavingsPercent.toFixed(2)),
        estimatedSavingsAmount,
        action: String(opportunity.action || ""),
      };
    });

    const insights = (parsed.insights || [])
      .map((insight) => String(insight || "").trim())
      .filter(Boolean)
      .slice(0, 5);

    return {
      score: Math.round(clampPercent(parsed.score)),
      currency: String(parsed.currency || "USD"),
      totalSpend: Number(totalSpend.toFixed(2)),
      billingPeriodStart: normalizeDate(parsed.billingPeriodStart, today),
      billingPeriodEnd: normalizeDate(parsed.billingPeriodEnd, today),
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
  } catch (error) {
    console.error("Gemini invoice parsing error:", error);
    throw new Error("Failed to parse invoice: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}

//dummy text for re-commit