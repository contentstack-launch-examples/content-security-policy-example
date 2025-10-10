import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
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
    ];
  },
};

export default nextConfig;
