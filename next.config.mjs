/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build output goes to a gitignored dir (NOT the default ".next") to keep
  // the live build output out of version control entirely.
  distDir: ".next-build",
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
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
