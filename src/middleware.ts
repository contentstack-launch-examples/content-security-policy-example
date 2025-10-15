import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate unique nonce for this request using Web Crypto API
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16)))
  );

  // Create CSP with dynamic nonce
  const csp = [
    "default-src 'self'",
    `script-src-elem 'self' 'unsafe-inline' 'strict-dynamic' 'unsafe-eval' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  // Set CSP header with dynamic nonce
  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", csp);

  // Store nonce in request headers for _document.tsx to use
  request.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
