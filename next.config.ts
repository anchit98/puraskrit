import type { NextConfig } from "next";

// Static export so the site can be hosted on any static host (S3 + CloudFront, Amplify, etc.).
// No hosting-specific APIs are used. TODO(lead-dev): confirm hosting target.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
