import Advantages from "@/components/ui/training/advantages/Advantages";
import NextGroups from "@/components/ui/training/syllabus/next-groups/NextGroups";
import Syllabus from "@/components/ui/training/syllabus/Syllabus";

export const selectSections = [
  {
    key: "advantages",
  },
  {
    key: "syllabus",
  },
  {
    key: "nextGroups",
  },
  {
    key: "alumni",
  },
  {
    key: "feedbacks",
  },
  {
    key: "instructors",
  },
  {
    key: "applicationForm",
  },
];

export const defaultSection = "advantages";

export const selectSectionsAsComponent = [
  {
    key: "advantages",
    component: Advantages,
  },
  {
    key: "syllabus",
    component: Syllabus,
  },
  {
    key: "nextGroups",
    component: NextGroups,
  },
];
