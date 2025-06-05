"use client";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/locales/client";

import { useTraining } from "@/contexts/TrainingContext";

import { defaultSection } from "@/lib/constants/selectSections";

import { filterValidSections } from "@/lib/utils/helpers/filters/filterValidSections";

import Loader from "@/components/shared/loader/Loader";
import TrainingTitle from "@/components/ui/training/training-title/TrainingTitle";
import SelectSection from "@/components/ui/training/select-section/SelectSection";
import NextGroup from "@/components/shared/next-group/NextGroup";

import styles from "./training.module.css";

const Training = () => {
  const { training, loading, error } = useTraining();

  const [isDownloadingSyllabus, setIsDownloadingSyllabus] = useState(false);

  const [selectedSection, setSelectedSection] = useState(defaultSection);

  const t = useI18n();

  const filteredSections = filterValidSections(training);

  const sectionRefs = {
    advantages: useRef(null),
    trainingProgram: useRef(null),
    upcomingGroups: useRef(null),
    graduates: useRef(null),
    companies: useRef(null),
    feedbacks: useRef(null),
    instructors: useRef(null),
    courseApplicationForm: useRef(null),
    faq: useRef(null),
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);

    const ref = sectionRefs[section];
    if (ref?.current) {
      const offset = 80;
      const elementTop =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const scrollTo = elementTop - offset;

      window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const handleDownloadSyllabus = (source = "default") => {
    if (
      training?.syllabus.length > 0 &&
      training?.syllabusUrl &&
      !isDownloadingSyllabus
    ) {
      if (source === "upcomingGroup") {
        setIsDownloadingSyllabus(true);
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = training?.syllabusUrl;
      downloadLink.download = training?.name || "course-syllabus";

      downloadLink.addEventListener("abort", () =>
        setIsDownloadingSyllabus(false)
      );

      if (source === "upcomingGroup") {
        setTimeout(() => {
          setIsDownloadingSyllabus(false);
        }, 2000);
      }

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("Syllabus or drive link not available");
    }
  };

  const handleApply = () => {
    handleSelectSection("courseApplicationForm");
  };

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
        setSelectedSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedSection]);

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

  if (!training) {
    return (
      <section className={styles.trainingContainer}>
        <div className={styles.loadingState}>
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.training}>
      <TrainingTitle training={training} />
      <div className={styles.trainingSections}>
        <div className={styles.trainingSectionsLeft}>
          <SelectSection
            t={t}
            selectedSection={selectedSection}
            onClick={handleSelectSection}
            sections={filteredSections}
          />
          {Object.keys(training?.upcomingSessions).length > 0 && (
            <NextGroup
              nextGroup={training.upcomingSessions[0]}
              isDownloadingSyllabus={isDownloadingSyllabus}
              t={t}
              onClickSyllabus={handleDownloadSyllabus}
              onClickApply={handleApply}
            />
          )}
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
    </section>
  );
};

export default Training;
