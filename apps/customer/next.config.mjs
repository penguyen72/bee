/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["mighty-bee.vercel.app"]
    }
  }
}

export default nextConfig
