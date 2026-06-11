/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build output goes to a gitignored dir (NOT the default ".next"). The
  // platform checkpoint/rollback system was capturing the tracked ".next"
  // folder and restoring stale build chunks under the running dev server,
  // causing recurring crashes (__webpack_modules__[moduleId] is not a
  // function / Cannot find module './331.js'). Writing to ".next-build"
  // keeps the live build output out of version control entirely.
  distDir: ".next-build",
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  allowedDevOrigins: ["*.replit.dev", "*.repl.co", "*.kirk.replit.dev"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Disable the Next dev "Segment Explorer" devtool. Its RSC client
    // manifest gets corrupted during repeated HMR edits, causing recurring
    // dev-server crashes (segment-explorer-node.js#SegmentViewNode not found).
    devtoolSegmentExplorer: false,
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/platform", destination: "/platform/finops", permanent: true },
      { source: "/signin", destination: "https://id.cloudverse.ai", permanent: false, basePath: false },
      { source: "/demo", destination: "/connect", permanent: false },
    ];
  },
};

export default nextConfig;
