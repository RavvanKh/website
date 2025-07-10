"use client";
import { createRef, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { useI18n } from "@/locales/client";

import { useTraining } from "@/contexts/TrainingContext";

import {
  defaultSectionForTraining,
  selectSectionsAsComponentForTraining,
} from "@/lib/constants/selectSections";

import { filterValidSections } from "@/lib/utils/helpers/filters/filterValidSections";

const Loader = dynamic(() => import("@/components/shared/loader/Loader"), {
  ssr: false,
  loading: () => null,
});
const TrainingTitle = dynamic(
  () => import("@/components/ui/training/training-title/TrainingTitle"),
  { ssr: false, loading: () => null }
);
const SelectSection = dynamic(
  () => import("@/components/ui/training/select-section/SelectSection"),
  { ssr: false, loading: () => null }
);
const NextGroup = dynamic(
  () => import("@/components/shared/next-group/NextGroup"),
  { ssr: false, loading: () => null }
);

const SharedSectionRenderer = dynamic(
  () =>
    import("@/components/shared/shared-section-renderer/SharedSectionRenderer"),
  {
    ssr: false,
    loading: () => null,
  }
);

const Training = () => {
  const { training, loading, error } = useTraining();

  console.log(JSON.stringify(training));
  const [isDownloadingSyllabus, setIsDownloadingSyllabus] = useState(false);

  const [selectedSection, setSelectedSection] = useState(
    defaultSectionForTraining
  );

  const t = useI18n();

  const filteredSections = filterValidSections(
    training,
    selectSectionsAsComponentForTraining
  );

  const sectionRefs = useMemo(() => {
    const refs = {};
    filteredSections.forEach(({ key }) => {
      refs[key] = createRef();
    });
    return refs;
  }, [filteredSections]);

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sectionEntries = Object.entries(sectionRefs);
  //     let closestSection = null;
  //     let minDistance = Infinity;

  //     sectionEntries.forEach(([key, ref]) => {
  //       if (ref?.current) {
  //         const rect = ref.current.getBoundingClientRect();
  //         const distance = Math.abs(rect.top - 100);

  //         if (distance < minDistance && rect.top < window.innerHeight) {
  //           minDistance = distance;
  //           closestSection = key;
  //         }
  //       }
  //     });

  //     if (closestSection && closestSection !== selectedSection) {
  //       setSelectedSection(closestSection);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [selectedSection]);

  // if (loading) {
  //   return (
  //     <section className={styles.trainingContainer}>
  //       <div className={styles.loadingState}>
  //         <Loader />
  //       </div>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section className={styles.trainingContainer}>
  //       <div className={styles.errorState}>
  //         <p className={styles.errorTitle}>Error</p>
  //         <p className={styles.errorMessage}>{error}</p>
  //         <p className={styles.errorSubtitle}>Unable to load course details</p>
  //       </div>
  //     </section>
  //   );
  // }

  // if (!training) {
  //   return (
  //     <section className={styles.trainingContainer}>
  //       <div className={styles.loadingState}>
  //         <Loader />
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <SharedSectionRenderer
      sections={filteredSections.map(({ key, component }) => {
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
            title: "graduatesTitle",
            subTitle: "graduatesDescription",
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
            faqData: training?.faq,
          },
        };

        return {
          key,
          component,
          props: {
            ...commonProps,
            ...(propsMap[key] || {}),
          },
        };
      })}
      topPanel={<TrainingTitle training={training} />}
      loading={loading}
      error={error}
      onSelectSection={setSelectedSection}
      selectedSection={selectedSection}
      sectionRefs={sectionRefs}
      leftPanel={
        <>
          <SelectSection
            t={t}
            selectedSection={selectedSection}
            onClick={handleSelectSection}
            sections={filteredSections}
          />
          <NextGroup
            url={training?.syllabusUrl}
            nextGroup={training?.upcomingSessions?.[0]}
            isDownloadingSyllabus={isDownloadingSyllabus}
            t={t}
            onClickSyllabus={handleDownloadSyllabus}
            onClickApply={handleApply}
          />
        </>
      }
    />
  );
};

export default Training;
