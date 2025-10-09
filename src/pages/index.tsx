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
        {/* Test script to verify CSP and nonce are working */}
        <script
          nonce="test123"
          dangerouslySetInnerHTML={{
            __html: `
              console.log('Test script with nonce is working!');
            `,
          }}
        />
        {/* Simulate Cloudflare email protection being enabled */}
        <script
          nonce="test123"
          dangerouslySetInnerHTML={{
            __html: `
              // Simulate Cloudflare email protection initialization
              if (typeof window !== 'undefined') {
                window.addEventListener('DOMContentLoaded', function() {
                  // This simulates what happens when email protection is enabled
                  console.log('Cloudflare email protection would be initialized here');
                  
                  // Check if the Cloudflare script loaded
                  const scripts = document.querySelectorAll('script[src*="email-decode"]');
                  console.log('Found', scripts.length, 'email-decode scripts');
                  
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
              CSP + Cloudflare Email Protection - Testing Basic Setup
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Testing basic CSP and nonce functionality before implementing edge
              function solution.
            </p>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold mb-2">Expected Behavior:</h2>
            <p className="text-sm">
              With the Launch edge function solution, the Cloudflare email
              protection script is proxied through our edge function with proper
              nonce. This maintains strict-dynamic security while allowing the
              script to load from our own domain.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Protected Email Links (Should work with edge function solution):
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

          <div className="bg-blue-100 dark:bg-blue-900 border border-blue-400 dark:border-blue-600 rounded-lg p-4 mt-8">
            <h3 className="text-lg font-semibold mb-2">
              Check Browser Console:
            </h3>
            <p className="text-sm mb-4">
              Open your browser&apos;s Developer Tools (F12) and check the
              Console tab. With the Launch edge function solution, you should
              NOT see CSP errors blocking the Cloudflare script.
            </p>
          </div>
        </main>

        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Launch Edge Function Solution - Check browser console for results
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
