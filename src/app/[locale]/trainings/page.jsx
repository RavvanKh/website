import Trainings from "@/components/pages/trainings/Trainings";

import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  try {
    const { organization } = await getHomeData();

    return {
      title: `Trainings - ${organization?.name}`,
      alternates: {
        canonical: `${organization?.url}/${locale}/trainings`,
        languages: {
          az: `${organization?.url}/az/trainings`,
          en: `${organization?.url}/en/trainings`,
        },
      },
    };
  } catch (err) {
    return {
      title: "Website Under Maintenance",
      description:
        "Our website is currently undergoing scheduled maintenance. We apologize for the inconvenience and appreciate your patience.",
      keywords: "maintenance, site down, temporary unavailable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

const TrainingsPage = () => {
  return <Trainings />;
};

export default TrainingsPage;
