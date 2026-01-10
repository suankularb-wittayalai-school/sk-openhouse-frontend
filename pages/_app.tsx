import BackgroundDecoration from "@/components/common/BackgroundDecoration";
import Header from "@/components/common/Header";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import cn from "@/utils/helpers/cn";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const lineSeedSans = localFont({
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

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <UserProvider>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Asia/Bangkok"
        messages={pageProps.messages}
      >
        <Head>
          <title>SK Open House 2026</title>
          <link rel="icon" href="icons/event-logo.png"></link>
        </Head>
        <div
          className={cn(
            lineSeedSans.variable,
            "font-line-seed",
            "max-w-content-max mx-auto flex min-h-dvh flex-col",
          )}
        >
          <Header />
          <div className="m-auto w-full max-w-3xl grow">
            <Component {...pageProps} />
          </div>
          <div className="text-tertiary/50 p-2.5 pt-0 text-center text-xs">
            © 2026 โรงเรียนสวนกุหลาบวิทยาลัย<br />
            Made with <span className="text-tertiary">🩷🩵</span> by{" "}
            <Link
              href="https://github.com/suankularb-wittayalai-school"
              className="text-tertiary/50 underline"
              target="_blank"
            >
              SK IT Solutions
            </Link>{" "}
            Student Team
          </div>
          <BackgroundDecoration />
        </div>
      </NextIntlClientProvider>
    </UserProvider>
  );
};

export default App;
