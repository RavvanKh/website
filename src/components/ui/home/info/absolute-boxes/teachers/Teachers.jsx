import React from "react";

import { getI18n } from "@/locales/server";

import { courseInfo } from "@/data/info";

import Box from "../Box";

import styles from './teachers.module.css'

const Teachers = async () => {
  const t = await getI18n();
  return (
    <div className={styles.infoRightTeachers}>
      <Box
        title="qualifiedTeachers"
        detail={courseInfo.qualifiedTeachers}
        iconSrc="/icons/qualified-teachers.svg"
      />
    </div>
  );
};

export default Teachers;
