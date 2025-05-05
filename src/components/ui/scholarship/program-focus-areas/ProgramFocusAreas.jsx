"use client";
import { useEffect, useState } from "react";

import { useI18n } from "@/locales/client";

import { getCourses } from "@/lib/utils/api/courses";

import Loader from "@/components/shared/loader/Loader";

import styles from "./program-focus-areas.module.css";
import CourseBoxes from "./course-boxes/CourseBoxes";

const ProgramFocusAreas = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const t = useI18n();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await getCourses(0, 9);
        setCourses(res?.content);
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const firstRow = courses.slice(0, 5);
  const secondRow = courses.slice(5, 9);

  return (
    <section className={styles.programFocusAreas}>
      <div className={styles.programFocusAreasTop}>
        <div>{t("programFocusAreas")}</div>
        <p>{t("programFocusAreasSubTitle")}</p>
      </div>
      {loading ? (
        <div className={styles.programFocusAreasLoaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          Failed to load instructors: {error}
        </div>
      ) : (
        <div className={styles.programFocusAreasBottom}>
          <CourseBoxes array={courses} start={0} end={5}/>
          <CourseBoxes array={courses} start={5} end={9}/>
        </div>
      )}
    </section>
  );
};

export default ProgramFocusAreas;
