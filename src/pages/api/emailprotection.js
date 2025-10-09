// Contentstack Launch API Route - src/pages/api/emailprotection.js
export default function handler(req, res) {
  try {
    // Use a simple nonce for testing
    const nonce = "test123";

    // Return JavaScript content that simulates Cloudflare email protection
    const scriptContent = `
      // Simulate Cloudflare email protection script
      console.log('Launch API route loaded with nonce:', '${nonce}');
      window.CF_EMAIL_PROTECTION_NONCE = "${nonce}";
      
      // Simulate email protection functionality
      function decodeEmail(encodedEmail) {
        // Simple simulation - in real Cloudflare script this would decode the email
        console.log('Email protection would decode:', encodedEmail);
        return encodedEmail;
      }
      
      // Initialize email protection
      document.addEventListener('DOMContentLoaded', function() {
        console.log('Cloudflare email protection initialized via Launch API');
        const mailtoLinks = document.querySelectorAll('a[href*="email-protection"]');
        mailtoLinks.forEach(function(link) {
          console.log('Found protected email link:', link.href);
        });
      });
    `;

    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Content-Type-Options", "nosniff");

    res.status(200).send(scriptContent);
  } catch (error) {
    console.error("Launch API route error:", error);
    res.status(500).send("// Error loading email protection script");
  }
}
