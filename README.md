# CSP + Cloudflare Email Protection Test

This project demonstrates the proper configuration of Content Security Policy (CSP) headers with Cloudflare's email protection feature using nonce-based CSP declarations.

## The Problem

When using Cloudflare's email protection with strict CSP policies that include `'strict-dynamic'` and nonce-based declarations, the email protection scripts can be blocked, causing "mailto" links to break.

## The Solution

This project shows two scenarios:

1. **Working Configuration** (`/`) - Properly configured CSP that allows Cloudflare email protection
2. **Problematic Configuration** (`/problematic`) - CSP that blocks Cloudflare email protection
3. **Solution Page** (`/solution`) - Shows the exact fix needed

## Key CSP Configuration

### Working Configuration

```javascript
script-src 'self' 'strict-dynamic' https://challenges.cloudflare.com
```

### Problematic Configuration

```javascript
script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-AueJwNry5qMrTymYNUWFtg=='
// Missing: https://challenges.cloudflare.com
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to see the working example
4. Visit [http://localhost:3000/problematic](http://localhost:3000/problematic) to see the broken example
5. Visit [http://localhost:3000/solution](http://localhost:3000/solution) to see the fix

## Testing Instructions

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for CSP violation errors
4. Click on email links to test functionality
5. Check Network tab for blocked requests to `/cdn-cgi/l/email-protection`

## Files Structure

- `src/pages/index.tsx` - Working example with proper CSP
- `src/pages/problematic.tsx` - Broken example showing the issue
- `src/pages/solution.tsx` - Shows the exact fix
- `middleware.ts` - Generates nonces and sets CSP headers
- `next.config.ts` - Base CSP configuration

## Cloudflare Email Protection

The project uses Cloudflare's actual email protection feature with:

- Proper `data-cfemail` attributes
- `/cdn-cgi/l/email-protection` URLs
- Nonce-based CSP integration

## CSP Headers

The middleware generates dynamic nonces and sets CSP headers that include:

- `'strict-dynamic'` directive
- `https://challenges.cloudflare.com` in script-src
- Nonce-based script execution

## Customer Issue Resolution

This project addresses the Bibby Financial Services support query by demonstrating:

1. **The Problem**: CSP blocking Cloudflare email protection scripts
2. **The Solution**: Use proper CSP configuration with Cloudflare domains
3. **Testing**: Both working and broken scenarios for comparison

### The Exact Fix for Bibby Financial Services:

**BROKEN CSP:**

```
script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-AueJwNry5qMrTymYNUWFtg=='
```

**FIXED CSP:**

```
script-src 'self' 'strict-dynamic' https://challenges.cloudflare.com
```

**Change:** Use proper CSP configuration with `https://challenges.cloudflare.com` instead of relying on nonce-based approach.

### Why This Works:

- When `'strict-dynamic'` is present, the browser ignores `https:` and `http:` directives
- Cloudflare's email protection scripts need to be explicitly allowed from `https://challenges.cloudflare.com`
- This approach is more reliable than trying to use nonces with Cloudflare's automatically injected scripts
- This maintains security while allowing email protection to function properly

## Build

The project builds successfully with:

```bash
npm run build
```

All linting errors have been resolved and the project is production-ready.
