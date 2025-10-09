# CSP + Cloudflare Email Protection Issue Reproduction

This Next.js project reproduces the Content Security Policy (CSP) issue with Cloudflare's email protection feature, as described in the support query.

## Issue Description

The issue occurs when using:

- Nonce-based CSP declarations
- `strict-dynamic` directive
- Cloudflare's email protection feature

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

1. **CSP Console Error**: The browser console will show an error like:

   ```
   Refused to load the script 'https://dev.bibbyfinancialservices.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js'
   because it violates the following Content Security Policy directive: "script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-...'".
   Note that 'strict-dynamic' is present, so host-based allowlisting is disabled.
   ```

2. **Broken Email Links**: The mailto links on the page will not work properly because Cloudflare's email protection script is blocked.

## Technical Implementation

### CSP Headers

The custom server (`server.js`) sets strict CSP headers matching the exact configuration from the support query:

- Uses `script-src-elem` directive with `'unsafe-inline'`, `'strict-dynamic'`, `https:`, `http:`, `'unsafe-eval'`, and nonce
- Includes both `script-src-elem` and `script-src` directives
- The `strict-dynamic` directive disables host-based allowlisting
- Blocks external scripts that don't have the correct nonce

### Cloudflare Email Protection

- Includes Cloudflare's email protection script in the page head
- Creates multiple mailto links that would normally be protected
- The script fails to load due to CSP restrictions

## Files Modified

- `server.js` - Custom server with CSP headers
- `src/pages/index.tsx` - Main page with email protection and mailto links
- `package.json` - Updated scripts to use custom server

## Reproduction Steps

1. Start the development server
2. Open browser developer tools (F12)
3. Navigate to the Console tab
4. Visit the page
5. Observe the CSP error in the console
6. Try clicking the email links - they should be broken

This reproduces the exact issue described in the support query where Cloudflare's email protection fails to work with strict CSP policies using nonces and `strict-dynamic`.
