"use client";

import { useGlobalData } from "@/contexts/GlobalDataContext";
import dynamic from "next/dynamic";

const CourseApplication = dynamic(() => import("@/components/shared/course-application/CourseApplication"), { ssr: false, loading: () => null });
const Info = dynamic(() => import("@/components/ui/scholarship/info/Info"), { ssr: false, loading: () => null });
const ProgramFocusAreas = dynamic(() => import("@/components/ui/scholarship/program-focus-areas/ProgramFocusAreas"), { ssr: false, loading: () => null });
const StayUpdated = dynamic(() => import("@/components/ui/scholarship/stay-updated/StayUpdated"), { ssr: false, loading: () => null });
const TeachLeaders = dynamic(() => import("@/components/ui/scholarship/teach-leaders/TeachLeaders"), { ssr: false, loading: () => null });

import styles from "./scholarship.module.css";

const Scholarship = () => {
  const { data, loading, error } = useGlobalData();

  return (
    <section className={styles.scholarship}>
      <TeachLeaders />
      <ProgramFocusAreas
        loading={loading.home}
        error={error.home}
        courses={data.courses}
      />
      <Info />
      <StayUpdated />
      <CourseApplication courses={data.courses} />
    </section>
  );
};

export default Scholarship;
