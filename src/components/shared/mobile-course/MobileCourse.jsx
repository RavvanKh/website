'use client";';
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useI18n } from "@/locales/client";

import styles from "./mobile-course.module.css";

const MobileCourse = ({ course, duration = false, lines = 2, onClose }) => {
  const t = useI18n();

  return (
    <Link onClick={onClose} href={`/trainings/${course?.key}`}>
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
            <div className={styles.courseBodyEllipsis}>
              <div className={styles.courseName}>{course?.name}</div>
              <p
                className={styles.courseTitle}
                style={{ WebkitLineClamp: lines }}
              >
                {course?.title}
              </p>
            </div>
            {duration && (
              <div className={styles.courseDuration}>
                <Image
                  src="/icons/duration.svg"
                  height={18}
                  width={18}
                  alt="Duration"
                  loading="lazy"
                />
                <div className={styles.courseDurationInfo}>
                  {course?.duration} {t("months")} / {course?.lessonHour}{" "}
                  {t("hours")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MobileCourse;
