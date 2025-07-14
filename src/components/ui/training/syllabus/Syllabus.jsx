"use client";
import { useState } from "react";

import Loader from "@/components/shared/loader/Loader";
import Lesson from "./lesson/Lesson";

import styles from "./syllabus.module.css";

const Syllabus = ({ trainingProgram, t, title, error, loading }) => {
  const [expandAll, setExpandAll] = useState(false);

  const handleToggle = () => {
    setExpandAll((prev) => !prev);
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader size="medium" color="primary" />
      </div>
    );
  }

  if (error) {
    return <div>Failed to load syllabus: {error}</div>;
  }

  return (
    <section className={styles.syllabus}>
      <div className={styles.syllabusTop}>
        <h2 className={styles.syllabusTopLeft}>
          {t(title)}: {trainingProgram?.name}
        </h2>
        <div className={styles.syllabusTopRight}>
          <button onClick={handleToggle}>
            {expandAll ? t("collapseAll") : t("expandAll")}
          </button>
        </div>
      </div>

      <div className={styles.syllabusLessons}>
        {trainingProgram?.lessons
          ?.sort((a, b) => a.positionIndex - b.positionIndex)
          ?.map((lesson) => (
            <Lesson key={lesson.id} lesson={lesson} isExpanded={expandAll} />
          ))}
      </div>
    </section>
  );
};

export default Syllabus;
