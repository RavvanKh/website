import { useI18n } from "@/locales/client";

import ExploreCoursesContent from "../explore-courses/explore-courses-content/ExploreCoursesContent";

import styles from "./course-subjects.module.css";


const CourseSubjects = ({isFetch}) => {

  const t = useI18n();

  return (
    <div className={styles.courseSubjects}>
      <div className={styles.courseSubjectsTitle}>{t("courseSubjects")}</div>
      <ExploreCoursesContent isFetch = {isFetch}/>
    </div>
  );
};

export default CourseSubjects;
