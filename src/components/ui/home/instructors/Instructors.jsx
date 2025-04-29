"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { useI18n } from "@/locales/client";

import Loader from "@/components/shared/loader/Loader";
import Instructor from "@/components/shared/instructor/Instructor";
import SeeMore from "@/components/shared/see-more/SeeMore";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./instructors.module.css";


const Instructors = ({ instructors, loading, error }) => {
  const t = useI18n();

  return (
    <section className={styles.instructors}>
      <div className={styles.instructorsContainer}>
        <div className={styles.instructorsLeft}>
          <div className={styles.instructorsLeftTitle}>
            <div>{t("energeticInstructorsWith")}</div>
            <div className={styles.instructorsLeftTitleColored}>
              {t("realWorldExperience")}
            </div>
          </div>
          <p className={styles.instructorsLeftParagraph}>
            {t("instructorsSectionParagraph")}
          </p>
          <SeeMore url="/" />
        </div>
        <div className={styles.instructorsRight}>
          {loading ? (
            <Loader size="medium" color="primary" />
          ) : error ? (
            <div className={styles.errorMessage}>
              Failed to load instructors: {error}
            </div>
          ) : (
            <div className={styles.swiperWrapper}>
              <Swiper
                modules={[Pagination]}
                slidesPerView={2}
                slidesPerGroup={2}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                  bulletClass: `swiper-bullet ${styles.bullet}`,
                  bulletActiveClass: styles.active,
                }}
                className={styles.swiper}
              >
                {instructors.map((instructor, index) => (
                  <SwiperSlide
                    key={instructor?.id}
                    style={{ height: "auto", marginBottom: "30px" }}
                  >
                    <div className={styles.instructorContainer}>
                      <Instructor instructor={instructor} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
