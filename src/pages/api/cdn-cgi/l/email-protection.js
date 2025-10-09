// Contentstack Launch API Route - src/pages/api/cdn-cgi/l/email-protection.js
// This handles the Cloudflare email protection endpoint

export default function handler(req, res) {
  try {
    // Get the encoded email from the URL fragment
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email parameter required" });
    }

    // Simple email decoding simulation
    // In a real implementation, this would decode the Cloudflare-encoded email
    const decodedEmail = decodeEmail(email);

    // Return the decoded email
    res.status(200).json({
      decoded: decodedEmail,
      original: email,
    });
  } catch (error) {
    console.error("Email protection API error:", error);
    res.status(500).json({ error: "Failed to decode email" });
  }
}

// Simple email decoding function
function decodeEmail(encodedEmail) {
  // This is a simplified version - real Cloudflare decoding is more complex
  // For demonstration, we'll return a sample email
  const sampleEmails = [
    "contact@example.com",
    "support@example.com",
    "info@example.com",
  ];

  // Use the encoded string to pick a consistent email
  const index = encodedEmail.length % sampleEmails.length;
  return sampleEmails[index];
}
