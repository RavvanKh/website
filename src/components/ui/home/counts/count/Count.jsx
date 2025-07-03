"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useI18n } from "@/locales/client";

import styles from "./count.module.css";

const Count = ({ count, isLast }) => {
  const t = useI18n();

  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count.count;
    const duration = 3000;
    const stepTime = 20;
    const increment = Math.ceil(end / (duration / stepTime));

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedCount(end);
        clearInterval(counter);
      } else {
        setAnimatedCount(start);
      }
    }, stepTime);


    return () => clearInterval(counter);
  }, [count.count]);

  const displayValue = count.isPercentage
    ? `${animatedCount.toFixed(1)}%`
    : Math.round(animatedCount);

  return (
    <div className={styles.count}>
      <div className={styles.countDetails}>
        <div className={styles.countDetailsTop}>
          <Image
            src={count.icon}
            alt={count.key}
            width={count.width}
            height={count.height}
          />
          <p className={styles.countNumber}>{displayValue}</p>
        </div>
        <p className={styles.countTitle}>{t(count.key)}</p>
      </div>
      {!isLast && <div className={styles.countLine}></div>}
    </div>
  );
};

export default Count;
