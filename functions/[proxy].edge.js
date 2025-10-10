export default async function handler(request, context) {
  try {
    // Forward the request to the origin server
    const response = await fetch(request);

    // Only process HTML responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();

    // Generate random nonce
    const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Inject nonce into script tags that don't already have one
    html = html.replace(/<script(?!.*nonce=)/g, `<script nonce="${nonce}"`);

    // Inject a script to handle dynamic script creation by Next.js
    const dynamicScriptHandler = `
      <script nonce="${nonce}">
        // Store the nonce globally for dynamic script creation
        window.__NONCE__ = "${nonce}";
        
        // Override document.createElement to add nonce to dynamically created scripts
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
          const element = originalCreateElement.call(this, tagName);
          if (tagName.toLowerCase() === 'script' && window.__NONCE__) {
            element.setAttribute('nonce', window.__NONCE__);
          }
          return element;
        };
        
        // Also handle scripts created via innerHTML
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

    // Insert the dynamic script handler before the closing head tag
    html = html.replace("</head>", dynamicScriptHandler + "</head>");

    // Update CSP header with strict-dynamic
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

    // Create new response with updated headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Content-Security-Policy", updatedCSP);

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    console.error("Edge function error:", error);
    // Return original response if edge function fails
    return fetch(request);
  }
}
