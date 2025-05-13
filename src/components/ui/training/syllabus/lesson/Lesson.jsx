import Image from "next/image";
import styles from "./lesson.module.css";

const Lesson = ({ lesson }) => {
  return (
    <div className={styles.lesson}>
      <Image
        src="/icons/syllabus.svg"
        height={60}
        width={60}
        alt="syllabus"
        loading="lazy"
      />
      <div className={styles.lessonName}>{lesson.name}</div>
      <Image
        src="/icons/syllabus-expand.svg"
        height={30}
        width={30}
        alt="syllabus"
        loading="lazy"
      />
    </div>
  );
};

export default Lesson;
