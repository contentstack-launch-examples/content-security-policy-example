export default async function handler(request, context) {
  try {
    const response = await fetch(request);

    // Process HTML only
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();

    // Generate nonce
    const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Add nonce to scripts
    html = html.replace(/<script(?!.*nonce=)/g, `<script nonce="${nonce}"`);

    // Handle dynamic scripts
    const dynamicScriptHandler = `
      <script nonce="${nonce}">
        // Store nonce globally
        window.__NONCE__ = "${nonce}";
        
        // Override createElement
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
          const element = originalCreateElement.call(this, tagName);
          if (tagName.toLowerCase() === 'script' && window.__NONCE__) {
            element.setAttribute('nonce', window.__NONCE__);
          }
          return element;
        };
        
        // Handle innerHTML scripts
        const originalInnerHTMLSetter = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;
        Object.defineProperty(Element.prototype, 'innerHTML', {
          set: function(value) {
            if (typeof value === 'string' && value.includes('<script') && window.__NONCE__) {
              value = value.replace(/<script(?!.*nonce=)/g, '<script nonce="' + window.__NONCE__ + '"');
            }
            originalInnerHTMLSetter.call(this, value);
          },
          get: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').get
        });
      </script>`;

    // Insert handler
    html = html.replace("</head>", dynamicScriptHandler + "</head>");

    // Update CSP
    const originalCSP = response.headers.get("Content-Security-Policy") || "";
    let updatedCSP = originalCSP;

    if (/script-src/.test(originalCSP)) {
      updatedCSP = originalCSP.replace(
        /script-src([^;]*)/,
        (match, p1) => `script-src${p1} 'nonce-${nonce}' 'strict-dynamic'`
      );
    } else {
      updatedCSP += `; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;
    }

    // Return response
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Content-Security-Policy", updatedCSP);

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return fetch(request);
  }
}
