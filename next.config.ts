import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply CSP headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self'`,
              `script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-test123' 'sha256-JZVJb+SN9vz5sbxXwpp0TBIetN0RVmRmvBPS5S5rvMg='`,
              `script-src 'self' 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-test123' 'sha256-JZVJb+SN9vz5sbxXwpp0TBIetN0RVmRmvBPS5S5rvMg='`,
              `style-src 'self' 'unsafe-inline'`,
              `img-src 'self' data: https:`,
              `font-src 'self'`,
              `connect-src 'self'`,
              `frame-ancestors 'none'`,
              `base-uri 'self'`,
              `form-action 'self'`,
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
