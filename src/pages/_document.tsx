import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import crypto from "crypto";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    
    // Get nonce from middleware (set in request headers)
    const nonce = ctx.req?.headers['x-nonce'] as string || crypto.randomBytes(16).toString('base64');
    
    return {
      ...initialProps,
      nonce,
    };
  }

  render() {
    const { nonce } = this.props as any;

    return (
      <Html lang="en">
        <Head nonce={nonce} />
        <body className="antialiased">
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
