import OpenAI from "openai";

export interface TopService {
  name: string;
  spend: number;
  percent: number;
}

export interface TopRegion {
  name: string;
  spend: number;
  percent: number;
}

export interface TopLineItem {
  displayName: string;
  service: string;
  quantity?: number;
  unit?: string;
  cost: number;
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
  topServices: TopService[];
  topRegions: TopRegion[];
  topLineItems: TopLineItem[];
  computeSpendPercent: number;
  onDemandPercent: number;
  optimizationPotentialMin: number;
  optimizationPotentialMax: number;
  insights: string[];
}

function getOpenAIClient(): OpenAI {
  if (process.env.OPENAI_API_KEY) {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY.");
}

function extractJson(text: string): string {
  // Remove ```json ... ``` or ``` ... ```
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) {
    return fenced[1];
  }

  // Fallback: attempt to find first { ... }
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    return text.slice(firstBrace, lastBrace + 1);
  }

  return text;
}


export async function parseInvoice(
  fileContent: string,
  fileName: string
): Promise<InvoiceAnalysisResult> {
  const prompt = `
You are an expert cloud invoice analyzer. Analyze the following cloud invoice data and extract key information accurately.

File name: ${fileName}

Invoice content:
${fileContent.substring(0, 50000)}

IMPORTANT EXTRACTION & DERIVATION RULES:
•⁠  ⁠Extract all cost-bearing line items first
•⁠  ⁠topServices MUST be derived by aggregating costs from topLineItems grouped by service
•⁠  ⁠topRegions MUST be derived by aggregating costs from topLineItems grouped by region
•⁠  ⁠If a region is not explicitly mentioned, use "Unknown"
•⁠  ⁠Quantity and unit SHOULD be extracted from usage text such as:
  - "720 Hours"
  - "1,200 GB-Month"
  - "210 GB"
•⁠  ⁠If usage text exists, do NOT leave quantity or unit empty
•⁠  ⁠Do not leave topServices, topRegions, or topLineItems empty if any costs are present

DATA RULES:
•⁠  ⁠Currency must be a 3-letter ISO code (USD, EUR, INR, etc.)
•⁠  ⁠Percent fields must be numbers between 0–100
•⁠  ⁠Percentages are relative to totalSpend
•⁠  ⁠Percent values may be approximate but must be reasonable
•⁠  ⁠Round monetary values to 2 decimal places

PROVIDER DETECTION:
•⁠  ⁠Detect provider ONLY if explicit indicators exist
  (e.g., "Amazon Web Services", "EC2", "Azure Subscription", "GCP Project")
•⁠  ⁠If unclear, set providerDetected to "Other"

EFFICIENCY SCORE (0–100):
Estimate based on:
•⁠  ⁠High on-demand compute usage → lower score
•⁠  ⁠High compute concentration → lower score
•⁠  ⁠Presence of optimization opportunities → lower score
•⁠  ⁠Reserved/committed usage → higher score
Use informed judgment, not random values.

If a value truly cannot be determined:
•⁠  ⁠Use null for strings
•⁠  ⁠Use 0 for numbers
•⁠  ⁠Use [] for arrays

Extract and return ONLY the following JSON structure:
{
  "score": 0,
  "currency": null,
  "totalSpend": 0,
  "billingPeriodStart": null,
  "billingPeriodEnd": null,
  "providerDetected": "Other",
  "lineItemCount": 0,
  "topAccountIdentifier": null,
  "topServices": [],
  "topRegions": [],
  "topLineItems": [{
    "displayName": null,
    "service": null,
    "quantity": 0,
    "unit": null,
    "cost": 0
  }],
  "computeSpendPercent": 0,
  "onDemandPercent": 0,
  "optimizationPotentialMin": 0,
  "optimizationPotentialMax": 0,
  "insights": []
}

Return ONLY valid JSON.
Do not wrap the response in markdown.
Do not add explanations or extra text.
`;

  try {
    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 4096,
      temperature: 0,
    });

    const text = response.choices[0]?.message?.content;

    if (!text) {
      throw new Error("No response from AI");
    }

    const cleaned = extractJson(text);
    const parsed = JSON.parse(cleaned) as InvoiceAnalysisResult;

    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score))),
      currency: parsed.currency || "USD",
      totalSpend: parsed.totalSpend || 0,
      billingPeriodStart:
        parsed.billingPeriodStart ||
        new Date().toISOString().split("T")[0],
      billingPeriodEnd:
        parsed.billingPeriodEnd ||
        new Date().toISOString().split("T")[0],
      providerDetected: parsed.providerDetected || "Unknown",
      lineItemCount: parsed.lineItemCount || 0,
      topAccountIdentifier: parsed.topAccountIdentifier,
      topServices: (parsed.topServices || []).slice(0, 3).map((s: any) => {
        const totalSpend = parsed.totalSpend || 1;
        const spend = s.spend ?? s.cost ?? 0;
        const percent = s.percent ?? (totalSpend > 0 ? (spend / totalSpend) * 100 : 0);
        return { name: s.name || s.service || "Unknown", spend, percent };
      }),
      topRegions: (parsed.topRegions || []).slice(0, 3).map((r: any) => {
        const totalSpend = parsed.totalSpend || 1;
        const spend = r.spend ?? r.cost ?? 0;
        const percent = r.percent ?? (totalSpend > 0 ? (spend / totalSpend) * 100 : 0);
        return { name: r.name || r.region || "Unknown", spend, percent };
      }),
      topLineItems: (parsed.topLineItems || []).slice(0, 5),
      computeSpendPercent: parsed.computeSpendPercent || 0,
      onDemandPercent: parsed.onDemandPercent || 0,
      optimizationPotentialMin: parsed.optimizationPotentialMin || 0,
      optimizationPotentialMax: parsed.optimizationPotentialMax || 0,
      insights: (parsed.insights || []).slice(0, 5),
    };
  } catch (error) {
    console.error("Invoice parsing error:", error);
    throw new Error(
      "Failed to parse invoice: " +
      (error instanceof Error ? error.message : "Unknown error")
    );
  }
}
