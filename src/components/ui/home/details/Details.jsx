import React from "react";

import Info from "../info/Info";
import SubjectAreas from "../subject-areas/SubjectAreas";

import styles from "./details.module.css";

const Details = ({
  totalCourses,
  totalInstructors,
  instructorsLoading,
  coursesLoading,
  rating,
  ratingLoading,
}) => {
  return (
    <section className={styles.details}>
      <Info
        totalCourses={totalCourses}
        totalInstructors={totalInstructors}
        instructorsLoading={instructorsLoading}
        coursesLoading={coursesLoading}
        rating={rating}
        ratingLoading={ratingLoading}
      />
      {/* <SubjectAreas /> */}
    </section>
  );
};

export default Details;
