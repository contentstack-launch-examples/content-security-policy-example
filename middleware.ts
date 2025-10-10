import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Generate a cryptographically secure nonce
  let nonce: string;
  try {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    nonce = btoa(String.fromCharCode(...array));
  } catch (error) {
    // Fallback for edge runtime compatibility
    nonce =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  console.log("Middleware running with nonce:", nonce);

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

  // Also add it to request headers for getServerSideProps access
  request.headers.set("X-Nonce", nonce);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
