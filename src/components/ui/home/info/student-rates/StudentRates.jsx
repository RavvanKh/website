import React from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import Rating from "@/components/shared/rating/Rating";

import styles from "./student-rates.module.css";

const StudentRates =  () => {
  const t = useI18n();
  
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
        <Rating rating={4.7} height={31} width={20}/>
      </div>
    </div>
  );
};

export default StudentRates;
