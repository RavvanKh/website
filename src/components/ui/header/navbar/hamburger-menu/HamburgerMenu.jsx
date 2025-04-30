"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import CourseSubjects from "../../course-subjects/CourseSubjects";
import NavbarItems from "../navbar-items/NavbarItems";
import ContactSocials from "@/components/shared/contact-socials/ContactSocials";

import styles from "./hamburger-menu.module.css";


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileNavbarContent}>
          <div className={styles.mobileNavbarTop}>
            <CourseSubjects isFetch = {isOpen} />
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
