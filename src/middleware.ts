import { NextRequest, NextResponse } from "next/server";

// Generate nonce
async function generateNonce(): Promise<string> {
  return btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16)))
  );
}

async function setSecurityHeaders(response: NextResponse): Promise<void> {
  const nonce = await generateNonce();

  const cspDirectives = {
    "default-src": "'self'",
    "script-src": `'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-${nonce}'`,
    "script-src-elem": `'self' 'unsafe-inline' 'strict-dynamic' https: http: 'nonce-${nonce}'`,
    "style-src": "'self' 'unsafe-inline' https:",
    "img-src": "'self' blob: data: https:",
    "font-src": "'self' data: https:",
    "connect-src": "'self' https: http:",
    "frame-src": "'self' https://www.youtube.com/ https://player.vimeo.com",
    "frame-ancestors": "'self'",
    "object-src": "'none'",
    "base-uri": "'self'",
    "form-action": "'self'",
    "upgrade-insecure-requests": "",
  };

  // Build CSP header
  const cspHeader = Object.entries(cspDirectives)
    .map(([key, value]) => (value ? `${key} ${value}` : key))
    .join(";")
    .replace(/\s+/g, " ")
    .trim();

  // Security headers
  const securityHeaders = {
    "Content-Security-Policy": cspHeader,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Nonce": nonce, 
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), autoplay=*, fullscreen=*",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  };

  // Apply headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set comprehensive security headers
  await setSecurityHeaders(response);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
