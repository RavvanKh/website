import React from "react";

import Details from "@/components/ui/home/details/Details";
import WhyChooseUs from "@/components/ui/home/why-choose-us/WhyChooseUs";
import PopularCourses from "@/components/ui/home/popular-courses/PopularCourses";

const Home = () => {
  return (
    <>
      <Details />
      <WhyChooseUs />
      <PopularCourses/>
    </>
  );
};

export default Home;
