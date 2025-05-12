"use client";
import React, { useEffect, useState } from "react";

import ExploreCoursesCategories from "./explore-courses-categories/ExploreCoursesCategories";
import ExploreCoursesAllCourses from "./explore-courses-all-courses/ExploreCoursesAllCourses";
import Loader from "@/components/shared/loader/Loader";

import { getCategories } from "@/lib/utils/api/categories";
import { getCourses } from "@/lib/utils/api/courses";

import styles from "./explore-courses-content.module.css";

const ExploreCoursesContent = ({ isFetch = true }) => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [errorCourses, setErrorCourses] = useState(null);

  const handleChangeCategory = (category, isMobile) => {
    if (isMobile) {
      if (selectedCategory?.key === category?.key) {
        setSelectedCategory({});
      } else {
        setSelectedCategory(category);
      }
    } else {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories(0, 100);
        setCategories(data?.content);
        setSelectedCategory(data?.content[0]);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    isFetch && fetchCategories();
  }, [isFetch]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!selectedCategory || !selectedCategory?.key) return;
      try {
        setLoadingCourses(true);
        const data = await getCourses(0, 100);
        setCourses(data?.content);
      } catch (err) {
        setErrorCourses(err?.message);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, [selectedCategory?.key]);

  return (
    <div className={styles.exploreCoursesContent}>
      <div className={styles.exploreCoursesCategories}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <Loader size="medium" color="primary" />
          </div>
        ) : error ? (
          <div className={styles.errorMessage}>
            Failed to load categories: {error}
          </div>
        ) : (
          <ExploreCoursesCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onClick={handleChangeCategory}
            courses={courses}
            loadingCourses={loadingCourses}
            errorCourses={errorCourses}
          />
        )}
      </div>
      <div className={styles.exploreCoursesAllCoursesContainer}>
        {loadingCourses ? (
          <div className={styles.loaderContainer}>
            <Loader size="medium" color="primary" />
          </div>
        ) : errorCourses ? (
          <div className={styles.errorMessage}>
            Failed to load courses: {errorCourses}
          </div>
        ) : (
          <ExploreCoursesAllCourses
            courses={courses}
            category={selectedCategory}
            showEmptyMessage={!loadingCourses && selectedCategory?.key}
          />
        )}
      </div>
    </div>
  );
};

export default ExploreCoursesContent;
