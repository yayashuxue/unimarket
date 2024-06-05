import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "./Layout";
import Providers from "./providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
