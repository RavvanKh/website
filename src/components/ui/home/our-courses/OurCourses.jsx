"use client";
import { useI18n } from "@/locales/client";

import Loader from "@/components/shared/loader/Loader";
import Course from "@/components/shared/course/Course";
import ExploreFullCatalog from "@/components/shared/explore-full-catalog/ExploreFullCatalog";
import CourseTypes from "./course-types/CourseTypes";
import CategoriesSlider from "./categories-slider/CategoriesSlider";

import styles from "./our-courses.module.css";


const OurCourses = ({
  courses,
  loading,
  error,
  onChangeFilter,
  categories,
  categoriesError,
  categoriesLoading,
  filter,
}) => {
  const t = useI18n();

  return (
    <section className={styles.ourCourses}>
      <div className={styles.ourCoursesTitle}>{t("ourCourses")}</div>
      <CourseTypes t={t} selectedType={filter.type} onClick={onChangeFilter} />
      <CategoriesSlider
        categories={categories}
        selectedCategory={filter.category}
        onClick={onChangeFilter}
        loading={categoriesLoading}
        error={categoriesError}
      />
      {loading ? (
        <div className={styles.ourCoursesLoaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          Failed to load categories: {error}
        </div>
      ) : (
        <div className={styles.ourCoursesList}>
          {courses.map((course) => (
            <Course
              imgHeight="200px"
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

      <ExploreFullCatalog t={t} url="/trainings" />
    </section>
  );
};

export default OurCourses;
