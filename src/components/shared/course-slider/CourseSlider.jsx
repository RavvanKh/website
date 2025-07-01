"use client";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Loader from "../loader/Loader";
import Course from "../course/Course";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./course-slide.module.css";

const CourseSlider = ({
  loading,
  error,
  courses,
  courseStyle,
  sliderStyle,
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!courses || courses.length === 0) return;

    const updateSlideHeights = () => {
      const slides = swiperRef.current?.querySelectorAll(".swiper-slide");
      if (!slides) return;

      let maxHeight = 0;

      slides.forEach((slide) => {
        slide.style.height = "auto";
      });

      slides.forEach((slide) => {
        const height = slide.offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });

      slides.forEach((slide) => {
        slide.style.height = `${maxHeight}px`;
      });
    };

    updateSlideHeights();
    window.addEventListener("resize", updateSlideHeights);
    return () => window.removeEventListener("resize", updateSlideHeights);
  }, [courses]);

  return loading ? (
    <div className={styles.ourCoursesLoaderContainer}>
      <Loader size="medium" color="primary" />
    </div>
  ) : error ? (
    <div className={styles.errorMessage}>
      Failed to load categories: {error}
    </div>
  ) : courses.length > sliderStyle?.slidesPerView ? (
    <div className={styles.swiperContainer} ref={swiperRef}>
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
          <SwiperSlide
            key={course?.id}
            className={styles.slide}
            style={{ maxWidth: sliderStyle?.maxWidth }}
          >
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
      className={`${styles.ourCoursesList} ${styles?.[sliderStyle?.className]}`}
    >
      {courses.map((course) => (
        <div key={course?.id} className={styles.slide}>
          <Course
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
