import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Remove 'output: export' and 'basePath' for Vercel deployment
  // Uncomment the lines below if deploying to GitHub Pages instead:
  // output: 'export',
  // basePath: '/monster',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
