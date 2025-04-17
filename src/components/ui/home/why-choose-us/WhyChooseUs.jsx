import React from "react";

import { useI18n } from "@/locales/client";

import { whyChooseUsDetails } from "@/data/whyChooseUs";

import Detail from "./detail/Detail";

import styles from "./why-choose-us.module.css";





const WhyChooseUs =  () => {
  const t =  useI18n();
  
  return (
    <section className={styles.whyChooseUs}>
      <div className={styles.whyChooseUsTitle}>{t("whyChooseUs")}</div>
      <div  className={styles.whyChooseUsDetails}>
        <div className={styles.whyChooseUsDetailsLeft}>
        <div className={styles.whyChooseUsDetailsLeftBg}></div>
        </div>
        <div className={styles.whyChooseUsDetailsRight}>
            {whyChooseUsDetails.map((item,index) => (
                <Detail item={item} key={index} index={index}/>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
