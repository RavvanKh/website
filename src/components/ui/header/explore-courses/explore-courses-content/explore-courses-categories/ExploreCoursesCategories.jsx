"use client";
import React from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import styles from "./explore-courses-categories.module.css";

const ExploreCoursesCategories = ({
  categories,
  onClick,
  selectedCategory,
}) => {
  const t = useI18n();

  return (
    <div className={styles.exploreCoursesCategories}>
      <p className={styles.exploreCoursesCategoriesTitle}>{t("subjects")}</p>
      <div className={styles.exploreCoursesCategoriesContent}>
        {categories.map((category) => (
          <div
            key={category?.key}
            className={`${styles.exploreCoursesCategoriesCategory} ${
              selectedCategory?.key === category?.key
                ? styles.exploreCoursesCategoriesCategorySelected
                : ""
            }`}
            onClick={() => onClick(category)}
          >
            <div className={styles.exploreCoursesCategoriesName}>
              {category.name}
            </div>
            <Image
            className={styles.exploreCoursesCategoriesArrow}
              src="/icons/arrow-right.svg"
              height={12}
              width={12}
              alt="Arrow right"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCoursesCategories;
