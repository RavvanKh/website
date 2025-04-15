import React from "react";

import Details from "@/components/ui/home/details/Details";
import WhyChooseUs from "@/components/ui/home/why-choose-us/WhyChooseUs";
import PopularCourses from "@/components/ui/home/popular-courses/PopularCourses";
import Instructors from "@/components/ui/home/instructors/Instructors";

const Home = () => {
  return (
    <>
      <Details />
      <WhyChooseUs />
      <PopularCourses/>
      <Instructors/>
    </>
  );
};

export default Home;
