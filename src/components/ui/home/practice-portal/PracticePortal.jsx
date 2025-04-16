import React from "react";
import Image from "next/image";

import { getI18n } from "@/locales/server";

import styles from "./practice-portal.module.css";

const PracticePortal = async () => {
  const t = await getI18n();

  return (
    <section className={styles.practicePortal}>
      <div className={styles.practicePortalContainer}>
        <div className={styles.practicePortalLeft}>
          <Image
            src="/images/practice-portal-1.svg"
            alt="Practice Portal"
            width={380}
            height={420}
            loading="lazy"
            className={styles.practicePortalImage}
          />
          <Image
            src="/images/practice-portal-2.svg"
            alt="Practice Portal"
            width={380}
            height={420}
            loading="lazy"
            className={styles.practicePortalImage}
          />
        </div>
        <div className={styles.practicePortalRight}>
          <div className={styles.practicePortalRightHeader}>
            <Image
              src="/icons/badge.svg"
              height={44}
              width={40}
              alt="Badge"
              loading="lazy"
            />
            <div>
              <div className={styles.practicePortalRightTitle}>{t("yourPracticePortal")}</div>
              <div className={styles.practicePortalRightSubTitle}>{t("yourPracticePortalSubTitle")}</div>
            </div>
          </div>
          <div className={styles.practicePortalRightContent}>
            <p className={styles.practicePortalRightContentDescription}>{t("yourPracticePortalDescription1")}</p>
            <p className={styles.practicePortalRightContentDescription}>{t("yourPracticePortalDescription2")}</p>
            <p className={styles.practicePortalRightContentDescription}>{t("yourPracticePortalDescription3")}</p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticePortal;
