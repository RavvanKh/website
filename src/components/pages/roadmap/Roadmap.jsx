"use client";
import { createRef, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { useI18n } from "@/locales/client";

import {
  defaultSectionForRoadmap,
  selectSectionsAsComponentForRoadmap,
} from "@/lib/constants/selectSections";
import { filterValidSections } from "@/lib/utils/helpers/filters/filterValidSections";
import { useRoadmap } from "@/contexts/RoadmapProvider";
import { useGlobalData } from "@/contexts/GlobalDataContext";

const RoadmapTitle = dynamic(
  () => import("@/components/ui/roadmap/roadmap-title/RoadmapTitle"),
  { ssr: false, loading: () => null }
);

const SelectSection = dynamic(
  () => import("@/components/ui/training/select-section/SelectSection"),
  { ssr: false, loading: () => null }
);

const SharedSectionRenderer = dynamic(
  () =>
    import("@/components/shared/shared-section-renderer/SharedSectionRenderer"),
  { ssr: false, loading: () => null }
);

import styles from './roadmap.module.css'

const Roadmap = () => {
  const { roadmap, error, loading } = useRoadmap();
  const { data } = useGlobalData();

  const [selectedSection, setSelectedSection] = useState(
    defaultSectionForRoadmap
  );

  const t = useI18n();
  const filteredSections = filterValidSections(
    {},
    selectSectionsAsComponentForRoadmap
  );

  const sectionRefs = useMemo(() => {
    const refs = {};
    selectSectionsAsComponentForRoadmap.forEach(({ key }) => {
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

  return (
    <div className={styles.container}>
      <SharedSectionRenderer
        error={error}
        loading={loading}
        sections={selectSectionsAsComponentForRoadmap.map(
          ({ key, component }) => {
            const commonProps = { t, title: key };

            const propsMap = {
              faq: {
                faqData: [
                  {
                    question: "What is web development?",
                    answer:
                      "Web development is the process of creating and maintaining websites or web applications using technologies like HTML, CSS, JavaScript, and backend programming languages.",
                  },
                  {
                    question:
                      "What is the difference between frontend and backend?",
                    answer:
                      "Frontend refers to the part of a website users interact with, while backend handles the server-side logic, databases, and APIs.",
                  },
                  {
                    question:
                      "Do I need to know coding to become a web developer?",
                    answer:
                      "Yes, understanding coding is essential. You’ll need to learn HTML, CSS, JavaScript, and possibly other backend languages like Node.js or Python.",
                  },
                  {
                    question: "How long does it take to learn web development?",
                    answer:
                      "It depends on your dedication and learning path, but typically it takes 6 months to a year to become job-ready.",
                  },
                  {
                    question: "What tools do web developers use?",
                    answer:
                      "Common tools include code editors (like VS Code), version control (Git), browsers with dev tools, and frameworks like React or Next.js.",
                  },
                  {
                    question: "What is responsive design?",
                    answer:
                      "Responsive design ensures a website looks good and functions properly on all devices, including phones, tablets, and desktops.",
                  },
                  {
                    question: "What is an API?",
                    answer:
                      "An API (Application Programming Interface) allows different software applications to communicate with each other.",
                  },
                  {
                    question: "Is JavaScript enough to build a full website?",
                    answer:
                      "Yes, especially with tools like Node.js for the backend and frameworks like React or Vue for the frontend.",
                  },
                  {
                    question: "Do I need a degree to become a web developer?",
                    answer:
                      "No, many web developers are self-taught or come from coding bootcamps. A strong portfolio is often more important than a degree.",
                  },
                  {
                    question: "What is full-stack development?",
                    answer:
                      "Full-stack development involves working on both frontend and backend parts of a web application.",
                  },
                ],
              },
              trainingApplicationForm: {
                course: roadmap,
              },
              whereDoOurGraduatesWork: {
                subTitle: "",
                companies: data?.customers,
                loading,
                error,
              },
              graduatesHere: {
                instructors: data?.instructors,
                error,
                loading,
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
          }
        )}
        sectionRefs={sectionRefs}
        onSelectSection={setSelectedSection}
        selectedSection={selectedSection}
        topPanel={
          <>
            <RoadmapTitle roadmap={roadmap} />
          </>
        }
        leftPanel={
          <>
            <SelectSection
              t={t}
              selectedSection={selectedSection}
              onClick={handleSelectSection}
              sections={selectSectionsAsComponentForRoadmap}
            />
          </>
        }
      />
    </div>
  );
};

export default Roadmap;
