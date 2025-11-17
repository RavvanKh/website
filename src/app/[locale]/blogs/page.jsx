import Blogs from "@/components/pages/blogs/Blogs";
import { notFound } from "next/navigation";

import { ERROR_ENUMS, errorResponses } from "@/lib/constants/errorCodes";

import { getHomeData } from "@/lib/utils/api/home";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  try {
    const { organization } = await getHomeData();

    return {
      alternates: {
        canonical: `${organization?.url}/${locale}/blogs`,
        languages: {
          az: `${organization?.url}/az/blogs`,
          en: `${organization?.url}/en/blogs`,
        },
      },
    };
  } catch (err) {
    return errorResponses[ERROR_ENUMS.maintenance];
  }
}
const BlogsPage = () => {
  // return <Blogs />;
  return notFound();
};

export default BlogsPage;
