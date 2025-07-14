import { notFound } from "next/navigation";

import Training from "@/components/pages/training/Training";

import { getTrainingData } from "@/lib/utils/api/training";
import { getHomeData } from "@/lib/utils/api/home";
import { generateSchema } from "@/lib/utils/helpers";

export async function generateMetadata({ params }) {
  const { key, locale } = await params;

  const { organization } = await getHomeData();
  const training = await getTrainingData(key);

  if (!training?.name) {
    notFound();
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
      url: `${organization?.url}/${locale}/training/${key}`,
      siteName: organization?.name,
      images: [
        {
          url: training.icon || organization?.logo,
          width: 1200,
          height: 630,
          alt: training.name,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `${organization?.url}/${locale}/training/${key}`,
      languages: {
        "az": `${organization?.url}/az/training/${key}`,
        "en": `${organization?.url}/en/training/${key}`,
      },
    },
  };
}

export default async function TrainingPage({ params }) {
  const { key } = await params;

  const training = await getTrainingData(key);

  const { organization } = await getHomeData();

  const optimizedSchema = generateSchema("course", { training, organization });

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
