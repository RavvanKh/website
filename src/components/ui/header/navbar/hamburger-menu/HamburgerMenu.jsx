"use client";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import CourseSubjects from "../../course-subjects/CourseSubjects";
import NavbarItems from "../navbar-items/NavbarItems";
import ContactSocials from "@/components/shared/contact-socials/ContactSocials";

import styles from "./hamburger-menu.module.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={styles.hamburgerButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`${styles.mobileNavbar} ${
          isOpen ? styles.mobileNavbarOpen : ""
        }`}
      >
        <div className={styles.mobileNavbarContent}>
          <div className={styles.mobileNavbarTop}>
            <CourseSubjects onClose={() => setIsOpen(false)} isFetch={isOpen} />
            <NavbarItems />
          </div>
          <div className={styles.mobileNavbarSocials}>
            <ContactSocials />
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
