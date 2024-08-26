/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['mighty-bee.vercel.app'],
    },
  },
};

export default nextConfig;
