import Training from "@/components/pages/training/Training";

import { getTrainingData } from "@/lib/utils/api/training";
import { getHomeData } from "@/lib/utils/api/home";
import { generateSchema } from "@/lib/utils/helpers/generateSchema";

export async function generateMetadata({ params }) {
  const { key } = await params;
  const { organization } = await getHomeData();
  const training = await getTrainingData(key);

  if (!training?.name) {
    return {
      title: "Training not found",
      description: "The requested training could not be found.",
    };
  }


  return {
    title: `${training.name} - ${organization?.name}`,
    description: training.description,
    keywords: training.searchKeys || [],
    openGraph: {
      title: training.name,
      description: training.description,
      url: `${organization?.url}/training/${key}`,
      siteName: organization?.name,
      images: [
        {
          url: training.image || organization?.logo,
          width: 800,
          height: 600,
          alt: training.name,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `${organization?.url}/en/training/${key}`,
    }
  };
}

export default async function TrainingPage({ params }) {
  const { key } = await params;

  const training = await getTrainingData(key);

  const optimizedSchema = generateSchema("training", training);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(optimizedSchema) }}
      />
      <Training trainingKey={key} />
    </>
  );
}
