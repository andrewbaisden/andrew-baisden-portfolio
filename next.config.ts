import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Next's workspace detection scoped to this application. The parent
    // directory contains an unrelated lockfile.
    root: __dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/.netlify/functions/contact',
        destination: '/api/contact',
      },
    ];
  },
};

export default nextConfig;
