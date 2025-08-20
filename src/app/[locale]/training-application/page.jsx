import { use } from "react";

import CourseApplication from "@/components/pages/training-application/CourseApplication";

const CourseApplicationPage = ({searchParams}) => {
  return <CourseApplication params = {use(searchParams)} />;
};

export default CourseApplicationPage;
