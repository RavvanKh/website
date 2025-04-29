"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import NavbarItems from "../navbar-items/NavbarItems";
import Apply from "../apply/Apply";

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

      {/* {isOpen && (
        <div className={styles.mobileMenu}>
          <NavbarItems />
          <Apply />
        </div>
      )} */}
    </>
  );
};

export default HamburgerMenu;
