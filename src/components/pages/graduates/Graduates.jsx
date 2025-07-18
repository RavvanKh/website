"use client";

import { useGlobalData } from "@/contexts/GlobalDataContext";
import dynamic from "next/dynamic";

const GraduatesTitle = dynamic(
  () => import("@/components/ui/graduates/graduates-title/GraduatesTitle"),
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
const Instructors = dynamic(
  () => import("@/components/ui/about/instructors/Instructors"),
  { ssr: false, loading: () => null }
);

const Graduates = () => {
  const { data, error, loading } = useGlobalData();

  return (
    <>
      <section>
        <GraduatesTitle />
        <Instructors
          instructors={data.instructors}
          loading={loading.home}
          error={error.home}
        />
        <Customers
          title="leadingCompaniesEmployingOurGraduates"
          customers={data.customers}
          loading={loading.home}
          error={error.home}
        />
        <CourseApplication />
      </section>
    </>
  );
};

export default Graduates;
