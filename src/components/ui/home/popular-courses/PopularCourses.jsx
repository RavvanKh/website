'use client'
import React, { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";

import Loader from "@/components/shared/loader/Loader";
import Course from "@/components/shared/course/Course";
import ExploreFullCatalog from "@/components/shared/explore-full-catalog/ExploreFullCatalog";

import styles from "./popular-courses.module.css";

const PopularCourses = ({ courses, loading, error }) => {
  const t = useI18n();
  const [imgWidth, setImgWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      setImgWidth(window.innerWidth < 1200 ? "250px" : "290px");
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.popularCourses}>
      <div className={styles.popularCoursesTitle}>{t("popularCourses")}</div>

      {loading ? (
        <div className={styles.popularCoursesLoaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          Failed to load categories: {error}
        </div>
      ) : (
        <div className={styles.popularCoursesList}>
          {courses.map((course) => (
            <Course
              imgHeight="200px"
              imgWidth='100%'
              duration={true}
              lines={4}
              levelPosition="top"
              direction="column"
              course={course}
              key={course?.key}
            />
          ))}
        </div>
      )}

      <ExploreFullCatalog t={t} url="/courses" />
    </section>
  );
};

export default PopularCourses;
