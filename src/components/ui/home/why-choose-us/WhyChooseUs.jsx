import React from "react";

import { useI18n } from "@/locales/client";

import { whyChooseUsDetails } from "@/lib/constants/whyChooseUs";

import Detail from "../../../shared/why-choose-us-detail/WhyChooseUsDetail";

import styles from "./why-choose-us.module.css";

const WhyChooseUs = () => {
  const t = useI18n();

  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.whyChooseUsTitle}>{t("whyChooseUs")}</div>
      <div className={styles.whyChooseUsDetails}>
        <div className={styles.whyChooseUsDetailsLeft}>
          <div className={styles.whyChooseUsDetailsLeftBg}></div>
        </div>
        <div className={styles.whyChooseUsDetailsRight}>
          {whyChooseUsDetails.map((item, index) => (
            <div
              style={{ marginLeft: `${index * 82}px` }}
              className={styles.whyChooseUsDetail}
              key={index}
            >
              <Detail item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
