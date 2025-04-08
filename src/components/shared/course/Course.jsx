import React from "react";
import Image from "next/image";

import styles from "./course.module.css";


const Course = ({ course }) => {
  return (
    <div className={styles.course}>
      <div className={styles.courseIcon}>
        <img
          className={styles.courseImg}
          src={course?.icon}
          alt={course?.name}
          width={100}
          loading="lazy"
          height={100}
          fetchPriority="high"
        />
      </div>
      <div className={styles.courseInfo}>
        <div className={styles.courseHeader}>
          <div className={styles.courseHeaderIcon}>
            <Image
              src="/icons/course.svg"
              height={14}
              width={14}
              alt="Course"
              loading="lazy"
            />
            <div className={styles.courseType}>{course?.courseType}</div>
          </div>
          <div className={styles.courseDivider} />
          <div className={styles.courseLevel}>{course?.level}</div>
        </div>
        <div className={styles.courseBody}>
          <h3 className={styles.courseName}>{course?.name}</h3>
          <p className={styles.courseTitle}>{course?.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Course;
