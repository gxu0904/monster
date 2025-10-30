import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  basePath: '/monster',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
