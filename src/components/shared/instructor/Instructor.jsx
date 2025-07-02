import { INSTRUCTOR_STYLES } from "@/lib/constants/instructor-styles";

import ImgSkeleton from "../img-skeleton/ImgSkeleton";

import styles from "./instructor.module.css";

const Instructor = ({ instructor }) => {
  return (
    <div className={styles.instructor}>
      <div className={styles.instructorImgContainer}>
        <ImgSkeleton type="instructor" obj={instructor} keyName="image" isRounded={true} style={INSTRUCTOR_STYLES.about} />
      </div>
      <div className={styles.instructorInfo}>{instructor?.name}</div>
      <div className={styles.instructorRole}>{instructor?.workPlaceId}</div>
    </div>
  );
};

export default Instructor;
