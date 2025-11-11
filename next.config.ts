import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    appDir: true,
  },
  extensionAlias: {
    "@/components": "./src/components",
  },
  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
  },
};

export default nextConfig;
