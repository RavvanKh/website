"use client";
import React, { useEffect, useState } from "react";

import { useI18n } from "@/locales/client";
import { getCourses } from "@/lib/utils/api/courses";

import styles from "./popular-courses.module.css";
import Loader from "@/components/shared/loader/Loader";
import Course from "@/components/shared/course/Course";
import ExploreFullCatalog from "@/components/shared/explore-full-catalog/ExploreFullCatalog";

const PopularCourses = () => {
  const t = useI18n();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses(0, 4);
        setCourses(data?.content);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
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
              imgHeight="150px"
              imgWidth="100%"
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
