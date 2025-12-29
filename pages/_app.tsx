import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Asia/Bangkok"
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default App;
