"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Loader from "../loader/Loader";
import Course from "../course/Course";

import styles from "./course-slide.module.css";

const CourseSlider = ({
  loading,
  error,
  courses,
  courseStyle,
  sliderStyle,
}) => {
  return loading ? (
    <div className={styles.ourCoursesLoaderContainer}>
      <Loader size="medium" color="primary" />
    </div>
  ) : error ? (
    <div className={styles.errorMessage}>
      Failed to load categories: {error}
    </div>
  ) : courses.length > sliderStyle?.slidesPerView ? (
    <div className={styles.swiperContainer}>
      <div className={`${styles.customNav} ${styles.customPrev}`}>
        <FaArrowLeft color="#FFFFFF" size={14} />
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={18}
        slidesPerView={sliderStyle?.slidesPerView}
        navigation={{
          prevEl: `.${styles.customPrev}`,
          nextEl: `.${styles.customNext}`,
        }}
        breakpoints={sliderStyle?.breakpoints}
        className={styles.swiper}
      >
        {courses.map((course) => (
          <SwiperSlide key={course?.id} className={styles.slide}>
            <Course
              duration={true}
              lines={3}
              levelPosition="top"
              direction="column"
              course={course}
              courseStyle={courseStyle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${styles.customNav} ${styles.customNext}`}>
        <FaArrowRight color="#FFFFFF" size={14} />
      </div>
    </div>
  ) : (
    <div
      className={styles.ourCoursesList}
      style={{
        gridTemplateColumns: `repeat(${sliderStyle?.slidesPerView}, 1fr)`,
      }}
    >
      {courses.map((course) => (
        <div key={course?.id} className={styles.slide}>
          <Course
            imgHeight="200px"
            imgWidth="100%"
            duration={true}
            lines={3}
            levelPosition="top"
            direction="column"
            course={course}
            courseStyle={courseStyle}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseSlider;
