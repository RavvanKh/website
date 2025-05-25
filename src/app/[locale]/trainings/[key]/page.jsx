import { use } from "react";

import Training from "@/components/pages/training/Training";

import { getTrainingData } from "@/lib/utils/api/training";
import { generateCustomMetadata } from "@/lib/utils/helpers/generateCustomMetadata";

export const generateMetadata = async ({params}) =>{
  const {key} = await params;
  
  const training = await getTrainingData(key);
  if (!training?.name) {
    return {
      title: "Training not found",
      description: "The requested training could not be found.",
    };
  }
  return generateCustomMetadata({
    title:training?.name,
    description:training?.description,
    keywords: training?.searchKeys,
  })
}

const TrainingPage = ({ params }) => {
  const { key } = use(params);

  return <Training trainingKey={key} />;
};

export default TrainingPage;
