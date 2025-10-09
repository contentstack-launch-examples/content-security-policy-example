# CSP + Cloudflare Email Protection - Launch Edge Function Solution

This Next.js project implements a Launch edge function solution for Cloudflare's email protection feature with strict-dynamic CSP, as described in the support query.

## Issue Description

The issue occurs when using:

- Nonce-based CSP declarations
- `strict-dynamic` directive
- Cloudflare's email protection feature (enabled)

According to Cloudflare's documentation, they should automatically pick up nonces and attach them to their scripts, but this fails in practice, causing their email protection script to be blocked by CSP.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Expected Behavior

When you open the page, you should see:

1. **No CSP Errors**: With the Launch edge function solution, the browser should NOT generate CSP errors blocking the Cloudflare script.

2. **Working Email Links**: The mailto links on the page should work properly because Cloudflare's email protection script is now proxied through our edge function with proper nonce.

## Technical Implementation

### CSP Headers

The Next.js configuration (`next.config.ts`) sets CSP headers with strict-dynamic:

- Uses `script-src-elem` directive with `'unsafe-inline'`, `'strict-dynamic'`, `https:`, `http:`, `'unsafe-eval'`, and nonce
- Includes both `script-src-elem` and `script-src` directives
- The `strict-dynamic` directive is maintained for security (as required by customer)
- Scripts are served through Launch edge function with proper nonce

### Launch Edge Function Solution

- **Edge Function**: `functions/[proxy].edge.js` proxies the Cloudflare email protection script
- **Script Source**: Changed from direct Cloudflare URL to `/functions/proxy`
- **Nonce Support**: Edge function serves script with proper nonce for CSP compliance
- **Maintains Security**: Keeps `strict-dynamic` while allowing the script to load

## Files Modified

- `next.config.ts` - CSP headers configuration for Launch deployment
- `src/pages/index.tsx` - Main page with email protection and mailto links
- `server.js` - Custom server with CSP headers (for local testing)
- `package.json` - Updated scripts to use custom server

## Reproduction Steps

### Local Testing (with custom server)

1. Start the development server: `npm run dev`
2. Open browser developer tools (F12)
3. Navigate to the Console tab
4. Visit http://localhost:3000
5. Observe the CSP error in the console
6. Try clicking the email links - they should be broken

### Launch Deployment Testing

1. Deploy to Contentstack Launch
2. Open browser developer tools (F12)
3. Navigate to the Console tab
4. Visit the deployed URL
5. Observe the CSP error in the console
6. Try clicking the email links - they should be broken

**Note**: The CSP headers are configured in `next.config.ts` for Launch deployment, while `server.js` is used for local testing.

This reproduces the exact issue described in the support query where Cloudflare's email protection fails to work with strict CSP policies using nonces and `strict-dynamic`.
