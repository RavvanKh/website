'use client'
import React from "react";
import Link from "next/link";

import { useI18n } from "@/locales/client";

import styles from "./navbar-item.module.css";



const   NavbarItem =  ({ item }) => {
  const t = useI18n();

  return (
    <div className={styles.navbarItemContainer}>
      <div
        className={styles.navbarItem}
      >
        <Link href={`/${item.key}`} className={styles.navbarItemText}>
          {t(item.key)}
        </Link>
      </div>
      <span className={styles.navbarDivider} />
    </div>
  );
};

export default NavbarItem;
