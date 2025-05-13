"use client";
import React, { useEffect, useState } from "react";

import { getCourses } from "@/lib/utils/api/courses";
import { getRandomItems } from "@/lib/utils/helpers";
import { getInstructors } from "@/lib/utils/api/instructors";
import { getComments } from "@/lib/utils/api/comments";
import { getCategories } from "@/lib/utils/api/categories";

import { courseTypesEnum } from "@/lib/constants/courseTypes";

import Details from "@/components/ui/home/details/Details";
import WhyChooseUs from "@/components/ui/home/why-choose-us/WhyChooseUs";
import Instructors from "@/components/ui/home/instructors/Instructors";
import OurCourses from "@/components/ui/home/our-courses/OurCourses";
import PracticePortal from "@/components/ui/home/practice-portal/PracticePortal";
import Comments from "@/components/ui/home/comments/Comments";
import Customers from "@/components/ui/home/customers/Customers";
import CourseApplication from "@/components/shared/course-application/CourseApplication";

import styles from "./home.module.css";

const Home = () => {
  const [data, setData] = useState({
    courses: [],
    filteredCourses: [],
    categories: [],
    instructors: [],
    comments: {},
    totalCourses: 0,
    totalInstructors: 0,
  });
  const [loading, setLoading] = useState({
    courses: false,
    instructors: false,
    comments: false,
    categories: false,
    filteredCourses: false,
  });
  const [error, setError] = useState({
    courses: null,
    instructors: null,
    comments: null,
    categories: null,
    filteredCourses: null,
  });

  const [filter, setFilter] = useState({
    type: courseTypesEnum.startingSoon,
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({
          courses: true,
          instructors: true,
          comments: true,
          categories: true,
        });
        const [coursesRes, instructorsRes, commentsRes, categoriesRes] =
          await Promise.allSettled([
            getCourses(0, 100),
            getInstructors(0, 16),
            getComments(),
            getCategories(0, 100),
          ]);
        setData((prev) => ({
          ...prev,
          courses:
            coursesRes.status === "fulfilled"
              ? coursesRes.value?.content || []
              : [],
          instructors:
            instructorsRes.status === "fulfilled"
              ? instructorsRes.value?.content || []
              : [],
          comments:
            commentsRes.status === "fulfilled" ? commentsRes.value || {} : {},
          categories:
            categoriesRes.status === "fulfilled"
              ? categoriesRes.value?.content || []
              : [],
          totalCourses: coursesRes?.value?.totalElements || 0,
          totalInstructors: instructorsRes?.value?.totalElements || 0,
        }));

        setFilter((prev) => ({
          ...prev,
          category: categoriesRes.value.content[0].key,
        }));

        setError({
          courses:
            coursesRes.status === "rejected"
              ? coursesRes.reason?.message || "Failed to load customers"
              : null,
          instructors:
            instructorsRes.status === "rejected"
              ? instructorsRes.reason?.message || "Failed to load instructors"
              : null,
          comments:
            commentsRes.status === "rejected"
              ? commentsRes.reason?.message || "Failed to load comments"
              : null,
          categories:
            categoriesRes.status === "rejected"
              ? categoriesRes.reason?.message || "Failed to load categories"
              : null,
        });
      } finally {
        setLoading((prev) => ({
          ...prev,
          courses: false,
          instructors: false,
          comments: false,
          categories: false,
        }));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterCourses = async () => {
      try {
        setLoading((prev) => ({ ...prev, filteredCourses: true }));
        const res = await getCourses(1, 4);
        setData((prev) => ({ ...prev, filteredCourses: res.content }));
      } catch (err) {
        setError((prev) => ({ ...prev, filteredCourses: err?.message }));
      } finally {
        setLoading((prev) => ({ ...prev, filteredCourses: false }));
      }
    };
    if (filter.type && filter.category) {
      filterCourses();
    }
  }, [filter.type, filter.category]);

  const handleChangeFilter = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.home}>
      <Details
        totalCourses={data.totalCourses}
        totalInstructors={data.totalInstructors}
        instructorsLoading={loading.instructors}
        coursesLoading={loading.courses}
        ratingLoading={loading.comments}
        rating={data.comments?.result?.rating}
      />
      <WhyChooseUs />
      <OurCourses
        courses={data.filteredCourses}
        loading={loading.filteredCourses}
        error={error.filteredCourses}
        onChangeFilter={handleChangeFilter}
        categories={data.categories}
        categoriesLoading={loading.categories}
        categoriesError={error.categories}
        filter={filter}
      />
      <Instructors
        instructors={data.instructors}
        loading={loading.instructors}
        error={error.instructors}
      />
      <PracticePortal />
      <Comments
        loading={loading.comments}
        error={error.comments}
        comments={data.comments?.result?.reviews}
      />
      <Customers />
      <CourseApplication courses={data.courses} />
    </div>
  );
};

export default Home;
