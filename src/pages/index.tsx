import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";

export default function Home() {
  return (
    <>
      <Head>
        <title>Testing CSP with Cloudflare Email Protection</title>
        <meta
          name="description"
          content="CSP with Cloudflare Email Protection"
        />
      </Head>

      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <a
              href="/cdn-cgi/l/email-protection#press@example.com"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="7072657373406578616d706c652e636f6d"
            >
              Contact our press office
            </a>
            <a
              href="/cdn-cgi/l/email-protection#reetika.chavan@example.com"
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="72656574696b612e63686176616e406578616d706c652e636f6d"
            >
              Support Email
            </a>
            <a
              href="/cdn-cgi/l/email-protection#info@example.com"
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="696e666f406578616d706c652e636f6d"
            >
              General Information
            </a>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/solution"
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
            >
              View Solution →
            </Link>
          </div>
        </div>
      </div>

      {/* External Script */}
      <script
        nonce="static-nonce-12345"
        src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
        async
      ></script>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Force dynamic rendering
  return {
    props: {},
  };
};
