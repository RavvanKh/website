'use client'
import React, { useEffect, useState } from "react";

import { getCourses } from "@/lib/utils/api/courses";
import { getRandomItems } from "@/lib/utils/helpers";

import Details from "@/components/ui/home/details/Details";
import WhyChooseUs from "@/components/ui/home/why-choose-us/WhyChooseUs";
import PopularCourses from "@/components/ui/home/popular-courses/PopularCourses";
import Instructors from "@/components/ui/home/instructors/Instructors";
import PracticePortal from "@/components/ui/home/practice-portal/PracticePortal";
import Comments from "@/components/ui/home/comments/Comments";
import Customers from "@/components/ui/home/customers/Customers";
import CourseApplication from "@/components/ui/home/course-application/CourseApplication";


const Home = () => {

  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses(0, 100);
        setCourses(data?.content);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Details />
      <WhyChooseUs />
      <PopularCourses courses = {getRandomItems(courses,4)} loading = {loading} error = {error}/>
      <Instructors />
      <PracticePortal />
      <Comments/>
      <Customers/>
      <CourseApplication courses = {courses}/>
    </>
  );
};

export default Home;
