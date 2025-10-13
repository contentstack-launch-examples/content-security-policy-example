import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate a unique nonce for this request using Web Crypto API
  const nonce = btoa(Math.random().toString() + Date.now().toString()).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );

  // Create the CSP header with nonce and strict-dynamic (matching Bibby Finance format exactly)
  const cspHeader = [
    "default-src 'self'",
    `script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  // Clone the request headers and add the nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  // Create the response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add the CSP header to the response
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}
