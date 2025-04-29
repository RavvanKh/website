import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import Teachers from "./absolute-boxes/teachers/Teachers";
import Courses from "./absolute-boxes/courses/Courses";
import Students from "./absolute-boxes/students/Students";
import StudentRates from "./student-rates/StudentRates";

import styles from "./info.module.css";

const Info = ({
  totalCourses,
  totalInstructors,
  instructorsLoading,
  coursesLoading,
}) => {
  const t = useI18n();

  return (
    <section className={styles.info}>
      <div className={styles.infoLeft}>
        <h1 className={styles.infoTitle}>
          <span className={styles.infoTitleItem}>{t("empoweredBy")}</span>
          <br />
          <span className={styles.infoTitleItem}>{t("innovation")}</span>
        </h1>
        <div className={styles.infoLeftTitle}>{t("infoTitle")}</div>
        <p className={styles.infoLeftDescription}>{t("infoDescription")}</p>
        <Link href="/" className={styles.infoLeftButton}>
          <div>{t("exploreOurCourses")}</div>
          <Image
            src="/icons/arrow-right-2.svg"
            width={14}
            height={14}
            alt="Arrow"
          />
        </Link>
      </div>
      <div className={styles.infoRight}>
        <Image
          className={styles.infoRightImg}
          src="/images/info-right-img.svg"
          height={410}
          width={530}
          alt="Info img"
        />
        <Teachers
          totalInstructors={totalInstructors}
          loading={instructorsLoading}
        />
        <Courses totalCourses={totalCourses} loading={coursesLoading} />
        <Students />
        <StudentRates />
      </div>
    </section>
  );
};

export default Info;
