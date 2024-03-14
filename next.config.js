/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'merablog.merakommunikation.se',
          },
        ],
      },
      reactStrictMode: false,
}

module.exports = nextConfig
