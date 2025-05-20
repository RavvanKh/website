"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useI18n } from "@/locales/client";

import Loader from "@/components/shared/loader/Loader";
import Course from "@/components/shared/course/Course";
import ExploreFullCatalog from "@/components/shared/explore-full-catalog/ExploreFullCatalog";
import CourseTypes from "./course-types/CourseTypes";
import CategoriesSlider from "./categories-slider/CategoriesSlider";

import styles from "./our-courses.module.css";

const OurCourses = ({
  courses,
  loading,
  error,
  onChangeFilter,
  categories,
  categoriesError,
  categoriesLoading,
  filter,
}) => {
  const t = useI18n();

  return (
    <section className={styles.ourCourses}>
      <div className={styles.ourCoursesTop}>
        <div className={styles.ourCoursesTitle}>{t("ourCoursesTitle")}</div>
        <div className={styles.ourCoursesDescription}>
          {t("ourCoursesDescription")}
        </div>
      </div>
      <CourseTypes t={t} selectedType={filter.type} onClick={onChangeFilter} />
      <CategoriesSlider
        categories={categories}
        selectedCategory={filter.category}
        onClick={onChangeFilter}
        loading={categoriesLoading}
        error={categoriesError}
      />
      {loading ? (
        <div className={styles.ourCoursesLoaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          Failed to load categories: {error}
        </div>
      ) : courses.length > 4 ? (
        <div className={styles.swiperContainer}>
          <div className={`${styles.customNav} ${styles.customPrev}`}>
            <FaArrowLeft color="#FFFFFF" size={14} />
          </div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={4}
            navigation={{
              prevEl: `.${styles.customPrev}`,
              nextEl: `.${styles.customNext}`,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className={styles.swiper}
          >
            {courses.map((course) => (
              <SwiperSlide key={course?.id} className={styles.slide}>
                <Course
                  imgHeight="200px"
                  imgWidth="100%"
                  duration={true}
                  lines={4}
                  levelPosition="top"
                  direction="column"
                  course={course}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={`${styles.customNav} ${styles.customNext}`}>
            <FaArrowRight color="#FFFFFF" size={14} />
          </div>
        </div>
      ) : (
        <div className={styles.ourCoursesList}>
          {courses.map((course) => (
            <div key={course?.id} className={styles.slide}>
              <Course
                imgHeight="200px"
                imgWidth="100%"
                duration={true}
                lines={4}
                levelPosition="top"
                direction="column"
                course={course}
              />
            </div>
          ))}
        </div>
      )}

      <div className={styles.exploreFullCatalogContainer}>
        <ExploreFullCatalog t={t} url="/trainings" />
      </div>
    </section>
  );
};

export default OurCourses;
