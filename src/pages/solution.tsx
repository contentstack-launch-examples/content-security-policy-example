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

export default function SolutionPage({ nonce }: HomeProps) {
  return (
    <>
      <Head>
        <title>SOLUTION: CSP + Cloudflare Email Protection</title>
        <meta
          name="description"
          content="This page shows the correct CSP configuration for Cloudflare email protection"
        />

        {/* SOLUTION: CSP configuration that WORKS with Cloudflare email protection */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src-elem 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval' 'nonce-AueJwNry5qMrTymYNUWFtg==' 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
        />

        {/* Cloudflare Email Protection Script - This will WORK with proper CSP */}
        <script
          src="/cdn-cgi/scripts/7d0fa10a/cloudflare-static/email-decode.min.js"
          async
        />

        {/* Debug script */}
        <script
          {...(nonce && { nonce })}
          dangerouslySetInnerHTML={{
            __html: `
               console.log('SOLUTION: CSP Configuration Test');
               console.log('Nonce: ${nonce || "undefined"}');
               console.log('This CSP allows Cloudflare email protection scripts');
               console.log('Email protection should work properly');
             `,
          }}
        />
      </Head>

      <div
        className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen p-8`}
      >
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          ✅ SOLUTION: CSP + Cloudflare Email Protection
        </h1>
        <p className="mb-6 text-green-700">
          This page shows the <strong>correct CSP configuration</strong> that
          allows Cloudflare&apos;s email protection to work with{" "}
          <code>&apos;strict-dynamic&apos;</code>.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✅ WORKING CSP Configuration
          </h3>
          <p className="text-green-700 text-sm mb-2">
            The key fix: Add <code>&apos;self&apos;</code> to script-src-elem:
          </p>
          <code className="text-xs bg-green-100 p-2 block rounded">
            script-src-elem &apos;unsafe-inline&apos; &apos;strict-dynamic&apos;
            https: http: &apos;unsafe-eval&apos;
            &apos;nonce-AueJwNry5qMrTymYNUWFtg==&apos; &apos;self&apos;
          </code>
          <p className="text-green-700 text-sm mt-2">
            <strong>Why this works:</strong> Adding{" "}
            <code>&apos;self&apos;</code> allows scripts from the same domain,
            which includes Cloudflare&apos;s email protection scripts served
            from your domain.
          </p>
        </div>

        <h2 className="text-2xl mb-4">Working Email Links</h2>
        <div className="space-y-3">
          <a
            href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
            className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
          >
            Contact our press office (WORKING)
          </a>

          <a
            href="/cdn-cgi/l/email-protection#b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
            className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
          >
            Support Email (WORKING)
          </a>

          <a
            href="/cdn-cgi/l/email-protection#cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
            className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
          >
            General Information (WORKING)
          </a>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            🔧 The Fix for Bibby Financial Services
          </h3>
          <div className="text-blue-700 text-sm space-y-2">
            <p>
              <strong>Current CSP (BROKEN):</strong>
            </p>
            <code className="bg-blue-100 p-2 block rounded text-xs">
              script-src-elem &apos;unsafe-inline&apos;
              &apos;strict-dynamic&apos; https: http: &apos;unsafe-eval&apos;
              &apos;nonce-AueJwNry5qMrTymYNUWFtg==&apos;
            </code>

            <p>
              <strong>Fixed CSP (WORKING):</strong>
            </p>
            <code className="bg-green-100 p-2 block rounded text-xs">
              script-src-elem &apos;unsafe-inline&apos;
              &apos;strict-dynamic&apos; https: http: &apos;unsafe-eval&apos;
              &apos;nonce-AueJwNry5qMrTymYNUWFtg==&apos; &apos;self&apos;
            </code>

            <p>
              <strong>Change:</strong> Add <code>&apos;self&apos;</code> to the
              end of script-src-elem
            </p>
          </div>
        </div>

        <div className="mt-4 flex space-x-4">
          <a
            href="/problematic"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← View Problem
          </a>
          <a
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Main
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
