/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1"],
    remotePatterns: [{ hostname: "images.unsplash.com", protocol: "https" }],
  },
};

module.exports = nextConfig;
