/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Avoid build stalls/failures on Vercel if eslint package is not installed
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/songs/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "audio/mpeg",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
