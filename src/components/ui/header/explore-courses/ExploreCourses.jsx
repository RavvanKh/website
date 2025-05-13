"use client";
import React, { useState } from "react";

import ExploreCoursesHeader from "./explore-courses-header/ExploreCoursesHeader";
import ExploreCoursesContent from "./explore-courses-content/ExploreCoursesContent";

import { exploreCoursesConfig } from "@/lib/constants/exploreCoursesSections";

import styles from "./explore-courses.module.css";

const ExploreCourses = ({ onClose }) => {
  const [selectedSection, setSelectedSection] = useState(
    exploreCoursesConfig.defaultSection
  );

  const handleChangeSection = (item) => {
    setSelectedSection(item);
  };

  return (
    <section className={styles.exploreCoursesContainer}>
      <div className={styles.exploreCoursesBox}>
        <ExploreCoursesHeader
          selectedSection={selectedSection}
          onClick={handleChangeSection}
        />
        <ExploreCoursesContent onClose={onClose} isFetch={true} />
      </div>
    </section>
  );
};

export default ExploreCourses;