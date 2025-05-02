/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_QUIZ_MS_URL: "quiz",
    NEXT_PUBLIC_APPLICATION_MS_URL: "applications-ms",
    NEXT_PUBLIC_API_DOMAIN: "https://ingress.academy",
    // NEXT_PUBLIC_API_DOMAIN: "/",
  },
};

export default nextConfig;
