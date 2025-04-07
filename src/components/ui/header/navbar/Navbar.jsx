import React from "react";

import NavbarLogo from "./navbar-logo/NavbarLogo";
import NavbarItems from "./navbar-items/NavbarItems";
import Apply from "./apply/Apply";

import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavbarLogo />
      <div className={styles.navbarRightContainer}>
        <NavbarItems />
        <Apply />
      </div>
    </nav>
  );
};

export default Navbar;
