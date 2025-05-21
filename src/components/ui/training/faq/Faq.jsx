"use client";
import Image from "next/image";
import { useState } from "react";

import styles from "./faq.module.css";


const Faq = ({ t, title,faqData }) => {

  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleItem = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };

  return (
    <section className={styles.faq}>
      <div className={styles.faqTop}>{t(title)}</div>
      <div className={styles.faqList}>
        {faqData.map((item, index) => {
          const isActive = activeIndexes.includes(index);
          return (
            <div
              key={index}
              className={`${styles.faqItem} ${
                isActive ? styles.active : styles.closed
              }`}
            >
              <div
                className={styles.faqQuestionContainer}
                onClick={() => toggleItem(index)}
              >
                <div className={styles.faqQuestion}>{item.question}</div>
                <Image
                  src={isActive ? "/icons/faq-down.svg" : "/icons/faq-up.svg"}
                  height={20}
                  width={20}
                  alt="faq"
                  loading="lazy"
                />
              </div>
              <div className={styles.faqAnswer}>{item.answer}</div>
              <div className={styles.divider} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
