"use client";
import React, { useState } from "react";

import ExploreCoursesHeader from "./explore-courses-header/ExploreCoursesHeader";
import ExploreCoursesContent from "./explore-courses-content/ExploreCoursesContent";

import { exploreCoursesConfig } from "@/data/exploreCoursesSections";

import styles from "./explore-courses.module.css";

const ExploreCourses = () => {
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
        <ExploreCoursesContent />
      </div>
    </section>
  );
};

export default ExploreCourses;
