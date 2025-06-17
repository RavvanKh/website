"use client";

import Course from "@/components/shared/course/Course";

import { COURSE_STYLES } from "@/lib/constants/course-styles";

import styles from "./explore-courses-all-courses.module.css";

const ExploreCoursesAllCourses = ({
  onClose,
  category,
  courses,
  showEmptyMessage,
}) => {
  return (
    <section className={styles.exploreAllCourses}>
      <div className={styles.exploreAllCoursesTitle}>
        <h3 className={styles.exploreAllCoursesCategoryName}>
          {category?.name}
        </h3>
        <p className={styles.exploreAllCoursesCategoryDescription}>
          {category?.description}
        </p>
      </div>
      <div className={styles.exploreAllCoursesList}>
        {courses?.length > 0 ? (
          courses.map((course) => (
            <Course
              onClose={onClose}
              duration={false}
              lines={2}
              direction="row"
              course={course}
              key={course?.id}
              levelPosition="right"
              imgHeight="180px"
              imgWidth="290px"
              courseStyle={COURSE_STYLES.exploreCoursesDesktop}
            />
          ))
        ) : showEmptyMessage ? (
          <div className={styles.exploreAllCoursesNoCourse}>
            No courses available in this category.
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ExploreCoursesAllCourses;
