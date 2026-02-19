type EdgeContext = {
  next: () => Response | Promise<Response>;
};

const GOOGLE_CRAWLER_TOKENS = [
  "adsbot-google",
  "googlebot",
  "apis-google",
  "mediapartners-google",
] as const;

function isGoogleCrawler(userAgent: string): boolean {
  const normalizedUserAgent = userAgent.toLowerCase();
  return GOOGLE_CRAWLER_TOKENS.some((token) =>
    normalizedUserAgent.includes(token),
  );
}

export default async function googlebotBypass(
  request: Request,
  context: EdgeContext,
): Promise<Response> {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (isGoogleCrawler(userAgent)) {
    // Bypass landing-page redirect/personalization logic for Google crawlers.
    return context.next();
  }

  // Keep existing human redirect behavior untouched.
  return context.next();
}
