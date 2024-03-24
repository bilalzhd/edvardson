/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "merablog.merakommunikation.se",
      },
      {
        protocol: "https",
        hostname: "cdn.klarna.com",
      },
      {
        protocol: "https",
        hostname: "admin.edvardson.se",
      },
    ],
    disableStaticImages: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
