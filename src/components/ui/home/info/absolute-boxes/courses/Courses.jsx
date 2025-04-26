import React from "react";

import Box from "../Box";

import { courseInfo } from "@/data/info";

import styles from "./courses.module.css";

const Courses = () => {
  return (
    <div className={styles.infoRightCourses}>
      <Box
        width="172px"
        title="courses"
        detail={courseInfo.courses}
        iconSrc="/icons/courses.svg"
      />
    </div>
  );
};

export default Courses;
