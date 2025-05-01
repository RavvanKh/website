"use client";
import React, { useEffect, useState } from "react";

import { getCourses } from "@/lib/utils/api/courses";
import { getRandomItems } from "@/lib/utils/helpers";
import { getInstructors } from "@/lib/utils/api/instructors";
import { getComments } from "@/lib/utils/api/comments";

import Details from "@/components/ui/home/details/Details";
import WhyChooseUs from "@/components/ui/home/why-choose-us/WhyChooseUs";
import PopularCourses from "@/components/ui/home/popular-courses/PopularCourses";
import Instructors from "@/components/ui/home/instructors/Instructors";
import PracticePortal from "@/components/ui/home/practice-portal/PracticePortal";
import Comments from "@/components/ui/home/comments/Comments";
import Customers from "@/components/ui/home/customers/Customers";
import CourseApplication from "@/components/ui/home/course-application/CourseApplication";

import styles from "./home.module.css";

const Home = () => {
  const [data, setData] = useState({
    courses: [],
    instructors: [],
    comments: {},
    totalCourses: 0,
    totalInstructors: 0,
  });
  const [loading, setLoading] = useState({
    courses: false,
    instructors: false,
    comments: false,
  });
  const [error, setError] = useState({
    courses: null,
    instructors: null,
    comments: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ courses: true, instructors: true, comments: true });
        const [coursesRes, instructorsRes, commentsRes] =
          await Promise.allSettled([
            getCourses(0, 100),
            getInstructors(0, 16),
            getComments(),
          ]);
        setData({
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
          totalCourses: coursesRes?.value?.totalElements || 0,
          totalInstructors: instructorsRes?.value?.totalElements || 0,
        });

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
        });
      } finally {
        setLoading((prev) => ({
          ...prev,
          courses: false,
          instructors: false,
          comments: false,
        }));
      }
    };
    fetchData();
  }, []);

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
      <PopularCourses
        courses={getRandomItems(data.courses, 3)}
        loading={loading.courses}
        error={error.courses}
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
