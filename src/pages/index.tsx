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
              href="/api/cdn-cgi/l/email-protection?hash=a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="a8c7c9c4c1c6c9e8c7c9c4c1c6c986cbc7c5"
            >
              Contact our press office
            </a>
            <a
              href="/api/cdn-cgi/l/email-protection?hash=b9d6d8d5d0d7d8f9d6d8d5d0d7d897dad6d4"
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="reetikachavan02@gmail.com"
            >
              Support Email
            </a>
            <a
              href="/api/cdn-cgi/l/email-protection?hash=cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="cae5ebe6e3e4ebcae5ebe6e3e4eba6ebe7e5"
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
