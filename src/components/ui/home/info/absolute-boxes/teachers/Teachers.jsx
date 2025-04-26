import React from "react";

import { courseInfo } from "@/data/info";

import Box from "../Box";

import styles from "./teachers.module.css";

const Teachers = () => {
  return (
    <div className={styles.infoRightTeachers}>
      <Box
        width="244px"
        title="qualifiedTeachers"
        detail={courseInfo.qualifiedTeachers}
        iconSrc="/icons/qualified-teachers.svg"
      />
    </div>
  );
};

export default Teachers;
