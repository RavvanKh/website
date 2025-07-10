"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./shared-section-renderer.module.css";
import Loader from "../loader/Loader";

const SharedSectionRenderer = ({
  sections = [],
  loading = false,
  error = null,
  leftPanel = null,
  topPanel = null,
  onSelectSection,
  selectedSection = "",
  sectionRefs = {},
}) => {


  useEffect(() => {
    const handleScroll = () => {
      const sectionEntries = Object.entries(sectionRefs);
      let closestSection = null;
      let minDistance = Infinity;

      sectionEntries.forEach(([key, ref]) => {
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);

          if (distance < minDistance && rect.top < window.innerHeight) {
            minDistance = distance;
            closestSection = key;
          }
        }
      });

      if (closestSection && closestSection !== selectedSection) {
        onSelectSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedSection, sectionRefs, onSelectSection]);

  if (loading) {
    return (
      <section className={styles.trainingContainer}>
        <div className={styles.loadingState}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.trainingContainer}>
        <div className={styles.errorState}>
          <p className={styles.errorTitle}>Error</p>
          <p className={styles.errorMessage}>{error}</p>
          <p className={styles.errorSubtitle}>Unable to load course details</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.training}>
      {topPanel}
      <div className={styles.trainingSections}>
        <div className={styles.trainingSectionsLeft}>{leftPanel}</div>
        <div className={styles.trainingSectionsRight}>
          {sections.map(({ key, component: Component, props }) => (
            <div key={key} ref={sectionRefs[key]}>
              <Component title={key} {...(props || {})} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharedSectionRenderer;

{
  /* <section className={styles.training}>
      <TrainingTitle training={training} />
      <div className={styles.trainingSections}>
        <div className={styles.trainingSectionsLeft}>
          <SelectSection
            t={t}
            selectedSection={selectedSection}
            onClick={handleSelectSection}
            sections={filteredSections}
          />
          <NextGroup
            url={training?.syllabusUrl}
            nextGroup={training.upcomingSessions[0]}
            isDownloadingSyllabus={isDownloadingSyllabus}
            t={t}
            onClickSyllabus={handleDownloadSyllabus}
            onClickApply={handleApply}
          />
        </div>
        <div className={styles.trainingSectionsRight}>
          {filteredSections.map(({ key, component: Component }, index) => {
            const commonProps = { t, title: key };

            const propsMap = {
              advantages: {
                advantages: training?.advantages,
              },
              trainingProgram: {
                trainingProgram: {
                  name: training?.name,
                  lessons: training?.syllabus,
                },
                loading,
                error,
              },
              upcomingGroups: {
                onClickApply: handleApply,
                upcomingGroups: training?.upcomingSessions,
              },
              graduates: {
                graduates: training?.graduates,
                loading,
                error,
              },
              companies: {
                companies: training?.graduatesWorkplaces,
                loading,
                error,
              },
              instructors: {
                instructors: training?.instructors,
                loading,
                error,
              },
              courseApplicationForm: {
                course: training,
              },
              relatedCourses: {
                relatedCourses: training?.relatedCourses,
                loading,
                error,
              },
              faq: {
                faqData: training.faq,
              },
            };

            return (
              <div ref={sectionRefs[key]} key={index}>
                <Component {...commonProps} {...(propsMap[key] || {})} />
              </div>
            );
          })}
        </div>
      </div>
    </section> */
}
