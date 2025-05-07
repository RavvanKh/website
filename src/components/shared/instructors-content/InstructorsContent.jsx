"use client";
import { useI18n } from "@/locales/client";

import SeeMore from "../see-more/SeeMore";

import styles from "./instructors-content.module.css";

const InstructorsContent = ({ showBtn = false, isFlex = false }) => {
  const t = useI18n();

  const className = isFlex ? styles.instructorsContentFlex : styles.instructorsContentBlock;

  return (
    <div className={`${styles.instructorsContent} ${className}`}>
      <div className={styles.instructorsContentTitle}>
        <div>{t("energeticInstructorsWith")}</div>
        <div className={styles.instructorsContentTitleColored}>
          {t("realWorldExperience")}
        </div>
      </div>
      <p className={styles.instructorsContentParagraph}>
        {t("instructorsSectionParagraph")}
      </p>
      {showBtn && <SeeMore url="/" />}
    </div>
  );
};

export default InstructorsContent;
