import { routes } from "@/lib/constants/routes";

export const generateSitemap = (courses) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  const now = new Date().toISOString();

  const staticRoutes = Object.values(routes)
    .map((route) => {
      let isHome = route === routes.home;
      if (!isHome) {
        return `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
      } else {
        return null;
      }
    })
    .join("");

  const courseRoutes =
    courses
      ?.map((course) => {
        const updatedAt = course?.updatedAt ?? now;
        return `
      <url>
        <loc>${baseUrl}/trainings/${course.id}</loc>
        <lastmod>${new Date(updatedAt).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>`;
      })
      .join("") ?? "";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${staticRoutes}
    ${courseRoutes}
  </urlset>`;

  return sitemap;
};
