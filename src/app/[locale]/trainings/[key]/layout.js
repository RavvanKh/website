import { TrainingProvider } from "@/contexts/TrainingContext";
import { use } from "react";

const TrainingLayout = ({ children, params }) => {
  const { key } = use(params);
  return <TrainingProvider trainingKey={key}>{children}</TrainingProvider>;
};

export default TrainingLayout;
