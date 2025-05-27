import { selectSectionsAsComponent } from "@/lib/constants/selectSections";

export const filterValidSections = (training) => {
  return selectSectionsAsComponent.filter(({ key }) => {
    switch (key) {
      case "advantages":
        return training?.advantages?.length > 0;
      case "trainingProgram":
        return training?.syllabus?.length > 0;
      case "upcomingGroups":
        return training?.upcomingSessions?.length > 0;
      case "graduates":
        return training?.graduates?.length > 0;
      case "companies":
        return training?.graduatesWorkplaces?.length > 0;
      case "instructors":
        return training?.instructors?.length > 0;
      case "courseApplicationForm":
        return true;
      case "faq":
        return training?.faq?.length > 0;
      default:
        return false;
    }
  });
};