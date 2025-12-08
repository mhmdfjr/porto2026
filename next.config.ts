import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lgklimjczxflxpmtjsoi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**', // Membatasi hanya ke folder public storage
      },
    ],
  },
};

export default nextConfig;
