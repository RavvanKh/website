import { use } from "react";

import Training from "@/components/pages/training/Training";

const TrainingPage = ({ params }) => {
  const { key } = use(params);

  return <Training trainingKey={key} />;
};

export default TrainingPage;
