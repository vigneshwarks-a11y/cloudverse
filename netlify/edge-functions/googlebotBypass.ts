import type { Context } from "@netlify/edge-functions";

const GOOGLE_CRAWLER_TOKENS = [
  "adsbot-google",
  "googlebot",
  "apis-google",
  "mediapartners-google",
] as const;

function isGoogleCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return GOOGLE_CRAWLER_TOKENS.some((token) => ua.includes(token));
}

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (isGoogleCrawler(userAgent)) {
    // Bots: bypass redirect/personalization edge logic by ending the edge chain here.
    return context.next();
  }

  // Humans: let the request continue through the rest of the edge-function chain.
  return;
};
