/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      encoding: false,
      "pino-pretty": false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "www.fable-hub.com",
      },
      {
        protocol: "https",
        hostname: "4b80eaab-1812-46d2-9d4f-0bd902c2a9c2-00-mtg9ae1q6xi2.worf.replit.dev",
      },
    ],
  },
};

module.exports = nextConfig;