/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_QUIZ_MS_URL: "quiz",
    NEXT_PUBLIC_API_DOMAIN: "/",
    NEXT_PUBLIC_COMMENTS_URL:
      "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJKevjwsJ9MEARO2muBxqSHNY&fields=name,rating,reviews,user_ratings_total&key=AIzaSyDH2gSSG4HSbfZ13WXu42Xn2QsIh5j5Gjc",
  },
};

export default nextConfig;
