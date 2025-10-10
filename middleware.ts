import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate a cryptographically secure nonce
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));

  // Create response
  const response = NextResponse.next();

  // Set CSP header with dynamic nonce
  response.headers.set(
    "Content-Security-Policy",
    [
      `default-src 'self'`,
      `script-src 'nonce-${nonce}' 'strict-dynamic'`,
      `style-src 'self' 'unsafe-inline'`,
      `img-src 'self' data: https:`,
      `font-src 'self'`,
      `connect-src 'self'`,
      `frame-ancestors 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
    ].join("; ")
  );

  // Add nonce to response headers so pages can access it
  response.headers.set("X-Nonce", nonce);

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
