import React from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import Loader from "@/components/shared/loader/Loader";

import styles from "./box.module.css";


const Box = ({ iconSrc, title, detail, loading = false }) => {
  const t = useI18n();

  const renderDetail = () => {
    if (loading) {
      return <Loader size="small" />;
    }
    if (detail === 0 && !loading) {
      return null;
    }
    return detail;
  };

  return (
    <div className={styles.infoRightBoxes}>
      <Image
      className={styles.infoRightBoxesImg}
        src={iconSrc}
        height={48}
        width={48}
        alt={t(title)}
        loading="lazy"
      />
      <div className={styles.infoRightBoxesDetails}>
        <div className={styles.infoRightBoxesDetailsTitle}>{t(title)}</div>
        <div className={styles.infoRightBoxesDetailsDetail}>
          {renderDetail()}
        </div>
      </div>
    </div>
  );
};

export default Box;
