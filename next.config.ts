import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // CSP headers are now handled by middleware for dynamic nonce generation
};

export default nextConfig;
