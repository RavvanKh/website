import ImgSkeleton from "../img-skeleton/ImgSkeleton";

import styles from "./instructor.module.css";

const Instructor = ({ instructor }) => {
  return (
    <div className={styles.instructor}>
      <div className={styles.instructorImgContainer}>
        <ImgSkeleton obj={instructor} keyName="image" isRounded={true} />
      </div>
      <div className={styles.instructorInfo}>{instructor?.name}</div>
      <div className={styles.instructorRole}>{instructor?.workPlaceId}</div>
    </div>
  );
};

export default Instructor;
