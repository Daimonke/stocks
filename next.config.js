/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["static.finnhub.io"],
  },
};

module.exports = nextConfig;
