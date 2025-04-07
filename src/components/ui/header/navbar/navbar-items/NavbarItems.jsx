import React from "react";

import NavbarItem from "../navbar-item/NavbarItem";

import { navbarItems } from "@/data/navbar";

import styles from "./navbar-items.module.css";


const NavbarItems = () => {
  return (
    <div className={styles.navbarItems}>
      {navbarItems.map((item) => (
        <NavbarItem  key={item.key} item={item} />
      ))}
    </div>
  );
};

export default NavbarItems;
