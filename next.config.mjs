/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "www.ingress.academy",
          },
        ],
        destination: "https://ingress.academy/:1",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/ingress-group.appspot.com/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_QUIZ_MS_URL: process.env.NEXT_PUBLIC_QUIZ_MS_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_APPLICATION_MS_URL: process.env.NEXT_PUBLIC_APPLICATION_MS_URL,
    NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
    NEXT_PUBLIC_AMPLITUDE_API_KEY: process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY,
    NEXT_PUBLIC_GOOGLE_KEY: process.env.NEXT_PUBLIC_GOOGLE_KEY,
  },
};

export default nextConfig;
