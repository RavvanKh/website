import About from "@/components/pages/about/About";

import { ERROR_ENUMS, errorResponses } from "@/lib/constants/errorCodes";

import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  try {
    const { organization } = await getHomeData();

    return {
      alternates: {
        canonical: `${organization?.url}/${locale}/about`,
        languages: {
          az: `${organization?.url}/az/about`,
          en: `${organization?.url}/en/about`,
        },
      },
    };
  } catch (err) {
    return errorResponses[ERROR_ENUMS.maintenance];
  }
}

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
