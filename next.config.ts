import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
   i18n: {
    locales: ['en-US', 'th'],
    defaultLocale: 'th',
  },
};

export default nextConfig;
