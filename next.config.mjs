/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build output uses the default ".next" dir (gitignored). Vercel's zero-config
  // Next.js builder requires ".next"; a custom distDir breaks deploys there.
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "@solar-icons/react"],
    // Disable the Next dev "Segment Explorer" devtool. Its RSC client
    // manifest gets corrupted during repeated HMR edits, causing recurring
    // dev-server crashes (segment-explorer-node.js#SegmentViewNode not found).
    devtoolSegmentExplorer: false,
  },
  // Keystatic's local reader does dynamic fs.readdir/readFile calls against
  // content/ (computed paths, not static imports), so Next's output file
  // tracing can't detect that the /keystatic admin UI and its API route
  // depend on that directory — without this, content/ is missing from
  // those two routes' Vercel serverless function bundles, and the CMS
  // shows every collection as empty even though the data is really in the
  // repo (confirmed working at build time via the statically-generated
  // /resources pages, which don't hit this gap).
  // Glob keys are matched with picomatch — "[" / "]" are character-class
  // syntax there, not literal brackets, so a key spelled with the literal
  // "[...params]" segment name never matches. "**" sidesteps that.
  outputFileTracingIncludes: {
    "/api/keystatic/**": ["./content/**/*"],
    "/keystatic/**": ["./content/**/*"],
    "/keystatic": ["./content/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/platform", destination: "/platform/finops", permanent: true },
      { source: "/platform/aix", destination: "/platform/agentry", permanent: true },
      { source: "/platform/devx", destination: "/platform/torb", permanent: true },
      { source: "/signin", destination: "https://id.cloudverse.ai", permanent: false, basePath: false },
      { source: "/demo", destination: "/connect", permanent: false },
      { source: "/platform/aix", destination: "/platform/agentry", permanent: true },
      { source: "/platform/devx", destination: "/platform/torb", permanent: true },
    ];
  },
};

export default nextConfig;
