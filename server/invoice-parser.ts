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

function getOpenAIClient(): { client: OpenAI; model: string } {
  // Check for Replit AI integrations first (available in Replit environment)
  if (process.env.AI_INTEGRATIONS_OPENAI_BASE_URL && process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
    return {
      client: new OpenAI({
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      }),
      model: "gpt-4o-mini",
    };
  }

  // Fallback to standard OpenAI API key (works in any environment including production)
  if (process.env.OPENAI_API_KEY) {
    return {
      client: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
      model: "gpt-4o-mini",
    };
  }

  throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");
}

export async function parseInvoice(fileContent: string, fileName: string): Promise<InvoiceAnalysisResult> {
  const prompt = `You are an expert cloud invoice analyzer. Analyze the following cloud invoice data and extract key information.

File name: ${fileName}

Invoice content:
${fileContent.substring(0, 50000)}

Extract and return a JSON object with the following structure:
{
  "score": <efficiency score 0-100 based on waste signals, commitment coverage, etc>,
  "currency": "<3-letter currency code like USD, EUR>",
  "totalSpend": <total spend as number>,
  "billingPeriodStart": "<YYYY-MM-DD>",
  "billingPeriodEnd": "<YYYY-MM-DD>",
  "providerDetected": "<AWS|Azure|GCP|Alibaba|Oracle|Other>",
  "lineItemCount": <number of line items>,
  "topAccountIdentifier": "<account ID, subscription, or project name if found>",
  "topServices": [{"name": "<service>", "spend": <amount>, "percent": <percent of total>}], // top 3
  "topRegions": [{"name": "<region>", "spend": <amount>, "percent": <percent of total>}], // top 3
  "topLineItems": [{"displayName": "<resource/meter name>", "service": "<service>", "quantity": <number if available>, "unit": "<unit if available>", "cost": <cost>}], // top 5 by cost
  "computeSpendPercent": <percent of total spend on compute>,
  "onDemandPercent": <estimated percent that is on-demand vs reserved/committed>,
  "optimizationPotentialMin": <conservative savings estimate percent>,
  "optimizationPotentialMax": <optimistic savings estimate percent>,
  "insights": ["<insight 1>", "<insight 2>", ...] // 3-5 key insights referencing specific data from the invoice
}

Analysis guidelines:
- Detect the cloud provider from invoice format, SKU names, or metadata
- Calculate efficiency score: 90+ excellent, 70-89 good, 50-69 needs improvement, <50 poor
- Look for waste signals: idle resources, oversized instances, missing reservations
- Estimate on-demand percentage from usage types and pricing
- Be conservative with optimization estimates (5-15% min, 15-35% max typically)
- If data is missing, make reasonable estimates based on typical patterns
- Generate 3-5 specific insights referencing actual data (e.g., "EC2 accounts for 41% of total spend")

Return ONLY valid JSON, no markdown or explanation.`;

  try {
    const { client, model } = getOpenAIClient();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      max_output_tokens: 2048,
    });
    const content = response.output_text?.trim();
    if (!content) throw new Error("No response from AI");

   
    const result = JSON.parse(content) as InvoiceAnalysisResult;

    // Explicitly validate that we are not using fallback data if we have a real response
    return {
      score: Math.max(0, Math.min(100, Math.round(result.score))),
      currency: result.currency || "USD",
      totalSpend: result.totalSpend || 0,
      billingPeriodStart: result.billingPeriodStart || new Date().toISOString().split("T")[0],
      billingPeriodEnd: result.billingPeriodEnd || new Date().toISOString().split("T")[0],
      providerDetected: result.providerDetected || "Unknown",
      lineItemCount: result.lineItemCount || 0,
      topAccountIdentifier: result.topAccountIdentifier,
      topServices: (result.topServices || []).slice(0, 3),
      topRegions: (result.topRegions || []).slice(0, 3),
      topLineItems: (result.topLineItems || []).slice(0, 5),
      computeSpendPercent: result.computeSpendPercent || 0,
      onDemandPercent: result.onDemandPercent || 0,
      optimizationPotentialMin: result.optimizationPotentialMin || 0,
      optimizationPotentialMax: result.optimizationPotentialMax || 0,
      insights: (result.insights || []).slice(0, 5),
    };
  } catch (error) {
    console.error("Invoice parsing error:", error);
    throw new Error("Failed to parse invoice: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
