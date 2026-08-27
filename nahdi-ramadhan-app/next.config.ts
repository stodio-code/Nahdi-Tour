import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder gambar dari Unsplash. Ganti dengan aset milik Nahdi Tour
    // (mis. /public/assets/...) untuk produksi.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
