"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./lesson.module.css";

const Lesson = ({ lesson, isExpanded, pdfView }) => {
  const [isOpen, setIsOpen] = useState(isExpanded);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    !pdfView && setIsOpen((prev) => !prev);
  };

  return (
    <article
      className={`${styles.lessonContainer} ${
        pdfView ? styles.pdfView : styles.normalView
      }`}
    >
      <header className={styles.lesson} onClick={handleToggle}>
        <Image
          src="/icons/syllabus.svg"
          height={32}
          width={32}
          alt="syllabus"
          loading="lazy"
        />
        <h3 className={styles.lessonName}>{lesson.name}</h3>
        {!pdfView && (
          <Image
            src={
              isOpen
                ? "/icons/syllabus-collapse.svg"
                : "/icons/syllabus-expand.svg"
            }
            height={30}
            width={30}
            alt="toggle"
            loading="lazy"
          />
        )}
      </header>

      <ul
        className={`${styles.taskList} ${isOpen ? styles.open : styles.closed}`}
      >
        {lesson?.children?.map((task, index) => (
          <li key={index} className={styles.task}>
            <div className={styles.taskInfo}>
              {!pdfView && <div>{index + 1}</div>}
              <p>{task.name}</p>
            </div>
            {index !== lesson.children.length - 1 && !pdfView && (
              <Image
                src="/icons/task.png"
                height={20}
                width={18}
                alt="task"
                loading="lazy"
              />
            )}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Lesson;
