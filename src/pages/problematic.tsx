import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { GetServerSideProps } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface HomeProps {
  nonce: string;
}

export default function ProblematicPage({ nonce }: HomeProps) {
  return (
    <>
      <Head>
        <title>Problematic CSP + Cloudflare Email Protection</title>
        <meta
          name="description"
          content="This page demonstrates the CSP issue with Cloudflare email protection"
        />

        {/* This CSP configuration will BLOCK Cloudflare email protection - matches customer's exact issue */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-AueJwNry5qMrTymYNUWFtg=='; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
        />

        {/* Cloudflare Email Protection Script - This will be BLOCKED by CSP (no nonce) */}
        <script
          src="/cdn-cgi/scripts/7d0fa10a/cloudflare-static/email-decode.min.js"
          async
        />

        {/* Debug script */}
        <script
          {...(nonce && { nonce })}
          dangerouslySetInnerHTML={{
            __html: `
               console.log('PROBLEMATIC CSP Configuration Test');
               console.log('Nonce: ${nonce || "undefined"}');
               console.log('This CSP will BLOCK Cloudflare email protection scripts');
               console.log('Look for CSP violation errors in console');
             `,
          }}
        />
      </Head>

      <div
        className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen p-8`}
      >
        <h1 className="text-4xl font-bold mb-4 text-red-600">
          Problematic CSP Configuration
        </h1>
        <p className="mb-6 text-red-700">
          This page demonstrates the CSP issue that blocks Cloudflare&apos;s
          email protection feature. The CSP is too restrictive and doesn&apos;t
          allow Cloudflare&apos;s scripts to load.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            CSP Configuration (PROBLEMATIC - Customer's Exact Issue)
          </h3>
          <p className="text-red-700 text-sm mb-2">
            This matches Bibby Financial Services' CSP configuration:
          </p>
          <code className="text-xs bg-red-100 p-2 block rounded">
            script-src-elem 'unsafe-inline' 'strict-dynamic' https: http:
            'unsafe-eval' 'nonce-AueJwNry5qMrTymYNUWFtg=='
          </code>
          <p className="text-red-700 text-sm mt-2">
            <strong>Problem:</strong> Cloudflare's email protection script
            doesn't have the nonce, so it gets blocked by 'strict-dynamic'
          </p>
        </div>

        <h2 className="text-2xl mb-4">Broken Email Links</h2>
        <div className="space-y-3">
          <a
            href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
            className="block w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
          >
            Contact our press office (BROKEN)
          </a>

          <a
            href="/cdn-cgi/l/email-protection#b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
            className="block w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
          >
            Support Email (BROKEN)
          </a>

          <a
            href="/cdn-cgi/l/email-protection#cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
            className="block w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
          >
            General Information (BROKEN)
          </a>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Expected CSP Violations
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
            <li>Open browser developer tools (F12)</li>
            <li>Go to Console tab</li>
            <li>You should see CSP violation errors like:</li>
            <li className="ml-4">
              <code className="bg-gray-200 px-1 rounded">
                Refused to load the script
                'https://challenges.cloudflare.com/...' because it violates the
                following Content Security Policy directive
              </code>
            </li>
            <li>Email links will not work properly</li>
          </ol>
        </div>

        <div className="mt-4 flex space-x-4">
          <a
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Main
          </a>
          <a
            href="/solution"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View Solution →
          </a>
        </div>
      </div>
    </>
  );
}

// Get nonce from middleware headers
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const nonce = req.headers["x-nonce"] as string;

  // Fallback nonce generation if middleware didn't set it
  const fallbackNonce =
    nonce ||
    (() => {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      return btoa(String.fromCharCode(...array));
    })();

  return {
    props: {
      nonce: fallbackNonce,
    },
  };
};
