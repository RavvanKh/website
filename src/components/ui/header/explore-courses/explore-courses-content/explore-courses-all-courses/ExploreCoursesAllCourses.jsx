import React from "react";

import Course from "@/components/shared/course/Course";

import styles from "./explore-courses-all-courses.module.css";

const ExploreCoursesAllCourses = ({ category, courses }) => {
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
              duration={false}
              lines={2}
              direction="row"
              course={course}
              key={course?.key}
              levelPosition="right"
              imgHeight="180px"
              imgWidth="290px"
            />
          ))
        ) : (
          <div className={styles.exploreAllCoursesNoCourse}>
            No courses available in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreCoursesAllCourses;
