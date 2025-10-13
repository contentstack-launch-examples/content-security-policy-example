import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate nonce using Web Crypto API
  const nonce = btoa(Math.random().toString() + Date.now().toString()).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );

  // CSP header 
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
