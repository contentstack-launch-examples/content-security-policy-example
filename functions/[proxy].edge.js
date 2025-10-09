// Launch Edge Function to proxy Cloudflare email protection script
// This allows us to serve the script from our own domain with proper nonce
// while maintaining strict-dynamic CSP security

export default async function handler(request) {
  try {
    // Get the nonce from the request headers or use default
    const nonce = request.headers.get("x-nonce") || "test123";

    // Simple test script to verify edge function is working
    const scriptContent = `console.log('Edge function working! Email protection script loaded via Launch edge function.');`;

    // Return the script with proper headers
    return new Response(scriptContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "X-Nonce": nonce,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response("// Error loading email protection script", {
      status: 500,
      headers: {
        "Content-Type": "application/javascript",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
}
