import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
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

export default function Home({ nonce }: HomeProps) {
  return (
    <>
      <Head>
        <title>CSP + Cloudflare Email Protection</title>
        <meta
          name="description"
          content="Using Launch API route to provide nonce to Cloudflare's email protection"
        />

        {/* Cloudflare Email Protection Script - This should automatically pick up the nonce */}
        <script
          {...(nonce && { nonce })}
          src="/cdn-cgi/scripts/7d0fa10a/cloudflare-static/email-decode.min.js"
          async
        />

        {/* Debug script to verify CSP and nonce */}
        <script
          {...(nonce && { nonce })}
          dangerouslySetInnerHTML={{
            __html: `
               console.log('CSP Configuration Test');
               console.log('Nonce: ${
                 nonce || "undefined - using fallback CSP"
               }');
               console.log('CSP with strict-dynamic should allow Cloudflare scripts');
               console.log('Check for CSP violations in console');
             `,
          }}
        />
      </Head>

      <div
        className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen p-8`}
      >
        <h1 className="text-4xl font-bold mb-4">
          CSP + Cloudflare Email Protection
        </h1>
        <p className="mb-6">
          This page uses a Launch edge function to provide a dynamic nonce for
          Cloudflare&apos;s email protection script, ensuring strict-dynamic CSP
          compliance.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            CSP Configuration Status
          </h3>
          <p className="text-yellow-700 text-sm">
            This page uses nonce-based CSP with &apos;strict-dynamic&apos;
            directive. Cloudflare email protection should work with this
            configuration.
          </p>
        </div>

        <h2 className="text-2xl mb-4">
          Protected Email Links (Cloudflare Style)
        </h2>
        <div className="space-y-3">
          <a
            href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
          >
            Contact our press office
          </a>

          <a
            href="/cdn-cgi/l/email-protection#b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
            className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
          >
            Support Email
          </a>

          <a
            href="/cdn-cgi/l/email-protection#cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
            className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
            data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
          >
            General Information
          </a>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Test Instructions
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
            <li>Open browser developer tools (F12)</li>
            <li>Go to Console tab</li>
            <li>Look for CSP violations or email protection messages</li>
            <li>Click on the email links above to test functionality</li>
            <li>
              Check Network tab for any blocked requests to
              /cdn-cgi/l/email-protection
            </li>
          </ol>
        </div>

        <div className="mt-4 flex space-x-4">
          <Link
            href="/problematic"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View Problem →
          </Link>
          <Link
            href="/solution"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View Solution →
          </Link>
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
