import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
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
              href="/cdn-cgi/l/email-protection#5f2f2d3a2c2c1f3a273e322f333a713c3032"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="5f2f2d3a2c2c1f3a273e322f333a713c3032"
            >
              Contact our press office
            </a>
            <a
              href="/cdn-cgi/l/email-protection#5123343425383a307f32393027303f113429303c213d347f323e3c"
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="5123343425383a307f32393027303f113429303c213d347f323e3c"
            >
              Support Email
            </a>
            <a
              href="/cdn-cgi/l/email-protection#761f18101936130e171b061a135815191b"
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-center"
              data-cfemail="761f18101936130e171b061a135815191b"
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

      <Script
        id="cloudflare-email-decode"
        src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
