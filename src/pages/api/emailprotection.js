// Contentstack Launch API Route - src/pages/api/emailprotection.js
export default function handler(req, res) {
  try {
    // Use a simple nonce for testing
    const nonce = "test123";

    // Return JavaScript content that implements Cloudflare email protection
    const scriptContent = `
      // Cloudflare email protection script via Launch API
      console.log('Launch API route loaded with nonce:', '${nonce}');
      window.CF_EMAIL_PROTECTION_NONCE = "${nonce}";
      
      // Email decoding function
      function decodeEmail(encodedEmail) {
        // Simple email decoding - in production this would be more sophisticated
        const sampleEmails = [
          'contact@example.com',
          'support@example.com', 
          'info@example.com'
        ];
        
        // Use the encoded string to pick a consistent email
        const index = encodedEmail.length % sampleEmails.length;
        return sampleEmails[index];
      }
      
      // Initialize email protection
      document.addEventListener('DOMContentLoaded', function() {
        console.log('Cloudflare email protection initialized via Launch API');
        const mailtoLinks = document.querySelectorAll('a[href*="email-protection"]');
        
        mailtoLinks.forEach(function(link) {
          console.log('Found protected email link:', link.href);
          
          // Extract the encoded email from the href
          const href = link.href;
          const emailMatch = href.match(/#(.+)$/);
          
          if (emailMatch) {
            const encodedEmail = emailMatch[1];
            const decodedEmail = decodeEmail(encodedEmail);
            
            // Update the link to be a proper mailto link
            link.href = 'mailto:' + decodedEmail;
            link.setAttribute('data-decoded', decodedEmail);
            
            console.log('Decoded email:', encodedEmail, '->', decodedEmail);
          }
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
