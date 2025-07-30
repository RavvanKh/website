"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/shared/loader/Loader";

import { useGlobalData } from "@/contexts/GlobalDataContext";

const CourseApplicationForm = dynamic(
  () =>
    import("@/components/shared/course-application-form/CourseApplicationForm"),
  {
    ssr: false,
    loading: () => null,
  }
);
import styles from "./course-application.module.css";

const CourseApplication = ({ params = {} }) => {
  const { data, loading, error } = useGlobalData();

  if (loading?.home)
    return (
      <section className={styles.loaderContainer}>
        <Loader size="medium" color="primary" />
      </section>
    );
  if (error?.home)
    return (
      <section className={styles.loaderContainer}>
        <p className={styles.errorTitle}>Error</p>
        <p className={styles.errorMessage}>{error}</p>
        <p className={styles.errorSubtitle}>
          Unable to load course application
        </p>
      </section>
    );
  return (
    <section className={styles.courseApplication}>
      <CourseApplicationForm courses={data?.courses} params={params} />
    </section>
  );
};

export default CourseApplication;
