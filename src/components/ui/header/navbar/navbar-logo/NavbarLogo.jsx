'use client'
import React from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import styles from './navbar-logo.module.css'

const NavbarLogo = () => {
    const t = useI18n()
  return (
    <div className={styles.navbarLeft}>
      <div className={styles.navbarLogo}>
        <Image
          src="/icons/logo.svg"
          height={50}
          width={50}
          alt="Ingress Academy Logo"
          priority

        />
        <div className={styles.navbarLogoText}>
          <div className={styles.navbarLogoTextContainer}>
            <span className={styles.navbarLogoTextLeft}>Ingress</span>
            <span className={styles.navbarLogoTextRight}>Academy</span>
          </div>
          <div className={styles.navbarLogoTextBottom}>
            empowered by innovation
          </div>
        </div>
      </div>
      <div className={styles.navbarLeftButton}>
        <button className={styles.navbarLeftButtonContainer}>
          <Image src="/icons/grid.svg" loading="lazy" height={14} width={14} alt="Grid" />
          <div className={styles.navbarLeftButtonText}>
            {t("exploreCourses")}
          </div>
          <Image
            src="/icons/arrow-down.svg"
            height={14}
            width={8}
            alt="Arrow down"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
};

export default NavbarLogo;
