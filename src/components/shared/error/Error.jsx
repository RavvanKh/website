"use client";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import styles from "./error.module.css";

export default function Error() {
  const t = useI18n();
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Image
          src="/icons/maintenance.svg"
          alt="Maintenance in progress"
          width={300}
          height={300}
          className={styles.image}
          priority
        />
        <h1 className={styles.title}>{t("maintenanceTitle")}</h1>
        <p className={styles.text}>
          {t("underMaintenance")} <br />
          {t("plsTryAgainInAFewMinutes")}{" "}
        </p>
      </div>
    </div>
  );
}
