import Header from "@/components/common/Header";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import cn from "@/utils/helpers/cn";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import Image from "next/image";
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
          <link rel="icon" href="icons/OPH_logo.png"></link>
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
          <div className="text-tertiary p-2 pt-0 text-center text-xs opacity-50">
            Made with 🩷🩵 by{" "}
            <Link
              href="https://github.com/suankularb-wittayalai-school"
              className="text-tertiary! underline"
              target="_blank"
            >
              SKISo Student Team
            </Link>
            !
            <br />© 2026 โรงเรียนสวนกุหลาบวิทยาลัย
          </div>
          <Image
            src="/longbuilding.svg"
            alt="Suankularb Building (Long Building)"
            width={1920}
            height={396.35}
            className="fixed bottom-12 left-0 -z-1000 min-h-60 w-screen
              object-cover"
          />
        </div>
      </NextIntlClientProvider>
    </UserProvider>
  );
};

export default App;
