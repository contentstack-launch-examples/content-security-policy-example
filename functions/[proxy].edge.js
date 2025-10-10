export default async function handler(request, context) {
    const response = await context.next(); // fetch original response
    let html = await response.text();
  
    // Generate random nonce
    const nonce = crypto.getRandomValues(new Uint8Array(16))
                       .reduce((acc, val) => acc + val.toString(16), '');
  
    // Inject nonce into inline scripts
    html = html.replace(/<script(?!.*nonce=)/g, `<script nonce="${nonce}"`);
  
    // Preserve original CSP and add nonce
    const originalCSP = response.headers.get('Content-Security-Policy') || '';
    let updatedCSP = originalCSP;
  
    if (/script-src/.test(originalCSP)) {
      updatedCSP = originalCSP.replace(
        /script-src([^;]*)/,
        (match, p1) => `script-src${p1} 'nonce-${nonce}'`
      );
    } else {
      // fallback if script-src not present
      updatedCSP += `; script-src 'self' 'nonce-${nonce}'`;
    }
  
    // Clone headers and set new CSP
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Content-Security-Policy', updatedCSP);
  
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }