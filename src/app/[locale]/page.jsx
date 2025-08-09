import Home from "@/components/pages/home/Home.jsx";

import { getHomeData } from "@/lib/utils/api/home";
import { generateSchema } from "@/lib/utils/helpers";

export default async function HomePage() {
  let optimizedSchema = null;
  try {
    const { organization } = await getHomeData();

    optimizedSchema = generateSchema("organization", organization);
  } catch (_) {}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizedSchema) }}
      />
      <Home />
    </>
  );
}
