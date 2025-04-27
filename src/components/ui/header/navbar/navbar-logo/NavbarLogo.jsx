"use client";
import React, { useEffect, useState } from "react";
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
      <div className={styles.navbarLeft}>
        <Logo theme="light" isShownBottom={false} />
        <div className={styles.navbarLeftButton}>
          <button
            className={`${styles.navbarLeftButtonContainer} ${
              isCourseMenuOpen ? styles.navbarLeftButtonContainerOpen : ""
            }`}
            onClick={handleOpenExploreCoursesMenu}
          >
            <Image
              src={
                isCourseMenuOpen ? "/icons/grid-blue.svg" : "/icons/grid.svg"
              }
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
      </div>
      {isCourseMenuOpen && <ExploreCourses />}
    </>
  );
};

export default NavbarLogo;
