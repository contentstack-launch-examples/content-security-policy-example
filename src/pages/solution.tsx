import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function SolutionPage() {
  return (
    <>
      <Head>
        <title>Solution</title>
        <meta
          name="description"
          content="Working CSP configuration with Cloudflare email protection"
        />
      </Head>

      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <a
              href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
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
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
            >
              General Information
            </a>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
            >
              ← Back to Main
            </Link>
          </div>
        </div>
      </div>

      {/* Cloudflare Email Protection Script */}
      <Script
        src="/cdn-cgi/scripts/7d0fa10a/cloudflare-static/email-decode.min.js"
        strategy="afterInteractive"
      />

      {/* Debug script console log */}
      <Script id="debug-script" strategy="afterInteractive">
        {`
          console.log('SOLUTION: CSP Configuration Test');
          console.log('This CSP allows Cloudflare email protection scripts');
          console.log('Email protection should work properly');
        `}
      </Script>
    </>
  );
}
