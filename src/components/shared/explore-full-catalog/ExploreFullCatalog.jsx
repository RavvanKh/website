import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from './explore-full-catalog.module.css';


const ExploreFullCatalog = ({url,t}) => {
  return (
    <Link href={url} className={styles.subjectAreasExploreFullCatalog}>
      <div className={styles.subjectAreasExploreFullCatalogContent}>
        {t("exploreFullCatalog")}
      </div>
      <Image
        src="/icons/arrow-top-right.svg"
        height={20}
        width={20}
        alt="Arrow"
      />
    </Link>
  );
};

export default ExploreFullCatalog;
