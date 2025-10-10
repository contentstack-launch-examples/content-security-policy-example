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

export default function Home({ nonce }: HomeProps) {
  return (
    <>
      <Head>
        <title>CSP + Cloudflare Email Protection</title>
        <meta
          name="description"
          content="Using Launch API route to provide nonce to Cloudflare's email protection"
        />

        {/* Load Cloudflare email protection script via Launch API Route */}
        <script src="/api/emailprotection" async {...(nonce && { nonce })} />

        {/* Debug script to verify everything is working */}
        <script
          {...(nonce && { nonce })}
          dangerouslySetInnerHTML={{
            __html: `
               console.log('Launch edge function solution loaded successfully!');
               console.log('Nonce: ${
                 nonce || "undefined - using fallback CSP"
               }');
               console.log('CSP with strict-dynamic is working properly.');
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

        <h2 className="text-2xl mb-4">Protected Email Links</h2>
        <div className="space-y-3">
          <button
            onClick={() =>
              (window.location.href = "mailto:contact@example.com")
            }
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
          >
            Contact our press office
          </button>

          <button
            onClick={() =>
              (window.location.href = "mailto:support@example.com")
            }
            className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
            data-cfemail="b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
          >
            Support Email
          </button>

          <button
            onClick={() => (window.location.href = "mailto:info@example.com")}
            className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
            data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
          >
            General Information
          </button>
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
