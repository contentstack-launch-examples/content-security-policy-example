import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Handle mock Cloudflare email protection endpoint
  if (request.nextUrl.pathname.startsWith("/cdn-cgi/l/email-protection")) {
    // Mock email protection response - redirect to decoded email
    const url = new URL(request.url);
    const hash = url.hash.substring(1); // Remove the # symbol

    // Simple email decoding (this is a basic mock)
    let decodedEmail = "";
    if (hash) {
      // Convert hex to email (simplified mock)
      try {
        const bytes = [];
        for (let i = 0; i < hash.length; i += 2) {
          bytes.push(parseInt(hash.substr(i, 2), 16));
        }
        decodedEmail = String.fromCharCode(...bytes);
      } catch (e) {
        decodedEmail = "test@example.com";
      }
    }

    return new Response(`Email: ${decodedEmail}`, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  // Handle mock email-decode script endpoint
  if (request.nextUrl.pathname.startsWith("/cdn-cgi/scripts/")) {
    // Mock email-decode script
    const mockScript = `
      // Mock Cloudflare email protection script
      (function() {
        console.log('Mock email protection script loaded');
        // This script would normally decode email addresses
        // but we're just mocking it for CSP testing
      })();
    `;

    return new Response(mockScript, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  }

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
  requestHeaders.set("x-nonce-header", nonce);

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
