# Content-Security-Policy 
## Overview

A Next.js application demonstrating how to properly configure Content Security Policy (CSP) headers with Cloudflare's email protection feature.
This example addresses a common issue where strict CSP policies block Cloudflare's email protection scripts, causing email links to break. The exact error occurs when using `'strict-dynamic'` directive with nonce-based CSP declarations - Cloudflare's email protection scripts get blocked because they're not explicitly allowed from `https://challenges.cloudflare.com`. This results in CSP violation errors in the browser console and non-functional email links.

## Project Structure

```
├── src/
│   ├── pages/
│   │   ├── index.tsx          # Working example with proper CSP
│   ├── middleware.ts         # CSP header generation and nonce handling
├── functions/
│   └── [proxy].edge.js       # Edge function for nonce injection
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Key Files

| File                        | Purpose                                                |
| --------------------------- | ------------------------------------------------------ |
| `src/middleware.ts`         | Generates dynamic nonces and sets CSP headers          |
| `functions/[proxy].edge.js` | Edge function for nonce injection into dynamic scripts |

### Middleware (`src/middleware.ts`)

Generates dynamic nonces using Web Crypto API and sets CSP headers for each request. The middleware creates nonce-based CSP policies that include `'strict-dynamic'` directive and handles the security headers for the application.

### Edge Function (`functions/[proxy].edge.js`)

Processes HTML responses to inject nonces into dynamically created scripts. It extracts nonces from CSP headers and ensures all script elements have proper nonce attributes, enabling them to execute under strict CSP policies.

## Reference

- [Cloudflare CSP Documentation](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/)
- [Cloudflare CSP Documentation](https://developers.cloudflare.com/turnstile/reference/content-security-policy/)
- [Next.js CSP Implementation](https://nextjs.org/docs/app/guides/content-security-policy)
- [Launch's Edge Function](https://www.contentstack.com/docs/developers/launch/edge-functions)