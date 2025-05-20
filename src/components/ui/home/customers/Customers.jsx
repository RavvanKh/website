"use client";
import React, { useEffect, useState, useRef } from "react";

import { useI18n } from "@/locales/client";

import { getCustomers } from "@/lib/utils/api/customers";

import Loader from "@/components/shared/loader/Loader";
import Customer from "./customer/Customer";
import SeeMore from "@/components/shared/see-more/SeeMore";

import styles from "./customers.module.css";

const Customers = ({customers,loading,error}) => {
  const sliderRef = useRef(null);
  const animationRef = useRef();
  const sliderContentRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const t = useI18n();

  useEffect(() => {
    const calculateSlideWidth = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.offsetWidth;
        setSlideWidth(containerWidth / 8);
        setIsMobile(window.innerWidth <= 1024);
      }
    };

    calculateSlideWidth();
    window.addEventListener("resize", calculateSlideWidth);
    return () => window.removeEventListener("resize", calculateSlideWidth);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      if (
        !customers.length ||
        !sliderRef.current ||
        !sliderContentRef.current ||
        slideWidth === 0
      )
        return;

      const totalWidth = slideWidth * customers.length;

      sliderContentRef.current.style.width = `${totalWidth * 2}px`;

      let position = 0;
      const speed = 2;

      const animate = () => {
        position -= speed;

        if (position <= -totalWidth) {
          position = 0;
        }

        if (sliderContentRef.current) {
          sliderContentRef.current.style.transform = `translateX(${position}px)`;
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [customers, slideWidth, isMobile]);

  const displayedCustomers = isMobile ? customers.slice(0, 8) : customers;

  return (
    <section className={styles.customers}>
      <div className={styles.customersTop}>
        <div className={styles.customersTopTitle}>{t("ourCustomers")}</div>
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
        <div className={styles.customersSliderContainer} ref={sliderRef}>
          <div
            className={styles.customersSliderTrack}
            style={{
              gridTemplateColumns: isMobile
                ? ""
                : `repeat(${customers.length * 2},1fr)`,
            }}
            ref={sliderContentRef}
          >
            {displayedCustomers.map((customer, index) => (
              <div
                key={`${customer?.id}-${index}`}
                className={styles.customerSlide}
                style={{ width: isMobile ? "100%" : `${slideWidth}px` }}
              >
                <Customer customer={customer} />
              </div>
            ))}
          </div>
        </div>
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
