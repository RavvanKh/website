"use client";
import React, { useEffect, useState, useRef } from "react";

import { useI18n } from "@/locales/client";

import { CUSTOMER_STYLES } from "@/lib/constants/customer-styles";

import Loader from "@/components/shared/loader/Loader";
import Customer from "./customer/Customer";
import SeeMore from "@/components/shared/see-more/SeeMore";

import styles from "./customers.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const Customers = ({ customers, loading, error }) => {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const t = useI18n();

  useEffect(() => {
    const calculateSlideWidth = () => {
      if (sliderRef.current) {
        setIsMobile(window.innerWidth <= 1024);
      }
    };

    calculateSlideWidth();
    window.addEventListener("resize", calculateSlideWidth);
    return () => window.removeEventListener("resize", calculateSlideWidth);
  }, []);

  const displayedCustomers = isMobile ? customers.slice(0, 8) : customers;

  return (
    <section className={styles.customers}>
      <div className={styles.customersTop}>
        <h2 className={styles.customersTopTitle}>{t("ourCustomers")}</h2>
        <div
          className={`${
            !isMobile ? styles.customersBtnShown : styles.customersBtnHide
          }`}
        >
          <SeeMore url="/" />
        </div>
      </div>
      {loading ? (
        <div className={styles.customerLoaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          Failed to load customers: {error}
        </div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={isMobile ? 2 : 8}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={4000}
          allowTouchMove={false}
          style={{ width: "100%" }}
        >
          {displayedCustomers.map((customer, index) => (
            <SwiperSlide key={customer?.id || index}>
              <Customer customer={customer} style={CUSTOMER_STYLES.homePage} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
        className={`${
          isMobile ? styles.customersBtnShown : styles.customersBtnHide
        }`}
      >
        <SeeMore url="/" />
      </div>
    </section>
  );
};

export default Customers;
