import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")]
  },
  i18n: {
    locales: ["th"],
    defaultLocale: "th",
  },
};

export default nextConfig;
