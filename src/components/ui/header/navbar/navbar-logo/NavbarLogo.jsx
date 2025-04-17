"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import Logo from "@/components/shared/logo/Logo";
import ExploreCourses from "../../explore-courses/ExploreCourses";

import styles from "./navbar-logo.module.css";

const NavbarLogo = () => {
  const t = useI18n();

  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);

  const handleOpenExploreCoursesMenu = () => {
    setIsCourseMenuOpen(!isCourseMenuOpen);
  };

  useEffect(() => {
    if (isCourseMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCourseMenuOpen]);

  return (
    <>
      <Link href="/" rel="Home" className={styles.navbarLeft}>
        <div className={styles.navbarLogo}>
          <Logo />
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
          <button
            className={`${styles.navbarLeftButtonContainer} ${
              isCourseMenuOpen ? styles.navbarLeftButtonContainerOpen : ""
            }`}
            onClick={handleOpenExploreCoursesMenu}
          >
            <Image
              src={isCourseMenuOpen ? "/icons/grid-blue.svg" : "/icons/grid.svg"}
              loading="lazy"
              height={14}
              width={14}
              alt="Grid"
            />
            <div className={styles.navbarLeftButtonText}>
              {t("exploreCourses")}
            </div>
            <Image
              src={
                isCourseMenuOpen
                  ? "/icons/arrow-up.svg"
                  : "/icons/arrow-down.svg"
              }
              height={14}
              width={8}
              alt="Arrow down"
              loading="lazy"
            />
          </button>
        </div>
      </Link>
      {isCourseMenuOpen && <ExploreCourses />}
    </>
  );
};

export default NavbarLogo;
