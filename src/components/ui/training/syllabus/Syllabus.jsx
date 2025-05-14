import { useState } from "react";

import Loader from "@/components/shared/loader/Loader";
import Lesson from "./lesson/Lesson";

import styles from "./syllabus.module.css";

const Syllabus = ({ syllabus, t, title, error, loading }) => {
  const [expandAll, setExpandAll] = useState(false);

  const handleToggle = () => {
    setExpandAll((prevState) => !prevState);
  };

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
        <div className={styles.syllabusTopRight}>
          <button onClick={handleToggle}>
            {expandAll ? t("collapseAll") : t("expandAll")}
          </button>
        </div>
      </div>
      <div className={styles.syllabusLessons}>
        {syllabus?.lessons
          ?.sort((a, b) => a.positionIndex - b.positionIndex)
          ?.map((lesson) => (
            <Lesson key={lesson.id} lesson={lesson} isExpanded={expandAll} />
          ))}
      </div>
    </section>
  );
};

export default Syllabus;
