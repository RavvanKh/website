import React from "react";

import Details from "@/components/ui/home/details/Details";
import WhyChooseUs from "@/components/ui/home/why-choose-us/WhyChooseUs";
import PopularCourses from "@/components/ui/home/popular-courses/PopularCourses";
import Instructors from "@/components/ui/home/instructors/Instructors";
import PracticePortal from "@/components/ui/home/practice-portal/PracticePortal";
import Comments from "@/components/ui/home/comments/Comments";
import Customers from "@/components/ui/home/customers/Customers";

const Home = () => {
  return (
    <>
      <Details />
      <WhyChooseUs />
      <PopularCourses />
      <Instructors />
      <PracticePortal />
      <Comments/>
      <Customers/>
    </>
  );
};

export default Home;
