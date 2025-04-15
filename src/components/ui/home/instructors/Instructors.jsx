"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./instructors.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { getInstructors } from "@/lib/utils/api/instructors";
import Loader from "@/components/shared/loader/Loader";
import Instructor from "@/components/shared/instructor/Instructor";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const t = useI18n();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getInstructors(0, 8);
        setInstructors(data?.content);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

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
          <button className={styles.instructorsLeftBtn}>
            <div>{t("seeMore")}</div>
            <Image
              src="/icons/arrow-line-right.svg"
              alt="Arrow"
              width={18}
              height={18}
            />
          </button>
        </div>
        <div className={styles.instructorsRight}>
          {loading ? (
            <Loader size="medium" color="primary" />
          ) : error ? (
            <div className={styles.errorMessage}>
              Failed to load instructors: {error}
            </div>
          ) : (
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={20}
              pagination={{
                clickable: true,
                bulletClass: `swiper-bullet ${styles.bullet}`,
                bulletActiveClass: styles.active,
              }}
              className={styles.swiper}
            >
              {instructors.map((instructor) => (
                <SwiperSlide key={instructor?.id} style={{height: 'auto',marginBottom:'30px'}}>
                  <div className={styles.instructorContainer}>
                    <Instructor instructor={instructor} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Instructors;