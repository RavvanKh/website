import React from "react";

import Details from "@/components/ui/home/details/Details";
import WhyChooseUs from "@/components/ui/home/why-choose-us/WhyChooseUs";
import PopularCourses from "@/components/ui/home/popular-courses/PopularCourses";
import Instructors from "@/components/ui/home/instructors/Instructors";
import PracticePortal from "@/components/ui/home/practice-portal/PracticePortal";
import Comments from "@/components/ui/home/comments/Comments";

const Home = () => {
  return (
    <>
      <Details />
      <WhyChooseUs />
      <PopularCourses />
      <Instructors />
      <PracticePortal />
      <Comments/>
    </>
  );
};

export default Home;
