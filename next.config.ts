import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized images aggressively at the CDN edge
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
};

export default nextConfig;
