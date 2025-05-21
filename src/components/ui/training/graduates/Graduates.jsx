"use client";
import { useRef, useEffect, useState } from "react";
import Loader from "@/components/shared/loader/Loader";
import Instructor from "@/components/shared/instructor/Instructor";
import styles from "./graduates.module.css";

const Graduates = ({ t, title, error, loading, graduates }) => {
  const scrollRef = useRef(null);
  const isHovered = useRef(false);
  const isUserScrolling = useRef(false);
  const scrollInterval = useRef(null);

  useEffect(() => {
    if (!graduates || graduates.length === 0) return;
    const container = scrollRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      scrollInterval.current = setInterval(() => {
        if (!isHovered.current && !isUserScrolling.current) {
          const { scrollTop, clientHeight, scrollHeight } = container;
          const maxScroll = scrollHeight - clientHeight;

          if (scrollTop >= maxScroll - 1) {
            container.scrollTop = 0;
          } else {
            container.scrollTop = scrollTop + 0.5;
          }
        }
      }, 16);
    };

    const timeout = setTimeout(startAutoScroll, 200);

    return () => {
      clearTimeout(timeout);
      clearInterval(scrollInterval.current);
    };
  }, [graduates]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      isHovered.current = true;
      clearInterval(scrollInterval.current);
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      if (!isUserScrolling.current) {
        const timeout = setTimeout(() => {
          if (!isHovered.current && !isUserScrolling.current) {
            const newInterval = setInterval(() => {
              if (!isHovered.current && !isUserScrolling.current) {
                container.scrollTop += 0.5;
                if (
                  container.scrollTop + container.clientHeight >=
                  container.scrollHeight
                ) {
                  container.scrollTop = 0;
                }
              }
            }, 16);
            scrollInterval.current = newInterval;
          }
        }, 1500);
        return () => clearTimeout(timeout);
      }
    };

    const handleScroll = () => {
      if (!isUserScrolling.current) {
        isUserScrolling.current = true;
        clearInterval(scrollInterval.current);
      }

      clearTimeout(container.scrollTimeout);
      container.scrollTimeout = setTimeout(() => {
        isUserScrolling.current = false;
        if (!isHovered.current) {
          const newInterval = setInterval(() => {
            if (!isHovered.current && !isUserScrolling.current) {
              container.scrollTop += 0.5;
              if (
                container.scrollTop + container.clientHeight >=
                container.scrollHeight
              ) {
                container.scrollTop = 0;
              }
            }
          }, 16);
          scrollInterval.current = newInterval;
        }
      }, 1500);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(container.scrollTimeout);
      clearInterval(scrollInterval.current);
    };
  }, []);

  const firstColumn = graduates.slice(0, Math.ceil(graduates.length / 2));
  const secondColumn = graduates.slice(Math.ceil(graduates.length / 2));

  return (
    <section
      className={styles.graduates}
      style={{ justifyContent: loading ? "flex-start" : "space-between" }}
    >
      <div className={styles.graduatesLeft}>
        <div>{t(title)}</div>
        <p>{t("graduatesContent")}</p>
      </div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader size="medium" color="primary" />
        </div>
      ) : error ? (
        <div>Failed to load graduates: {error}</div>
      ) : (
        <div className={styles.graduatesListWrapper} ref={scrollRef}>
          <div className={styles.graduatesList}>
            <div className={styles.graduatesListFirstColumn}>
              {firstColumn.map(({company}, index) => (
                <div className={styles.graduate} key={index}>
                  <Instructor instructor={company} />
                </div>
              ))}
            </div>
            <div className={styles.graduatesListSecondColumn}>
              {secondColumn.map((graduate, index) => (
                <div className={styles.graduate} key={index}>
                  <Instructor instructor={graduate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Graduates;
