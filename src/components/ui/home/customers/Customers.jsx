"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useI18n } from "@/locales/client";
import Loader from "@/components/shared/loader/Loader";
import Customer from "./customer/Customer";
import { getCustomers } from "@/lib/utils/api/customers";

import styles from "./customers.module.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const animationRef = useRef();
  const sliderContentRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const t = useI18n();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await getCustomers(0, 100);
        setCustomers(res?.content);
      } catch (error) {
        setError(error?.message || "Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const calculateSlideWidth = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.offsetWidth;
        setSlideWidth(containerWidth / 8);
      }
    };

    calculateSlideWidth();
    window.addEventListener("resize", calculateSlideWidth);

    return () => {
      window.removeEventListener("resize", calculateSlideWidth);
    };
  }, []);

  useEffect(() => {
    if (
      !customers.length ||
      !sliderRef.current ||
      !sliderContentRef.current ||
      slideWidth === 0
    )
      return;

    const customerItems = Array.from(sliderContentRef.current.children);
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

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [customers, slideWidth]);

  return (
    <section className={styles.customers}>
      <div className={styles.customersTop}>
        <div className={styles.customersTopTitle}>{t("ourCustomers")}</div>
        <Link href="/">
          <div>{t("viewAll")}</div>
          <Image
            src="/icons/arrow-top-right.svg"
            height={20}
            width={20}
            alt="Arrow"
          />
        </Link>
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
          <div className={styles.customersSliderTrack} ref={sliderContentRef}>
            {[...customers, ...customers].map((customer, index) => (
              <div
                key={`${customer?.id}-${index}`}
                className={styles.customerSlide}
                style={{ width: `${slideWidth}px` }}
              >
                <Customer customer={customer} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Customers;
