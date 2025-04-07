import React from "react";
import Link from "next/link";

import { getI18n } from "@/locales/server";

import styles from "./navbar-item.module.css";


const NavbarItem = async ({ item }) => {
  const t = await getI18n();

  return (
    <div className={styles.navbarItemContainer}>
      <div
        className={styles.navbarItem}
      >
        <Link href={`${item.key}`} className={styles.navbarItemText}>
          {t(item.key)}
        </Link>
      </div>
      <span className={styles.navbarDivider} />
    </div>
  );
};

export default NavbarItem;
