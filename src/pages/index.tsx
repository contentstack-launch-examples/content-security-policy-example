"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [nonce, setNonce] = useState("");

  useEffect(() => {
    // Generate nonce safely for browser
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const clientNonce = btoa(String.fromCharCode(...array));
    setNonce(clientNonce);
  }, []);

  return (
    <>
      <Head>
        <title>CSP + Cloudflare Email Protection</title>
        <meta
          name="description"
          content="Launch edge function solution for CSP and Cloudflare email protection"
        />

        {nonce && <script src="/function/proxy" async nonce={nonce}></script>}

        {nonce && (
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                console.log('✅ Launch edge function loaded successfully!');
                console.log('Nonce:', '${nonce}');
              `,
            }}
          />
        )}
      </Head>

      <main className="p-10">
        <h1 className="text-3xl font-bold mb-4">
          CSP + Cloudflare Email Protection
        </h1>
        <p className="text-gray-600 mb-6">
          Proxying Cloudflare’s email protection script via Launch Edge Function.
        </p>

        <div className="space-y-4">
          <a
            href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
            className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
            data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
          >
            Contact our press office
          </a>
        </div>
      </main>
    </>
  );
}
