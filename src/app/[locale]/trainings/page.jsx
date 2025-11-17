import Trainings from "@/components/pages/trainings/Trainings";
import { ERROR_ENUMS, errorResponses } from "@/lib/constants/errorCodes";

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
    return errorResponses[ERROR_ENUMS.maintenance];
  }
}

const TrainingsPage = () => {
  return <Trainings />;
};

export default TrainingsPage;
