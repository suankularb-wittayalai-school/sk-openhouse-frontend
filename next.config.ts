import type { NextConfig } from "next";

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
