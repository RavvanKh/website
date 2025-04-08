/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    env:{
        NEXT_PUBLIC_QUIZ_MS_URL: 'quiz/v1',
        NEXT_PUBLIC_API_DOMAIN: '/'
    }
};

export default nextConfig;
