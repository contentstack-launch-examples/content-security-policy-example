// Launch Edge Function - functions/email-protection.edge.js
export default async function handler(request) {
  try {
    // Use a simple nonce for testing
    const nonce = "test123";

    // Return JavaScript content that simulates Cloudflare email protection
    const scriptContent = `
      // Simulate Cloudflare email protection script
      console.log('Edge function loaded with nonce:', '${nonce}');
      window.CF_EMAIL_PROTECTION_NONCE = "${nonce}";
      
      // Simulate email protection functionality
      function decodeEmail(encodedEmail) {
        // Simple simulation - in real Cloudflare script this would decode the email
        console.log('Email protection would decode:', encodedEmail);
        return encodedEmail;
      }
      
      // Initialize email protection
      document.addEventListener('DOMContentLoaded', function() {
        console.log('Cloudflare email protection initialized');
        const mailtoLinks = document.querySelectorAll('a[href*="email-protection"]');
        mailtoLinks.forEach(function(link) {
          console.log('Found protected email link:', link.href);
        });
      });
    `;

    return new Response(scriptContent, {
      headers: {
        "Content-Type": "application/javascript",
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
        "Content-Type": "application/javascript",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
}
