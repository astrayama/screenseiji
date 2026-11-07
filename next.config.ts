import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // YouTube thumbnails for the home page's latest video (lib/youtube.ts).
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**', search: '' }],
  },
  // Not experimental.inlineCss: it puts the stylesheet in the HTML twice (a
  // <style> tag and the RSC payload), which took the home page from 24 KB to
  // 88 KB gzipped and made first paint slower on a throttled phone.
};

export default nextConfig;
