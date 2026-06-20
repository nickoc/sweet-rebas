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
  // Legacy /whats-baking page was retired in favor of /chalkboard. Permanent
  // redirect catches old QR codes, bookmarks, Instagram links, and any cached
  // search results so visitors land on the live page instead of a 404.
  async redirects() {
    return [
      {
        source: "/whats-baking",
        destination: "/chalkboard",
        permanent: true,
      },
    ];
  },
  // Security headers — match the getbearing.co posture. /admin is a static
  // demo today, but every production surface gets the same baseline.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Allow ONLY our own portal (getbearing.co) + Vercel previews to
          // embed the site — this powers the live preview in the content
          // editor. frame-ancestors supersedes X-Frame-Options in modern
          // browsers, and unlike XFO it can allowlist specific origins, so we
          // use CSP here instead of X-Frame-Options.
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://getbearing.co https://*.vercel.app",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
