import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        // Working CSP for main page
        source: "/",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self'`,
              `script-src 'self' 'strict-dynamic' https://challenges.cloudflare.com`,
              `style-src 'self' 'unsafe-inline'`,
              `img-src 'self' data: https:`,
              `font-src 'self'`,
              `connect-src 'self' https://challenges.cloudflare.com`,
              `frame-ancestors 'none'`,
              `base-uri 'self'`,
              `form-action 'self'`,
            ].join("; "),
          },
        ],
      },
      {
        // Working CSP for solution page
        source: "/solution",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self'`,
              `script-src 'self' 'strict-dynamic' https://challenges.cloudflare.com`,
              `style-src 'self' 'unsafe-inline'`,
              `img-src 'self' data: https:`,
              `font-src 'self'`,
              `connect-src 'self' https://challenges.cloudflare.com`,
              `frame-ancestors 'none'`,
              `base-uri 'self'`,
              `form-action 'self'`,
            ].join("; "),
          },
        ],
      },
      {
        // Problematic CSP for problematic page
        source: "/problematic",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self'`,
              `script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-test123'`,
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
