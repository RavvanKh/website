import Loader from "@/components/shared/loader/Loader";
import Lesson from "./lesson/Lesson";

import styles from "./syllabus.module.css";

const Syllabus = ({ syllabus, t, title, onClickSyllabus, error, loading }) => {
  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader size="medium" color="primary" />
    </div>
  ) : error ? (
    <div>Failed to load syllabus: {error} </div>
  ) : (
    <section className={styles.syllabus}>
      <div className={styles.syllabusTop}>
        <div className={styles.syllabusTopLeft}>
          {t(title)}: {syllabus.name}
        </div>
        <button onClick={() => onClickSyllabus("syllabus")}>
          {t("downloadSyllabus")}
        </button>
      </div>
      <div className={styles.syllabusLessons}>
        {syllabus?.lessons
          ?.sort((a, b) => a.positionIndex - b.positionIndex)
          ?.map((lesson) => (
            <Lesson key={lesson.id} lesson={lesson} />
          ))}
      </div>
    </section>
  );
};

export default Syllabus;
