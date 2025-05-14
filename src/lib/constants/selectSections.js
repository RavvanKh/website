import Advantages from "@/components/ui/training/advantages/Advantages";
import Companies from "@/components/ui/training/companies/Companies";
import Graduates from "@/components/ui/training/graduates/Graduates";
import NextGroups from "@/components/ui/training/next-groups/NextGroups";
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
    key: "graduates",
  },
  { key: "companies" },
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
  { key: "graduates", component: Graduates },
  { key:'companies', component:Companies},
];
