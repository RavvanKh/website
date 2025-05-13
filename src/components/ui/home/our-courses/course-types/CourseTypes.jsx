import { courseTypes } from "@/lib/constants/courseTypes";

import styles from "./course-types.module.css";

const CourseTypes = ({ t, selectedType,onClick }) => {
  return (
    <div className={styles.courseTypes}>
      {courseTypes.map((type, index) => (
        <div
        onClick={() => onClick('type',type.key)}
          className={`${styles.courseType} ${
            selectedType === type.key ? styles.courseTypeSelected : ""
          }`}
          key={index}
        >
          {t(type.key)}
        </div>
      ))}
    </div>
  );
};

export default CourseTypes;
