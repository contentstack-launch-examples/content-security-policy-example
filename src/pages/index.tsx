import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>CSP + Cloudflare Email Protection Issue Reproduction</title>
        <meta
          name="description"
          content="Reproducing CSP issue with Cloudflare email protection"
        />
        {/* Cloudflare email protection script - this will be blocked by CSP */}
        <script
          src="https://dev.bibbyfinancialservices.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
          async
        />
      </Head>
      <div
        className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
      >
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold mb-4">
              CSP + Cloudflare Email Protection Issue
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              This page reproduces the CSP console error when using Cloudflare's
              email protection with nonce-based CSP and strict-dynamic
              directive.
            </p>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold mb-2">Expected Behavior:</h2>
            <p className="text-sm">
              You should see a CSP console error because Cloudflare's email
              protection script is not allowed by the strict CSP policy with
              nonce-based restrictions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Protected Email Links (Will be broken due to CSP):
            </h2>

            {/* These mailto links will be protected by Cloudflare but broken due to CSP */}
            <div className="space-y-2">
              <a
                href="mailto:contact@example.com"
                className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Contact our press office
              </a>

              <a
                href="mailto:support@example.com"
                className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Support Email
              </a>

              <a
                href="mailto:info@example.com"
                className="block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                General Information
              </a>
            </div>
          </div>

          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 rounded-lg p-4 mt-8">
            <h3 className="text-lg font-semibold mb-2">CSP Error Expected:</h3>
            <p className="text-sm font-mono">
              Refused to load the script
              'https://dev.bibbyfinancialservices.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js'
              because it violates the following Content Security Policy
              directive: "script-src-elem 'unsafe-inline' 'strict-dynamic'
              https: http: 'unsafe-eval' 'nonce-...'". Note that
              'strict-dynamic' is present, so host-based allowlisting is
              disabled.
            </p>
          </div>
        </main>

        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              CSP Issue Reproduction - Check browser console for errors
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
