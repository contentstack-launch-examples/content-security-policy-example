import { Html, Head, Main, NextScript } from "next/document";
import { GetServerSidePropsContext } from "next";

interface DocumentProps {
  nonce?: string;
}

export default function Document({ nonce }: DocumentProps) {
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
