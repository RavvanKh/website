"use client";

import { useI18n } from "@/locales/client";

import { aboutUs } from "@/data/aboutUs";

import styles from "./about-us.module.css";
import Image from "next/image";


const AboutUs = () => {
  const t = useI18n();
  return (
    <section className={styles.aboutUs}>
      <div className={styles.aboutUsContainer}>
        <div className={styles.aboutUsLeft}>
          <div className={styles.aboutUsTop}>{t("aboutUs")}</div>
          <div className={styles.aboutUsBottom}>
            {aboutUs.map((item, index) => (
              <div key={index} className={styles.aboutUsContent}>
                <div>{t(item.title)}</div>
                <p>{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.aboutUsRight}>
            <Image src='/images/about-us.svg' fill alt="About us"/>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
