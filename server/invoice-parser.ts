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
  topServices: TopService[];
  topRegions: TopRegion[];
  topLineItems: TopLineItem[];
  computeSpendPercent: number;
  onDemandPercent: number;
  optimizationPotentialMin: number;
  optimizationPotentialMax: number;
  savingsOpportunities: SavingsOpportunity[];
  insights: string[];
}

function getOpenAIClient(): OpenAI {
  if (process.env.OPENAI_API_KEY) {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY.");
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) {
    return fenced[1];
  }
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
    const parsed = JSON.parse(cleaned) as any;

    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score || 0))),
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
      topServices: (parsed.topServices || []).slice(0, 5).map((s: any) => {
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
      savingsOpportunities: (parsed.savingsOpportunities || []).slice(0, 5).map((o: any) => ({
        service: o.service || "Unknown",
        currentSpend: o.currentSpend || 0,
        estimatedSavingsPercent: o.estimatedSavingsPercent || 0,
        estimatedSavingsAmount: o.estimatedSavingsAmount || 0,
        action: o.action || "",
      })),
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
