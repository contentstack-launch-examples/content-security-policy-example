import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export function middleware(request: NextRequest) {
  // Generate a unique nonce for this request
  const nonce = createHash("sha256")
    .update(Math.random().toString() + Date.now().toString())
    .digest("base64");

  // Create the CSP header with nonce and strict-dynamic
  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://cdn-cgi.com`,
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

// No config needed - middleware applies to all routes by default
