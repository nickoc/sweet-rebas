import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized images aggressively at the CDN edge
    minimumCacheTTL: 60 * 60 * 24 * 7,
    // Remote sources whitelisted for next/image. Specials photos uploaded via the
    // Bearing admin land in Supabase Storage and are surfaced here through the
    // public catalog API at getbearing.co/api/catalog/sweet-rebas.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "getbearing.co",
      },
    ],
  },
};

export default nextConfig;
