"use client";
import { useState } from "react";

import { locales } from "@/lib/constants/locales";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

import styles from "./change-locale.module.css";

const ChangeLocale = () => {
  const changeLocale = useChangeLocale();
  const currentLocale = locales.find(
    (locale) => locale.code === useCurrentLocale()
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.localeSwitcher}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.flag}>{currentLocale.flag}</span>
        <span className={styles.label}>{currentLocale.label}</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {locales.map((locale) => (
            <li
              key={locale.code}
              className={`${styles.item} ${
                locale.code === currentLocale.code ? styles.active : ""
              }`}
              onClick={() => changeLocale(locale.code)}
            >
              <span className={styles.flag}>{locale.flag}</span>
              <span className={styles.label}>{locale.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChangeLocale;
