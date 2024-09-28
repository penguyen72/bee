/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BUSINESS_EMAIL: process.env.BUSINESS_EMAIL,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['mighty-bee.vercel.app'],
    },
  },
};

export default nextConfig;
