'use client'
import { useI18n } from "@/locales/client";

import styles from "./why-choose-us-detail.module.css";

const WhyChooseUsDetail = ({ item, index }) => {
  const t = useI18n();

  return (
    <div
      className={styles.whyChooseUsDetailItem}
    >
      <div className={styles.whyChooseUsDetailItemAbsoluteBorder} />
      <div className={styles.whyChooseUsDetailItemTitle}>{t(item?.title)}</div>
      <div className={styles.whyChooseUsDetailItemDescription}>
        {t(item?.description)}
      </div>
    </div>
  );
};

export default WhyChooseUsDetail;
