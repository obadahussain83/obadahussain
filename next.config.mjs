/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve images directly without the Next.js optimizer.
    // This keeps things simple and reliable for a portfolio: the shipped
    // placeholder SVGs render as-is, and any real photo (jpg/png/webp) you
    // drop into /public just works with no extra configuration.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
