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
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Key Files

| File                        | Purpose                                                |
| --------------------------- | ------------------------------------------------------ |
| `src/middleware.ts`         | Generates dynamic nonces and sets CSP headers          |

### Middleware (`src/middleware.ts`)

Generates dynamic nonces and sets comprehensive CSP headers with external resource support (https: http:). Includes additional security headers and uses template literals for proper nonce interpolation. Supports 'unsafe-inline', 'strict-dynamic', and nonce-based script execution for Next.js compatibility.

## Reference

- [Cloudflare CSP Documentation](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/)
- [Cloudflare CSP Documentation](https://developers.cloudflare.com/turnstile/reference/content-security-policy/)
- [Next.js CSP Implementation](https://nextjs.org/docs/app/guides/content-security-policy)
