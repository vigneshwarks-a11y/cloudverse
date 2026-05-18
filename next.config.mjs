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
      { source: "/solutions", destination: "/solutions/enterprise", permanent: true },
    ];
  },
};

export default nextConfig;
