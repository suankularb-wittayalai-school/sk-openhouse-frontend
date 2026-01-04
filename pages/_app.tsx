import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import localFont from "next/font/local";
import cn from "@/utils/helpers/cn";
import { useState } from "react";
import { user } from "@/utils/types/user";
import UserContext from "@/contexts/UserContext";

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
  const [user, setUser] = useState<user | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
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
        </div>
      </NextIntlClientProvider>
    </UserContext.Provider>
  );
}

export default App;
