"use client";
import React, { useEffect, useState } from "react";

import { getCourses } from "@/lib/utils/api/courses";
import { getRandomItems } from "@/lib/utils/helpers";
import { getInstructors } from "@/lib/utils/api/instructors";

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
  const [data, setData] = useState({ courses: [], instructors: [] });
  const [loading, setLoading] = useState({
    courses: false,
    instructors: false,
  });
  const [error, setError] = useState({ courses: null, instructors: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({courses: true, instructors: true});
        const [coursesRes, instructorsRes] = await Promise.allSettled([
          getCourses(0, 100),
          getInstructors(0, 16),
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
        });
      } finally {
        setLoading((prev) => ({
          ...prev,
          courses: false,
          instructors: false,
        }));
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      <Details totalCourses={data.courses} />
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
      <Comments/>
      <Customers />
      <CourseApplication courses={data.courses} />
    </div>
  );
};

export default Home;
