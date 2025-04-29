"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/locales/client";
import styles from "./see-more.module.css";

const SeeMore = ({ url }) => {
  const t = useI18n();

  return (
    <Link
      href={url}
      className={styles.seeMore}
    >
      <span className={styles.seeMoreText}>
        <span className={styles.seeMoreTextInner}>{t("seeMore")}</span>
        <span className={styles.seeMoreSrOnly}>
            {t("seeMoreDescription")}
        </span>
      </span>
      <div className={styles.seeMoreIconContainer}>
        <Image
          src="/icons/arrow-top-right.svg"
          height={20}
          width={20}
          alt="Arrow"
          className={styles.seeMoreIcon}
        />
        <Image
          src="/icons/arrow-dark.svg"
          height={20}
          width={20}
          alt="Arrow Hover"
          className={styles.seeMoreIconHover}
        />
      </div>
    </Link>
  );
};

export default SeeMore;
