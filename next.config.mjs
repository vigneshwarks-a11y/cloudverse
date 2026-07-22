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
    ];
  },
};

export default nextConfig;
