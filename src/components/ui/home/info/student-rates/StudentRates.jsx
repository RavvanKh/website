import React from "react";
import Image from "next/image";

import { getI18n } from "@/locales/server";

import { courseInfo } from "@/data/info";

import styles from "./student-rates.module.css";


const StudentRates = async () => {
  const t = await getI18n();
  return (
    <div className={styles.infoRightStudentRates}>
      <Image
        src="/icons/cycling-arrow.svg"
        height={43}
        width={84}
        alt="Arrow"
        loading="lazy"
      />
      <div className={styles.infoRightStudentRatesStars}>
        <div className={styles.infoRightStudentRatesStarsTitle}>
          {t("studentsRates")}
        </div>
        <div className={styles.infoRightStudentRatesStarsImg}>
          <Image
            src="/icons/rate-stars.svg"
            height={31}
            width={132}
            alt={t("studentsRates")}
          />
          <div className={styles.infoRightStudentRatesStarsCount}>
            <div>{courseInfo.studentRates}</div>
            <div className={styles.infoRightStudentRatesStarsRate}>/5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRates;
