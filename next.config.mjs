/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.replit.dev", "*.repl.co", "*.kirk.replit.dev"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
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
