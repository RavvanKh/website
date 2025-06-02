/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_QUIZ_MS_URL: "quiz",
    NEXT_PUBLIC_BASE_URL: "course-ms/api",
    NEXT_PUBLIC_APPLICATION_MS_URL: "applications-ms",
    NEXT_PUBLIC_API_DOMAIN: "https://api.ingress.academy",
    // NEXT_PUBLIC_API_DOMAIN: "/",
  },
};

export default nextConfig;
