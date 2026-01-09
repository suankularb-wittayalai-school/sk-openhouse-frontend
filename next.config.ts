import { source } from "motion/react-client";
import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";

const nextConfig = {
  redirects: async () => [
    {
      source: "/p/:id",
      destination: "/me/passport/:id",
      permanent: true,
    },
  ],
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  i18n: {
    locales: ["th"],
    defaultLocale: "th",
  },
} satisfies NextConfig;

export default nextConfig;
