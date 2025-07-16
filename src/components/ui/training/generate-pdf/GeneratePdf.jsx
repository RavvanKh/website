"use client";
import { useRef } from "react";
import { useI18n } from "@/locales/client";
import { useTraining } from "@/contexts/TrainingContext";

import Advantages from "../advantages/Advantages";
import Syllabus from "../syllabus/Syllabus";
import Instructors from "../instructors/Instructors";
import RelatedCourses from "../related-courses/RelatedCourses";
import TrainingTitle from "../training-title/TrainingTitle";

import styles from "./generate-pdf.module.css";

export default function GeneratePdf() {
  const { training, error, loading } = useTraining();
  const t = useI18n();
  const pdfRef = useRef();

  const getFirstTwoSentences = (text = "") => {
    return text
      .split(/(?<=[.?!])\s+/)
      .slice(0, 2)
      .join(" ");
  };

  return (
    <div ref={pdfRef} className={styles.pdf}>
      <div className={styles.coverPage}>
        <div className={styles.trainingInfo}>
          <p className={styles.trainingDescription}>
            {getFirstTwoSentences(training?.description)}
          </p>
          <h1 className={styles.trainingTitle}>{training?.name}</h1>
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.pageContent}>
          <TrainingTitle training={training} />
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.pageContent}>
          <Advantages
            advantages={training?.advantages}
            t={t}
            title="advantages"
          />
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.pageContent}>
          <Syllabus
            t={t}
            title="trainingProgram"
            error={error}
            loading={loading}
            trainingProgram={{
              name: training?.name,
              lessons: training?.syllabus,
            }}
          />
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.pageContent}>
          <Instructors
            error={error}
            loading={loading}
            t={t}
            title="instructors"
            instructors={training?.instructors}
          />
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.pageContent}>
          <RelatedCourses
            t={t}
            title="relatedCourses"
            error={error}
            loading={loading}
            relatedCourses={training?.relatedCourses}
          />
        </div>
      </div>
    </div>
  );
}
