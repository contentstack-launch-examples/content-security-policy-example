import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    // Static nonce for CSP
    const staticNonce = "static-nonce-12345";

    return (
      <Html lang="en">
        <Head nonce={staticNonce} />
        <body className="antialiased">
          <Main />
          <NextScript nonce={staticNonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
