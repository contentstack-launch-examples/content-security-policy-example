const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Generate a nonce for CSP
      const nonce = Buffer.from(Math.random().toString()).toString("base64");

      // Set CSP header matching the exact error from support query
      const cspHeader = [
        `default-src 'self'`,
        `script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-${nonce}'`,
        `script-src 'self' 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-${nonce}'`,
        `style-src 'self' 'unsafe-inline'`,
        `img-src 'self' data: https:`,
        `font-src 'self'`,
        `connect-src 'self'`,
        `frame-ancestors 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
      ].join("; ");

      res.setHeader("Content-Security-Policy", cspHeader);
      res.setHeader("X-Nonce", nonce);

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
