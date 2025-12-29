import "@/styles/globals.css";
import {
  Fira_Code,
  IBM_Plex_Sans_Thai,
  Inter,
  Sarabun,
  Space_Grotesk,
} from "next/font/google";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import localFont from "next/font/local";

// English fonts
const bodyFontEN = Inter({ subsets: ["latin"] });
const displayFontEN = Space_Grotesk({ subsets: ["latin"] });

// Thai fonts
const bodyFontTH = Sarabun({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai"],
});
// The font is downloaded from https://seed.line.me/index_th.html.
// In the zip file downloaded, there is multiple woff2 files.
// I choosed this one because I think W_Th stands for "with Thai".
const displayFontTH = localFont({
  src: "../public/fonts/LINESeedSansTH_W_Th.woff2",
  weight: "300 400 500 700",
  style: "normal",
});

// Mono font
const monoFont = Fira_Code({ subsets: ["latin"] });

// Icon font
const iconFont = localFont({
  src: "../public/fonts/material-symbols.woff2",
  weight: "100 700",
  style: "normal",
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      {/* Put Next.js generated font families into CSS variables that SKCom and
        TailwindCSS can use */}
      <style jsx global>{`
        :root {
          --font-body:
            ${bodyFontEN.style.fontFamily}, ${bodyFontTH.style.fontFamily};
          --font-display:
            ${displayFontEN.style.fontFamily}, ${displayFontTH.style.fontFamily};
          --font-print: ${bodyFontTH.style.fontFamily}, Sarabun;
          --font-mono:
            ui-monospace, SFMono-Regular, SF Mono, ${monoFont.style.fontFamily},
            ${bodyFontTH.style.fontFamily};
          --font-icon: ${iconFont.style.fontFamily};
        }
      `}</style>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Asia/Bangkok"
        messages={pageProps.messages}
      >
        <Component {...pageProps} />
      </NextIntlClientProvider>
    </>
  );
}

export default App;
