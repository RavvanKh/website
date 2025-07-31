import dynamic from "next/dynamic";

const CourseApplicationForm = dynamic(
  () =>
    import("@/components/shared/course-application-form/CourseApplicationForm"),
  { ssr: false, loading: () => null }
);
const Comments = dynamic(
  () => import("@/components/ui/home/comments/Comments"),
  { ssr: false, loading: () => null }
);
const Advantages = dynamic(
  () => import("@/components/ui/training/advantages/Advantages"),
  { ssr: false, loading: () => null }
);
const Companies = dynamic(
  () => import("@/components/ui/training/companies/Companies"),
  { ssr: false, loading: () => null }
);
const Faq = dynamic(() => import("@/components/ui/training/faq/Faq"), {
  ssr: false,
  loading: () => null,
});
const Graduates = dynamic(
  () => import("@/components/ui/training/graduates/Graduates"),
  { ssr: false, loading: () => null }
);
const Instructors = dynamic(
  () => import("@/components/ui/training/instructors/Instructors"),
  { ssr: false, loading: () => null }
);
const NextGroups = dynamic(
  () => import("@/components/ui/training/next-groups/NextGroups"),
  { ssr: false, loading: () => null }
);
const RelatedCourses = dynamic(
  () => import("@/components/ui/training/related-courses/RelatedCourses"),
  { ssr: false, loading: () => null }
);
const Syllabus = dynamic(
  () => import("@/components/ui/training/syllabus/Syllabus"),
  { ssr: false, loading: () => null }
);

const RolesResponsibilities = dynamic(
  () =>
    import(
      "@/components/ui/roadmap/roles-responsibilities/RolesResponsibilities"
    ),
  { ssr: false, loading: () => null }
);

const SkillsRequired = dynamic(
  () => import("@/components/ui/roadmap/skills-required/SkillsRequired"),
  {
    ssr: false,
    loading: () => null,
  }
);

const Objectives = dynamic(
  () => import("@/components/ui/roadmap/objectives/Objectives"),
  {
    ssr: false,
    loading: () => null,
  }
);

export const defaultSectionForTraining = "advantages";

export const selectSectionsAsComponentForTraining = [
  {
    key: "advantages",
    component: Advantages,
  },
  {
    key: "prerequisites",
    component: SkillsRequired,
  },
  {
    key: "trainingObjectives",
    component: SkillsRequired,
  },
  {
    key: "trainingProgram",
    component: Syllabus,
  },
  {
    key: "upcomingGroups",
    component: NextGroups,
  },
  { key: "graduates", component: Graduates },
  { key: "companies", component: Companies },
  // // { key: "feedbacks", component: Comments },
  { key: "instructors", component: Instructors },
  {
    key: "trainingApplicationForm",
    component: CourseApplicationForm,
  },
  {
    key: "relatedCourses",
    component: RelatedCourses,
  },
  {
    key: "faq",
    component: Faq,
  },
];

export const selectSectionsAsComponentForRoadmap = [
  {
    key: "roles&Responsibilities",
    component: RolesResponsibilities,
  },
  {
    key: "prerequisites",
    component: SkillsRequired,
  },
  // {
  //   key: "trainingRoadmap",
  // },
  // {
  //   key: "recommendedAdditionalTrainings",
  // },
  // { key: "skillsYou'llGain" },
  {
    key: "whereDoOurGraduatesWork",
    component: Companies,
  },
  {
    key: "graduatesHere",
    component: Instructors,
  },
  {
    key: "trainingApplicationForm",
    component: CourseApplicationForm,
  },
  { key: "faq", component: Faq },
];
export const defaultSectionForRoadmap = "roles&responsibilities";
