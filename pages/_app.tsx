import "@/styles/globals.css";
import cn from "@/utils/helpers/cn";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
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
      <div
        className={cn(
          lineSeedSans.variable,
          "font-line-seed",
          "max-w-content-max mx-auto flex min-h-dvh flex-col",
        )}
      >
        <Component {...pageProps} />
      </div>
  );
};

export default App;
