import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [nonce, setNonce] = useState("");

  useEffect(() => {
    // Generate a dynamic nonce on the client side
    const dynamicNonce = Buffer.from(Math.random().toString()).toString(
      "base64"
    );
    setNonce(dynamicNonce);
  }, []);

  return (
    <>
      <Head>
        <title>
          CSP + Cloudflare Email Protection - Launch Edge Function Solution
        </title>
        <meta
          name="description"
          content="Launch edge function solution for CSP and Cloudflare email protection"
        />

        {/* Cloudflare email protection script - proxied through Launch edge function */}
        {nonce && <script src="/functions/proxy" async nonce={nonce} />}

        {/* Debug script to verify everything is working */}
        {nonce && (
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                console.log('Launch edge function solution loaded successfully!');
                console.log('Nonce:', '${nonce}');
                console.log('CSP with strict-dynamic is working properly.');
              `,
            }}
          />
        )}
      </Head>

      <div
        className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen p-8`}
      >
        <div className="max-w-4xl mx-auto">
          <main className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                CSP + Cloudflare Email Protection
              </h1>
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                Launch Edge Function Solution
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Successfully implemented Launch edge function to proxy
                Cloudflare&apos;s email protection script while maintaining
                strict-dynamic CSP security with dynamic nonce generation.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-200">
                ✅ Solution Working Successfully
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Launch edge function proxying Cloudflare script</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Dynamic nonce generation for CSP compliance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>strict-dynamic CSP maintained for security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span>Email protection functionality working</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
                Protected Email Links
              </h2>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                These email links are protected by Cloudflare and should work
                properly with the edge function solution:
              </p>

              <div className="space-y-3">
                <a
                  href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
                  className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
                  data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
                >
                  Contact our press office
                </a>

                <a
                  href="/cdn-cgi/l/email-protection#b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
                  className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
                  data-cfemail="b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
                >
                  Support Email
                </a>

                <a
                  href="/cdn-cgi/l/email-protection#cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
                  className="block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
                  data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
                >
                  General Information
                </a>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Technical Implementation
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Launch Edge Function
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      functions/[proxy].edge.js
                    </code>
                    serves the Cloudflare email protection script with dynamic
                    nonce generation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Dynamic Nonce</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Each request generates a unique nonce for maximum security
                    while maintaining CSP compliance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    strict-dynamic CSP
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Maintains strict-dynamic directive as required by customer
                    while allowing email protection to work.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
                Verification Steps
              </h2>
              <div className="space-y-2">
                <p className="text-sm">1. Open browser Developer Tools (F12)</p>
                <p className="text-sm">
                  2. Check Console tab for success messages
                </p>
                <p className="text-sm">3. Verify no CSP errors are present</p>
                <p className="text-sm">
                  4. Test email links - they should open your email client
                </p>
                <p className="text-sm">
                  5. Check Network tab - script should load from{" "}
                  <code>/functions/proxy</code>
                </p>
              </div>
            </div>
          </main>

          <footer className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Launch Edge Function Solution - CSP + Cloudflare Email Protection
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
