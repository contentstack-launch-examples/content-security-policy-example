import { Html, Head, Main, NextScript } from "next/document";
import { headers } from "next/headers";

export default async function Document() {
  // Get the nonce from the request headers (set by middleware)
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") || "";

  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}
