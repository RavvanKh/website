import React from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import styles from "./box.module.css";

const Box = ({ iconSrc, title, detail, width = "244px" }) => {
  const t = useI18n();
  return ( 
    <div className={styles.infoRightBoxes} style={{ width: width }}>
      <Image
        src={iconSrc}
        height={48}
        width={48}
        alt={t(title)}
        loading="lazy"
      />
      <div className={styles.infoRightBoxesDetails}>
        <div className={styles.infoRightBoxesDetailsTitle}>{t(title)}</div>
        <p className={styles.infoRightBoxesDetailsDetail}>{detail}</p>
      </div>
    </div>
  );
};

export default Box;
