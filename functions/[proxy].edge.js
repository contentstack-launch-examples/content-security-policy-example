// Launch Edge Function to proxy Cloudflare email protection script
// This allows us to serve the script from our own domain with proper nonce
// while maintaining strict-dynamic CSP security

export default async function handler(request) {
  try {
    // Generate a dynamic nonce for this request
    const nonce = Buffer.from(Math.random().toString()).toString("base64");

    // The actual Cloudflare email protection script content
    const scriptContent = `!function(){"use strict";function e(e){try{if("undefined"==typeof console)return;"error"in console?console.error(e):console.log(e)}catch(e){}}function t(e){return d.innerHTML='<a href="'+e.replace(/"/g,"&quot;")+'"></a>',d.childNodes[0].getAttribute("href")||""}function r(e,t){var r=e.substr(t,2);return parseInt(r,16)}function n(n,c){for(var o="",a=r(n,c),i=c+2;i<n.length;i+=2){var l=r(n,i)^a;o+=String.fromCharCode(l)}try{o=decodeURIComponent(escape(o))}catch(u){e(u)}return t(o)}function c(t){for(var r=t.querySelectorAll("a"),c=0;c<r.length;c++)try{var o=r[c],a=o.href.indexOf(l);a>-1&&(o.href="mailto:"+n(o.href,a+l.length))}catch(i){e(i)}}function o(t){for(var r=t.querySelectorAll(u),c=0;c<r.length;c++)try{var o=r[c],a=o.parentNode,i=o.getAttribute(f);if(i){var l=n(i,0),d=document.createTextNode(l);a.replaceChild(d,o)}}catch(h){e(h)}}function a(t){for(var r=t.querySelectorAll("template"),n=0;n<r.length;n++)try{i(r[n].content)}catch(c){e(c)}}function i(t){try{c(t),o(t),a(t)}catch(r){e(r)}}var l="/cdn-cgi/l/email-protection#",u=".__cf_email__",f="data-cfemail",d=document.createElement("div");i(document),function(){var e=document.currentScript||document.scripts[document.scripts.length-1];e.parentNode.removeChild(e)}()}();`;

    // Return the script with proper headers
    return new Response(scriptContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "X-Nonce": nonce,
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
