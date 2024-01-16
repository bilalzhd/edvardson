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
}

module.exports = nextConfig
