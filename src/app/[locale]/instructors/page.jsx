import React from "react";
import InstructorsPage from "@/components/pages/instructors/Instructors";

import { ERROR_ENUMS, errorResponses } from "@/lib/constants/errorCodes";

import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  try {
    const { organization } = await getHomeData();

    return {
      alternates: {
        canonical: `${organization?.url}/${locale}/instructors`,
        languages: {
          az: `${organization?.url}/az/instructors`,
          en: `${organization?.url}/en/instructors`,
        },
      },
    };
  } catch (err) {
    return errorResponses[ERROR_ENUMS.maintenance];
  }
}
const Instructors = () => {
  return <InstructorsPage />;
};

export default Instructors;
