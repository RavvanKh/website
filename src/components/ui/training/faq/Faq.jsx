"use client";
import { useState } from "react";
import styles from "./faq.module.css";
import Image from "next/image";

const Faq = ({ t, title }) => {
  const faqData = [
    {
      question: "What is the duration of the course?",
      answer:
        "The course lasts for 12 weeks with weekly live sessions and assignments.",
    },
    {
      question: "Do I get a certificate after completing the course?",
      answer:
        "Yes, you will receive a certificate of completion once you successfully finish the course.",
    },
    {
      question: "Are there any prerequisites?",
      answer:
        "Basic knowledge of programming is recommended but not mandatory.",
    },
    {
      question: "Can I access the course materials after it ends?",
      answer: "Yes, lifetime access to course materials is included.",
    },
    {
      question: "Is there any refund policy?",
      answer:
        "Yes, you can request a full refund within the first 7 days of the course.",
    },
    {
      question: "Will I have access to instructors?",
      answer:
        "Yes, instructors are available through weekly Q&A sessions and discussion forums.",
    },
  ];

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
