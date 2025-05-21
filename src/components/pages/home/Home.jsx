"use client";

import { useGlobalData } from "@/contexts/GlobalDataContext";

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
  const { data, filter, error, loading, updateFilter } = useGlobalData();


  return (
    <div className={styles.home}>
      <Details
        totalCourses={data.totalCourses}
        totalInstructors={data.totalInstructors}
        instructorsLoading={loading.home}
        coursesLoading={loading.home}
        ratingLoading={loading.comments}
        rating={data.comments?.result?.rating}
      />
      <WhyChooseUs />
      <OurCourses
        courses={data.filteredCourses}
        loading={loading.home}
        error={error.home}
        onChangeFilter={updateFilter}
        categories={data.categories}
        categoriesLoading={loading.home}
        categoriesError={error.home}
        filter={filter}
      />
      <Instructors
        instructors={data.instructors}
        loading={loading.home}
        error={error.home}
      />
      <PracticePortal />
      <Comments
        loading={loading.comments}
        error={error.comments}
        comments={data.comments?.result?.reviews}
      />
      <Customers
        customers={data.customers}
        loading={loading.home}
        error={error.home}
      />
      <CourseApplication courses={data.courses} />
    </div>
  );
};

export default Home;
