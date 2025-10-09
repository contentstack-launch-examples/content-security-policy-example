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
        {/* Simulate Cloudflare email protection being enabled */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Simulate Cloudflare email protection initialization
              if (typeof window !== 'undefined') {
                window.addEventListener('DOMContentLoaded', function() {
                  // This simulates what happens when email protection is enabled
                  console.log('Cloudflare email protection would be initialized here');
                  
                  // Simulate the email protection trying to decode protected emails
                  const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
                  mailtoLinks.forEach(function(link) {
                    // In real scenario, Cloudflare would decode these protected emails
                    // But since the script is blocked by CSP, this won't work
                    console.log('Email protection would decode:', link.href);
                  });
                });
              }
            `,
          }}
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
              email protection (enabled feature) with nonce-based CSP and
              strict-dynamic directive.
            </p>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold mb-2">Expected Behavior:</h2>
            <p className="text-sm">
              You should see a CSP console error because Cloudflare's email
              protection script (enabled feature) is not allowed by the strict
              CSP policy with nonce-based restrictions. The protected email
              links will be broken because the decoding script is blocked.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Protected Email Links (Will be broken due to CSP):
            </h2>

            {/* These mailto links are protected by Cloudflare but broken due to CSP */}
            <div className="space-y-2">
              <a
                href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
                className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
              >
                Contact our press office
              </a>

              <a
                href="/cdn-cgi/l/email-protection#b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
                className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                data-cfemail="b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
              >
                Support Email
              </a>

              <a
                href="/cdn-cgi/l/email-protection#cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
                className="block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
                data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
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
