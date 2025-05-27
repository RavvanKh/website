'use client";';
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useI18n } from "@/locales/client";

import { convertWeekToHour } from "@/lib/utils/helpers";
import { routes } from "@/lib/constants/routes";

import styles from "./course.module.css";
import ImgSkeleton from "../img-skeleton/ImgSkeleton";


const Course = ({
  course,
  levelPosition = "right",
  direction = "row",
  duration = false,
  lines = 2,
  imgHeight = "180px",
  imgWidth = "300px",
  onClose,
}) => {
  const t = useI18n();

  return (
    <Link
      href={`${routes.trainings}/${course?.id}`}
      onClick={onClose}
      className={styles.courseLink}
    >
      <div
        className={styles.course}
        style={{
          flexDirection: direction,
          minHeight: direction === "row" ? "auto" : "450px",
        }}
      >
        <div
          className={`${styles.courseIcon} ${
            direction === "row"
              ? styles.courseIconMinWidth
              : styles.courseIconMaxWidth
          } `}
          style={{ height: imgHeight, width: imgWidth }}
        >
          {levelPosition === "top" && (
            <div className={styles.courseLevel}>{course?.level}</div>
          )}
          <ImgSkeleton obj={course} keyName='icon' isRounded={false}/>
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
            {levelPosition === "right" && (
              <>
                <div className={styles.courseDivider} />
                <div className={styles.courseLevel}>{course?.level}</div>
              </>
            )}
          </div>
          <div className={styles.courseBody}>
            <div>
              <div className={styles.courseName}>{course?.name}</div>
              <p
                className={styles.courseTitle}
                style={{ WebkitLineClamp: lines }}
              >
                {course?.description}
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
                  {course?.durationInWeeks} {t("weeks")} /{" "}
                  {convertWeekToHour(course?.durationInWeeks)} {t("hours")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Course;
