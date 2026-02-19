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
): Promise<Response | void> {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (isGoogleCrawler(userAgent)) {
    // Bots: continue via explicit next() response handling.
    return context.next();
  }

  // Humans: keep flowing through the request chain.
  return;
}
