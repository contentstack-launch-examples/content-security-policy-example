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
              `script-src-elem 'unsafe-inline' https: http: 'unsafe-eval' 'nonce-test123' 'self'`,
              `script-src 'self' 'unsafe-inline' https: http: 'unsafe-eval' 'nonce-test123'`,
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
