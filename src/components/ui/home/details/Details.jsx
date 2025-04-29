import React from "react";

import Info from "../info/Info";
import SubjectAreas from "../subject-areas/SubjectAreas";

import styles from "./details.module.css";

const Details = ({
  totalCourses,
  totalInstructors,
  instructorsLoading,
  coursesLoading,
}) => {
  return (
    <section className={styles.details}>
      <Info
        totalCourses={totalCourses}
        totalInstructors={totalInstructors}
        instructorsLoading={instructorsLoading}
        coursesLoading={coursesLoading}
      />
      <SubjectAreas />
    </section>
  );
};

export default Details;
