// functions/[proxy].edge.js
export default async function handler(request, context) {
  try {
    const { proxy } = context.params;

    // Only handle email-protection script request
    if (proxy !== "email-protection") {
      return new Response("// Unknown script", { status: 404 });
    }

    // Generate a web-safe nonce per request
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const nonce = Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Return a small HTML/JS snippet that sets the nonce and loads Cloudflare's script
    const html = `
      <script nonce="${nonce}">
        window.CF_EMAIL_PROTECTION_NONCE = "${nonce}";
      </script>
      <script src="https://static.cloudflareinsights.com/email-protection.js" async nonce="${nonce}"></script>
    `;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response("// Error loading email protection script", {
      status: 500,
      headers: {
        "Content-Type": "text/html",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
}
