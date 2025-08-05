"use client";

import { useGlobalData } from "@/contexts/GlobalDataContext";
import styles from "./instructors.module.css";
import dynamic from "next/dynamic";

const InstructorsTitle = dynamic(
  () => import("@/components/ui/instructors/InstructorsTitle"),
  { ssr: false, loading: () => null }
);

const Instructors = dynamic(
  () => import("@/components/ui/about/instructors/Instructors"),
  { ssr: false, loading: () => null }
);

const Customers = dynamic(
  () => import("@/components/ui/home/customers/Customers"),
  { ssr: false, loading: () => null }
);

const CourseApplication = dynamic(
  () => import("@/components/shared/course-application/CourseApplication"),
  { ssr: false, loading: () => null }
);

const InstructorsPage = () => {
  const { data, error, loading } = useGlobalData();

  return (
    <>
      <section className={styles.instructors}>
        <InstructorsTitle />
        <Instructors
          instructors={data.instructors}
          loading={loading.home}
          error={error.home}
        />
        <Customers
          title="leadingCompaniesEmployingOurinstructors"
          customers={data.customers}
          loading={loading.home}
          error={error.home}
        />
        <CourseApplication formContinue={true} />
      </section>
    </>
  );
};

export default InstructorsPage;
