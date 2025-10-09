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
        <title>CSP + Cloudflare Email Protection</title>
        <meta
          name="description"
          content="Using Launch edge function to provide nonce to Cloudflare email protection"
        />

        {/* Load Cloudflare email protection script via Edge Function */}
        <script
          src="/functions/email-protection"
          async
        />
      </Head>

      <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen p-8`}>
        <h1 className="text-4xl font-bold mb-4">
          CSP + Cloudflare Email Protection
        </h1>
        <p className="mb-6">
          This page uses a Launch edge function to provide a dynamic nonce
          for Cloudflare's email protection script, ensuring strict-dynamic CSP
          compliance.
        </p>

        <h2 className="text-2xl mb-4">Protected Email Links</h2>
        <div className="space-y-3">
          <a
            href="/cdn-cgi/l/email-protection#a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
            className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
          >
            Contact our press office
          </a>

          <a
            href="/cdn-cgi/l/email-protection#b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
            className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
            data-cfemail="b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
          >
            Support Email
          </a>

          <a
            href="/cdn-cgi/l/email-protection#cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
            className="block bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
            data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
          >
            General Information
          </a>
        </div>
      </div>
    </>
  );
}
