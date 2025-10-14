import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the hash from the URL fragment
  const { hash } = req.query;

  // Simple email decoding (this is a basic mock)
  let decodedEmail = "";
  if (hash && typeof hash === "string") {
    try {
      const bytes = [];
      for (let i = 0; i < hash.length; i += 2) {
        bytes.push(parseInt(hash.substr(i, 2), 16));
      }
      decodedEmail = String.fromCharCode(...bytes);
    } catch (e) {
      decodedEmail = "mocked@example.com";
    }
  } else {
    decodedEmail = "mocked@example.com";
  }

  // Return a simple HTML page with the decoded email
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Protection</title>
    </head>
    <body>
      <h1>Email Protection Result</h1>
      <p>Decoded email: <a href="mailto:${decodedEmail}">${decodedEmail}</a></p>
      <p><a href="/">← Back to main page</a></p>
    </body>
    </html>
  `);
}
