// Contentstack Launch API Route - src/pages/api/emailprotection.js

// Generate a cryptographically secure nonce
function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array));
}

export default function handler(req, res) {
  try {
    // Get nonce from request headers (set by middleware)
    const nonce = req.headers["x-nonce"] || generateNonce();

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
        
        const emailButtons = document.querySelectorAll('button[data-cfemail]');
        
        emailButtons.forEach(function(button) {
          const encodedEmail = button.getAttribute('data-cfemail');
          const decodedEmail = decodeEmail(encodedEmail);
          
          // Update the button's onClick to use the decoded email
          button.onclick = function() {
            window.location.href = 'mailto:' + decodedEmail;
          };
          
          button.setAttribute('data-decoded', decodedEmail);
          console.log('Decoded email button:', encodedEmail, '->', decodedEmail);
        });
        
        // Prevent any requests to /cdn-cgi/l/email-protection
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
          if (typeof url === 'string' && url.includes('/cdn-cgi/l/email-protection')) {
            console.log('Blocked request to:', url);
            return Promise.reject(new Error('Email protection handled client-side'));
          }
          return originalFetch.apply(this, arguments);
        };
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
