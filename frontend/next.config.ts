import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Next's workspace detection scoped to this application. The parent
    // directory contains an unrelated lockfile.
    root: __dirname,
  },
  images: {
    domains: [],
  },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/.netlify/functions/contact",
        destination: "/api/contact",
      },
    ];
  },
};

export default nextConfig;
