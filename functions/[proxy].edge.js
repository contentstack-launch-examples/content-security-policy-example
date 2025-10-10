export default async function handler(request, context) {
  try {
    const response = await context.next();

    // Only process HTML responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();

    // Generate random nonce
    const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Inject nonce into script tags that don't already have one
    html = html.replace(/<script(?!.*nonce=)/g, `<script nonce="${nonce}"`);

    // Update CSP header
    const originalCSP = response.headers.get("Content-Security-Policy") || "";
    let updatedCSP = originalCSP;

    if (/script-src/.test(originalCSP)) {
      updatedCSP = originalCSP.replace(
        /script-src([^;]*)/,
        (match, p1) => `script-src${p1} 'nonce-${nonce}'`
      );
    } else {
      updatedCSP += `; script-src 'self' 'nonce-${nonce}'`;
    }

    // Create new response with updated headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Content-Security-Policy", updatedCSP);

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    console.error("Edge function error:", error);
    // Return original response if edge function fails
    return context.next();
  }
}
