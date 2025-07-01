"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useI18n } from "@/locales/client";

import { convertWeekToHour } from "@/lib/utils/helpers";
import { routes } from "@/lib/constants/routes";

import ImgSkeleton from "../img-skeleton/ImgSkeleton";

import styles from "./course.module.css";

const Course = ({
  course,
  levelPosition = "right",
  direction = "row",
  duration = false,
  lines = 2,
  onClose,
  courseStyle = {},
}) => {
  const t = useI18n();

  return (
    <Link href={`${routes.trainings}/${course?.id}`} legacyBehavior>
      <a
        className={styles.courseLink}
        onClick={onClose}
        style={{ maxWidth: direction === "column" ? 400 : "auto" }}
      >
        <div
          className={styles.course}
          style={{
            flexDirection: direction,
            minHeight: direction === "row" ? "auto" : 375,
          }}
        >
          <div className={styles.courseIcon}>
            <ImgSkeleton
              type="training"
              obj={course}
              keyName="icon"
              isRounded={false}
              style={courseStyle}
            />
          </div>

          {levelPosition === "top" && (
            <div className={styles.courseLevel}>{course?.level}</div>
          )}

          <div className={styles.courseInfo}>
            <div className={styles.courseHeader}>
              <span className={styles.courseHeaderIcon}>
                <Image
                  src="/icons/course.svg"
                  height={14}
                  width={14}
                  alt="Course icon"
                  loading="lazy"
                />
                <span className={styles.courseType}>
                  {course?.type || t("course")}
                </span>
              </span>

              {levelPosition === "right" && (
                <>
                  <div className={styles.courseDivider} />
                  <span>{course?.level}</span>
                </>
              )}
            </div>

            <div className={styles.courseBody}>
              <h3 className={styles.courseName}>{course?.name}</h3>
              <p
                className={styles.courseTitle}
                style={{ WebkitLineClamp: lines }}
              >
                {course?.description}
              </p>

              {duration && (
                <div className={styles.courseDuration}>
                  <Image
                    src="/icons/duration.svg"
                    height={18}
                    width={18}
                    alt="Duration icon"
                    loading="lazy"
                  />
                  <span className={styles.courseDurationInfo}>
                    {course?.durationInWeeks} {t("weeks")} /{" "}
                    {convertWeekToHour(
                      course?.durationInWeeks,
                      course?.hoursPerSession,
                      course?.sessionsPerWeek
                    )}{" "}
                    {t("hours")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Course;
