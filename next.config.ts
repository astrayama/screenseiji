import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The websites page became Studio Services.
      { source: '/websites', destination: '/studio', permanent: true },
    ]
  },
  images: {
    // YouTube thumbnails for the home page's latest video (lib/youtube.ts).
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**', search: '' }],
  },
};

export default nextConfig;
