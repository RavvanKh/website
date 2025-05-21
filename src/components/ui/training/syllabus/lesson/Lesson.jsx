"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./lesson.module.css";

const Lesson = ({ lesson,isExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  return (
    <div className={styles.lessonContainer}>
      <div className={styles.lesson} onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/icons/syllabus.svg"
          height={32}
          width={32}
          alt="syllabus"
          loading="lazy"
        />
        <div className={styles.lessonName}>{lesson.name}</div>
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
      </div>

      <div
        className={`${styles.taskList} ${isOpen ? styles.open : styles.closed}`}
      >
        {lesson?.children?.map((task, index) => (
          <div key={index} className={styles.task}>
            <div className={styles.taskInfo}>
              <div>{index + 1}</div>
              <p>{task.name}</p>
            </div>
            {index !== lesson?.children.length - 1 && (
              <Image src="/icons/task.png" height={20} width={18} alt="task" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lesson;
