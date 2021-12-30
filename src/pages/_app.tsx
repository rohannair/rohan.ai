import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <div className="w-full min-h-screen flex flex-col px-6">
      <Header isHome={isHome} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
