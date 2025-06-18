import Home from "@/components/pages/home/Home";

import { getHomeData } from "@/lib/utils/api/home";
import { generateSchema } from "@/lib/utils/helpers";


export default async function HomePage() {
  const { organization } = await getHomeData();

  const optimizedSchema = generateSchema("organization", organization);
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
