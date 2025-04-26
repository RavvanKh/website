"use client";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useI18n } from "@/locales/client";

import { getComments } from "@/lib/utils/api/comments";

import Loader from "@/components/shared/loader/Loader";
import Comment from "./comment/Comment";

import styles from "./comments.module.css";
import "swiper/css";
import "swiper/css/navigation";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const t = useI18n();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await getComments();
        setComments(res?.result?.reviews);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(error?.message || "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

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
        )}
      </div>
    </section>
  );
};

export default Comments;
