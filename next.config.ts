import { source } from "motion/react-client";
import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/p/:id",
        destination: "/me/passport/:id",
        permanent: true,
      },
    ];
  },

  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  i18n: {
    locales: ["th"],
    defaultLocale: "th",
  },
};

export default nextConfig;
