import { getHomeData } from "@/lib/utils/api/home";

import { generateSitemap } from "@/lib/utils/helpers/generateSitemap";


export async function GET() {
  const data = await getHomeData();

  const sitemap = generateSitemap(data?.courses)

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
