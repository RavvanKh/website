"use client";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/locales/client";

import { getCourse } from "@/lib/utils/api/courses";

import {
  defaultSection,
  selectSectionsAsComponent,
} from "@/lib/constants/selectSections";

import { getSyllabus } from "@/lib/utils/api/syllabus";
import { getInstructors } from "@/lib/utils/api/instructors";

import Loader from "@/components/shared/loader/Loader";
import TrainingTitle from "@/components/ui/training/training-title/TrainingTitle";
import SelectSection from "@/components/ui/training/select-section/SelectSection";
import NextGroup from "@/components/shared/next-group/NextGroup";

import styles from "./training.module.css";
import { getCustomers } from "@/lib/utils/api/customers";
import { set } from "react-hook-form";
import { getRandomItems } from "@/lib/utils/helpers";
import next from "next";

const Training = ({ trainingKey }) => {
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(!!trainingKey);
  const [error, setError] = useState(null);

  const [syllabus, setSyllabus] = useState({});
  const [syllabusLoading, setSyllabusLoading] = useState(true);
  const [syllabusError, setSyllabusError] = useState(null);

  const [randomInstructors, setRandomInstructors] = useState([]);

  const [data, setData] = useState({
    instructors: [],
    companies: [],
  });

  const [loadings, setLoadings] = useState({
    instructors: false,
    companies: false,
  });

  const [errors, setErrors] = useState({
    instructors: null,
    companies: null,
  });

  const [isDownloadingSyllabus, setIsDownloadingSyllabus] = useState(false);

  const [selectedSection, setSelectedSection] = useState(defaultSection);

  const t = useI18n();

  const sectionRefs = {
    advantages: useRef(null),
    syllabus: useRef(null),
    nextGroups: useRef(null),
    graduates: useRef(null),
    companies: useRef(null),
    feedbacks: useRef(null),
    instructors: useRef(null),
    courseApplicationForm: useRef(null),
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
    if (syllabus && syllabus.link && !isDownloadingSyllabus) {
      if (source === "nextGroup") {
        setIsDownloadingSyllabus(true);
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = syllabus.driveLink;
      downloadLink.download = syllabus.name || "course-syllabus";

      downloadLink.addEventListener("abort", () =>
        setIsDownloadingSyllabus(false)
      );

      if (source === "nextGroup") {
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

  const fetchSyllabus = async (syllabusId) => {
    if (!syllabusId) return;

    try {
      setSyllabusLoading(true);
      setSyllabusError(null);
      const syllabusData = await getSyllabus(syllabusId);
      setSyllabus(syllabusData);
    } catch (err) {
      setSyllabusError(err.message);
    } finally {
      setSyllabusLoading(false);
    }
  };

  useEffect(() => {
    const fetchTraining = async () => {
      if (!trainingKey) return;

      try {
        setLoading(true);
        setError(null);
        const res = await getCourse(trainingKey);
        setTraining(res);
        if (res && res.syllabusId) {
          fetchSyllabus(res.syllabusId);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [trainingKey]);

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

  useEffect(() => {
    if (data.instructors.length > 0 && randomInstructors.length === 0) {
      setRandomInstructors(getRandomItems(data.instructors, 5));
    }
  }, [data.instructors, randomInstructors.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadings({
          instructors: true,
          companies: true,
        });
        const [instructorsRes, companiesRes] = await Promise.allSettled([
          getInstructors(0, 100),
          getCustomers(0, 100),
        ]);

        setData((prev) => ({
          ...prev,
          instructors:
            instructorsRes.status === "fulfilled"
              ? instructorsRes.value.content
              : [],
          companies:
            companiesRes.status === "fulfilled"
              ? companiesRes.value.content
              : [],
        }));

        setErrors({
          instructors:
            instructorsRes.status === "rejected" ? instructorsRes.reason : null,
          companies:
            companiesRes.status === "rejected" ? companiesRes.reason : null,
        });
      } finally {
        setLoadings({
          companies: false,
          instructors: false,
        });
      }
    };

    fetchData();
  }, []);

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
          />
          <NextGroup
            isDownloadingSyllabus={isDownloadingSyllabus}
            t={t}
            onClickSyllabus={handleDownloadSyllabus}
            onClickApply={handleApply}
          />
        </div>
        <div className={styles.trainingSectionsRight}>
          {selectSectionsAsComponent.map(
            ({ key, component: Component }, index) => {
              const commonProps = { t, title: key };

              const propsMap = {
                syllabus: {
                  syllabus,
                  loading: syllabusLoading,
                  error: syllabusError,
                },
                nextGroups: {
                  onClickApply: handleApply,
                },
                graduates: {
                  graduates: data.instructors,
                  loading: loadings.instructors,
                  error: errors.instructors,
                },
                companies: {
                  companies: data.companies,
                  loading: loadings.companies,
                  error: errors.companies,
                },
                instructors: {
                  instructors: randomInstructors,
                  loading: loadings.instructors,
                  error: errors.instructors,
                },
                courseApplicationForm: {
                  course: training,
                },
              };

              return (
                <div ref={sectionRefs[key]} key={index}>
                  <Component {...commonProps} {...(propsMap[key] || {})} />
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Training;
