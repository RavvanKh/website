import React from "react";

import Category from "../category/Category";

import styles from "./categories.module.css";

const Categories = ({ categories }) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <Category key={category?.key} category={category} />
      ))}
    </div>
  );
};

export default Categories;
