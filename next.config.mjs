/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{
    remotePatterns:[
       {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/ingress-group.appspot.com/**',
      },
    ]
  },
  env: {
    NEXT_PUBLIC_QUIZ_MS_URL: "quiz",
    NEXT_PUBLIC_BASE_URL: "course-ms/api",
    NEXT_PUBLIC_APPLICATION_MS_URL: "applications-ms",
    NEXT_PUBLIC_API_DOMAIN: "http://api.ingress.academy",
    NEXT_PUBLIC_AMPLITUDE_API_KEY:'c3088893370f88bae1238020cd57bf7'
    // NEXT_PUBLIC_API_DOMAIN: "/",
  },
};

export default nextConfig;
