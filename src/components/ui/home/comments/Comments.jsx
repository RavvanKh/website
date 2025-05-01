"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useI18n } from "@/locales/client";

import Loader from "@/components/shared/loader/Loader";
import Comment from "./comment/Comment";

import styles from "./comments.module.css";
import "swiper/css";
import "swiper/css/navigation";

const Comments = ({ comments = [], loading, error }) => {
  const t = useI18n();

  return (
    <section className={styles.comments}>
      <div className={styles.commentsTitle}>{t("whatOurStudentsSay")}</div>
      <div className={styles.commentsSlider}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <Loader size="medium" color="primary" />
          </div>
        ) : error ? (
          <div className={styles.errorMessage}>
            Failed to load comments: {error}
          </div>
        ) : (
          <>
            <div className={styles.swiperContainer}>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView="auto"
              centeredSlides={true}
              initialSlide={1}
              loop={true}
              pagination={{
                clickable: true,
                bulletClass: `swiper-bullet ${styles.bullet}`,
                bulletActiveClass: styles.active,
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              className={styles.mySwiper}
            >
              {comments.map((comment) => (
                <SwiperSlide key={comment.id} className={styles.swiperSlide}>
                  <Comment comment={comment} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className={`custom-prev ${styles.customNav} ${styles.customPrev}`}
            >
              <FaArrowLeft size={20} color="white" />
            </div>
            <div
              className={`custom-next ${styles.customNav} ${styles.customNext}`}
            >
              <FaArrowRight size={20} color="white" />
            </div>
          </div>
          <div className={styles.mobileSwiper}>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView="auto"
              centeredSlides={true}
              initialSlide={1}
              spaceBetween={20}
              loop={true}
              pagination={{
                clickable: true,
                bulletClass: `swiper-bullet ${styles.bullet}`,
                bulletActiveClass: styles.active,
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              className={styles.mySwiper}
            >
              {comments.map((comment) => (
                <SwiperSlide key={comment.id} className={styles.mobileSwiperSlide}>
                  <Comment comment={comment} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className={`custom-prev ${styles.customNav} ${styles.customPrev}`}
            >
              <FaArrowLeft size={20} color="white" />
            </div>
            <div
              className={`custom-next ${styles.customNav} ${styles.customNext}`}
            >
              <FaArrowRight size={20} color="white" />
            </div>
          </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Comments;
