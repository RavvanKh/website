"use client";
import Link from "next/link";

import { useI18n } from "@/locales/client";

import { routes } from "@/lib/constants/routes";

import styles from "./apply.module.css";


const Apply = () => {
  const t = useI18n();
  return (
    <Link href={routes.trainingApplication} className={styles.navbarItemText}>
      {t("applyNow")}
    </Link>
  );
};

export default Apply;
