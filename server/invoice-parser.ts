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
You are an expert cloud invoice analyzer and cloud economics advisor.
Analyze the invoice text and return ONLY valid JSON in the exact schema below.

File name: ${fileName}

Invoice content:
${fileContent.substring(0, 50000)}

Rules:
- Detect provider if explicit evidence exists, otherwise set providerDetected to "Other".
- Extract top services, top regions, and top line items from cost-bearing rows.
- Keep percentages in 0-100 and relative to totalSpend.
- Create 3-5 actionable insights (recommendations), not spend summaries.
- Create savingsOpportunities for top services with realistic savings percentages.
- Use 3-letter currency code when available.

Return exactly this JSON shape:
{
  "score": 0,
  "currency": "USD",
  "totalSpend": 0,
  "billingPeriodStart": "YYYY-MM-DD",
  "billingPeriodEnd": "YYYY-MM-DD",
  "providerDetected": "Other",
  "lineItemCount": 0,
  "topAccountIdentifier": "",
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
