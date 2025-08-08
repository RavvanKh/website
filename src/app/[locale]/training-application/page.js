import CourseApplication from "@/components/pages/training-application/CourseApplication";
import { use } from "react";

const CourseApplicationPage = ({searchParams}) => {
  return <CourseApplication params = {use(searchParams)} />;
};

export default CourseApplicationPage;
