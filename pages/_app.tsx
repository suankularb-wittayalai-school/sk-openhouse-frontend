import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import localFont from "next/font/local";
import cn from "@/utils/helpers/cn";
import { LoginProvider } from "@/contexts/LoginContext";

const lineSeed = localFont({
  src: [
    {
      path: "../public/fonts/LINESeedSansTH_W_Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedSansTH_W_Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-line-seed",
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <LoginProvider>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Asia/Bangkok"
        messages={pageProps.messages}
      >
        <div
          className={cn(
            lineSeed.variable,
            "font-line-seed",
            "max-w-content-max mx-auto",
          )}
        >
          <Header />
          <div className="m-auto max-w-3xl">
            <Component {...pageProps} />
          </div>
          <Image
            src={"/longbuilding.svg"}
            alt="Suankularb Building (Long Building)"
            width={1920}
            height={396.35}
            className="fixed bottom-12 left-0 -z-1000 min-h-60 w-screen
              object-cover"
          />
        </div>
      </NextIntlClientProvider>
    </LoginProvider>
  );
}

export default App;
