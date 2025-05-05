import CourseApplication from "@/components/shared/course-application/CourseApplication";
import Info from "@/components/ui/scholarship/info/Info";
import ProgramFocusAreas from "@/components/ui/scholarship/program-focus-areas/ProgramFocusAreas";
import TeachLeaders from "@/components/ui/scholarship/teach-leaders/TeachLeaders";

const Scholarship = () => {
  return (
    <section>
      <TeachLeaders />
      <ProgramFocusAreas />
      <Info />
      <CourseApplication />
    </section>
  );
};

export default Scholarship;
